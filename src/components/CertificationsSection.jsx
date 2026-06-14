import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Cloud, BarChart2, Palette, FolderGit2, Database, BadgeCheck } from 'lucide-react';
import { Panel } from './ui/panel';
import { SectionHeader } from './ui/section-header';

const certifications = [
  { code: 'AWS', title: 'AWS Certified AI Practitioner', issuer: 'Amazon Web Services', icon: Cloud, link: 'https://www.credly.com/go/RfYK5cG3GUhQa4T8jckmDQ' },
  { code: 'BMC', title: 'Bloomberg Market Concepts', issuer: 'Bloomberg', icon: BarChart2, link: 'https://portal.bloombergforeducation.com/certificates/v8shJE9tdA2ey6x1XRTk8akx' },
  { code: 'SQL', title: 'Databases and SQL for Data Science', issuer: 'IBM · Coursera', icon: Database, link: 'https://coursera.org/share/604cd016a1fc11f3c3c414726fc254d0' },
  { code: 'UX', title: 'Google UX Design Specialization', issuer: 'Google · Coursera', icon: Palette, link: 'https://coursera.org/share/6df8d69758ab3cf00ff396bea25f4090' },
  { code: 'PM', title: 'Google Project Management', issuer: 'Google · Coursera', icon: FolderGit2, link: 'https://coursera.org/share/9974fbc991abb53e55e55c20acd7d7f9' },
];

export const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="certifications" className="py-20 md:py-32 relative" ref={ref} data-testid="certifications-section">
      <div className="absolute inset-0 section-gradient pointer-events-none" />
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-[0.15] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          index="07"
          code="~/credentials"
          meta={`${certifications.length} verified`}
          title={<>Credentials <span className="gradient-text">Registry</span></>}
          subtitle="Verified certifications. Every row links to the issuer's record."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Panel code="REG" title="Registry" status={`${certifications.length} records`} bodyClassName="p-0">
            <div className="hidden md:flex items-center gap-4 px-4 py-2 border-b border-border bg-background/30 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              <span className="w-12 text-center">ID</span>
              <span className="flex-1">Credential</span>
              <span className="w-44">Issuer</span>
              <span className="w-20 text-center">Status</span>
              <span className="w-5" />
            </div>

            {certifications.map((cert, i) => (
              <motion.a
                key={cert.code}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group flex items-center gap-3 md:gap-4 px-3 md:px-4 py-4 border-b border-border/60 last:border-0 hover:bg-primary/[0.06] transition-colors"
                data-testid={`certification-link-${i}`}
              >
                <span className="font-mono text-[10px] font-bold text-primary border border-primary/30 bg-primary/5 rounded px-1.5 py-0.5 w-12 text-center shrink-0">
                  {cert.code}
                </span>
                <div className="w-9 h-9 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <cert.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="flex-1 min-w-0 text-sm md:text-[15px] font-medium text-foreground truncate group-hover:text-primary transition-colors">
                  {cert.title}
                </span>
                <span className="hidden md:block w-44 text-sm text-muted-foreground truncate">{cert.issuer}</span>
                <span className="hidden sm:flex w-20 items-center justify-center gap-1 font-mono text-[9px] uppercase tracking-widest text-[#18c08f]">
                  <BadgeCheck size={13} /> Verified
                </span>
                <ExternalLink size={15} className="w-5 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.a>
            ))}
          </Panel>
        </motion.div>
      </div>
    </section>
  );
};
