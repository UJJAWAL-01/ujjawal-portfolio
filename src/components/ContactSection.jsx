import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Loader2, CheckCircle, AlertCircle, Linkedin, Github, Mail, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Panel } from './ui/panel';
import { SectionHeader } from './ui/section-header';
import { AmbientField } from './three/AmbientField';

const channels = [
  { label: 'EMAIL', value: 'ujjawal.patel@tamu.edu', href: 'mailto:ujjawal.patel@tamu.edu', icon: Mail },
  { label: 'LINKEDIN', value: '/in/ujjawal-patel', href: 'https://www.linkedin.com/in/ujjawal-patel-7508b8199/', icon: Linkedin },
  { label: 'GITHUB', value: '/UJJAWAL-01', href: 'https://github.com/UJJAWAL-01', icon: Github },
  { label: 'LOCATION', value: 'College Station, TX', href: null, icon: MapPin },
];

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState('idle');
  const [formData, setFormData] = useState({ name: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('loading');
    try {
      const response = await fetch('https://formspree.io/f/xpwjypyl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormState('success');
        setFormData({ name: '', message: '' });
        setTimeout(() => setFormState('idle'), 3000);
      } else {
        setFormState('error');
        setTimeout(() => setFormState('idle'), 3000);
      }
    } catch {
      setFormState('error');
      setTimeout(() => setFormState('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden" ref={ref} data-testid="contact-section">
      <AmbientField />
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-[0.15] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          index="09"
          code="~/contact"
          meta="available"
          status="active"
          title={<>Get in <span className="gradient-text">Touch</span></>}
          subtitle="Open to Summer 2026 internships and full-time early-career analyst and data roles."
        />

        <div className="grid md:grid-cols-5 gap-6 items-start">
          {/* Channels */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2"
          >
            <Panel title="Contact" status="available" tone="active">
              <div className="space-y-1">
                {channels.map((c) => {
                  const Row = (
                    <div className="flex items-center gap-3 py-2.5 border-b border-border/50 last:border-0 group">
                      <c.icon size={16} className="text-primary shrink-0" />
                      <div className="min-w-0">
                        <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{c.label}</div>
                        <div className="text-sm text-foreground/90 truncate group-hover:text-primary transition-colors">{c.value}</div>
                      </div>
                    </div>
                  );
                  return c.href ? (
                    <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="block">
                      {Row}
                    </a>
                  ) : (
                    <div key={c.label}>{Row}</div>
                  );
                })}
              </div>
            </Panel>
          </motion.div>

          {/* Message form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-3"
          >
            <Panel title="Message" status="">
              <form onSubmit={handleSubmit} className="space-y-5" data-testid="contact-form">
                <div className="space-y-2">
                  <label htmlFor="name" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="rounded-md font-mono"
                    data-testid="contact-name-input"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Type your message…"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="rounded-md resize-none font-mono"
                    data-testid="contact-message-input"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-md gap-2 font-mono uppercase tracking-wider glow-primary"
                  disabled={formState === 'loading'}
                  data-testid="contact-submit-btn"
                >
                  {formState === 'loading' && (<><Loader2 size={18} className="animate-spin" /> Sending…</>)}
                  {formState === 'success' && (<><CheckCircle size={18} /> Message sent</>)}
                  {formState === 'error' && (<><AlertCircle size={18} /> Failed, retry</>)}
                  {formState === 'idle' && (<><Send size={18} /> Send Message</>)}
                </Button>
              </form>
            </Panel>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
