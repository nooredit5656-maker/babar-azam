import { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import {
  FORMAT_OVERVIEW_CARDS,
  SIGNATURE_INNINGS,
  VERIFIED_RECORDS,
  type RecordFormat,
} from '../data/babarData';

const FORMAT_FILTERS: { id: RecordFormat; label: string }[] = [
  { id: 'all', label: 'All Formats' },
  { id: 'Test', label: 'Test' },
  { id: 'ODI', label: 'ODI' },
  { id: 'T20I', label: 'T20I' },
  { id: 'PSL', label: 'PSL' },
];

export function RecordsSection() {
  const [selectedFormat, setSelectedFormat] = useState<RecordFormat>('all');
  const [activeInningsId, setActiveInningsId] = useState<string>(SIGNATURE_INNINGS[0].id);

  const filteredRecords =
    selectedFormat === 'all'
      ? VERIFIED_RECORDS
      : VERIFIED_RECORDS.filter((r) => r.format === selectedFormat);

  const activeInnings =
    SIGNATURE_INNINGS.find((inn) => inn.id === activeInningsId) ?? SIGNATURE_INNINGS[0];

  const boundaryRuns = activeInnings.fours * 4 + activeInnings.sixes * 6;
  const boundaryPct = Math.min(
    100,
    Math.round((boundaryRuns / activeInnings.runs) * 100)
  );
  const runningPct = 100 - boundaryPct;

  return (
    <section
      id="records"
      className="py-16 lg:py-24 bg-[#060B09] border-b border-emerald-950/70"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14"
      >
        {/* Header + Data Integrity Links */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#D4AF37] tracking-wide mb-2">
              03. Records & Signature Innings
            </p>
            <h2
              className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-stone-100"
              style={{ textWrap: 'balance' }}
            >
              Verified Milestones & Landmark Knocks
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-300 leading-relaxed">
              Every figure below is sourced from documented historical scorecards and official ICC/PCB records—with zero estimated or fabricated career totals.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://www.espncricinfo.com/cricketers/babar-azam-348144"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-stone-200 bg-[#0B1611] hover:bg-[#11221A] border border-emerald-900/60 hover:border-[#D4AF37]/50 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-emerald-400"
            >
              <span>ESPNcricinfo Live Stats</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            </a>
            <a
              href="https://www.icc-cricket.com/rankings"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-stone-200 bg-[#0B1611] hover:bg-[#11221A] border border-emerald-900/60 hover:border-[#D4AF37]/50 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-emerald-400"
            >
              <span>ICC Official Rankings</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Format Snapshot Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FORMAT_OVERVIEW_CARDS.map((card) => {
            const isSelected = selectedFormat === card.format;
            return (
              <div
                key={card.format}
                className={`rounded-xl border p-6 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between gap-5 ${
                  isSelected
                    ? 'bg-[#0E2017] border-emerald-500/70'
                    : 'bg-[#09120E] border-emerald-900/50 hover:border-[#D4AF37]/50'
                }`}
              >
                <button
                  type="button"
                  onClick={() =>
                    setSelectedFormat(isSelected ? 'all' : card.format)
                  }
                  className="text-left space-y-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-400 rounded-md"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-emerald-400 tracking-wide">
                      {card.format}
                    </span>
                    <span className="font-mono-tabular text-[11px] text-stone-400">
                      High: {card.careerHigh.split(' ')[0]}
                    </span>
                  </div>
                  <p className="font-mono-tabular text-3xl font-bold text-[#D4AF37]">
                    {card.highlightMetric}
                  </p>
                  <p className="text-sm font-medium text-stone-100 leading-snug">
                    {card.highlightLabel}
                  </p>
                </button>

                <div className="pt-3 border-t border-emerald-950/80 space-y-1.5 text-xs text-stone-400">
                  <p>Debut: {card.debut}</p>
                  <p className="font-mono-tabular text-[11px] text-stone-400">
                    Milestone Date: {card.milestoneDate}
                  </p>
                  <a
                    href={card.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-stone-300 hover:text-[#D4AF37] transition-colors pt-0.5"
                  >
                    <span>Source: {card.source}</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verified Records Table with Format Filter */}
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h3 className="font-editorial text-2xl font-bold text-stone-100">
                Documented Career Records
              </h3>
              {selectedFormat !== 'all' && (
                <button
                  type="button"
                  onClick={() => setSelectedFormat('all')}
                  className="text-xs font-medium text-emerald-400 hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Show all
                </button>
              )}
            </div>

            <div
              role="group"
              aria-label="Filter records by cricket format"
              className="inline-flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#0A130F] border border-emerald-950/90 self-start sm:self-auto"
            >
              {FORMAT_FILTERS.map((fmt) => {
                const active = selectedFormat === fmt.id;
                return (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => setSelectedFormat(fmt.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-400 ${
                      active
                        ? 'bg-emerald-500 text-[#04100A] font-semibold'
                        : 'text-stone-300 hover:text-white hover:bg-[#11231B]'
                    }`}
                  >
                    {fmt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Stacked Record Cards */}
          <div className="md:hidden space-y-3">
            {filteredRecords.map((record) => (
              <article
                key={record.id}
                className="rounded-xl border border-emerald-950/90 bg-[#09120E] p-4 space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono-tabular text-xs font-semibold text-emerald-400">
                    {record.format} <span aria-hidden="true" className="text-stone-600 mx-1">·</span> {record.date}
                  </span>
                  <span className="font-mono-tabular text-sm font-bold text-[#D4AF37]">
                    {record.figure}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-stone-100 leading-snug">
                  {record.milestone}
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {record.context}
                </p>
                <div className="pt-2 border-t border-emerald-950/70">
                  <a
                    href={record.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-stone-400 hover:text-[#D4AF37] transition-colors"
                  >
                    <span>Source: {record.source}</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Tablet & Desktop Aligned Data Table */}
          <div className="hidden md:block rounded-xl border border-emerald-950/90 bg-[#09120E] overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-emerald-950/90 text-xs font-medium text-stone-400">
                  <th scope="col" className="py-3.5 px-5">Format</th>
                  <th scope="col" className="py-3.5 px-5">Record / Milestone</th>
                  <th scope="col" className="py-3.5 px-5">Verified Figure</th>
                  <th scope="col" className="py-3.5 px-5">Context</th>
                  <th scope="col" className="py-3.5 px-5">Date</th>
                  <th scope="col" className="py-3.5 px-5 text-right">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-950/70 text-sm">
                {filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="hover:bg-[#0D1A14] transition-colors"
                  >
                    <td className="py-4 px-5 font-mono-tabular text-xs font-semibold text-emerald-400 whitespace-nowrap">
                      {record.format}
                    </td>
                    <td className="py-4 px-5 font-medium text-stone-100">
                      {record.milestone}
                    </td>
                    <td className="py-4 px-5 font-mono-tabular font-semibold text-[#D4AF37] whitespace-nowrap">
                      {record.figure}
                    </td>
                    <td className="py-4 px-5 text-stone-300">{record.context}</td>
                    <td className="py-4 px-5 font-mono-tabular text-xs text-stone-400 whitespace-nowrap">
                      {record.date}
                    </td>
                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <a
                        href={record.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-stone-300 hover:text-[#D4AF37] transition-colors"
                      >
                        <span>{record.source}</span>
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive Signature Innings Explorer */}
        <div className="pt-8 border-t border-emerald-950/80 space-y-6">
          <div>
            <h3 className="font-editorial text-2xl font-bold text-stone-100">
              Signature Innings Archive
            </h3>
            <p className="text-sm text-stone-400 mt-1">
              Select a verified international innings to inspect scorecard breakdown and match source
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Selector List */}
            <div
              role="listbox"
              aria-label="Signature innings list"
              className="lg:col-span-5 space-y-2.5"
            >
              {SIGNATURE_INNINGS.map((innings) => {
                const isSelected = innings.id === activeInnings.id;
                return (
                  <button
                    key={innings.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => setActiveInningsId(innings.id)}
                    className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-150 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-400 ${
                      isSelected
                        ? 'bg-[#0E2017] border-emerald-500/70 text-white'
                        : 'bg-[#09120E] border-emerald-950/90 text-stone-300 hover:bg-[#0D1A14] hover:border-emerald-900'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-xs text-emerald-400 font-medium">
                        {innings.format} <span aria-hidden="true" className="text-stone-600 mx-1">·</span> vs {innings.opponent}
                      </p>
                      <p className="text-base font-semibold text-stone-100 truncate mt-0.5">
                        {innings.headline}
                      </p>
                      <p className="text-xs text-stone-400 mt-0.5 truncate">
                        {innings.venue} <span aria-hidden="true">·</span> {innings.date}
                      </p>
                    </div>
                    <span className="font-mono-tabular text-2xl font-bold text-[#D4AF37] shrink-0">
                      {innings.score}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Scorecard Detail Panel */}
            <div className="lg:col-span-7 rounded-xl border border-emerald-900/60 bg-[#0A1410] p-6 sm:p-8 flex flex-col justify-between gap-8">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-400">
                  <span>
                    {activeInnings.format} International <span aria-hidden="true">·</span> vs {activeInnings.opponent}
                  </span>
                  <span className="font-mono-tabular">{activeInnings.date}</span>
                </div>

                <h4 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-100">
                  {activeInnings.score} ({activeInnings.balls} balls) — {activeInnings.headline}
                </h4>

                <p className="text-sm text-emerald-400 font-medium">
                  {activeInnings.venue}
                </p>

                <p className="text-base text-stone-300 leading-relaxed">
                  {activeInnings.narrative}
                </p>
              </div>

              {/* Tabular Scorecard Metrics */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-emerald-950/80">
                  <div>
                    <p className="text-xs text-stone-400">Runs Scored</p>
                    <p className="font-mono-tabular text-2xl font-bold text-stone-100 mt-1">
                      {activeInnings.score}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-stone-400">Balls Faced</p>
                    <p className="font-mono-tabular text-2xl font-bold text-stone-100 mt-1">
                      {activeInnings.balls}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-stone-400">Fours / Sixes</p>
                    <p className="font-mono-tabular text-2xl font-bold text-emerald-400 mt-1">
                      {activeInnings.fours} / {activeInnings.sixes}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-stone-400">Strike Rate</p>
                    <p className="font-mono-tabular text-2xl font-bold text-[#D4AF37] mt-1">
                      {activeInnings.strikeRate}
                    </p>
                  </div>
                </div>

                {/* Boundary vs Running-Between-Wickets Proportion Bar */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-400">
                    <span>
                      Boundary Scoring: <strong className="text-stone-200 font-mono-tabular">{boundaryRuns} runs ({boundaryPct}%)</strong>
                    </span>
                    <span>
                      Running Between Wickets: <strong className="text-stone-200 font-mono-tabular">{activeInnings.runs - boundaryRuns} runs ({runningPct}%)</strong>
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-[#13261D] overflow-hidden flex">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${boundaryPct}%` }}
                    />
                    <div
                      className="h-full bg-[#D4AF37]/70 transition-all duration-300"
                      style={{ width: `${runningPct}%` }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-emerald-950/70 flex items-center justify-between text-xs">
                  <a
                    href={activeInnings.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-stone-400 hover:text-[#D4AF37] transition-colors"
                  >
                    <span>Source: {activeInnings.source}</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
