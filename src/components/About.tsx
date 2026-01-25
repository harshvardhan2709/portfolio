import { useEffect, useRef, useState } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="min-h-screen flex items-center py-20 bg-slate-950" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-2">
            About
          </h2>
          <div className="w-16 h-1 bg-primary-400 mb-8"></div>

          <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-8 space-y-5 text-gray-400 leading-relaxed">
            <p>
              I'm in my final year studying IT. I've been writing code for a few years now—mostly React, React Native, and Node.js.
            </p>

            <p>
              I did two internships (Climekare and Athena Automation) where I built frontend stuff and worked with APIs.
              Right now I'm contributing to a carbon credit tokenization project using blockchain (ERC-1155), which has been a learning curve.
            </p>

            <p>
              I like figuring out how to make things work, even when documentation is unclear. I'm comfortable with MERN stack
              and trying to get better at TypeScript and writing cleaner code. Still learning constantly.
            </p>

            <p className="pt-4">
              <span className="text-gray-300 font-medium">Currently:</span> Final year B.E. in Information Technology, graduating 2026
              <br />
              <span className="text-gray-300 font-medium">Internships:</span> Climekare, Athena Automation
              <br />
              <span className="text-gray-300 font-medium">Stack:</span> React • React Native • Node.js • MongoDB • TypeScript
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
