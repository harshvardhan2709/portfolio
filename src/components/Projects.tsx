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
        'Movie discovery app using MERN stack. Used TMDB API on the frontend, built a watchlist system with MongoDB. Had to figure out how to handle API rate limits and cache properly. Node backend mostly handles auth and user data.',
      tags: ['React', 'Node.js', 'MongoDB', 'TMDB API'],
      github: 'https://github.com/harshvardhan2709/Movies-Website',
      demo: 'https://github.com/harshvardhan2709/Movies-Website',
    },
    {
      title: 'Getlancer',
      description:
        'Freelance marketplace with role-based dashboards. Built with a team—I handled most of the client-side dashboard and authentication flow. Learned about handling different user types in React without overcomplicating state. Used Tailwind which sped things up.',
      tags: ['React', 'Tailwind', 'MongoDB', 'Auth'],
      github: 'https://github.com/prathmesh796/getlancer',
      demo: 'https://github.com/prathmesh796/getlancer',
    },
    {
      title: 'IoT Gate Control App',
      description:
        'React Native app for controlling access to IoT gates. Three role types (Super Admin, Admin, User), REST API integration. First time dealing with role-based permissions on mobile—took a while to get the async storage and API token flow right.',
      tags: ['React Native', 'IoT', 'REST API'],
      github: 'https://github.com/vishu-2004/IoT-Gate-Control-and-Access-management-app',
      demo: 'https://github.com/vishu-2004/IoT-Gate-Control-and-Access-management-app',
    },
  ];

  return (
    <section id="projects" className="min-h-screen flex items-center py-20" ref={sectionRef}>
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div
          className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-2">
            Projects
          </h2>
          <div className="w-16 h-1 bg-primary-400 mb-12"></div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-slate-900/60 rounded-lg border border-slate-700/50 p-6 hover:border-primary-400/50 hover:bg-slate-900/80 transition-all"
              >
                <h3 className="text-xl font-semibold text-gray-200 mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs text-gray-500"
                    >
                      {tag}{tagIndex < project.tags.length - 1 ? ' •' : ''}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors text-sm"
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
