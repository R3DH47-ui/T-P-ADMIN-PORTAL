'use client';

import React from 'react';

export default function HeroCard({
  badgeText,
  badgeIcon = 'verified',
  secondaryBadge,
  title,
  description,
  metrics,
  actionButton,
}) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-[#15151F] text-white p-5 sm:p-6 lg:p-7 shadow-xl border-t border-white/20 ring-1 ring-white/10 transform transition-all duration-300 ease-out hover:scale-[1.01] hover:shadow-2xl"
      style={{
        backgroundImage:
          'radial-gradient(120% 120% at 85% 15%, rgba(139, 29, 44, 0.35) 0%, rgba(26, 27, 46, 0.65) 50%, rgba(21, 21, 31, 0.98) 100%)',
      }}
    >
      {/* Dynamic Sheen Sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent absolute top-0 -left-1/4 animate-sheen-sweep pointer-events-none transform -skew-x-12" />
      </div>

      {/* Ambient Color Auras */}
      <div className="absolute -right-16 -top-20 w-80 h-80 rounded-full bg-[#8B1D2C]/30 blur-3xl pointer-events-none animate-aura-pulse" />
      <div className="absolute right-48 -bottom-16 w-60 h-60 rounded-full bg-[#3E6FD9]/20 blur-2xl pointer-events-none animate-aura-pulse" />
      <div className="absolute left-1/4 -top-12 w-48 h-48 rounded-full bg-[#FFDF9B]/15 blur-2xl pointer-events-none" />

      {/* Specular Edge Line */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Information */}
        <div className="flex flex-col gap-2.5 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            {badgeText && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white backdrop-blur-md text-xs font-semibold ring-1 ring-white/15">
                <span
                  className="material-symbols-outlined text-sm text-[#1E9E5A]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {badgeIcon}
                </span>
                {badgeText}
              </span>
            )}
            {secondaryBadge && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/5 text-gray-300 text-[11px] font-bold uppercase tracking-wider ring-1 ring-white/5">
                {secondaryBadge}
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-white tracking-tight drop-shadow-sm leading-snug">
            {title}
          </h2>

          {description && (
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl">
              {description}
            </p>
          )}

          {actionButton && <div className="pt-2">{actionButton}</div>}
        </div>

        {/* Right Metrics Box */}
        {metrics && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl ring-1 ring-white/15 shadow-lg shrink-0">
            {metrics.map((m, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && (
                  <div className="hidden sm:block w-px h-12 bg-white/15" />
                )}
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-300">
                    {m.label}
                  </span>
                  <div className="flex items-baseline gap-1.5 my-0.5">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {m.value}
                    </span>
                    {m.sub && (
                      <span className="text-xs text-gray-300 font-medium">
                        {m.sub}
                      </span>
                    )}
                  </div>
                  {m.caption && (
                    <span className="text-[11px] text-[#1E9E5A] font-semibold flex items-center gap-1">
                      {m.captionIcon && (
                        <span className="material-symbols-outlined text-xs">
                          {m.captionIcon}
                        </span>
                      )}
                      {m.caption}
                    </span>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
