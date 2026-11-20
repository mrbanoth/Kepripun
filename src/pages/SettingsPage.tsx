import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Loader2, Lock, Mic, Shield, User, Video } from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';
import { HERO_PARTICIPANTS } from '../data';
import { SafeImage } from '../components/SafeImage';

const STUDIO_SWATCHES = ['#FAD4B4', '#D2B8F7', '#A7D8F5', '#E8E9F2'];

export function SettingsPage() {
  const { user, preferences, updateProfile, updatePreferences, login } = useWorkspace();

  const [name, setName] = useState(user?.name ?? 'Clara Morales');
  const [role, setRole] = useState(user?.role ?? 'Head of Product');
  const [personalRoom, setPersonalRoom] = useState(user?.personalRoomCode ?? 'kpr-clara-room');
  const [saving, setSaving] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    window.setTimeout(() => {
      if (!user) {
        login('clara@kepripun.app', name);
      }
      updateProfile({
        name: name.trim() || 'Clara Morales',
        role: role.trim() || 'Workspace Member',
        personalRoomCode:
          personalRoom
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9-]+/g, '-') || 'kpr-my-room',
      });
      setSaving(false);
      setSavedToast(true);
      window.setTimeout(() => setSavedToast(false), 2200);
    }, 320);
  };

  return (
    <div className="max-w-[920px] mx-auto px-5 sm:px-8 py-12 sm:py-16 space-y-10">
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#6F7382] hover:text-[#6153CC] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Workspace</span>
        </Link>
        {savedToast && (
          <span className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[#4F41B8]">
            <Check className="w-4 h-4" />
            <span>Preferences saved</span>
          </span>
        )}
      </div>

      <header className="space-y-2">
        <p className="text-[13.5px] font-medium text-[#6153CC]">Workspace Settings</p>
        <h1 className="font-display text-[32px] sm:text-[40px] font-bold tracking-tight text-[#1F2128]">
          Profile, Audio & Room Defaults
        </h1>
        <p className="text-[15.5px] text-[#6F7382]">
          Changes apply automatically the next time you enter a Pre-Join Green Room or Live Call.
        </p>
      </header>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Profile Section */}
        <section className="rounded-[26px] border border-[#EBEBF3] bg-white p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2.5">
            <User className="w-5 h-5 text-[#6153CC]" />
            <h2 className="font-display text-[19px] font-semibold text-[#1F2128]">
              Identity & Personal Room
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5 pb-4 border-b border-[#F1F1F7]">
            <SafeImage
              src={user?.avatar ?? HERO_PARTICIPANTS[3].avatar}
              alt={name}
              fallbackBg={preferences.defaultTileBg}
              className="w-16 h-16 rounded-[20px] object-cover shrink-0"
            />
            <div className="space-y-2">
              <p className="text-[13.5px] font-medium text-[#1F2128]">Default studio tile tint</p>
              <div className="flex items-center gap-2.5">
                {STUDIO_SWATCHES.map((swatch) => (
                  <button
                    key={swatch}
                    type="button"
                    onClick={() => updatePreferences({ defaultTileBg: swatch })}
                    aria-label={`Select backdrop color ${swatch}`}
                    className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                      preferences.defaultTileBg === swatch
                        ? 'border-[#6153CC] scale-110'
                        : 'border-white shadow-sm hover:scale-105'
                    }`}
                    style={{ backgroundColor: swatch }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="set-name" className="text-[13.5px] font-medium text-[#1F2128]">
                Display name
              </label>
              <input
                id="set-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-[#E4E4F0] text-[14.5px] focus:outline-none focus:border-[#6153CC] focus:ring-4 focus:ring-[#6153CC]/10"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="set-role" className="text-[13.5px] font-medium text-[#1F2128]">
                Role / Title
              </label>
              <input
                id="set-role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-[#E4E4F0] text-[14.5px] focus:outline-none focus:border-[#6153CC] focus:ring-4 focus:ring-[#6153CC]/10"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="set-room" className="text-[13.5px] font-medium text-[#1F2128]">
              Personal permanent room slug
            </label>
            <div className="flex items-center rounded-2xl border border-[#E4E4F0] overflow-hidden focus-within:border-[#6153CC] focus-within:ring-4 focus-within:ring-[#6153CC]/10">
              <span className="px-4 py-3 bg-[#FAFAFD] text-[13.5px] font-mono text-[#7D8190] border-r border-[#EBEBF3] shrink-0">
                kepripun.app/meeting/
              </span>
              <input
                id="set-room"
                type="text"
                value={personalRoom}
                onChange={(e) => setPersonalRoom(e.target.value)}
                className="flex-1 min-w-0 px-3.5 py-3 font-mono text-[13.5px] text-[#1F2128] focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Audio, Video & Security Defaults */}
        <section className="rounded-[26px] border border-[#EBEBF3] bg-white p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2.5">
            <Mic className="w-5 h-5 text-[#6153CC]" />
            <h2 className="font-display text-[19px] font-semibold text-[#1F2128]">
              Media & Security Defaults
            </h2>
          </div>

          <div className="divide-y divide-[#F1F1F7]">
            <label className="py-4 flex items-center justify-between gap-4 cursor-pointer">
              <div>
                <p className="text-[15px] font-medium text-[#1F2128]">
                  Spatial 48 kHz studio audio & noise isolation
                </p>
                <p className="text-[13.5px] text-[#6F7382]">
                  Runs locally via WebAssembly to filter keyboards and ambient room noise.
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences.spatialAudio}
                onChange={(e) => updatePreferences({ spatialAudio: e.target.checked })}
                className="w-5 h-5 accent-[#6153CC] shrink-0"
              />
            </label>

            <label className="py-4 flex items-center justify-between gap-4 cursor-pointer">
              <div>
                <p className="text-[15px] font-medium text-[#1F2128]">
                  Enable live closed captions automatically
                </p>
                <p className="text-[13.5px] text-[#6F7382]">
                  Show speaker-attributed real-time captions on every room you join.
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences.autoCaptions}
                onChange={(e) => updatePreferences({ autoCaptions: e.target.checked })}
                className="w-5 h-5 accent-[#6153CC] shrink-0"
              />
            </label>

            <label className="py-4 flex items-center justify-between gap-4 cursor-pointer">
              <div className="flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-[#6153CC] mt-1 shrink-0" />
                <div>
                  <p className="text-[15px] font-medium text-[#1F2128]">
                    Default rooms to end-to-end encryption
                  </p>
                  <p className="text-[13.5px] text-[#6F7382]">
                    Negotiates client-side MLS encryption keys for every new room link.
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences.defaultEncrypted}
                onChange={(e) => updatePreferences({ defaultEncrypted: e.target.checked })}
                className="w-5 h-5 accent-[#6153CC] shrink-0"
              />
            </label>

            <label className="py-4 flex items-center justify-between gap-4 cursor-pointer">
              <div className="flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-[#6153CC] mt-1 shrink-0" />
                <div>
                  <p className="text-[15px] font-medium text-[#1F2128]">
                    Start with microphone muted in large rooms
                  </p>
                  <p className="text-[13.5px] text-[#6F7382]">
                    Automatically joins muted when more than 4 teammates are already present.
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences.joinMuted}
                onChange={(e) => updatePreferences({ joinMuted: e.target.checked })}
                className="w-5 h-5 accent-[#6153CC] shrink-0"
              />
            </label>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/meeting/new"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[#6153CC] hover:text-[#4F41B8]"
          >
            <Video className="w-4 h-4" />
            <span>Test preferences in Pre-Join Room</span>
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#6153CC] text-white text-[14.5px] font-semibold hover:bg-[#4F41B8] disabled:opacity-70 transition-colors cursor-pointer"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{saving ? 'Saving preferences...' : 'Save settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
