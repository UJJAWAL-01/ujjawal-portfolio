import { motion } from 'framer-motion';
import { Linkedin, Github, Mail, Heart } from 'lucide-react';

const socialLinks = [
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/ujjawal-patel-7508b8199/',
    label: 'LinkedIn',
  },
  {
    icon: Github,
    href: 'https://github.com/UJJAWAL-01',
    label: 'GitHub',
  },
  {
    icon: Mail,
    href: 'mailto:ujjawal.patel@tamu.edu',
    label: 'Email',
  },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <a href="#hero" className="text-xl font-bold font-['Outfit']" data-testid="footer-logo">
              <span className="text-primary">Ujjawal</span>{' '}
              <span className="text-foreground">Patel</span>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.label}
                data-testid={`footer-social-${link.label.toLowerCase()}`}
              >
                <link.icon size={18} />
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-sm text-muted-foreground flex items-center gap-1"
            data-testid="footer-copyright"
          >
            © {currentYear} Ujjawal Patel. Built with{' '}
            <Heart size={14} className="text-red-500 fill-red-500" /> in React
          </motion.p>
        </div>
      </div>
    </footer>
  );
};