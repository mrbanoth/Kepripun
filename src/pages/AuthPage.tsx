import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Loader2, Lock } from 'lucide-react';
import { HERO_PARTICIPANTS } from '../data';
import { useWorkspace } from '../context/WorkspaceContext';
import { SafeImage } from '../components/SafeImage';

interface AuthPageProps {
  mode: 'login' | 'signup';
}

export function AuthPage({ mode }: AuthPageProps) {
  const isSignup = mode === 'signup';
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useWorkspace();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const redirectTo =
    (location.state as { from?: string } | null)?.from &&
    (location.state as { from?: string }).from !== '/login'
      ? (location.state as { from?: string }).from!
      : '/dashboard';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || email.trim().length < 5) {
      setError('Please enter a valid work or personal email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setError(null);
    setSubmitting(true);
    window.setTimeout(() => {
      login(email, isSignup ? name : undefined);
      setSubmitting(false);
      navigate(redirectTo);
    }, 300);
  };

  const handleDemoLogin = () => {
    setSubmitting(true);
    window.setTimeout(() => {
      login('clara@kepripun.app', 'Clara Morales');
      setSubmitting(false);
      navigate('/dashboard');
    }, 240);
  };

  return (
    <div className="max-w-[1040px] mx-auto px-4 sm:px-8 py-10 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 items-stretch">
        {/* Left Auth Form */}
        <div className="lg:col-span-6 rounded-[28px] border border-[#EBEBF3] bg-white p-6 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-[13.5px] font-medium text-[#6153CC]">
                {isSignup ? 'Create free workspace' : 'Sign in to Kepripun'}
              </p>
              <h1 className="font-display text-[28px] sm:text-[34px] font-bold tracking-tight text-[#1F2128]">
                {isSignup ? 'Start meeting without a hitch' : 'Welcome back'}
              </h1>
              <p className="text-[14.5px] text-[#6F7382]">
                {isSignup
                  ? 'Reserve your permanent room URL and sync team schedules in seconds.'
                  : 'Access your scheduled rooms, cloud recordings, and saved playbooks.'}
              </p>
            </div>

            <button
              type="button"
              disabled={submitting}
              onClick={handleDemoLogin}
              className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-5 rounded-full bg-[#F4F2FF] border border-[#DFDAFA] text-[#4F41B8] text-[14px] font-semibold hover:bg-[#EAE5FF] disabled:opacity-65 transition-colors cursor-pointer"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
              <span>Continue with Demo Workspace (Clara)</span>
            </button>

            <div className="flex items-center gap-3 text-[12.5px] text-[#9A9EAD]">
              <span className="flex-1 h-px bg-[#EFEFF6]" />
              <span>or use email</span>
              <span className="flex-1 h-px bg-[#EFEFF6]" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignup && (
                <div className="space-y-1.5">
                  <label htmlFor="auth-name" className="text-[13.5px] font-medium text-[#1F2128]">
                    Full name
                  </label>
                  <input
                    id="auth-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Clara Morales"
                    className="w-full px-4 py-3 rounded-2xl border border-[#E4E4F0] text-[14.5px] focus:outline-none focus:border-[#6153CC] focus:ring-4 focus:ring-[#6153CC]/10"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="auth-email" className="text-[13.5px] font-medium text-[#1F2128]">
                  Email address
                </label>
                <input
                  id="auth-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-2xl border border-[#E4E4F0] text-[14.5px] focus:outline-none focus:border-[#6153CC] focus:ring-4 focus:ring-[#6153CC]/10"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="auth-password" className="text-[13.5px] font-medium text-[#1F2128]">
                  Password
                </label>
                <input
                  id="auth-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-4 py-3 rounded-2xl border border-[#E4E4F0] text-[14.5px] focus:outline-none focus:border-[#6153CC] focus:ring-4 focus:ring-[#6153CC]/10"
                />
              </div>

              {error && <p className="text-[13.5px] text-rose-600">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#6153CC] text-white text-[15px] font-semibold hover:bg-[#4F41B8] disabled:opacity-75 transition-colors cursor-pointer"
              >
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>
                  {submitting
                    ? isSignup
                      ? 'Creating workspace...'
                      : 'Signing in...'
                    : isSignup
                      ? 'Create free account'
                      : 'Sign in'}
                </span>
              </button>
            </form>
          </div>

          <p className="text-[14px] text-[#6F7382] text-center pt-2">
            {isSignup ? (
              <>
                Already have a workspace?{' '}
                <Link to="/login" className="font-semibold text-[#6153CC] hover:underline">
                  Log in
                </Link>
              </>
            ) : (
              <>
                New to Kepripun?{' '}
                <Link to="/signup" className="font-semibold text-[#6153CC] hover:underline">
                  Create a free account
                </Link>
              </>
            )}
          </p>
        </div>

        {/* Right Visual Proof Panel */}
        <div className="lg:col-span-6 rounded-[28px] bg-[#6153CC] text-white p-7 sm:p-10 flex flex-col justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-[13px] text-white/80">
              <Lock className="w-4 h-4 text-[#CFC7FE]" />
              <span>End-to-end encrypted browser rooms</span>
            </div>
            <h2 className="font-display text-[25px] sm:text-[32px] font-bold leading-snug">
              Distance doesn&apos;t matter, it&apos;s the meeting that matters the most.
            </h2>
            <ul className="space-y-2.5 pt-2 text-[14.5px] text-white/90">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#CFC7FE] shrink-0" />
                <span>Join rooms in 1.8 seconds with zero desktop downloads</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#CFC7FE] shrink-0" />
                <span>48 kHz spatial audio with local noise isolation</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#CFC7FE] shrink-0" />
                <span>Automatic transcripts and action items for async teams</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
            {HERO_PARTICIPANTS.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="aspect-square rounded-[18px] sm:rounded-[20px] overflow-hidden border-2 border-white/20"
                style={{ backgroundColor: p.tileBg }}
              >
                <SafeImage
                  src={p.avatar}
                  alt={p.name}
                  fallbackBg={p.tileBg}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
