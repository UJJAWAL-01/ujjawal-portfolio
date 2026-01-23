import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

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
        headers: {
          'Content-Type': 'application/json',
        },
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
    } catch (error) {
      setFormState('error');
      setTimeout(() => setFormState('idle'), 3000);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-32 relative"
      ref={ref}
      data-testid="contact-section"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-mono uppercase tracking-widest text-primary mb-4" data-testid="contact-label">
            Get In Touch
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4" data-testid="contact-title">
            Let's Connect
          </h2>
          <p className="text-muted-foreground">
            Have a question or want to collaborate? Drop me a message!
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass-card rounded-2xl p-6 md:p-8 space-y-6"
          data-testid="contact-form"
        >
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-foreground">
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
              className="rounded-lg"
              data-testid="contact-name-input"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-foreground">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Your message..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={5}
              className="rounded-lg resize-none"
              data-testid="contact-message-input"
            />
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full gap-2"
              disabled={formState === 'loading'}
              data-testid="contact-submit-btn"
            >
              {formState === 'loading' && (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending...
                </>
              )}
              {formState === 'success' && (
                <>
                  <CheckCircle size={18} />
                  Message Sent!
                </>
              )}
              {formState === 'error' && (
                <>
                  <AlertCircle size={18} />
                  Failed to Send
                </>
              )}
              {formState === 'idle' && (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </Button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
};