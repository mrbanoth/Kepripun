import { Link } from 'react-router-dom';
import { FOOTER_COLUMNS } from '../data';
import { BrandLogo } from './BrandLogo';

export function Footer() {
  return (
    <footer className="bg-[#FAFAFC] border-t border-[#ECECF4]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#ECECF4]">
          <div className="md:col-span-4 space-y-4">
            <BrandLogo size="sm" />
            <p className="text-[14.5px] leading-relaxed text-[#6F7382] max-w-[300px]">
              Distance doesn&apos;t matter, it&apos;s the meeting that matters the most. Fast,
              encrypted browser video rooms crafted for distributed teams.
            </p>
            <p className="text-[13px] text-[#8B8F9E]">
              SOC 2 Type II · GDPR · 28 Global Edge Media Regions
            </p>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.heading} className="space-y-3.5">
                <h3 className="font-display text-[13.5px] font-semibold text-[#1F2128]">
                  {col.heading}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((item) => (
                    <li key={item.to + item.label}>
                      <Link
                        to={item.to}
                        className="text-[14px] text-[#6F7382] hover:text-[#6153CC] transition-colors duration-150"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[13px] text-[#8B8F9E]">
          <p>© {new Date().getFullYear()} Kepripun Communications Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/features/zero-knowledge-encryption" className="hover:text-[#1F2128] transition-colors">
              Security
            </Link>
            <Link to="/pricing" className="hover:text-[#1F2128] transition-colors">
              Plans
            </Link>
            <Link to="/community" className="hover:text-[#1F2128] transition-colors">
              Community
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
