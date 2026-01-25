// src/components/Skills.tsx

import { useEffect, useRef, useState } from 'react';

const Skills = () => {
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
    <section id="skills" className="min-h-screen flex items-center py-20 bg-slate-950" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div
          className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-2">
            Skills
          </h2>
          <div className="w-16 h-1 bg-primary-400 mb-10"></div>

          <div className="space-y-5 text-gray-400">
            <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-200 mb-3">Frontend</h3>
              <p className="leading-relaxed text-gray-400">
                React, TypeScript, Tailwind, React Native. Used React for 2+ years, TypeScript for about a year.
                Comfortable with hooks, context, and component patterns. Still learning better state management approaches.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-200 mb-3">Backend</h3>
              <p className="leading-relaxed text-gray-400">
                Node.js, Express, MongoDB, REST APIs. MongoDB is my go-to database.
                Built several CRUD apps and handled auth flows. Not an expert but can build functional backends.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-200 mb-3">Tools & Other</h3>
              <p className="leading-relaxed text-gray-400">
                Git/GitHub for version control, basic Linux commands, SQL (used in some projects).
                Currently learning blockchain concepts (ERC-1155) for my current project.
              </p>
            </div>

            <div className="pt-6 mt-2 border-t border-slate-700/50">
              <p className="text-sm text-gray-500">
                Main stack: MERN (MongoDB, Express, React, Node.js) + TypeScript + Tailwind
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
