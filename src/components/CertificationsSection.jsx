import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Cloud, BarChart2, Palette, FolderGit2, Database } from 'lucide-react';
import { Button } from './ui/button';

const certifications = [
  {
    title: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services',
    icon: Cloud,
    gradient: 'from-orange-500 to-amber-500',
    link: 'https://www.credly.com/go/RfYK5cG3GUhQa4T8jckmDQ',
  },
  {
    title: 'Bloomberg Market Concepts',
    issuer: 'Bloomberg',
    icon: BarChart2,
    gradient: 'from-blue-600 to-blue-400',
    link: 'https://portal.bloombergforeducation.com/certificates/v8shJE9tdA2ey6x1XRTk8akx',
  },
  {
    title: 'Databases and SQL for Data Science',
    issuer: 'IBM via Coursera',
    icon: Database,
    gradient: 'from-cyan-500 to-blue-500',
    link: 'https://coursera.org/share/604cd016a1fc11f3c3c414726fc254d0',
  },
  {
    title: 'Google UX Design Specialization',
    issuer: 'Google via Coursera',
    icon: Palette,
    gradient: 'from-green-500 to-emerald-500',
    link: 'https://coursera.org/share/6df8d69758ab3cf00ff396bea25f4090',
  },
  {
    title: 'Google Project Management: Foundations',
    issuer: 'Google via Coursera',
    icon: FolderGit2,
    gradient: 'from-purple-500 to-violet-500',
    link: 'https://coursera.org/share/9974fbc991abb53e55e55c20acd7d7f9',
  },
  
];

export const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="certifications"
      className="py-20 md:py-32 relative"
      ref={ref}
      data-testid="certifications-section"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 section-gradient pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono uppercase tracking-widest text-primary mb-4" data-testid="certifications-label">
            Credentials
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight" data-testid="certifications-title">
            Certifications
          </h2>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 card-hover group"
              data-testid={`certification-card-${index}`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cert.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <cert.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-foreground mb-1 leading-tight group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                </div>
              </div>

              <motion.a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button variant="outline" size="sm" className="w-full rounded-full gap-2" data-testid={`certification-link-${index}`}>
                  View Certificate
                  <ExternalLink size={14} />
                </Button>
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};