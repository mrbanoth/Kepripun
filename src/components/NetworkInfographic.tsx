import { useEffect, useState } from 'react';
import { EDGE_REGION_NODES, NETWORK_PROFILES, NetworkProfile } from '../data/infographics';

interface NetworkInfographicProps {
  compact?: boolean;
}

export function NetworkInfographic({ compact = false }: NetworkInfographicProps) {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('eu-west');
  const [profileId, setProfileId] = useState<NetworkProfile['id']>('wifi');
  const [jitterTick, setJitterTick] = useState(0);

  // Subtle real-time latency & live room count variation every 2.8 seconds
  useEffect(() => {
    const id = window.setInterval(() => {
      setJitterTick((t) => (t + 1) % 6);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  const activeRegion =
    EDGE_REGION_NODES.find((r) => r.id === selectedRegionId) ?? EDGE_REGION_NODES[2];
  const activeProfile =
    NETWORK_PROFILES.find((p) => p.id === profileId) ?? NETWORK_PROFILES[1];

  const liveLatency =
    activeRegion.baseLatencyMs +
    activeProfile.kepripunLatencyDelta +
    ((jitterTick % 3) - 1);
  const liveRooms = activeRegion.activeRooms + (jitterTick % 4) * 3;
  const totalActiveRooms =
    EDGE_REGION_NODES.reduce((sum, node) => sum + node.activeRooms, 0) + jitterTick * 5;

  const hubX = 360;
  const hubY = 160;

  return (
    <div className="rounded-[28px] border border-[#E9E9F4] bg-white p-5 sm:p-8 space-y-7">
      {/* Header + Network Condition Selector */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
        <div className="space-y-1.5 max-w-[560px]">
          <p className="text-[13px] font-medium text-[#6153CC]">
            Interactive Architecture Infographic
          </p>
          <h3 className="font-display text-[22px] sm:text-[28px] font-bold tracking-tight text-[#1F2128] leading-snug">
            How Kepripun keeps audio crisp on any connection
          </h3>
          <p className="text-[14.5px] text-[#6F7382]">
            Select a network condition or tap any edge region to inspect live simulcast routing and
            bandwidth resilience.
          </p>
        </div>

        {/* Network Profile Segmented Selector (scrollable on small mobile) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
          {NETWORK_PROFILES.map((profile) => {
            const active = profile.id === profileId;
            return (
              <button
                key={profile.id}
                type="button"
                onClick={() => setProfileId(profile.id)}
                className={`px-3.5 py-2 rounded-full text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#6153CC] text-white'
                    : 'bg-[#F5F5FA] text-[#565A69] hover:bg-[#EAE7FC] hover:text-[#1F2128]'
                }`}
              >
                {profile.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split: Interactive Global Mesh SVG + Adaptive Bandwidth Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Global Edge Mesh Diagram */}
        <div className="lg:col-span-7 rounded-[24px] border border-[#EFEFF6] bg-[#FAFAFE] p-4 sm:p-5 flex flex-col justify-between gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[13px] text-[#6F7382]">
            <span>
              Selected Relay:{' '}
              <strong className="text-[#1F2128]">
                {activeRegion.city}, {activeRegion.country}
              </strong>
            </span>
            <span className="font-mono text-[#4F41B8] tabular-nums">
              {totalActiveRooms.toLocaleString()} active rooms worldwide
            </span>
          </div>

          <div className="relative w-full overflow-hidden rounded-2xl bg-white border border-[#F0F0F8]">
            <svg
              viewBox="0 0 720 290"
              fill="none"
              className="w-full h-auto block"
              role="img"
              aria-label="Global edge media routing infographic across 6 cities"
            >
              {/* Subtle latitude/longitude grid */}
              <g stroke="#F1F1F8" strokeWidth="1">
                <line x1="0" y1="72" x2="720" y2="72" />
                <line x1="0" y1="145" x2="720" y2="145" />
                <line x1="0" y1="218" x2="720" y2="218" />
                <line x1="144" y1="0" x2="144" y2="290" />
                <line x1="288" y1="0" x2="288" y2="290" />
                <line x1="432" y1="0" x2="432" y2="290" />
                <line x1="576" y1="0" x2="576" y2="290" />
              </g>

              {/* Soft stylized continent silhouettes */}
              <path
                d="M72 98 C108 82, 185 88, 224 128 C210 156, 178 166, 162 198 C132 192, 92 160, 72 98Z"
                fill="#F4F3FC"
              />
              <path
                d="M312 80 C366 66, 434 74, 456 112 C442 140, 396 146, 356 142 C328 134, 306 112, 312 80Z"
                fill="#F4F3FC"
              />
              <path
                d="M472 138 C530 116, 616 118, 654 158 C640 198, 578 214, 520 206 C486 198, 464 166, 472 138Z"
                fill="#F4F3FC"
              />

              {/* Encrypted routing curves from every node to central MLS mesh hub */}
              {EDGE_REGION_NODES.map((node) => {
                const isSelected = node.id === activeRegion.id;
                const ctrlX = (node.x + hubX) / 2;
                const ctrlY = Math.min(node.y, hubY) - 26;
                return (
                  <path
                    key={`path-${node.id}`}
                    d={`M ${node.x} ${node.y} Q ${ctrlX} ${ctrlY} ${hubX} ${hubY}`}
                    stroke={isSelected ? '#6153CC' : '#D5D0F5'}
                    strokeWidth={isSelected ? 2.6 : 1.5}
                    strokeDasharray={isSelected ? 'none' : '5 5'}
                  />
                );
              })}

              {/* Center Kepripun MLS Mesh Hub */}
              <g transform={`translate(${hubX - 22}, ${hubY - 22})`}>
                <rect width="44" height="44" rx="14" fill="#6153CC" />
                <text
                  x="22"
                  y="28"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="16"
                  fontWeight="700"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                >
                  K
                </text>
              </g>

              {/* Clickable City Nodes */}
              {EDGE_REGION_NODES.map((node) => {
                const isSelected = node.id === activeRegion.id;
                return (
                  <g
                    key={node.id}
                    onClick={() => setSelectedRegionId(node.id)}
                    className="cursor-pointer"
                  >
                    {isSelected && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="20"
                        fill="#6153CC"
                        fillOpacity="0.14"
                      />
                    )}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isSelected ? 11 : 8.5}
                      fill={isSelected ? '#6153CC' : node.tileBg}
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                    />
                    <text
                      x={node.x}
                      y={node.y + 25}
                      textAnchor="middle"
                      fill={isSelected ? '#1F2128' : '#5F6373'}
                      fontSize="11.5"
                      fontWeight={isSelected ? '700' : '500'}
                      fontFamily="DM Sans, sans-serif"
                    >
                      {node.city}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Selected Region Live Stats */}
          <div className="grid grid-cols-3 gap-3 pt-1">
            <div className="rounded-2xl bg-white border border-[#EFEFF6] px-3.5 py-3">
              <p className="text-[11.5px] text-[#7D8190]">Live RTT Latency</p>
              <p className="font-display text-[19px] sm:text-[21px] font-bold text-[#6153CC] tabular-nums mt-0.5">
                {liveLatency} ms
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-[#EFEFF6] px-3.5 py-3">
              <p className="text-[11.5px] text-[#7D8190]">Regional Rooms</p>
              <p className="font-display text-[19px] sm:text-[21px] font-bold text-[#1F2128] tabular-nums mt-0.5">
                {liveRooms}
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-[#EFEFF6] px-3.5 py-3">
              <p className="text-[11.5px] text-[#7D8190]">Active Codec</p>
              <p className="font-display text-[17px] sm:text-[19px] font-bold text-[#1F2128] mt-0.5 truncate">
                {activeRegion.codec}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Adaptive Bandwidth Resilience Breakdown */}
        <div className="lg:col-span-5 rounded-[24px] border border-[#EFEFF6] bg-[#FAFAFE] p-5 sm:p-6 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-baseline justify-between gap-3">
              <h4 className="font-display text-[17px] font-semibold text-[#1F2128]">
                {activeProfile.label} Benchmark
              </h4>
              <span className="font-mono text-[12.5px] text-[#6153CC] tabular-nums">
                {activeProfile.bandwidthLabel}
              </span>
            </div>

            {/* Visual Continuity Bars */}
            <div className="space-y-4 pt-1">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-semibold text-[#1F2128]">Kepripun Adaptive Simulcast</span>
                  <span className="font-mono font-semibold text-[#6153CC] tabular-nums">
                    {activeProfile.kepripunScore}% clarity
                  </span>
                </div>
                <div className="h-3.5 rounded-full bg-[#EAE9F5] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#6153CC] transition-all duration-300"
                    style={{ width: `${activeProfile.kepripunScore}%` }}
                  />
                </div>
                <p className="text-[12.5px] text-[#565A69]">
                  {activeProfile.kepripunResolution} · {activeProfile.kepripunAudio}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-medium text-[#6F7382]">Legacy Desktop Apps</span>
                  <span className="font-mono text-[#7D8190] tabular-nums">
                    {activeProfile.legacyScore}% clarity
                  </span>
                </div>
                <div className="h-3.5 rounded-full bg-[#EAE9F5] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#B4B7C7] transition-all duration-300"
                    style={{ width: `${activeProfile.legacyScore}%` }}
                  />
                </div>
                <p className="text-[12.5px] text-[#7D8190]">
                  {activeProfile.legacyResolution} · {activeProfile.legacyStatus}
                </p>
              </div>
            </div>
          </div>

          {!compact && (
            <div className="pt-5 border-t border-[#EAEAF3] space-y-3">
              <p className="text-[12.5px] font-medium text-[#565A69]">
                Bitrate Allocation Priority ({activeProfile.kbps.toLocaleString()} kbps budget)
              </p>
              <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
                <div
                  className="bg-[#6153CC]"
                  style={{ width: activeProfile.id === 'flight' ? '42%' : '18%' }}
                  title="Voice Priority Lane"
                />
                <div
                  className="bg-[#13B7DD]"
                  style={{ width: activeProfile.id === 'flight' ? '36%' : '62%' }}
                  title="Adaptive Video Layers"
                />
                <div
                  className="bg-[#FAD4B4]"
                  style={{ width: activeProfile.id === 'flight' ? '22%' : '20%' }}
                  title="Forward Error Correction & MLS"
                />
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-[#6F7382]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#6153CC]" />
                  Voice Lock
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#13B7DD]" />
                  Adaptive Video
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#FAD4B4]" />
                  FEC + Encryption
                </span>
              </div>
              <p className="text-[12.5px] text-[#4F41B8] font-medium">
                {activeProfile.kepripunPacketRecovery}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
