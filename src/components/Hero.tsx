import { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Hi, I'm{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            John Doe
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-4">Computer Science Student</p>

        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          Passionate about building innovative solutions and exploring the endless possibilities of
          technology
        </p>

        <div className="flex justify-center gap-4 mb-12">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-slate-800 rounded-full hover:bg-cyan-500 transition-all duration-300 transform hover:scale-110"
          >
            <Github className="text-white" size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-slate-800 rounded-full hover:bg-cyan-500 transition-all duration-300 transform hover:scale-110"
          >
            <Linkedin className="text-white" size={24} />
          </a>
          <a
            href="mailto:johndoe@example.com"
            className="p-3 bg-slate-800 rounded-full hover:bg-cyan-500 transition-all duration-300 transform hover:scale-110"
          >
            <Mail className="text-white" size={24} />
          </a>
        </div>

        <button
          onClick={scrollToNext}
          className="animate-bounce text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ChevronDown size={40} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
