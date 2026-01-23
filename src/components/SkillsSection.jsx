import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, BarChart3, Shield, Users } from 'lucide-react';

const skillCategories = [
  {
    title: 'Programming & Data',
    icon: Code2,
    skills: ['Python', 'Java', 'C', 'SQL', 'HTML', 'CSS'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Analytics & Tools',
    icon: BarChart3,
    skills: ['MS Excel', 'Power BI', 'PowerPoint', 'Figma', 'Tableau', 'Pine Script', 'Android Studio'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Cybersecurity & Tech',
    icon: Shield,
    skills: ['Kali Linux', 'Wireshark', 'Network Miner', 'Meterpreter'],
    color: 'from-green-500 to-emerald-500',
  },
];

const softSkills = [
  'Analytical Thinking',
  'Logical Reasoning',
  'Learning Agility',
  'Collaboration',
  'Communication',
  'User Story Mapping',
  'Competitive Analysis',
  'Confidence Under Pressure',
  'Decision Making',
];

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="skills"
      className="py-20 md:py-32 relative"
      ref={ref}
      data-testid="skills-section"
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
          <p className="text-sm font-mono uppercase tracking-widest text-primary mb-4" data-testid="skills-label">
            Technical Expertise
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight" data-testid="skills-title">
            Skills & Proficiencies
          </h2>
        </motion.div>

        {/* Technical Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="glass-card rounded-2xl p-6 card-hover group"
              data-testid={`skill-category-${index}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + skillIndex * 0.05 }}
                    className="pill hover:bg-primary/10 hover:border-primary/30 transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card rounded-2xl p-6 md:p-8"
          data-testid="soft-skills"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Soft Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {softSkills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.03 }}
                className="pill hover:bg-accent/10 hover:border-accent/30 transition-colors cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};