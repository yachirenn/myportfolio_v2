import { useEffect, useState, useRef, useCallback } from 'react'
import { motion } from 'motion/react'
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

  const quoteJP = useTypewriter(60)
  const romajiJP = useTypewriter(40)
  const [quoteJpDone, setQuoteJpDone] = useState(false)
  const [showQuote, setShowQuote] = useState(false)

  const paragraph1 = useTypewriter(15)
  const paragraph2 = useTypewriter(15)

  // Typewriter Sequence
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!showContent) return

    const sequence = async () => {
      await paragraph1.textType(
        "I'm a Web Development enthusiast based in Indonesia who enjoys building digital experiences that are both functional and visually engaging. I like turning ideas into reality through clean and structured code, while also exploring my interests in Japanese culture, anime, manga, and music, which often influence my sense of design and creativity.",
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

      setShowQuote(true)
      await new Promise(r => setTimeout(r, 500))
      await quoteJP.textType(
        '「もしも別の形で出会えていたなら、君に“好きだ”って言えたのかな。」',
        () => setQuoteJpDone(true)
      )

      await new Promise(r => setTimeout(r, 300))
      await romajiJP.textType(
        'Moshimo betsu no katachi de deaete ita nara, kimi ni "suki da" tte ieta no kana.',
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
    <section id="about" className="relative min-h-screen px-6 sm:px-16 md:px-32 pt-32 pb-20 overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/waguri_rintaro.jpg" 
          alt="Background" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* ===== GRADIENT OVERLAY (transisi mulus ke #F6F7ED) ===== */}
      <div className="absolute inset-0 z-1 bg-linear-to-b from-[#F6F7ED]/95 via-[#F6F7ED]/60 to-[#F6F7ED]" />
      
      {/* Alternative: gradient dari atas & bawah */}
      <div className="absolute inset-0 z-1 bg-linear-to-b from-[#F6F7ED] via-transparent via-45% to-[#F6F7ED]" />

      <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-start">
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

        {/* Text content di sini */}
      </div>
    </section>
  )
}