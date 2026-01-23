import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar } from 'lucide-react';

const educationData = [
  {
    degree: 'Master of Science in Management Information Systems',
    institution: 'Texas A&M University, Mays Business School',
    location: 'College Station, Texas',
    period: 'Expected May 2027',
    logo: '/TAM-MaroonBox-1.png',
    color: 'from-[#500000] to-[#7a0000]',
    highlights: ['Graduate MIS Program', 'Business Analytics Focus'],
  },
  {
    degree: 'Bachelor of Technology in Computer Engineering',
    institution: 'K.J. Somaiya College of Engineering',
    location: 'Mumbai, India',
    period: 'Graduated May 2025',
    logo: '/download.png',
    color: 'from-primary to-accent',
    highlights: ['Honors in Cybersecurity, Forensics & Cyber Laws', 'Computer Engineering Curriculum'],
  },
];

export const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="education"
      className="py-20 md:py-32 relative"
      ref={ref}
      data-testid="education-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono uppercase tracking-widest text-primary mb-4" data-testid="education-label">
            Academic Background
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight" data-testid="education-title">
            Education
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {educationData.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                data-testid={`education-item-${index}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2 z-10 glow-primary" />

                {/* Content */}
                <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                  <div className="glass-card rounded-2xl p-6 md:p-8 card-hover group">
                    <div className="flex items-start gap-4 mb-4">
                      {/* Logo */}
                      <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
                        <img
                          src={edu.logo}
                          alt={`${edu.institution} logo`}
                          className="w-14 h-14 object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-foreground mb-1 leading-tight">
                          {edu.degree}
                        </h3>
                        <p className="text-primary font-medium">{edu.institution}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {edu.period}
                      </span>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {edu.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="pill text-xs"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};