export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  highlighted?: boolean;
  ctaLabel: string;
  participantCap: string;
  features: string[];
}

export interface PricingFaq {
  question: string;
  answer: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'personal',
    name: 'Personal',
    tagline: 'For freelancers, students, and everyday 1:1 conversations.',
    monthlyPrice: 0,
    annualPrice: 0,
    ctaLabel: 'Start free room',
    participantCap: 'Up to 15 participants',
    features: [
      'Unlimited 1:1 browser video meetings',
      'Group calls up to 60 minutes',
      'End-to-end room encryption by default',
      'Floating reactions & live in-room chat',
      'Instant guest join with zero downloads',
    ],
  },
  {
    id: 'team',
    name: 'Team Pro',
    tagline: 'For distributed product, design, and engineering teams.',
    monthlyPrice: 14,
    annualPrice: 11,
    highlighted: true,
    ctaLabel: 'Start 14-day free trial',
    participantCap: 'Up to 100 participants',
    features: [
      'Unlimited group meeting duration',
      '4K adaptive video & spatial studio audio',
      'Cloud recordings with searchable transcripts',
      'Custom permanent room URLs',
      'Google Calendar, Outlook, Slack & Linear sync',
      'Priority global edge media routing',
    ],
  },
  {
    id: 'enterprise',
    name: 'Organization',
    tagline: 'For security-conscious teams requiring compliance & custom residency.',
    monthlyPrice: 28,
    annualPrice: 22,
    ctaLabel: 'Launch workspace demo',
    participantCap: 'Up to 250 participants',
    features: [
      'Everything in Team Pro included',
      'SAML 2.0 SSO & SCIM directory provisioning',
      'EU / US / APAC regional media pinning',
      'Custom branded waiting rooms & domains',
      'Real-time SIEM audit log webhooks',
      'Dedicated solutions engineer & 99.99% SLA',
    ],
  },
];

export const PRICING_FAQS: PricingFaq[] = [
  {
    question: 'Do guests need a Kepripun account or desktop app to join?',
    answer:
      'Never. Anyone with your room link can join directly from Chrome, Safari, Firefox, Edge, or mobile browsers in under two seconds with zero installs.',
  },
  {
    question: 'Is end-to-end encryption included on the free Personal plan?',
    answer:
      'Yes. We believe privacy should not be an enterprise upsell. All Kepripun rooms use client-side MLS key exchange and AES-256-GCM frame encryption by default.',
  },
  {
    question: 'How does annual billing work if our team grows mid-year?',
    answer:
      'You can add or remove seats at any time inside your workspace settings. Prorated adjustments apply automatically on your next billing cycle.',
  },
  {
    question: 'Can we export our cloud recordings and transcripts if we cancel?',
    answer:
      'Always. Every recording is exportable as standard 1080p MP4 alongside VTT captions and Markdown summaries with zero lock-in.',
  },
];
