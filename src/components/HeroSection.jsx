import { motion } from 'framer-motion';
import { MapPin, Linkedin, Github, Mail, FileText, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { ParticleBackground } from './ParticleBackground';

export const HeroSection = () => {
  const roles = ['Graduate MIS Student', 'Business Analyst', 'Technical Analyst'];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="hero-section"
    >
      {/* Particle Background */}
      <ParticleBackground />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4"
            data-testid="hero-greeting"
          >
            Welcome to my portfolio
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
            data-testid="hero-name"
          >
            <span className="text-foreground">Ujjawal</span>{' '}
            <span className="gradient-text">Patel</span>
          </motion.h1>

          {/* Roles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-8"
            data-testid="hero-roles"
          >
            {roles.map((role, index) => (
              <motion.span
                key={role}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                className="text-lg md:text-xl text-muted-foreground"
              >
                {role}
                {index < roles.length - 1 && (
                  <span className="mx-2 md:mx-4 text-primary">·</span>
                )}
              </motion.span>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed mb-8"
            data-testid="hero-description"
          >
            Pursuing an MS in Management Information Systems at Texas A&M Mays Business School.
            Passionate about bridging business, data, and technology to deliver impactful,
            data-driven solutions. Explore my journey through analytics, trading systems, and cybersecurity.
          </motion.p>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center justify-center gap-2 text-muted-foreground mb-10"
            data-testid="hero-location"
          >
            <MapPin size={18} className="text-primary" />
            <span>College Station, Texas, USA</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4"
            data-testid="hero-cta"
          >
            <motion.a
              href="https://www.linkedin.com/in/ujjawal-patel-7508b8199/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="lg" className="rounded-full gap-2" data-testid="cta-linkedin">
                <Linkedin size={18} />
                LinkedIn
              </Button>
            </motion.a>
            <motion.a
              href="https://github.com/UJJAWAL-01"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="lg" className="rounded-full gap-2" data-testid="cta-github">
                <Github size={18} />
                GitHub
              </Button>
            </motion.a>
            <motion.a
              href="mailto:ujjawal.patel@tamu.edu"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="lg" className="rounded-full gap-2" data-testid="cta-email">
                <Mail size={18} />
                Email
              </Button>
            </motion.a>
            <motion.a
              href="/Resume_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="rounded-full gap-2" data-testid="cta-resume">
                <FileText size={18} />
                Resume
              </Button>
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <button
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-muted-foreground hover:text-foreground transition-colors animate-bounce"
            data-testid="scroll-indicator"
          >
            <ChevronDown size={32} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};