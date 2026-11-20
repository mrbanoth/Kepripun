import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Compass, Home, Search, Video, VideoOff } from 'lucide-react';
import { HERO_PARTICIPANTS } from '../data';
import { SafeImage } from '../components/SafeImage';

export function NotFoundPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [roomInput, setRoomInput] = useState('');

  const handleQuickJoin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = roomInput
      .trim()
      .split('/')
      .filter(Boolean)
      .pop()
      ?.replace(/[^a-zA-Z0-9-_]/g, '')
      .toLowerCase();

    if (cleaned && cleaned.length >= 3) {
      navigate(`/meeting/${cleaned}`);
    } else {
      navigate('/meeting/new');
    }
  };

  return (
    <div className="max-w-[1060px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Copy + Recovery Room Search */}
        <div className="lg:col-span-6 space-y-6">
          <p className="font-mono text-[13.5px] font-medium text-[#6153CC] tabular-nums">
            Error 404 · Route not found
          </p>
          <h1 className="font-display text-[36px] sm:text-[48px] font-bold tracking-tight text-[#1F2128] leading-[1.12] [text-wrap:balance]">
            Looks like this room link disconnected.
          </h1>
          <p className="text-[16px] leading-relaxed text-[#6F7382]">
            We couldn&apos;t find{' '}
            <span className="font-mono text-[14px] text-[#1F2128] break-all">
              {location.pathname}
            </span>
            . Double-check the URL, paste a valid Kepripun room code below, or jump back to your
            workspace.
          </p>

          <form onSubmit={handleQuickJoin} className="max-w-[460px] pt-1">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 rounded-[24px] sm:rounded-full bg-white border border-[#E8E8F2] shadow-[0_10px_28px_rgba(31,33,40,0.05)] focus-within:border-[#6153CC] focus-within:ring-4 focus-within:ring-[#6153CC]/10 transition-all">
              <div className="flex items-center flex-1 min-w-0 pl-3">
                <Search className="w-4 h-4 text-[#9397A6] shrink-0" />
                <label htmlFor="notfound-room" className="sr-only">
                  Enter a meeting code to join
                </label>
                <input
                  id="notfound-room"
                  type="text"
                  value={roomInput}
                  onChange={(e) => setRoomInput(e.target.value)}
                  placeholder="Paste room code (e.g. kpr-design-sync)"
                  className="flex-1 min-w-0 bg-transparent px-3 py-2 text-[14px] text-[#1F2128] placeholder:text-[#9A9EAD] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#6153CC] text-white text-[13.5px] font-medium hover:bg-[#4F41B8] transition-colors cursor-pointer shrink-0"
              >
                <Video className="w-4 h-4" />
                <span>Join room</span>
              </button>
            </div>
          </form>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1F2128] text-white text-[14px] font-medium hover:bg-[#323542] transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#DCDCE8] text-[#3E414E] text-[14px] font-medium hover:border-[#6153CC] hover:text-[#6153CC] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous page</span>
            </button>
          </div>
        </div>

        {/* Right: Kepripun-Themed Visual 404 Illustration */}
        <div className="lg:col-span-6">
          <div className="rounded-[32px] border border-[#EBEBF5] bg-[#FAFAFE] p-6 sm:p-9 space-y-6">
            <div className="grid grid-cols-3 gap-4 items-center">
              <div
                className="aspect-square rounded-[24px] overflow-hidden opacity-85"
                style={{ backgroundColor: HERO_PARTICIPANTS[0].tileBg }}
              >
                <SafeImage
                  src={HERO_PARTICIPANTS[0].avatar}
                  alt={HERO_PARTICIPANTS[0].name}
                  fallbackBg={HERO_PARTICIPANTS[0].tileBg}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Center Disconnected Tile */}
              <div className="aspect-square rounded-[26px] border-2 border-dashed border-[#6153CC]/50 bg-[#F4F2FF] flex flex-col items-center justify-center gap-2 p-3 text-center">
                <span className="w-11 h-11 rounded-2xl bg-[#6153CC] text-white flex items-center justify-center">
                  <VideoOff className="w-5 h-5" />
                </span>
                <span className="font-mono text-[13px] font-semibold text-[#4F41B8] tabular-nums">
                  404
                </span>
              </div>

              <div
                className="aspect-square rounded-[24px] overflow-hidden opacity-85"
                style={{ backgroundColor: HERO_PARTICIPANTS[2].tileBg }}
              >
                <SafeImage
                  src={HERO_PARTICIPANTS[2].avatar}
                  alt={HERO_PARTICIPANTS[2].name}
                  fallbackBg={HERO_PARTICIPANTS[2].tileBg}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#EAEAF4] space-y-3">
              <p className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#565A69]">
                <Compass className="w-4 h-4 text-[#6153CC]" />
                <span>Popular Kepripun destinations</span>
              </p>
              <div className="grid grid-cols-2 gap-2.5 text-[13.5px]">
                <Link
                  to="/features"
                  className="px-4 py-2.5 rounded-2xl bg-white border border-[#EBEBF3] text-[#1F2128] font-medium hover:border-[#6153CC] hover:text-[#6153CC] transition-colors"
                >
                  Explore Features
                </Link>
                <Link
                  to="/community"
                  className="px-4 py-2.5 rounded-2xl bg-white border border-[#EBEBF3] text-[#1F2128] font-medium hover:border-[#6153CC] hover:text-[#6153CC] transition-colors"
                >
                  Community Hub
                </Link>
                <Link
                  to="/dashboard"
                  className="px-4 py-2.5 rounded-2xl bg-white border border-[#EBEBF3] text-[#1F2128] font-medium hover:border-[#6153CC] hover:text-[#6153CC] transition-colors"
                >
                  Workspace Dashboard
                </Link>
                <Link
                  to="/meeting/kpr-design-sync"
                  className="px-4 py-2.5 rounded-2xl bg-white border border-[#EBEBF3] text-[#1F2128] font-medium hover:border-[#6153CC] hover:text-[#6153CC] transition-colors"
                >
                  Join Demo Room
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
