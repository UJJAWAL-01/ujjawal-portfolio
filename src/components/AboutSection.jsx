import { GraduationCap, Trophy, BadgeCheck, ArrowUpRight } from 'lucide-react';
import { about } from '../content';
import { Glass } from './glass/Glass';
import { CountUp } from './ui/count-up';
import { Section, SectionHead, Reveal } from './ui/section';

const TileHead = ({ icon: Icon, children }) => (
  <div className="mb-4 flex items-center gap-2.5">
    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
      <Icon size={17} />
    </span>
    <h3 className="text-[16px] font-semibold tracking-[-0.02em]">{children}</h3>
  </div>
);

export const AboutSection = () => (
  <Section id="about">
    <SectionHead eyebrow="About" title="A little about me." />

    <div className="mx-auto max-w-5xl space-y-5">
      <Reveal>
        <Glass radius={32} className="p-7 md:p-12">
          <div className="space-y-5 text-[18px] leading-relaxed text-muted-foreground md:text-[21px]">
            {about.bio.map((p, i) => (
              <p key={i} className={i === 0 ? 'font-medium text-foreground' : undefined}>{p}</p>
            ))}
          </div>
        </Glass>
      </Reveal>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {about.numbers.map((n, i) => (
          <Reveal key={n.label} delay={i * 0.06} className="h-full">
            <Glass radius={26} tilt={4} className="h-full p-5 md:p-6">
              <div className="text-[34px] font-semibold tracking-[-0.045em] tabular-nums md:text-[42px]">
                <CountUp value={n.value} />
              </div>
              <div className="meta mt-1">{n.label}</div>
            </Glass>
          </Reveal>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        <Reveal className="h-full">
          <Glass radius={28} className="h-full p-6 md:p-7">
            <TileHead icon={GraduationCap}>Education</TileHead>
            <ul className="space-y-5">
              {about.education.map((e) => (
                <li key={e.school}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <span className="text-[15px] font-semibold text-foreground">{e.degree}</span>
                    <span className="meta">{e.period}</span>
                  </div>
                  <p className="text-[15px] text-muted-foreground">{e.school}</p>
                  <p className="meta mt-1">{e.note}</p>
                </li>
              ))}
            </ul>
          </Glass>
        </Reveal>

        <Reveal delay={0.06} className="h-full">
          <Glass radius={28} className="h-full p-6 md:p-7">
            <TileHead icon={Trophy}>Recognition</TileHead>
            <ul className="ticks space-y-2.5 text-[15px] text-muted-foreground">
              {about.recognition.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Glass>
        </Reveal>
      </div>

      <Reveal>
        <Glass radius={28} className="p-6 md:p-7">
          <TileHead icon={BadgeCheck}>Certifications</TileHead>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {about.certifications.map((c) => (
              <li key={c.title}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full items-start justify-between gap-3 rounded-2xl bg-[var(--glass-fill)] p-4 shadow-[var(--glass-inner)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <span>
                    <span className="block text-[15px] font-semibold leading-snug text-foreground">{c.title}</span>
                    <span className="meta">{c.issuer}</span>
                  </span>
                  <ArrowUpRight size={16} className="mt-0.5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </Glass>
      </Reveal>
    </div>
  </Section>
);
