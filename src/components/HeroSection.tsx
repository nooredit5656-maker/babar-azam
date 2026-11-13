import { motion } from 'motion/react';
import { ArrowDownRight, ExternalLink } from 'lucide-react';
import { HERO_MILESTONES, HERO_PHOTO } from '../data/babarData';
import { ImageWithFallback } from './ImageWithFallback';

interface HeroSectionProps {
  onExploreCareer: () => void;
  onViewRecords: () => void;
}

export function HeroSection({ onExploreCareer, onViewRecords }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-[#081710] via-[#050A08] to-[#040706] border-b border-emerald-950/70"
    >
      {/* Subtle Stadium Floodlight Atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(16,185,129,0.16),transparent_55%),radial-gradient(ellipse_at_20%_80%,rgba(212,175,55,0.06),transparent_50%)]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-10 sm:pb-14 lg:pt-14 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left 5 Columns: Editorial Headline, Bio Lead & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between py-1 lg:py-6"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="w-8 h-px bg-[#D4AF37]/75 shrink-0" />
                <p className="text-xs sm:text-sm font-medium text-[#D4AF37] tracking-wide">
                  Unofficial Fan Website <span aria-hidden="true" className="text-stone-600 mx-1.5">·</span> Jersey No. 56
                </p>
              </div>

              <h1
                className="font-editorial font-bold tracking-tight text-stone-100 leading-[1.03]"
                style={{
                  fontSize: 'clamp(2.5rem, 4.8vw, 4.35rem)',
                  textWrap: 'balance',
                }}
              >
                The Art of the{' '}
                <span className="italic text-[#D4AF37]">Cover Drive.</span>
              </h1>

              <p className="text-sm sm:text-base lg:text-[17px] text-stone-300 leading-relaxed max-w-md">
                An independent cricket portfolio celebrating Mohammad Babar Azam—from Lahore’s boundary rope to leading Pakistan with classical composure across every format.
              </p>

              <p className="text-xs font-mono-tabular text-emerald-400/90 pt-1">
                Test · ODI · T20I · ICC Men’s Cricketer of the Year 2022
              </p>
            </div>

            <div className="mt-8 lg:mt-12 space-y-5">
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3.5">
                <button
                  type="button"
                  onClick={onExploreCareer}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[46px] text-sm font-semibold text-[#04100A] bg-emerald-500 hover:bg-emerald-400 hover:shadow-[0_0_24px_rgba(16,185,129,0.3)] active:scale-[0.98] rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-300 focus-visible:outline-offset-2"
                >
                  <span>Explore Career</span>
                  <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={onViewRecords}
                  className="inline-flex items-center justify-center px-5 py-3.5 min-h-[46px] text-sm font-semibold text-stone-200 bg-[#0B1711] hover:bg-[#12241B] border border-emerald-900/70 hover:border-[#D4AF37]/60 rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-400 focus-visible:outline-offset-2"
                >
                  Verified Records & Knocks
                </button>
              </div>

              <p className="text-xs text-stone-400 leading-relaxed max-w-md">
                Independent supporter archive. Not affiliated with Babar Azam, the Pakistan Cricket Board (PCB), or the ICC.
              </p>
            </div>
          </motion.div>

          {/* Right 7 Columns: Large Authentic Match Photograph */}
          <motion.div
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-emerald-900/70 ring-1 ring-[#D4AF37]/20 hover:border-[#D4AF37]/50 bg-[#0A140F] aspect-[3/2] lg:aspect-auto lg:min-h-[540px] xl:min-h-[580px] shadow-[0_24px_80px_-20px_rgba(16,185,129,0.22)] group transition-all duration-300"
          >
            <ImageWithFallback
              src={HERO_PHOTO.src}
              alt={HERO_PHOTO.alt}
              fallbackTitle="Babar Azam · Jersey 56"
              fallbackSubtitle="Classical Right-Handed Batter"
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            />

            {/* Measured Magazine Scrim */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#040706]/95 via-[#040706]/25 to-[#040706]/15 lg:bg-gradient-to-tr lg:from-[#040706]/95 lg:via-[#040706]/20 lg:to-transparent"
            />

            {/* Top-Right Subtle Gold Number Callout */}
            <div className="hidden sm:flex absolute top-5 right-5 items-center gap-2 text-xs font-mono-tabular text-stone-200/90 bg-[#040706]/65 backdrop-blur-sm px-3 py-1.5 rounded-md border border-[#D4AF37]/30">
              <span className="text-[#D4AF37] font-semibold">#56</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span>Lahore, Pakistan</span>
            </div>

            {/* Bottom Caption & License Attribution */}
            <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 lg:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div className="space-y-1">
                <p className="font-editorial text-lg sm:text-2xl font-semibold text-stone-100">
                  Mohammad Babar Azam
                </p>
                <p className="text-xs sm:text-sm text-stone-300 max-w-lg line-clamp-2">
                  {HERO_PHOTO.caption}
                </p>
              </div>
              <a
                href={HERO_PHOTO.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] text-stone-300 hover:text-[#D4AF37] transition-colors shrink-0"
              >
                <span>
                  Photo: {HERO_PHOTO.credit} · {HERO_PHOTO.license}
                </span>
                <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Full-Width Verified Milestones Strip Below Split */}
        <div className="mt-10 sm:mt-12 lg:mt-16 pt-8 border-t border-emerald-950/90 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {HERO_MILESTONES.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.14 + idx * 0.06 }}
              className="space-y-1.5"
            >
              <div aria-hidden="true" className="w-8 h-px bg-[#D4AF37]/50 mb-2" />
              <p className="font-mono-tabular text-lg sm:text-2xl font-semibold text-[#D4AF37] tracking-tight">
                {item.figure}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-stone-100 leading-snug">
                {item.label}
              </p>
              <p className="text-[11px] sm:text-xs text-stone-400 leading-snug">
                {item.sublabel}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
