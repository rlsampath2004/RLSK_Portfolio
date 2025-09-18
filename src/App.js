import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Certifications from './pages/Certifications';
import ContactAdmin from './components/ContactAdmin';
import LoadingScreen from './components/LoadingScreen';
import CyberCursor from './components/CyberCursor';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();

  // Remove fixed timeout; end loading when animation completes
  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);

  if (isLoading) {
    const isAdminRoute = location.pathname.startsWith('/admin');
    return <LoadingScreen isAdmin={isAdminRoute} onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="App">
      <Helmet>
        <title>RLSK Portfolio - Java Developer & Problem Solver</title>
        <meta name="description" content="Ranga Lakshman Sampath Kumar - Java Developer and Problem Solver" />
        <meta name="keywords" content="Java Developer, Problem Solver, Portfolio, React" />
        <meta name="author" content="Ranga Lakshman Sampath Kumar" />
        <meta property="og:title" content="RLSK Portfolio - Java Developer & Problem Solver" />
        <meta property="og:description" content="Passionate Java Developer with expertise in building reliable and scalable systems" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-portfolio-url.com" />
        <meta property="og:image" content="%PUBLIC_URL%/og-image.jpg" />
        <link rel="canonical" href="https://your-portfolio-url.com" />
      </Helmet>

      <CyberCursor />
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/contacts" element={<ContactAdmin />} />
        </Routes>
      </main>
    </div>
  );
}

export default App; 