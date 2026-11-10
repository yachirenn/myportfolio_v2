import { useEffect, useState, useCallback, useRef } from 'react'
import { LuArrowUpRight, LuFastForward, LuSparkles, LuCheck } from 'react-icons/lu'
import ProfileCard from '../components/ProfileCard'

const TEXT_SPEED = {
  isTyping: 25,
  deletingText: 15,
}

const FULL_PARAGRAPH_1 =
  "I'm a Web Development enthusiast based in Indonesia who enjoys building digital experiences that are both functional and visually engaging. I like turning ideas into reality through clean and structured code, while also exploring my interests in Japanese culture, anime, manga, and music, which often influence my sense of design and creativity."

const FULL_PARAGRAPH_2 =
  "Currently seeking Freelance, Internship, and Collaboration opportunities. Let's connect and build something meaningful together!"

const FULL_QUOTE_JP = '「もしも別の形で出会えていたなら、君に“好きだ”って言えたのかな。」'
const FULL_QUOTE_ROMAJI = 'Moshimo betsu no katachi de deaete ita nara, kimi ni "suki da" tte ieta no kana.'

function useTypewriter(typingSpeed = TEXT_SPEED.isTyping) {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

  const textType = useCallback(async (newText: string, signal: AbortSignal, onDone?: () => void) => {
    if (signal.aborted) return
    setIsTyping(true)
    for (let i = 1; i <= newText.length; i++) {
      await sleep(typingSpeed)
      if (signal.aborted) return
      setDisplayText(newText.slice(0, i))
    }
    setIsTyping(false)
    onDone?.()
  }, [typingSpeed])

  const setInstant = useCallback((text: string) => {
    setDisplayText(text)
    setIsTyping(false)
  }, [])

  return { displayText, isTyping, textType, setInstant }
}

export default function AboutPage() {
  const [showContent, setShowContent] = useState(false)
  const [isSkipped, setIsSkipped] = useState(false)
  const [paragraphDone, setParagraphDone] = useState([false, false, false])
  const quoteJP = useTypewriter(50)
  const romajiJP = useTypewriter(35)
  const [quoteJpDone, setQuoteJpDone] = useState(false)
  const [showQuote, setShowQuote] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  const paragraph1 = useTypewriter(12)
  const paragraph2 = useTypewriter(12)
  const typeParagraph1 = paragraph1.textType
  const typeParagraph2 = paragraph2.textType
  const typeQuote = quoteJP.textType
  const typeRomaji = romajiJP.textType

  // Typewriter Sequence
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!showContent || isSkipped) return
    const controller = new AbortController()
    abortControllerRef.current = controller
    const { signal } = controller

    const sequence = async () => {
      await typeParagraph1(
        FULL_PARAGRAPH_1,
        signal,
        () => setParagraphDone(prev => {
          const next = [...prev]
          next[0] = true
          return next
        })
      )

      await new Promise(r => setTimeout(r, 250))
      if (signal.aborted) return

      await typeParagraph2(
        FULL_PARAGRAPH_2,
        signal,
        () => setParagraphDone(prev => {
          const next = [...prev]
          next[1] = true
          return next
        })
      )

      if (signal.aborted) return
      setShowQuote(true)
      await new Promise(r => setTimeout(r, 400))
      await typeQuote(
        FULL_QUOTE_JP,
        signal,
        () => setQuoteJpDone(true)
      )

      await new Promise(r => setTimeout(r, 250))
      if (signal.aborted) return
      await typeRomaji(
        FULL_QUOTE_ROMAJI,
        signal,
        () => setParagraphDone(prev => {
          const next = [...prev]
          next[2] = true
          return next
        })
      )
    }

    sequence()
    return () => controller.abort()
  }, [showContent, isSkipped, typeParagraph1, typeParagraph2, typeQuote, typeRomaji])

  // Skip dialogue handler (Star Rail / JRPG feature)
  const handleSkipDialogue = () => {
    abortControllerRef.current?.abort()
    setIsSkipped(true)
    paragraph1.setInstant(FULL_PARAGRAPH_1)
    paragraph2.setInstant(FULL_PARAGRAPH_2)
    quoteJP.setInstant(FULL_QUOTE_JP)
    romajiJP.setInstant(FULL_QUOTE_ROMAJI)
    setShowQuote(true)
    setQuoteJpDone(true)
    setParagraphDone([true, true, true])
  }

  return (
    <section id="about" className="relative min-h-screen px-6 sm:px-16 md:px-32 pt-32 pb-24 overflow-hidden bg-[#F6F7ED]">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <img
          src="/assets/waguri_rintaro.jpg"
          alt=""
          role="presentation"
          className="w-full h-full object-cover object-center filter grayscale"
        />
      </div>

      <div className="absolute inset-0 z-1 bg-gradient-to-b from-[#F6F7ED] via-[#F6F7ED]/85 to-[#F6F7ED]" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
        {/* Profile Character Card */}
        <div className="w-full lg:w-auto flex justify-center shrink-0">
          <ProfileCard
            name="Rendy Sulistyawan"
            title="Web Developer"
            handle="yachirennn"
            status="Online"
            avatarUrl="/assets/guwelagi.webp"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            behindGlowColor="#919191"
            iconUrl="/assets/iconShineJP.webp"
          />
        </div>

        {/* Narrative Archive Log */}
        <div className="min-w-0 flex-1 space-y-6 text-[#2c1810]">
          {/* Header & JRPG Dialogue Skip control */}
          <div className="flex items-center justify-between border-b-2 border-black pb-3">
            <div className="flex items-center gap-2 font-mono-tech text-xs font-bold uppercase tracking-[0.25em] text-black/60">
              <LuSparkles className="size-3.5 text-[#2563EB]" />
              <span>01 / Player Archive</span>
            </div>

            {!isSkipped && (
              <button
                type="button"
                onClick={handleSkipDialogue}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono-tech font-bold uppercase tracking-wider bg-black/5 hover:bg-black hover:text-[#F6F7ED] border border-black/20 transition-colors cursor-pointer"
                title="Instant text display"
              >
                <LuFastForward className="size-3" />
                <span>Skip Dialogue</span>
              </button>
            )}

            {isSkipped && (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono-tech text-emerald-700">
                <LuCheck className="size-3" />
                <span>Log Cleared</span>
              </span>
            )}
          </div>

          <h2 className="text-4xl font-bold sm:text-5xl tracking-tight">
            Code, creativity, and a little anime.
          </h2>

          {/* Accessible screen reader text */}
          <div className="sr-only">
            <p>{FULL_PARAGRAPH_1}</p>
            <p>{FULL_PARAGRAPH_2}</p>
            <p>{FULL_QUOTE_JP}</p>
            <p>{FULL_QUOTE_ROMAJI}</p>
          </div>

          {/* Animated visual text */}
          <div aria-hidden="true" className="space-y-6">
            <p className="min-h-28 text-base leading-relaxed sm:text-lg text-[#2c1810]/90">
              {paragraph1.displayText}
              {paragraph1.isTyping && <span className="inline-block w-0.5 h-4 bg-black ml-0.5 animate-pulse align-middle" />}
            </p>

            {(paragraphDone[0] || isSkipped) && (
              <p className="text-base leading-relaxed sm:text-lg text-[#2c1810]/90">
                {paragraph2.displayText}
                {paragraph2.isTyping && <span className="inline-block w-0.5 h-4 bg-black ml-0.5 animate-pulse align-middle" />}
              </p>
            )}

            {(paragraphDone[1] || isSkipped) && (
              <div className="pt-2">
                <a
                  href="#connect"
                  className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-xs border-b-2 border-black pb-1 hover:text-[#2563EB] hover:border-[#2563EB] transition-colors"
                >
                  <span>Connect with Renn</span>
                  <LuArrowUpRight className="size-4" />
                </a>
              </div>
            )}

            {(showQuote || isSkipped) && (
              <blockquote className="border-l-3 border-[#2563EB] pl-5 py-2 text-[#2c1810]/80 bg-black/5 mt-6">
                <p lang="ja" className="text-lg leading-relaxed font-serif">
                  {quoteJP.displayText}
                </p>
                {(quoteJpDone || isSkipped) && (
                  <p className="mt-2 text-xs font-mono-tech tracking-wide text-black/60 italic">
                    {romajiJP.displayText}
                  </p>
                )}
              </blockquote>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
