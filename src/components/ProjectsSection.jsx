import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, TrendingUp, LineChart, Calculator } from 'lucide-react';
import { Button } from './ui/button';

const projects = [
  {
    title: 'NEXUS Trading Intelligence Dashboard',
    description: 'This is NEXUS — a real-time trading intelligence dashboard that runs in your browser. No subscription. No fees. No API keys needed to get started (free tiers supported throughout).',
    icon: TrendingUp,
    link: 'https://nexus-trading-nine.vercel.app/',
    tags: ['Python','TypeScript','Open Source', 'Technical Analysis', 'Multi-Timeframe', 'Trading'],
    featured: true,
    gradient: 'from-blue-300 to-cyan-600',
  },
  {
    title: 'Signal Confidence Engine',
    description: 'A market analytics platform that synthesizes raw technical indicators into a unified confidence-driven trading signal. Evaluates trend alignment, momentum strength, volume participation, and price structure across multiple timeframes.',
    icon: TrendingUp,
    link: 'https://signal-confidence-engine.vercel.app/',
    tags: ['Python', 'Technical Analysis', 'Multi-Timeframe', 'Trading'],
    featured: true,
    gradient: 'from-blue-600 to-cyan-500',
  },
  {
    title: 'Sector ETF Analyzer',
    description: 'Finance application built with Python and Streamlit to identify sector leadership through comprehensive risk metrics including Sharpe Ratio, Alpha, and an integrated Dual-Momentum Backtester for strategy simulation.',
    icon: LineChart,
    link: 'https://sector-rotatio-analyzer-iblxmim8yvj3krgenrxbmv.streamlit.app/',
    tags: ['Python', 'Streamlit', 'Risk Metrics', 'Backtesting'],
    featured: true,
    gradient: 'from-purple-600 to-pink-500',
  },
  {
    title: 'Consolidated Financial Planner',
    description: 'Comprehensive investment comparison tool analyzing SIPs, bonds, PPF, and equities. Built with Python, SQL, and designed in Figma to help users make informed financial decisions.',
    icon: Calculator,
    link: null,
    tags: ['Python', 'SQL', 'Figma', 'Financial Planning'],
    featured: false,
    gradient: 'from-green-600 to-emerald-500',
  },
];

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="projects"
      className="py-20 md:py-32 relative"
      ref={ref}
      data-testid="projects-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono uppercase tracking-widest text-primary mb-4" data-testid="projects-label">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight" data-testid="projects-title">
            Featured Projects
          </h2>
        </motion.div>

        {/* Projects Bento Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card rounded-2xl overflow-hidden card-hover group ${
                project.featured ? 'lg:col-span-1' : ''
              }`}
              data-testid={`project-card-${index}`}
            >
              {/* Gradient Header */}
              <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />

              <div className="p-6 md:p-8">
                {/* Icon and Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <project.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="text-xs font-mono uppercase tracking-wider text-accent">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="pill text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link */}
                {project.link && (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button variant="outline" className="w-full rounded-full gap-2" data-testid={`project-link-${index}`}>
                      View Project
                      <ExternalLink size={16} />
                    </Button>
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};