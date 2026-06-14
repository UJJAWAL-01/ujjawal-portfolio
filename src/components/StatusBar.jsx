import { useEffect, useState } from 'react';

const ticker = [
  'Business Analytics', 'Data Engineering', 'Data Analysis', 'Technical Market Analysis',
  'Python', 'SQL', 'Power BI', 'Tableau', 'Streamlit',
];

/** Persistent status bar pinned to the bottom of the viewport. */
export const StatusBar = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'America/Chicago' }) + ' CT'
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 h-7 flex items-stretch border-t border-border bg-background/90 backdrop-blur-md font-mono text-[10px]">
      {/* left: status + clock */}
      <div className="flex items-center gap-2 px-3 border-r border-border shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-[#18c08f] caret-blink" />
        <span className="text-[#18c08f] uppercase tracking-widest hidden sm:inline">Online</span>
        <span className="text-muted-foreground tabular-nums">{time}</span>
      </div>

      {/* center: scrolling capabilities */}
      <div className="flex-1 overflow-hidden flex items-center">
        <div className="flex w-max animate-ticker">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center shrink-0">
              {ticker.map((t) => (
                <span key={t + dup} className="flex items-center px-5 tracking-wide text-muted-foreground">
                  {t}
                  <span className="ml-5 text-border">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* right: availability */}
      <div className="hidden sm:flex items-center gap-2 px-3 border-l border-border shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-accent caret-blink" />
        <span className="uppercase tracking-widest text-accent">Available · Summer 2026</span>
      </div>
    </div>
  );
};
