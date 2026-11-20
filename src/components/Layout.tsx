import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1F2128] relative overflow-x-clip">
      {/* Subtle organic wavy contour lines matching reference canvas */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <svg
          className="w-full h-full opacity-[0.45]"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M-60 720 C 120 620, 260 830, 410 730 C 560 630, 620 490, 520 430"
            stroke="#EDEDF5"
            strokeWidth="1.4"
          />
          <path
            d="M980 -40 C 1020 120, 1180 180, 1290 120 C 1380 70, 1470 150, 1490 280"
            stroke="#EDEDF5"
            strokeWidth="1.4"
          />
          <path
            d="M1160 880 C 1100 740, 1240 640, 1380 700 C 1450 730, 1500 680, 1520 620"
            stroke="#EDEDF5"
            strokeWidth="1.4"
          />
        </svg>
      </div>

      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
