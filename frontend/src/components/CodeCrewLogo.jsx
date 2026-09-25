import React from 'react';

/**
 * Custom CodeCrew Brand Mark & Logo
 * Design Concept: People + Connection + Code
 * Abstract geometric symbol featuring 3 interconnected crew nodes forming an open 'C' shape
 * with an integrated code bridge & bracket nexus.
 */
const CodeCrewLogo = ({
  size = 'md',
  showText = true,
  subtext = '',
  badge = '',
  className = '',
  animated = true,
}) => {
  const sizeMap = {
    xs: { box: 'w-7 h-7', icon: 18, text: 'text-base', sub: 'text-[9px]' },
    sm: { box: 'w-9 h-9', icon: 22, text: 'text-lg', sub: 'text-[10px]' },
    md: { box: 'w-11 h-11', icon: 28, text: 'text-xl', sub: 'text-[10px]' },
    lg: { box: 'w-13 h-13', icon: 34, text: 'text-2xl', sub: 'text-xs' },
    xl: { box: 'w-16 h-16', icon: 42, text: 'text-3xl', sub: 'text-xs' },
  };

  const selectedSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center space-x-3 group select-none ${className}`}>
      {/* Brand Icon Badge */}
      <div className="relative shrink-0">
        <div
          className={`${selectedSize.box} rounded-2xl bg-gradient-to-br from-charcoal-900 via-charcoal-850 to-charcoal-800 border border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:border-emerald-400 group-hover:shadow-emerald-500/30 transition-all duration-300 ${
            animated ? 'group-hover:scale-105 group-hover:rotate-1' : ''
          }`}
        >
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4/5 h-4/5"
          >
            {/* Ambient Background Radial Glow */}
            <circle cx="20" cy="20" r="14" fill="#10b981" fillOpacity="0.12" />

            {/* Connecting 'C' Conduit Arc (People & Rooms Bridge) */}
            <path
              d="M26 12C18.5 12 13 15.5 13 20C13 24.5 18.5 28 26 28"
              stroke="url(#codecrew_grad_stroke)"
              strokeWidth="2.8"
              strokeLinecap="round"
            />

            {/* Central Code Nexus Bridge */}
            <path
              d="M13 20H19"
              stroke="#a3e635"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Inner Coding Bracket Indicator < */}
            <path
              d="M25 18.5L22.5 20L25 21.5"
              stroke="#34d399"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Crew Member Node 1 (Top - Warm Lime) */}
            <circle cx="26" cy="12" r="3.2" fill="#a3e635" />
            <circle cx="26" cy="12" r="1.4" fill="#0c110f" />

            {/* Central Hub Node 2 (Left - Emerald) */}
            <circle cx="13" cy="20" r="3.8" fill="#10b981" />
            <circle cx="13" cy="20" r="1.6" fill="#0c110f" />

            {/* Crew Member Node 3 (Bottom - Mint Emerald) */}
            <circle cx="26" cy="28" r="3.2" fill="#34d399" />
            <circle cx="26" cy="28" r="1.4" fill="#0c110f" />

            {/* Definitions */}
            <defs>
              <linearGradient
                id="codecrew_grad_stroke"
                x1="26"
                y1="12"
                x2="26"
                y2="28"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#a3e635" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Live Pulse Indicator Dot */}
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-lime-400 border-2 border-charcoal-950 shadow-sm shadow-lime-400/80 animate-pulse"></span>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center space-x-1.5">
            <span
              className={`${selectedSize.text} font-black tracking-tight text-white flex items-center font-sans`}
            >
              Code<span className="text-emerald-400">Crew</span>
            </span>
            {badge && (
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                {badge}
              </span>
            )}
          </div>
          {subtext && (
            <span
              className={`block ${selectedSize.sub} font-mono uppercase tracking-widest text-slate-400 font-semibold -mt-0.5`}
            >
              {subtext}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeCrewLogo;
