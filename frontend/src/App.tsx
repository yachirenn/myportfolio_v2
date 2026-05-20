import './App.css'
import Header from './components/partials/header'
import Hero from './pages/Hero'

function App() {
  return (
    <>
      <Header />
      
      <main className="w-full h-auto">
        {/* Hero Section */}
        <Hero />
      </main>
    </>
  )
}

export default App
