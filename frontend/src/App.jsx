import Hero from './components/home/Hero'
import Stats from './components/home/Stats'
import FeaturedListings from './components/home/FeaturedListings'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <Hero />
        <Stats />
        <FeaturedListings />
      </main>
    </div>
  )
}

export default App
