import { Link } from 'react-router-dom';
import { BRAND_NAME } from '../data';

interface BrandLogoProps {
  to?: string;
  size?: 'sm' | 'md';
}

export function BrandLogo({ to = '/', size = 'md' }: BrandLogoProps) {
  const iconDim = size === 'sm' ? 'w-7 h-7' : 'w-8 h-8';
  const textSize = size === 'sm' ? 'text-[17px]' : 'text-[19px]';

  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6153CC] focus-visible:ring-offset-2 rounded-lg"
      aria-label={`${BRAND_NAME} Home`}
    >
      <span className={`${iconDim} relative inline-flex items-center justify-center shrink-0`}>
        <svg viewBox="0 0 36 36" fill="none" className="w-full h-full" aria-hidden="true">
          <path
            d="M16.2 2.4a3.6 3.6 0 0 1 3.6 0l10.6 6.12a3.6 3.6 0 0 1 1.8 3.12v12.24a3.6 3.6 0 0 1-1.8 3.12l-10.6 6.12a3.6 3.6 0 0 1-3.6 0L5.6 27a3.6 3.6 0 0 1-1.8-3.12V11.64a3.6 3.6 0 0 1 1.8-3.12L16.2 2.4Z"
            className="fill-[#6153CC] transition-colors duration-200 group-hover:fill-[#4F41B8]"
          />
          <path
            d="M14 11.75v12.5M14.3 18.1l6.4-6.1M16.8 16.4l4.4 7.85"
            stroke="#FFFFFF"
            strokeWidth="2.45"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className={`font-display font-bold tracking-tight text-[#594BB8] ${textSize}`}>
        {BRAND_NAME}
      </span>
    </Link>
  );
}
