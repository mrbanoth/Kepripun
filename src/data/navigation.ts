export interface NavItem {
  label: string;
  to: string;
}

export interface FooterColumn {
  heading: string;
  links: { label: string; to: string }[];
}

export const BRAND_NAME = 'Kepripun';

export const PRIMARY_NAV_LINKS: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/features' },
  { label: 'Community', to: '/community' },
  { label: 'Pricing', to: '/pricing' },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: 'Product',
    links: [
      { label: 'Features Overview', to: '/features' },
      { label: 'Adaptive HD Video', to: '/features/adaptive-hd-video' },
      { label: 'End-to-End Encryption', to: '/features/zero-knowledge-encryption' },
      { label: 'Instant Browser Rooms', to: '/features/instant-browser-rooms' },
      { label: 'Plans & Pricing', to: '/pricing' },
    ],
  },
  {
    heading: 'Workspace',
    links: [
      { label: 'Start New Meeting', to: '/meeting/new' },
      { label: 'Join Demo Room', to: '/meeting/kpr-design-sync' },
      { label: 'Meetings Dashboard', to: '/dashboard' },
      { label: 'Recording Replay', to: '/dashboard/recording/rec-1' },
      { label: 'Workspace Settings', to: '/settings' },
    ],
  },
  {
    heading: 'Community',
    links: [
      { label: 'Community Hub', to: '/community' },
      { label: 'Remote Rituals Guide', to: '/community/async-first-rituals-that-cut-meeting-fatigue' },
      { label: 'Live Audio Workshop', to: '/community/spatial-audio-workshop-november' },
      { label: 'Design Critique Kit', to: '/community/design-critique-room-template' },
    ],
  },
];
