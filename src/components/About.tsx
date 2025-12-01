import { useEffect, useRef, useState } from 'react';
import { Code2, Laptop, Rocket } from 'lucide-react';

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

  const features = [
    {
      icon: <Code2 size={32} />,
      title: 'Frontend Specialist',
      description: 'React.js, TypeScript & Tailwind — building responsive, accessible UIs',
    },
    {
      icon: <Laptop size={32} />,
      title: 'Full-Stack',
      description: 'Node.js & Express backend experience with MongoDB and REST APIs',
    },
    {
      icon: <Rocket size={32} />,
      title: 'Fast Learner',
      description: 'Quickly pick up new tools (React Native, Blockchain, Dev tooling)',
    },
  ];

  return (
    <section id="about" className="min-h-screen flex items-center py-20" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Me</span>
          </h2>

          <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm Harshvardhan Uttam Sawant, a final-year Information Technology student (B.E.) specialising in frontend and mobile app development.
                I enjoy building elegant, user-friendly interfaces and backends. My work spans React, React Native, Node.js, and MongoDB,
                and I have hand-on experience through internships.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Currently contributing to a blockchain-based carbon credit tokenization platform and continuously exploring web3, React Native, and
                performance-first front-end patterns. I focus on building scalable, maintainable code and contributing to open-source when possible.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700 hover:border-cyan-400 transition-all duration-300">
                <div className="text-3xl font-bold text-cyan-400 mb-2">10+</div>
                <div className="text-gray-400">Projects (personal & academic)</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700 hover:border-cyan-400 transition-all duration-300">
                <div className="text-3xl font-bold text-cyan-400 mb-2">Internships</div>
                <div className="text-gray-400">Climekare, Athena Automation</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700 hover:border-cyan-400 transition-all duration-300">
                <div className="text-3xl font-bold text-cyan-400 mb-2">Tech Stack</div>
                <div className="text-gray-400">React • Node • MongoDB • Blockchain</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700 hover:border-cyan-400 transition-all duration-300">
                <div className="text-3xl font-bold text-cyan-400 mb-2">2026</div>
                <div className="text-gray-400">Graduation Year</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-slate-800/50 backdrop-blur-sm p-8 rounded-lg border border-slate-700 hover:border-cyan-400 transition-all duration-300 transform hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-cyan-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
