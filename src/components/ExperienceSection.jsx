import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Calendar, MapPin, ChevronDown, ChevronUp, Briefcase, Shield, Code2 } from 'lucide-react';
import { Button } from './ui/button';

const experiences = [
  {
    title: 'Business Analyst Intern',
    company: 'ESPS Finserv Pvt. Ltd.',
    location: 'Mumbai, India',
    period: 'Jan 2025 – Jun 2025',
    icon: Briefcase,
    gradient: 'from-blue-600 to-cyan-500',
    shortDescription: 'Built product catalog, trading indicators, and researched arbitrage models to improve client portfolios and profitability.',
    fullDescription: [
      'Designed and implemented an integrated product catalog system for streamlined client access',
      'Developed automated research pipelines for market analysis',
      'Built long-short trading signals that increased profit margins by 20%',
      'Conducted arbitrage model research to optimize portfolio performance',
    ],
  },
  {
    title: 'Forensic Analyst Intern',
    company: 'DeepCytes Cyberlabs (UK)',
    location: 'Remote',
    period: 'Jun 2024 – Dec 2024',
    icon: Shield,
    gradient: 'from-purple-600 to-pink-500',
    shortDescription: 'Automated toolkit development, improved investigation efficiency, and co-developed hardware to prevent juice-jacking attacks.',
    fullDescription: [
      'Contributed to a comprehensive forensic investigation toolkit',
      'Authored technical documentation and investigation manuals',
      'Co-developed hardware prototypes to prevent juice-jacking attacks on field devices',
      'Enhanced investigation efficiency through automation',
    ],
  },
  {
    title: 'Application Developer Intern',
    company: 'K.J. Somaiya College of Engineering',
    location: 'Mumbai, India',
    period: 'Jan 2023 – Mar 2023',
    icon: Code2,
    gradient: 'from-green-600 to-emerald-500',
    shortDescription: 'Built an Android app for medicine redistribution—led interface design and development with impactful community outcomes.',
    fullDescription: [
      'Developed intuitive mobile interfaces using Java and Android Studio',
      'Designed user experience flows in Figma for optimal usability',
      'Led end-to-end development of medicine redistribution application',
      'Achieved measurable community health impact through technology',
    ],
  },
];

const ExperienceCard = ({ experience, index, isInView }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative pl-8 md:pl-12"
      data-testid={`experience-item-${index}`}
    >
      {/* Timeline dot */}
      <div className={`absolute left-0 w-4 h-4 rounded-full bg-gradient-to-br ${experience.gradient} transform -translate-x-1/2 z-10`}>
        <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: 'inherit' }} />
      </div>

      {/* Content */}
      <div className="glass-card rounded-2xl p-6 md:p-8 card-hover">
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${experience.gradient} flex items-center justify-center flex-shrink-0`}>
            <experience.icon className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-foreground mb-1">
              {experience.title}
            </h3>
            <p className="text-primary font-medium">{experience.company}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {experience.period}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {experience.location}
          </span>
        </div>

        <p className="text-muted-foreground mb-4">
          {experience.shortDescription}
        </p>

        {/* Expandable Content */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <ul className="space-y-2 mb-4 pt-2 border-t border-border">
            {experience.fullDescription.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="gap-2"
          data-testid={`experience-expand-${index}`}
        >
          {isExpanded ? (
            <>
              Read Less <ChevronUp size={16} />
            </>
          ) : (
            <>
              Read More <ChevronDown size={16} />
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="experience"
      className="py-20 md:py-32 relative"
      ref={ref}
      data-testid="experience-section"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono uppercase tracking-widest text-primary mb-4" data-testid="experience-label">
            Professional Journey
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight" data-testid="experience-title">
            Experience
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary" />

          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.title}
                experience={experience}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};