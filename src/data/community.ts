export type CommunityCategory = 'Guides' | 'Events' | 'Templates' | 'Product Stories';

export interface CommunityComment {
  id: string;
  author: string;
  role: string;
  avatar: string;
  date: string;
  body: string;
}

export interface CommunityPost {
  slug: string;
  title: string;
  category: CommunityCategory;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    tileBg: string;
  };
  eventDetails?: {
    dateLabel: string;
    timeLabel: string;
    roomCode: string;
    attendeeCount: number;
  };
  highlights: string[];
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
  initialComments: CommunityComment[];
}

export const COMMUNITY_CATEGORIES: ('All' | CommunityCategory)[] = [
  'All',
  'Guides',
  'Events',
  'Templates',
  'Product Stories',
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    slug: 'async-first-rituals-that-cut-meeting-fatigue',
    title: 'Seven Remote Rituals That Cut Weekly Meeting Hours by 38%',
    category: 'Guides',
    excerpt:
      'How distributed design and engineering teams combine short high-trust Kepripun rooms with crisp async recaps to protect deep focus blocks.',
    publishedAt: 'Nov 14, 2026',
    readTime: '6 min read',
    author: {
      name: 'Clara Morales',
      role: 'Head of Product at Kepripun',
      avatar: '/src/assets/images/portrait_clara_center_1795096845640.jpg',
      tileBg: '#FAD4B4',
    },
    highlights: [
      'Default every recurring calendar block to 25 or 50 minutes so people breathe between calls.',
      'Start each room with a two-minute silent read of the agenda before opening microphones.',
      'Publish timestamped highlights automatically so optional teammates can catch up asynchronously.',
    ],
    sections: [
      {
        heading: 'Why Most Remote Calendars Break Down',
        paragraphs: [
          'Remote teams rarely suffer from too much communication — they suffer from poorly scoped synchronous calls. When status updates masquerade as brainstorming sessions, ten people sit muted while two read bullet points aloud.',
          'Over the past year, we interviewed 44 distributed teams using Kepripun across four continents. The highest-performing teams treated live video time as a scarce, high-energy studio resource reserved for decisions, feedback, and genuine human connection.',
        ],
      },
      {
        heading: 'The 25-Minute Decision Sprint',
        paragraphs: [
          'Instead of scheduling default one-hour syncs, top teams book 25-minute Kepripun rooms with one clear question in the room title. Every participant arrives via instant browser link with zero setup delay, reads three bullets of context, and leaves with named owners.',
          'Using lightweight floating reactions (like Wow and Agree) lets quieter voices weigh in continuously without fighting for floor time.',
        ],
      },
      {
        heading: 'Closing the Loop Across Time Zones',
        paragraphs: [
          'When colleagues in Tokyo and Berlin share only a ninety-minute overlap, recording every major review with clickable chapter transcripts transforms how work flows. Nobody stays online past dinner just to absorb context.',
        ],
      },
    ],
    initialComments: [
      {
        id: 'c-1',
        author: 'Daniel Brooks',
        role: 'Product Design Lead',
        avatar: '/src/assets/images/portrait_daniel_peach_1795096862531.jpg',
        date: '2 days ago',
        body: 'Switching our weekly design critique to 25 minutes with a two-minute silent figma read upfront completely changed the quality of feedback we get.',
      },
      {
        id: 'c-2',
        author: 'Maya Okafor',
        role: 'Research Director',
        avatar: '/src/assets/images/portrait_maya_sky_1795096853789.jpg',
        date: '1 day ago',
        body: 'The point about optional attendees watching chapter highlights instead of sitting muted is huge. We reclaimed almost 6 hours a week across our research squad.',
      },
    ],
  },
  {
    slug: 'spatial-audio-workshop-november',
    title: 'Live Community Townhall: Designing Human-First Video Rooms',
    category: 'Events',
    excerpt:
      'Join our audio engineers and design leads for an interactive live demo on spatial voice routing, noise suppression, and Q1 2027 roadmap Q&A.',
    publishedAt: 'Nov 26, 2026',
    readTime: '45 min live session',
    author: {
      name: 'Alex Lindqvist',
      role: 'Staff Systems Engineer',
      avatar: '/src/assets/images/portrait_alex_lavender_1795096848920.jpg',
      tileBg: '#D2B8F7',
    },
    eventDetails: {
      dateLabel: 'Thursday, Nov 26, 2026',
      timeLabel: '16:00 UTC · 11:00 AM EST',
      roomCode: 'kpr-community-townhall',
      attendeeCount: 184,
    },
    highlights: [
      'Live A/B listening test comparing traditional mono mixing vs. Kepripun spatial voice separation.',
      'Behind-the-scenes walkthrough of our 38ms global WebRTC relay architecture.',
      'Open microphone Q&A and feature voting with the core Kepripun engineering team.',
    ],
    sections: [
      {
        heading: 'What We Will Cover Live',
        paragraphs: [
          'During this 45-minute open Kepripun room, we will unpack why browser video calls often sound fatiguing after two hours — and how gentle acoustic spatialization lets your brain separate voices effortlessly.',
          'Bring your toughest remote-team audio headaches. We will run live microphone checks, demo our local WebAssembly noise suppressor against a real espresso grinder, and preview upcoming custom room layouts.',
        ],
      },
      {
        heading: 'How to Prepare',
        paragraphs: [
          'Wear headphones if you want to experience the live spatial audio comparison firsthand. No downloads are needed — RSVP on this page and click Join Live Room directly in your browser when the session begins.',
        ],
      },
    ],
    initialComments: [
      {
        id: 'c-3',
        author: 'Lucas Weber',
        role: 'Customer Operations',
        avatar: '/src/assets/images/portrait_lucas_sky_1795096854318.jpg',
        date: '3 days ago',
        body: 'Excited for the espresso grinder stress test! Will there be a chaptered recording available for folks in Sydney?',
      },
    ],
  },
  {
    slug: 'design-critique-room-template',
    title: 'The 30-Minute Design Critique Room Kit',
    category: 'Templates',
    excerpt:
      'A repeatable meeting structure, prompt checklist, and reaction etiquette guide used by 1,200+ product design teams to give sharper feedback.',
    publishedAt: 'Nov 08, 2026',
    readTime: '4 min read',
    author: {
      name: 'Daniel Brooks',
      role: 'Product Design Lead',
      avatar: '/src/assets/images/portrait_daniel_peach_1795096862531.jpg',
      tileBg: '#FAD4B4',
    },
    highlights: [
      '00–05 min: Presenter sets stage (goal, stage of polish, what feedback is NOT needed yet).',
      '05–18 min: Live walkthrough with silent chat notes and floating reactions.',
      '18–30 min: Synthesize top three design tensions and assign follow-up exploration.',
    ],
    sections: [
      {
        heading: 'Preventing Pixel-Nitpicking on Early Wireframes',
        paragraphs: [
          'The fastest way to stall a critique is inviting color commentary on a flow that is still exploring information architecture. This template starts every room by naming the fidelity stage explicitly in the pinned room header.',
        ],
      },
      {
        heading: 'Using Reactions to Read the Room Quickly',
        paragraphs: [
          'Instead of pausing for awkward verbal nods after every slide, reviewers drop quick reactions in real time. Presenters immediately spot which interactions delight the team and which moments trigger confusion.',
        ],
      },
    ],
    initialComments: [
      {
        id: 'c-4',
        author: 'Sofia Novak',
        role: 'Frontend Architect',
        avatar: '/src/assets/images/portrait_sofia_lavender_1795096852887.jpg',
        date: '5 days ago',
        body: 'We adopted this exact 5/13/12 minute split for engineering RFC reviews too and it works brilliantly.',
      },
    ],
  },
  {
    slug: 'how-nordicgrid-eliminated-call-dropouts',
    title: 'How NordicGrid Cut Call Dropouts to Zero Across 11 Time Zones',
    category: 'Product Stories',
    excerpt:
      'Inside a 220-person clean-energy engineering team’s migration from bloated desktop conferencing apps to instant Kepripun browser rooms.',
    publishedAt: 'Oct 29, 2026',
    readTime: '5 min read',
    author: {
      name: 'Maya Okafor',
      role: 'Research Director',
      avatar: '/src/assets/images/portrait_maya_sky_1795096853789.jpg',
      tileBg: '#A7D8F5',
    },
    highlights: [
      '42% reduction in meeting start delays across external utility partner calls.',
      'Zero mandatory desktop client updates for field engineers working on LTE tablets.',
      '$38,400 saved annually by consolidating separate webinar and recording subscriptions.',
    ],
    sections: [
      {
        heading: 'The Field Connectivity Challenge',
        paragraphs: [
          'NordicGrid’s engineers frequently join incident triage calls from wind-farm substations and commuter ferries on fluctuating 4G links. Traditional desktop apps routinely kicked them off calls or burned through laptop batteries.',
          'With Kepripun’s adaptive 180 kbps floor, field engineers keep crystal-clear audio and live whiteboard visibility even when signal bars drop to one.',
        ],
      },
      {
        heading: 'Measurable Rollout Results in 90 Days',
        paragraphs: [
          'Within three months of adopting Kepripun company-wide, IT support tickets related to video permissions fell by 87%, and customer satisfaction scores on onboarding calls rose from 4.3 to 4.9 out of 5.',
        ],
      },
    ],
    initialComments: [],
  },
  {
    slug: 'zero-knowledge-key-rotation-explained',
    title: 'Under the Hood: Sub-120ms Key Rotation for Encrypted Group Calls',
    category: 'Product Stories',
    excerpt:
      'A plain-English technical breakdown of how Kepripun secures 100-person rooms using Messaging Layer Security without sacrificing video fluidity.',
    publishedAt: 'Oct 19, 2026',
    readTime: '7 min read',
    author: {
      name: 'Arjun Patel',
      role: 'Security Engineer',
      avatar: '/src/assets/images/portrait_arjun_lavender_1795096853760.jpg',
      tileBg: '#D2B8F7',
    },
    highlights: [
      'Why pairwise encryption fails above 12 participants and how tree-based MLS scales cleanly.',
      'How browser WebRTC Encoded Transforms keep raw frames invisible to media relay servers.',
      'Practical tips for verifying room fingerprints during sensitive executive briefings.',
    ],
    sections: [
      {
        heading: 'Security That Never Gets in Your Way',
        paragraphs: [
          'Historically, turning on end-to-end encryption meant losing gallery layouts, mobile browser support, or crisp frame rates. We designed Kepripun’s encryption pipeline from day one so privacy is the effortless default rather than a hidden toggle.',
        ],
      },
      {
        heading: 'Tree-Based Key Agreement at Scale',
        paragraphs: [
          'By organizing participant keys in a balanced ratchet tree, adding or removing a participant requires logarithmic computation — keeping re-keying under 120 milliseconds even in large company townhalls.',
        ],
      },
    ],
    initialComments: [
      {
        id: 'c-5',
        author: 'Alex Lindqvist',
        role: 'Staff Systems Engineer',
        avatar: '/src/assets/images/portrait_alex_lavender_1795096848920.jpg',
        date: '1 week ago',
        body: 'Happy to answer any protocol questions in this thread if anyone wants to dig into our WebRTC transform benchmarks.',
      },
    ],
  },
  {
    slug: 'onboarding-remote-hires-first-week',
    title: 'Remote Onboarding Playbook: Warm First-Week Coffee Rooms',
    category: 'Templates',
    excerpt:
      'Simple 15-minute pairing schedules and icebreaker room presets that help new remote teammates feel genuinely welcomed by Friday.',
    publishedAt: 'Oct 10, 2026',
    readTime: '4 min read',
    author: {
      name: 'Sofia Novak',
      role: 'Frontend Architect',
      avatar: '/src/assets/images/portrait_sofia_lavender_1795096852887.jpg',
      tileBg: '#D2B8F7',
    },
    highlights: [
      'Pair every new hire with three cross-functional buddies outside their immediate squad.',
      'Keep intro rooms short (15 minutes) with optional cameras for low-pressure connection.',
      'Share a welcome clip recorded in Kepripun before their laptop even arrives.',
    ],
    sections: [
      {
        heading: 'Making Day One Feel Personal',
        paragraphs: [
          'Joining a remote company can feel oddly quiet once HR orientation wraps up. Short, purposeful coffee rooms with peers across design, support, and engineering give newcomers instant context and friendly faces they can message anytime.',
        ],
      },
    ],
    initialComments: [],
  },
];

export const COMMUNITY_AMBASSADORS = [
  {
    name: 'Clara Morales',
    role: 'Product & Remote Rituals',
    location: 'Madrid',
    avatar: '/src/assets/images/portrait_clara_center_1795096845640.jpg',
    tileBg: '#FAD4B4',
  },
  {
    name: 'Alex Lindqvist',
    role: 'WebRTC & Spatial Audio',
    location: 'Stockholm',
    avatar: '/src/assets/images/portrait_alex_lavender_1795096848920.jpg',
    tileBg: '#D2B8F7',
  },
  {
    name: 'Maya Okafor',
    role: 'User Research & Facilitation',
    location: 'London',
    avatar: '/src/assets/images/portrait_maya_sky_1795096853789.jpg',
    tileBg: '#A7D8F5',
  },
  {
    name: 'Arjun Patel',
    role: 'Zero-Knowledge Security',
    location: 'Bengaluru',
    avatar: '/src/assets/images/portrait_arjun_lavender_1795096853760.jpg',
    tileBg: '#D2B8F7',
  },
];
