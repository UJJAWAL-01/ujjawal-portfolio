import { ArrowUpRight, Gauge, PieChart, Wallet, CandlestickChart } from 'lucide-react';
import { sideWork } from '../content';
import { Glass } from './glass/Glass';
import { Section, SectionHead, Reveal } from './ui/section';

const icons = [Gauge, PieChart, Wallet, CandlestickChart];

const Tile = ({ item, Icon }) => {
  const inner = (
    <>
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
          <Icon size={20} />
        </span>
        {item.href ? (
          <ArrowUpRight size={18} className="text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        ) : (
          <span className="meta">{item.meta}</span>
        )}
      </div>
      <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.02em]">{item.title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{item.note}</p>
      {item.href && <p className="meta mt-4">{item.meta}</p>}
    </>
  );

  return item.href ? (
    <Glass as="a" href={item.href} target="_blank" rel="noopener noreferrer" radius={28} tilt={3} className="group block h-full p-6">
      {inner}
    </Glass>
  ) : (
    <Glass radius={28} tilt={3} className="group h-full p-6">
      {inner}
    </Glass>
  );
};

export const SideWorkSection = () => (
  <Section id="side-work">
    <SectionHead eyebrow="On the side" title="Markets." intro={sideWork.intro} />
    <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 md:gap-5">
      {sideWork.items.map((item, i) => (
        <Reveal key={item.title} delay={i * 0.06} className="h-full">
          <Tile item={item} Icon={icons[i % icons.length]} />
        </Reveal>
      ))}
    </div>
  </Section>
);
