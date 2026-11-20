export interface ScheduledMeeting {
  id: string;
  code: string;
  title: string;
  dateLabel: string;
  timeRange: string;
  durationMinutes: number;
  hostName: string;
  participantsCount: number;
  participantAvatars: string[];
  encrypted: boolean;
  status: 'live' | 'upcoming' | 'completed';
  description: string;
}

export interface MeetingRecording {
  id: string;
  code: string;
  title: string;
  recordedAt: string;
  duration: string;
  hostName: string;
  hostAvatar: string;
  participantsCount: number;
  summary: string;
  actionItems: { owner: string; task: string; due: string; done: boolean }[];
  transcript: { time: string; speaker: string; line: string }[];
}

export const INITIAL_SCHEDULED_MEETINGS: ScheduledMeeting[] = [
  {
    id: 'mtg-1',
    code: 'kpr-design-sync',
    title: 'Weekly Product & Design Sync',
    dateLabel: 'Today',
    timeRange: '10:00 – 10:30 AM',
    durationMinutes: 30,
    hostName: 'Clara Morales',
    participantsCount: 7,
    participantAvatars: [
      '/src/assets/images/portrait_clara_center_1795096845640.jpg',
      '/src/assets/images/portrait_daniel_peach_1795096862531.jpg',
      '/src/assets/images/portrait_maya_sky_1795096853789.jpg',
      '/src/assets/images/portrait_sofia_lavender_1795096852887.jpg',
    ],
    encrypted: true,
    status: 'live',
    description: 'Walkthrough of Q4 mobile pre-join lobby polish and spatial audio feedback.',
  },
  {
    id: 'mtg-2',
    code: 'kpr-security-review',
    title: 'MLS Key Rotation Architecture Review',
    dateLabel: 'Today',
    timeRange: '2:00 – 2:45 PM',
    durationMinutes: 45,
    hostName: 'Arjun Patel',
    participantsCount: 5,
    participantAvatars: [
      '/src/assets/images/portrait_arjun_lavender_1795096853760.jpg',
      '/src/assets/images/portrait_alex_lavender_1795096848920.jpg',
      '/src/assets/images/portrait_lucas_sky_1795096854318.jpg',
    ],
    encrypted: true,
    status: 'upcoming',
    description: 'Reviewing regional edge latency numbers and SOC 2 evidence collection.',
  },
  {
    id: 'mtg-3',
    code: 'kpr-customer-pilot',
    title: 'NordicGrid Enterprise Pilot Kickoff',
    dateLabel: 'Tomorrow',
    timeRange: '9:30 – 10:00 AM',
    durationMinutes: 30,
    hostName: 'Lucas Weber',
    participantsCount: 6,
    participantAvatars: [
      '/src/assets/images/portrait_lucas_sky_1795096854318.jpg',
      '/src/assets/images/portrait_clara_center_1795096845640.jpg',
      '/src/assets/images/portrait_maya_sky_1795096853789.jpg',
    ],
    encrypted: true,
    status: 'upcoming',
    description: 'Onboarding 120 engineers with custom SSO and EU media residency settings.',
  },
  {
    id: 'mtg-4',
    code: 'kpr-community-townhall',
    title: 'Community Townhall: Human-First Video',
    dateLabel: 'Nov 26, 2026',
    timeRange: '11:00 – 11:45 AM',
    durationMinutes: 45,
    hostName: 'Alex Lindqvist',
    participantsCount: 184,
    participantAvatars: [
      '/src/assets/images/portrait_alex_lavender_1795096848920.jpg',
      '/src/assets/images/portrait_sofia_lavender_1795096852887.jpg',
      '/src/assets/images/portrait_daniel_peach_1795096862531.jpg',
    ],
    encrypted: false,
    status: 'upcoming',
    description: 'Open community live demo with spatial audio A/B testing and roadmap Q&A.',
  },
];

export const PAST_RECORDINGS: MeetingRecording[] = [
  {
    id: 'rec-1',
    code: 'kpr-q4-roadmap',
    title: 'Q4 Mobile Experience & Latency Targets',
    recordedAt: 'Nov 17, 2026 · 3:00 PM',
    duration: '28:14',
    hostName: 'Clara Morales',
    hostAvatar: '/src/assets/images/portrait_clara_center_1795096845640.jpg',
    participantsCount: 6,
    summary:
      'Aligned on shipping the sub-2-second mobile browser green room by December 4. Agreed to default new workspaces to 25-minute calendar slots and enable floating reactions by default.',
    actionItems: [
      { owner: 'Daniel Brooks', task: 'Finalize responsive mobile toolbar spacing tokens', due: 'Nov 21', done: true },
      { owner: 'Sofia Novak', task: 'Benchmark Safari 18 WebCodecs battery consumption', due: 'Nov 23', done: false },
      { owner: 'Arjun Patel', task: 'Publish updated security whitepaper appendix', due: 'Nov 25', done: false },
    ],
    transcript: [
      { time: '00:42', speaker: 'Clara Morales', line: 'Let us start with mobile join times — our median dropped to 1.8 seconds on 4G this week.' },
      { time: '04:18', speaker: 'Daniel Brooks', line: 'Keeping the pre-join screen to just camera preview, mic toggle, and a single Join button cut drop-offs in half.' },
      { time: '11:05', speaker: 'Sofia Novak', line: 'I tested across iOS Safari and Pixel Chrome; switching between gallery and speaker focus stays locked at 60fps.' },
      { time: '19:30', speaker: 'Arjun Patel', line: 'All signaling handshakes remain end-to-end encrypted with zero noticeable extra round-trip.' },
    ],
  },
  {
    id: 'rec-2',
    code: 'kpr-research-synthesis',
    title: 'Remote Teams Research Synthesis — Cohort 14',
    recordedAt: 'Nov 12, 2026 · 1:15 PM',
    duration: '34:40',
    hostName: 'Maya Okafor',
    hostAvatar: '/src/assets/images/portrait_maya_sky_1795096853789.jpg',
    participantsCount: 5,
    summary:
      'Reviewed interviews with 18 engineering and design managers. Top requested improvement was instant copy-link feedback and clearer visual cues when a teammate is muted.',
    actionItems: [
      { owner: 'Maya Okafor', task: 'Share full cohort summary deck in Community Guides', due: 'Nov 14', done: true },
      { owner: 'Lucas Weber', task: 'Follow up with three pilot teams on custom domain routing', due: 'Nov 22', done: false },
    ],
    transcript: [
      { time: '01:15', speaker: 'Maya Okafor', line: 'Almost every team mentioned that non-verbal reactions reduce awkward silence during remote demos.' },
      { time: '09:50', speaker: 'Lucas Weber', line: 'Enterprise buyers also love that guests never have to download an executable before a sales call.' },
      { time: '22:10', speaker: 'Alex Lindqvist', line: 'We can ship the subtle mute indicator badge in the next weekly release without adding toolbar clutter.' },
    ],
  },
];

export const ROOM_PRESETS = [
  { label: 'Quick Standup', code: 'kpr-daily-standup', duration: '15 min' },
  { label: 'Design Critique', code: 'kpr-design-critique', duration: '30 min' },
  { label: 'Client Demo', code: 'kpr-client-demo', duration: '45 min' },
];
