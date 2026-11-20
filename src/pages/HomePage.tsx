import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Calendar,
  Globe,
  Mic,
  Shield,
  Sparkles,
  Video,
} from 'lucide-react';
import { COMMUNITY_POSTS, FEATURES_DATA } from '../data';
import { HeroCollage } from '../components/HeroCollage';
import { NetworkInfographic } from '../components/NetworkInfographic';
import { SafeImage } from '../components/SafeImage';

const FEATURE_ICON_MAP = {
  video: Video,
  shield: Shield,
  globe: Globe,
  mic: Mic,
  sparkles: Sparkles,
  calendar: Calendar,
};

function extractRoomCode(raw: string): string {
  const cleaned = raw.trim();
  if (!cleaned) return '';
  const parts = cleaned.split('/').filter(Boolean);
  const candidate = parts[parts.length - 1] || cleaned;
  return candidate.replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase();
}

export function HomePage() {
  const [meetingInput, setMeetingInput] = useState('');
  const [inputHint, setInputHint] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleStartMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    const code = extractRoomCode(meetingInput);
    if (code.length >= 3) {
      setInputHint(null);
      navigate(`/meeting/${code}`);
      return;
    }
    if (meetingInput.trim().length > 0 && code.length < 3) {
      setInputHint('Enter at least 3 letters or paste a full Kepripun room link.');
      return;
    }
    navigate('/meeting/new');
  };

  const homeFeatures = FEATURES_DATA.slice(0, 4);
  const homeCommunity = COMMUNITY_POSTS.slice(0, 3);

  return (
    <div>
      {/* HERO SECTION — Faithful to the Kepripun design image */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-10 pb-16 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Expressive Headline + Subtitle + Join Input Bar */}
          <div className="lg:col-span-6 space-y-7 max-w-[540px]">
            <h1 className="font-display text-[42px] sm:text-[56px] lg:text-[62px] font-semibold tracking-[-0.03em] leading-[1.12] text-[#1F2128]">
              <span className="flex items-center flex-wrap gap-3.5 sm:gap-5">
                <span>Meet</span>
                {/* Cyan Airplane Pill Badge */}
                <span
                  className="inline-flex items-center justify-center relative w-[78px] sm:w-[96px] h-[38px] sm:h-[46px] rounded-full bg-[#13B7DD] shadow-[0_8px_20px_rgba(19,183,221,0.28)] align-middle"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 96 52"
                    fill="none"
                    className="w-[82px] sm:w-[98px] h-[46px] sm:h-[54px] -mt-2 -ml-1 overflow-visible"
                  >
                    <path
                      d="M16 33 L58 10 C62 8 66 10 63 14 L42 30 L51 41 L45 43 L34 33 L21 39 L16 33 Z"
                      fill="#1D4E89"
                    />
                    <path
                      d="M10 31 L62 6 C66 4 69 7 66 11 L38 29 L10 31 Z"
                      fill="#FFFFFF"
                    />
                    <path
                      d="M36 27 L47 41 L41 43 L28 31 Z"
                      fill="#235796"
                    />
                    <circle cx="48" cy="17" r="2" fill="#13B7DD" />
                    <circle cx="41" cy="21" r="2" fill="#13B7DD" />
                  </svg>
                </span>
              </span>
              <span className="block mt-1">Without a</span>
              <span className="flex items-center flex-wrap gap-3.5 sm:gap-5 mt-1">
                <span>Hitch</span>
                {/* Purple Storm-Cloud Pill Badge */}
                <span
                  className="inline-flex items-center justify-center relative w-[92px] sm:w-[116px] h-[38px] sm:h-[46px] rounded-full bg-[#6153CC] shadow-[0_8px_20px_rgba(97,83,204,0.3)] align-middle"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 116 56"
                    fill="none"
                    className="w-[86px] sm:w-[106px] h-[48px] sm:h-[56px] overflow-visible"
                  >
                    <path
                      d="M37 31 C31 31 27 27 27 22 C27 17.5 30.5 14 35 13.5 C37 8 42.5 4 49 4 C56.5 4 62.5 9.5 63.5 16.5 C67.5 17 71 20.2 71 24.5 C71 28.5 67.5 31 63 31 Z"
                      fill="#FFFFFF"
                      transform="translate(10, -2)"
                    />
                    <path
                      d="M55 29 L48 41 L55 41 L50 53 L66 37 L58 37 L63 29 Z"
                      fill="#FACC15"
                      stroke="#EAB308"
                      strokeWidth="0.8"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M44 34 L41 39 M70 34 L67 39 M77 33 L74 38"
                      stroke="#A7D8F5"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </span>
            </h1>

            <p className="text-[16px] sm:text-[17.5px] leading-[1.65] text-[#6F7382] max-w-[390px]">
              Distance doesn&apos;t matter, it&apos;s the meeting that matters the most.
            </p>

            {/* Meeting Link Input + Start Meeting CTA matching reference */}
            <form onSubmit={handleStartMeeting} className="pt-1 space-y-2.5 max-w-[468px]">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 rounded-[26px] sm:rounded-full bg-white border border-[#ECECF4] shadow-[0_12px_36px_rgba(31,33,40,0.06)] focus-within:border-[#6153CC] focus-within:ring-4 focus-within:ring-[#6153CC]/10 transition-all">
                <label htmlFor="hero-meeting-link" className="sr-only">
                  Insert your meeting link or room code
                </label>
                <input
                  id="hero-meeting-link"
                  type="text"
                  value={meetingInput}
                  onChange={(e) => {
                    setMeetingInput(e.target.value);
                    if (inputHint) setInputHint(null);
                  }}
                  placeholder="Insert your meeting link"
                  className="flex-1 min-w-0 bg-transparent px-4 py-2.5 text-[14.5px] text-[#1F2128] placeholder:text-[#A4A8B6] focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#6153CC] text-white text-[14px] font-medium whitespace-nowrap shrink-0 hover:bg-[#4F41B8] transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6153CC] focus-visible:ring-offset-2"
                >
                  <Video className="w-4 h-4 fill-white/90" />
                  <span>Start meeting</span>
                </button>
              </div>

              {inputHint ? (
                <p className="text-[13px] text-rose-600 pl-4">{inputHint}</p>
              ) : (
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pl-3 text-[13px] text-[#7D8190]">
                  <span>Try live room:</span>
                  <button
                    type="button"
                    onClick={() => navigate('/meeting/kpr-design-sync')}
                    className="font-mono text-[12.5px] text-[#594BB8] hover:underline cursor-pointer"
                  >
                    kpr-design-sync
                  </button>
                  <span aria-hidden="true">·</span>
                  <Link to="/dashboard" className="hover:text-[#1F2128] transition-colors">
                    View scheduled rooms
                  </Link>
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Interactive 7-Tile Video Network Collage */}
          <div className="lg:col-span-6">
            <HeroCollage />
          </div>
        </div>
      </section>

      {/* QUANTIFIED PERFORMANCE STRIP — Clean hairline architectural band */}
      <section className="border-y border-[#EFEFF6] bg-[#FAFAFD]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <p className="font-display text-[28px] sm:text-[32px] font-bold tracking-tight text-[#1F2128] tabular-nums">
                1.8 sec
              </p>
              <p className="mt-1 text-[13.5px] text-[#6F7382]">
                Median browser join time with zero installs
              </p>
            </div>
            <div>
              <p className="font-display text-[28px] sm:text-[32px] font-bold tracking-tight text-[#1F2128] tabular-nums">
                38 ms
              </p>
              <p className="mt-1 text-[13.5px] text-[#6F7382]">
                Global audio latency across 28 edge regions
              </p>
            </div>
            <div>
              <p className="font-display text-[28px] sm:text-[32px] font-bold tracking-tight text-[#1F2128] tabular-nums">
                99.98%
              </p>
              <p className="mt-1 text-[13.5px] text-[#6F7382]">
                Call completion rate across 14M+ monthly minutes
              </p>
            </div>
            <div>
              <p className="font-display text-[28px] sm:text-[32px] font-bold tracking-tight text-[#1F2128] tabular-nums">
                256-bit
              </p>
              <p className="mt-1 text-[13.5px] text-[#6F7382]">
                Client-side MLS encryption enabled by default
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES — Asymmetric Bento Grid linking to /features/:slug */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 py-20 sm:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-[560px]">
            <p className="text-[13.5px] font-medium text-[#6153CC] mb-2">
              Built for uninterrupted conversation
            </p>
            <h2 className="font-display text-[30px] sm:text-[38px] font-bold tracking-tight text-[#1F2128] leading-[1.15] [text-wrap:balance]">
              Every room engineered for clarity, speed, and privacy.
            </h2>
          </div>
          <Link
            to="/features"
            className="inline-flex items-center gap-2 text-[14.5px] font-medium text-[#6153CC] hover:text-[#4F41B8] whitespace-nowrap shrink-0 transition-colors"
          >
            <span>Explore all 6 capabilities</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {homeFeatures.map((feature) => {
            const Icon = FEATURE_ICON_MAP[feature.iconName];
            const isWide = feature.featuredSpan === 'wide';

            return (
              <Link
                key={feature.slug}
                to={`/features/${feature.slug}`}
                className={`group rounded-[26px] border border-[#EBEBF3] bg-white p-7 sm:p-8 flex flex-col justify-between gap-7 hover:border-[#6153CC]/45 hover:shadow-[0_14px_34px_rgba(97,83,204,0.08)] transition-all duration-200 ${
                  isWide ? 'md:col-span-2' : 'md:col-span-1'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className="w-11 h-11 rounded-2xl flex items-center justify-center text-[#4F41B8]"
                      style={{ backgroundColor: feature.accentBg }}
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-[13px] font-mono text-[#8B8F9E] tabular-nums">
                      {feature.number}. {feature.category}
                    </span>
                  </div>

                  <h3 className="font-display text-[21px] sm:text-[23px] font-semibold text-[#1F2128] group-hover:text-[#6153CC] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[#6F7382] max-w-[540px]">
                    {feature.shortDescription}
                  </p>
                </div>

                <div className="pt-5 border-t border-[#F1F1F7] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    {feature.metrics.slice(0, isWide ? 2 : 1).map((m) => (
                      <div key={m.label}>
                        <p className="font-display text-[18px] font-bold text-[#1F2128] tabular-nums">
                          {m.value}
                        </p>
                        <p className="text-[12.5px] text-[#7D8190]">{m.label}</p>
                      </div>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[#6153CC]">
                    <span>Read details</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Interactive Global Routing & Adaptive Bandwidth Infographic */}
        <div className="mt-10 sm:mt-12">
          <NetworkInfographic />
        </div>
      </section>

      {/* PROOF & ATTRIBUTABLE CUSTOMER STORIES */}
      <section className="bg-[#FAFAFD] border-y border-[#EFEFF6]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <div className="max-w-[580px] mb-12">
            <p className="text-[13.5px] font-medium text-[#6153CC] mb-2">
              Real outcomes across global teams
            </p>
            <h2 className="font-display text-[28px] sm:text-[36px] font-bold tracking-tight text-[#1F2128] leading-[1.16] [text-wrap:balance]">
              Trusted by distributed engineering, research, and design teams.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES_DATA.slice(0, 3).map((item) => (
              <article
                key={item.slug}
                className="rounded-[24px] bg-white border border-[#EBEBF3] p-7 flex flex-col justify-between gap-6"
              >
                <p className="text-[15px] leading-[1.7] text-[#353844]">
                  &ldquo;{item.testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3.5 pt-4 border-t border-[#F1F1F7]">
                  <SafeImage
                    src={item.testimonial.avatar}
                    alt={item.testimonial.author}
                    className="w-11 h-11 rounded-2xl object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-display text-[14.5px] font-semibold text-[#1F2128] truncate">
                      {item.testimonial.author}
                    </p>
                    <p className="text-[13px] text-[#6F7382] truncate">
                      {item.testimonial.role} · {item.testimonial.company}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY HIGHLIGHTS */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 py-20 sm:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-[540px]">
            <p className="text-[13.5px] font-medium text-[#6153CC] mb-2">
              From the Kepripun Community
            </p>
            <h2 className="font-display text-[28px] sm:text-[36px] font-bold tracking-tight text-[#1F2128] leading-[1.16] [text-wrap:balance]">
              Playbooks, live townhalls, and meeting templates.
            </h2>
          </div>
          <Link
            to="/community"
            className="inline-flex items-center gap-2 text-[14.5px] font-medium text-[#6153CC] hover:text-[#4F41B8] whitespace-nowrap shrink-0 transition-colors"
          >
            <span>Visit Community Hub</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {homeCommunity.map((post) => (
            <Link
              key={post.slug}
              to={`/community/${post.slug}`}
              className="group rounded-[24px] border border-[#EBEBF3] bg-white p-7 flex flex-col justify-between gap-6 hover:border-[#6153CC]/45 hover:shadow-[0_12px_30px_rgba(97,83,204,0.07)] transition-all duration-200"
            >
              <div className="space-y-3.5">
                <div className="flex items-center gap-2 text-[12.5px] text-[#7D8190]">
                  <span className="font-medium text-[#6153CC]">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.publishedAt}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-display text-[19px] font-semibold text-[#1F2128] leading-snug group-hover:text-[#6153CC] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-[#6F7382]">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#F1F1F7]">
                <SafeImage
                  src={post.author.avatar}
                  alt={post.author.name}
                  fallbackBg={post.author.tileBg}
                  className="w-9 h-9 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-[13.5px] font-medium text-[#1F2128] truncate">
                    {post.author.name}
                  </p>
                  <p className="text-[12px] text-[#7D8190] truncate">{post.author.role}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BOTTOM CONVERSION CALLOUT */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 pb-20 sm:pb-24">
        <div className="rounded-[32px] bg-[#6153CC] text-white px-7 py-12 sm:px-14 sm:py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-[540px] space-y-3">
            <h2 className="font-display text-[28px] sm:text-[36px] font-bold tracking-tight leading-[1.15] [text-wrap:balance]">
              Start your next team conversation in two seconds.
            </h2>
            <p className="text-[15.5px] leading-relaxed text-white/85">
              No downloads, no guest account walls, and end-to-end encryption turned on from your
              very first room.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 shrink-0">
            <Link
              to="/meeting/new"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#4F41B8] text-[14.5px] font-semibold hover:bg-[#F4F2FF] transition-colors whitespace-nowrap"
            >
              <Video className="w-4 h-4" />
              <span>Start free room</span>
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/40 text-white text-[14.5px] font-medium hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              <span>Compare plans</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
