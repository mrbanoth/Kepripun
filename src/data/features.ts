export type FeatureCategory = 'Video & Audio' | 'Security' | 'Collaboration' | 'Integrations';

export interface FeatureMetric {
  value: string;
  label: string;
  context: string;
}

export interface FeatureItem {
  slug: string;
  number: string;
  title: string;
  category: FeatureCategory;
  shortDescription: string;
  fullSummary: string;
  accentBg: string;
  iconName: 'video' | 'shield' | 'sparkles' | 'globe' | 'mic' | 'calendar';
  featuredSpan?: 'wide' | 'normal';
  metrics: FeatureMetric[];
  capabilities: {
    heading: string;
    detail: string;
  }[];
  specs: { label: string; value: string }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
    avatar: string;
  };
}

export const FEATURE_CATEGORIES: ('All' | FeatureCategory)[] = [
  'All',
  'Video & Audio',
  'Security',
  'Collaboration',
  'Integrations',
];

export const FEATURES_DATA: FeatureItem[] = [
  {
    slug: 'adaptive-hd-video',
    number: '01',
    title: 'Adaptive 4K & Low-Bandwidth Video',
    category: 'Video & Audio',
    shortDescription:
      'Smooth 60fps video that automatically prioritizes voice clarity and smooth motion even on spotty airport Wi-Fi or cellular tethering.',
    fullSummary:
      'Kepripun dynamically scales simulcast video layers per participant every 250 milliseconds. Instead of freezing entire frames when a teammate walks through a dead zone, our media router gracefully adapts resolution while locking audio packets on a dedicated low-jitter lane.',
    accentBg: '#F4F2FF',
    iconName: 'video',
    featuredSpan: 'wide',
    metrics: [
      { value: '38 ms', label: 'Median Global Latency', context: 'Measured across 28 edge PoPs' },
      { value: '99.98%', label: 'Call Completion Rate', context: 'Over 14M monthly room minutes' },
      { value: '180 kbps', label: 'Minimum Stable Stream', context: 'Voice + 360p continuity floor' },
    ],
    capabilities: [
      {
        heading: 'Per-Tile Simulcast Routing',
        detail: 'Only sends high-resolution pixels to tiles actually expanded on screen, saving up to 62% downstream bandwidth in large team standups.',
      },
      {
        heading: 'Hardware-Accelerated WebCodecs',
        detail: 'Uses modern browser AV1 and VP9 decoding so laptops stay quiet and cool during back-to-back design reviews.',
      },
      {
        heading: 'Automatic Packet Loss Recovery',
        detail: 'Forward error correction rebuilds dropped frames on congested hotel and flight networks without awkward robotic stutters.',
      },
    ],
    specs: [
      { label: 'Max Resolution', value: '3840 × 2160 at 60 fps' },
      { label: 'Video Codecs', value: 'AV1, VP9, H.264 SVC' },
      { label: 'Edge Relays', value: '28 Global Media Regions' },
      { label: 'Participant Cap', value: 'Up to 250 interactive seats' },
    ],
    testimonial: {
      quote:
        'Before switching to Kepripun, weekly reviews with our Manila and Zurich engineering pods froze twice every call. Over the past four months we have logged zero dropped design demos.',
      author: 'Hannah Lindholm',
      role: 'VP of Engineering',
      company: 'NordicGrid Systems',
      avatar: '/src/assets/images/portrait_sofia_lavender_1795096852887.jpg',
    },
  },
  {
    slug: 'zero-knowledge-encryption',
    number: '02',
    title: 'End-to-End Encrypted Rooms',
    category: 'Security',
    shortDescription:
      'True per-session client-side encryption with verifiable room fingerprints, one-click room locking, and zero server-side media decryption.',
    fullSummary:
      'Every sensitive board review, legal consultation, and architecture debate stays strictly between invited participants. Encryption keys negotiate directly inside participant browsers using Messaging Layer Security (MLS) and rotate whenever anyone joins or exits.',
    accentBg: '#FFF4EB',
    iconName: 'shield',
    featuredSpan: 'normal',
    metrics: [
      { value: '256-bit', label: 'AES-GCM Media Cipher', context: 'Client-side frame encryption' },
      { value: '0 bytes', label: 'Plaintext Media Stored', context: 'Zero-knowledge relay architecture' },
      { value: '< 120 ms', label: 'Key Rotation Time', context: 'On every join or leave event' },
    ],
    capabilities: [
      {
        heading: 'One-Click Room Lock & Knocking',
        detail: 'Lock active rooms straight from the toolbar so unexpected guests wait politely in the encrypted lobby until admitted by the host.',
      },
      {
        heading: 'Visual Security Fingerprints',
        detail: 'Verify end-to-end session integrity with human-readable verification codes shared across all connected clients.',
      },
      {
        heading: 'SOC 2 Type II & Regional Data Residency',
        detail: 'Pin signaling and optional cloud recordings strictly to EU, US, or APAC data centers to match enterprise compliance rules.',
      },
    ],
    specs: [
      { label: 'Key Exchange', value: 'MLS (RFC 9420) + DTLS-SRTP' },
      { label: 'Compliance', value: 'SOC 2 Type II, ISO 27001, GDPR' },
      { label: 'SSO Support', value: 'SAML 2.0, OIDC, Google & Okta' },
      { label: 'Audit Logs', value: 'Real-time SIEM webhook export' },
    ],
    testimonial: {
      quote:
        'Our clinical research partners needed browser-based calls without installing desktop binaries or exposing transcripts. Kepripun cleared our security audit in eleven days.',
      author: 'Dr. Kenji Takahashi',
      role: 'Chief Information Security Officer',
      company: 'Veridian BioLabs',
      avatar: '/src/assets/images/portrait_arjun_lavender_1795096853760.jpg',
    },
  },
  {
    slug: 'instant-browser-rooms',
    number: '03',
    title: 'Instant Browser Join — Zero Downloads',
    category: 'Collaboration',
    shortDescription:
      'Paste a link, check your camera in the green room, and enter in under two seconds. Guests never hit install prompts or account walls.',
    fullSummary:
      'External clients, interview candidates, and freelance collaborators shouldn’t spend the first five minutes of a call hunting for a desktop updater. Kepripun loads as a featherweight web experience across Chrome, Safari, Edge, Firefox, and mobile browsers.',
    accentBg: '#EDF8FF',
    iconName: 'globe',
    featuredSpan: 'normal',
    metrics: [
      { value: '1.8 sec', label: 'Average Time to Join', context: 'From link click to live audio' },
      { value: '-42%', label: 'Late-Start Friction', context: 'Across external client calls' },
      { value: '0 MB', label: 'Required Local Install', context: '100% WebRTC native runtime' },
    ],
    capabilities: [
      {
        heading: 'Memorable Custom Room URLs',
        detail: 'Reserve permanent team links like kepripun.app/meeting/design-critique so everyone knows where to meet without digging through calendar invites.',
      },
      {
        heading: 'Smart Pre-Join Green Room',
        detail: 'Preview framing, test microphone levels, pick a subtle studio backdrop tint, and join muted with one click.',
      },
      {
        heading: 'Cross-Device Seamless Handoff',
        detail: 'Transfer an ongoing desktop call to your phone with a single QR scan when you need to step out the door.',
      },
    ],
    specs: [
      { label: 'Browser Support', value: 'Chrome, Safari, Firefox, Edge' },
      { label: 'Mobile Web', value: 'iOS Safari 16+ & Android Chrome' },
      { label: 'Guest Access', value: 'No account required by default' },
      { label: 'Bundle Weight', value: '310 KB gzipped core client' },
    ],
    testimonial: {
      quote:
        'Every candidate interview used to start with three minutes of desktop permission troubleshooting. Now guests click our Kepripun link and start talking right on the minute.',
      author: 'Rachel Mensah',
      role: 'Head of Talent',
      company: 'Latticework Studio',
      avatar: '/src/assets/images/portrait_maya_sky_1795096853789.jpg',
    },
  },
  {
    slug: 'expressive-reactions-spatial-audio',
    number: '04',
    title: 'Spatial Studio Audio & Expressive Reactions',
    category: 'Video & Audio',
    shortDescription:
      'Natural studio-grade voice isolation paired with lightweight visual reactions so teammates can cheer, agree, or laugh without talking over speakers.',
    fullSummary:
      'Remote conversations feel exhausting when everyone stays silent to avoid interrupting. Kepripun pairs directional spatial voice separation with non-intrusive floating reactions like LOL, Wow, and Raise Hand so rooms feel alive and human.',
    accentBg: '#F4F2FF',
    iconName: 'mic',
    featuredSpan: 'wide',
    metrics: [
      { value: '48 kHz', label: 'Full-Band Opus Voice', context: 'Studio-grade speech fidelity' },
      { value: '-32 dB', label: 'Background Noise Floor', context: 'Coffee shops, sirens & keyboards' },
      { value: '3.4×', label: 'Higher Non-Verbal Engagement', context: 'Compared to audio-only calls' },
    ],
    capabilities: [
      {
        heading: 'Real-Time Acoustic Echo & Keyboard Suppression',
        detail: 'Runs locally inside browser WebAssembly to remove mechanical typing, espresso machines, and room echo without muffling natural vocal warmth.',
      },
      {
        heading: 'Floating Reactions & Ordered Hand Queue',
        detail: 'Send quick LOL or Wow badges that float briefly without hijacking screen layouts, while raised hands form a clear numbered speaking queue.',
      },
      {
        heading: 'Automatic Gain Balancing',
        detail: 'Soft-spoken remote voices and loud conference room microphones are gently normalized so nobody reaches for their volume keys.',
      },
    ],
    specs: [
      { label: 'Audio Codec', value: 'Opus 48 kHz Stereo Spatial' },
      { label: 'Noise Filter', value: 'Local WASM RNNoise v3' },
      { label: 'Reaction Latency', value: '< 60 ms peer broadcast' },
      { label: 'Captions', value: 'Live multilingual closed captions' },
    ],
    testimonial: {
      quote:
        'Our weekly all-hands across 90 designers finally feels energetic again. People react live to work-in-progress demos without derailing the presenter’s rhythm.',
      author: 'Mateo Alvarez',
      role: 'Design Operations Lead',
      company: 'Kite & Compass',
      avatar: '/src/assets/images/portrait_daniel_peach_1795096862531.jpg',
    },
  },
  {
    slug: 'shared-notes-cloud-recordings',
    number: '05',
    title: 'Cloud Recordings, Timestamps & Action Items',
    category: 'Collaboration',
    shortDescription:
      'Capture crisp composite recordings with searchable transcripts, chapter markers, and structured follow-ups ready seconds after you hang up.',
    fullSummary:
      'Missing a call across time zones shouldn’t mean scrubbing through a 55-minute video file. Kepripun generates clean chapter highlights, speaker-attributed transcripts, and timestamped action checklists stored in your team workspace.',
    accentBg: '#FFF4EB',
    iconName: 'sparkles',
    featuredSpan: 'normal',
    metrics: [
      { value: '24 sec', label: 'Recording Publish Time', context: 'Ready right after call ends' },
      { value: '34', label: 'Transcript Languages', context: 'Speaker-labeled accuracy' },
      { value: '5.2 hrs', label: 'Weekly Time Reclaimed', context: 'Per distributed product manager' },
    ],
    capabilities: [
      {
        heading: 'One-Click Cloud Capture',
        detail: 'Record the active layout plus shared screens directly in the cloud without slowing down your local laptop CPU.',
      },
      {
        heading: 'Clickable Transcript Jump',
        detail: 'Search any keyword across past team meetings and jump directly to the exact video second where a decision was made.',
      },
      {
        heading: 'Action Item Ownership',
        detail: 'Convert timestamped notes into assigned next steps with due dates visible in your Meetings Dashboard.',
      },
    ],
    specs: [
      { label: 'Export Formats', value: 'MP4 (1080p), VTT, Markdown' },
      { label: 'Retention Control', value: 'Custom 30-day to unlimited policies' },
      { label: 'Access Control', value: 'Workspace-only or expiring share links' },
      { label: 'Search Indexing', value: 'Instant full-text across all rooms' },
    ],
    testimonial: {
      quote:
        'Our APAC engineers wake up to five-minute highlight reels and exact action items instead of staying up past midnight for San Francisco standups.',
      author: 'Claire Dubois',
      role: 'Director of Product',
      company: 'Atelier Cloud',
      avatar: '/src/assets/images/portrait_clara_center_1795096845640.jpg',
    },
  },
  {
    slug: 'calendar-workflow-integrations',
    number: '06',
    title: 'Calendar Sync & Team Workflow Hooks',
    category: 'Integrations',
    shortDescription:
      'Attach Kepripun rooms automatically to Google Calendar, Outlook, Slack, Linear, and Notion so your meetings live where work happens.',
    fullSummary:
      'Eliminate manual link pasting across tools. When you schedule an event, Kepripun inserts a pre-configured room link, reminds attendees two minutes before start, and posts finished notes directly into the matching project channel.',
    accentBg: '#EDF8FF',
    iconName: 'calendar',
    featuredSpan: 'normal',
    metrics: [
      { value: '25+', label: 'Native Integrations', context: 'Calendars, chat & issue trackers' },
      { value: '1 click', label: 'Slack /meet Launch', context: 'Instant room link in any channel' },
      { value: '100%', label: 'Webhook Reliability', context: 'Signed retries & delivery logs' },
    ],
    capabilities: [
      {
        heading: 'Two-Way Calendar Sync',
        detail: 'See upcoming schedule cards inside your Kepripun Dashboard and launch directly into rooms with pre-loaded participant lists.',
      },
      {
        heading: 'Slack & Teams Instant Huddles',
        detail: 'Type /kepripun in any channel to spin up a private encrypted room and auto-post the recap once everyone leaves.',
      },
      {
        heading: 'Open REST & Embed SDK',
        detail: 'Embed Kepripun rooms inside telehealth portals, tutoring apps, or customer onboarding flows in under 20 lines of TypeScript.',
      },
    ],
    specs: [
      { label: 'Calendars', value: 'Google Calendar, Outlook 365, Fastmail' },
      { label: 'Messaging', value: 'Slack, Microsoft Teams, Discord' },
      { label: 'Docs & Tasks', value: 'Notion, Linear, Jira, GitHub' },
      { label: 'Developer SDK', value: 'React, Vue, Web Components & REST' },
    ],
    testimonial: {
      quote:
        'Connecting Kepripun to Linear and Notion removed our entire manual note-taking ritual. Every sprint retro automatically files its follow-up issues.',
      author: 'Jonas Bergstrom',
      role: 'Engineering Manager',
      company: 'Wayfinder Logistics',
      avatar: '/src/assets/images/portrait_lucas_sky_1795096854318.jpg',
    },
  },
];

export const COMPARISON_ROWS = [
  { metric: 'Browser Join Time', kepripun: '1.8 sec', legacy: '14–45 sec (app launch)' },
  { metric: 'Zero-Install Guest Access', kepripun: 'Full HD & Screen Share', legacy: 'Restricted web fallback' },
  { metric: 'Default End-to-End Encryption', kepripun: 'Included on all plans', legacy: 'Enterprise add-on only' },
  { metric: 'Minimum Audio+Video Floor', kepripun: '180 kbps', legacy: '650 kbps' },
  { metric: 'Cloud Recording Processing', kepripun: '24 seconds', legacy: '8–20 minutes' },
  { metric: 'Monthly Free Tier Call Limit', kepripun: 'Unlimited 1:1 · 60 min group', legacy: '40 min hard cutoff' },
];
