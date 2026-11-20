import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CalendarPlus,
  Check,
  Copy,
  Loader2,
  Lock,
  Mic,
  MicOff,
  RefreshCw,
  Video,
  VideoOff,
} from 'lucide-react';
import { HERO_PARTICIPANTS, ROOM_PRESETS } from '../data';
import { useWorkspace } from '../context/WorkspaceContext';
import { SafeImage } from '../components/SafeImage';

const BACKDROP_SWATCHES = [
  { label: 'Peach', color: '#FAD4B4' },
  { label: 'Lavender', color: '#D2B8F7' },
  { label: 'Sky', color: '#A7D8F5' },
  { label: 'Mist', color: '#E8E9F2' },
];

function randomRoomCode() {
  const words = ['sync', 'studio', 'pulse', 'orbit', 'atelier', 'sprint'];
  const pick = words[Math.floor(Math.random() * words.length)];
  const suffix = Math.random().toString(36).slice(2, 6);
  return `kpr-${pick}-${suffix}`;
}

export function NewMeetingPage() {
  const navigate = useNavigate();
  const { user, preferences, addMeeting } = useWorkspace();

  const [displayName, setDisplayName] = useState(user?.name ?? 'Alex Guest');
  const [roomTitle, setRoomTitle] = useState('Team Catch-Up');
  const [roomCode, setRoomCode] = useState(() => randomRoomCode());
  const [micOn, setMicOn] = useState(!preferences.joinMuted);
  const [camOn, setCamOn] = useState(true);
  const [encrypted, setEncrypted] = useState(preferences.defaultEncrypted);
  const [tileBg, setTileBg] = useState(preferences.defaultTileBg);
  const [copied, setCopied] = useState(false);
  const [launching, setLaunching] = useState(false);
  const [scheduledToast, setScheduledToast] = useState(false);

  const shareUrl = useMemo(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://kepripun.app';
    return `${origin}/meeting/${roomCode}`;
  }, [roomCode]);

  const handleCopy = () => {
    navigator.clipboard?.writeText(shareUrl).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const handleJoinNow = (e: React.FormEvent) => {
    e.preventDefault();
    setLaunching(true);
    const safeCode =
      roomCode.trim().replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase() || randomRoomCode();
    window.setTimeout(() => {
      navigate(`/meeting/${safeCode}`, {
        state: {
          displayName: displayName.trim() || 'You',
          roomTitle: roomTitle.trim() || 'Kepripun Room',
          micOn,
          camOn,
          encrypted,
          tileBg,
        },
      });
    }, 220);
  };

  const handleSaveToSchedule = () => {
    addMeeting({
      title: roomTitle.trim() || 'Scheduled Team Room',
      dateLabel: 'Today',
      timeRange: '4:00 – 4:30 PM',
      durationMinutes: 30,
      encrypted,
      description: 'Created from Pre-Join Lobby with instant browser link.',
    });
    setScheduledToast(true);
    window.setTimeout(() => setScheduledToast(false), 2600);
  };

  return (
    <div className="max-w-[1140px] mx-auto px-4 sm:px-8 py-10 sm:py-16">
      <div className="mb-8 sm:mb-10 max-w-[600px] space-y-2.5">
        <p className="text-[13.5px] font-medium text-[#6153CC]">Pre-Join Green Room</p>
        <h1 className="font-display text-[30px] sm:text-[42px] font-bold tracking-tight text-[#1F2128] leading-[1.15]">
          Check your audio & camera before entering.
        </h1>
        <p className="text-[15px] sm:text-[15.5px] text-[#6F7382]">
          Share your room link with anyone — guests join straight from their browser with zero
          downloads.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 items-start">
        {/* Left: Live Video Preview Card */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-5">
          <div
            className="relative rounded-[26px] sm:rounded-[30px] overflow-hidden aspect-[4/3] sm:aspect-[16/10] flex items-center justify-center border border-[#EAEAF2] transition-colors duration-200"
            style={{ backgroundColor: camOn ? tileBg : '#1E2028' }}
          >
            {camOn ? (
              <SafeImage
                src={user?.avatar ?? HERO_PARTICIPANTS[3].avatar}
                alt={displayName || 'Your camera preview'}
                fallbackBg={tileBg}
                fallbackLabel={displayName}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="text-center space-y-3 text-white px-6">
                <div className="w-20 h-20 rounded-[24px] bg-[#6153CC] mx-auto flex items-center justify-center font-display text-[26px] font-bold">
                  {(displayName || 'Y')
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <p className="text-[15px] text-white/80">Camera is off</p>
              </div>
            )}

            <div className="absolute top-3.5 left-3.5 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#191B22]/75 backdrop-blur-sm text-white text-[13px] font-medium">
              <span>{displayName.trim() || 'You'}</span>
              {encrypted && (
                <>
                  <span aria-hidden="true" className="text-white/40">
                    ·
                  </span>
                  <Lock className="w-3.5 h-3.5 text-[#CFC7FE]" />
                </>
              )}
            </div>

            <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMicOn((prev) => !prev)}
                aria-label={micOn ? 'Mute microphone' : 'Unmute microphone'}
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer ${
                  micOn
                    ? 'bg-[#1F2128]/85 text-white hover:bg-[#1F2128]'
                    : 'bg-rose-600 text-white hover:bg-rose-700'
                }`}
              >
                {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>
              <button
                type="button"
                onClick={() => setCamOn((prev) => !prev)}
                aria-label={camOn ? 'Turn camera off' : 'Turn camera on'}
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer ${
                  camOn
                    ? 'bg-[#1F2128]/85 text-white hover:bg-[#1F2128]'
                    : 'bg-rose-600 text-white hover:bg-rose-700'
                }`}
              >
                {camOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 rounded-[22px] border border-[#EBEBF3] bg-[#FAFAFD] px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="text-[13.5px] font-medium text-[#565A69]">Studio backdrop:</span>
              <div className="flex items-center gap-2">
                {BACKDROP_SWATCHES.map((swatch) => (
                  <button
                    key={swatch.label}
                    type="button"
                    onClick={() => setTileBg(swatch.color)}
                    aria-label={`${swatch.label} backdrop`}
                    className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                      tileBg === swatch.color
                        ? 'border-[#6153CC] scale-110'
                        : 'border-white shadow-sm hover:scale-105'
                    }`}
                    style={{ backgroundColor: swatch.color }}
                  />
                ))}
              </div>
            </div>

            <p className="text-[13px] text-[#6F7382]">
              Mic: <strong className="text-[#1F2128]">{micOn ? 'Ready' : 'Muted'}</strong> · Video:{' '}
              <strong className="text-[#1F2128]">{camOn ? 'HD 1080p' : 'Off'}</strong>
            </p>
          </div>
        </div>

        {/* Right: Room Configuration Form */}
        <form
          onSubmit={handleJoinNow}
          className="lg:col-span-5 rounded-[26px] sm:rounded-[28px] border border-[#EBEBF3] bg-white p-5 sm:p-8 space-y-5"
        >
          <div className="space-y-1.5">
            <label htmlFor="prejoin-name" className="block text-[13.5px] font-medium text-[#1F2128]">
              Your display name
            </label>
            <input
              id="prejoin-name"
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-2xl border border-[#E4E4F0] text-[14.5px] text-[#1F2128] focus:outline-none focus:border-[#6153CC] focus:ring-4 focus:ring-[#6153CC]/10"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="prejoin-title" className="block text-[13.5px] font-medium text-[#1F2128]">
              Meeting title
            </label>
            <input
              id="prejoin-title"
              type="text"
              value={roomTitle}
              onChange={(e) => setRoomTitle(e.target.value)}
              placeholder="e.g. Design Critique"
              className="w-full px-4 py-3 rounded-2xl border border-[#E4E4F0] text-[14.5px] text-[#1F2128] focus:outline-none focus:border-[#6153CC] focus:ring-4 focus:ring-[#6153CC]/10"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="prejoin-code" className="text-[13.5px] font-medium text-[#1F2128]">
                Room code
              </label>
              <button
                type="button"
                onClick={() => setRoomCode(randomRoomCode())}
                className="inline-flex items-center gap-1 text-[12.5px] font-medium text-[#6153CC] hover:text-[#4F41B8] cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Generate new</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="prejoin-code"
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                className="flex-1 min-w-0 px-4 py-3 rounded-2xl border border-[#E4E4F0] font-mono text-[13.5px] text-[#1F2128] focus:outline-none focus:border-[#6153CC] focus:ring-4 focus:ring-[#6153CC]/10"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl border border-[#E4E4F0] text-[13.5px] font-medium text-[#3E414E] hover:border-[#6153CC] hover:text-[#6153CC] transition-colors cursor-pointer shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-[#6153CC]" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[12.5px] text-[#7D8190]">Quick presets:</p>
            <div className="flex flex-wrap gap-2">
              {ROOM_PRESETS.map((preset) => (
                <button
                  key={preset.code}
                  type="button"
                  onClick={() => {
                    setRoomTitle(preset.label);
                    setRoomCode(preset.code);
                  }}
                  className="px-3 py-1.5 rounded-full bg-[#F5F5FA] text-[12.5px] font-medium text-[#4C505E] hover:bg-[#EAE7FC] hover:text-[#4F41B8] transition-colors cursor-pointer"
                >
                  {preset.label} · {preset.duration}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center justify-between gap-3 pt-1 cursor-pointer select-none">
            <span className="flex items-center gap-2 text-[14px] text-[#3E414E]">
              <Lock className="w-4 h-4 text-[#6153CC]" />
              <span>End-to-end encrypted room</span>
            </span>
            <input
              type="checkbox"
              checked={encrypted}
              onChange={(e) => setEncrypted(e.target.checked)}
              className="w-4 h-4 accent-[#6153CC] rounded"
            />
          </label>

          <div className="pt-2 space-y-2.5">
            <button
              type="submit"
              disabled={launching}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#6153CC] text-white text-[15px] font-semibold hover:bg-[#4F41B8] disabled:opacity-75 transition-colors cursor-pointer"
            >
              {launching && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{launching ? 'Launching room...' : 'Join room now'}</span>
            </button>
            <button
              type="button"
              onClick={handleSaveToSchedule}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full border border-[#E2E2EE] text-[#3E414E] text-[14px] font-medium hover:border-[#6153CC] hover:text-[#6153CC] transition-colors cursor-pointer"
            >
              <CalendarPlus className="w-4 h-4" />
              <span>Save to Workspace Schedule</span>
            </button>
          </div>

          {scheduledToast && (
            <p className="text-[13px] text-[#4F41B8] text-center">
              Saved! View it anytime in your{' '}
              <Link to="/dashboard" className="underline font-medium">
                Meetings Dashboard
              </Link>
              .
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
