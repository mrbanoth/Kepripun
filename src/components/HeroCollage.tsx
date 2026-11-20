import { useEffect, useState } from 'react';
import { Cloud, Lock, MicOff, Phone, Smile, VideoOff } from 'lucide-react';
import { HERO_PARTICIPANTS, Participant } from '../data';
import { SafeImage } from './SafeImage';

interface HeroCollageProps {
  onSelectParticipant?: (participant: Participant) => void;
}

const ROTATION_ORDER = ['p-clara', 'p-daniel', 'p-maya', 'p-sofia', 'p-arjun', 'p-alex', 'p-lucas'];

export function HeroCollage({ onSelectParticipant }: HeroCollageProps) {
  const [activeId, setActiveId] = useState<string>('p-clara');
  const [userPinned, setUserPinned] = useState(false);
  const [burstText, setBurstText] = useState<string | null>(null);

  // Subtle real-time speaker rotation when not manually interacted with
  useEffect(() => {
    if (userPinned) return;
    const interval = window.setInterval(() => {
      setActiveId((current) => {
        const idx = ROTATION_ORDER.indexOf(current);
        return ROTATION_ORDER[(idx + 1) % ROTATION_ORDER.length];
      });
    }, 3600);
    return () => window.clearInterval(interval);
  }, [userPinned]);

  const byPos = (pos: Participant['position']) =>
    HERO_PARTICIPANTS.find((p) => p.position === pos)!;

  const topLeft = byPos('top-left');
  const topRight = byPos('top-right');
  const midLeft = byPos('mid-left');
  const center = byPos('center');
  const midRight = byPos('mid-right');
  const botLeft = byPos('bot-left');
  const botRight = byPos('bot-right');

  const activeParticipant =
    HERO_PARTICIPANTS.find((p) => p.id === activeId) ?? center;

  const triggerReaction = (label: string) => {
    setBurstText(label);
    window.setTimeout(() => setBurstText(null), 1800);
  };

  const renderTile = (
    p: Participant,
    extraClasses = '',
    isCenter = false
  ) => {
    const isSelected = activeId === p.id;
    return (
      <button
        type="button"
        onClick={() => {
          setUserPinned(true);
          setActiveId(p.id);
          onSelectParticipant?.(p);
        }}
        onMouseEnter={() => {
          setUserPinned(true);
          setActiveId(p.id);
        }}
        onMouseLeave={() => setUserPinned(false)}
        aria-label={`${p.name}, ${p.role} from ${p.location}`}
        className={`group relative overflow-hidden rounded-[22px] sm:rounded-[32px] aspect-square w-full transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6153CC] focus-visible:ring-offset-2 ${
          isSelected && !isCenter ? 'ring-2 ring-[#6153CC]/60 ring-offset-2' : ''
        } ${extraClasses}`}
        style={{ backgroundColor: p.tileBg }}
      >
        <SafeImage
          src={p.avatar}
          alt={p.name}
          fallbackBg={p.tileBg}
          fallbackLabel={p.name}
          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span
          className={`pointer-events-none absolute inset-x-1.5 sm:inset-x-2 bottom-1.5 sm:bottom-2 px-2 py-0.5 rounded-full bg-[#1F2128]/78 text-white text-[10.5px] sm:text-[11px] font-medium transition-all duration-200 truncate ${
            isSelected
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0'
          }`}
        >
          {p.shortName} · {p.location.split(',')[0]}
        </span>
      </button>
    );
  };

  return (
    <div className="relative w-full max-w-[540px] mx-auto select-none px-1 sm:px-0">
      {/* Subtle organic connecting curves + dashed orbital arcs */}
      <svg
        viewBox="0 0 560 520"
        fill="none"
        className="pointer-events-none absolute inset-0 w-full h-full z-0"
        aria-hidden="true"
      >
        <rect
          x="184"
          y="166"
          width="192"
          height="188"
          rx="42"
          stroke="#2E3039"
          strokeWidth="1.35"
        />
        <path d="M280 120 L280 166" stroke="#2E3039" strokeWidth="1.35" />
        <path d="M280 354 L280 400" stroke="#2E3039" strokeWidth="1.35" />
        <path
          d="M254 166 C272 166, 280 154, 280 138 M306 166 C288 166, 280 154, 280 138"
          stroke="#2E3039"
          strokeWidth="1.35"
        />
        <path
          d="M254 354 C272 354, 280 366, 280 382 M306 354 C288 354, 280 366, 280 382"
          stroke="#2E3039"
          strokeWidth="1.35"
        />
        <path
          d="M112 96 C62 114, 48 162, 56 196"
          stroke="#2E3039"
          strokeWidth="1.35"
          strokeDasharray="6 6"
        />
        <path
          d="M504 320 C512 362, 492 406, 446 426"
          stroke="#2E3039"
          strokeWidth="1.35"
          strokeDasharray="6 6"
        />
      </svg>

      {/* 3-Row Staggered Video Collage */}
      <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-5 py-2 sm:py-3 px-2 sm:px-4">
        {/* Row 1: 2 tiles centered */}
        <div className="grid grid-cols-2 gap-4 sm:gap-8 w-[72%] sm:w-[66%] relative">
          {renderTile(topLeft)}
          {renderTile(topRight)}

          <button
            type="button"
            onClick={() => triggerReaction('Cloud sync active')}
            aria-label="Cloud recording ready"
            className="absolute left-1/2 top-1.5 sm:top-2 -translate-x-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-[#272932] text-white shadow-md flex items-center justify-center hover:scale-105 hover:bg-[#6153CC] transition-all duration-150 cursor-pointer"
          >
            <Cloud className="w-4 h-4 sm:w-[18px] sm:h-[18px] fill-white/95" />
          </button>

          {/* Safe mobile positioning so LOL never overflows 375px screens */}
          <button
            type="button"
            onClick={() => triggerReaction('LOL 😂 sent to room')}
            className="absolute -right-2 sm:-right-7 top-2 sm:top-4 z-20 rotate-[12deg] inline-flex items-center gap-1 px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-[#191B22] text-white text-[12px] sm:text-[14px] font-semibold shadow-lg hover:scale-105 transition-transform duration-150 cursor-pointer"
          >
            <span>LOL</span>
            <span aria-hidden="true">😂</span>
          </button>
        </div>

        {/* Row 2: 3 tiles */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full items-center relative">
          {renderTile(midLeft)}

          <div className="relative p-1 sm:p-2">
            {renderTile(center, 'shadow-sm', true)}
          </div>

          {renderTile(midRight)}

          <button
            type="button"
            onClick={() => triggerReaction('Alex is muted')}
            aria-label="Participant microphone muted"
            className="hidden sm:flex absolute -left-1 -top-9 z-20 w-9 h-9 rounded-full bg-[#272932] text-white shadow-md items-center justify-center hover:bg-[#6153CC] transition-colors cursor-pointer"
          >
            <MicOff className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => triggerReaction('Room encrypted (AES-256)')}
            aria-label="End-to-end encrypted room"
            className="absolute left-[31.5%] top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[12deg] z-20 w-8 h-8 sm:w-12 sm:h-10 rounded-xl bg-[#272932] text-white shadow-md flex items-center justify-center hover:scale-105 hover:bg-[#6153CC] transition-all duration-150 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" />
          </button>

          <button
            type="button"
            onClick={() => triggerReaction('Reaction burst sent!')}
            aria-label="Send live emoji reaction"
            className="absolute left-[68.5%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-12 sm:h-10 rounded-xl bg-[#272932] text-white shadow-md flex items-center justify-center hover:scale-105 hover:bg-[#6153CC] transition-all duration-150 cursor-pointer"
          >
            <Smile className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" />
          </button>

          <button
            type="button"
            onClick={() => triggerReaction('Low-bandwidth mode ready')}
            aria-label="Toggle video mode"
            className="hidden sm:flex absolute -right-1 -bottom-9 z-20 w-9 h-9 rounded-full bg-[#272932] text-white shadow-md items-center justify-center hover:bg-[#6153CC] transition-colors cursor-pointer"
          >
            <VideoOff className="w-4 h-4" />
          </button>
        </div>

        {/* Row 3: 2 tiles centered */}
        <div className="grid grid-cols-2 gap-4 sm:gap-8 w-[72%] sm:w-[66%] relative">
          {renderTile(botLeft)}
          {renderTile(botRight)}

          <button
            type="button"
            onClick={() => triggerReaction('Wow 😮 sent to room')}
            className="absolute -left-2 sm:-left-9 top-2.5 sm:top-5 z-20 -rotate-[13deg] inline-flex items-center gap-1 px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-[#191B22] text-white text-[12px] sm:text-[14px] font-semibold shadow-lg hover:scale-105 transition-transform duration-150 cursor-pointer"
          >
            <span>Wow</span>
            <span aria-hidden="true">😮</span>
          </button>

          <button
            type="button"
            onClick={() => triggerReaction('HD voice channel active')}
            aria-label="Audio channel connected"
            className="absolute left-1/2 bottom-2.5 sm:bottom-4 -translate-x-1/2 -rotate-[12deg] z-20 w-9 h-8 sm:w-12 sm:h-10 rounded-xl bg-[#272932] text-white shadow-md flex items-center justify-center hover:scale-105 hover:bg-[#6153CC] transition-all duration-150 cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" />
          </button>
        </div>
      </div>

      {/* Live active speaker caption below collage */}
      <div className="mt-2.5 flex items-center justify-center min-h-[24px] text-center text-[12.5px] text-[#6F7382] px-2">
        {burstText ? (
          <span className="font-medium text-[#6153CC]">{burstText}</span>
        ) : (
          <span className="truncate max-w-full">
            Live preview:{' '}
            <strong className="font-medium text-[#1F2128]">{activeParticipant.name}</strong> ·{' '}
            {activeParticipant.role} · {activeParticipant.location}
          </span>
        )}
      </div>
    </div>
  );
}
