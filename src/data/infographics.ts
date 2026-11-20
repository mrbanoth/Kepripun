export interface EdgeRegionNode {
  id: string;
  city: string;
  country: string;
  x: number; // SVG 0..720 coordinate
  y: number; // SVG 0..320 coordinate
  baseLatencyMs: number;
  activeRooms: number;
  codec: string;
  tileBg: string;
}

export interface NetworkProfile {
  id: 'fiber' | 'wifi' | 'lte' | 'flight';
  label: string;
  bandwidthLabel: string;
  kbps: number;
  kepripunResolution: string;
  kepripunAudio: string;
  kepripunLatencyDelta: number;
  kepripunPacketRecovery: string;
  kepripunScore: number; // 0..100 visual bar
  legacyResolution: string;
  legacyStatus: string;
  legacyScore: number; // 0..100 visual bar
}

export interface WeeklyMeetingMetric {
  day: string;
  liveHours: number;
  asyncSavedHours: number;
  roomsHosted: number;
}

export interface LiveCaptionLine {
  speakerId: string;
  speakerName: string;
  text: string;
}

export const EDGE_REGION_NODES: EdgeRegionNode[] = [
  {
    id: 'us-west',
    city: 'San Francisco',
    country: 'US',
    x: 112,
    y: 146,
    baseLatencyMs: 24,
    activeRooms: 418,
    codec: 'AV1 4K',
    tileBg: '#FAD4B4',
  },
  {
    id: 'ca-east',
    city: 'Toronto',
    country: 'CA',
    x: 204,
    y: 124,
    baseLatencyMs: 29,
    activeRooms: 312,
    codec: 'AV1 4K',
    tileBg: '#A7D8F5',
  },
  {
    id: 'eu-west',
    city: 'London',
    country: 'UK',
    x: 344,
    y: 108,
    baseLatencyMs: 31,
    activeRooms: 546,
    codec: 'AV1 4K',
    tileBg: '#D2B8F7',
  },
  {
    id: 'eu-north',
    city: 'Stockholm',
    country: 'SE',
    x: 406,
    y: 86,
    baseLatencyMs: 36,
    activeRooms: 264,
    codec: 'VP9 SVC',
    tileBg: '#D2B8F7',
  },
  {
    id: 'ap-south',
    city: 'Bengaluru',
    country: 'IN',
    x: 526,
    y: 184,
    baseLatencyMs: 42,
    activeRooms: 489,
    codec: 'AV1 HD',
    tileBg: '#FAD4B4',
  },
  {
    id: 'ap-east',
    city: 'Tokyo',
    country: 'JP',
    x: 626,
    y: 142,
    baseLatencyMs: 38,
    activeRooms: 374,
    codec: 'AV1 4K',
    tileBg: '#A7D8F5',
  },
];

export const NETWORK_PROFILES: NetworkProfile[] = [
  {
    id: 'fiber',
    label: 'Office Fiber',
    bandwidthLabel: '100+ Mbps',
    kbps: 4200,
    kepripunResolution: '4K · 60 fps',
    kepripunAudio: '48 kHz Spatial Opus',
    kepripunLatencyDelta: 0,
    kepripunPacketRecovery: '0.0% frame drop',
    kepripunScore: 99,
    legacyResolution: '1080p · 30 fps',
    legacyStatus: 'Stable',
    legacyScore: 84,
  },
  {
    id: 'wifi',
    label: 'Cafe Wi-Fi',
    bandwidthLabel: '12 Mbps shared',
    kbps: 1650,
    kepripunResolution: '1080p · 60 fps',
    kepripunAudio: '48 kHz Noise-Isolated',
    kepripunLatencyDelta: 7,
    kepripunPacketRecovery: '99.9% FEC recovery',
    kepripunScore: 94,
    legacyResolution: '720p · 24 fps',
    legacyStatus: 'Occasional jitter',
    legacyScore: 66,
  },
  {
    id: 'lte',
    label: 'Commuter 4G',
    bandwidthLabel: '1.8 Mbps variable',
    kbps: 640,
    kepripunResolution: '720p · 30 fps',
    kepripunAudio: '48 kHz Priority Lane',
    kepripunLatencyDelta: 15,
    kepripunPacketRecovery: '99.4% FEC recovery',
    kepripunScore: 88,
    legacyResolution: '360p · Freezing',
    legacyStatus: 'Audio roboting',
    legacyScore: 41,
  },
  {
    id: 'flight',
    label: 'Airport / Flight',
    bandwidthLabel: '220 kbps floor',
    kbps: 220,
    kepripunResolution: '360p · Smooth Voice',
    kepripunAudio: '32 kHz Crisp Voice Lock',
    kepripunLatencyDelta: 28,
    kepripunPacketRecovery: 'Zero audio dropouts',
    kepripunScore: 79,
    legacyResolution: 'Disconnected',
    legacyStatus: 'Reconnecting loop',
    legacyScore: 14,
  },
];

export const WEEKLY_MEETING_HEALTH: WeeklyMeetingMetric[] = [
  { day: 'Mon', liveHours: 2.4, asyncSavedHours: 1.8, roomsHosted: 5 },
  { day: 'Tue', liveHours: 3.1, asyncSavedHours: 2.2, roomsHosted: 6 },
  { day: 'Wed', liveHours: 1.6, asyncSavedHours: 2.7, roomsHosted: 3 },
  { day: 'Thu', liveHours: 2.8, asyncSavedHours: 1.9, roomsHosted: 5 },
  { day: 'Fri', liveHours: 1.2, asyncSavedHours: 2.5, roomsHosted: 2 },
];

export const LIVE_CAPTION_SCRIPT: LiveCaptionLine[] = [
  {
    speakerId: 'p-clara',
    speakerName: 'Clara Morales',
    text: 'Notice how fast the mobile pre-join lobby renders even when switching from Wi-Fi to 4G.',
  },
  {
    speakerId: 'p-daniel',
    speakerName: 'Daniel Brooks',
    text: 'Keeping the bottom toolbar single-row on 375px screens made one-handed mute and reactions effortless.',
  },
  {
    speakerId: 'p-maya',
    speakerName: 'Maya Okafor',
    text: 'Participants in our London research study specifically praised the subtle speaker ring and instant transcripts.',
  },
  {
    speakerId: 'p-sofia',
    speakerName: 'Sofia Novak',
    text: 'Our simulcast tile router also trims downstream memory usage by nearly sixty percent in gallery mode.',
  },
  {
    speakerId: 'p-alex',
    speakerName: 'Alex Lindqvist',
    text: 'All six global edge relays are holding steady under forty milliseconds median latency right now.',
  },
];
