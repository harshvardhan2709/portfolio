import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useEffect } from 'react';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { useScrollSpy } from './hooks/useScrollSpy';
import { SECTION_IDS } from './data/constants';
import ChatBot from './components/chat/ChatBot';

function App() {
  const activeSection = useScrollSpy([...SECTION_IDS]);

  useEffect(() => {
    const id = window.location.hash;
    if (!id || id === '#') return;
    const el = document.querySelector(id);
    if (el) requestAnimationFrame(() => el.scrollIntoView());
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary noise-bg">
      <ScrollProgress />
      <Navigation activeSection={activeSection} />

      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}

export default App;
