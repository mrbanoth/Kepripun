import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Globe,
  Mic,
  Shield,
  Sparkles,
  Video,
} from 'lucide-react';
import { FEATURES_DATA } from '../data';
import { DetailPageSkeleton } from '../components/PageSkeleton';
import { NetworkInfographic } from '../components/NetworkInfographic';
import { SafeImage } from '../components/SafeImage';

const ICON_MAP = {
  video: Video,
  shield: Shield,
  globe: Globe,
  mic: Mic,
  sparkles: Sparkles,
  calendar: Calendar,
};

export function FeatureDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), 200);
    return () => window.clearTimeout(t);
  }, [slug]);

  if (loading) {
    return <DetailPageSkeleton />;
  }

  const feature = FEATURES_DATA.find((f) => f.slug === slug);

  if (!feature) {
    return (
      <div className="max-w-[780px] mx-auto px-5 sm:px-8 py-24 text-center space-y-5">
        <h1 className="font-display text-[32px] font-bold text-[#1F2128]">Feature not found</h1>
        <p className="text-[#6F7382]">
          The capability page you requested does not exist or may have moved.
        </p>
        <Link
          to="/features"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6153CC] text-white text-[14px] font-medium hover:bg-[#4F41B8]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all features</span>
        </Link>
      </div>
    );
  }

  const Icon = ICON_MAP[feature.iconName];
  const related = FEATURES_DATA.filter((f) => f.slug !== feature.slug).slice(0, 2);

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-14">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13.5px] text-[#6F7382]">
        <Link
          to="/features"
          className="inline-flex items-center gap-1.5 hover:text-[#6153CC] transition-colors shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Features</span>
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-[#1F2128] font-medium truncate">{feature.title}</span>
      </nav>

      {/* Hero Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center gap-3">
            <span
              className="w-11 h-11 rounded-2xl flex items-center justify-center text-[#4F41B8]"
              style={{ backgroundColor: feature.accentBg }}
            >
              <Icon className="w-5 h-5" />
            </span>
            <span className="text-[13.5px] font-mono text-[#6F7382]">
              {feature.number}. {feature.category}
            </span>
          </div>

          <h1 className="font-display text-[32px] sm:text-[44px] font-bold tracking-tight text-[#1F2128] leading-[1.13] [text-wrap:balance]">
            {feature.title}
          </h1>
          <p className="text-[15.5px] sm:text-[16.5px] leading-[1.7] text-[#4C505E]">
            {feature.fullSummary}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to="/meeting/kpr-design-sync"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#6153CC] text-white text-[14.5px] font-medium hover:bg-[#4F41B8] transition-colors"
            >
              <Video className="w-4 h-4" />
              <span>Test in a live room</span>
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#D8D8E6] text-[#1F2128] text-[14.5px] font-medium hover:border-[#6153CC] hover:text-[#6153CC] transition-colors"
            >
              <span>See plan availability</span>
            </Link>
          </div>
        </div>

        {/* Technical Specs Card */}
        <aside className="lg:col-span-5 rounded-[26px] border border-[#EBEBF3] bg-[#FAFAFD] p-6 sm:p-7 space-y-5">
          <h2 className="font-display text-[17px] font-semibold text-[#1F2128]">
            Technical Specifications
          </h2>
          <dl className="divide-y divide-[#EAEAF2]">
            {feature.specs.map((spec) => (
              <div key={spec.label} className="py-3.5 flex items-baseline justify-between gap-4">
                <dt className="text-[13.5px] text-[#6F7382]">{spec.label}</dt>
                <dd className="text-[14px] font-medium text-[#1F2128] text-right tabular-nums">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {feature.metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-[22px] border border-[#EBEBF3] bg-white p-6 space-y-1.5"
          >
            <p className="font-display text-[30px] sm:text-[32px] font-bold text-[#6153CC] tabular-nums">
              {metric.value}
            </p>
            <p className="font-display text-[15px] font-semibold text-[#1F2128]">{metric.label}</p>
            <p className="text-[13.5px] text-[#6F7382]">{metric.context}</p>
          </div>
        ))}
      </div>

      {/* Capabilities Breakdown */}
      <section className="space-y-6">
        <h2 className="font-display text-[24px] sm:text-[28px] font-bold text-[#1F2128]">
          How it works in practice
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {feature.capabilities.map((cap, idx) => (
            <div
              key={cap.heading}
              className="rounded-[22px] border border-[#EBEBF3] bg-white p-6 space-y-3"
            >
              <span className="font-mono text-[13px] text-[#6153CC] tabular-nums">
                0{idx + 1}.
              </span>
              <h3 className="font-display text-[18px] font-semibold text-[#1F2128]">
                {cap.heading}
              </h3>
              <p className="text-[14.5px] leading-relaxed text-[#6F7382]">{cap.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Network Resilience Infographic */}
      <NetworkInfographic compact />

      {/* Customer Testimonial */}
      <section className="rounded-[28px] bg-[#F4F2FF] p-7 sm:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-7">
        <SafeImage
          src={feature.testimonial.avatar}
          alt={feature.testimonial.author}
          className="w-16 h-16 rounded-2xl object-cover shrink-0"
        />
        <div className="space-y-3">
          <p className="text-[16.5px] sm:text-[18px] leading-relaxed text-[#1F2128] font-medium">
            &ldquo;{feature.testimonial.quote}&rdquo;
          </p>
          <p className="text-[14px] text-[#5A5E6E]">
            <strong className="text-[#1F2128] font-semibold">{feature.testimonial.author}</strong> ·{' '}
            {feature.testimonial.role} at {feature.testimonial.company}
          </p>
        </div>
      </section>

      {/* Related Capabilities */}
      <section className="pt-4 border-t border-[#EFEFF6] space-y-5">
        <h2 className="font-display text-[20px] font-semibold text-[#1F2128]">
          Explore more capabilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {related.map((item) => (
            <Link
              key={item.slug}
              to={`/features/${item.slug}`}
              className="group rounded-[22px] border border-[#EBEBF3] bg-white p-6 flex items-center justify-between gap-4 hover:border-[#6153CC]/50 transition-colors"
            >
              <div className="space-y-1 min-w-0">
                <p className="text-[12.5px] font-mono text-[#7D8190]">
                  {item.number}. {item.category}
                </p>
                <h3 className="font-display text-[17.5px] font-semibold text-[#1F2128] group-hover:text-[#6153CC] transition-colors truncate">
                  {item.title}
                </h3>
              </div>
              <ArrowRight className="w-5 h-5 text-[#6153CC] shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
