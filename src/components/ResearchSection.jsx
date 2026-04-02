import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronRight, X, TrendingUp, BarChart2, Activity, Lightbulb, Signal } from 'lucide-react';
import { Button } from './ui/button';
import dbbImage from '../assets/DBB.png';
import fcprImage from '../assets/F_CPR.png';
import gaprImage from '../assets/GAPR.png';



const researchItems = [
  {
    id: 'r1',
    title: 'Signal Confidence Engine',
    excerpt: 'A multi-timeframe technical analysis engine that synthesizes trend, momentum, volume, and price structure into an explainable confidence score.',
    image: signal.png,
    icon: Signal,
    gradient: 'from-blue-600 to-cyan-500',
    fullContent: {
      overview: 'The Signal Confidence Engine converts raw market data into a single, interpretable confidence score by evaluating indicator confluence across multiple timeframes. Instead of relying on isolated signals, the system emphasizes agreement between trend, momentum, volume participation, and Fibonacci price structure.',
      inputs: [
        'OHLCV price data — daily and weekly timeframes',
        'Moving averages (SMA 50 & SMA 200) — trend strength and structure',
        'RSI (14) — momentum and exhaustion analysis',
        'Volume participation — relative volume confirmation',
        'Fibonacci pivots — price positioning within key structural levels',
      ],
      outputs: [
        'Daily Signal Confidence — tactical, timeframe-specific analysis',
        'Weekly Trend Confirmation — higher-timeframe validation',
        'Final Confluence Score — noise-reduced, decision-grade signal',
        'Indicator-level breakdown with human-readable reasoning',
      ],
      link: 'https://signal-confidence-engine.vercel.app/',
    },
  },
  {
    id: 'r2',
    title: 'Fibonacci Central Pivot Range',
    excerpt: 'Range-based pivot framework that fuses CPR geometry with Fibonacci scaling to produce adaptive bands for entries and exits.',
    image: fcprImage,
    icon: BarChart2,
    gradient: 'from-purple-600 to-pink-500',
    fullContent: {
      overview: 'F-CPR defines a central pivot range (CPR) and refines support/resistance using Fibonacci ratios (0.382, 0.5, 0.618) applied to derived S/R spreads. This produces adaptive bands that align with both volume-weighted structure (VWAP) and short-term volatility (ATR).',
      inputs: [
        'ATR length — Volatility window for ATR (recommended: 14)',
        'ATR multiplier — Stop/band scaling (1.5-3.0)',
        'SuperTrend factor — Trend-band sensitivity (3)',
        'Fibonacci ratios — Refinement levels (0.382, 0.5, 0.618)',
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
    title: 'Drifted Bollinger Bands',
    excerpt: 'Multi-filter BB breakout strategy using long-term trend (365 EMA), short-term volatility gating, and ATR-based trailing stops.',
    image: dbbImage,
    icon: Activity,
    gradient: 'from-green-600 to-emerald-500',
    fullContent: {
      overview: 'DBB is a structurally disciplined breakout system. It signals entries on Bollinger Band breakouts but only when the long-term trend and a volatility filter agree. Risk is controlled via fixed stop-loss & take-profit, with optional ATR-based trailing stop.',
      inputs: [
        'BB length — Bollinger window (14)',
        'BB k — Band width multiplier (2.1)',
        'Trend EMA — Long-term trend direction (365)',
        'Vol SD length — Short-term volatility (15)',
        'ATR length — Trailing stop scale (14)',
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
    title: 'Gap Reversal Capture',
    excerpt: 'Targets reversal opportunities after significant market-open gaps using gap magnitude, RSI exhaustion and ATR-based adaptive stops.',
    image: gaprImage,
    icon: Lightbulb,
    gradient: 'from-amber-600 to-orange-500',
    fullContent: {
      overview: 'GAPR identifies high-probability reversal setups at the open by combining a gap threshold with short-term momentum exhaustion (RSI) and volatility-scaled risk management via ATR.',
      inputs: [
        'Gap threshold (percentage) — defines significant open gap',
        'RSI length & thresholds — overbought/oversold levels',
        'ATR length & multipliers — dynamic stop-loss and target sizing',
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

export const ResearchSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedResearch, setSelectedResearch] = useState(null);

  return (
    <section
      id="research"
      className="py-20 md:py-32 relative"
      ref={ref}
      data-testid="research-section"
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
          <p className="text-sm font-mono uppercase tracking-widest text-primary mb-4" data-testid="research-label">
            Trading Systems
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4" data-testid="research-title">
            Research & Ideas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Exploring quantitative strategies and technical analysis frameworks for systematic trading approaches.
          </p>
        </motion.div>

        {/* Research Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {researchItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden card-hover group cursor-pointer"
              onClick={() => setSelectedResearch(item)}
              data-testid={`research-card-${index}`}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {item.excerpt}
                </p>
                <Button variant="ghost" className="gap-2 p-0 h-auto text-primary hover:text-primary/80">
                  Explore more
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedResearch && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedResearch(null)}
          data-testid="research-modal"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={selectedResearch.image}
                alt={selectedResearch.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              <button
                onClick={() => setSelectedResearch(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                data-testid="research-modal-close"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <h3 className="text-2xl font-bold text-foreground">{selectedResearch.title}</h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-sm font-mono uppercase tracking-wider text-primary mb-2">Overview</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedResearch.fullContent.overview}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-mono uppercase tracking-wider text-primary mb-2">Key Inputs</h4>
                <ul className="space-y-2">
                  {selectedResearch.fullContent.inputs.map((input, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {input}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-mono uppercase tracking-wider text-primary mb-2">Outputs</h4>
                <ul className="space-y-2">
                  {selectedResearch.fullContent.outputs.map((output, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      {output}
                    </li>
                  ))}
                </ul>
              </div>

              {selectedResearch.fullContent.link && (
                <motion.a
                  href={selectedResearch.fullContent.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="w-full rounded-full gap-2" data-testid="research-modal-link">
                    View Application
                    <ChevronRight size={16} />
                  </Button>
                </motion.a>
              )}

              <p className="text-xs text-muted-foreground italic">
                For detailed methodology, indicator calibration, and backtesting results, feel free to reach out.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};