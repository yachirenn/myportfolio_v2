import { useEffect, useState, useRef, useCallback } from 'react'
import { motion } from 'motion/react'
import TextPressure from '../components/ui/TextPressure'
import ProfileCard from '../components/ProfileCard'

const TEXT_SPEED = {
  isTyping: 30,
  deletingText: 15,
}

// Typing Hook
function useTypewriter(typingSpeed = TEXT_SPEED.isTyping) {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const textRef = useRef('')
  const isMounted = useRef(true)

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

  const textType = useCallback(async (newText: string, onDone?: () => void) => {
    setIsTyping(true)
    for (let i =1; i <= newText.length; i++) {
      if (!isMounted.current) return
      await sleep(typingSpeed)
      textRef.current = newText.slice(0, i)
      setDisplayText(textRef.current)
    }
    setIsTyping(false)
    onDone?.()
  }, [typingSpeed])

  return { displayText, isTyping, textType}
}

export default function AboutPage() {

  const [showContent, setShowContent] = useState(false)
  const [paragraphDone, setParagraphDone] = useState([false, false, false])

  const paragraph1 = useTypewriter(30)
  const paragraph2 = useTypewriter(30)

  // Typewriter Sequence
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!showContent) return

    const sequence = async () => {
      await paragraph1.textType(
        "I'm a Web Developer and Creative Content Creator based in Indonesia. I dedicate myself to building digital spaces that are not just functional, but possess a distinct soul. My creative direction is inspired by Japanese culture, anime, and music.",
        () => setParagraphDone(prev => { 
          const next = [...prev];
          next[0] = true; 
          return next
        })
      )

      // jeda sebentar
      await new Promise(r => setTimeout(r, 300))

      await paragraph2.textType(
        "Currently seeking Freelance, Intership, and Collaboration opportunities. Let's connect and build something meaningful together!",
        () => setParagraphDone(prev => {
          const next = [...prev];
          next[2] = true;
          return next
        })
      )
    }

    sequence()
  }, [showContent])

  return (
    <section id="about" className="min-h-screen bg-[#F6F7ED] px-6 sm:px-16 md:px-32 pt-32 pb-20">
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        
        {/* ===== KIRI: PROFILE CARD ===== */}
        <motion.div
          initial={{ opacity: 0, x: -80, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full lg:w-auto flex justify-center"
        >
          <ProfileCard
            name="Rendy Sulistyawan"
            title="Web Developers"
            handle="yachirennn"
            status="Online"
            contactText="Contact Me"
            avatarUrl="/assets/guwelagi.webp"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() => console.log('Contact clicked')}
            behindGlowColor="#919191"
            iconUrl="/assets/iconShineJP.webp"
          />
        </motion.div>

        {/* ===== KANAN: TEXT ===== */}
        <motion.div
          initial={{ opacity: 0, x: 70, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }} 
          className="flex flex-col gap-6 flex-1"
        >
          
          {/* TextPressure */}
          <div className="relative w-full h-20 md:h-25">
            <TextPressure
              text="Konnichiwaaaa!"
              fontFamily="Compressa VF"
              fontUrl="https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2"
              flex={false}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#2c1810"
              strokeColor="#ff0000"
              minFontSize={18}
            />
          </div>

          {/* Paragraphs - animasi dengan delay stagger manual */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg text-[#5c4a3a] leading-relaxed"
          >
            {paragraph1.displayText}
            {paragraph1.isTyping && (
              <span className='inline-block w-0.5 h-4.5 bg-[#5C4A3A]/60 ml-0.5 animate-pulse align-middle' />
            )}
          </motion.p>

          {paragraphDone[0] && (
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base text-[#5c4a3a] leading-relaxed"
            >
              {paragraph2.displayText}
              {paragraph2.isTyping && (
                <span className='inline-block w-0.5 h-4.5 bg-[#5C4A3A]/60 ml-0.5 animate-pulse align-middle' />
              )}
            </motion.p>
          )}

          <div className="w-full flex py-4 shadow-2xl rounded-2xl h-auto">Card qutoe</div>

          {/* Status badges */}
          {paragraphDone[2] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-2 w-fit"
            >
              <span className="px-3 py-1.5 bg-[#2c1810] text-[#f5e6d3] text-xs font-medium rounded-full">
                🇯🇵 Freelance Web Dev
              </span>
              <span className="px-3 py-1.5 bg-black/5 text-black text-xs font-medium rounded-full border border-black/10">
                🎌 Japan Enthusiast
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}