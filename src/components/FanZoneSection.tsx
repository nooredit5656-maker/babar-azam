import { useEffect, useState, type FormEvent, type RefObject } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Heart, Send, Trophy } from 'lucide-react';
import {
  INITIAL_FAN_TRIBUTES,
  SIGNATURE_INNINGS,
  type FanTribute,
} from '../data/babarData';

interface FanZoneSectionProps {
  tributeNameRef: RefObject<HTMLInputElement | null>;
}

const STORAGE_TRIBUTES_KEY = 'babar_fan_tributes_v1';
const STORAGE_LIKED_KEY = 'babar_fan_liked_ids_v1';
const STORAGE_MOMENT_KEY = 'babar_favorite_moment_v1';

export function FanZoneSection({ tributeNameRef }: FanZoneSectionProps) {
  // Fan Wall State (persisted locally)
  const [tributes, setTributes] = useState<FanTribute[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_TRIBUTES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback to initial entries if storage unavailable
    }
    return INITIAL_FAN_TRIBUTES;
  });

  const [likedIds, setLikedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LIKED_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage read errors
    }
    return [];
  });

  const [formatFilter, setFormatFilter] = useState<'all' | 'Test' | 'ODI' | 'T20I'>('all');
  const [selectedMomentId, setSelectedMomentId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_MOMENT_KEY);
      if (saved && SIGNATURE_INNINGS.some((m) => m.id === saved)) {
        return saved;
      }
    } catch {
      // Ignore storage read errors
    }
    return SIGNATURE_INNINGS[0].id;
  });

  // Tribute Form State
  const [fanName, setFanName] = useState('');
  const [fanLocation, setFanLocation] = useState('');
  const [fanFormat, setFanFormat] = useState<'Test' | 'ODI' | 'T20I'>('ODI');
  const [fanMessage, setFanMessage] = useState('');
  const [tributeError, setTributeError] = useState('');
  const [tributePosted, setTributePosted] = useState(false);

  // Contact Inquiry Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactTopic, setContactTopic] = useState('Fan Club Collaboration');
  const [contactMessage, setContactMessage] = useState('');
  const [contactError, setContactError] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_TRIBUTES_KEY, JSON.stringify(tributes));
    } catch {
      // Ignore storage write errors
    }
  }, [tributes]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_LIKED_KEY, JSON.stringify(likedIds));
    } catch {
      // Ignore storage write errors
    }
  }, [likedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_MOMENT_KEY, selectedMomentId);
    } catch {
      // Ignore storage write errors
    }
  }, [selectedMomentId]);

  const activeFavoriteMoment =
    SIGNATURE_INNINGS.find((m) => m.id === selectedMomentId) ?? SIGNATURE_INNINGS[0];

  const handleSelectFavoriteMoment = (momentId: string) => {
    setSelectedMomentId(momentId);
    const found = SIGNATURE_INNINGS.find((m) => m.id === momentId);
    if (found) {
      setFanFormat(found.format);
    }
  };

  const handleToggleLike = (id: string) => {
    const alreadyLiked = likedIds.includes(id);
    setLikedIds((prev) =>
      alreadyLiked ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setTributes((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, likes: Math.max(0, item.likes + (alreadyLiked ? -1 : 1)) }
          : item
      )
    );
  };

  const handlePostTribute = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = fanName.trim();
    const trimmedLocation = fanLocation.trim();
    const trimmedMessage = fanMessage.trim();

    if (trimmedName.length < 2) {
      setTributeError('Please enter your name (at least 2 characters).');
      return;
    }
    if (trimmedLocation.length < 2) {
      setTributeError('Please enter your city or country.');
      return;
    }
    if (trimmedMessage.length < 10) {
      setTributeError('Please write a tribute message of at least 10 characters.');
      return;
    }

    const newTribute: FanTribute = {
      id: `trib-${Date.now()}`,
      name: trimmedName,
      location: trimmedLocation,
      favoriteFormat: fanFormat,
      favoriteMoment: `${activeFavoriteMoment.score} vs ${activeFavoriteMoment.opponent} · ${activeFavoriteMoment.venue.split(',')[0]}`,
      message: trimmedMessage,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      likes: 1,
    };

    setTributes((prev) => [newTribute, ...prev]);
    setLikedIds((prev) => [...prev, newTribute.id]);
    setFanName('');
    setFanLocation('');
    setFanMessage('');
    setTributeError('');
    setTributePosted(true);
    setFormatFilter('all');
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = contactName.trim();
    const trimmedEmail = contactEmail.trim();
    const trimmedMessage = contactMessage.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (trimmedName.length < 2) {
      setContactError('Please enter your full name.');
      return;
    }
    if (!emailPattern.test(trimmedEmail)) {
      setContactError('Please enter a valid email address.');
      return;
    }
    if (trimmedMessage.length < 12) {
      setContactError('Please include a message of at least 12 characters.');
      return;
    }

    setContactError('');
    setContactSubmitted(true);
  };

  const handleResetContact = () => {
    setContactName('');
    setContactEmail('');
    setContactTopic('Fan Club Collaboration');
    setContactMessage('');
    setContactError('');
    setContactSubmitted(false);
  };

  const visibleTributes =
    formatFilter === 'all'
      ? tributes
      : tributes.filter((t) => t.favoriteFormat === formatFilter);

  return (
    <section
      id="fan-zone"
      className="py-16 lg:py-24 bg-[#060B09]"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
      >
        <div className="max-w-2xl">
          <p className="text-xs font-medium text-[#D4AF37] tracking-wide mb-2">
            05. Fan Community & Contact
          </p>
          <h2
            className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-stone-100"
            style={{ textWrap: 'balance' }}
          >
            Share Your Favorite Moment & Connect
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-300 leading-relaxed">
            Leave a note on the supporter wall or reach out to the fan archive maintainers. Please note this is an independent, unofficial fan website.
          </p>
        </div>

        {/* Interactive Favorite Moment Selector */}
        <div className="rounded-2xl border border-emerald-900/50 bg-[#09120E] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
                <Trophy className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Interactive Favorite Moment Selector</span>
              </div>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-stone-100">
                Choose Your Defining Babar Azam Innings
              </h3>
            </div>
            <p className="text-xs text-stone-400">
              Your selection is saved locally and tagged on your tribute below
            </p>
          </div>

          <div
            role="radiogroup"
            aria-label="Select your favorite Babar Azam moment"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
          >
            {SIGNATURE_INNINGS.map((moment) => {
              const isSelected = moment.id === selectedMomentId;
              return (
                <button
                  key={moment.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleSelectFavoriteMoment(moment.id)}
                  className={`text-left rounded-xl border p-4 transition-all duration-150 flex flex-col justify-between gap-2.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-400 ${
                    isSelected
                      ? 'bg-[#0E2218] border-[#D4AF37]/70 shadow-sm'
                      : 'bg-[#050807] border-emerald-950/90 hover:border-emerald-800 hover:bg-[#0B1510]'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[11px] font-medium text-emerald-400">
                      {moment.format}
                    </span>
                    <span className="font-mono-tabular text-lg font-bold text-[#D4AF37]">
                      {moment.score}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-stone-100 leading-snug">
                      vs {moment.opponent}
                    </p>
                    <p className="text-[11px] text-stone-400 mt-0.5 truncate">
                      {moment.venue}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-emerald-950/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
            <p className="text-stone-300">
              Your Selected Moment:{' '}
              <strong className="text-[#D4AF37] font-semibold">
                {activeFavoriteMoment.score} ({activeFavoriteMoment.balls}b) vs {activeFavoriteMoment.opponent}
              </strong>{' '}
              <span className="text-stone-400">
                — {activeFavoriteMoment.headline} ({activeFavoriteMoment.date})
              </span>
            </p>
            <button
              type="button"
              onClick={() => tributeNameRef.current?.focus()}
              className="text-xs font-semibold text-emerald-400 hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-auto"
            >
              Write tribute for this knock →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left 7 Columns: Fan Tribute Composer + Community Wall */}
          <div className="lg:col-span-7 space-y-8">
            <form
              onSubmit={handlePostTribute}
              noValidate
              className="rounded-2xl border border-emerald-900/50 bg-[#09120E] p-6 sm:p-8 space-y-5"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-semibold text-stone-100">
                    Sign the Fan Tribute Wall
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Your note is saved directly in your browser and appears immediately below
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="fan-name"
                    className="block text-xs font-medium text-stone-300 mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    ref={tributeNameRef}
                    id="fan-name"
                    type="text"
                    value={fanName}
                    onChange={(e) => {
                      setFanName(e.target.value);
                      if (tributeError) setTributeError('');
                      if (tributePosted) setTributePosted(false);
                    }}
                    placeholder="e.g. Bilal Ahmed"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#050807] border border-emerald-950 text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="fan-location"
                    className="block text-xs font-medium text-stone-300 mb-1.5"
                  >
                    City & Country
                  </label>
                  <input
                    id="fan-location"
                    type="text"
                    value={fanLocation}
                    onChange={(e) => {
                      setFanLocation(e.target.value);
                      if (tributeError) setTributeError('');
                    }}
                    placeholder="e.g. Karachi, Pakistan"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#050807] border border-emerald-950 text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="fan-format"
                    className="block text-xs font-medium text-stone-300 mb-1.5"
                  >
                    Favorite Format
                  </label>
                  <select
                    id="fan-format"
                    value={fanFormat}
                    onChange={(e) =>
                      setFanFormat(e.target.value as 'Test' | 'ODI' | 'T20I')
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#050807] border border-emerald-950 text-stone-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Test">Test Cricket</option>
                    <option value="ODI">ODI Cricket</option>
                    <option value="T20I">T20I Cricket</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="fan-message"
                  className="block text-xs font-medium text-stone-300 mb-1.5"
                >
                  Favorite Innings or Tribute Message
                </label>
                <textarea
                  id="fan-message"
                  rows={3}
                  value={fanMessage}
                  onChange={(e) => {
                    setFanMessage(e.target.value);
                    if (tributeError) setTributeError('');
                  }}
                  placeholder="Share the knock or cover drive that made you a supporter..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#050807] border border-emerald-950 text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-emerald-500 resize-y"
                />
              </div>

              {tributeError && (
                <p role="alert" className="text-xs font-medium text-rose-400">
                  Error: {tributeError}
                </p>
              )}

              {tributePosted && (
                <div
                  role="status"
                  className="flex items-center gap-2 text-xs font-medium text-emerald-400"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Published to the Fan Tribute Wall below.</span>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#04100A] bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-300"
                >
                  <span>Post Tribute</span>
                  <Send className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </form>

            {/* Tribute Wall Feed */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-stone-100">
                  Supporter Messages ({visibleTributes.length})
                </h3>

                <div
                  role="group"
                  aria-label="Filter fan tributes by format"
                  className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#0A130F] border border-emerald-950/90 self-start sm:self-auto"
                >
                  {(['all', 'Test', 'ODI', 'T20I'] as const).map((fmt) => {
                    const active = formatFilter === fmt;
                    return (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => setFormatFilter(fmt)}
                        className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-400 ${
                          active
                            ? 'bg-emerald-500 text-[#04100A] font-semibold'
                            : 'text-stone-300 hover:text-white'
                        }`}
                      >
                        {fmt === 'all' ? 'All' : fmt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {visibleTributes.length === 0 ? (
                <div className="rounded-xl border border-emerald-950/90 bg-[#09120E] p-8 text-center">
                  <p className="text-sm text-stone-400">
                    No tributes posted for this format yet. Be the first to add one above.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-emerald-950/80 rounded-xl border border-emerald-950/90 bg-[#09120E]">
                  {visibleTributes.map((item) => {
                    const isLiked = likedIds.includes(item.id);
                    return (
                      <article key={item.id} className="p-5 sm:p-6 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-display text-base font-semibold text-stone-100">
                              {item.name}
                            </h4>
                            <p className="text-xs text-stone-400 mt-0.5">
                              {item.location} <span aria-hidden="true" className="mx-1">·</span> {item.favoriteFormat} Fan <span aria-hidden="true" className="mx-1">·</span> {item.date}
                              {item.favoriteMoment && (
                                <>
                                  <span aria-hidden="true" className="mx-1">·</span>
                                  <span className="text-[#D4AF37]">{item.favoriteMoment}</span>
                                </>
                              )}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleToggleLike(item.id)}
                            aria-pressed={isLiked}
                            aria-label={`Appreciate tribute by ${item.name}`}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono-tabular transition-colors shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-400 ${
                              isLiked
                                ? 'bg-emerald-950/80 border-emerald-600/60 text-emerald-300'
                                : 'bg-[#050807] border-emerald-950 text-stone-400 hover:text-stone-200 hover:border-emerald-800'
                            }`}
                          >
                            <Heart
                              className={`w-3.5 h-3.5 ${isLiked ? 'fill-emerald-400 text-emerald-400' : ''}`}
                              aria-hidden="true"
                            />
                            <span>{item.likes}</span>
                          </button>
                        </div>

                        <p className="text-sm text-stone-200 leading-relaxed">
                          {item.message}
                        </p>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right 5 Columns: Contact & Archive Inquiry Form */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-emerald-900/50 bg-[#09120E] p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-display text-xl font-semibold text-stone-100">
                  Contact Fan Archive
                </h3>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  Have a match-day photograph to suggest, a correction to a historical scorecard, or a fan club watch-party listing? Send a note to the site maintainers.
                </p>
              </div>

              {contactSubmitted ? (
                <div className="rounded-xl border border-emerald-800/60 bg-[#0B1912] p-6 space-y-4">
                  <div className="flex items-center gap-2.5 text-emerald-400">
                    <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <h4 className="font-display text-base font-semibold text-stone-100">
                      Message Received
                    </h4>
                  </div>
                  <p className="text-sm text-stone-300 leading-relaxed">
                    Thank you, <strong className="text-white">{contactName}</strong>. Your inquiry regarding <strong className="text-emerald-400">{contactTopic}</strong> has been logged for review.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetContact}
                    className="px-4 py-2 text-xs font-semibold text-stone-200 bg-[#050807] hover:bg-[#11231B] border border-emerald-900/70 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-400"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} noValidate className="space-y-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-stone-300 mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={contactName}
                      onChange={(e) => {
                        setContactName(e.target.value);
                        if (contactError) setContactError('');
                      }}
                      placeholder="Your name"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#050807] border border-emerald-950 text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-medium text-stone-300 mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => {
                        setContactEmail(e.target.value);
                        if (contactError) setContactError('');
                      }}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#050807] border border-emerald-950 text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-topic"
                      className="block text-xs font-medium text-stone-300 mb-1.5"
                    >
                      Inquiry Topic
                    </label>
                    <select
                      id="contact-topic"
                      value={contactTopic}
                      onChange={(e) => setContactTopic(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#050807] border border-emerald-950 text-stone-100 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Fan Club Collaboration">Fan Club Collaboration</option>
                      <option value="Watch-Party Listing">Match Watch-Party Listing</option>
                      <option value="Record Verification">Scorecard / Record Correction</option>
                      <option value="General Feedback">General Site Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium text-stone-300 mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => {
                        setContactMessage(e.target.value);
                        if (contactError) setContactError('');
                      }}
                      placeholder="Write your message here..."
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#050807] border border-emerald-950 text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-emerald-500 resize-y"
                    />
                  </div>

                  {contactError && (
                    <p role="alert" className="text-xs font-medium text-rose-400">
                      Error: {contactError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 px-5 text-sm font-semibold text-[#04100A] bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] rounded-lg transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-300"
                  >
                    Send Message
                  </button>
                </form>
              )}

              <div className="pt-4 border-t border-emerald-950/80 text-xs text-stone-400 leading-relaxed">
                Notice: This contact form reaches the volunteer fan site editors—not Babar Azam’s official management or the Pakistan Cricket Board.
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
