// src/components/Projects.tsx

import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
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

  const projects = [
    {
      title: 'Movies-Website',
      description:
        'Full-stack MERN app to discover movies using a third-party API. React frontend + Node/Express backend and MongoDB for user data (watchlists).',
      tags: ['React', 'Node.js', 'MongoDB', 'API'],
      github: 'https://github.com/harshvardhan2709/Movies-Website',
      demo: 'https://github.com/harshvardhan2709/Movies-Website',
    },
    {
      title: 'Freelancer Web Platform (Getlancer)',
      description:
        'Responsive freelance marketplace with role-based dashboards (Client & Freelancer), authentication, and job management.',
      tags: ['React', 'Tailwind', 'MongoDB'],
      github: 'https://github.com/prathmesh796/getlancer',
      demo: 'https://github.com/prathmesh796/getlancer',
    },
    {
      title: 'IoT Gate Control & Access Management App',
      description:
        'React Native frontend for IoT-based gate control with role-based access (Super Admin, Admin, User), integrated with REST APIs.',
      tags: ['React Native', 'IoT', 'Role-Based Access'],
      github: 'https://github.com/vishu-2004/IoT-Gate-Control-and-Access-management-app',
      demo: 'https://github.com/vishu-2004/IoT-Gate-Control-and-Access-management-app',
    },
  ];

  return (
    <section id="projects" className="min-h-screen flex items-center py-20" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-400 mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-400">Projects</span>
          </h2>

          <div className="h-1 w-20 bg-gradient-to-r from-primary-400 to-primary-400 mx-auto mb-16"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`bg-black backdrop-blur-sm rounded-lg border border-slate-700 overflow-hidden transition-all duration-500 hover:border-primary-400 hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-400 mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-xs bg-slate-700/50 text-primary-400 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors"
                    >
                      <Github size={18} />
                      <span className="text-sm">Code</span>
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span className="text-sm">Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
