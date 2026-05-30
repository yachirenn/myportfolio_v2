import Header from './components/partials/header'
import Hero from './pages/Hero'
import About from './pages/About'
import ClickSpark from './components/CustomCursor'

function App() {
  return (
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

      <main className="w-full h-auto">
        <Hero />
        <About />
      </main>
    </ClickSpark>
  )
}

export default App