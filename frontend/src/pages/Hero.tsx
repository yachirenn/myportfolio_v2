import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import anime from 'animejs'
import { LuDownload, LuFolderKanban, LuRadio, LuArrowDown } from 'react-icons/lu'

const TEXT_SPEED = {
  typing: 50,
  deleting: 30,
  pauseText: 2000
}

const precisionWords = [ 'Passion.', 'Creativity.', 'Innovation.', 'Excellence.', 'Purpose.', 'Functional.', 'Craft.', 'Kawaii.' ]

function useTypewriter(typingSpeed = TEXT_SPEED.typing, deletingSpeed = TEXT_SPEED.deleting) {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const textRef = useRef('')
  const isMounted = useRef(true)

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))
  const typeText = useCallback(async (newText: string, onDone?: () => void) => {
    setIsTyping(true)
    for (let i = 1; i <= newText.length; i++) {
      if (!isMounted.current) return
      await sleep(typingSpeed)
      textRef.current = newText.slice(0, i)
      setDisplayText(textRef.current)
    }

    setIsTyping(false)
    onDone?.()
  }, [typingSpeed])

  const deleteText = useCallback(async () => {
    setIsDeleting(true)
    for (let i = textRef.current.length; i >= 0; i--) {
      if (!isMounted.current) return
      await sleep(deletingSpeed)
      textRef.current = textRef.current.slice(0, i)
      setDisplayText(textRef.current)
    }
    setIsDeleting(false)
  }, [deletingSpeed])

  return { displayText, isTyping, isDeleting, typeText, deleteText }
}

export default function Hero() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [showButton, setShowButton] = useState(false)

  const [showContent, setShowContent] = useState(false)
  const precisionTimeline = useTypewriter()

  const [phase, setPhase] = useState<'overlay' | 'greeting' | 'title' | 'description' | 'location' | 'complete'>('overlay')
  const hasStartedLoop = useRef(false)

  const greeting = useTypewriter()
  const titlePrefix = useTypewriter()
  const description = useTypewriter(TEXT_SPEED.typing / 2, TEXT_SPEED.deleting / 2)
  const locationTW = useTypewriter()

  const { typeText: typeGreeting } = greeting
  const { typeText: typeTitlePrefix } = titlePrefix
  const { typeText: typeDescription } = description
  const { typeText: typeLocation } = locationTW
  const { typeText: typePrecision, deleteText: deletePrecision } = precisionTimeline

  // ==================== PRECISION WORD LOOP ====================
  const startPrecisionLoop = useCallback(() => {
    if (hasStartedLoop.current) return
    hasStartedLoop.current = true

    let running = true
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

    const loop = async () => {
      let index = 0
      await typePrecision(precisionWords[0])

      while (running) {
        await sleep(TEXT_SPEED.pauseText)

        const nextIndex = (index + 1) % precisionWords.length
        const next = precisionWords[nextIndex]

        await deletePrecision()
        await typePrecision(next)

        index = nextIndex
      }
    }

    loop()

    return () => { running = false }
  }, [typePrecision, deletePrecision])

  // ==================== OVERLAY + IMAGE FLOAT ====================
  useEffect(() => {
    requestAnimationFrame(() => {
      anime.set(['.desc-text', '.location-block', '.scroll-indicator'], {
        opacity: 0,
      })
      anime.set('.location-block', { translateX: 40 })
    })

    const masterTL = anime.timeline({
      easing: 'linear',
      complete: () => setPhase('complete'),
    })

    // Step 1: Overlay fade out
    masterTL.add({
      targets: overlayRef.current,
      opacity: [1, 0],
      duration: 800,
      complete: () => setShowContent(true),
    }, 0)

    // Step 2: Greeting typewriter trigger (via phase)
    masterTL.add({
      targets: '.phase-trigger',
      duration: 400,
      complete: () => setPhase('greeting'),
    }, 800)

    // Step 3: Title typewriter trigger
    masterTL.add({
      targets: '.phase-trigger',
      duration: 800,
      complete: () => setPhase('title'),
    }, '+=0')

    // Step 4: Description entrance + typewriter
    masterTL.add({
      targets: '.phase-trigger',
      duration: 1000,
      complete: () => setPhase('description'),
    }, '+=0')

    // Step 5: Description fade in
    masterTL.add({
      targets: '.desc-text',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 500,
      easing: 'easeOutQuad',
    }, '+=500')

    // Step 6: Location entrance
    masterTL.add({
      duration: 1,
      complete: () => setPhase('location'),
    }, 800)

    // Step 7: Location fade + slide in
    masterTL.add({
      targets: '.location-block',
      opacity: [0, 1],
      translateX: [40, 0],
      duration: 500,
      easing: 'easeOutExpo',
    }, '+=600')

    // Step 8: Image float
    const floatAnimation = anime({
      targets: imageRef.current,
      translateY: [0, -10],
      duration: 2000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
    })

    return () => {
      masterTL.pause()
      floatAnimation.pause()
    }
  }, [])

  // ==================== TYPEWRITER SEQUENCE (PHASE-BASED) ====================
  useEffect(() => {
    if (phase === 'greeting') {
      typeGreeting("こんにちは, I'm Renn.")
    }
  }, [phase, typeGreeting])

  useEffect(() => {
    if (phase === 'title') {
      typeTitlePrefix('Building Digital Experiences with ', () => {
        startPrecisionLoop()
      })
    }
  }, [phase, typeTitlePrefix, startPrecisionLoop])

  useEffect(() => {
    if (phase === 'description') {
      typeDescription(
        "An IT enthusiast and web developer passionate about crafting high-performance digital products. I blend technical expertise with creative design, inspired by Japanese culture, anime aesthetics, and the rhythm of music — from Akihabara's electric streets to the stars of Honkai: Star Rail.",
        () => {
          setTimeout(() => {
            setShowButton(true)
          }, 300);
        }
      )
    }
  }, [phase, typeDescription])

  useEffect(() => {
    if (phase === 'location') {
      typeLocation('Akihabara, Japan')
    }
  }, [phase, typeLocation])

  // ==================== MOTION PROPS ====================
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  })

  return (
    <section id="hero" className="w-full min-h-screen py-24 sm:py-28 justify-center items-center flex px-6 sm:px-16 md:px-32 overflow-hidden relative bg-[#F6F7ED]">
      <div className="phase-trigger hidden" />
      <div ref={overlayRef} className="absolute inset-0 bg-[#F6F7ED] z-20 pointer-events-none" />

      <AnimatePresence>
        {showContent && (
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-7xl mx-auto">
            <div className="text-left space-y-8">
              <motion.h1 {...fadeUp(0.1)} className="font-mono-tech text-xs md:text-sm bg-[#2c1810] px-3 py-1.5 w-fit uppercase text-[#f5e6d3] tracking-[0.15em] border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {greeting.displayText}
                {greeting.isTyping && (
                  <span className="inline-block w-0.5 h-3.5 bg-[#f5e6d3] ml-0.5 animate-pulse align-middle" />
                )}
              </motion.h1>

              <motion.h2 {...fadeUp(0.3)} className="font-bold text-4xl md:text-6xl leading-tight mt-4 text-black wrap-break-word">
                <span className='block mt-4 text-5xl md:text-7xl tracking-tight'>
                  {titlePrefix.displayText}
                  {(titlePrefix.isTyping || titlePrefix.isDeleting) && (
                    <span className="inline-block w-0.75 h-10 md:h-14 bg-black ml-0.5 animate-pulse align-middle" />
                  )}
                </span>

                {!titlePrefix.isTyping && titlePrefix.displayText.length > 0 && (
                  <span className="block mt-2">
                    <u className="decoration-[#000000] decoration-4 underline-offset-4 inline-block">
                      {precisionTimeline.displayText}
                      {precisionTimeline.isTyping && (
                        <span className='inline-block w-0.75 h-10 md:h-14 bg-black ml-0.5 animate-pulse align-middle'></span>
                      )}
                    </u>
                  </span>
                )}
              </motion.h2>

              <div className="flex flex-col space-y-4">
                <div className="space-y-6">
                  <motion.p {...fadeUp(0.5)} className="desc-text text-[#5c4a3a]/90 max-w-lg leading-relaxed text-base sm:text-lg">
                    {description.displayText}
                    {description.isTyping && (
                      <span className="inline-block w-0.5 h-4 bg-[#5c4a3a]/60 ml-0.5 animate-pulse align-middle" />
                    )}
                  </motion.p>

                  <AnimatePresence>
                    {showButton && (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        transition={{
                          duration: 0.5,
                          ease: 'easeIn'
                        }}
                        className="flex flex-wrap gap-4 w-fit pt-2"
                      >
                        <a
                          href="#projects"
                          className="inline-flex items-center gap-2.5 bg-black text-white px-6 py-3.5 hover:bg-[#2563EB] transition-colors duration-200 font-bold border border-black cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none uppercase tracking-wider text-xs"
                        >
                          <LuFolderKanban className="size-4" />
                          <span>Explore Missions</span>
                        </a>

                        <a
                          href="/assets/CV_by_yachirenn.pdf"
                          download="yachirenn_Resume_download.pdf"
                          className="inline-flex items-center gap-2.5 bg-white text-black px-6 py-3.5 hover:bg-black hover:text-white transition-colors duration-200 border-2 border-black font-bold cursor-pointer uppercase tracking-wider text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                        >
                          <LuDownload className="size-4" />
                          <span>Download Resume</span>
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="location-block absolute top-0 right-0 bg-transparent p-1 flex items-center gap-3">
                  <div className="w-0.5 h-10 bg-black absolute right-0" />
                  <div className="flex flex-col pr-1.5 font-mono-tech">
                    <p className="text-[10px] tracking-[0.3em] text-black/50 uppercase text-right">現在地</p>
                    <h2 className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">
                      {locationTW.displayText}
                      {locationTW.isTyping && (
                        <span className="inline-block w-0.5 h-3 bg-black ml-0.5 animate-pulse align-middle" />
                      )}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
              transition={{ duration: 0.8, delay: 0.8, y: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
              className="hidden sm:flex sm:flex-col sm:items-center justify-center"
            >
              <div className="relative p-6 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-xs w-full">
                <div className="flex items-center justify-between pb-3 border-b border-black/15 font-mono-tech text-[10px] text-black/60 uppercase">
                  <span className="flex items-center gap-1.5">
                    <LuRadio className="size-3 text-emerald-600 animate-pulse" />
                    <span>COMPANION.EXE</span>
                  </span>
                  <span>LVL.80</span>
                </div>
                <div className="py-4 flex justify-center">
                  <img
                    ref={imageRef}
                    src="https://media.tenor.com/7lHdnabfyTQAAAAi/herta-kurukuru.gif"
                    alt="Kuru kuru kururing companion unit"
                    className="w-48 h-48 object-contain"
                  />
                </div>
                <div className="pt-3 border-t border-black/15 font-mono-tech text-[10px] text-black/60 flex justify-between items-center">
                  <span>STATUS: ROTATING</span>
                  <span className="text-[#2563EB] font-bold">KURU KURU</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {showContent && (
        <motion.a
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.5 }}
          href="#about"
          aria-label="Scroll down to About section"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20 group text-black/60 hover:text-black transition-colors"
        >
          <div className="w-5 h-8 border-2 border-current rounded-full flex justify-center pt-1.5">
            <LuArrowDown className="size-3 animate-bounce" />
          </div>
          <span className="text-[10px] font-mono-tech uppercase tracking-widest">Scroll</span>
        </motion.a>
      )}
    </section>
  )
}