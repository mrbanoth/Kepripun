import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bookmark,
  Calendar,
  Check,
  Search,
  Video,
} from 'lucide-react';
import {
  COMMUNITY_AMBASSADORS,
  COMMUNITY_CATEGORIES,
  COMMUNITY_POSTS,
  CommunityCategory,
} from '../data';
import { useWorkspace } from '../context/WorkspaceContext';
import { CardGridSkeleton } from '../components/PageSkeleton';
import { SafeImage } from '../components/SafeImage';

export function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | CommunityCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingList, setIsLoadingList] = useState(false);
  const { rsvpedEvents, toggleEventRsvp, bookmarkedPosts, toggleBookmarkPost } = useWorkspace();

  useEffect(() => {
    setIsLoadingList(true);
    const t = window.setTimeout(() => setIsLoadingList(false), 180);
    return () => window.clearTimeout(t);
  }, [selectedCategory]);

  const featuredEvent = COMMUNITY_POSTS.find((p) => p.category === 'Events')!;
  const isEventRsvped = rsvpedEvents.includes(featuredEvent.slug);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return COMMUNITY_POSTS.filter((post) => {
      const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.author.name.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-12 sm:py-20 space-y-14 sm:space-y-16">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-7">
        <div className="max-w-[620px] space-y-3.5">
          <p className="text-[13.5px] font-medium text-[#6153CC]">Kepripun Community</p>
          <h1 className="font-display text-[34px] sm:text-[48px] font-bold tracking-tight text-[#1F2128] leading-[1.12] [text-wrap:balance]">
            Playbooks, live rooms, and stories from distributed teams.
          </h1>
          <p className="text-[15.5px] sm:text-[16px] leading-relaxed text-[#6F7382]">
            Learn how product managers, engineers, educators, and designers run calmer, higher-trust
            meetings across every time zone.
          </p>
        </div>

        <div className="w-full lg:w-[320px]">
          <label htmlFor="community-search" className="sr-only">
            Search guides, templates, and events
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-[#8B8F9E] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              id="community-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, events, authors..."
              className="w-full pl-11 pr-4 py-3 rounded-full border border-[#E5E5F0] bg-white text-[14px] text-[#1F2128] placeholder:text-[#9A9EAD] focus:outline-none focus:border-[#6153CC] focus:ring-4 focus:ring-[#6153CC]/10 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Featured Upcoming Live Event */}
      {featuredEvent.eventDetails && (
        <section className="rounded-[26px] sm:rounded-[28px] border border-[#E5E2F8] bg-[#F7F6FF] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#5A5E6E]">
              <span className="font-semibold text-[#6153CC]">Upcoming Live Session</span>
              <span aria-hidden="true">·</span>
              <span>{featuredEvent.eventDetails.dateLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{featuredEvent.eventDetails.timeLabel}</span>
            </div>
            <h2 className="font-display text-[23px] sm:text-[30px] font-bold text-[#1F2128] leading-snug">
              <Link
                to={`/community/${featuredEvent.slug}`}
                className="hover:text-[#6153CC] transition-colors"
              >
                {featuredEvent.title}
              </Link>
            </h2>
            <p className="text-[14.5px] sm:text-[15px] leading-relaxed text-[#565A69] max-w-[600px]">
              {featuredEvent.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => toggleEventRsvp(featuredEvent.slug)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-medium transition-colors cursor-pointer ${
                  isEventRsvped
                    ? 'bg-[#1F2128] text-white hover:bg-[#343744]'
                    : 'bg-[#6153CC] text-white hover:bg-[#4F41B8]'
                }`}
              >
                {isEventRsvped ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Spot reserved ({featuredEvent.eventDetails.attendeeCount + 1})</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Reserve free spot ({featuredEvent.eventDetails.attendeeCount})</span>
                  </>
                )}
              </button>
              <Link
                to={`/meeting/${featuredEvent.eventDetails.roomCode}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#6153CC]/35 bg-white text-[#4F41B8] text-[14px] font-medium hover:border-[#6153CC] transition-colors"
              >
                <Video className="w-4 h-4" />
                <span>Preview event room</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 flex items-center gap-4 lg:justify-end">
            <SafeImage
              src={featuredEvent.author.avatar}
              alt={featuredEvent.author.name}
              fallbackBg={featuredEvent.author.tileBg}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-[20px] sm:rounded-[22px] object-cover shrink-0"
            />
            <div>
              <p className="text-[12.5px] text-[#7D8190]">Hosted by</p>
              <p className="font-display text-[16px] font-semibold text-[#1F2128]">
                {featuredEvent.author.name}
              </p>
              <p className="text-[13.5px] text-[#6F7382]">{featuredEvent.author.role}</p>
            </div>
          </div>
        </section>
      )}

      {/* Horizontally scrollable filter tabs on mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFEFF6] pb-5">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          {COMMUNITY_CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-[13.5px] font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
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

        <p className="text-[13.5px] text-[#7D8190] tabular-nums shrink-0">
          Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
        </p>
      </div>

      {/* Posts Grid with skeleton loading */}
      {isLoadingList ? (
        <CardGridSkeleton count={3} />
      ) : filteredPosts.length === 0 ? (
        <div className="rounded-[24px] border border-[#EBEBF3] bg-[#FAFAFD] p-10 sm:p-12 text-center space-y-3">
          <p className="font-display text-[18px] font-semibold text-[#1F2128]">
            No matching community posts
          </p>
          <p className="text-[14.5px] text-[#6F7382]">
            Try clearing your search filter or browsing all categories.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-2 px-5 py-2.5 rounded-full bg-[#6153CC] text-white text-[13.5px] font-medium hover:bg-[#4F41B8] cursor-pointer"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredPosts.map((post) => {
            const saved = bookmarkedPosts.includes(post.slug);
            return (
              <article
                key={post.slug}
                className="rounded-[24px] border border-[#EBEBF3] bg-white p-6 sm:p-7 flex flex-col justify-between gap-6 hover:border-[#6153CC]/45 hover:shadow-[0_12px_30px_rgba(97,83,204,0.07)] transition-all duration-200"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-[12.5px] text-[#7D8190] min-w-0">
                      <span className="font-medium text-[#6153CC] shrink-0">{post.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{post.readTime}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleBookmarkPost(post.slug)}
                      aria-label={saved ? 'Remove bookmark' : 'Bookmark article'}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                        saved
                          ? 'bg-[#F4F2FF] text-[#6153CC]'
                          : 'text-[#8B8F9E] hover:bg-[#F5F5FA] hover:text-[#1F2128]'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${saved ? 'fill-[#6153CC]' : ''}`} />
                    </button>
                  </div>

                  <h3 className="font-display text-[19px] sm:text-[19.5px] font-semibold text-[#1F2128] leading-snug">
                    <Link
                      to={`/community/${post.slug}`}
                      className="hover:text-[#6153CC] transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-[14.5px] leading-relaxed text-[#6F7382]">{post.excerpt}</p>
                </div>

                <div className="pt-4 border-t border-[#F1F1F7] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <SafeImage
                      src={post.author.avatar}
                      alt={post.author.name}
                      fallbackBg={post.author.tileBg}
                      className="w-8 h-8 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium text-[#1F2128] truncate">
                        {post.author.name}
                      </p>
                      <p className="text-[11.5px] text-[#8B8F9E]">{post.publishedAt}</p>
                    </div>
                  </div>
                  <Link
                    to={`/community/${post.slug}`}
                    className="inline-flex items-center gap-1 text-[13px] font-medium text-[#6153CC] hover:text-[#4F41B8] shrink-0"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Community Ambassadors */}
      <section className="pt-6 border-t border-[#EFEFF6] space-y-6">
        <div className="max-w-[520px]">
          <h2 className="font-display text-[24px] sm:text-[28px] font-bold text-[#1F2128]">
            Community hosts & contributors
          </h2>
          <p className="mt-1.5 text-[14.5px] text-[#6F7382]">
            Engineers, researchers, and product facilitators hosting open office hours every week.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {COMMUNITY_AMBASSADORS.map((person) => (
            <div
              key={person.name}
              className="rounded-[22px] border border-[#EBEBF3] bg-white p-5 flex items-center gap-4"
            >
              <SafeImage
                src={person.avatar}
                alt={person.name}
                fallbackBg={person.tileBg}
                className="w-14 h-14 rounded-2xl object-cover shrink-0"
              />
              <div className="min-w-0">
                <p className="font-display text-[15px] font-semibold text-[#1F2128] truncate">
                  {person.name}
                </p>
                <p className="text-[13px] text-[#6F7382] truncate">{person.role}</p>
                <p className="text-[12px] text-[#8B8F9E] mt-0.5">{person.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
