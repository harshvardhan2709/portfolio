import { MapPin, ArrowUpRight, Send } from 'lucide-react';
import { useState } from 'react';
import { SectionHeading } from './ui/SectionHeading';
import { AnimatedSection } from './ui/AnimatedSection';
import { PERSONAL, SOCIAL } from '../data/constants';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Opens the visitor's email client — no backend, no fake success state.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    window.location.href = `mailto:${PERSONAL.email}?subject=${subject}&body=${body}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Backdrop glow */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-accent/6 rounded-full blur-[140px]" />
      </div>

      <div className="section-container relative">
        <SectionHeading
          index="06"
          label="Contact"
          title="Let's build something"
          description="Open to full-time roles, software engineering opportunities, and project collaborations."
        />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Direct channels */}
          <div className="lg:col-span-5">
            <AnimatedSection delay={0.1}>
              <div className="p-6 sm:p-8 rounded-2xl bg-bg-surface/50 border border-border space-y-4">
                <p className="font-mono text-label uppercase tracking-wider text-text-muted mb-2">
                  Get In Touch Directly
                </p>

                <a
                  href={SOCIAL.email}
                  className="group flex items-center justify-between gap-4 py-3.5 px-3 rounded-xl hover:bg-bg-elevated/70 border border-transparent hover:border-border transition-all duration-300"
                >
                  <div>
                    <span className="block font-mono text-label uppercase text-text-muted mb-0.5">Email</span>
                    <span className="block text-body text-text-primary group-hover:text-accent-mint transition-colors duration-300 break-all">
                      {PERSONAL.email}
                    </span>
                  </div>
                  <ArrowUpRight size={16} className="text-text-muted group-hover:text-accent-mint group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0" />
                </a>

                <a
                  href={SOCIAL.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-3.5 px-3 rounded-xl hover:bg-bg-elevated/70 border border-transparent hover:border-border transition-all duration-300"
                >
                  <div>
                    <span className="block font-mono text-label uppercase text-text-muted mb-0.5">GitHub</span>
                    <span className="block text-body text-text-primary group-hover:text-accent-mint transition-colors duration-300">
                      github.com/harshvardhan2709
                    </span>
                  </div>
                  <ArrowUpRight size={16} className="text-text-muted group-hover:text-accent-mint group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0" />
                </a>

                <a
                  href={SOCIAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-3.5 px-3 rounded-xl hover:bg-bg-elevated/70 border border-transparent hover:border-border transition-all duration-300"
                >
                  <div>
                    <span className="block font-mono text-label uppercase text-text-muted mb-0.5">LinkedIn</span>
                    <span className="block text-body text-text-primary group-hover:text-accent-mint transition-colors duration-300">
                      Harshvardhan Sawant
                    </span>
                  </div>
                  <ArrowUpRight size={16} className="text-text-muted group-hover:text-accent-mint group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0" />
                </a>

                <a
                  href={SOCIAL.phone}
                  className="group flex items-center justify-between gap-4 py-3.5 px-3 rounded-xl hover:bg-bg-elevated/70 border border-transparent hover:border-border transition-all duration-300"
                >
                  <div>
                    <span className="block font-mono text-label uppercase text-text-muted mb-0.5">Phone</span>
                    <span className="block text-body text-text-primary group-hover:text-accent-mint transition-colors duration-300">
                      {PERSONAL.phone}
                    </span>
                  </div>
                  <ArrowUpRight size={16} className="text-text-muted group-hover:text-accent-mint group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0" />
                </a>

                <div className="pt-2 border-t border-border/60 space-y-3">
                  <div className="flex items-center gap-3 px-3 py-1">
                    <MapPin size={16} className="text-accent-mint flex-shrink-0" />
                    <span className="text-caption text-text-secondary">{PERSONAL.location}</span>
                  </div>

                  <div className="flex items-start gap-3 px-3 py-1">
                    <span className="relative flex h-2 w-2 mt-1.5 flex-shrink-0">
                      <span className="animate-pulse-slow absolute inline-flex h-full w-full rounded-full bg-accent-mint opacity-60" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-mint" />
                    </span>
                    <span className="font-mono text-caption text-text-muted leading-relaxed">
                      {PERSONAL.availability}
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Email composer (opens the visitor's mail client) */}
          <AnimatedSection delay={0.2} direction="left" className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-bg-surface/50 border border-border">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block font-mono text-label uppercase text-text-muted mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-bg-elevated/60 border border-border rounded-xl text-text-primary text-body placeholder:text-text-muted/50 focus:outline-none focus:border-accent-mint/60 transition-colors duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block font-mono text-label uppercase text-text-muted mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-bg-elevated/60 border border-border rounded-xl text-text-primary text-body placeholder:text-text-muted/50 focus:outline-none focus:border-accent-mint/60 transition-colors duration-300"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block font-mono text-label uppercase text-text-muted mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-bg-elevated/60 border border-border rounded-xl text-text-primary text-body placeholder:text-text-muted/50 focus:outline-none focus:border-accent-mint/60 transition-colors duration-300 resize-none"
                    placeholder="Tell me about the role or project…"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-accent text-white font-mono text-label uppercase tracking-wider border border-accent/60 hover:bg-accent-light transition-all duration-300 shadow-glow-sm hover:shadow-glow cursor-pointer"
                  >
                    <span>Compose email</span>
                    <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </button>
                  <p className="font-mono text-caption text-text-muted">
                    Opens your default email client.
                  </p>
                </div>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
