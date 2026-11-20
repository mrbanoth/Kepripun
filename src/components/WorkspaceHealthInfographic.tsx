import { useState } from 'react';
import { WEEKLY_MEETING_HEALTH } from '../data/infographics';

export function WorkspaceHealthInfographic({ roomsCount }: { roomsCount: number }) {
  const [hoveredDay, setHoveredDay] = useState<string>('Wed');

  const totalLive = WEEKLY_MEETING_HEALTH.reduce((s, d) => s + d.liveHours, 0);
  const totalSaved = WEEKLY_MEETING_HEALTH.reduce((s, d) => s + d.asyncSavedHours, 0);
  const activeDay =
    WEEKLY_MEETING_HEALTH.find((d) => d.day === hoveredDay) ?? WEEKLY_MEETING_HEALTH[2];

  const maxHours = 3.6;

  return (
    <section className="rounded-[26px] border border-[#EBEBF3] bg-white p-6 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[13px] font-medium text-[#6153CC]">Weekly Focus Infographic</p>
          <h2 className="font-display text-[20px] sm:text-[22px] font-bold text-[#1F2128]">
            Live meeting time vs. hours reclaimed by async recaps
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[12.5px] text-[#6F7382]">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#6153CC]" />
            Live rooms ({totalLive.toFixed(1)}h)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#A7D8F5]" />
            Saved via transcripts ({totalSaved.toFixed(1)}h)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
        {/* Interactive Column Bar Chart */}
        <div className="lg:col-span-8 grid grid-cols-5 gap-3 sm:gap-5 pt-2">
          {WEEKLY_MEETING_HEALTH.map((item) => {
            const selected = item.day === activeDay.day;
            const liveHeight = Math.round((item.liveHours / maxHours) * 124);
            const savedHeight = Math.round((item.asyncSavedHours / maxHours) * 124);

            return (
              <button
                key={item.day}
                type="button"
                onClick={() => setHoveredDay(item.day)}
                onMouseEnter={() => setHoveredDay(item.day)}
                className={`group flex flex-col items-center gap-2.5 p-2.5 rounded-2xl transition-colors cursor-pointer ${
                  selected ? 'bg-[#F6F5FF]' : 'hover:bg-[#FAFAFD]'
                }`}
              >
                <div className="h-[132px] flex items-end justify-center gap-1.5 w-full">
                  <div
                    className="w-4 sm:w-5 rounded-t-lg bg-[#6153CC] transition-all duration-300"
                    style={{ height: `${liveHeight}px` }}
                    title={`${item.liveHours}h live`}
                  />
                  <div
                    className="w-4 sm:w-5 rounded-t-lg bg-[#A7D8F5] transition-all duration-300"
                    style={{ height: `${savedHeight}px` }}
                    title={`${item.asyncSavedHours}h saved`}
                  />
                </div>
                <span
                  className={`text-[13px] font-medium ${
                    selected ? 'text-[#4F41B8]' : 'text-[#6F7382]'
                  }`}
                >
                  {item.day}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Day Summary */}
        <div className="lg:col-span-4 rounded-[22px] bg-[#FAFAFD] border border-[#EFEFF6] p-5 space-y-3">
          <p className="text-[12.5px] font-medium text-[#6153CC]">
            {activeDay.day} Breakdown · {activeDay.roomsHosted} rooms
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="font-display text-[24px] font-bold text-[#1F2128] tabular-nums">
                {activeDay.liveHours.toFixed(1)}h
              </p>
              <p className="text-[12px] text-[#6F7382]">In live rooms</p>
            </div>
            <div>
              <p className="font-display text-[24px] font-bold text-[#4F41B8] tabular-nums">
                +{activeDay.asyncSavedHours.toFixed(1)}h
              </p>
              <p className="text-[12px] text-[#6F7382]">Reclaimed async</p>
            </div>
          </div>
          <p className="text-[12.5px] text-[#6F7382] pt-2 border-t border-[#ECECF5] tabular-nums">
            {roomsCount} scheduled rooms ready in your workspace queue.
          </p>
        </div>
      </div>
    </section>
  );
}
