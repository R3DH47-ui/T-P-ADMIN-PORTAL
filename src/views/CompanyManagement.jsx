'use client';

import React, { useState } from 'react';
import Modal from '../components/Modal';

export default function CompanyManagement({ globalSearch = '' }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedSpoc, setSelectedSpoc] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [historyCompany, setHistoryCompany] = useState(null);

  const companiesList = [
    {
      id: 'google',
      name: 'Google India Pvt Ltd',
      shortName: 'Google',
      industry: 'Software & Cloud Infrastructure',
      category: 'tier1 mou',
      icon: 'travel_explore',
      logoBg: 'bg-tint-blue/70 text-info-blue',
      tier: 'Tier 1 MNC',
      tierBg: 'bg-tint-maroon text-primary-container border-rose-200/60',
      mou: 'Active MoU 2023-26',
      ctc: 'CTC: 38-42 LPA',
      alumniPlaced: 48,
      activeDrives: 2,
      spoc: {
        name: 'Ananya Roy',
        initials: 'AR',
        role: 'Campus Recruitment Lead · India',
        phone: '+91 98144 20192',
        email: 'campus.in@google.com',
        location: 'Bangalore / Gurugram Tech Hub',
      },
    },
    {
      id: 'microsoft',
      name: 'Microsoft India Development Center',
      shortName: 'Microsoft',
      industry: 'Enterprise Tech & AI Systems',
      category: 'tier1 mou',
      icon: 'grid_view',
      logoBg: 'bg-tint-blue/70 text-info-blue',
      tier: 'Tier 1 MNC',
      tierBg: 'bg-tint-maroon text-primary-container border-rose-200/60',
      mou: 'Apex Recruiter',
      mouBg: 'bg-[#FFF8E6] text-[#785a00] border-amber-200/70',
      ctc: 'CTC: 44.0 LPA',
      alumniPlaced: 34,
      activeDrives: 1,
      spoc: {
        name: 'Vikramaditya Khanna',
        initials: 'VK',
        role: 'Director - University Relations',
        phone: '+91 99881 12390',
        email: 'vkhanna@microsoft.com',
        location: 'Hyderabad IDC & Noida',
      },
    },
    {
      id: 'tcs',
      name: 'Tata Consultancy Services',
      shortName: 'TCS',
      industry: 'IT Services & Digital Solutions',
      category: 'tier1 mou core',
      icon: 'hub',
      logoBg: 'bg-tint-maroon/70 text-primary-container',
      tier: 'Mass Recruiter',
      tierBg: 'bg-tint-maroon text-primary-container border-rose-200/60',
      mou: 'MoU Partner (TCS iON)',
      mouBg: 'bg-tint-green text-success-green border-emerald-200/60',
      ctc: 'Ninja & Digital Track',
      alumniPlaced: 312,
      activeDrives: 3,
      spoc: {
        name: 'Ramanpreet Singh',
        initials: 'RS',
        role: 'Regional Lead TAG - North Hub',
        phone: '+91 97800 44211',
        email: 'raman.singh@tcs.com',
        location: 'Chandigarh / Mohali Delivery Center',
      },
    },
    {
      id: 'lt',
      name: 'Larsen & Toubro Ltd',
      shortName: 'L&T',
      industry: 'Core Infrastructure & Engineering',
      category: 'core mou',
      icon: 'precision_manufacturing',
      logoBg: 'bg-tint-green/70 text-success-green',
      tier: 'Core Engineering',
      tierBg: 'bg-tint-maroon text-primary-container border-rose-200/60',
      mou: 'Active MoU 2024-27',
      ctc: 'CTC: 8.5-12.0 LPA',
      alumniPlaced: 78,
      activeDrives: 1,
      spoc: {
        name: 'Vikram Chawla',
        initials: 'VC',
        role: 'Talent Acquisition Partner',
        phone: '+91 98888 77665',
        email: 'v.chawla@larsentoubro.com',
        location: 'Mumbai Corporate Office',
      },
    },
    {
      id: 'hdfc',
      name: 'HDFC Bank Ltd',
      shortName: 'HDFC Bank',
      industry: 'BFSI & Digital Fintech',
      category: 'bfsi',
      icon: 'account_balance',
      logoBg: 'bg-amber-100 text-amber-800',
      tier: 'BFSI Sector',
      tierBg: 'bg-tint-maroon text-primary-container border-rose-200/60',
      mou: 'Active Partner',
      ctc: 'CTC: 9.0-14.5 LPA',
      alumniPlaced: 52,
      activeDrives: 1,
      spoc: {
        name: 'Ritu Bhargava',
        initials: 'RB',
        role: 'Head of Fintech Recruitment',
        phone: '+91 98111 22339',
        email: 'ritu.b@hdfcbank.com',
        location: 'New Delhi Regional Office',
      },
    },
  ];

  const effectiveSearch = (globalSearch || searchQuery).toLowerCase().trim();

  const filtered = companiesList.filter((comp) => {
    if (activeFilter !== 'all' && !comp.category.includes(activeFilter)) {
      return false;
    }
    if (effectiveSearch) {
      const match =
        comp.name.toLowerCase().includes(effectiveSearch) ||
        comp.industry.toLowerCase().includes(effectiveSearch) ||
        comp.spoc.name.toLowerCase().includes(effectiveSearch);
      if (!match) return false;
    }
    return true;
  });

  const filterPills = [
    { id: 'all', label: `All Companies (${companiesList.length})` },
    { id: 'tier1', label: 'Tier-1 / IT Tech' },
    { id: 'core', label: 'Core Engineering' },
    { id: 'bfsi', label: 'BFSI & Fintech' },
    { id: 'consulting', label: 'Consulting & Analytics' },
    { id: 'mou', label: 'MoU Partners' },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
      {/* Animations */}
      <style>{`
        @keyframes sweep {
          0% { transform: translateX(-150%) rotate(25deg); opacity: 0; }
          30% { opacity: 0.7; }
          70% { opacity: 0.7; }
          100% { transform: translateX(250%) rotate(25deg); opacity: 0; }
        }
        .animate-sweep { animation: sweep 4s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        @keyframes heroSheenBeam {
          0% { transform: translateX(-150%) skewX(-20deg); }
          40%, 100% { transform: translateX(250%) skewX(-20deg); }
        }
        .hero-light-sweep { animation: heroSheenBeam 6s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      `}</style>

      {/* Top Action Ribbon */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="font-label-eyebrow text-label-eyebrow text-text-secondary uppercase">
              Placement &amp; Corporate Relations
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full font-label-badge text-label-badge bg-tint-maroon text-primary-container text-[11px] font-bold">
              AY 2024-25
            </span>
          </div>
          <h1 className="font-headline-page text-xl sm:text-2xl text-text-primary tracking-tight font-bold">
            Company Management &amp; Corporate Relations
          </h1>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => alert('Downloading RIMT Corporate Recruitment Directory PDF/Excel...')}
            className="group relative h-10 px-4 bg-white/80 backdrop-blur-md text-text-primary font-label-button text-label-button rounded-full border border-white/60 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 flex items-center gap-2 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 243, 249, 0.65) 100%)',
              boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 16px, rgba(255, 255, 255, 0.85) 0px 1px 1px inset',
            }}
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none transition-transform" />
            <span className="material-symbols-outlined text-lg text-primary transition-transform duration-300 group-hover:-translate-y-0.5">
              download
            </span>
            <span className="tracking-tight font-medium">Download Corporate Directory</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="group relative h-10 px-5 text-white font-label-button text-label-button rounded-full shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-300 flex items-center gap-2 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgb(165, 35, 54) 0%, rgb(139, 29, 44) 50%, rgb(110, 21, 33) 100%)',
              boxShadow: 'rgba(139, 29, 44, 0.35) 0px 4px 14px, rgba(255, 255, 255, 0.4) 0px 1px 1px inset, rgba(0, 0, 0, 0.2) 0px -1px 2px inset',
              border: '1px solid rgba(255, 255, 255, 0.25)',
            }}
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none transition-transform" />
            <span className="material-symbols-outlined text-lg text-white transition-transform duration-300 group-hover:rotate-90">
              add_circle
            </span>
            <span className="tracking-tight font-medium text-white">+ Add New Company</span>
          </button>
        </div>
      </div>

      {/* Dark Hero Card (#15151F) with High Zoom Animation */}
      <div className="group relative overflow-hidden rounded-2xl bg-[#15151F] text-white p-5 sm:p-6 lg:p-7 shadow-xl border-t border-white/20 ring-1 ring-white/10 cursor-pointer select-none transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] hover:-translate-y-1.5 hover:shadow-2xl hover:z-20 active:scale-[0.99]">
        {/* Animated sweep beam */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div
            className="hero-light-sweep absolute -inset-y-full w-[60%] h-[300%] blur-sm"
            style={{
              background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.08) 45%, rgba(239,192,80,0.14) 52%, rgba(255,255,255,0.06) 58%, transparent 80%)',
            }}
          />
        </div>
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-gradient-to-br from-primary-container/20 to-transparent blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
        <div className="absolute right-40 -bottom-16 w-56 h-56 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-1 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white backdrop-blur-md transform transition-transform duration-300 group-hover:scale-105">
                <span
                  className="material-symbols-outlined text-sm text-[#efc050]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                Accredited Partners Tier-1
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-300 font-medium">Global Corporate Alliances</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
              Corporate Hiring Network &amp; Placement Partnerships
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Coordinating centralized on-campus &amp; virtual recruitment cycles, corporate engagement MoUs, and high-value internships across RIMT constituent institutes.
            </p>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-2 pt-2 border-t border-white/10 text-xs">
              <div className="flex items-center gap-1.5 text-slate-200">
                <span className="w-2 h-2 rounded-full bg-[#1E9E5A]" />
                <span className="font-semibold text-white">128 Active Hiring Partners</span>
              </div>
              <span className="text-slate-500">•</span>
              <div className="flex items-center gap-1.5 text-slate-200">
                <span className="material-symbols-outlined text-[#fece5d] text-sm">history_edu</span>
                <span>32 New MoUs Signed in 2024-25</span>
              </div>
              <span className="text-slate-500">•</span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="material-symbols-outlined text-info-blue text-sm">event_repeat</span>
                <span>18 On-Campus Drives Scheduled This Month</span>
              </div>
            </div>
          </div>

          <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 self-stretch lg:self-center border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-8 shrink-0 transform transition-all duration-300 hover:scale-105">
            <div className="text-left lg:text-right">
              <div className="text-xs text-slate-400 font-label-eyebrow uppercase">Trust Target Status</div>
              <div className="text-xl font-extrabold text-white transform transition-transform duration-300 group-hover:scale-105 origin-left lg:origin-right">88.4% Concluded</div>
            </div>
            <div className="w-36 bg-white/15 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-secondary-container to-success-green rounded-full"
                style={{ width: '88.4%' }}
              />
            </div>
            <span className="text-[11px] text-slate-300">Target: 200 Corporate Partners</span>
          </div>
        </div>
      </div>

      {/* 4 KPI Stat Cards (Glossy with Animated Color Sweep & High Zoom Hover) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1: Total Corporate Partners (Blue sweep) */}
        <div className="relative overflow-hidden bg-surface-card rounded-2xl p-5 sm:p-6 shadow-sm border border-border-subtle/80 flex flex-col justify-between cursor-pointer select-none transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.045] hover:-translate-y-2 hover:shadow-2xl hover:z-20 active:scale-[0.98] group">
          <div
            className="animate-sweep absolute -inset-y-full -left-1/4 w-[70%] h-[300%] bg-gradient-to-r from-transparent via-blue-400/25 to-transparent pointer-events-none blur-[2px]"
            style={{ animationDelay: '0s' }}
          />
          <div className="relative z-10 flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-tint-blue text-info-blue flex items-center justify-center shadow-xs border border-blue-100 transform transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-[-2deg]">
              <span className="material-symbols-outlined text-[22px]">domain</span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tint-blue text-info-blue font-label-badge text-label-badge border border-blue-200/60 shadow-xs transform transition-transform duration-300 group-hover:scale-105">
              <span className="w-1.5 h-1.5 rounded-full bg-info-blue animate-pulse" />
              Active tier
            </span>
          </div>
          <div className="relative z-10 mt-4">
            <div className="font-display-stat text-display-stat text-text-primary tracking-tight font-extrabold transform transition-transform duration-300 group-hover:scale-[1.03] origin-left">186</div>
            <div className="font-body-medium text-body-medium font-semibold text-text-primary mt-1">Total Corporate Partners</div>
            <div className="font-body-sm text-body-sm text-text-secondary mt-0.5">+18 registered this session</div>
          </div>
        </div>

        {/* Card 2: Signed MoUs (Emerald sweep) */}
        <div className="relative overflow-hidden bg-surface-card rounded-2xl p-5 sm:p-6 shadow-sm border border-border-subtle/80 flex flex-col justify-between cursor-pointer select-none transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.045] hover:-translate-y-2 hover:shadow-2xl hover:z-20 active:scale-[0.98] group">
          <div
            className="animate-sweep absolute -inset-y-full -left-1/4 w-[70%] h-[300%] bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent pointer-events-none blur-[2px]"
            style={{ animationDelay: '0.8s' }}
          />
          <div className="relative z-10 flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-tint-green text-success-green flex items-center justify-center shadow-xs border border-emerald-100 transform transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-[-2deg]">
              <span className="material-symbols-outlined text-[22px]">description</span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tint-green text-success-green font-label-badge text-label-badge border border-emerald-200/60 shadow-xs transform transition-transform duration-300 group-hover:scale-105">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              100% active
            </span>
          </div>
          <div className="relative z-10 mt-4">
            <div className="font-display-stat text-display-stat text-text-primary tracking-tight font-extrabold transform transition-transform duration-300 group-hover:scale-[1.03] origin-left">54</div>
            <div className="font-body-medium text-body-medium font-semibold text-text-primary mt-1">Signed MoUs</div>
            <div className="font-body-sm text-body-sm text-text-secondary mt-0.5">Legal verification complete</div>
          </div>
        </div>

        {/* Card 3: Companies in Active Drives (Rose sweep) */}
        <div className="relative overflow-hidden bg-surface-card rounded-2xl p-5 sm:p-6 shadow-sm border border-border-subtle/80 flex flex-col justify-between cursor-pointer select-none transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.045] hover:-translate-y-2 hover:shadow-2xl hover:z-20 active:scale-[0.98] group">
          <div
            className="animate-sweep absolute -inset-y-full -left-1/4 w-[70%] h-[300%] bg-gradient-to-r from-transparent via-rose-400/25 to-transparent pointer-events-none blur-[2px]"
            style={{ animationDelay: '1.6s' }}
          />
          <div className="relative z-10 flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-tint-maroon text-primary-container flex items-center justify-center shadow-xs border border-rose-100 transform transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-[-2deg]">
              <span className="material-symbols-outlined text-[22px]">business_center</span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tint-maroon text-primary font-label-badge text-label-badge border border-rose-200/60 shadow-xs transform transition-transform duration-300 group-hover:scale-105">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
              Ongoing hiring
            </span>
          </div>
          <div className="relative z-10 mt-4">
            <div className="font-display-stat text-display-stat text-text-primary tracking-tight font-extrabold transform transition-transform duration-300 group-hover:scale-[1.03] origin-left">26</div>
            <div className="font-body-medium text-body-medium font-semibold text-text-primary mt-1">Companies in Active Drives</div>
            <div className="font-body-sm text-body-sm text-text-secondary mt-0.5">1,420 students participating</div>
          </div>
        </div>

        {/* Card 4: Avg Placement Package (Amber sweep) */}
        <div className="relative overflow-hidden bg-surface-card rounded-2xl p-5 sm:p-6 shadow-sm border border-border-subtle/80 flex flex-col justify-between cursor-pointer select-none transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.045] hover:-translate-y-2 hover:shadow-2xl hover:z-20 active:scale-[0.98] group">
          <div
            className="animate-sweep absolute -inset-y-full -left-1/4 w-[70%] h-[300%] bg-gradient-to-r from-transparent via-amber-400/25 to-transparent pointer-events-none blur-[2px]"
            style={{ animationDelay: '2.4s' }}
          />
          <div className="relative z-10 flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-[#FEF7E6] text-[#785a00] flex items-center justify-center shadow-xs border border-amber-100 transform transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-[-2deg]">
              <span className="material-symbols-outlined text-[22px]">payments</span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FEF7E6] text-[#785a00] font-label-badge text-label-badge border border-amber-200/70 shadow-xs transform transition-transform duration-300 group-hover:scale-105">
              <span className="material-symbols-outlined text-[13px]">trending_up</span>
              +14% vs 2024
            </span>
          </div>
          <div className="relative z-10 mt-4">
            <div className="font-display-stat text-display-stat text-text-primary tracking-tight font-extrabold transform transition-transform duration-300 group-hover:scale-[1.03] origin-left">₹7.4 LPA</div>
            <div className="font-body-medium text-body-medium font-semibold text-text-primary mt-1">Avg Placement Package</div>
            <div className="font-body-sm text-body-sm text-text-secondary mt-0.5">Highest: ₹44.0 LPA (Microsoft)</div>
          </div>
        </div>
      </div>

      {/* Filter Pills & Search Utilities (Glossy bar) */}
      <div
        className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-sm border border-white/80 ring-1 ring-black/5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.88) 0%, rgba(245, 247, 252, 0.75) 100%)',
          boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 20px -2px, rgba(255, 255, 255, 0.9) 0px 1px 1px inset',
        }}
      >
        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none z-10">
          {filterPills.map((pill) => {
            const isActive = activeFilter === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setActiveFilter(pill.id)}
                className={`group relative h-9 px-4 rounded-full font-label-button text-label-button transition-all duration-300 flex items-center justify-center overflow-hidden shrink-0 whitespace-nowrap ${
                  isActive
                    ? 'text-white shadow-md hover:shadow-lg hover:scale-[1.01]'
                    : 'text-text-primary hover:text-primary bg-white/70 hover:bg-white/95 backdrop-blur-md border border-white/80 hover:border-slate-300/80 shadow-xs hover:shadow-sm hover:scale-[1.01]'
                }`}
                style={
                  isActive
                    ? {
                        background: 'linear-gradient(135deg, rgb(165, 35, 54) 0%, rgb(139, 29, 44) 50%, rgb(110, 21, 33) 100%)',
                        boxShadow: 'rgba(139, 29, 44, 0.35) 0px 4px 12px, rgba(255, 255, 255, 0.35) 0px 1px 1px inset',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                      }
                    : {
                        boxShadow: '0 1px 2px rgba(0,0,0,0.03), inset 0 1px 1px rgba(255,255,255,0.9)',
                      }
                }
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none transition-transform" />
                <span className={`relative z-10 ${isActive ? 'font-semibold tracking-tight' : 'font-medium'}`}>
                  {pill.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & View Toggle */}
        <div className="flex items-center gap-2 z-10">
          <div className="relative flex-1 sm:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-base">
              filter_list
            </span>
            <input
              className="w-full h-9 pl-9 pr-3 bg-white/70 hover:bg-white/90 focus:bg-white text-text-primary placeholder:text-text-secondary rounded-xl font-body-default text-body-default outline-none border border-white/80 focus:border-primary-container shadow-xs transition-all duration-200"
              placeholder="Filter company or SPOC..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)' }}
            />
          </div>
          <div className="flex bg-surface-container-low/70 backdrop-blur-md p-0.5 rounded-xl border border-white/60 shadow-xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-white shadow-xs text-primary-container border border-white/80'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
              title="Card View"
            >
              <span className="material-symbols-outlined text-lg">grid_view</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'table'
                  ? 'bg-white shadow-xs text-primary-container border border-white/80'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
              title="Table View"
            >
              <span className="material-symbols-outlined text-lg">format_list_bulleted</span>
            </button>
          </div>
        </div>
      </div>

      {/* Company Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((comp) => (
          <div
            key={comp.id}
            className="company-card group relative rounded-2xl p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:scale-[1.01] flex flex-col justify-between overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.62) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.9)',
              boxShadow: 'rgba(255, 255, 255, 0.95) 0px 1px 1px inset, rgba(0, 0, 0, 0.05) 0px 10px 25px -5px, rgba(0, 0, 0, 0.03) 0px 8px 10px -6px',
            }}
          >
            {/* Hover sheen */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none transition-transform" />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl backdrop-blur-md flex items-center justify-center font-display-stat border border-white/80 shadow-xs ${comp.logoBg}`}
                  >
                    <span className="material-symbols-outlined text-2xl">{comp.icon}</span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-headline-section text-headline-section text-text-primary leading-snug">
                      {comp.shortName}
                    </h3>
                    <span className="font-body-sm text-body-sm text-text-secondary">{comp.industry}</span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-badge text-label-badge bg-tint-green/80 text-success-green border border-emerald-200/60 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-success-green" />
                  Verified Partner
                </span>
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className={`px-2 py-0.5 rounded-md font-label-badge text-label-badge border ${comp.tierBg}`}>
                  {comp.tier}
                </span>
                <span className={`px-2 py-0.5 rounded-md font-label-badge text-label-badge border ${comp.mouBg || 'bg-surface-container-low/70 text-text-secondary border-white/60'}`}>
                  {comp.mou}
                </span>
                <span className="px-2 py-0.5 rounded-md font-label-badge text-label-badge bg-tint-blue text-info-blue border border-blue-200/60">
                  {comp.ctc}
                </span>
              </div>

              {/* SPOC Info Box */}
              <div className="mt-4 p-2.5 bg-surface-container-low/70 backdrop-blur-md rounded-xl border border-white/60 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-white shadow-xs border border-white/80 flex items-center justify-center font-semibold text-text-primary text-xs shrink-0">
                    {comp.spoc.initials || comp.spoc.name.split(' ').map((n) => n[0]).join('').substring(0, 2)}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-button text-label-button text-text-primary truncate">
                      {comp.spoc.name}
                    </span>
                    <span className="font-body-sm text-body-sm text-text-secondary truncate">
                      {comp.spoc.role}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSpoc(comp.spoc)}
                  className="text-primary-container hover:text-primary-hover p-1 rounded transition-colors"
                  title="View Full SPOC Info"
                >
                  <span className="material-symbols-outlined text-lg">contact_page</span>
                </button>
              </div>

              {/* Placement Stat Line */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-center py-2 bg-surface-container-low/50 backdrop-blur-md rounded-xl border border-white/60 shadow-xs">
                <div>
                  <div className="font-headline-section text-headline-section text-text-primary">{comp.alumniPlaced}</div>
                  <div className="font-body-sm text-body-sm text-text-secondary">Alumni Placed</div>
                </div>
                <div>
                  <div className="font-headline-section text-headline-section text-success-green">{comp.activeDrives}</div>
                  <div className="font-body-sm text-body-sm text-text-secondary">Active Drives</div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="relative z-10 mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
              <button
                onClick={() => alert(`Opening Schedule Drive Modal for ${comp.name}`)}
                className="flex-1 h-9 rounded-lg bg-primary-container text-on-primary font-label-button text-label-button hover:bg-primary-hover shadow-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">calendar_add_on</span>
                <span>Schedule Drive</span>
              </button>
              <button
                onClick={() => setHistoryCompany(comp)}
                className="px-3 h-9 rounded-lg bg-white/80 hover:bg-white text-text-primary font-label-button text-label-button border border-white/80 shadow-xs transition-colors"
                title="Hiring History"
              >
                <span className="material-symbols-outlined text-base">history</span>
              </button>
              <button
                onClick={() => alert(`Edit Company Profile: ${comp.name}`)}
                className="px-3 h-9 rounded-lg bg-white/80 hover:bg-white text-text-primary font-label-button text-label-button border border-white/80 shadow-xs transition-colors"
                title="Edit Company"
              >
                <span className="material-symbols-outlined text-base">edit</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SPOC Contact Card Modal */}
      {selectedSpoc && (
        <Modal
          isOpen={!!selectedSpoc}
          onClose={() => setSelectedSpoc(null)}
          title={selectedSpoc.name}
          subtitle={selectedSpoc.role}
        >
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-surface-container-low rounded-xl">
              <span className="text-text-secondary">Phone:</span>
              <p className="font-bold text-text-primary font-mono text-sm">{selectedSpoc.phone}</p>
            </div>
            <div className="p-3 bg-surface-container-low rounded-xl">
              <span className="text-text-secondary">Official Email:</span>
              <p className="font-bold text-text-primary font-mono text-sm">{selectedSpoc.email}</p>
            </div>
            <div className="p-3 bg-surface-container-low rounded-xl">
              <span className="text-text-secondary">Location:</span>
              <p className="font-bold text-text-primary">{selectedSpoc.location}</p>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedSpoc(null)}
                className="px-4 py-2 rounded-xl bg-primary text-white font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* History Modal */}
      {historyCompany && (
        <Modal
          isOpen={!!historyCompany}
          onClose={() => setHistoryCompany(null)}
          title={`Hiring History: ${historyCompany.name}`}
          subtitle="Past recruitment cycles and student hires"
        >
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-surface-container-low rounded-xl flex justify-between">
              <span>Total Hired:</span>
              <span className="font-bold text-primary">{historyCompany.alumniPlaced} Scholars</span>
            </div>
            <div className="p-3 bg-surface-container-low rounded-xl flex justify-between">
              <span>MoU Status:</span>
              <span className="font-bold text-success-green">{historyCompany.mou}</span>
            </div>
            <div className="p-3 bg-surface-container-low rounded-xl flex justify-between">
              <span>Standard Package:</span>
              <span className="font-bold text-text-primary">{historyCompany.ctc}</span>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setHistoryCompany(null)}
                className="px-4 py-2 rounded-xl bg-primary text-white font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Company Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Corporate Partner"
        subtitle="Register a new visiting employer and campus SPOC."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('Company registered successfully!');
            setShowAddModal(false);
          }}
          className="space-y-3 text-xs"
        >
          <div>
            <label className="block font-semibold text-text-primary mb-1">Company Legal Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Amazon India"
              className="w-full h-10 px-3 rounded-xl border border-border-subtle focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold text-text-primary mb-1">Industry Sector</label>
            <input
              type="text"
              required
              placeholder="Cloud & E-Commerce"
              className="w-full h-10 px-3 rounded-xl border border-border-subtle focus:border-primary focus:outline-none"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 rounded-xl text-text-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 rounded-xl bg-primary text-white font-bold">
              Register Company
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
