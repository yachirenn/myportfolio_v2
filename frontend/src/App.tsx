import Header from './components/partials/header'
import Hero from './pages/Hero'
import AboutPage from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Connect from './pages/Connect'
import ClickSpark from './components/CustomCursor'
import { MotionConfig } from 'motion/react'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-black focus:px-4 focus:py-3 focus:text-white">
        Skip to content
      </a>
      <ClickSpark
      sparkColor='#2C1810'
      sparkSize={8}
      sparkRadius={20}
      sparkCount={6}
      duration={450}
      easing='ease-out'
      extraScale={1.2}
    >
      <Header />

        <main id="main-content" className="w-full h-auto">
          <Hero />
          <AboutPage />
          <Skills />
          <Projects />
          <Connect />
        </main>
      </ClickSpark>
    </MotionConfig>
    )
}

export default App
