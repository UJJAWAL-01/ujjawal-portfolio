import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, GraduationCap } from 'lucide-react';
import { Panel } from './ui/panel';
import { SectionHeader } from './ui/section-header';
import tamuLogo from '../assets/TAM-MaroonBox-1.png';
import somaiyaLogo from '../assets/download.png';

const educationData = [
  {
    code: 'TAMU',
    degree: 'M.S. Management Information Systems',
    institution: 'Texas A&M University · Mays Business School',
    location: 'College Station, Texas',
    period: 'Expected May 2027',
    status: 'IN PROGRESS',
    tone: 'active',
    logo: tamuLogo,
    highlights: ['Graduate MIS Program', 'Business Analytics Focus'],
  },
  {
    code: 'KJSCE',
    degree: 'B.Tech. Computer Engineering',
    institution: 'K.J. Somaiya College of Engineering',
    location: 'Mumbai, India',
    period: 'Graduated May 2025',
    status: 'COMPLETE',
    tone: 'closed',
    logo: somaiyaLogo,
    highlights: ['Honors: Cybersecurity, Forensics & Cyber Laws', 'Computer Engineering'],
  },
];

export const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="education" className="py-20 md:py-32 relative" ref={ref} data-testid="education-section">
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-[0.12] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          index="02"
          code="~/education"
          meta="2 records"
          title={<><span className="gradient-text">Education</span></>}
          subtitle="Where the foundations came from."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.code}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Panel code={edu.code} title={edu.institution} status={edu.status} tone={edu.tone} blink={edu.tone === 'active'} className="h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-md bg-white flex items-center justify-center flex-shrink-0 overflow-hidden border border-border">
                    <img
                      src={edu.logo}
                      alt={`${edu.institution} logo`}
                      className="w-11 h-11 object-contain"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-accent mb-1">
                      <GraduationCap size={14} />
                      <span className="font-mono text-[10px] uppercase tracking-widest">Degree</span>
                    </div>
                    <h3 className="text-base md:text-lg font-display font-bold text-foreground leading-tight">
                      {edu.degree}
                    </h3>
                  </div>
                </div>

                <div className="data-row text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Calendar size={13} /> Term</span>
                  <span className="text-foreground/90">{edu.period}</span>
                </div>
                <div className="data-row text-muted-foreground">
                  <span>Location</span>
                  <span className="text-foreground/90">{edu.location}</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {edu.highlights.map((h) => (
                    <span key={h} className="font-mono text-[11px] text-primary/80 border border-primary/20 bg-primary/5 rounded px-2 py-0.5">
                      {h}
                    </span>
                  ))}
                </div>
              </Panel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
