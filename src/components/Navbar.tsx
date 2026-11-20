import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { PRIMARY_NAV_LINKS } from '../data';
import { useWorkspace } from '../context/WorkspaceContext';
import { BrandLogo } from './BrandLogo';
import { SafeImage } from './SafeImage';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useWorkspace();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-white/92 backdrop-blur-md border-b border-[#EFEFF5]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-6 sm:gap-8">
        <BrandLogo />

        {/* Desktop Nav + Actions */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-7" aria-label="Main navigation">
            {PRIMARY_NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `text-[14px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 py-1 ${
                    isActive
                      ? 'text-[#1F2128]'
                      : 'text-[#6F7382] hover:text-[#1F2128]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {user && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `text-[14px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 py-1 ${
                    isActive
                      ? 'text-[#6153CC]'
                      : 'text-[#6F7382] hover:text-[#1F2128]'
                  }`
                }
              >
                Workspace
              </NavLink>
            )}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/meeting/new"
              className="px-5 py-2.5 rounded-full bg-[#6153CC] text-white text-[13.5px] font-medium whitespace-nowrap shrink-0 hover:bg-[#4F41B8] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6153CC] focus-visible:ring-offset-2"
            >
              New meeting
            </Link>

            {user ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 pl-1.5 pr-3.5 py-1.5 rounded-full border border-[#6153CC]/35 text-[#1F2128] text-[13.5px] font-medium whitespace-nowrap shrink-0 hover:border-[#6153CC] hover:bg-[#F4F2FF] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6153CC] focus-visible:ring-offset-2"
              >
                <SafeImage
                  src={user.avatar}
                  alt={user.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                state={{ from: location.pathname }}
                className="px-5 py-2.5 rounded-full border border-[#594BB8] text-[#4F41B8] text-[13.5px] font-medium whitespace-nowrap shrink-0 hover:bg-[#F4F2FF] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6153CC] focus-visible:ring-offset-2"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl text-[#1F2128] hover:bg-[#F4F2FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6153CC]"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#EFEFF5] px-4 pt-3 pb-6 space-y-4 shadow-lg">
          <nav className="flex flex-col space-y-1" aria-label="Mobile navigation">
            {PRIMARY_NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `px-3.5 py-3 rounded-xl text-[15px] font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F4F2FF] text-[#4F41B8]'
                      : 'text-[#3E414E] hover:bg-[#F8F8FB]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/dashboard"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `px-3.5 py-3 rounded-xl text-[15px] font-medium transition-colors ${
                  isActive
                    ? 'bg-[#F4F2FF] text-[#4F41B8]'
                    : 'text-[#3E414E] hover:bg-[#F8F8FB]'
                }`
              }
            >
              Workspace Dashboard
            </NavLink>
            <NavLink
              to="/settings"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `px-3.5 py-3 rounded-xl text-[15px] font-medium transition-colors ${
                  isActive
                    ? 'bg-[#F4F2FF] text-[#4F41B8]'
                    : 'text-[#3E414E] hover:bg-[#F8F8FB]'
                }`
              }
            >
              Workspace Settings
            </NavLink>
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            <Link
              to="/meeting/new"
              onClick={() => setMobileOpen(false)}
              className="w-full py-3 px-4 rounded-full bg-[#6153CC] text-white text-center text-[15px] font-medium hover:bg-[#4F41B8] transition-colors"
            >
              New meeting
            </Link>
            {user ? (
              <Link
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="w-full py-3 px-4 rounded-full border border-[#594BB8] text-[#4F41B8] text-center text-[15px] font-medium hover:bg-[#F4F2FF] transition-colors"
              >
                Signed in as {user.name}
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full py-3 px-4 rounded-full border border-[#594BB8] text-[#4F41B8] text-center text-[15px] font-medium hover:bg-[#F4F2FF] transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
