import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  Copy,
  Download,
  Pause,
  Play,
  RotateCcw,
  Users,
  Video,
} from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';
import { DetailPageSkeleton } from '../components/PageSkeleton';
import { SafeImage } from '../components/SafeImage';

function parseDurationToSec(label: string): number {
  const parts = label.split(':').map((n) => parseInt(n, 10) || 0);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return 180;
}

function formatSec(totalSec: number): string {
  const mins = Math.floor(totalSec / 60)
    .toString()
    .padStart(2, '0');
  const secs = Math.floor(totalSec % 60)
    .toString()
    .padStart(2, '0');
  return `${mins}:${secs}`;
}

export function RecordingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { recordings } = useWorkspace();
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSec, setCurrentSec] = useState(0);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const recording = recordings.find((r) => r.id === id);

  useEffect(() => {
    setLoading(true);
    setIsPlaying(false);
    setCurrentSec(0);
    const t = window.setTimeout(() => setLoading(false), 240);
    return () => window.clearTimeout(t);
  }, [id]);

  useEffect(() => {
    if (!recording) return;
    const initial: Record<number, boolean> = {};
    recording.actionItems.forEach((item, idx) => {
      initial[idx] = item.done;
    });
    setCheckedItems(initial);
  }, [recording]);

  const totalSec = recording ? Math.max(60, parseDurationToSec(recording.duration)) : 180;

  useEffect(() => {
    if (!isPlaying) return;
    const interval = window.setInterval(() => {
      setCurrentSec((prev) => {
        if (prev + 1 >= totalSec) {
          setIsPlaying(false);
          return totalSec;
        }
        return prev + 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isPlaying, totalSec]);

  if (loading) {
    return <DetailPageSkeleton />;
  }

  if (!recording) {
    return (
      <div className="max-w-[740px] mx-auto px-5 sm:px-8 py-24 text-center space-y-4">
        <h1 className="font-display text-[30px] font-bold text-[#1F2128]">Recording not found</h1>
        <p className="text-[#6F7382]">This recording may have been archived or removed.</p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6153CC] text-white text-[14px] font-medium hover:bg-[#4F41B8]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Workspace</span>
        </Link>
      </div>
    );
  }

  const handleCopySummary = () => {
    const markdown = `# ${recording.title}\n\n${recording.summary}\n\n## Action Items\n${recording.actionItems
      .map((a) => `- [${a.done ? 'x' : ' '}] ${a.task} (${a.owner})`)
      .join('\n')}`;
    navigator.clipboard?.writeText(markdown).catch(() => {});
    setCopiedSummary(true);
    window.setTimeout(() => setCopiedSummary(false), 1800);
  };

  const handleDownloadNotes = () => {
    const content = [
      `# ${recording.title}`,
      `Recorded: ${recording.recordedAt} | Duration: ${recording.duration}`,
      '',
      '## Summary',
      recording.summary,
      '',
      '## Action Items',
      ...recording.actionItems.map(
        (item, idx) => `- [${checkedItems[idx] ? 'x' : ' '}] ${item.task} — ${item.owner} (Due ${item.due})`
      ),
      '',
      '## Transcript',
      ...recording.transcript.map((t) => `[${t.time}] ${t.speaker}: ${t.line}`),
    ].join('\n');

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${recording.code}-notes.md`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    window.setTimeout(() => setDownloaded(false), 1800);
  };

  // Find active transcript segment based on scrubber position
  const transcriptSeconds = recording.transcript.map((t) => parseDurationToSec(t.time));
  let activeTranscriptIdx = 0;
  transcriptSeconds.forEach((sec, idx) => {
    if (currentSec >= sec) activeTranscriptIdx = idx;
  });

  return (
    <div className="max-w-[1140px] mx-auto px-5 sm:px-8 py-10 sm:py-14 space-y-10">
      {/* Top Nav Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#6F7382] hover:text-[#6153CC] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Workspace</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E2E2EE] text-[13.5px] font-medium text-[#3E414E] hover:border-[#6153CC] hover:text-[#6153CC] transition-colors cursor-pointer"
          >
            {copiedSummary ? <Check className="w-4 h-4 text-[#6153CC]" /> : <Copy className="w-4 h-4" />}
            <span>{copiedSummary ? 'Copied Markdown' : 'Copy notes'}</span>
          </button>
          <button
            type="button"
            onClick={handleDownloadNotes}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#6153CC] text-white text-[13.5px] font-medium hover:bg-[#4F41B8] transition-colors cursor-pointer"
          >
            {downloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
            <span>{downloaded ? 'Downloaded .md' : 'Export notes'}</span>
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="space-y-2.5">
        <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#7D8190]">
          <span className="font-mono text-[#6153CC]">{recording.code}</span>
          <span aria-hidden="true">·</span>
          <span>{recording.recordedAt}</span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>{recording.participantsCount} participants</span>
          </span>
        </div>
        <h1 className="font-display text-[28px] sm:text-[38px] font-bold tracking-tight text-[#1F2128] leading-[1.15]">
          {recording.title}
        </h1>
      </header>

      {/* Main Split: Interactive Video Playback Stage + Synchronized Transcript */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        <div className="lg:col-span-7 space-y-6">
          {/* Playback Player */}
          <div className="rounded-[28px] overflow-hidden bg-[#171923] text-white border border-[#2A2D3D]">
            <div className="relative aspect-[16/10] bg-[#1F2231] flex items-center justify-center p-6">
              <div className="flex flex-col items-center text-center gap-4 max-w-[440px]">
                <div className="relative">
                  <SafeImage
                    src={recording.hostAvatar}
                    alt={recording.hostName}
                    className={`w-24 h-24 sm:w-28 sm:h-28 rounded-[28px] object-cover transition-transform duration-300 ${
                      isPlaying ? 'ring-4 ring-[#7A6CF0] scale-[1.03]' : ''
                    }`}
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-[12.5px] font-mono text-[#CFC7FE]">
                    {recording.transcript[activeTranscriptIdx]?.speaker ?? recording.hostName}
                  </p>
                  <p className="text-[14.5px] sm:text-[15.5px] leading-relaxed text-white/90">
                    &ldquo;
                    {recording.transcript[activeTranscriptIdx]?.line ?? recording.summary}
                    &rdquo;
                  </p>
                </div>
              </div>

              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/55 text-[12px] font-mono tabular-nums text-white/85">
                1080p Cloud Replay
              </span>
            </div>

            {/* Scrubber & Controls */}
            <div className="p-4 sm:p-5 bg-[#151720] space-y-3">
              <input
                type="range"
                min={0}
                max={totalSec}
                value={currentSec}
                aria-label="Seek recording timeline"
                onChange={(e) => setCurrentSec(Number(e.target.value))}
                className="w-full accent-[#7A6CF0] cursor-pointer"
              />
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsPlaying((p) => !p)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6153CC] hover:bg-[#4F41B8] text-[13.5px] font-medium cursor-pointer transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isPlaying ? 'Pause' : 'Play replay'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentSec(0);
                      setIsPlaying(false);
                    }}
                    aria-label="Restart playback"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/18 flex items-center justify-center cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                <span className="font-mono text-[13px] text-white/75 tabular-nums">
                  {formatSec(currentSec)} / {recording.duration}
                </span>
              </div>
            </div>
          </div>

          {/* Summary & Action Items */}
          <div className="rounded-[24px] border border-[#EBEBF3] bg-white p-6 space-y-5">
            <div className="space-y-2">
              <h2 className="font-display text-[18px] font-semibold text-[#1F2128]">
                Executive Summary
              </h2>
              <p className="text-[15px] leading-relaxed text-[#4C505E]">{recording.summary}</p>
            </div>

            <div className="pt-4 border-t border-[#F1F1F7] space-y-3">
              <h3 className="font-display text-[16px] font-semibold text-[#1F2128]">
                Action Items ({recording.actionItems.length})
              </h3>
              <div className="space-y-2.5">
                {recording.actionItems.map((item, idx) => {
                  const done = !!checkedItems[idx];
                  return (
                    <label
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAFAFD] border border-[#EFEFF6] cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={done}
                        onChange={() =>
                          setCheckedItems((prev) => ({ ...prev, [idx]: !done }))
                        }
                        className="w-4 h-4 mt-0.5 accent-[#6153CC]"
                      />
                      <div className="min-w-0">
                        <p
                          className={`text-[14.5px] ${
                            done ? 'line-through text-[#8B8F9E]' : 'text-[#1F2128]'
                          }`}
                        >
                          {item.task}
                        </p>
                        <p className="text-[12.5px] text-[#7D8190]">
                          {item.owner} · Due {item.due}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Clickable Timestamp Transcript */}
        <aside className="lg:col-span-5 rounded-[26px] border border-[#EBEBF3] bg-white p-6 space-y-4">
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#EFEFF6]">
            <h2 className="font-display text-[17px] font-semibold text-[#1F2128]">
              Interactive Transcript
            </h2>
            <span className="text-[12px] text-[#7D8190]">Click timestamp to jump</span>
          </div>

          <div className="space-y-2.5">
            {recording.transcript.map((entry, idx) => {
              const isActive = idx === activeTranscriptIdx;
              return (
                <button
                  key={`${entry.time}-${idx}`}
                  type="button"
                  onClick={() => {
                    setCurrentSec(parseDurationToSec(entry.time));
                    setIsPlaying(true);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-colors cursor-pointer space-y-1 ${
                    isActive
                      ? 'border-[#6153CC]/50 bg-[#F5F3FF]'
                      : 'border-transparent hover:bg-[#FAFAFD]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="font-semibold text-[#1F2128]">{entry.speaker}</span>
                    <span className="font-mono text-[#6153CC] tabular-nums">{entry.time}</span>
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-[#4C505E]">{entry.line}</p>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#EFEFF6]">
            <Link
              to={`/meeting/${recording.code}`}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#F4F2FF] text-[#4F41B8] text-[14px] font-semibold hover:bg-[#6153CC] hover:text-white transition-colors"
            >
              <Video className="w-4 h-4" />
              <span>Re-open follow-up room</span>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
