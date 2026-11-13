import { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { ABOUT_PORTRAIT, CRAFT_PILLARS, PROFILE_FACTS } from '../data/babarData';
import { ImageWithFallback } from './ImageWithFallback';

export function AboutSection() {
  const [activePillarId, setActivePillarId] = useState<string>(CRAFT_PILLARS[0].id);
  const activePillar = CRAFT_PILLARS.find((p) => p.id === activePillarId) ?? CRAFT_PILLARS[0];

  return (
    <section
      id="about"
      className="py-16 lg:py-24 bg-[#060B09] border-b border-emerald-950/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-medium text-[#D4AF37] tracking-wide mb-2">
            01. Biography & Batting Craft
          </p>
          <h2
            className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-stone-100"
            style={{ textWrap: 'balance' }}
          >
            From Lahore’s Boundary Rope to the World Summit
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Authentic Portrait + Caption & Fact Sheet */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8"
          >
            <figure className="rounded-2xl overflow-hidden border border-emerald-900/50 bg-[#0A140F]">
              <div className="aspect-square overflow-hidden">
                <ImageWithFallback
                  src={ABOUT_PORTRAIT.src}
                  alt={ABOUT_PORTRAIT.alt}
                  fallbackTitle="Babar Azam"
                  fallbackSubtitle="Lahore · Right-Handed Batter"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <figcaption className="px-5 py-3.5 border-t border-emerald-950/80 bg-[#08100C] flex flex-col gap-1">
                <span className="text-xs text-stone-300">{ABOUT_PORTRAIT.caption}</span>
                <a
                  href={ABOUT_PORTRAIT.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-stone-400 hover:text-[#D4AF37] transition-colors w-fit"
                >
                  <span>
                    Photo: {ABOUT_PORTRAIT.credit} · {ABOUT_PORTRAIT.license} · Wikimedia Commons
                  </span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              </figcaption>
            </figure>

            <div className="rounded-xl border border-emerald-950/90 bg-[#09120E] overflow-hidden">
              <div className="px-5 py-4 border-b border-emerald-950/80 flex items-center justify-between">
                <h3 className="text-base font-semibold text-stone-100">
                  Player Dossier
                </h3>
                <span className="font-mono-tabular text-xs text-[#D4AF37]">#56</span>
              </div>
              <dl className="divide-y divide-emerald-950/70">
                {PROFILE_FACTS.map((fact) => (
                  <div
                    key={fact.label}
                    className="px-5 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-sm"
                  >
                    <dt className="text-stone-400 shrink-0">{fact.label}</dt>
                    <dd className="text-stone-100 font-medium sm:text-right font-mono-tabular text-[13px]">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Interactive Technical Craft Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-10"
          >
            <div className="space-y-5 text-stone-300 text-base leading-relaxed max-w-[68ch]">
              <p>
                Born on October 15, 1994, in Lahore, Mohammad Babar Azam grew up surrounded by cricket heritage in the Akmal family. Long before wearing the Pakistan star on his chest, he spent teenage afternoons working as a ball-boy along the Gaddafi Stadium boundary—studying international batters at close range.
              </p>
              <p>
                After leading Pakistan at the 2012 ICC Under-19 Cricket World Cup in Australia, Babar earned his senior ODI debut in May 2015 on the very Gaddafi turf where he once returned boundary balls. His maiden knock of 54 off 60 deliveries hinted at the poise that would soon anchor Pakistan across every format.
              </p>
              <p>
                In an era dominated by power-hitting, Babar’s appeal lies in geometric balance: a quiet head, crisp wrist alignment, and an unhurried cover drive that bridges classical Test patience with modern white-ball acceleration.
              </p>
            </div>

            {/* Interactive Batting Craft Explorer */}
            <div className="pt-8 border-t border-emerald-950/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-stone-100">
                    Anatomy of His Batting
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Select a technical pillar to inspect mechanics
                  </p>
                </div>

                <div
                  role="tablist"
                  aria-label="Batting Craft Pillars"
                  className="inline-flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#0B1712] border border-emerald-950/90"
                >
                  {CRAFT_PILLARS.map((pillar) => {
                    const selected = pillar.id === activePillar.id;
                    return (
                      <button
                        key={pillar.id}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onClick={() => setActivePillarId(pillar.id)}
                        className={`px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-400 ${
                          selected
                            ? 'bg-emerald-500 text-[#04100A] font-semibold'
                            : 'text-stone-300 hover:text-white hover:bg-[#11231B]'
                        }`}
                      >
                        {pillar.title}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div
                role="tabpanel"
                className="rounded-xl border border-emerald-900/50 bg-[#0A1410] p-6 space-y-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-editorial text-xl font-semibold text-stone-100">
                    {activePillar.title}
                  </h4>
                  <span className="text-xs font-medium text-[#D4AF37]">
                    {activePillar.subtitle}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                  {activePillar.description}
                </p>

                <ul className="space-y-2.5 pt-4 border-t border-emerald-950/80">
                  {activePillar.technicalPoints.map((point, idx) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm text-stone-200"
                    >
                      <span className="font-mono-tabular text-xs text-emerald-400 mt-0.5 shrink-0">
                        0{idx + 1}.
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
