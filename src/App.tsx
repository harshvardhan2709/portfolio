import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { useScrollSpy } from './hooks/useScrollSpy';
import { SECTION_IDS } from './data/constants';

function App() {
  const activeSection = useScrollSpy([...SECTION_IDS]);

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
    </div>
  );
}

export default App;
