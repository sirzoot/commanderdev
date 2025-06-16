import { Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import LoadingScreen from './components/layout/LoadingScreen';
import Home from './pages/Home';
import Listings from './pages/Listings';
import About from './pages/About';
import Contact from './pages/Contact';
import LenisProvider from './components/ui/lenis_provider';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <Router>
      <LenisProvider>
        <div className="min-h-screen bg-white">
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
          {!isLoading && (
            <Suspense fallback={
              <div className="h-screen w-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            }>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/listings" element={<Listings />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Suspense>
          )}
        </div>
      </LenisProvider>
    </Router>
  );
}

export default App;
