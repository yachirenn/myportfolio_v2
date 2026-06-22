import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import anime from 'animejs'

const TEXT_SPEED = {
  typing: 50,
  deleting: 30,
  pauseText: 2000
}

const precisionWords = [
  'Passion.',
  'Creativity.',
  'Innovation.',
  'Excellence.',
  'Purpose.',
  'Functional.',
  'Craft.',
  'Kawaii.',
]

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
      await sleep(TEXT_SPEED.deleting)
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
  const navigate = useNavigate()

  const greeting = useTypewriter()
  const titlePrefix = useTypewriter()
  const description = useTypewriter(TEXT_SPEED.typing / 2, TEXT_SPEED.deleting / 2)
  const locationTW = useTypewriter()

  // Function Download Resume
  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = '/assets/CV_by_yachirenn.pdf'
    link.download = 'yachirenn_Resume_download.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Function to navigate to projects
  const handleViewProject = () => {
    navigate('/projects')
  }

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
      greeting.typeText("こんにちは, I'm Renn.")
    }
  }, [phase])

  useEffect(() => {
    if (phase === 'title') {
      titlePrefix.typeText('Building Digital Experiences with ', () => {
        startPrecisionLoop()
      })
    }
  }, [phase])

  useEffect(() => {
    if (phase === 'description') {
      description.typeText(
        "An IT enthusiast and web developer passionate about crafting high-performance digital products. I blend technical expertise with creative design, inspired by Japanese culture, anime aesthetics, and the rhythm of music — from Akihabara's electric streets to the stars of Honkai: Star Rail.",
        () => {
          setTimeout(() => {
            setShowButton(true)
          }, 300);
        }
      )
    }
  }, [phase])

  useEffect(() => {
    if (phase === 'location') {
      locationTW.typeText('Akihabara, Japan')
    }
  }, [phase])

  // ==================== PRECISION WORD LOOP ====================
  const startPrecisionLoop = useCallback(() => {
    if (hasStartedLoop.current) return
    hasStartedLoop.current = true

    let running = true
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

    const loop = async () => {
      let index = 0

      // 🔥 langsung type pertama TANPA delay & delete
      await precisionTimeline.typeText(precisionWords[0])

      while (running) {
        await sleep(TEXT_SPEED.pauseText)

        const nextIndex = (index + 1) % precisionWords.length
        const next = precisionWords[nextIndex]

        await precisionTimeline.deleteText()
        await precisionTimeline.typeText(next)

        index = nextIndex
      }
    }

    loop()

    return () => { running = false}
  }, [])

  // ==================== MOTION PROPS ====================
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  })

  return (
    <section className="w-full h-screen justify-center items-center flex px-6 sm:px-16 md:px-32 overflow-hidden relative bg-[#F6F7ED]">
      <div className="phase-trigger hidden" />
      <div ref={overlayRef} className="absolute inset-0 bg-[#F6F7ED] z-20 pointer-events-none" />

      <AnimatePresence>
        {showContent && (
          <div className="relative z-10 grid grid-cols-2 w-full">
            <div className="text-left space-y-8">
              <motion.h1 {...fadeUp(0.1)} className="font-normal text-xs md :text-sm bg-[#2c1810] ml-2 mt-2 px-3 py-1.5 w-fit uppercase text-[#f5e6d3] tracking-[0.15em]">
                {greeting.displayText}
                {greeting.isTyping && (
                  <span className="inline-block w-0.5 h-3.5 bg-[#f5e6d3] ml-0.5 animate-pulse align-middle" />
                )}
              </motion.h1>

              <motion.h2 {...fadeUp(0.3)} className="font-bold text-4xl md:text-6xl leading-tight mt-4 text-black wrap-break-word">
                <span className='block mt-4 text-5xl md:text-7xl'>
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
                  <motion.p {...fadeUp(0.5)} className="desc-text text-[#5c4a3a]/80 max-w-lg leading-relaxed">
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
                        className="inline-flex gap-6 w-fit"
                      >
                        <motion.button whileTap={{ scale: 0.97 }} onClick={handleViewProject} className="bg-black text-white px-6 py-3.5 hover:bg-white hover:text-black transition-colors duration-200 font-medium border border-black cursor-pointer">
                          View My Projects
                        </motion.button>

                        <motion.button whileTap={{ scale: 0.97 }} onClick={handleDownloadResume} className="bg-transparent backdrop-blur-xs text-black px-6 py-3.5 hover:bg-black/5 transition-colors duration-200 border border-black/20 font-medium cursor-pointer">
                          Download Resume
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="location-block absolute top-0 right-0 bg-transparent p-1 flex items-center gap-3">
                  <div className="w-0.5 h-10 bg-black absolute right-0" />
                  <div className="flex flex-col pr-1.5">
                    <p className="text-xs tracking-[0.4em] text-black/60 uppercase text-right">現在地</p>
                    <h2 className="text-md font-bold text-black uppercase tracking-wide">
                      {locationTW.displayText}
                      {locationTW.isTyping && (
                        <span className="inline-block w-0.5 h-4 bg-black ml-0.5 animate-pulse align-middle" />
                      )}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, y: [0, -8, 0] }}
              transition={{ duration: 0.8, delay: 0.8, y: { duration: 3, repeat: Infinity } }}
              className="hidden sm:flex sm:justify-center items-center"
            >
              <img ref={imageRef} src="https://media.tenor.com/7lHdnabfyTQAAAAi/herta-kurukuru.gif" alt="Kuru kuru kururing" className="w-full object-contain" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {showContent && (
        <motion.a initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4, duration: 0.5 }}
          href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
          <div className="w-6 h-9.5 border-2 border-black/40 rounded-[20px] flex justify-center pt-2">
            <div className="w-0.75 h-2 bg-black/50 rounded-sm animate-bounce" />
          </div>
          <span className="text-xs text-black/50 uppercase tracking-widest">Scroll</span>
        </motion.a>
      )}
    </section>
  )
}