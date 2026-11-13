import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle: string;
  fallbackSubtitle?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackTitle,
  fallbackSubtitle,
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#0E2419] via-[#09140E] to-[#050807] p-6 text-center border border-emerald-900/40 ${className}`}
      >
        <svg
          className="w-10 h-10 text-emerald-500/60 mb-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 20L18 4M15 4l5 4M7 17l-3 3" />
          <circle cx="17" cy="17" r="2.5" />
        </svg>
        <p className="font-display text-sm font-semibold text-stone-200">{fallbackTitle}</p>
        {fallbackSubtitle && (
          <p className="text-xs text-stone-400 mt-1">{fallbackSubtitle}</p>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
