import { ExternalLink, Globe, Instagram } from 'lucide-react';

export function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#040706] border-t border-emerald-950/80 py-12 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand Summary */}
          <div className="md:col-span-5 space-y-3">
            <p className="font-editorial text-xl font-bold text-stone-100">
              Babar Azam <span aria-hidden="true" className="text-[#D4AF37] mx-1.5">·</span> Jersey 56
            </p>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              An independent, unofficial fan website celebrating Babar Azam’s classical batting technique, international milestones, and cricket photography archive.
            </p>
          </div>

          {/* Site Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold text-[#D4AF37] tracking-wide">
              Explore Archive
            </h3>
            <nav aria-label="Footer Navigation" className="flex flex-col items-start gap-2 text-xs sm:text-sm font-medium text-stone-300">
              {[
                { id: 'about', label: 'About & Batting Craft' },
                { id: 'career', label: 'Career Timeline' },
                { id: 'records', label: 'Records & Scorecards' },
                { id: 'gallery', label: 'Photo Gallery' },
                { id: 'fan-zone', label: 'Fan Wall & Contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className="hover:text-emerald-400 transition-colors cursor-pointer py-0.5 text-left"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Official Public Social Channels & Cricket Archives */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-semibold text-[#D4AF37] tracking-wide">
              Official Public Channels & Archives
            </h3>
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-stone-300">
              <a
                href="https://x.com/babarazam258"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#D4AF37] transition-colors w-fit"
              >
                <svg className="w-4 h-4 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>Babar Azam on X (@babarazam258)</span>
                <ExternalLink className="w-3 h-3 text-stone-500" aria-hidden="true" />
              </a>

              <a
                href="https://www.instagram.com/babarazam/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#D4AF37] transition-colors w-fit"
              >
                <Instagram className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <span>Babar Azam on Instagram (@babarazam)</span>
                <ExternalLink className="w-3 h-3 text-stone-500" aria-hidden="true" />
              </a>

              <a
                href="https://www.espncricinfo.com/cricketers/babar-azam-348144"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#D4AF37] transition-colors w-fit"
              >
                <Globe className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <span>ESPNcricinfo Career Profile</span>
                <ExternalLink className="w-3 h-3 text-stone-500" aria-hidden="true" />
              </a>

              <a
                href="https://commons.wikimedia.org/wiki/Category:Babar_Azam"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#D4AF37] transition-colors w-fit"
              >
                <Globe className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <span>Wikimedia Commons Photo Archive</span>
                <ExternalLink className="w-3 h-3 text-stone-500" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-emerald-950/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-stone-400">
          <p className="max-w-2xl leading-relaxed">
            Disclaimer: This is an unofficial, non-commercial fan tribute website created for supporters of Babar Azam. It is not endorsed by or affiliated with Babar Azam, the Pakistan Cricket Board (PCB), or the International Cricket Council (ICC). Photographs licensed via Wikimedia Commons (CC0 / CC BY / CC BY-SA).
          </p>
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="https://www.icc-cricket.com/rankings"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-stone-300 hover:text-[#D4AF37] transition-colors"
            >
              <span>ICC Official Rankings</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <button
              type="button"
              onClick={() => scrollTo('hero')}
              className="text-emerald-400 hover:text-[#D4AF37] font-medium transition-colors cursor-pointer"
            >
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
