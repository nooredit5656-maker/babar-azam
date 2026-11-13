import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onJoinFanWall: () => void;
}

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'career', label: 'Career' },
  { id: 'records', label: 'Records' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'fan-zone', label: 'Fan Zone' },
];

export function Navbar({ activeSection, onJoinFanWall }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#040706]/90 backdrop-blur-md border-b border-emerald-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6 md:gap-8">
        {/* Zone 1: Single-line Wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className="font-editorial text-lg sm:text-xl font-bold tracking-tight text-stone-100 hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-emerald-400 focus-visible:outline-offset-4 rounded-sm"
        >
          Babar Azam
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-emerald-400 focus-visible:outline-offset-4 rounded-sm ${
                  isActive
                    ? 'text-emerald-400'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-0.5 h-px bg-[#D4AF37] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onJoinFanWall();
            }}
            className="px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-[#04100A] bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-300 focus-visible:outline-offset-2"
          >
            Join Fan Wall
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-emerald-900/70 bg-[#0A140F] text-stone-200 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-400"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Animated Mobile Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Mobile Navigation"
            className="md:hidden border-t border-emerald-950/80 bg-[#060C09]/98 backdrop-blur-md px-4 py-3 space-y-1 shadow-2xl"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.id);
                  }}
                  className={`flex items-center justify-between px-3.5 min-h-[44px] rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-950/75 text-emerald-300 border border-emerald-800/50'
                      : 'text-stone-300 hover:bg-[#0D1913] hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="text-[11px] font-mono-tabular text-[#D4AF37]">
                      Active
                    </span>
                  )}
                </a>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
