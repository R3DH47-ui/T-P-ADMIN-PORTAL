'use client';

import React from 'react';

const VARIANTS = {
  maroon: {
    bg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(253, 242, 244, 0.75) 50%, rgba(255, 255, 255, 0.9) 100%)',
    shadow: 'rgba(139, 29, 44, 0.08) 0px 14px 34px -4px, rgba(255, 255, 255, 0.95) 0px 1px 0px inset, rgba(255, 255, 255, 0.6) 0px -1px 0px inset',
    iconBg: 'bg-gradient-to-br from-[#8B1D2C] to-[#6E1521]',
    iconColor: 'text-white',
    iconShadow: '0 4px 14px rgba(139,29,44,0.3)',
    sweepClass: 'animate-sweep-maroon',
    sweepGrad: 'via-rose-400/25',
    aura: 'bg-rose-500/15',
    pillBg: 'bg-white/90 border border-rose-200/60 text-[#8B1D2C]',
    trendColor: 'text-[#8B1D2C]',
    dotColor: 'bg-[#8B1D2C]',
  },
  emerald: {
    bg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(240, 253, 244, 0.75) 50%, rgba(255, 255, 255, 0.9) 100%)',
    shadow: 'rgba(30, 158, 90, 0.08) 0px 14px 34px -4px, rgba(255, 255, 255, 0.95) 0px 1px 0px inset, rgba(255, 255, 255, 0.6) 0px -1px 0px inset',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-[#1E9E5A]',
    iconColor: 'text-white',
    iconShadow: '0 4px 14px rgba(30,158,90,0.3)',
    sweepClass: 'animate-sweep-emerald',
    sweepGrad: 'via-emerald-400/25',
    aura: 'bg-emerald-500/15',
    pillBg: 'bg-white/90 border border-emerald-200/60 text-[#1E9E5A]',
    trendColor: 'text-[#1E9E5A]',
    dotColor: 'bg-[#1E9E5A]',
  },
  blue: {
    bg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(239, 246, 255, 0.75) 50%, rgba(255, 255, 255, 0.9) 100%)',
    shadow: 'rgba(62, 111, 217, 0.08) 0px 14px 34px -4px, rgba(255, 255, 255, 0.95) 0px 1px 0px inset, rgba(255, 255, 255, 0.6) 0px -1px 0px inset',
    iconBg: 'bg-gradient-to-br from-blue-500 to-[#3E6FD9]',
    iconColor: 'text-white',
    iconShadow: '0 4px 14px rgba(62,111,217,0.3)',
    sweepClass: 'animate-sweep-blue',
    sweepGrad: 'via-blue-400/25',
    aura: 'bg-blue-500/15',
    pillBg: 'bg-white/90 border border-blue-200/60 text-[#3E6FD9]',
    trendColor: 'text-[#3E6FD9]',
    dotColor: 'bg-[#3E6FD9]',
  },
  amber: {
    bg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(254, 252, 232, 0.75) 50%, rgba(255, 255, 255, 0.9) 100%)',
    shadow: 'rgba(231, 185, 74, 0.1) 0px 14px 34px -4px, rgba(255, 255, 255, 0.95) 0px 1px 0px inset, rgba(255, 255, 255, 0.6) 0px -1px 0px inset',
    iconBg: 'bg-gradient-to-br from-amber-500 to-[#E7B94A]',
    iconColor: 'text-white',
    iconShadow: '0 4px 14px rgba(231,185,74,0.3)',
    sweepClass: 'animate-sweep-amber',
    sweepGrad: 'via-amber-400/25',
    aura: 'bg-amber-500/15',
    pillBg: 'bg-white/90 border border-amber-200/60 text-amber-700',
    trendColor: 'text-amber-700',
    dotColor: 'bg-amber-600',
  },
};

export default function KpiCard({
  variant = 'maroon',
  icon,
  trend,
  trendIcon = 'trending_up',
  value,
  badgeText,
  title,
  subtitle,
}) {
  const v = VARIANTS[variant] || VARIANTS.maroon;

  return (
    <div
      className="group relative rounded-2xl p-4 sm:p-5 lg:p-6 overflow-hidden backdrop-blur-xl border border-white/80 cursor-pointer select-none transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.05] hover:-translate-y-2 hover:shadow-2xl hover:z-20 active:scale-[0.98] flex flex-col justify-between"
      style={{
        background: v.bg,
        boxShadow: v.shadow,
      }}
    >
      {/* Specular Highlight */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />

      {/* Ambient Color Aura */}
      <div
        className={`absolute -right-12 -top-12 w-44 h-44 rounded-full ${v.aura} blur-2xl pointer-events-none group-hover:scale-150 group-hover:opacity-90 transition-all duration-500`}
      />

      {/* Animated Light Sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`w-32 h-[220%] bg-gradient-to-r from-transparent ${v.sweepGrad} to-transparent absolute -top-1/2 left-0 ${v.sweepClass} pointer-events-none`}
        />
      </div>

      {/* Card Header: Icon & Trend Chip */}
      <div className="relative z-10 flex items-center justify-between">
        <div
          className={`w-11 h-11 rounded-xl ${v.iconBg} ${v.iconColor} flex items-center justify-center ring-1 ring-white/50 transform transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-[-2deg]`}
          style={{ boxShadow: v.iconShadow }}
        >
          <span className="material-symbols-outlined text-[22px]">{icon}</span>
        </div>

        {trend && (
          <div
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-xs transform transition-transform duration-300 group-hover:scale-105 ${v.pillBg}`}
          >
            {trendIcon && (
              <span className={`material-symbols-outlined text-[14px] ${v.trendColor}`}>
                {trendIcon}
              </span>
            )}
            <span>{trend}</span>
          </div>
        )}
      </div>

      {/* Card Body: Stat Value & Labels */}
      <div className="relative z-10 mt-4 sm:mt-5 flex flex-col">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-[26px] lg:text-[32px] font-extrabold text-text-primary tracking-tight leading-tight transform transition-transform duration-300 group-hover:scale-[1.03] origin-left">
            {value}
          </span>
          {badgeText && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-primary border border-rose-100">
              {badgeText}
            </span>
          )}
        </div>

        <span className="text-sm font-semibold text-text-primary mt-1 leading-snug">
          {title}
        </span>

        {subtitle && (
          <span className="text-xs text-text-secondary flex items-center gap-1.5 mt-0.5">
            <span className={`w-1.5 h-1.5 rounded-full ${v.dotColor}`} />
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
