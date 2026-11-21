import { profile } from '../content';

export const Footer = () => (
  <footer className="container-page pb-28 md:pb-10" data-testid="footer">
    <div className="meta flex flex-col items-center justify-between gap-2 border-t border-foreground/10 pt-8 sm:flex-row">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <span>Designed and built in College Station, TX</span>
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event('palette:open'))}
        className="hidden items-center gap-1.5 transition-colors hover:text-foreground sm:inline-flex"
      >
        Press <span className="kbd">/</span> to jump anywhere
      </button>
    </div>
  </footer>
);
