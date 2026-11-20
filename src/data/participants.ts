export interface Participant {
  id: string;
  name: string;
  shortName: string;
  role: string;
  location: string;
  avatar: string;
  tileBg: string;
  position: 'top-left' | 'top-right' | 'mid-left' | 'center' | 'mid-right' | 'bot-left' | 'bot-right';
  isMuted: boolean;
  isCameraOff?: boolean;
  isSpeaking?: boolean;
  reaction?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
}

export const HERO_PARTICIPANTS: Participant[] = [
  {
    id: 'p-alex',
    name: 'Alex Lindqvist',
    shortName: 'Alex',
    role: 'Staff Systems Engineer',
    location: 'Stockholm, SE',
    avatar: '/src/assets/images/portrait_alex_lavender_1795096848920.jpg',
    tileBg: '#D2B8F7',
    position: 'top-left',
    isMuted: true,
    isSpeaking: false,
  },
  {
    id: 'p-daniel',
    name: 'Daniel Brooks',
    shortName: 'Daniel',
    role: 'Product Design Lead',
    location: 'Toronto, CA',
    avatar: '/src/assets/images/portrait_daniel_peach_1795096862531.jpg',
    tileBg: '#FAD4B4',
    position: 'top-right',
    isMuted: false,
    isSpeaking: false,
    reaction: 'LOL',
  },
  {
    id: 'p-maya',
    name: 'Maya Okafor',
    shortName: 'Maya',
    role: 'Research Director',
    location: 'London, UK',
    avatar: '/src/assets/images/portrait_maya_sky_1795096853789.jpg',
    tileBg: '#A7D8F5',
    position: 'mid-left',
    isMuted: false,
    isSpeaking: false,
  },
  {
    id: 'p-clara',
    name: 'Clara Morales',
    shortName: 'Clara',
    role: 'Head of Product',
    location: 'Madrid, ES',
    avatar: '/src/assets/images/portrait_clara_center_1795096845640.jpg',
    tileBg: '#FAD4B4',
    position: 'center',
    isMuted: false,
    isSpeaking: true,
  },
  {
    id: 'p-sofia',
    name: 'Sofia Novak',
    shortName: 'Sofia',
    role: 'Frontend Architect',
    location: 'Prague, CZ',
    avatar: '/src/assets/images/portrait_sofia_lavender_1795096852887.jpg',
    tileBg: '#D2B8F7',
    position: 'mid-right',
    isMuted: false,
    isSpeaking: false,
  },
  {
    id: 'p-arjun',
    name: 'Arjun Patel',
    shortName: 'Arjun',
    role: 'Security Engineer',
    location: 'Bengaluru, IN',
    avatar: '/src/assets/images/portrait_arjun_lavender_1795096853760.jpg',
    tileBg: '#D2B8F7',
    position: 'bot-left',
    isMuted: false,
    isSpeaking: false,
    reaction: 'Wow',
  },
  {
    id: 'p-lucas',
    name: 'Lucas Weber',
    shortName: 'Lucas',
    role: 'Customer Operations',
    location: 'Berlin, DE',
    avatar: '/src/assets/images/portrait_lucas_sky_1795096854318.jpg',
    tileBg: '#A7D8F5',
    position: 'bot-right',
    isMuted: true,
    isCameraOff: false,
    isSpeaking: false,
  },
];

export const INITIAL_ROOM_MESSAGES: ChatMessage[] = [
  {
    id: 'm-1',
    senderId: 'p-clara',
    senderName: 'Clara Morales',
    senderAvatar: '/src/assets/images/portrait_clara_center_1795096845640.jpg',
    text: 'Welcome everyone! Drop your quick updates here before we walk through the Q4 release checklist.',
    timestamp: '10:02 AM',
  },
  {
    id: 'm-2',
    senderId: 'p-daniel',
    senderName: 'Daniel Brooks',
    senderAvatar: '/src/assets/images/portrait_daniel_peach_1795096862531.jpg',
    text: 'Audio is crystal clear from Toronto today. Ready to share the updated mobile lobby mockups whenever you are.',
    timestamp: '10:03 AM',
  },
  {
    id: 'm-3',
    senderId: 'p-arjun',
    senderName: 'Arjun Patel',
    senderAvatar: '/src/assets/images/portrait_arjun_lavender_1795096853760.jpg',
    text: 'End-to-end key rotation tests passed across all 14 edge regions. Latency stayed under 40ms.',
    timestamp: '10:04 AM',
  },
];

export const SIMULATED_REPLIES: { senderId: string; text: string }[] = [
  { senderId: 'p-maya', text: 'Great point — I just pinned that to our shared meeting notes.' },
  { senderId: 'p-sofia', text: 'Love how snappy that feels! Let me test the responsive breakpoint right after this call.' },
  { senderId: 'p-daniel', text: 'Agreed. Sending over the Figma specs in the thread now.' },
  { senderId: 'p-alex', text: 'Makes total sense. I will update the rollout timeline by end of day.' },
];
