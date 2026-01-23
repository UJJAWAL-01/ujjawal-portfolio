import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, Shield, Briefcase, Database } from 'lucide-react';

const highlights = [
  {
    icon: TrendingUp,
    title: 'Technical Analysis',
    description: 'Algorithmic trading and quantitative strategies',
  },
  {
    icon: Briefcase,
    title: 'Business Intelligence',
    description: 'Strategic insights and process optimization',
  },
  {
    icon: Database,
    title: 'Data Analytics',
    description: 'Transforming data into actionable intelligence',
  },{
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Digital forensics and security analysis',
  },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      className="py-20 md:py-32 relative"
      ref={ref}
      data-testid="about-section"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 section-gradient pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left Content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm font-mono uppercase tracking-widest text-primary mb-4"
              data-testid="about-label"
            >
              About Me
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
              data-testid="about-title"
            >
              Business-Focused
              <span className="gradient-text block">Technologist</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6"
              data-testid="about-description"
            >
              With a background in Computer Engineering and specialized training in Cybersecurity, I blend technical precision with business strategy. Currently pursuing my graduate studies at Texas A&M, I focus on developing secure, efficient systems. From automating complex data workflows to designing user-centric analytics platforms.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              With a foundation in Computer Engineering and specialized training in MIS, I use technology to solve business problems. I have experience developing financial models, automating data workflows, and building analytics platforms that improve decision-making and operational efficiency.
            </motion.p>
          </div>

          {/* Right Content - Highlights Grid */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="group glass-card rounded-xl p-6 card-hover"
                data-testid={`about-highlight-${index}`}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};