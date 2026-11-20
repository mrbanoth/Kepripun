import { useState } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackBg?: string;
  fallbackLabel?: string;
}

export function SafeImage({
  src,
  alt,
  className = '',
  fallbackBg = '#E6E2FF',
  fallbackLabel,
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    const initials = (fallbackLabel || alt)
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('');

    return (
      <div
        className={`flex items-center justify-center font-display font-semibold text-[#3E3296] select-none ${className}`}
        style={{ backgroundColor: fallbackBg }}
        role="img"
        aria-label={alt}
      >
        <span>{initials || 'KP'}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
