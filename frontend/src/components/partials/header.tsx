import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react'
import { LuMenu, LuX, LuArrowUpRight, LuSparkles, LuRadio } from 'react-icons/lu'

interface NavLink {
  label: string
  href: string
  tag: string
}

const navLinks: NavLink[] = [
  { label: 'ABOUT', href: '#about', tag: '01' },
  { label: 'SKILLS', href: '#skills', tag: '02' },
  { label: 'PROJECTS', href: '#projects', tag: '03' },
  { label: 'CONNECT', href: '#connect', tag: '04' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  // Track scroll state for shadow & backdrop
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Active section observer
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'skills', 'projects', 'connect']
    const observers: IntersectionObserver[] = []

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) {
        const obs = new IntersectionObserver(observerCallback, {
          rootMargin: '-30% 0px -50% 0px',
          threshold: 0,
        })
        obs.observe(el)
        observers.push(obs)
      }
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [])

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header
        role="banner"
        className={`sticky top-0 left-0 w-full z-40 transition-all duration-300 border-b-2 border-black ${
          scrolled ? 'bg-[#F6F7ED]/90 backdrop-blur-md shadow-sm' : 'bg-[#F6F7ED]'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-8 md:px-12 h-20">
          {/* Brand Logo & Mission Badge */}
          <div className="flex items-center gap-4">
            <a
              href="#hero"
              aria-label="Renn Portfolio Home"
              className="group flex items-baseline gap-1 text-[28px] sm:text-[32px] font-bold tracking-tighter text-black transition-transform active:scale-95"
            >
              <span>Renn</span>
              <span className="text-[#2563EB] group-hover:animate-pulse">.</span>
              <span className="hidden sm:inline-block ml-2 text-[10px] tracking-widest uppercase font-mono-tech px-2 py-0.5 bg-black/5 border border-black/20 text-black/70">
                SYS.V2
              </span>
            </a>

            {/* Availability Radar badge */}
            <div
              className="hidden lg:flex items-center gap-2 pl-3 border-l border-black/15 text-[11px] font-mono-tech uppercase tracking-wider text-black/75"
              title="Current status"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
              </span>
              <span>Online / Open for Work</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center h-full space-x-1 lg:space-x-2"
          >
            {navLinks.map((item) => {
              const isActive = activeSection === item.href.replace('#', '')
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`group relative px-3 py-2 text-[13px] font-bold tracking-widest uppercase transition-colors flex items-center gap-1.5 ${
                    isActive ? 'text-black font-extrabold' : 'text-[#767677] hover:text-black'
                  }`}
                >
                  <span className="text-[10px] font-mono-tech text-black/40 group-hover:text-[#2563EB] transition-colors">
                    {item.tag}
                  </span>
                  <span>{item.label}</span>

                  {/* Active / Hover under-indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.75 bg-black"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              )
            })}
          </nav>

          {/* Right Action Terminal */}
          <div className="flex items-center gap-3">
            <a
              href="#connect"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider bg-black text-[#F6F7ED] hover:bg-[#2563EB] transition-colors border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <LuRadio className="size-3.5 animate-pulse text-emerald-400" />
              <span>Transmission</span>
              <LuArrowUpRight className="size-3.5" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden flex items-center justify-center p-2.5 border-2 border-black bg-white hover:bg-[#F6F7ED] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <LuX className="size-5" /> : <LuMenu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Real-time Reading / Scroll Progress Bar */}
        <motion.div
          style={{ scaleX }}
          className="absolute bottom-0 left-0 right-0 h-0.75 bg-black origin-left z-50 pointer-events-none"
        />
      </header>

      {/* Accessible Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-20 z-30 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#F6F7ED] border-b-2 border-black p-6 shadow-xl"
              aria-label="Mobile Navigation"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-black/10 text-xs font-mono-tech text-black/60 uppercase">
                <span className="flex items-center gap-1.5">
                  <LuSparkles className="size-3 text-[#2563EB]" />
                  <span>Navigation Deck</span>
                </span>
                <span className="text-[10px] bg-black/10 px-2 py-0.5 rounded-xs">ESC TO CLOSE</span>
              </div>

              <ul className="space-y-3">
                {navLinks.map((item) => {
                  const isActive = activeSection === item.href.replace('#', '')
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between p-3 border border-black/15 transition-all ${
                          isActive
                            ? 'bg-black text-[#F6F7ED] font-bold border-black shadow-[3px_3px_0px_0px_rgba(37,99,235,1)]'
                            : 'bg-white hover:bg-black/5 text-[#2C1810]'
                        }`}
                      >
                        <span className="flex items-center gap-3 text-sm font-bold tracking-wider">
                          <span className={`text-xs font-mono-tech ${isActive ? 'text-[#F6F7ED]/60' : 'text-black/40'}`}>
                            {item.tag}
                          </span>
                          <span>{item.label}</span>
                        </span>
                        <LuArrowUpRight className="size-4" />
                      </a>
                    </li>
                  )
                })}
              </ul>

              <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between text-xs font-mono-tech text-black/70">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>SYSTEM READY</span>
                </div>
                <a
                  href="#connect"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-bold underline uppercase tracking-wider text-black"
                >
                  Send Transmission →
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
