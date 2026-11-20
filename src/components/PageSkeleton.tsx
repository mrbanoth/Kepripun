import { Lock, Shield, Wifi } from 'lucide-react';

export function CardGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      aria-busy="true"
      aria-label="Loading content"
    >
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-[24px] border border-[#EBEBF3] bg-white p-7 space-y-5 animate-pulse"
        >
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-2xl bg-[#EFEFF8]" />
            <div className="w-24 h-3.5 rounded-full bg-[#EFEFF8]" />
          </div>
          <div className="space-y-2.5">
            <div className="w-4/5 h-5 rounded-full bg-[#E8E8F4]" />
            <div className="w-full h-3.5 rounded-full bg-[#F2F2FA]" />
            <div className="w-2/3 h-3.5 rounded-full bg-[#F2F2FA]" />
          </div>
          <div className="pt-4 border-t border-[#F3F3FA] flex items-center justify-between">
            <div className="w-20 h-4 rounded-full bg-[#EFEFF8]" />
            <div className="w-16 h-4 rounded-full bg-[#EFEFF8]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DetailPageSkeleton() {
  return (
    <div
      className="max-w-[1000px] mx-auto px-5 sm:px-8 py-12 sm:py-16 space-y-10 animate-pulse"
      aria-busy="true"
      aria-label="Loading page details"
    >
      <div className="w-36 h-4 rounded-full bg-[#EFEFF8]" />
      <div className="space-y-4 max-w-[680px]">
        <div className="w-28 h-4 rounded-full bg-[#EAE7FC]" />
        <div className="w-full h-10 rounded-2xl bg-[#E8E8F4]" />
        <div className="w-4/5 h-10 rounded-2xl bg-[#E8E8F4]" />
        <div className="w-full h-4 rounded-full bg-[#F2F2FA]" />
        <div className="w-3/4 h-4 rounded-full bg-[#F2F2FA]" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-32 rounded-[22px] border border-[#EBEBF3] bg-[#FAFAFD] p-6 space-y-3"
          >
            <div className="w-24 h-7 rounded-lg bg-[#EAE7FC]" />
            <div className="w-32 h-3.5 rounded-full bg-[#EFEFF8]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function RoomConnectingOverlay({
  roomCode,
  roomTitle,
  stepIndex,
}: {
  roomCode: string;
  roomTitle: string;
  stepIndex: number;
}) {
  const steps = [
    { icon: Wifi, label: 'Selecting lowest-latency edge relay (38 ms)' },
    { icon: Lock, label: 'Negotiating 256-bit MLS encryption keys' },
    { icon: Shield, label: 'Syncing spatial audio & participant tiles' },
  ];

  return (
    <div
      className="h-screen w-full bg-[#151720] text-white flex items-center justify-center p-6"
      role="status"
      aria-live="polite"
    >
      <div className="w-full max-w-[440px] rounded-[28px] border border-white/12 bg-[#1D202D] p-7 sm:p-9 space-y-7 text-center shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-[#6153CC] mx-auto flex items-center justify-center font-display text-[24px] font-bold shadow-lg">
          K
        </div>

        <div className="space-y-1.5">
          <p className="text-[12.5px] font-mono text-[#CFC7FE]">{roomCode}</p>
          <h1 className="font-display text-[22px] font-bold truncate">{roomTitle}</h1>
          <p className="text-[14px] text-white/65">Joining encrypted browser room...</p>
        </div>

        <div className="space-y-3 text-left">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const done = idx < stepIndex;
            const active = idx === stepIndex;
            return (
              <div
                key={step.label}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-200 ${
                  done
                    ? 'border-[#6153CC]/50 bg-[#6153CC]/15 text-white'
                    : active
                      ? 'border-white/20 bg-white/8 text-white'
                      : 'border-white/6 bg-white/[0.02] text-white/40'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    done || active ? 'text-[#CFC7FE]' : 'text-white/35'
                  }`}
                />
                <span className="text-[13.5px]">{step.label}</span>
              </div>
            );
          })}
        </div>

        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#7A6CF0] transition-all duration-300"
            style={{ width: `${Math.min(100, (stepIndex + 1) * 34)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
