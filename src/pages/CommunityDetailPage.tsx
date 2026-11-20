import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Calendar,
  Check,
  Copy,
  MessageSquare,
  Send,
  ThumbsUp,
  Video,
} from 'lucide-react';
import { COMMUNITY_POSTS, CommunityComment, HERO_PARTICIPANTS } from '../data';
import { useWorkspace } from '../context/WorkspaceContext';
import { DetailPageSkeleton } from '../components/PageSkeleton';
import { SafeImage } from '../components/SafeImage';

export function CommunityDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = COMMUNITY_POSTS.find((p) => p.slug === slug);
  const { user, rsvpedEvents, toggleEventRsvp, bookmarkedPosts, toggleBookmarkPost } =
    useWorkspace();

  const [loading, setLoading] = useState(true);
  const [readProgress, setReadProgress] = useState(0);
  const [comments, setComments] = useState<CommunityComment[]>(
    () => post?.initialComments ?? []
  );
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});
  const [commentText, setCommentText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setLoading(true);
    setComments(post?.initialComments ?? []);
    setCommentText('');
    const t = window.setTimeout(() => setLoading(false), 200);
    return () => window.clearTimeout(t);
  }, [slug, post]);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        setReadProgress(0);
        return;
      }
      setReadProgress(Math.min(100, Math.round((window.scrollY / scrollable) * 100)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (loading) {
    return <DetailPageSkeleton />;
  }

  if (!post) {
    return (
      <div className="max-w-[780px] mx-auto px-5 sm:px-8 py-24 text-center space-y-5">
        <h1 className="font-display text-[32px] font-bold text-[#1F2128]">
          Community post not found
        </h1>
        <p className="text-[#6F7382]">
          The story or workshop you looked for could not be found.
        </p>
        <Link
          to="/community"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6153CC] text-white text-[14px] font-medium hover:bg-[#4F41B8]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Community Hub</span>
        </Link>
      </div>
    );
  }

  const isSaved = bookmarkedPosts.includes(post.slug);
  const isRsvped = rsvpedEvents.includes(post.slug);
  const related = COMMUNITY_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    setCopiedLink(true);
    window.setTimeout(() => setCopiedLink(false), 1800);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    const text = commentText.trim();
    if (!text) return;
    const newComment: CommunityComment = {
      id: `c-${Date.now()}`,
      author: user?.name ?? 'Guest Contributor',
      role: user?.role ?? 'Community Member',
      avatar: user?.avatar ?? HERO_PARTICIPANTS[4].avatar,
      date: 'Just now',
      body: text,
    };
    setComments((prev) => [...prev, newComment]);
    setCommentText('');
  };

  return (
    <>
      {/* Subtle Top Reading Progress Bar */}
      <div className="fixed top-[64px] sm:top-[72px] left-0 right-0 h-[2.5px] bg-transparent z-30 pointer-events-none">
        <div
          className="h-full bg-[#6153CC] transition-all duration-150"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <article className="max-w-[840px] mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center justify-between gap-4">
          <Link
            to="/community"
            className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[#6F7382] hover:text-[#6153CC] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Community</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#E5E5F0] text-[13px] font-medium text-[#4C505E] hover:border-[#6153CC] hover:text-[#6153CC] transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link copied' : 'Share'}</span>
            </button>
            <button
              type="button"
              onClick={() => toggleBookmarkPost(post.slug)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-[13px] font-medium transition-colors cursor-pointer ${
                isSaved
                  ? 'border-[#6153CC] bg-[#F4F2FF] text-[#6153CC]'
                  : 'border-[#E5E5F0] text-[#4C505E] hover:border-[#6153CC]'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#6153CC]' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </nav>

        {/* Post Header */}
        <header className="space-y-5 pb-8 border-b border-[#EFEFF6]">
          <div className="flex flex-wrap items-center gap-2 text-[13.5px] text-[#7D8190]">
            <span className="font-semibold text-[#6153CC]">{post.category}</span>
            <span aria-hidden="true">·</span>
            <span>{post.publishedAt}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="font-display text-[30px] sm:text-[42px] font-bold tracking-tight text-[#1F2128] leading-[1.15] [text-wrap:balance]">
            {post.title}
          </h1>
          <p className="text-[16px] sm:text-[17px] leading-relaxed text-[#565A69]">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-3.5 pt-2">
            <SafeImage
              src={post.author.avatar}
              alt={post.author.name}
              fallbackBg={post.author.tileBg}
              className="w-12 h-12 rounded-2xl object-cover shrink-0"
            />
            <div>
              <p className="font-display text-[15px] font-semibold text-[#1F2128]">
                {post.author.name}
              </p>
              <p className="text-[13.5px] text-[#6F7382]">{post.author.role}</p>
            </div>
          </div>
        </header>

        {/* Event Action Card if Event */}
        {post.eventDetails && (
          <div className="rounded-[24px] border border-[#E2DDFB] bg-[#F7F6FF] p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-1">
              <p className="font-display text-[16px] font-semibold text-[#1F2128]">
                {post.eventDetails.dateLabel}
              </p>
              <p className="text-[14px] text-[#565A69]">
                {post.eventDetails.timeLabel} · Room code{' '}
                <span className="font-mono text-[#4F41B8]">{post.eventDetails.roomCode}</span>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => toggleEventRsvp(post.slug)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-medium cursor-pointer transition-colors ${
                  isRsvped
                    ? 'bg-[#1F2128] text-white'
                    : 'bg-[#6153CC] text-white hover:bg-[#4F41B8]'
                }`}
              >
                {isRsvped ? <Check className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
                <span>{isRsvped ? 'RSVP Confirmed' : 'Reserve Spot'}</span>
              </button>
              <Link
                to={`/meeting/${post.eventDetails.roomCode}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#6153CC]/35 bg-white text-[#4F41B8] text-[14px] font-medium hover:border-[#6153CC]"
              >
                <Video className="w-4 h-4" />
                <span>Join Room</span>
              </Link>
            </div>
          </div>
        )}

        {/* Key Highlights */}
        <section className="rounded-[24px] border border-[#EBEBF3] bg-[#FAFAFD] p-5 sm:p-7 space-y-3.5">
          <h2 className="font-display text-[16px] font-semibold text-[#1F2128]">Key Takeaways</h2>
          <ul className="space-y-2.5">
            {post.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[14.5px] text-[#3E414E]">
                <Check className="w-4 h-4 text-[#6153CC] mt-1 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Editorial Body Sections */}
        <div className="space-y-8">
          {post.sections.map((section) => (
            <section key={section.heading} className="space-y-3.5">
              <h2 className="font-display text-[22px] sm:text-[23px] font-bold text-[#1F2128]">
                {section.heading}
              </h2>
              {section.paragraphs.map((para, i) => (
                <p key={i} className="text-[15.5px] sm:text-[16px] leading-[1.78] text-[#3E414E]">
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>

        {/* Discussion & Live Comments */}
        <section className="pt-10 border-t border-[#EFEFF6] space-y-6">
          <div className="flex items-center gap-2.5">
            <MessageSquare className="w-5 h-5 text-[#6153CC]" />
            <h2 className="font-display text-[21px] font-bold text-[#1F2128]">
              Discussion ({comments.length})
            </h2>
          </div>

          <form onSubmit={handleAddComment} className="space-y-3">
            <label htmlFor="community-comment" className="sr-only">
              Add your perspective to the discussion
            </label>
            <textarea
              id="community-comment"
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Share a tip, question, or how your team runs this ritual..."
              className="w-full rounded-[20px] border border-[#E5E5F0] bg-white p-4 text-[14.5px] text-[#1F2128] placeholder:text-[#9A9EAD] focus:outline-none focus:border-[#6153CC] focus:ring-4 focus:ring-[#6153CC]/10 transition-all"
            />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[13px] text-[#7D8190]">
                Posting as{' '}
                <span className="font-medium text-[#1F2128]">
                  {user?.name ?? 'Guest Contributor'}
                </span>
              </p>
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6153CC] text-white text-[13.5px] font-medium hover:bg-[#4F41B8] disabled:opacity-45 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post reply</span>
              </button>
            </div>
          </form>

          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-[14.5px] text-[#7D8190] py-4">
                No replies yet. Start the conversation above.
              </p>
            ) : (
              comments.map((comment) => {
                const liked = !!likedComments[comment.id];
                return (
                  <div
                    key={comment.id}
                    className="rounded-[20px] border border-[#EBEBF3] bg-white p-5 space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <SafeImage
                          src={comment.avatar}
                          alt={comment.author}
                          className="w-9 h-9 rounded-xl object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-[14px] font-semibold text-[#1F2128] truncate">
                            {comment.author}
                          </p>
                          <p className="text-[12px] text-[#8B8F9E] truncate">
                            {comment.role} · {comment.date}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setLikedComments((prev) => ({
                            ...prev,
                            [comment.id]: !liked,
                          }))
                        }
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer shrink-0 ${
                          liked
                            ? 'bg-[#F4F2FF] text-[#6153CC]'
                            : 'text-[#7D8190] hover:bg-[#F5F5FA]'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span className="tabular-nums">{liked ? 'Helpful · 1' : 'Helpful'}</span>
                      </button>
                    </div>
                    <p className="text-[14.5px] leading-relaxed text-[#3E414E] sm:pl-12">
                      {comment.body}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Related Stories */}
        <section className="pt-8 border-t border-[#EFEFF6] space-y-5">
          <h2 className="font-display text-[20px] font-semibold text-[#1F2128]">
            Continue reading
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {related.map((item) => (
              <Link
                key={item.slug}
                to={`/community/${item.slug}`}
                className="group rounded-[20px] border border-[#EBEBF3] bg-white p-6 space-y-2 hover:border-[#6153CC]/50 transition-colors"
              >
                <p className="text-[12.5px] text-[#7D8190]">
                  <span className="text-[#6153CC] font-medium">{item.category}</span> ·{' '}
                  {item.readTime}
                </p>
                <h3 className="font-display text-[17px] font-semibold text-[#1F2128] group-hover:text-[#6153CC] transition-colors">
                  {item.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-[13px] font-medium text-[#6153CC] pt-1">
                  <span>Read article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
