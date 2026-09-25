'use client';

import React, { useState } from 'react';

export default function PlacementStatistics({ globalSearch = '' }) {
  const [selectedCohort, setSelectedCohort] = useState('AY 2024–25');
  const [bracketView, setBracketView] = useState('counts'); // 'counts' | 'share'
  const [showFilterModal, setShowFilterModal] = useState(false);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
      {/* 1. Top Action Bar: Module Header & Secondary Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="font-label-eyebrow text-xs text-primary-container tracking-wider uppercase font-bold">
              Institutional Intelligence
            </span>
            <span className="text-text-secondary text-sm">•</span>
            <span className="text-xs text-text-secondary font-medium">Audit Year 2024-25</span>
          </div>
          <h1 className="font-headline-page text-2xl lg:text-3xl font-extrabold text-text-primary tracking-tight">
            Placement Statistics &amp; Performance Analytics
          </h1>
        </div>

        {/* Controls: Date Range Filter & Export Action */}
        <div className="flex items-center gap-3 flex-wrap">
          <div
            onClick={() => setShowFilterModal(true)}
            className="relative rounded-2xl bg-gradient-to-b from-white/95 to-white/70 backdrop-blur-xl border border-white/80 shadow-[0_4px_14px_rgba(107,0,24,0.05)] hover:shadow-md px-4 py-2 flex items-center gap-3 cursor-pointer transition-all duration-300 hover:scale-[1.01] overflow-hidden group/cohort ring-1 ring-black/5"
          >
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />
            <div className="w-8 h-8 rounded-xl bg-tint-maroon/70 flex items-center justify-center shrink-0 border border-rose-200/80 shadow-xs">
              <span className="material-symbols-outlined text-primary text-lg">calendar_month</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-label-eyebrow text-[10px] text-text-secondary uppercase tracking-wider font-bold">
                Cohort Cycle
              </span>
              <span className="font-label-button text-xs text-text-primary font-semibold">
                {selectedCohort}
              </span>
            </div>
            <span className="material-symbols-outlined text-text-secondary text-sm ml-1 group-hover/cohort:translate-y-0.5 transition-transform">
              expand_more
            </span>
          </div>

          <button
            onClick={() => setShowFilterModal(true)}
            className="group relative overflow-hidden bg-gradient-to-b from-white/95 to-white/70 hover:bg-white text-text-primary px-4 py-2.5 rounded-2xl shadow-sm hover:shadow-md font-label-button text-xs font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5 active:scale-[0.98] border border-white/80 backdrop-blur-xl ring-1 ring-black/5"
          >
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />
            <span className="material-symbols-outlined text-info-blue text-lg group-hover:scale-110 transition-transform duration-300">
              tune
            </span>
            <span className="font-semibold text-text-primary">Cohort Filters</span>
          </button>

          <button
            onClick={() => alert('Generating NAAC / NIRF Placement Audit PDF Report...')}
            className="group relative overflow-hidden text-white px-4 py-2.5 rounded-xl shadow-lg hover:shadow-xl font-label-button text-xs font-semibold flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] border border-white/30 backdrop-blur-xl ring-1 ring-white/20"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 29, 44, 0.95) 0%, rgba(110, 21, 33, 0.88) 60%, rgba(85, 0, 19, 0.95) 100%)',
              boxShadow: 'rgba(107, 0, 24, 0.35) 0px 8px 20px -3px, rgba(255, 255, 255, 0.35) 0px 1px 1px inset, rgba(255, 255, 255, 0.15) 0px 0px 0px 1px inset',
            }}
          >
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-10" />
            <div className="pointer-events-none absolute inset-0 z-0 opacity-40 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-glossy" />
            <span className="material-symbols-outlined text-lg relative z-10 text-white group-hover:scale-110 transition-transform duration-300">
              picture_as_pdf
            </span>
            <span className="relative z-10 text-white font-semibold tracking-wide">Export PDF Report</span>
          </button>
        </div>
      </div>

      {/* 2. Dark Hero Card (#15151F) with High Zoom Animation */}
      <div className="group relative overflow-hidden rounded-2xl bg-surface-hero p-6 lg:p-8 text-white shadow-xl cursor-pointer select-none transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] hover:-translate-y-1.5 hover:shadow-2xl hover:z-20 active:scale-[0.99]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl z-0">
          <div
            className="absolute -inset-full top-0 block w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg]"
            style={{ animation: 'heroShimmerSweep 5s ease-in-out infinite' }}
          />
        </div>
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-primary-container/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-64 h-64 rounded-full bg-secondary-container/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Hero Left Info */}
          <div className="max-w-2xl flex flex-col gap-3">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#785a00]/20 text-[#ffdf9b] text-xs font-semibold">
                <span className="material-symbols-outlined text-sm text-[#ffdf9b]">workspace_premium</span>
                NAAC &amp; NBA Audit Compliant
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-success-green" />
                Live Sync Verified
              </span>
            </div>

            <div>
              <h2 className="text-2xl lg:text-3xl text-white font-extrabold tracking-tight">
                Placement Cycle 2024–2025 Overview: <span className="text-[#ffdf9b]">82.4%</span> Rate
              </h2>
              <p className="text-xs sm:text-sm text-white/70 mt-1 leading-relaxed">
                Consolidated placement benchmarking across all constituent colleges under RIMT Academic Trust. Aggregate intake of 2,233 eligible scholars with 1,840 placed in full-time professional roles.
              </p>
            </div>

            {/* Summary Stat Pill Row */}
            <div className="inline-flex flex-wrap items-center gap-2 mt-1 bg-white/5 p-2 rounded-xl backdrop-blur-md">
              <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-lg">
                <span className="text-white/60 text-xs">Highest Package:</span>
                <span className="font-semibold text-xs text-white">₹34.5 LPA</span>
              </div>
              <span className="text-white/30 hidden sm:inline">•</span>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-lg">
                <span className="text-white/60 text-xs">Median CTC:</span>
                <span className="font-semibold text-xs text-white">₹6.8 LPA</span>
              </div>
              <span className="text-white/30 hidden sm:inline">•</span>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-lg">
                <span className="text-white/60 text-xs">Total Offers:</span>
                <span className="font-semibold text-xs text-[#ffdf9b]">1,840</span>
              </div>
            </div>
          </div>

          {/* Hero Right: Mini Visual Radial Widget */}
          <div className="flex items-center justify-start lg:justify-end shrink-0">
            <div className="flex items-center gap-4 bg-white/10 p-5 rounded-2xl backdrop-blur-sm shadow-inner">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-white/20"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                  <path
                    className="text-success-green"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="82.4, 100"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-sm font-bold text-white leading-none">82.4%</span>
                  <span className="text-[9px] uppercase tracking-wider text-white/60 mt-0.5">Placed</span>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Trust Target: 85%</span>
                <span className="text-xs text-white/70">Remaining: 57 days</span>
                <div className="flex items-center gap-1 mt-1 text-success-green text-xs font-semibold">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  <span>On track for milestone</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Four Primary KPI Stat Cards (Fintech Pastel Tints) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Overall Placement % */}
        <div
          className="group relative rounded-2xl p-6 overflow-hidden backdrop-blur-xl border border-white/80 shadow-lg cursor-pointer select-none transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.045] hover:-translate-y-2 hover:shadow-2xl hover:z-20 active:scale-[0.98] flex flex-col justify-between"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(253, 242, 244, 0.85) 50%, rgba(255, 255, 255, 0.9) 100%)',
            boxShadow: 'rgba(107, 0, 24, 0.08) 0px 14px 34px -4px, rgba(255, 255, 255, 0.95) 0px 1px 0px inset',
            border: '1px solid rgba(250, 210, 216, 0.8)',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />
          <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-rose-500/15 blur-2xl pointer-events-none group-hover:scale-150 group-hover:opacity-90 transition-all duration-500" />
          <div className="pointer-events-none absolute inset-0 z-0 opacity-40 bg-gradient-to-r from-transparent via-rose-200/50 to-transparent -skew-x-12 animate-glossy" />

          <div className="relative z-10 flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-container to-primary flex items-center justify-center text-white shadow-[0_4px_14px_rgba(107,0,24,0.28)] ring-1 ring-white/40 transform transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-[-2deg]">
              <span className="material-symbols-outlined text-[22px]">percent</span>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 border border-rose-200/80 shadow-[0_2px_8px_rgba(139,29,44,0.08)] text-primary font-label-badge text-xs font-semibold backdrop-blur-md transform transition-transform duration-300 group-hover:scale-105">
              <span className="material-symbols-outlined text-[14px] text-primary">trending_up</span>
              <span>+6.1%</span>
            </div>
          </div>

          <div className="relative z-10 mt-5 flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-display-stat text-3xl text-text-primary tracking-tight font-extrabold transform transition-transform duration-300 group-hover:scale-[1.03] origin-left">82.4%</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-primary border border-rose-100">
                Verified
              </span>
            </div>
            <span className="font-semibold text-text-primary text-sm mt-1">Overall Placement %</span>
            <span className="text-xs text-text-secondary flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-sm text-success-green">verified</span>
              vs 76.3% last academic year
            </span>
          </div>
        </div>

        {/* Card 2: Average Package (CTC) */}
        <div
          className="group relative rounded-2xl p-6 overflow-hidden backdrop-blur-xl border border-white/80 shadow-lg cursor-pointer select-none transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.045] hover:-translate-y-2 hover:shadow-2xl hover:z-20 active:scale-[0.98] flex flex-col justify-between"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(240, 253, 244, 0.85) 50%, rgba(255, 255, 255, 0.9) 100%)',
            boxShadow: 'rgba(30, 158, 90, 0.08) 0px 14px 34px -4px, rgba(255, 255, 255, 0.95) 0px 1px 0px inset',
            border: '1px solid rgba(205, 238, 216, 0.85)',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />
          <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-emerald-500/15 blur-2xl pointer-events-none group-hover:scale-150 group-hover:opacity-90 transition-all duration-500" />
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-40 bg-gradient-to-r from-transparent via-emerald-200/50 to-transparent -skew-x-12 animate-glossy"
            style={{ animationDelay: '0.75s' }}
          />

          <div className="relative z-10 flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-success-green flex items-center justify-center text-white shadow-[0_4px_14px_rgba(30,158,90,0.3)] ring-1 ring-white/40 transform transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-[-2deg]">
              <span className="material-symbols-outlined text-[22px]">payments</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 border border-emerald-200/80 shadow-[0_2px_8px_rgba(30,158,90,0.08)] text-success-green font-label-badge text-xs font-semibold backdrop-blur-md transform transition-transform duration-300 group-hover:scale-105">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success-green" />
              </span>
              <span>+12.8% YoY</span>
            </div>
          </div>

          <div className="relative z-10 mt-5 flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-display-stat text-3xl text-text-primary tracking-tight font-extrabold transform transition-transform duration-300 group-hover:scale-[1.03] origin-left">
                ₹7.42 <span className="text-lg font-semibold text-text-secondary">LPA</span>
              </span>
            </div>
            <span className="font-semibold text-text-primary text-sm mt-1">Average Package (CTC)</span>
            <span className="text-xs text-text-secondary flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success-green" />
              YoY increase from ₹6.58 LPA
            </span>
          </div>
        </div>

        {/* Card 3: Total Offers Made */}
        <div
          className="group relative rounded-2xl p-6 overflow-hidden backdrop-blur-xl border border-white/80 shadow-lg cursor-pointer select-none transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.045] hover:-translate-y-2 hover:shadow-2xl hover:z-20 active:scale-[0.98] flex flex-col justify-between"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(239, 246, 255, 0.85) 50%, rgba(255, 255, 255, 0.9) 100%)',
            boxShadow: 'rgba(62, 111, 217, 0.08) 0px 14px 34px -4px, rgba(255, 255, 255, 0.95) 0px 1px 0px inset',
            border: '1px solid rgba(204, 221, 251, 0.85)',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />
          <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-blue-500/15 blur-2xl pointer-events-none group-hover:scale-150 group-hover:opacity-90 transition-all duration-500" />
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-40 bg-gradient-to-r from-transparent via-blue-200/50 to-transparent -skew-x-12 animate-glossy"
            style={{ animationDelay: '1.5s' }}
          />

          <div className="relative z-10 flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-info-blue flex items-center justify-center text-white shadow-[0_4px_14px_rgba(62,111,217,0.3)] ring-1 ring-white/40 transform transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-[-2deg]">
              <span className="material-symbols-outlined text-[22px]">work</span>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 border border-blue-200/80 shadow-[0_2px_8px_rgba(62,111,217,0.08)] text-info-blue font-label-badge text-xs font-semibold backdrop-blur-md transform transition-transform duration-300 group-hover:scale-105">
              <span className="material-symbols-outlined text-[14px]">stars</span>
              <span>142 Recs</span>
            </div>
          </div>

          <div className="relative z-10 mt-5 flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-display-stat text-3xl text-text-primary tracking-tight font-extrabold transform transition-transform duration-300 group-hover:scale-[1.03] origin-left">1,840</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-info-blue border border-blue-100">
                Total
              </span>
            </div>
            <span className="font-semibold text-text-primary text-sm mt-1">Total Offers Made</span>
            <span className="text-xs text-text-secondary flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-info-blue" />
              Across 142 companies on campus
            </span>
          </div>
        </div>

        {/* Card 4: Super Dream Offers */}
        <div
          className="group relative rounded-2xl p-6 overflow-hidden backdrop-blur-xl border border-white/80 shadow-lg cursor-pointer select-none transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.045] hover:-translate-y-2 hover:shadow-2xl hover:z-20 active:scale-[0.98] flex flex-col justify-between"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(254, 252, 232, 0.85) 50%, rgba(255, 255, 255, 0.9) 100%)',
            boxShadow: 'rgba(239, 192, 80, 0.1) 0px 14px 34px -4px, rgba(255, 255, 255, 0.95) 0px 1px 0px inset',
            border: '1px solid rgba(252, 229, 191, 0.85)',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />
          <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-amber-500/15 blur-2xl pointer-events-none group-hover:scale-150 group-hover:opacity-90 transition-all duration-500" />
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-40 bg-gradient-to-r from-transparent via-amber-200/50 to-transparent -skew-x-12 animate-glossy"
            style={{ animationDelay: '2.25s' }}
          />

          <div className="relative z-10 flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-secondary flex items-center justify-center text-white shadow-[0_4px_14px_rgba(120,90,0,0.28)] ring-1 ring-white/40 transform transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-[-2deg]">
              <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                hotel_class
              </span>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 border border-amber-200/80 shadow-[0_2px_8px_rgba(120,90,0,0.08)] text-secondary font-label-badge text-xs font-semibold backdrop-blur-md transform transition-transform duration-300 group-hover:scale-105">
              <span className="material-symbols-outlined text-[13px] text-amber-600">verified</span>
              <span>New Record</span>
            </div>
          </div>

          <div className="relative z-10 mt-5 flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-display-stat text-3xl text-text-primary tracking-tight font-extrabold transform transition-transform duration-300 group-hover:scale-[1.03] origin-left">
                84 <span className="text-lg font-semibold text-text-secondary">Offers</span>
              </span>
            </div>
            <span className="font-semibold text-text-primary text-sm mt-1">Super Dream Offers (&gt;₹15 LPA)</span>
            <span className="text-xs text-text-secondary flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Highest offer ₹34.5 LPA (Amazon)
            </span>
          </div>
        </div>
      </div>

      {/* 4. Analytics Mid-Section: Asymmetric 2-Column (CTC Brackets & Sector Breakdown) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* CTC Brackets Breakdown (7 Cols) */}
        <div
          className="lg:col-span-7 group relative rounded-2xl p-6 overflow-hidden backdrop-blur-xl border border-white/80 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(254, 248, 245, 0.82) 40%, rgba(255, 255, 255, 0.9) 100%)',
            boxShadow: 'rgba(107, 0, 24, 0.06) 0px 14px 34px -4px, rgba(255, 255, 255, 0.95) 0px 1px 0px inset, rgba(255, 255, 255, 0.6) 0px 0px 0px 1px inset',
            border: '1px solid rgba(255, 255, 255, 0.85)',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />
          <div className="absolute -right-16 -top-16 w-52 h-52 rounded-full bg-rose-500/10 blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
          <div className="absolute -left-12 -bottom-12 w-44 h-44 rounded-full bg-secondary-container/10 blur-2xl pointer-events-none" />
          <div className="pointer-events-none absolute inset-0 z-0 opacity-40 bg-gradient-to-r from-transparent via-rose-200/50 to-transparent -skew-x-12 animate-glossy" />

          <div className="relative z-10">
            <div className="flex items-center justify-between pb-4">
              <div>
                <span className="font-label-eyebrow text-[10px] text-text-secondary uppercase font-bold tracking-wider">
                  Compensation Distribution
                </span>
                <h3 className="font-headline-section text-base sm:text-lg font-bold text-text-primary">
                  Salary CTC Bracket Breakdown
                </h3>
              </div>
              <div className="flex items-center gap-1 bg-surface-container-low/70 backdrop-blur-md p-1 rounded-xl border border-white/60 shadow-xs">
                <button
                  onClick={() => setBracketView('counts')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    bracketView === 'counts'
                      ? 'bg-white text-text-primary shadow-xs'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Counts
                </button>
                <button
                  onClick={() => setBracketView('share')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    bracketView === 'share'
                      ? 'bg-white text-text-primary shadow-xs'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  % Share
                </button>
              </div>
            </div>

            {/* Visual Multi-Segmented Progress Bar */}
            <div className="my-4">
              <div className="w-full h-4 rounded-full bg-surface-container-high/80 flex overflow-hidden ring-1 ring-white/50 shadow-inner">
                <div className="h-full bg-secondary" style={{ width: '4.56%' }} title="> ₹15 LPA (84 offers)" />
                <div className="h-full bg-primary-container" style={{ width: '14.13%' }} title="₹10 - ₹15 LPA (260 offers)" />
                <div className="h-full bg-info-blue" style={{ width: '44.56%' }} title="₹6 - ₹10 LPA (820 offers)" />
                <div className="h-full bg-surface-container-highest" style={{ width: '36.75%' }} title="< ₹6 LPA (676 offers)" />
              </div>
              <div className="flex items-center justify-between text-xs text-text-secondary mt-1.5">
                <span>0 offers</span>
                <span className="font-medium text-text-primary">1,840 Total Offers Placed</span>
              </div>
            </div>

            {/* Bracket Tiers Detail Rows */}
            <div className="flex flex-col gap-2.5 mt-4">
              {/* Tier 1 */}
              <div className="p-3 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-between hover:bg-white transition-all shadow-xs border border-white/80">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-secondary shadow-sm" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-text-primary">
                      &gt; ₹15 LPA (Super Dream Tier)
                    </span>
                    <span className="text-[11px] text-text-secondary">Premier tech &amp; quantitative roles</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-text-primary">
                    {bracketView === 'counts' ? '84 students' : '4.6%'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-fixed/40 text-secondary text-[11px] font-bold min-w-[50px] text-center border border-amber-200/80">
                    4.6%
                  </span>
                </div>
              </div>

              {/* Tier 2 */}
              <div className="p-3 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-between hover:bg-white transition-all shadow-xs border border-white/80">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-primary-container shadow-sm" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-text-primary">
                      ₹10 – ₹15 LPA (Dream Tier)
                    </span>
                    <span className="text-[11px] text-text-secondary">Product engineering &amp; fintech analysts</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-text-primary">
                    {bracketView === 'counts' ? '260 students' : '14.1%'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-tint-maroon text-primary-container text-[11px] font-bold min-w-[50px] text-center border border-rose-200/80">
                    14.1%
                  </span>
                </div>
              </div>

              {/* Tier 3 */}
              <div className="p-3 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-between hover:bg-white transition-all shadow-xs border border-white/80">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-info-blue shadow-sm" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-text-primary">
                      ₹6 – ₹10 LPA (Standard Tier 1)
                    </span>
                    <span className="text-[11px] text-text-secondary">Core MNCs &amp; software consultants</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-text-primary">
                    {bracketView === 'counts' ? '820 students' : '44.6%'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-tint-blue text-info-blue text-[11px] font-bold min-w-[50px] text-center border border-blue-200/80">
                    44.6%
                  </span>
                </div>
              </div>

              {/* Tier 4 */}
              <div className="p-3 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-between hover:bg-white transition-all shadow-xs border border-white/80">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-tertiary-container shadow-sm" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-text-primary">
                      &lt; ₹6 LPA (Entry Professional)
                    </span>
                    <span className="text-[11px] text-text-secondary">Mass recruitment &amp; graduate engineer trainees</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-text-primary">
                    {bracketView === 'counts' ? '676 students' : '36.7%'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-text-secondary text-[11px] font-bold min-w-[50px] text-center">
                    36.7%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-4 mt-3 flex items-center justify-between border-t border-white/60">
            <span className="text-xs text-text-secondary">Benchmark updated today at 09:30 AM IST</span>
            <button
              onClick={() => alert('Opening Full Verified Student Placement Registry...')}
              className="text-primary-container hover:text-primary-hover text-xs font-semibold flex items-center gap-1 group/btn transition-colors"
            >
              <span>View Student Registry</span>
              <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>

        {/* Sector-wise Distribution (5 Cols) */}
        <div
          className="lg:col-span-5 group relative rounded-2xl p-6 overflow-hidden backdrop-blur-xl border border-white/80 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(240, 246, 255, 0.82) 45%, rgba(255, 255, 255, 0.9) 100%)',
            boxShadow: 'rgba(62, 111, 217, 0.08) 0px 14px 34px -4px, rgba(255, 255, 255, 0.95) 0px 1px 0px inset, rgba(255, 255, 255, 0.8) 0px 0px 0px 1px inset',
            border: '1px solid rgba(214, 228, 255, 0.85)',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />
          <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-blue-500/15 blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
          <div className="pointer-events-none absolute inset-0 z-0 opacity-40 bg-gradient-to-r from-transparent via-blue-200/50 to-transparent -skew-x-12 animate-glossy" />

          <div className="relative z-10">
            <div className="flex items-center justify-between pb-2">
              <div>
                <span className="font-label-eyebrow text-[10px] text-text-secondary uppercase font-bold tracking-wider">
                  Industry Verticals
                </span>
                <h3 className="font-headline-section text-base sm:text-lg font-bold text-text-primary">
                  Sector-wise Distribution
                </h3>
              </div>
              <span className="material-symbols-outlined text-text-secondary">pie_chart</span>
            </div>

            {/* Visual Donut Graph with Radar Sweep */}
            <div className="flex items-center justify-center py-3">
              <div className="relative w-44 h-44 group/donut">
                <div
                  className="absolute inset-0 pointer-events-none rounded-full animate-ring-pulse"
                  style={{
                    background: 'radial-gradient(circle, transparent 48%, rgba(139, 29, 44, 0.12) 58%, rgba(62, 111, 217, 0.12) 68%, rgba(30, 158, 90, 0.12) 78%, transparent 86%)',
                    filter: 'blur(3px)',
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none rounded-full animate-donut-sweep z-0"
                  style={{
                    maskImage: 'radial-gradient(circle, transparent 46%, black 52%, black 72%, transparent 78%)',
                    WebkitMaskImage: 'radial-gradient(circle, transparent 46%, black 52%, black 72%, transparent 78%)',
                    background: 'conic-gradient(from 0deg, rgba(139, 29, 44, 0.45) 0deg 180deg, rgba(62, 111, 217, 0.45) 180deg 260deg, rgba(30, 158, 90, 0.45) 260deg 310deg, rgba(231, 185, 74, 0.45) 310deg 340deg, rgba(14, 165, 233, 0.5) 340deg 360deg)',
                    mixBlendMode: 'multiply',
                    opacity: 0.75,
                  }}
                />

                <svg className="w-full h-full -rotate-90 relative z-10" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" fill="transparent" r="38" stroke="#8b1d2c" strokeDasharray="52 48" strokeDashoffset="0" strokeWidth="14" />
                  <circle cx="50" cy="50" fill="transparent" r="38" stroke="#3E6FD9" strokeDasharray="22 78" strokeDashoffset="-52" strokeWidth="14" />
                  <circle cx="50" cy="50" fill="transparent" r="38" stroke="#1E9E5A" strokeDasharray="14 86" strokeDashoffset="-74" strokeWidth="14" />
                  <circle cx="50" cy="50" fill="transparent" r="38" stroke="#785a00" strokeDasharray="8 92" strokeDashoffset="-88" strokeWidth="14" />
                  <circle cx="50" cy="50" fill="transparent" r="38" stroke="#484753" strokeDasharray="4 96" strokeDashoffset="-96" strokeWidth="14" />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
                  <span className="font-display-stat text-2xl font-extrabold text-text-primary leading-none">
                    5
                  </span>
                  <span className="font-label-eyebrow text-[10px] text-text-secondary uppercase font-bold tracking-wider mt-0.5">
                    Sectors
                  </span>
                </div>
              </div>
            </div>

            {/* Sector Legend List */}
            <div className="space-y-1.5 mt-1">
              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-surface-card/60 backdrop-blur-sm border border-white/60">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-primary-container" />
                  <span className="text-text-primary font-medium">IT &amp; Software Systems</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-text-primary">52%</span>
                  <span className="text-text-secondary">(957 offers)</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-surface-card/60 backdrop-blur-sm border border-white/60">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-info-blue" />
                  <span className="text-text-primary font-medium">Core Engineering</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-text-primary">22%</span>
                  <span className="text-text-secondary">(405 offers)</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-surface-card/60 backdrop-blur-sm border border-white/60">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-success-green" />
                  <span className="text-text-primary font-medium">BFSI &amp; FinTech</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-text-primary">14%</span>
                  <span className="text-text-secondary">(258 offers)</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-surface-card/60 backdrop-blur-sm border border-white/60">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-secondary" />
                  <span className="text-text-primary font-medium">Consulting &amp; Analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-text-primary">8%</span>
                  <span className="text-text-secondary">(147 offers)</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-surface-card/60 backdrop-blur-sm border border-white/60">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-tertiary-container" />
                  <span className="text-text-primary font-medium">EdTech &amp; Emerging</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-text-primary">4%</span>
                  <span className="text-text-secondary">(73 offers)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-3 pt-2 flex items-center justify-between bg-surface-card/80 backdrop-blur-md p-2.5 rounded-xl border border-white/80 shadow-xs">
            <span className="text-xs text-text-secondary">Core engineering +4.2% shift vs 2023</span>
            <span className="material-symbols-outlined text-success-green text-sm">trending_up</span>
          </div>
        </div>
      </div>

      {/* 5. Analytics Lower-Section: Department Progress & YoY Comparison Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Department-wise Placement Performance (6 Cols) */}
        <div
          className="lg:col-span-6 group relative rounded-2xl p-6 overflow-hidden backdrop-blur-xl border border-white/80 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(254, 248, 245, 0.82) 40%, rgba(255, 255, 255, 0.9) 100%)',
            boxShadow: 'rgba(107, 0, 24, 0.06) 0px 14px 34px -4px, rgba(255, 255, 255, 0.95) 0px 1px 0px inset, rgba(255, 255, 255, 0.6) 0px 0px 0px 1px inset',
            border: '1px solid rgba(255, 255, 255, 0.85)',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />
          <div className="absolute -right-16 -top-16 w-52 h-52 rounded-full bg-rose-500/10 blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
          <div className="absolute -left-12 -bottom-12 w-44 h-44 rounded-full bg-secondary-container/10 blur-2xl pointer-events-none" />
          <div className="pointer-events-none absolute inset-0 z-0 opacity-40 bg-gradient-to-r from-transparent via-rose-200/50 to-transparent -skew-x-12 animate-glossy" />

          <div className="relative z-10">
            <div className="flex items-center justify-between pb-2">
              <div>
                <span className="font-label-eyebrow text-[10px] text-text-secondary uppercase font-bold tracking-wider">
                  Constituent Units
                </span>
                <h3 className="font-headline-section text-base sm:text-lg font-bold text-text-primary">
                  Department-wise Placement Performance
                </h3>
              </div>
              <span className="material-symbols-outlined text-text-secondary">domain_verification</span>
            </div>
            <p className="text-xs text-text-secondary mb-4">
              Real-time status based on cleared final rounds and verified digital letters.
            </p>

            <div className="space-y-4">
              {/* Dept 1: CSE */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-text-primary">
                    Computer Science &amp; Engineering (CSE)
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-text-secondary">546 / 580 Placed</span>
                    <span className="font-bold text-primary-container">94.2%</span>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-surface-container-high rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-primary-container rounded-full" style={{ width: '94.2%' }} />
                </div>
              </div>

              {/* Dept 2: IT */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-text-primary">Information Technology (IT)</span>
                  <div className="flex items-center gap-2">
                    <span className="text-text-secondary">294 / 320 Placed</span>
                    <span className="font-bold text-primary-container">91.8%</span>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-surface-container-high rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-primary-container rounded-full" style={{ width: '91.8%' }} />
                </div>
              </div>

              {/* Dept 3: MBA */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-text-primary">School of Management Studies (MBA)</span>
                  <div className="flex items-center gap-2">
                    <span className="text-text-secondary">268 / 310 Placed</span>
                    <span className="font-bold text-info-blue">86.4%</span>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-surface-container-high rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-info-blue rounded-full" style={{ width: '86.4%' }} />
                </div>
              </div>

              {/* Dept 4: ECE */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-text-primary">Electronics &amp; Communication (ECE)</span>
                  <div className="flex items-center gap-2">
                    <span className="text-text-secondary">313 / 370 Placed</span>
                    <span className="font-bold text-info-blue">84.6%</span>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-surface-container-high rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-info-blue rounded-full" style={{ width: '84.6%' }} />
                </div>
              </div>

              {/* Dept 5: Mechanical */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-text-primary">Mechanical Engineering</span>
                  <div className="flex items-center gap-2">
                    <span className="text-text-secondary">419 / 535 Placed</span>
                    <span className="font-bold text-secondary">78.2%</span>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-surface-container-high rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-[#fece5d] rounded-full" style={{ width: '78.2%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-4 pt-2 flex items-center justify-between text-xs text-text-secondary border-t border-white/60">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-success-green">check_circle</span>
              All 5 schools surpassed NAAC 75% standard baseline
            </span>
            <button
              onClick={() => alert('Viewing detailed department drilldown analytics...')}
              className="font-semibold text-primary-container hover:text-primary-hover transition-colors"
            >
              Drilldown
            </button>
          </div>
        </div>

        {/* Year-over-Year Growth Comparison Table (6 Cols) */}
        <div
          className="lg:col-span-6 group relative rounded-2xl p-6 overflow-hidden backdrop-blur-xl border border-white/80 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(246, 248, 253, 0.85) 50%, rgba(255, 255, 255, 0.92) 100%)',
            boxShadow: 'rgba(107, 0, 24, 0.06) 0px 14px 34px -4px, rgba(255, 255, 255, 0.95) 0px 1px 0px inset, rgba(255, 255, 255, 0.7) 0px 0px 0px 1px inset',
            border: '1px solid rgba(225, 232, 246, 0.85)',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none z-10" />
          <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-emerald-500/15 blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
          <div className="absolute -left-10 -bottom-10 w-36 h-36 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-40 bg-gradient-to-r from-transparent via-emerald-200/50 to-transparent -skew-x-12 animate-glossy"
            style={{ animationDelay: '1.2s' }}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between pb-2">
              <div>
                <span className="font-label-eyebrow text-[10px] text-text-secondary uppercase font-bold tracking-wider">
                  Historical Trend Analysis
                </span>
                <h3 className="font-headline-section text-base sm:text-lg font-bold text-text-primary">
                  Year-over-Year Growth Comparison
                </h3>
              </div>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 border border-emerald-200/80 shadow-[0_2px_8px_rgba(30,158,90,0.08)] text-success-green font-label-badge text-xs font-semibold backdrop-blur-md">
                <span className="material-symbols-outlined text-xs">trending_up</span>
                <span>+19.4% 3Y CAGR</span>
              </div>
            </div>
            <p className="text-xs text-text-secondary mb-3">
              Four-year comparative audit data for Trust council reporting.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low/70 backdrop-blur-sm text-text-secondary font-label-eyebrow text-[11px] uppercase border border-white/60">
                    <th className="py-2.5 px-3 rounded-l-lg">Academic Year</th>
                    <th className="py-2.5 px-3">Placed / Total</th>
                    <th className="py-2.5 px-3">Rate (%)</th>
                    <th className="py-2.5 px-3">Avg CTC</th>
                    <th className="py-2.5 px-3 rounded-r-lg text-right">Max CTC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle/0 text-xs">
                  <tr className="bg-tint-maroon/20 hover:bg-tint-maroon/40 backdrop-blur-sm transition-all duration-300 rounded-xl shadow-xs border border-rose-200/80">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary-container shadow-sm" />
                        <span className="font-bold text-text-primary">2024–25 (Curr)</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-medium text-text-primary">1,840 / 2,233</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-tint-green text-success-green font-bold border border-emerald-200/80 shadow-xs">
                        82.4%
                      </span>
                    </td>
                    <td className="py-3 px-3 font-medium text-text-primary">₹7.42 LPA</td>
                    <td className="py-3 px-3 text-right font-bold text-primary-container">₹34.5 LPA</td>
                  </tr>
                  <tr className="hover:bg-white/80 transition-all duration-300 rounded-xl">
                    <td className="py-3 px-3 font-medium text-text-primary">2023–24</td>
                    <td className="py-3 px-3 text-text-secondary">1,642 / 2,150</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-text-primary font-semibold border border-white/60">
                        76.3%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-text-primary font-medium">₹6.58 LPA</td>
                    <td className="py-3 px-3 text-right text-text-primary font-semibold">₹28.0 LPA</td>
                  </tr>
                  <tr className="hover:bg-white/80 transition-all duration-300 rounded-xl">
                    <td className="py-3 px-3 font-medium text-text-primary">2022–23</td>
                    <td className="py-3 px-3 text-text-secondary">1,480 / 2,040</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-text-primary font-semibold border border-white/60">
                        72.5%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-text-primary font-medium">₹5.85 LPA</td>
                    <td className="py-3 px-3 text-right text-text-primary font-semibold">₹22.5 LPA</td>
                  </tr>
                  <tr className="hover:bg-white/80 transition-all duration-300 rounded-xl">
                    <td className="py-3 px-3 font-medium text-text-primary">2021–22</td>
                    <td className="py-3 px-3 text-text-secondary">1,310 / 1,980</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-text-primary font-semibold border border-white/60">
                        66.1%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-text-primary font-medium">₹5.10 LPA</td>
                    <td className="py-3 px-3 text-right text-text-primary font-semibold">₹18.0 LPA</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="relative z-10 mt-4 pt-2 flex items-center justify-between border-t border-white/60 text-xs">
            <div className="flex items-center gap-1.5 text-text-secondary">
              <span className="material-symbols-outlined text-info-blue text-sm">shield</span>
              <span>External Auditor Sign-off: Prof. H. S. Bawa</span>
            </div>
            <button
              onClick={() => alert('Downloading Historical Placement Trend CSV Data...')}
              className="px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white border border-white/80 shadow-xs hover:shadow-md text-text-primary hover:text-primary-container font-semibold flex items-center gap-1.5 transition-all duration-300"
            >
              <span>Download CSV</span>
              <span className="material-symbols-outlined text-sm">download</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6. Bottom Institutional Partner Mosaic & Summary Footer Card */}
      <div
        className="group relative rounded-2xl p-5 lg:p-6 overflow-hidden backdrop-blur-xl border border-white/80 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(254, 242, 244, 0.85) 45%, rgba(255, 255, 255, 0.92) 100%)',
          boxShadow: 'rgba(107, 0, 24, 0.08) 0px 14px 34px -4px, rgba(255, 255, 255, 0.95) 0px 1px 0px inset',
          border: '1px solid rgba(250, 210, 216, 0.85)',
        }}
      >
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />
        <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-rose-500/15 blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
        <div className="absolute -left-10 -bottom-10 w-44 h-44 rounded-full bg-secondary-fixed/30 blur-2xl pointer-events-none" />
        <div className="pointer-events-none absolute inset-0 z-0 opacity-40 bg-gradient-to-r from-transparent via-rose-200/50 to-transparent -skew-x-12 animate-glossy" />

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-container to-primary flex items-center justify-center text-white shrink-0 shadow-[0_4px_14px_rgba(107,0,24,0.28)] ring-1 ring-white/40">
            <span className="material-symbols-outlined text-2xl">verified_user</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-headline-section text-sm md:text-base font-bold text-text-primary tracking-tight">
                NIRF Data Synchronization Ready
              </span>
              <span className="px-2 py-0.5 rounded-full bg-tint-green text-success-green font-label-badge text-xs font-semibold border border-emerald-200/80 shadow-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success-green" />
                Compliant
              </span>
            </div>
            <span className="font-body-sm text-xs text-text-secondary mt-0.5">
              Calculations verified in accordance with UGC, AICTE, and NAAC Criterion 5 metrics.
            </span>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <button
            onClick={() => alert('Displaying NIRF & AICTE compliance audit verification logs...')}
            className="bg-white/90 hover:bg-white text-text-primary px-4 py-2.5 rounded-xl border border-white/80 shadow-xs hover:shadow-md font-label-button text-xs font-semibold transition-all duration-300"
          >
            Audit Log
          </button>
          <button
            onClick={() => alert('Successfully transmitted signed report dossier to RIMT Trust Executive Board!')}
            className="bg-gradient-to-r from-primary-container to-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-xl shadow-[0_4px_14px_rgba(107,0,24,0.28)] hover:shadow-xl font-label-button text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-[0.98] ring-1 ring-white/30"
          >
            <span className="material-symbols-outlined text-sm">send</span>
            <span>Submit to Trust Executive Board</span>
          </button>
        </div>
      </div>

      {/* Cohort Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col border border-white/80 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 bg-surface-hero text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container text-xl">tune</span>
                <h3 className="font-bold text-base">Select Cohort Audit Cycle</h3>
              </div>
              <button
                onClick={() => setShowFilterModal(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="p-6 flex flex-col gap-3">
              {['AY 2024–25', 'AY 2023–24', 'AY 2022–23', 'AY 2021–22'].map((cohort) => (
                <button
                  key={cohort}
                  onClick={() => {
                    setSelectedCohort(cohort);
                    setShowFilterModal(false);
                  }}
                  className={`w-full p-3.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between border transition-all ${
                    selectedCohort === cohort
                      ? 'bg-tint-maroon text-primary border-primary font-bold shadow-xs'
                      : 'bg-surface-card text-text-primary border-border-subtle hover:bg-surface-container'
                  }`}
                >
                  <span>Academic Cohort {cohort}</span>
                  {selectedCohort === cohort && (
                    <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
