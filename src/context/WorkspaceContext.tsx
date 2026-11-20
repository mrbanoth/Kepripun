import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  HERO_PARTICIPANTS,
  INITIAL_SCHEDULED_MEETINGS,
  MeetingRecording,
  PAST_RECORDINGS,
  ScheduledMeeting,
} from '../data';

export interface WorkspaceUser {
  name: string;
  email: string;
  role: string;
  avatar: string;
  personalRoomCode: string;
}

export interface WorkspacePreferences {
  defaultTileBg: string;
  spatialAudio: boolean;
  autoCaptions: boolean;
  defaultEncrypted: boolean;
  joinMuted: boolean;
}

interface WorkspaceContextValue {
  user: WorkspaceUser | null;
  preferences: WorkspacePreferences;
  meetings: ScheduledMeeting[];
  recordings: MeetingRecording[];
  rsvpedEvents: string[];
  bookmarkedPosts: string[];
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateProfile: (patch: Partial<WorkspaceUser>) => void;
  updatePreferences: (patch: Partial<WorkspacePreferences>) => void;
  addMeeting: (input: {
    title: string;
    dateLabel: string;
    timeRange: string;
    durationMinutes: number;
    encrypted: boolean;
    description: string;
  }) => ScheduledMeeting;
  deleteMeeting: (id: string) => void;
  addRecording: (recording: MeetingRecording) => void;
  toggleEventRsvp: (slug: string) => void;
  toggleBookmarkPost: (slug: string) => void;
}

const DEFAULT_DEMO_USER: WorkspaceUser = {
  name: 'Clara Morales',
  email: 'clara@kepripun.app',
  role: 'Head of Product',
  avatar: HERO_PARTICIPANTS[3].avatar,
  personalRoomCode: 'kpr-clara-room',
};

const DEFAULT_PREFERENCES: WorkspacePreferences = {
  defaultTileBg: '#FAD4B4',
  spatialAudio: true,
  autoCaptions: false,
  defaultEncrypted: true,
  joinMuted: false,
};

const STORAGE_KEYS = {
  USER: 'kepripun_user_v1',
  PREFS: 'kepripun_prefs_v1',
  MEETINGS: 'kepripun_meetings_v1',
  RECORDINGS: 'kepripun_recordings_v1',
  RSVPS: 'kepripun_rsvps_v1',
  BOOKMARKS: 'kepripun_bookmarks_v1',
};

const WorkspaceContext = createContext<WorkspaceContextValue | undefined>(undefined);

function slugifyCode(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 18);
  const rand = Math.random().toString(36).slice(2, 6);
  return `kpr-${base || 'room'}-${rand}`;
}

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<WorkspaceUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? (JSON.parse(saved) as WorkspaceUser) : null;
    } catch {
      return null;
    }
  });

  const [preferences, setPreferences] = useState<WorkspacePreferences>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PREFS);
      return saved ? { ...DEFAULT_PREFERENCES, ...JSON.parse(saved) } : DEFAULT_PREFERENCES;
    } catch {
      return DEFAULT_PREFERENCES;
    }
  });

  const [meetings, setMeetings] = useState<ScheduledMeeting[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MEETINGS);
      return saved ? (JSON.parse(saved) as ScheduledMeeting[]) : INITIAL_SCHEDULED_MEETINGS;
    } catch {
      return INITIAL_SCHEDULED_MEETINGS;
    }
  });

  const [recordings, setRecordings] = useState<MeetingRecording[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RECORDINGS);
      return saved ? (JSON.parse(saved) as MeetingRecording[]) : PAST_RECORDINGS;
    } catch {
      return PAST_RECORDINGS;
    }
  });

  const [rsvpedEvents, setRsvpedEvents] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RSVPS);
      return saved ? (JSON.parse(saved) as string[]) : [];
    } catch {
      return [];
    }
  });

  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return saved ? (JSON.parse(saved) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_KEYS.USER);
    } catch {
      // Ignore storage errors
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PREFS, JSON.stringify(preferences));
    } catch {
      // Ignore
    }
  }, [preferences]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MEETINGS, JSON.stringify(meetings));
    } catch {
      // Ignore
    }
  }, [meetings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RECORDINGS, JSON.stringify(recordings));
    } catch {
      // Ignore
    }
  }, [recordings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RSVPS, JSON.stringify(rsvpedEvents));
    } catch {
      // Ignore
    }
  }, [rsvpedEvents]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarkedPosts));
    } catch {
      // Ignore
    }
  }, [bookmarkedPosts]);

  const login = (email: string, name?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || cleanEmail === DEFAULT_DEMO_USER.email) {
      setUser({
        ...DEFAULT_DEMO_USER,
        name: name?.trim() || DEFAULT_DEMO_USER.name,
      });
      return;
    }
    const derivedName =
      name?.trim() ||
      cleanEmail
        .split('@')[0]
        .replace(/[._-]+/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

    setUser({
      name: derivedName,
      email: cleanEmail,
      role: 'Workspace Member',
      avatar: HERO_PARTICIPANTS[3].avatar,
      personalRoomCode: slugifyCode(derivedName),
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (patch: Partial<WorkspaceUser>) => {
    setUser((prev) => ({
      ...(prev ?? DEFAULT_DEMO_USER),
      ...patch,
    }));
  };

  const updatePreferences = (patch: Partial<WorkspacePreferences>) => {
    setPreferences((prev) => ({ ...prev, ...patch }));
  };

  const addMeeting: WorkspaceContextValue['addMeeting'] = (input) => {
    const created: ScheduledMeeting = {
      id: `mtg-${Date.now()}`,
      code: slugifyCode(input.title),
      title: input.title.trim() || 'Team Catch-Up',
      dateLabel: input.dateLabel,
      timeRange: input.timeRange,
      durationMinutes: input.durationMinutes,
      hostName: user?.name ?? 'You',
      participantsCount: 3,
      participantAvatars: [
        HERO_PARTICIPANTS[3].avatar,
        HERO_PARTICIPANTS[0].avatar,
        HERO_PARTICIPANTS[2].avatar,
      ],
      encrypted: input.encrypted,
      status: 'upcoming',
      description:
        input.description.trim() || 'Browser-based Kepripun room with end-to-end encryption.',
    };
    setMeetings((prev) => [created, ...prev]);
    return created;
  };

  const deleteMeeting = (id: string) => {
    setMeetings((prev) => prev.filter((item) => item.id !== id));
  };

  const addRecording = (recording: MeetingRecording) => {
    setRecordings((prev) => [recording, ...prev]);
  };

  const toggleEventRsvp = (slug: string) => {
    setRsvpedEvents((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const toggleBookmarkPost = (slug: string) => {
    setBookmarkedPosts((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  return (
    <WorkspaceContext.Provider
      value={{
        user,
        preferences,
        meetings,
        recordings,
        rsvpedEvents,
        bookmarkedPosts,
        login,
        logout,
        updateProfile,
        updatePreferences,
        addMeeting,
        deleteMeeting,
        addRecording,
        toggleEventRsvp,
        toggleBookmarkPost,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) {
    throw new Error('useWorkspace must be used inside WorkspaceProvider');
  }
  return ctx;
}
