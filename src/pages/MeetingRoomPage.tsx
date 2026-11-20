import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Check,
  Circle,
  Copy,
  FileText,
  Hand,
  LayoutGrid,
  Lock,
  MessageSquare,
  Mic,
  MicOff,
  MonitorUp,
  PhoneOff,
  Pin,
  Plus,
  Send,
  Smile,
  Subtitles,
  Unlock,
  Users,
  Video,
  VideoOff,
  X,
} from 'lucide-react';
import {
  ChatMessage,
  HERO_PARTICIPANTS,
  INITIAL_ROOM_MESSAGES,
  LIVE_CAPTION_SCRIPT,
  SIMULATED_REPLIES,
} from '../data';
import { useWorkspace } from '../context/WorkspaceContext';
import { RoomConnectingOverlay } from '../components/PageSkeleton';
import { SafeImage } from '../components/SafeImage';

interface PrejoinState {
  displayName?: string;
  roomTitle?: string;
  micOn?: boolean;
  camOn?: boolean;
  encrypted?: boolean;
  tileBg?: string;
}

interface FloatingReaction {
  id: number;
  label: string;
  sender: string;
  leftPercent: number;
}

const REACTION_CHOICES = [
  { label: 'LOL 😂', value: 'LOL 😂' },
  { label: 'Wow 😮', value: 'Wow 😮' },
  { label: 'Clap 👏', value: 'Clap 👏' },
  { label: 'Love ❤️', value: 'Love ❤️' },
];

export function MeetingRoomPage() {
  const { code = 'kpr-design-sync' } = useParams<{ code: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, preferences, meetings, addRecording } = useWorkspace();

  const prejoin = (location.state as PrejoinState | null) ?? {};
  const matchedMeeting = meetings.find((m) => m.code === code);

  const myName = prejoin.displayName || user?.name || 'You (Host)';
  const roomTitle = prejoin.roomTitle || matchedMeeting?.title || `Room ${code}`;

  // 3-step encrypted handshake loading state on entry
  const [connectStep, setConnectStep] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  const [micOn, setMicOn] = useState(prejoin.micOn ?? !preferences.joinMuted);
  const [camOn, setCamOn] = useState(prejoin.camOn ?? true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [roomLocked, setRoomLocked] = useState(prejoin.encrypted ?? preferences.defaultEncrypted);
  const [handRaised, setHandRaised] = useState(false);
  const [captionsOn, setCaptionsOn] = useState(preferences.autoCaptions);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedSec, setRecordedSec] = useState(0);
  const [savedRecNotice, setSavedRecNotice] = useState<string | null>(null);

  const [layoutMode, setLayoutMode] = useState<'gallery' | 'spotlight'>('gallery');
  const [pinnedId, setPinnedId] = useState<string>('p-clara');
  const [sidePanel, setSidePanel] = useState<'none' | 'chat' | 'participants' | 'notes'>('none');
  const [reactionMenuOpen, setReactionMenuOpen] = useState(false);
  const [floatingReactions, setFloatingReactions] = useState<FloatingReaction[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);

  const [elapsedSec, setElapsedSec] = useState(0);
  const [captionIndex, setCaptionIndex] = useState(0);
  const [mutedPeers, setMutedPeers] = useState<Record<string, boolean>>({
    'p-alex': true,
    'p-lucas': true,
  });

  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_ROOM_MESSAGES);
  const [draftMessage, setDraftMessage] = useState('');
  const [replyCursor, setReplyCursor] = useState(0);
  const [roomNotes, setRoomNotes] = useState<string[]>([
    'Verify mobile bottom toolbar spacing across 375px and 430px viewports',
    'Share updated MLS encryption latency benchmarks with pilot accounts',
  ]);
  const [draftNote, setDraftNote] = useState('');

  // Connection handshake steps (~850ms total)
  useEffect(() => {
    setIsConnected(false);
    setConnectStep(0);
    const t1 = window.setTimeout(() => setConnectStep(1), 260);
    const t2 = window.setTimeout(() => setConnectStep(2), 540);
    const t3 = window.setTimeout(() => setIsConnected(true), 860);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [code]);

  // Elapsed meeting timer + recording timer
  useEffect(() => {
    if (!isConnected) return;
    const timer = window.setInterval(() => {
      setElapsedSec((s) => s + 1);
      setRecordedSec((r) => (isRecording ? r + 1 : r));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isConnected, isRecording]);

  // Real-time active speaker & live captions rotation every 4.8s
  useEffect(() => {
    if (!isConnected) return;
    const interval = window.setInterval(() => {
      setCaptionIndex((idx) => (idx + 1) % LIVE_CAPTION_SCRIPT.length);
    }, 4800);
    return () => window.clearInterval(interval);
  }, [isConnected]);

  // Occasional simulated peer reactions for real-time room energy
  useEffect(() => {
    if (!isConnected) return;
    const peerReactions = [
      { label: 'Wow 😮', sender: 'Maya' },
      { label: 'Clap 👏', sender: 'Daniel' },
      { label: 'LOL 😂', sender: 'Sofia' },
    ];
    let step = 0;
    const timer = window.setInterval(() => {
      const next = peerReactions[step % peerReactions.length];
      step += 1;
      const id = Date.now() + Math.random();
      const leftPercent = 20 + Math.floor(Math.random() * 60);
      setFloatingReactions((prev) => [...prev, { id, ...next, leftPercent }]);
      window.setTimeout(() => {
        setFloatingReactions((prev) => prev.filter((item) => item.id !== id));
      }, 2400);
    }, 11500);
    return () => window.clearInterval(timer);
  }, [isConnected]);

  const currentCaption = LIVE_CAPTION_SCRIPT[captionIndex];

  const formattedTimer = useMemo(() => {
    const mins = Math.floor(elapsedSec / 60)
      .toString()
      .padStart(2, '0');
    const secs = (elapsedSec % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }, [elapsedSec]);

  const formattedRecTimer = useMemo(() => {
    const mins = Math.floor(recordedSec / 60)
      .toString()
      .padStart(2, '0');
    const secs = (recordedSec % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }, [recordedSec]);

  const roomTiles = useMemo(() => {
    const remote = HERO_PARTICIPANTS.slice(0, 5).map((p) => {
      const isMuted = mutedPeers[p.id] ?? p.isMuted;
      return {
        id: p.id,
        name: p.name,
        shortName: p.shortName,
        role: p.role,
        location: p.location,
        avatar: p.avatar,
        tileBg: p.tileBg,
        isMuted,
        isCameraOff: false,
        isSpeaking: currentCaption.speakerId === p.id && !isMuted,
        isSelf: false,
      };
    });

    return [
      {
        id: 'self',
        name: `${myName} (You)`,
        shortName: myName.split(' ')[0],
        role: user?.role ?? 'Host',
        location: 'Local browser',
        avatar: user?.avatar ?? HERO_PARTICIPANTS[5].avatar,
        tileBg: prejoin.tileBg ?? preferences.defaultTileBg,
        isMuted: !micOn,
        isCameraOff: !camOn,
        isSpeaking: micOn && !screenSharing && currentCaption.speakerId === 'p-alex',
        isSelf: true,
      },
      ...remote,
    ];
  }, [
    myName,
    user,
    prejoin.tileBg,
    preferences.defaultTileBg,
    micOn,
    camOn,
    screenSharing,
    mutedPeers,
    currentCaption.speakerId,
  ]);

  const spawnReaction = (label: string, sender = myName.split(' ')[0]) => {
    const id = Date.now() + Math.random();
    const leftPercent = 20 + Math.floor(Math.random() * 60);
    setFloatingReactions((prev) => [...prev, { id, label, sender, leftPercent }]);
    window.setTimeout(() => {
      setFloatingReactions((prev) => prev.filter((item) => item.id !== id));
    }, 2400);
    setReactionMenuOpen(false);
  };

  const handleToggleRecording = () => {
    if (!isRecording) {
      setRecordedSec(0);
      setIsRecording(true);
      setSavedRecNotice(null);
      return;
    }

    // Stop recording and persist a full recording into WorkspaceContext
    setIsRecording(false);
    const recId = `rec-live-${Date.now()}`;
    const durationLabel = formattedRecTimer === '00:00' ? '00:12' : formattedRecTimer;
    addRecording({
      id: recId,
      code,
      title: `${roomTitle} (Live Capture)`,
      recordedAt: `Today · ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      duration: durationLabel,
      hostName: myName,
      hostAvatar: user?.avatar ?? HERO_PARTICIPANTS[3].avatar,
      participantsCount: roomTiles.length,
      summary: `Captured live session in room ${code} with ${roomTiles.length} connected participants and ${roomNotes.length} shared action notes.`,
      actionItems: roomNotes.map((note, idx) => ({
        owner: idx % 2 === 0 ? myName : 'Clara Morales',
        task: note,
        due: 'This week',
        done: false,
      })),
      transcript: [
        ...LIVE_CAPTION_SCRIPT.slice(0, 3).map((line, i) => ({
          time: `00:${((i + 1) * 14).toString().padStart(2, '0')}`,
          speaker: line.speakerName,
          line: line.text,
        })),
        ...messages.slice(-2).map((m, i) => ({
          time: `01:${((i + 1) * 12).toString().padStart(2, '0')}`,
          speaker: m.senderName,
          line: m.text,
        })),
      ],
    });
    setSavedRecNotice(recId);
    window.setTimeout(() => setSavedRecNotice(null), 5000);
  };

  const handleCopyInvite = () => {
    const url = `${window.location.origin}/meeting/${code}`;
    navigator.clipboard?.writeText(url).catch(() => {});
    setCopiedLink(true);
    window.setTimeout(() => setCopiedLink(false), 1800);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = draftMessage.trim();
    if (!trimmed) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const outgoing: ChatMessage = {
      id: `m-${Date.now()}`,
      senderId: 'self',
      senderName: myName,
      senderAvatar: user?.avatar ?? HERO_PARTICIPANTS[5].avatar,
      text: trimmed,
      timestamp: now,
    };
    setMessages((prev) => [...prev, outgoing]);
    setDraftMessage('');

    const replySpec = SIMULATED_REPLIES[replyCursor % SIMULATED_REPLIES.length];
    setReplyCursor((c) => c + 1);
    const peer = HERO_PARTICIPANTS.find((p) => p.id === replySpec.senderId);
    if (peer) {
      window.setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `m-reply-${Date.now()}`,
            senderId: peer.id,
            senderName: peer.name,
            senderAvatar: peer.avatar,
            text: replySpec.text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }, 900);
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = draftNote.trim();
    if (!trimmed) return;
    setRoomNotes((prev) => [trimmed, ...prev]);
    setDraftNote('');
  };

  if (!isConnected) {
    return (
      <RoomConnectingOverlay roomCode={code} roomTitle={roomTitle} stepIndex={connectStep} />
    );
  }

  const spotlightTile = roomTiles.find((t) => t.id === pinnedId) ?? roomTiles[1];

  return (
    <div className="h-[100dvh] w-full bg-[#151720] text-white flex flex-col overflow-hidden">
      {/* Top Room Header */}
      <header className="h-14 sm:h-16 px-3.5 sm:px-6 border-b border-white/10 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <Link
            to="/"
            className="w-8 h-8 rounded-xl bg-[#6153CC] flex items-center justify-center font-display font-bold text-white text-[15px] shrink-0 hover:bg-[#5143B8] transition-colors"
            aria-label="Kepripun Home"
          >
            K
          </Link>
          <div className="min-w-0">
            <h1 className="font-display text-[14px] sm:text-[16px] font-semibold truncate">
              {roomTitle}
            </h1>
            <div className="flex items-center gap-2 text-[11.5px] sm:text-[12px] text-white/60">
              <span className="font-mono truncate max-w-[120px] sm:max-w-none">{code}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{formattedTimer}</span>
              {isRecording && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-rose-400 tabular-nums">
                    REC {formattedRecTimer}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setRoomLocked((prev) => !prev)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/8 hover:bg-white/14 text-[12.5px] font-medium text-white/90 transition-colors cursor-pointer"
          >
            {roomLocked ? (
              <>
                <Lock className="w-3.5 h-3.5 text-[#CFC7FE]" />
                <span>Encrypted</span>
              </>
            ) : (
              <>
                <Unlock className="w-3.5 h-3.5 text-amber-300" />
                <span>Unlocked</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() =>
              setLayoutMode((prev) => (prev === 'gallery' ? 'spotlight' : 'gallery'))
            }
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/8 hover:bg-white/14 text-[12.5px] font-medium text-white/90 transition-colors cursor-pointer"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>{layoutMode === 'gallery' ? 'Gallery' : 'Spotlight'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopyInvite}
            className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-full bg-[#6153CC] hover:bg-[#4F41B8] text-[12px] sm:text-[12.5px] font-medium text-white transition-colors cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Copied' : 'Invite'}</span>
          </button>
        </div>
      </header>

      {/* Saved Cloud Recording Banner */}
      {savedRecNotice && (
        <div className="px-4 py-2.5 bg-[#6153CC]/25 border-b border-[#6153CC]/40 flex flex-wrap items-center justify-center gap-3 text-[13px]">
          <span>Cloud recording & transcript saved to your Workspace.</span>
          <Link
            to={`/dashboard/recording/${savedRecNotice}`}
            className="font-semibold underline text-[#DFDAFF] hover:text-white"
          >
            Open recording replay
          </Link>
        </div>
      )}

      {/* Main Stage + Side Drawer */}
      <div className="flex-1 flex min-h-0 relative overflow-hidden">
        <div className="flex-1 p-3 sm:p-5 overflow-y-auto flex flex-col justify-center relative">
          {/* Floating Live Reactions */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden z-30">
            {floatingReactions.map((r) => (
              <div
                key={r.id}
                style={{ left: `${r.leftPercent}%` }}
                className="animate-float-reaction absolute bottom-8 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-[#191B22]/95 border border-white/15 text-white text-[13.5px] font-semibold shadow-xl whitespace-nowrap"
              >
                {r.label}{' '}
                <span className="text-[11px] font-normal text-white/65 ml-1">{r.sender}</span>
              </div>
            ))}
          </div>

          {screenSharing ? (
            <div className="h-full max-w-[1100px] w-full mx-auto flex flex-col gap-3 sm:gap-4">
              <div className="flex-1 min-h-[240px] rounded-[24px] border border-white/12 bg-[#1E2130] p-5 sm:p-8 flex flex-col justify-between">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-[13px] font-medium text-[#CFC7FE]">
                    <MonitorUp className="w-4 h-4 shrink-0" />
                    <span className="truncate">{myName} is presenting Q4 Mobile Specs.fig</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setScreenSharing(false)}
                    className="px-3.5 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-[12px] font-medium cursor-pointer"
                  >
                    Stop presenting
                  </button>
                </div>

                <div className="my-auto py-5 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="rounded-2xl bg-white/6 border border-white/10 p-4 space-y-1.5">
                    <p className="text-[12px] font-mono text-[#CFC7FE]">01. Browser Join</p>
                    <p className="font-display text-[20px] font-bold tabular-nums">1.8 sec</p>
                    <p className="text-[12.5px] text-white/65">
                      Pre-warmed WebRTC ICE across 28 edge regions.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/6 border border-white/10 p-4 space-y-1.5">
                    <p className="text-[12px] font-mono text-[#FAD4B4]">02. Spatial Voice</p>
                    <p className="font-display text-[20px] font-bold tabular-nums">48 kHz</p>
                    <p className="text-[12.5px] text-white/65">
                      Opus stereo voice isolation with WASM denoising.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/6 border border-white/10 p-4 space-y-1.5">
                    <p className="text-[12px] font-mono text-[#A7D8F5]">03. MLS Keys</p>
                    <p className="font-display text-[20px] font-bold tabular-nums">&lt; 120 ms</p>
                    <p className="text-[12.5px] text-white/65">
                      Zero-knowledge key rotation on every join/leave.
                    </p>
                  </div>
                </div>

                <p className="text-[12px] text-white/50">
                  Interactive presentation preview · Click Stop presenting to return to gallery
                </p>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                {roomTiles.map((tile) => (
                  <div
                    key={tile.id}
                    className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-video border border-white/10"
                    style={{ backgroundColor: tile.isCameraOff ? '#232634' : tile.tileBg }}
                  >
                    {!tile.isCameraOff ? (
                      <SafeImage
                        src={tile.avatar}
                        alt={tile.name}
                        fallbackBg={tile.tileBg}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-display font-bold text-[13px]">
                        {tile.shortName.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span className="absolute bottom-1 left-1.5 px-2 py-0.5 rounded-full bg-black/65 text-[10.5px] truncate max-w-[85%]">
                      {tile.shortName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : layoutMode === 'spotlight' ? (
            <div className="h-full max-w-[1100px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
              <div
                className="lg:col-span-9 relative rounded-[26px] overflow-hidden min-h-[260px] border-2 border-[#6153CC]"
                style={{
                  backgroundColor: spotlightTile.isCameraOff ? '#232634' : spotlightTile.tileBg,
                }}
              >
                {!spotlightTile.isCameraOff ? (
                  <SafeImage
                    src={spotlightTile.avatar}
                    alt={spotlightTile.name}
                    fallbackBg={spotlightTile.tileBg}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-display text-[36px] font-bold">
                    {spotlightTile.shortName.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="absolute bottom-3.5 left-3.5 px-3.5 py-1.5 rounded-full bg-[#151720]/80 backdrop-blur-sm text-[13px] font-medium flex items-center gap-2">
                  <span>{spotlightTile.name}</span>
                  <span className="text-white/50 hidden sm:inline">·</span>
                  <span className="text-white/75 hidden sm:inline">{spotlightTile.role}</span>
                </div>
              </div>

              <div className="lg:col-span-3 grid grid-cols-3 lg:grid-cols-1 gap-2.5 overflow-y-auto">
                {roomTiles
                  .filter((t) => t.id !== spotlightTile.id)
                  .map((tile) => (
                    <button
                      key={tile.id}
                      type="button"
                      onClick={() => setPinnedId(tile.id)}
                      className="relative rounded-[18px] overflow-hidden aspect-video lg:aspect-[16/10] border border-white/10 hover:border-[#6153CC] transition-colors cursor-pointer text-left"
                      style={{ backgroundColor: tile.isCameraOff ? '#232634' : tile.tileBg }}
                    >
                      {!tile.isCameraOff ? (
                        <SafeImage
                          src={tile.avatar}
                          alt={tile.name}
                          fallbackBg={tile.tileBg}
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-display font-bold text-[14px]">
                          {tile.shortName.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <span className="absolute bottom-1.5 left-2 px-2 py-0.5 rounded-full bg-black/65 text-[11px] font-medium">
                        {tile.shortName}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          ) : (
            /* Mobile-friendly 2-column -> Desktop 3-column Gallery */
            <div className="max-w-[1120px] w-full mx-auto grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
              {roomTiles.map((tile) => (
                <div
                  key={tile.id}
                  className={`group relative rounded-[20px] sm:rounded-[26px] overflow-hidden aspect-[4/3] transition-all ${
                    tile.isSpeaking
                      ? 'ring-2 ring-[#8275F4] ring-offset-2 ring-offset-[#151720]'
                      : 'border border-white/10'
                  }`}
                  style={{ backgroundColor: tile.isCameraOff ? '#232634' : tile.tileBg }}
                >
                  {!tile.isCameraOff ? (
                    <SafeImage
                      src={tile.avatar}
                      alt={tile.name}
                      fallbackBg={tile.tileBg}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-1.5">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#6153CC] flex items-center justify-center font-display text-[18px] sm:text-[22px] font-bold">
                        {tile.shortName.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-[11.5px] sm:text-[12.5px] text-white/65">
                        Camera paused
                      </span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setPinnedId(tile.id);
                      setLayoutMode('spotlight');
                    }}
                    aria-label={`Spotlight ${tile.name}`}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/55 text-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-[#6153CC] transition-all cursor-pointer"
                  >
                    <Pin className="w-3.5 h-3.5" />
                  </button>

                  {tile.isSelf && handRaised && (
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-[#1F2128] text-[11px] font-semibold">
                      Hand ✋
                    </span>
                  )}

                  <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between gap-1.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#151720]/78 backdrop-blur-sm text-[11.5px] sm:text-[12.5px] font-medium truncate">
                      {tile.isSpeaking && (
                        <span className="inline-flex items-end gap-[2px] h-2.5 shrink-0" aria-hidden="true">
                          <span className="w-[2px] h-1.5 bg-[#A89DFF] rounded-full animate-pulse" />
                          <span className="w-[2px] h-2.5 bg-[#A89DFF] rounded-full animate-pulse" />
                          <span className="w-[2px] h-1 bg-[#A89DFF] rounded-full animate-pulse" />
                        </span>
                      )}
                      <span className="truncate">{tile.name}</span>
                    </span>
                    {tile.isMuted && (
                      <span
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#151720]/85 text-rose-300 flex items-center justify-center shrink-0"
                        aria-label={`${tile.shortName} is muted`}
                      >
                        <MicOff className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Live Real-Time Captions Bar */}
          {captionsOn && (
            <div className="mt-3 sm:mt-4 max-w-[680px] w-full mx-auto rounded-2xl bg-[#0E1017]/88 border border-white/10 px-4 py-3 text-center backdrop-blur-sm">
              <p className="text-[11.5px] font-semibold text-[#CFC7FE] mb-0.5">
                {currentCaption.speakerName}
              </p>
              <p className="text-[13.5px] sm:text-[14.5px] text-white/92 leading-snug">
                {currentCaption.text}
              </p>
            </div>
          )}
        </div>

        {/* Side Drawer: Chat / Participants / Shared Notes */}
        {sidePanel !== 'none' && (
          <aside className="w-full sm:w-[340px] bg-[#1C1F2B] border-l border-white/10 flex flex-col shrink-0 absolute inset-0 sm:inset-auto sm:static z-30">
            <div className="h-14 px-4 border-b border-white/10 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                {(
                  [
                    { id: 'chat', label: 'Chat' },
                    { id: 'participants', label: `People (${roomTiles.length})` },
                    { id: 'notes', label: 'Notes' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSidePanel(tab.id)}
                    className={`px-3 py-1.5 rounded-full text-[12.5px] font-medium transition-colors cursor-pointer ${
                      sidePanel === tab.id
                        ? 'bg-[#6153CC] text-white'
                        : 'text-white/65 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setSidePanel('none')}
                aria-label="Close panel"
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {sidePanel === 'chat' && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="space-y-1">
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="font-medium text-white/90">{msg.senderName}</span>
                        <span className="text-white/45 tabular-nums">{msg.timestamp}</span>
                      </div>
                      <p className="text-[13.5px] leading-relaxed text-white/80 bg-white/6 rounded-2xl px-3.5 py-2.5">
                        {msg.text}
                      </p>
                    </div>
                  ))}
                </div>
                <form
                  onSubmit={handleSendMessage}
                  className="p-3.5 border-t border-white/10 flex items-center gap-2"
                >
                  <label htmlFor="room-chat-input" className="sr-only">
                    Message everyone in room
                  </label>
                  <input
                    id="room-chat-input"
                    type="text"
                    value={draftMessage}
                    onChange={(e) => setDraftMessage(e.target.value)}
                    placeholder="Send a message..."
                    className="flex-1 min-w-0 px-3.5 py-2.5 rounded-full bg-white/8 text-[13.5px] text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-[#6153CC]"
                  />
                  <button
                    type="submit"
                    aria-label="Send message"
                    className="w-10 h-10 rounded-full bg-[#6153CC] hover:bg-[#4F41B8] flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}

            {sidePanel === 'participants' && (
              <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
                {roomTiles.map((tile) => (
                  <div
                    key={tile.id}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-white/5"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <SafeImage
                        src={tile.avatar}
                        alt={tile.name}
                        fallbackBg={tile.tileBg}
                        className="w-9 h-9 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-[13.5px] font-medium truncate">{tile.name}</p>
                        <p className="text-[11.5px] text-white/50 truncate">{tile.role}</p>
                      </div>
                    </div>
                    {!tile.isSelf && (
                      <button
                        type="button"
                        onClick={() =>
                          setMutedPeers((prev) => ({ ...prev, [tile.id]: !tile.isMuted }))
                        }
                        aria-label={
                          tile.isMuted ? `Unmute ${tile.shortName}` : `Mute ${tile.shortName}`
                        }
                        className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/16 flex items-center justify-center cursor-pointer shrink-0"
                      >
                        {tile.isMuted ? (
                          <MicOff className="w-3.5 h-3.5 text-rose-300" />
                        ) : (
                          <Mic className="w-3.5 h-3.5 text-white/85" />
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {sidePanel === 'notes' && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  <p className="text-[12.5px] text-white/55">
                    Notes added here attach automatically when you capture a cloud recording.
                  </p>
                  {roomNotes.map((note, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl bg-white/6 border border-white/8 px-3.5 py-3 text-[13.5px] text-white/85 leading-relaxed"
                    >
                      {note}
                    </div>
                  ))}
                </div>
                <form
                  onSubmit={handleAddNote}
                  className="p-3.5 border-t border-white/10 flex items-center gap-2"
                >
                  <label htmlFor="room-note-input" className="sr-only">
                    Add action item or note
                  </label>
                  <input
                    id="room-note-input"
                    type="text"
                    value={draftNote}
                    onChange={(e) => setDraftNote(e.target.value)}
                    placeholder="Add action item..."
                    className="flex-1 min-w-0 px-3.5 py-2.5 rounded-full bg-white/8 text-[13.5px] text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-[#6153CC]"
                  />
                  <button
                    type="submit"
                    aria-label="Add note"
                    className="w-10 h-10 rounded-full bg-[#6153CC] hover:bg-[#4F41B8] flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </aside>
        )}
      </div>

      {/* Responsive Bottom Control Dock */}
      <footer className="min-h-[76px] px-2.5 sm:px-6 py-2 border-t border-white/10 bg-[#191C26] flex items-center justify-between gap-2 shrink-0 relative">
        <div className="hidden xl:flex items-center gap-2 text-[13px] text-white/60">
          <span>{preferences.spatialAudio ? 'Spatial Audio 48 kHz' : 'Standard Audio'}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">{roomTiles.length} connected</span>
        </div>

        {/* Core Controls — Fits cleanly on mobile & desktop */}
        <div className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2.5 mx-auto xl:mx-0">
          <button
            type="button"
            onClick={() => setMicOn((prev) => !prev)}
            aria-label={micOn ? 'Mute microphone' : 'Unmute microphone'}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              micOn ? 'bg-white/10 hover:bg-white/18' : 'bg-rose-600 hover:bg-rose-700'
            }`}
          >
            {micOn ? <Mic className="w-[18px] h-[18px]" /> : <MicOff className="w-[18px] h-[18px]" />}
          </button>

          <button
            type="button"
            onClick={() => setCamOn((prev) => !prev)}
            aria-label={camOn ? 'Turn off camera' : 'Turn on camera'}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              camOn ? 'bg-white/10 hover:bg-white/18' : 'bg-rose-600 hover:bg-rose-700'
            }`}
          >
            {camOn ? (
              <Video className="w-[18px] h-[18px]" />
            ) : (
              <VideoOff className="w-[18px] h-[18px]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setScreenSharing((prev) => !prev)}
            aria-label={screenSharing ? 'Stop screen share' : 'Share screen'}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              screenSharing ? 'bg-[#6153CC] text-white' : 'bg-white/10 hover:bg-white/18'
            }`}
          >
            <MonitorUp className="w-[18px] h-[18px]" />
          </button>

          <button
            type="button"
            onClick={() => setCaptionsOn((prev) => !prev)}
            aria-label={captionsOn ? 'Hide live captions' : 'Show live captions'}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              captionsOn ? 'bg-[#6153CC] text-white' : 'bg-white/10 hover:bg-white/18'
            }`}
          >
            <Subtitles className="w-[18px] h-[18px]" />
          </button>

          <button
            type="button"
            onClick={handleToggleRecording}
            aria-label={isRecording ? 'Stop cloud recording' : 'Start cloud recording'}
            title={isRecording ? 'Stop & save cloud recording' : 'Record to Workspace'}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              isRecording ? 'bg-rose-600/90 text-white' : 'bg-white/10 hover:bg-white/18'
            }`}
          >
            <Circle
              className={`w-4 h-4 ${isRecording ? 'fill-white text-white' : 'text-rose-400 fill-rose-400'}`}
            />
          </button>

          {/* Reactions Popover */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setReactionMenuOpen((prev) => !prev)}
              aria-label="Send reaction"
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                reactionMenuOpen ? 'bg-[#6153CC]' : 'bg-white/10 hover:bg-white/18'
              }`}
            >
              <Smile className="w-[18px] h-[18px]" />
            </button>
            {reactionMenuOpen && (
              <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-1 p-1.5 rounded-full bg-[#242838] border border-white/15 shadow-2xl z-40">
                {REACTION_CHOICES.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => spawnReaction(r.value)}
                    className="px-2.5 sm:px-3 py-1.5 rounded-full hover:bg-white/12 text-[12.5px] font-medium whitespace-nowrap transition-colors cursor-pointer"
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setHandRaised((prev) => !prev)}
            aria-label={handRaised ? 'Lower hand' : 'Raise hand'}
            className={`hidden sm:flex w-11 h-11 rounded-full items-center justify-center transition-colors cursor-pointer ${
              handRaised ? 'bg-amber-400 text-[#1F2128]' : 'bg-white/10 hover:bg-white/18'
            }`}
          >
            <Hand className="w-[18px] h-[18px]" />
          </button>

          <button
            type="button"
            onClick={() => setSidePanel((p) => (p === 'chat' ? 'none' : 'chat'))}
            aria-label="Toggle room chat"
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              sidePanel === 'chat' ? 'bg-[#6153CC]' : 'bg-white/10 hover:bg-white/18'
            }`}
          >
            <MessageSquare className="w-[18px] h-[18px]" />
          </button>

          <button
            type="button"
            onClick={() => setSidePanel((p) => (p === 'notes' ? 'none' : 'notes'))}
            aria-label="Toggle shared notes"
            className={`hidden sm:flex w-11 h-11 rounded-full items-center justify-center transition-colors cursor-pointer ${
              sidePanel === 'notes' ? 'bg-[#6153CC]' : 'bg-white/10 hover:bg-white/18'
            }`}
          >
            <FileText className="w-[18px] h-[18px]" />
          </button>

          <button
            type="button"
            onClick={() =>
              setSidePanel((p) => (p === 'participants' ? 'none' : 'participants'))
            }
            aria-label="Toggle participants list"
            className={`hidden md:flex w-11 h-11 rounded-full items-center justify-center transition-colors cursor-pointer ${
              sidePanel === 'participants' ? 'bg-[#6153CC]' : 'bg-white/10 hover:bg-white/18'
            }`}
          >
            <Users className="w-[18px] h-[18px]" />
          </button>

          <button
            type="button"
            onClick={() => navigate(user ? '/dashboard' : '/')}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 h-11 rounded-full bg-rose-600 hover:bg-rose-700 text-[13.5px] font-semibold transition-colors cursor-pointer"
          >
            <PhoneOff className="w-4 h-4" />
            <span className="hidden sm:inline">Leave</span>
          </button>
        </div>

        <div className="hidden xl:block w-[160px]" />
      </footer>
    </div>
  );
}
