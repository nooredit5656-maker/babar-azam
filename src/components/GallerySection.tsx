import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Expand, ExternalLink, X } from 'lucide-react';
import {
  GALLERY_PHOTOS,
  type GalleryCategory,
  type GalleryPhoto,
} from '../data/babarData';
import { ImageWithFallback } from './ImageWithFallback';

const GALLERY_FILTERS: { id: GalleryCategory; label: string }[] = [
  { id: 'all', label: 'All Photographs' },
  { id: 'Action', label: 'Action' },
  { id: 'Test Match', label: 'Test Match' },
  { id: 'Portraits & Venues', label: 'Portraits & Venues' },
];

export function GallerySection() {
  const [category, setCategory] = useState<GalleryCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visiblePhotos =
    category === 'all'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((photo) => photo.category === category);

  const activePhoto: GalleryPhoto | null =
    lightboxIndex !== null && visiblePhotos[lightboxIndex]
      ? visiblePhotos[lightboxIndex]
      : null;

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % visiblePhotos.length
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + visiblePhotos.length) % visiblePhotos.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, visiblePhotos.length]);

  const handleFilterChange = (nextCategory: GalleryCategory) => {
    setCategory(nextCategory);
    setLightboxIndex(null);
  };

  return (
    <section
      id="gallery"
      className="py-16 lg:py-24 bg-[#040706] border-b border-emerald-950/70"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#D4AF37] tracking-wide mb-2">
              04. Authentic Photography Archive
            </p>
            <h2
              className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-stone-100"
              style={{ textWrap: 'balance' }}
            >
              Real Match Moments & Stadium Heritage
            </h2>
            <p className="mt-2.5 text-sm text-stone-400">
              Properly licensed editorial photographs sourced from Wikimedia Commons with full photographer and license credits.
            </p>
          </div>

          <div
            role="group"
            aria-label="Filter photo gallery"
            className="inline-flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#0A130F] border border-emerald-950/90 self-start md:self-auto"
          >
            {GALLERY_FILTERS.map((filter) => {
              const active = category === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => handleFilterChange(filter.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-400 ${
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

        {/* Magazine Photo Grid with Captions & Photographer Credits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visiblePhotos.map((photo, index) => {
            const isHeroTile = category === 'all' && index === 0;
            return (
              <figure
                key={photo.id}
                className={`group rounded-2xl overflow-hidden border border-emerald-900/50 hover:border-[#D4AF37]/50 hover:-translate-y-0.5 bg-[#09120E] flex flex-col transition-all duration-200 ${
                  isHeroTile ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className={`relative w-full overflow-hidden bg-[#060C09] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-400 ${
                    isHeroTile ? 'aspect-[16/10]' : 'aspect-[4/3]'
                  }`}
                >
                  <ImageWithFallback
                    src={photo.src}
                    alt={photo.alt}
                    fallbackTitle={photo.title}
                    fallbackSubtitle={`${photo.credit} · ${photo.license}`}
                    className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
                      photo.id === 'gal-colombo-walk' ? 'object-top' : 'object-center'
                    }`}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#040706]/70 via-transparent to-transparent"
                  />
                  <span className="absolute top-3.5 right-3.5 w-9 h-9 rounded-lg bg-[#040706]/85 border border-emerald-900/70 flex items-center justify-center text-stone-200 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100 transition-opacity duration-200">
                    <Expand className="w-4 h-4" aria-hidden="true" />
                  </span>
                </button>

                <figcaption className="p-5 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <p className="text-xs text-emerald-400 font-medium">
                      {photo.category} <span aria-hidden="true" className="text-stone-600 mx-1">·</span> {photo.date}
                    </p>
                    <h3 className="font-editorial text-lg font-semibold text-stone-100 mt-1">
                      {photo.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mt-1.5">
                      {photo.caption}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-emerald-950/70 flex items-center justify-between gap-2 text-[11px] text-stone-400">
                    <span>
                      Credit: <strong className="text-stone-200 font-medium">{photo.credit}</strong> · {photo.license}
                    </span>
                    <a
                      href={photo.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-stone-300 hover:text-[#D4AF37] transition-colors shrink-0"
                    >
                      <span>Source</span>
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </motion.div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
      {activePhoto && lightboxIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col justify-between p-4 sm:p-6 lg:p-8"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="text-xs text-stone-400">
              <span className="text-emerald-400 font-medium">{activePhoto.category}</span>
              <span aria-hidden="true" className="mx-2">·</span>
              <span className="font-mono-tabular">
                {lightboxIndex + 1} / {visiblePhotos.length}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close gallery lightbox"
              className="w-11 h-11 rounded-lg bg-[#0D1913] border border-emerald-900/70 text-stone-200 hover:text-white hover:border-emerald-600 flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-4 min-h-0">
            <button
              type="button"
              onClick={() =>
                setLightboxIndex(
                  (lightboxIndex - 1 + visiblePhotos.length) % visiblePhotos.length
                )
              }
              aria-label="Previous photo"
              className="hidden sm:flex absolute left-2 lg:left-6 z-10 w-11 h-11 rounded-lg bg-[#0D1913]/90 border border-emerald-900/70 text-stone-200 hover:text-white hover:border-emerald-500 items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-400"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="max-w-5xl max-h-full w-full h-full flex items-center justify-center">
              <ImageWithFallback
                src={activePhoto.src}
                alt={activePhoto.alt}
                fallbackTitle={activePhoto.title}
                fallbackSubtitle={`${activePhoto.credit} · ${activePhoto.license}`}
                className="max-h-[68vh] w-auto max-w-full object-contain rounded-xl border border-emerald-950"
              />
            </div>

            <button
              type="button"
              onClick={() =>
                setLightboxIndex((lightboxIndex + 1) % visiblePhotos.length)
              }
              aria-label="Next photo"
              className="hidden sm:flex absolute right-2 lg:right-6 z-10 w-11 h-11 rounded-lg bg-[#0D1913]/90 border border-emerald-900/70 text-stone-200 hover:text-white hover:border-emerald-500 items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-400"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="max-w-3xl mx-auto w-full text-center space-y-2">
            <h3 className="font-editorial text-xl font-semibold text-stone-100">
              {activePhoto.title}
            </h3>
            <p className="text-sm text-stone-300">{activePhoto.caption}</p>
            <p className="text-xs text-stone-400">
              Photographer: {activePhoto.credit} <span aria-hidden="true">·</span> {activePhoto.license}{' '}
              <span aria-hidden="true">·</span>{' '}
              <a
                href={activePhoto.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-[#D4AF37] underline underline-offset-2"
              >
                View on Wikimedia Commons
              </a>
            </p>
            <div className="flex sm:hidden items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex(
                    (lightboxIndex - 1 + visiblePhotos.length) % visiblePhotos.length
                  )
                }
                className="px-4 py-2.5 min-h-[44px] rounded-lg bg-[#0D1913] border border-emerald-900/70 text-xs font-medium text-stone-200 cursor-pointer"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((lightboxIndex + 1) % visiblePhotos.length)
                }
                className="px-4 py-2.5 min-h-[44px] rounded-lg bg-[#0D1913] border border-emerald-900/70 text-xs font-medium text-stone-200 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </section>
  );
}
