// src/components/Hero.tsx

import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative"
    >
      <div
        className={`max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-gray-100 mb-2">
          Harshvardhan Sawant
        </h1>
        <div className="w-16 h-1 bg-primary-400 mb-6"></div>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-medium">
          Frontend & Mobile Developer
        </p>

        <p className="text-base text-gray-400 mb-8 max-w-xl leading-relaxed">
          I build web and mobile apps. Right now I'm working on carbon credit tokenization with blockchain (learning as I go).
          Before that, music apps and IoT stuff.
        </p>

        <div className="flex gap-4">
          <a
            href="https://github.com/harshvardhan2709"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-slate-800/80 rounded-lg hover:bg-primary-400/10 hover:border hover:border-primary-400 transition-all"
            aria-label="GitHub"
          >
            <Github className="text-gray-400" size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/harshvardhan-sawant-86656b266/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-slate-800/80 rounded-lg hover:bg-primary-400/10 hover:border hover:border-primary-400 transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin className="text-gray-400" size={20} />
          </a>
          <a
            href="mailto:sawantharsh2022@gmail.com"
            className="p-3 bg-slate-800/80 rounded-lg hover:bg-primary-400/10 hover:border hover:border-primary-400 transition-all"
            aria-label="Email"
          >
            <Mail className="text-gray-400" size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
