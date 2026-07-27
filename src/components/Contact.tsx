import { Mail, MapPin, Send, ArrowUpRight, Phone } from 'lucide-react';
import { useState } from 'react';
import { SectionHeading } from './ui/SectionHeading';
import { AnimatedSection } from './ui/AnimatedSection';
import { PERSONAL, SOCIAL } from '../data/constants';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent('Portfolio Contact — Let\'s Connect');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:${PERSONAL.email}?subject=${subject}&body=${body}`;
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative py-32 border-t border-border/30">
      <div className="section-container">
        <SectionHeading
          label="Contact"
          title="Get in Touch"
          description="Open to full-time roles, software engineering opportunities, and project collaborations. Let's connect."
        />

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left side — Info */}
          <AnimatedSection delay={0.1}>
            <div className="space-y-8">
              <p className="text-body-lg text-text-secondary leading-relaxed">
                I'm always interested in hearing about new opportunities and engineering challenges.
                Whether you have a role, a question, or a project in mind — feel free to reach out.
              </p>

              {/* Contact details */}
              <div className="space-y-5">
                <a
                  href={SOCIAL.email}
                  className="group flex items-start gap-4 p-4 rounded-xl hover:bg-bg-surface transition-colors duration-300 border border-transparent hover:border-border"
                >
                  <div className="p-2.5 rounded-lg bg-accent-glow text-accent-mint">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="text-caption font-medium text-text-primary mb-0.5">
                      Email
                    </h4>
                    <span className="text-caption text-text-muted group-hover:text-accent-mint transition-colors duration-300">
                      {PERSONAL.email}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="ml-auto text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </a>

                <a
                  href={SOCIAL.phone}
                  className="group flex items-start gap-4 p-4 rounded-xl hover:bg-bg-surface transition-colors duration-300 border border-transparent hover:border-border"
                >
                  <div className="p-2.5 rounded-lg bg-accent-glow text-accent-mint">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="text-caption font-medium text-text-primary mb-0.5">
                      Phone
                    </h4>
                    <span className="text-caption text-text-muted group-hover:text-accent-mint transition-colors duration-300">
                      {PERSONAL.phone}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="ml-auto text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </a>

                <div className="flex items-start gap-4 p-4">
                  <div className="p-2.5 rounded-lg bg-accent-glow text-accent-mint">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="text-caption font-medium text-text-primary mb-0.5">
                      Location
                    </h4>
                    <span className="text-caption text-text-muted">
                      {PERSONAL.location}
                    </span>
                  </div>
                </div>
              </div>


              {/* Availability */}
              <div className="flex items-center gap-2 text-caption text-text-muted">
                <span className="w-2 h-2 bg-accent-mint rounded-full animate-pulse-slow" />
                {PERSONAL.availability}
              </div>
            </div>
          </AnimatedSection>

          {/* Right side — Form */}
          <AnimatedSection delay={0.2} direction="right">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-caption font-medium text-text-secondary mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-bg-surface border border-border rounded-lg text-text-primary text-body placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-caption font-medium text-text-secondary mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-bg-surface border border-border rounded-lg text-text-primary text-body placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-caption font-medium text-text-secondary mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-bg-surface border border-border rounded-lg text-text-primary text-body placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-accent text-white font-medium rounded-lg hover:bg-accent-light border border-accent/50 shadow-glow-sm hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2 text-caption"
              >
                Send Message
                <Send size={14} />
              </button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
