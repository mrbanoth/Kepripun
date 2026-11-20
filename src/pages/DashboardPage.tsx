import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowUpRight,
  Bookmark,
  CalendarPlus,
  Check,
  Copy,
  FileText,
  Loader2,
  Lock,
  LogOut,
  Search,
  Settings,
  Trash2,
  Video,
} from 'lucide-react';
import { COMMUNITY_POSTS } from '../data';
import { useWorkspace } from '../context/WorkspaceContext';
import { CardGridSkeleton } from '../components/PageSkeleton';
import { WorkspaceHealthInfographic } from '../components/WorkspaceHealthInfographic';
import { SafeImage } from '../components/SafeImage';

export function DashboardPage() {
  const { user, login, logout, meetings, recordings, addMeeting, deleteMeeting, bookmarkedPosts } =
    useWorkspace();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'upcoming' | 'recordings' | 'saved'>('upcoming');
  const [tabLoading, setTabLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecordingId, setSelectedRecordingId] = useState(recordings[0]?.id ?? '');
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  // Schedule form state
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('Tomorrow');
  const [newTime, setNewTime] = useState('11:00 – 11:30 AM');
  const [newDesc, setNewDesc] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [copiedPersonal, setCopiedPersonal] = useState(false);

  useEffect(() => {
    setTabLoading(true);
    const t = window.setTimeout(() => setTabLoading(false), 180);
    return () => window.clearTimeout(t);
  }, [activeTab]);

  useEffect(() => {
    if (!recordings.some((r) => r.id === selectedRecordingId) && recordings[0]) {
      setSelectedRecordingId(recordings[0].id);
    }
  }, [recordings, selectedRecordingId]);

  const personalCode = user?.personalRoomCode ?? 'kpr-clara-room';

  const handleCopyPersonal = () => {
    navigator.clipboard
      ?.writeText(`${window.location.origin}/meeting/${personalCode}`)
      .catch(() => {});
    setCopiedPersonal(true);
    window.setTimeout(() => setCopiedPersonal(false), 1800);
  };

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setIsCreating(true);
    window.setTimeout(() => {
      addMeeting({
        title: newTitle,
        dateLabel: newDate,
        timeRange: newTime,
        durationMinutes: 30,
        encrypted: true,
        description: newDesc,
      });
      setNewTitle('');
      setNewDesc('');
      setIsCreating(false);
      setShowScheduleForm(false);
    }, 260);
  };

  const q = searchQuery.trim().toLowerCase();

  const filteredMeetings = useMemo(
    () =>
      meetings.filter(
        (m) =>
          !q ||
          m.title.toLowerCase().includes(q) ||
          m.code.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q)
      ),
    [meetings, q]
  );

  const filteredRecordings = useMemo(
    () =>
      recordings.filter(
        (r) =>
          !q ||
          r.title.toLowerCase().includes(q) ||
          r.summary.toLowerCase().includes(q) ||
          r.hostName.toLowerCase().includes(q)
      ),
    [recordings, q]
  );

  const selectedRecording =
    filteredRecordings.find((r) => r.id === selectedRecordingId) ?? filteredRecordings[0];

  const savedCommunityPosts = COMMUNITY_POSTS.filter((p) =>
    bookmarkedPosts.includes(p.slug)
  );

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-8 sm:space-y-10">
      {/* Workspace Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-7 border-b border-[#EFEFF6]">
        <div className="space-y-1.5">
          <p className="text-[13.5px] font-medium text-[#6153CC]">Meetings Workspace</p>
          <h1 className="font-display text-[28px] sm:text-[38px] font-bold tracking-tight text-[#1F2128]">
            {user ? `Welcome back, ${user.name.split(' ')[0]}` : 'Team Meetings Workspace'}
          </h1>
          <p className="text-[15px] text-[#6F7382]">
            Manage upcoming rooms, inspect captured recordings, and track team meeting hours.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={() => setShowScheduleForm((prev) => !prev)}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full border border-[#D8D8E6] text-[#1F2128] text-[13.5px] sm:text-[14px] font-medium hover:border-[#6153CC] hover:text-[#6153CC] transition-colors cursor-pointer"
          >
            <CalendarPlus className="w-4 h-4" />
            <span>Schedule room</span>
          </button>
          <Link
            to="/meeting/new"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#6153CC] text-white text-[13.5px] sm:text-[14px] font-medium hover:bg-[#4F41B8] transition-colors"
          >
            <Video className="w-4 h-4" />
            <span>Instant room</span>
          </Link>
          <Link
            to="/settings"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#EBEBF3] text-[#4C505E] text-[13.5px] font-medium hover:border-[#6153CC] hover:text-[#6153CC] transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>
          {user ? (
            <button
              type="button"
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-[13.5px] text-[#6F7382] hover:bg-[#F5F5FA] hover:text-[#1F2128] transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => login('clara@kepripun.app')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#F4F2FF] text-[#4F41B8] text-[13.5px] font-medium hover:bg-[#E7E3FF] transition-colors cursor-pointer"
            >
              <span>Demo Sign-In</span>
            </button>
          )}
        </div>
      </div>

      {/* Personal Permanent Room Strip */}
      <div className="rounded-[24px] border border-[#E5E2F8] bg-[#F7F6FF] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1 min-w-0">
          <p className="text-[13px] font-medium text-[#6153CC]">Personal permanent room</p>
          <p className="font-mono text-[14px] sm:text-[14.5px] text-[#1F2128] break-all">
            kepripun.app/meeting/{personalCode}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleCopyPersonal}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-[#DCD8F6] text-[13.5px] font-medium text-[#3E414E] hover:border-[#6153CC] hover:text-[#6153CC] cursor-pointer"
          >
            {copiedPersonal ? (
              <Check className="w-4 h-4 text-[#6153CC]" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span>{copiedPersonal ? 'Copied link' : 'Copy invite'}</span>
          </button>
          <Link
            to={`/meeting/${personalCode}`}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#6153CC] text-white text-[13.5px] font-medium hover:bg-[#4F41B8]"
          >
            <span>Open room</span>
          </Link>
        </div>
      </div>

      {/* Inline Schedule Form */}
      {showScheduleForm && (
        <form
          onSubmit={handleCreateSchedule}
          className="rounded-[26px] border border-[#E2DDFB] bg-white p-5 sm:p-7 space-y-5 shadow-[0_10px_30px_rgba(97,83,204,0.06)]"
        >
          <h2 className="font-display text-[19px] font-semibold text-[#1F2128]">
            Schedule a new Kepripun room
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="sched-title" className="text-[13px] font-medium text-[#3E414E]">
                Meeting title
              </label>
              <input
                id="sched-title"
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Sprint Planning"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E2E2EE] text-[14px] focus:outline-none focus:border-[#6153CC]"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="sched-date" className="text-[13px] font-medium text-[#3E414E]">
                Date
              </label>
              <input
                id="sched-date"
                type="text"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E2E2EE] text-[14px] focus:outline-none focus:border-[#6153CC]"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="sched-time" className="text-[13px] font-medium text-[#3E414E]">
                Time slot
              </label>
              <input
                id="sched-time"
                type="text"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E2E2EE] text-[14px] focus:outline-none focus:border-[#6153CC]"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="sched-desc" className="text-[13px] font-medium text-[#3E414E]">
              Agenda note (optional)
            </label>
            <input
              id="sched-desc"
              type="text"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Brief goal for the meeting"
              className="w-full px-4 py-2.5 rounded-xl border border-[#E2E2EE] text-[14px] focus:outline-none focus:border-[#6153CC]"
            />
          </div>
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowScheduleForm(false)}
              className="px-4 py-2 rounded-full text-[13.5px] font-medium text-[#6F7382] hover:bg-[#F5F5FA] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6153CC] text-white text-[13.5px] font-medium hover:bg-[#4F41B8] disabled:opacity-70 cursor-pointer"
            >
              {isCreating && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{isCreating ? 'Scheduling...' : 'Create meeting'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Weekly Meeting Focus Infographic */}
      <WorkspaceHealthInfographic roomsCount={meetings.length} />

      {/* Workspace Tabs + Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EFEFF6] pb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            type="button"
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 rounded-full text-[13.5px] font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeTab === 'upcoming'
                ? 'bg-[#6153CC] text-white'
                : 'bg-[#F5F5FA] text-[#565A69] hover:text-[#1F2128]'
            }`}
          >
            Upcoming Rooms ({meetings.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('recordings')}
            className={`px-4 py-2 rounded-full text-[13.5px] font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeTab === 'recordings'
                ? 'bg-[#6153CC] text-white'
                : 'bg-[#F5F5FA] text-[#565A69] hover:text-[#1F2128]'
            }`}
          >
            Recordings ({recordings.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-full text-[13.5px] font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-[#6153CC] text-white'
                : 'bg-[#F5F5FA] text-[#565A69] hover:text-[#1F2128]'
            }`}
          >
            Saved Playbooks ({savedCommunityPosts.length})
          </button>
        </div>

        <div className="relative w-full md:w-[270px]">
          <Search className="w-4 h-4 text-[#8B8F9E] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <label htmlFor="workspace-search" className="sr-only">
            Filter meetings and recordings
          </label>
          <input
            id="workspace-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter rooms or notes..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#E5E5F0] bg-white text-[13.5px] focus:outline-none focus:border-[#6153CC]"
          />
        </div>
      </div>

      {/* Tab Content with brief loading skeleton */}
      {tabLoading ? (
        <CardGridSkeleton count={3} />
      ) : (
        <>
          {activeTab === 'upcoming' && (
            <div className="space-y-4">
              {filteredMeetings.length === 0 ? (
                <div className="rounded-[24px] border border-[#EBEBF3] bg-[#FAFAFD] p-10 text-center space-y-2.5">
                  <p className="font-display text-[18px] font-semibold text-[#1F2128]">
                    No matching scheduled rooms
                  </p>
                  <p className="text-[14.5px] text-[#6F7382]">
                    Clear your filter or schedule a new room above.
                  </p>
                </div>
              ) : (
                filteredMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="rounded-[24px] border border-[#EBEBF3] bg-white p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5 hover:border-[#6153CC]/40 transition-colors"
                  >
                    <div className="space-y-2 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#6F7382]">
                        <span className="font-semibold text-[#6153CC]">{meeting.dateLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{meeting.timeRange}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-[12.5px]">{meeting.code}</span>
                        {meeting.encrypted && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="inline-flex items-center gap-1 text-[#4F41B8]">
                              <Lock className="w-3 h-3" />
                              <span>E2EE</span>
                            </span>
                          </>
                        )}
                      </div>

                      <h3 className="font-display text-[18.5px] sm:text-[19px] font-semibold text-[#1F2128]">
                        {meeting.title}
                      </h3>
                      <p className="text-[14px] text-[#6F7382] max-w-[620px]">
                        {meeting.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0">
                      <div className="flex -space-x-2">
                        {meeting.participantAvatars.slice(0, 4).map((avatar, idx) => (
                          <SafeImage
                            key={idx}
                            src={avatar}
                            alt="Attendee"
                            className="w-9 h-9 rounded-full object-cover border-2 border-white"
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/meeting/${meeting.code}`}
                          className="px-5 py-2.5 rounded-full bg-[#6153CC] text-white text-[13.5px] font-medium hover:bg-[#4F41B8] transition-colors whitespace-nowrap"
                        >
                          Join room
                        </Link>
                        <button
                          type="button"
                          onClick={() => deleteMeeting(meeting.id)}
                          aria-label={`Delete ${meeting.title}`}
                          className="w-10 h-10 rounded-full border border-[#EBEBF3] text-[#7D8190] hover:text-rose-600 hover:border-rose-200 flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'recordings' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-5 space-y-3">
                {filteredRecordings.map((rec) => {
                  const active = rec.id === selectedRecording?.id;
                  return (
                    <button
                      key={rec.id}
                      type="button"
                      onClick={() => setSelectedRecordingId(rec.id)}
                      className={`w-full text-left rounded-[22px] border p-5 space-y-2 transition-all cursor-pointer ${
                        active
                          ? 'border-[#6153CC] bg-[#F7F6FF]'
                          : 'border-[#EBEBF3] bg-white hover:border-[#6153CC]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[12.5px] text-[#7D8190]">
                        <span>{rec.recordedAt}</span>
                        <span className="font-mono tabular-nums">{rec.duration}</span>
                      </div>
                      <h3 className="font-display text-[17px] font-semibold text-[#1F2128]">
                        {rec.title}
                      </h3>
                      <p className="text-[13px] text-[#6F7382]">
                        Host: {rec.hostName} · {rec.participantsCount} participants
                      </p>
                    </button>
                  );
                })}
              </div>

              {selectedRecording && (
                <div className="lg:col-span-7 rounded-[26px] border border-[#EBEBF3] bg-white p-6 sm:p-8 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-[#EFEFF6]">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[13px] text-[#7D8190]">
                        <FileText className="w-4 h-4 text-[#6153CC]" />
                        <span>{selectedRecording.recordedAt}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">
                          {selectedRecording.duration}
                        </span>
                      </div>
                      <h2 className="font-display text-[21px] sm:text-[22px] font-bold text-[#1F2128]">
                        {selectedRecording.title}
                      </h2>
                    </div>

                    <Link
                      to={`/dashboard/recording/${selectedRecording.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#6153CC] text-white text-[13px] font-medium hover:bg-[#4F41B8] transition-colors whitespace-nowrap shrink-0 self-start"
                    >
                      <span>Open replay studio</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <p className="text-[15px] leading-relaxed text-[#4C505E]">
                    {selectedRecording.summary}
                  </p>

                  <div className="space-y-3">
                    <h3 className="font-display text-[16px] font-semibold text-[#1F2128]">
                      Action Items
                    </h3>
                    <div className="space-y-2.5">
                      {selectedRecording.actionItems.map((item, idx) => {
                        const key = `${selectedRecording.id}-${idx}`;
                        const checked = completedTasks[key] ?? item.done;
                        return (
                          <label
                            key={key}
                            className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAFAFD] border border-[#EFEFF6] cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() =>
                                setCompletedTasks((prev) => ({ ...prev, [key]: !checked }))
                              }
                              className="w-4 h-4 mt-0.5 accent-[#6153CC]"
                            />
                            <div className="min-w-0 flex-1">
                              <p
                                className={`text-[14.5px] ${
                                  checked ? 'line-through text-[#8B8F9E]' : 'text-[#1F2128]'
                                }`}
                              >
                                {item.task}
                              </p>
                              <p className="text-[12.5px] text-[#7D8190] mt-0.5">
                                {item.owner} · Due {item.due}
                              </p>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-display text-[16px] font-semibold text-[#1F2128]">
                      Transcript Preview
                    </h3>
                    <div className="space-y-3">
                      {selectedRecording.transcript.slice(0, 3).map((entry, idx) => (
                        <div key={idx} className="flex items-start gap-3.5 text-[14px]">
                          <span className="font-mono text-[12.5px] text-[#6153CC] tabular-nums pt-0.5 shrink-0">
                            {entry.time}
                          </span>
                          <p className="text-[#3E414E] leading-relaxed">
                            <strong className="font-semibold text-[#1F2128]">
                              {entry.speaker}:
                            </strong>{' '}
                            {entry.line}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'saved' && (
            <div>
              {savedCommunityPosts.length === 0 ? (
                <div className="rounded-[24px] border border-[#EBEBF3] bg-[#FAFAFD] p-12 text-center space-y-3">
                  <Bookmark className="w-6 h-6 text-[#6153CC] mx-auto" />
                  <p className="font-display text-[18px] font-semibold text-[#1F2128]">
                    No saved playbooks yet
                  </p>
                  <p className="text-[14.5px] text-[#6F7382]">
                    Bookmark guides and meeting templates in the Community Hub to keep them handy
                    here.
                  </p>
                  <Link
                    to="/community"
                    className="inline-block mt-2 px-5 py-2.5 rounded-full bg-[#6153CC] text-white text-[13.5px] font-medium hover:bg-[#4F41B8]"
                  >
                    Browse Community Hub
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {savedCommunityPosts.map((post) => (
                    <Link
                      key={post.slug}
                      to={`/community/${post.slug}`}
                      className="rounded-[22px] border border-[#EBEBF3] bg-white p-6 space-y-2 hover:border-[#6153CC]/50 transition-colors"
                    >
                      <p className="text-[12.5px] text-[#7D8190]">
                        <span className="text-[#6153CC] font-medium">{post.category}</span> ·{' '}
                        {post.readTime}
                      </p>
                      <h3 className="font-display text-[18px] font-semibold text-[#1F2128]">
                        {post.title}
                      </h3>
                      <p className="text-[14px] text-[#6F7382]">{post.excerpt}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
