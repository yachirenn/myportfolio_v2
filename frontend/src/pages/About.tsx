import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import anime from 'animejs'

const TEXT_SPEED = {
  typing: 50,
  deleting: 30,
  pauseText: 2000,
}

// Typewriter helper (sama seperti Hero)
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

// ==================== SKILLS DATA ====================
const skills = [
  { name: 'React', level: 90, color: '#61DAFB' },
  { name: 'TypeScript', level: 85, color: '#3178C6' },
  { name: 'Tailwind CSS', level: 92, color: '#06B6D4' },
  { name: 'Bun / ElysiaJS', level: 80, color: '#FBF0DF' },
  { name: 'Three.js', level: 70, color: '#000000' },
  { name: 'Figma', level: 75, color: '#F24E1E' },
]

const passions = [
  { icon: '💻', label: 'Web Development', desc: 'Building fast, accessible, and beautiful digital experiences' },
  { icon: '🎨', label: 'UI/UX Design', desc: 'Crafting intuitive interfaces with minimalist aesthetics' },
  { icon: '🎵', label: 'Music', desc: 'Finding rhythm in code and harmony in design' },
  { icon: '🎌', label: 'Anime & Japan', desc: 'Inspired by Japanese culture and storytelling' },
  { icon: '⭐', label: 'Honkai: Star Rail', desc: 'Trailblazing through the stars' },
]

// ==================== COMPONENT ====================
export default function About() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<'title' | 'description' | 'skills' | 'passions' | 'complete'>('title')
  const [showSkills, setShowSkills] = useState(false)
  const [showPassions, setShowPassions] = useState(false)

  const titleTW = useTypewriter(60, 25)
  const descTW = useTypewriter(30, 15)

  // Skill bar animation
  const skillRefs = useRef<(HTMLDivElement | null)[]>([])

  // ==================== TYPEWRITER SEQUENCE ====================
  useEffect(() => {
    if (phase === 'title') {
      titleTW.typeText('About Me.', () => setPhase('description'))
    }
  }, [phase])

  useEffect(() => {
    if (phase === 'description') {
      descTW.typeText(
        "I'm Renn — an IT enthusiast and web developer based in Akihabara, Japan. I specialize in crafting high-performance digital products that blend technical precision with creative design. My work is deeply inspired by Japanese minimalism, anime aesthetics, and the perfect harmony between form and function.",
        () => setPhase('skills')
      )
    }
  }, [phase])

  useEffect(() => {
    if (phase === 'skills') {
      setShowSkills(true)
      // Animate skill bars
      setTimeout(() => {
        skillRefs.current.forEach((ref, i) => {
          if (!ref) return
          anime({
            targets: ref,
            width: [`0%`, `${skills[i].level}%`],
            duration: 1200,
            delay: i * 150,
            easing: 'easeOutExpo',
          })
        })
        setTimeout(() => setPhase('passions'), 1800)
      }, 400)
    }
  }, [phase])

  useEffect(() => {
    if (phase === 'passions') {
      setShowPassions(true)
      setTimeout(() => setPhase('complete'), 500)
    }
  }, [phase])

  // ==================== MOTION VARIANTS ====================
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  })

  const staggerChildren = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const childVariant = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  // ==================== RENDER ====================
  return (
    <section id='about' className="min-h-screen bg-[#F6F7ED] px-6 sm:px-16 md:px-32 pt-32 pb-20">
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onClick={() => navigate('/')}
        className="text-sm text-black/60 hover:text-black transition-colors mb-12 flex items-center gap-2 cursor-pointer"
      >
        <span>←</span>
        <span>Back to Home</span>
      </motion.button>

      <div className="max-w-4xl mx-auto">
        {/* Title - Typewriter */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold text-black mb-8"
        >
          {titleTW.displayText}
          {titleTW.isTyping && (
            <span className="inline-block w-0.75 h-10 md:h-14 bg-black ml-1 animate-pulse align-middle" />
          )}
        </motion.h1>

        {/* Description - Typewriter */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-lg text-[#5c4a3a]/80 max-w-2xl leading-relaxed mb-20"
        >
          {descTW.displayText}
          {descTW.isTyping && (
            <span className="inline-block w-1 h-5 bg-[#5c4a3a]/60 ml-0.5 animate-pulse align-middle" />
          )}
        </motion.p>

        {/* Skills Section */}
        <AnimatePresence>
          {showSkills && (
            <motion.div
              variants={staggerChildren}
              initial="initial"
              animate="animate"
              className="mb-20"
            >
              <motion.h2
                variants={childVariant}
                className="text-2xl font-bold text-black mb-8"
              >
                Technical Skills
              </motion.h2>

              <div className="space-y-6">
                {skills.map((skill, i) => (
                  <motion.div key={skill.name} variants={childVariant}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-black">{skill.name}</span>
                      <span className="text-xs text-black/40">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden">
                      <div
                        ref={(el) => { skillRefs.current[i] = el }}
                        className="w-0 h-full rounded-full transition-colors duration-500"
                        style={{
                          width: '0%',
                          backgroundColor: skill.color,
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Passions Section */}
        <AnimatePresence>
          {showPassions && (
            <motion.div
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              <motion.h2
                variants={childVariant}
                className="text-2xl font-bold text-black mb-8"
              >
                Passions & Interests
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {passions.map((passion) => (
                  <motion.div
                    key={passion.label}
                    variants={childVariant}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="bg-white border border-black/10 rounded-xl p-6 flex items-start gap-4 cursor-default hover:shadow-lg hover:border-black/20 transition-all duration-300"
                  >
                    <span className="text-3xl shrink-0">{passion.icon}</span>
                    <div>
                      <h3 className="font-bold text-black mb-1">{passion.label}</h3>
                      <p className="text-sm text-[#5c4a3a]/60 leading-relaxed">{passion.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <AnimatePresence>
          {phase === 'complete' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-20 flex gap-4"
            >
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/projects')}
                className="bg-black text-white px-6 py-3.5 hover:bg-white hover:text-black transition-colors duration-200 font-medium border border-black cursor-pointer"
              >
                View My Projects
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/contact')}
                className="bg-transparent text-black px-6 py-3.5 hover:bg-black/5 transition-colors duration-200 border border-black/20 font-medium cursor-pointer"
              >
                Get In Touch
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}