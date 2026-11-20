import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Calendar,
  Check,
  Globe,
  Mic,
  Shield,
  Sparkles,
  Video,
} from 'lucide-react';
import {
  COMPARISON_ROWS,
  FEATURE_CATEGORIES,
  FEATURES_DATA,
  FeatureCategory,
} from '../data';
import { CardGridSkeleton } from '../components/PageSkeleton';
import { NetworkInfographic } from '../components/NetworkInfographic';

const ICON_MAP = {
  video: Video,
  shield: Shield,
  globe: Globe,
  mic: Mic,
  sparkles: Sparkles,
  calendar: Calendar,
};

export function FeaturesPage() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | FeatureCategory>('All');
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    setIsFiltering(true);
    const t = window.setTimeout(() => setIsFiltering(false), 180);
    return () => window.clearTimeout(t);
  }, [selectedCategory]);

  const filtered =
    selectedCategory === 'All'
      ? FEATURES_DATA
      : FEATURES_DATA.filter((f) => f.category === selectedCategory);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-12 sm:py-20 space-y-14 sm:space-y-16">
      {/* Header */}
      <div className="max-w-[680px] space-y-4">
        <p className="text-[13.5px] font-medium text-[#6153CC]">Capabilities</p>
        <h1 className="font-display text-[34px] sm:text-[48px] font-bold tracking-tight text-[#1F2128] leading-[1.12] [text-wrap:balance]">
          Video infrastructure built to disappear into the conversation.
        </h1>
        <p className="text-[15.5px] sm:text-[17px] leading-relaxed text-[#6F7382]">
          Explore how Kepripun delivers 4K adaptive streams, client-side encryption, spatial audio,
          and zero-download browser rooms for modern distributed teams.
        </p>
      </div>

      {/* Horizontally scrollable category bar on mobile */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-[#EFEFF6] pb-5 -mx-4 px-4 sm:mx-0 sm:px-0">
        {FEATURE_CATEGORIES.map((category) => {
          const active = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2.5 rounded-full text-[13.5px] font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                active
                  ? 'bg-[#6153CC] text-white'
                  : 'bg-[#F5F5FA] text-[#565A69] hover:bg-[#EBE9FA] hover:text-[#1F2128]'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Features Grid with loading transition */}
      {isFiltering ? (
        <CardGridSkeleton count={filtered.length || 4} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {filtered.map((feature) => {
            const Icon = ICON_MAP[feature.iconName];
            return (
              <Link
                key={feature.slug}
                to={`/features/${feature.slug}`}
                className="group rounded-[26px] border border-[#EBEBF3] bg-white p-6 sm:p-8 flex flex-col justify-between gap-7 hover:border-[#6153CC]/50 hover:shadow-[0_14px_34px_rgba(97,83,204,0.08)] transition-all duration-200"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="w-11 h-11 rounded-2xl flex items-center justify-center text-[#4F41B8] shrink-0"
                      style={{ backgroundColor: feature.accentBg }}
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-[13px] font-mono text-[#8B8F9E] tabular-nums">
                      {feature.number}. {feature.category}
                    </span>
                  </div>

                  <h2 className="font-display text-[21px] sm:text-[22px] font-semibold text-[#1F2128] group-hover:text-[#6153CC] transition-colors">
                    {feature.title}
                  </h2>
                  <p className="text-[14.5px] sm:text-[15px] leading-relaxed text-[#6F7382]">
                    {feature.shortDescription}
                  </p>

                  <ul className="pt-2 space-y-2">
                    {feature.capabilities.map((cap) => (
                      <li
                        key={cap.heading}
                        className="flex items-start gap-2.5 text-[14px] text-[#3E414E]"
                      >
                        <Check className="w-4 h-4 text-[#6153CC] mt-0.5 shrink-0" />
                        <span>{cap.heading}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 border-t border-[#F1F1F7] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-5 sm:gap-6">
                    {feature.metrics.slice(0, 2).map((metric) => (
                      <div key={metric.label}>
                        <p className="font-display text-[17px] font-bold text-[#1F2128] tabular-nums">
                          {metric.value}
                        </p>
                        <p className="text-[12px] text-[#7D8190]">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[#6153CC] shrink-0">
                    <span>Inspect</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Interactive Global Routing & Bandwidth Infographic */}
      <NetworkInfographic />

      {/* Comparison Matrix */}
      <section className="pt-2 space-y-6">
        <div className="max-w-[560px]">
          <h2 className="font-display text-[24px] sm:text-[32px] font-bold tracking-tight text-[#1F2128]">
            How Kepripun compares to legacy desktop clients
          </h2>
          <p className="mt-2 text-[15px] text-[#6F7382]">
            Benchmarked on standard fiber and congested 4G mobile hotspots across 14 global regions.
          </p>
        </div>

        <div className="overflow-x-auto rounded-[24px] border border-[#EBEBF3] bg-white">
          <table className="w-full text-left border-collapse min-w-[540px]">
            <thead>
              <tr className="border-b border-[#EFEFF6] bg-[#FAFAFD] text-[13px] font-medium text-[#6F7382]">
                <th className="py-4 px-5 sm:px-6">Capability</th>
                <th className="py-4 px-5 sm:px-6 text-[#4F41B8] font-semibold">Kepripun</th>
                <th className="py-4 px-5 sm:px-6">Legacy Desktop Apps</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F1F7] text-[14px] sm:text-[14.5px]">
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.metric} className="hover:bg-[#FAFAFD]/70 transition-colors">
                  <td className="py-4 px-5 sm:px-6 font-medium text-[#1F2128]">{row.metric}</td>
                  <td className="py-4 px-5 sm:px-6 font-semibold text-[#4F41B8] tabular-nums">
                    {row.kepripun}
                  </td>
                  <td className="py-4 px-5 sm:px-6 text-[#6F7382] tabular-nums">{row.legacy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
