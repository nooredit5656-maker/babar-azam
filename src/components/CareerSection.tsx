import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import {
  CAREER_TIMELINE,
  MAJOR_HONORS,
  type CareerEra,
} from '../data/babarData';

const ERA_FILTERS: { id: CareerEra; label: string }[] = [
  { id: 'all', label: 'All Eras' },
  { id: 'rise', label: 'Rise & Debut (2012–2018)' },
  { id: 'captaincy', label: 'World #1 & Captaincy (2019–2022)' },
  { id: 'modern', label: 'Modern Era (2023–Present)' },
];

export function CareerSection() {
  const [selectedEra, setSelectedEra] = useState<CareerEra>('all');
  const [expandedId, setExpandedId] = useState<string>('sobers-2022');

  const filteredMilestones =
    selectedEra === 'all'
      ? CAREER_TIMELINE
      : CAREER_TIMELINE.filter((m) => m.era === selectedEra);

  const handleSelectEra = (era: CareerEra) => {
    setSelectedEra(era);
    const firstMatch =
      era === 'all'
        ? CAREER_TIMELINE[0]
        : CAREER_TIMELINE.find((m) => m.era === era);
    if (firstMatch) {
      setExpandedId(firstMatch.id);
    }
  };

  return (
    <section
      id="career"
      className="py-16 lg:py-24 bg-[#040706] border-b border-emerald-950/70"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#D4AF37] tracking-wide mb-2">
              02. Cricket Career & Achievements
            </p>
            <h2
              className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-stone-100"
              style={{ textWrap: 'balance' }}
            >
              A Decade of Milestones Across All Three Formats
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filter career timeline by era"
            className="inline-flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-[#0A130F] border border-emerald-950/90 self-start lg:self-auto"
          >
            {ERA_FILTERS.map((filter) => {
              const active = selectedEra === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => handleSelectEra(filter.id)}
                  className={`px-3 py-2 min-h-[40px] text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-400 ${
                    active
                      ? 'bg-emerald-500 text-[#04100A] font-semibold'
                      : 'text-stone-300 hover:text-white hover:bg-[#11231B]'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Career Timeline Chronicle */}
        <div className="border-t border-emerald-950/80 divide-y divide-emerald-950/80">
          {filteredMilestones.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div key={item.id} className="transition-colors">
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  onClick={() => setExpandedId(isExpanded ? '' : item.id)}
                  className="w-full py-5 sm:py-6 px-2 sm:px-4 text-left flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 hover:bg-[#09120E] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-400 rounded-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-6">
                    <span className="font-mono-tabular text-sm font-semibold text-[#D4AF37] w-28 shrink-0">
                      {item.year}
                    </span>
                    <div>
                      <h3 className="text-base sm:text-xl font-semibold text-stone-100 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-stone-400 mt-1">{item.context}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-1 md:pt-0">
                    <span className="text-xs font-medium text-stone-400">
                      {isExpanded ? 'Hide detail' : 'Read milestone'}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-emerald-400 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                </button>

                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="pb-6 px-2 sm:px-4 md:pl-[9.5rem] space-y-3"
                  >
                    <p className="text-sm sm:text-base font-medium text-stone-200 leading-relaxed max-w-3xl">
                      {item.summary}
                    </p>
                    <p className="text-sm text-stone-400 leading-relaxed max-w-3xl">
                      {item.detail}
                    </p>
                    <p className="text-xs text-emerald-400/90 font-medium">
                      Reference: {item.sourceLabel}
                    </p>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Major Honors & National Recognition */}
        <div className="mt-14 sm:mt-16 pt-10 sm:pt-12 border-t border-emerald-950/80">
          <div className="mb-8">
            <h3 className="font-editorial text-2xl font-bold text-stone-100">
              Major Honors & National Recognition
            </h3>
            <p className="text-sm text-stone-400 mt-1">
              Documented international cricket awards and civilian honors with official citations
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MAJOR_HONORS.map((honor) => (
              <div
                key={honor.title}
                className="rounded-xl border border-emerald-900/50 hover:border-[#D4AF37]/50 hover:-translate-y-0.5 bg-[#09120E] p-6 flex flex-col justify-between gap-4 transition-all duration-200"
              >
                <div className="space-y-2">
                  <p className="font-mono-tabular text-xs font-semibold text-[#D4AF37]">
                    {honor.year}
                  </p>
                  <h4 className="font-editorial text-lg font-semibold text-stone-100 leading-snug">
                    {honor.title}
                  </h4>
                  <p className="text-xs font-medium text-emerald-400">{honor.body}</p>
                </div>
                <div className="space-y-2 pt-3 border-t border-emerald-950/70">
                  <p className="text-sm text-stone-300 leading-relaxed">
                    {honor.distinction}
                  </p>
                  <p className="text-[11px] text-stone-400">{honor.source}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
