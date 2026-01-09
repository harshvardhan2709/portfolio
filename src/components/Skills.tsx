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

  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 50 },
        { name: 'TypeScript', level: 40 },
        { name: 'Tailwind CSS', level: 30 },
        { name: 'React Native', level: 45 },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 70 },
        { name: 'Express.js', level: 70 },
        { name: 'MongoDB', level: 80 },
        { name: 'REST APIs', level: 70 },
      ],
    },
    {
      title: 'Other & Tools',
      skills: [
        { name: 'Github', level: 90 },
        { name: 'SQL', level: 80 },
        { name: 'Blockchain (ERC-1155)', level: 20 },
        { name: 'Linux', level: 40 },
      ],
    },
  ];

  return (
    <section id="skills" className="min-h-screen flex items-center py-20 bg-black" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-400 mb-4">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-400">Skills</span>
          </h2>

          <div className="h-1 w-20 bg-gradient-to-r from-primary-400 to-primary-400 mx-auto mb-16"></div>

          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className={`transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${categoryIndex * 200}ms` }}
              >
                <h3 className="text-2xl font-semibold text-primary-400 mb-6">{category.title}</h3>
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400 font-medium">{skill.name}</span>
                        <span className="text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary-400 to-primary-400 rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: isVisible ? `${skill.level}%` : '0%',
                            transitionDelay: `${(categoryIndex * 200) + (skillIndex * 100)}ms`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
