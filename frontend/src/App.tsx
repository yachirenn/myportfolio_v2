import { Routes, Route } from 'react-router-dom'
import Header from './components/partials/header'
import Hero from './pages/Hero'
// import Projects from './pages/Projects'

function App() {
  // const location = useLocation()
  // const isHome = location.pathname === '/'

  return (
    <>
      <Header />
      
      <main className="w-full h-auto">
        <Routes>
          <Route path="/" element={<Hero />} />
          {/* <Route path="/projects" element={<Projects />} /> */}
        </Routes>
      </main>
    </>
  )
}

export default App