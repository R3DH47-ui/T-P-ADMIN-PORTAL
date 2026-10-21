'use client';

import React, { useState, useEffect, useCallback } from 'react';
import CompanyBrandLogo from '@/components/common/CompanyBrandLogo';

/**
 * Returns distinct badge styling & icon based on student profession
 */
function getProfessionBadge(profession) {
  if (!profession) return null;
  const p = profession.toLowerCase();
  if (p.includes('cyber') || p.includes('security')) {
    return {
      icon: 'shield',
      style: 'bg-emerald-50 text-emerald-800 border-emerald-200/90',
    };
  }
  if (p.includes('cloud') || p.includes('devops') || p.includes('aws') || p.includes('azure')) {
    return {
      icon: 'cloud',
      style: 'bg-sky-50 text-sky-800 border-sky-200/90',
    };
  }
  if (p.includes('developer') || p.includes('sde') || p.includes('software') || p.includes('programmer') || p.includes('full stack')) {
    return {
      icon: 'code',
      style: 'bg-indigo-50 text-indigo-800 border-indigo-200/90',
    };
  }
  if (p.includes('dance') || p.includes('dancer')) {
    return {
      icon: 'directions_walk',
      style: 'bg-pink-50 text-pink-800 border-pink-200/90',
    };
  }
  if (p.includes('sing') || p.includes('singer') || p.includes('music') || p.includes('artist')) {
    return {
      icon: 'music_note',
      style: 'bg-purple-50 text-purple-800 border-purple-200/90',
    };
  }
  if (p.includes('risk') || p.includes('consultant') || p.includes('analyst')) {
    return {
      icon: 'query_stats',
      style: 'bg-amber-50 text-amber-800 border-amber-200/90',
    };
  }
  if (p.includes('fintech') || p.includes('finance') || p.includes('bank')) {
    return {
      icon: 'account_balance',
      style: 'bg-teal-50 text-teal-800 border-teal-200/90',
    };
  }
  return {
    icon: 'badge',
    style: 'bg-slate-100 text-slate-800 border-slate-200',
  };
}

/**
 * Returns tier styling based on LPA package
 */
function getTierStyle(ctcLpa) {
  const lpa = Number(ctcLpa) || 0;
  if (lpa >= 15) {
    return {
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-200/90',
      badgeBg: 'bg-secondary-fixed/50',
      badgeText: 'text-secondary',
      dotColor: 'bg-amber-500',
      tierLabel: 'Super Dream',
    };
  }
  if (lpa >= 10) {
    return {
      bg: 'bg-rose-50',
      text: 'text-primary-container',
      border: 'border-rose-200/80',
      badgeBg: 'bg-tint-maroon',
      badgeText: 'text-primary-container',
      dotColor: 'bg-primary-container',
      tierLabel: 'Dream',
    };
  }
  if (lpa >= 6) {
    return {
      bg: 'bg-blue-50',
      text: 'text-info-blue',
      border: 'border-blue-200/80',
      badgeBg: 'bg-tint-blue',
      badgeText: 'text-info-blue',
      dotColor: 'bg-info-blue',
      tierLabel: 'Standard 1',
    };
  }
  return {
    bg: 'bg-slate-50',
    text: 'text-slate-700',
    border: 'border-slate-200',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-600',
    dotColor: 'bg-slate-400',
    tierLabel: 'Entry',
  };
}

export default function PlacedStudentsCard({
  cohort = 'AY 2024–25',
  onSelectStudent = null,
}) {
  const [items, setItems] = useState([]);
  const [sortMode, setSortMode] = useState('latest'); // 'latest' | 'package'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlacedStudents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/placement-stats/placed-students?limit=8&sort=${sortMode}`);
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      setItems(data.items || []);
    } catch (err) {
      console.warn('Failed to load placed students:', err);
      setError(err.message || 'Unable to load verified student placements');
    } finally {
      setLoading(false);
    }
  }, [sortMode]);

  useEffect(() => {
    fetchPlacedStudents();
  }, [fetchPlacedStudents, cohort]);

  return (
    <div
      className="group relative rounded-2xl p-6 overflow-hidden backdrop-blur-xl border border-white/80 shadow-lg hover:shadow-xl transition-all duration-300"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(254, 248, 245, 0.88) 40%, rgba(255, 255, 255, 0.94) 100%)',
        boxShadow: 'rgba(107, 0, 24, 0.07) 0px 14px 34px -4px, rgba(255, 255, 255, 0.95) 0px 1px 0px inset',
        border: '1px solid rgba(255, 255, 255, 0.85)',
      }}
    >
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />
      <div className="absolute -right-16 -top-16 w-52 h-52 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-40 bg-gradient-to-r from-transparent via-rose-200/40 to-transparent -skew-x-12 animate-glossy" />

      {/* Header & Controls */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border-subtle/50">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-label-eyebrow text-[10px] text-text-secondary uppercase font-bold tracking-wider">
              RECENT PLACEMENTS
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tint-green text-success-green font-bold text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-success-green animate-pulse" />
              Live Verified
            </span>
          </div>
          <h3 className="font-headline-section text-base sm:text-lg font-bold text-text-primary mt-0.5">
            Placed Students &amp; Corporate Offers
          </h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Verified offers released by visiting campus recruiters for {cohort}.
          </p>
        </div>

        {/* Controls: Latest / Top Packages */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1 bg-surface-container-low/80 backdrop-blur-md p-1 rounded-xl border border-white/70 shadow-xs">
            <button
              onClick={() => setSortMode('latest')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                sortMode === 'latest'
                  ? 'bg-white text-text-primary shadow-xs font-bold'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Latest Offers
            </button>
            <button
              onClick={() => setSortMode('package')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                sortMode === 'package'
                  ? 'bg-white text-text-primary shadow-xs font-bold'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Top Packages
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 mt-4">
        {loading ? (
          /* Skeleton Loading Shimmer */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-white/60 border border-white/60 animate-pulse flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-slate-200" />
                  <div className="space-y-1.5">
                    <div className="w-28 h-3.5 bg-slate-200 rounded" />
                    <div className="w-36 h-2.5 bg-slate-100 rounded" />
                  </div>
                </div>
                <div className="w-20 h-7 bg-slate-200 rounded-full" />
              </div>
            ))}
          </div>
        ) : error ? (
          /* Error State */
          <div className="p-8 text-center bg-white/70 rounded-xl border border-rose-200/60 my-2">
            <span className="material-symbols-outlined text-rose-500 text-3xl">error_outline</span>
            <p className="text-xs text-text-secondary mt-1">{error}</p>
            <button
              onClick={fetchPlacedStudents}
              className="mt-3 px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-semibold shadow-sm hover:shadow"
            >
              Retry
            </button>
          </div>
        ) : items.length === 0 ? (
          /* Empty State */
          <div className="p-8 text-center bg-white/70 rounded-xl border border-white/70 my-2">
            <span className="material-symbols-outlined text-text-secondary text-3xl">school</span>
            <p className="text-xs text-text-secondary mt-1">No verified placements recorded for this cycle yet.</p>
          </div>
        ) : (
          /* Placed Students Grid (1 col mobile, 2 cols tablet/desktop) */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {items.map((item, idx) => {
              const tier = getTierStyle(item.offer.ctcLpa);
              const studentInitials = item.student.name
                ? item.student.name.split(/\s+/).map((p) => p[0]).join('').slice(0, 2).toUpperCase()
                : 'ST';

              return (
                <div
                  key={item.offerId || idx}
                  onClick={() => onSelectStudent && onSelectStudent(item.student)}
                  className="group/row relative p-3.5 rounded-xl bg-white/90 hover:bg-white backdrop-blur-md border border-white/80 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex items-center justify-between gap-3"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  {/* Left: Student Photo + Info */}
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Student Photo (44px) */}
                    <div className="relative shrink-0">
                      {item.student.photoUrl ? (
                        <img
                          src={item.student.photoUrl}
                          alt={item.student.name}
                          className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            if (e.currentTarget.nextSibling) {
                              e.currentTarget.nextSibling.style.display = 'flex';
                            }
                          }}
                        />
                      ) : null}
                      <div
                        className={`w-11 h-11 rounded-full bg-gradient-to-br from-primary-container to-primary flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-sm ${
                          item.student.photoUrl ? 'hidden' : 'flex'
                        }`}
                      >
                        {studentInitials}
                      </div>
                    </div>

                    {/* Student Name & Profession */}
                    <div className="min-w-0 flex flex-col">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-text-primary text-xs sm:text-sm truncate group-hover/row:text-primary transition-colors">
                          {item.student.name}
                        </span>
                        <span className="material-symbols-outlined text-[13px] text-info-blue" style={{ fontVariationSettings: "'FILL' 1" }}>
                          verified
                        </span>
                        {/* Student Profession Badge */}
                        {item.student.profession ? (() => {
                          const badge = getProfessionBadge(item.student.profession);
                          return (
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border shadow-2xs ${badge.style}`}
                              title={`Student Profession: ${item.student.profession}`}
                            >
                              <span className="material-symbols-outlined text-[11px] leading-none">
                                {badge.icon}
                              </span>
                              <span>{item.student.profession}</span>
                            </span>
                          );
                        })() : null}
                      </div>
                      <span className="text-[11px] text-text-secondary truncate font-medium mt-0.5">
                        {item.offer.jobRole || 'Software Development Engineer'}
                      </span>
                      <span className="text-[10px] text-text-secondary/70 truncate">
                        {item.student.department}
                      </span>
                    </div>
                  </div>

                  {/* Middle & Right: Company Logo + Package Pill */}
                  <div className="flex items-center gap-2.5 shrink-0">
                    {/* Company Logo (40px) */}
                    <div className="flex items-center gap-2 text-right hidden lg:flex">
                      <div className="flex flex-col text-right">
                        <span className="text-xs font-bold text-text-primary truncate max-w-[110px]">
                          {item.company.name}
                        </span>
                        <span className="text-[10px] text-text-secondary truncate max-w-[110px]">
                          {item.company.sector}
                        </span>
                      </div>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center p-1.5 shrink-0 overflow-hidden group-hover/row:border-primary-container/40 transition-colors">
                      <CompanyBrandLogo company={item.company} />
                    </div>

                    {/* LPA Package Pill Badge */}
                    <div className="flex flex-col items-end">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-extrabold border shadow-xs tracking-tight ${tier.badgeBg} ${tier.badgeText} ${tier.border}`}
                      >
                        ₹{item.offer.ctcLpa} LPA
                      </span>
                      <span className="text-[9px] font-semibold text-text-secondary mt-0.5 tracking-wider uppercase">
                        {tier.tierLabel}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="relative z-10 pt-3 mt-3 flex items-center justify-between border-t border-white/60 text-xs text-text-secondary">
        <span className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sm text-success-green">verified_user</span>
          <span>Officially verified by RIMT T&amp;P Corporate Liaison Cell</span>
        </span>
        <span className="font-semibold text-primary-container">
          Showing 8 of {items.length} featured placements
        </span>
      </div>
    </div>
  );
}
