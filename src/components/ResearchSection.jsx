import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronRight, X, TrendingUp, BarChart2, Activity, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';
import { Panel } from './ui/panel';
import { Sparkline } from './ui/sparkline';
import { SectionHeader } from './ui/section-header';
import dbbImage from '../assets/DBB.png';
import fcprImage from '../assets/F_CPR.png';
import gaprImage from '../assets/GAPR.png';

const researchItems = [
  {
    id: 'r1',
    code: 'SCE',
    title: 'Signal Confidence Engine',
    excerpt:
      'Multi-timeframe engine that synthesizes trend, momentum, volume, and price structure into an explainable confidence score.',
    image: '/SCG.png',
    icon: TrendingUp,
    tags: ['Multi-TF', 'Confluence', 'RSI', 'Fibonacci'],
    seed: 41,
    fullContent: {
      overview:
        'The Signal Confidence Engine converts raw market data into a single, interpretable confidence score by evaluating indicator confluence across multiple timeframes. Instead of relying on isolated signals, the system emphasizes agreement between trend, momentum, volume participation, and Fibonacci price structure.',
      inputs: [
        'OHLCV price data: daily and weekly timeframes',
        'Moving averages (SMA 50 & SMA 200): trend strength and structure',
        'RSI (14): momentum and exhaustion analysis',
        'Volume participation: relative volume confirmation',
        'Fibonacci pivots: price positioning within key structural levels',
      ],
      outputs: [
        'Daily Signal Confidence: tactical, timeframe-specific analysis',
        'Weekly Trend Confirmation: higher-timeframe validation',
        'Final Confluence Score: noise-reduced, decision-grade signal',
        'Indicator-level breakdown with human-readable reasoning',
      ],
      link: 'https://signal-confidence-engine.vercel.app/',
    },
  },
  {
    id: 'r2',
    code: 'FCPR',
    title: 'Fibonacci Central Pivot Range',
    excerpt:
      'Range-based pivot framework fusing CPR geometry with Fibonacci scaling to produce adaptive bands for entries and exits.',
    image: fcprImage,
    icon: BarChart2,
    tags: ['CPR', 'Fibonacci', 'VWAP', 'ATR'],
    seed: 88,
    fullContent: {
      overview:
        'F-CPR defines a central pivot range (CPR) and refines support/resistance using Fibonacci ratios (0.382, 0.5, 0.618) applied to derived S/R spreads. This produces adaptive bands that align with both volume-weighted structure (VWAP) and short-term volatility (ATR).',
      inputs: [
        'ATR length: volatility window for ATR (recommended 14)',
        'ATR multiplier: stop/band scaling (1.5 to 3.0)',
        'SuperTrend factor: trend-band sensitivity (3)',
        'Fibonacci ratios: refinement levels (0.382, 0.5, 0.618)',
      ],
      outputs: [
        'Central Pivot Range with BCP and ACP',
        'Fibonacci-refined support and resistance bands',
        'Dynamic entry zones based on trend confirmation',
      ],
      link: null,
    },
  },
  {
    id: 'r3',
    code: 'DBB',
    title: 'Drifted Bollinger Bands',
    excerpt:
      'Multi-filter BB breakout strategy using long-term trend (365 EMA), short-term volatility gating, and ATR-based trailing stops.',
    image: dbbImage,
    icon: Activity,
    tags: ['Bollinger', 'EMA 365', 'ATR Trail'],
    seed: 23,
    fullContent: {
      overview:
        'DBB is a structurally disciplined breakout system. It signals entries on Bollinger Band breakouts but only when the long-term trend and a volatility filter agree. Risk is controlled via fixed stop-loss & take-profit, with optional ATR-based trailing stop.',
      inputs: [
        'BB length: Bollinger window (14)',
        'BB k: band width multiplier (2.1)',
        'Trend EMA: long-term trend direction (365)',
        'Vol SD length: short-term volatility (15)',
        'ATR length: trailing stop scale (14)',
      ],
      outputs: [
        'Lower trade frequency vs naive BB breakouts',
        'Higher win-rate due to trend/volatility filtering',
        'Improved max drawdown with ATR-based trailing stops',
      ],
      link: null,
    },
  },
  {
    id: 'r4',
    code: 'GAPR',
    title: 'Gap Reversal Capture',
    excerpt:
      'Targets reversals after significant market-open gaps using gap magnitude, RSI exhaustion, and ATR-based adaptive stops.',
    image: gaprImage,
    icon: Lightbulb,
    tags: ['Gap', 'RSI', 'ATR', 'Reversal'],
    seed: 64,
    fullContent: {
      overview:
        'GAPR identifies high-probability reversal setups at the open by combining a gap threshold with short-term momentum exhaustion (RSI) and volatility-scaled risk management via ATR.',
      inputs: [
        'Gap threshold (percentage): defines significant open gap',
        'RSI length & thresholds: overbought/oversold levels',
        'ATR length & multipliers: dynamic stop-loss and target sizing',
      ],
      outputs: [
        'Short signals when Gap Up AND RSI overbought (>70)',
        'Long signals when Gap Down AND RSI oversold (<30)',
        'ATR-derived stop and target distances',
      ],
      link: null,
    },
  },
];

const ChartFrame = ({ item, h = 'h-44' }) => (
  <div className={`relative ${h} overflow-hidden bg-muted/40`}>
    <img
      src={item.image}
      alt={item.title}
      className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
      onError={(e) => { e.target.style.display = 'none'; }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
    <div className="absolute top-3 left-3 w-9 h-9 rounded-md bg-background/80 backdrop-blur border border-accent/30 flex items-center justify-center">
      <item.icon className="w-5 h-5 text-accent" />
    </div>
    <div className="absolute bottom-2 right-3 flex items-center gap-2 bg-background/70 backdrop-blur rounded px-2 py-1 border border-border/60">
      <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground">eq</span>
      <Sparkline seed={item.seed} points={26} trend={1.0} width={64} height={18} area />
    </div>
  </div>
);

const Tags = ({ tags }) => (
  <div className="flex flex-wrap gap-1.5 mb-4">
    {tags.map((t) => (
      <span key={t} className="font-mono text-[10px] text-primary/80 border border-primary/20 bg-primary/5 rounded px-1.5 py-0.5">{t}</span>
    ))}
  </div>
);

const Inspect = () => (
  <span className="inline-flex items-center gap-1.5 text-sm font-mono text-accent group-hover:gap-2.5 transition-all">
    View details <ChevronRight size={15} />
  </span>
);

const ResearchCard = ({ item, onClick, index }) => (
  <Panel code={item.code} title={item.title} status="BACKTESTED" tone="featured" className="h-full group cursor-pointer" bodyClassName="p-0" onClick={onClick} data-testid={`research-card-${index}`}>
    <div className="border-b border-border/60"><ChartFrame item={item} /></div>
    <div className="p-5">
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.excerpt}</p>
      <Tags tags={item.tags} />
      <Inspect />
    </div>
  </Panel>
);

export const ResearchSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selected, setSelected] = useState(null);
  const [featured, ...rest] = researchItems;

  return (
    <section id="research" className="py-20 md:py-32 relative" ref={ref} data-testid="research-section">
      <div className="absolute inset-0 section-gradient pointer-events-none" />
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-[0.15] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          index="05"
          code="~/research"
          meta={`${researchItems.length} studies`}
          title={<>Research <span className="gradient-text">&amp; Strategies</span></>}
          subtitle="Quantitative and technical-analysis studies I built, calibrated, and backtested."
        />

        {/* Featured (wide) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Panel
            code={featured.code}
            title={featured.title}
            status="FEATURED"
            tone="featured"
            className="group cursor-pointer"
            bodyClassName="p-0"
            onClick={() => setSelected(featured)}
            data-testid="research-card-0"
          >
            <div className="grid md:grid-cols-2">
              <div className="border-b md:border-b-0 md:border-r border-border/60">
                <ChartFrame item={featured} h="h-56 md:h-full md:min-h-[240px]" />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {featured.title}
                </h3>
                <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed mb-5">{featured.excerpt}</p>
                <Tags tags={featured.tags} />
                <Inspect />
              </div>
            </div>
          </Panel>
        </motion.div>

        {/* Rest */}
        <div className="grid md:grid-cols-3 gap-6">
          {rest.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ResearchCard item={item} index={i + 1} onClick={() => setSelected(item)} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
            data-testid="research-modal"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="panel max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            >
              <div className="panel-head sticky top-0 z-10">
                <span className="panel-tag">{selected.code}</span>
                <span className="panel-title">{selected.title}</span>
                <button
                  onClick={() => setSelected(null)}
                  className="ml-auto text-muted-foreground hover:text-foreground"
                  data-testid="research-modal-close"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="relative h-52 overflow-hidden border-b border-border/60">
                <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className="kicker mb-2">Overview</h4>
                  <p className="text-muted-foreground leading-relaxed">{selected.fullContent.overview}</p>
                </div>
                <div>
                  <h4 className="kicker mb-2">Key Inputs</h4>
                  <ul className="space-y-2">
                    {selected.fullContent.inputs.map((input, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span className="text-primary font-mono text-xs mt-0.5">▸</span>{input}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="kicker mb-2">Outputs</h4>
                  <ul className="space-y-2">
                    {selected.fullContent.outputs.map((output, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span className="text-accent font-mono text-xs mt-0.5">▸</span>{output}
                      </li>
                    ))}
                  </ul>
                </div>
                {selected.fullContent.link && (
                  <a href={selected.fullContent.link} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full rounded-md gap-2 font-mono uppercase tracking-wider" data-testid="research-modal-link">
                      Open Application <ChevronRight size={16} />
                    </Button>
                  </a>
                )}
                <p className="text-xs text-muted-foreground italic font-mono">
                  // detailed methodology, calibration, and backtest results available on request
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
