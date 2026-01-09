import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Send, Phone } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent("New message from portfolio contact form");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage: ${formData.message}`
    );

    window.location.href = `mailto:harshvardhansawant2022.it@mmcoe.edu.in?subject=${subject}&body=${body}`;

    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="min-h-screen flex items-center py-20 bg-black" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-400 mb-4">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-400">Touch</span>
          </h2>

          <div className="h-1 w-20 bg-gradient-to-r from-primary-400 to-primary-400 mx-auto mb-16"></div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-400 mb-6">Let's work together</h3>
                <p className="text-gray-400 leading-relaxed">
                  I'm open to internships, freelance projects, and collaborations in web & mobile development.
                  Reach out and let's build something great.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-black rounded-lg">
                    <Mail className="text-primary-400" size={24} />
                  </div>
                  <div>
                    <h4 className="text-gray-400 font-medium mb-1">Email</h4>
                    <a href="mailto:sawantharsh2022@gmail.com" className="text-gray-400 hover:text-primary-400 transition-colors">
                      sawantharsh2022@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-black rounded-lg">
                    <Phone className="text-primary-400" size={24} />
                  </div>
                  <div>
                    <h4 className="text-gray-400 font-medium mb-1">Phone</h4>
                    <p className="text-gray-400">+91-9322758958</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-black rounded-lg">
                    <MapPin className="text-primary-400" size={24} />
                  </div>
                  <div>
                    <h4 className="text-gray-400 font-medium mb-1">Location</h4>
                    <p className="text-gray-400">Pune, Maharashtra, India</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-slate-700 rounded-lg text-gray-400 focus:outline-none focus:border-primary-400 transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-slate-700 rounded-lg text-gray-400 focus:outline-none focus:border-primary-400 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-black border border-slate-700 rounded-lg text-gray-400 focus:outline-none focus:border-primary-400 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-primary-400 to-primary-400 text-black font-medium rounded-lg hover:shadow-lg hover:shadow-primary-400/50 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Send Message
                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-700 text-center">
            <p className="text-gray-400">
              &copy; 2025 Harshvardhan U. Sawant. Built with React & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
