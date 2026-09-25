'use client';

import React, { useState, useMemo } from 'react';

export default function DriveManagement({ globalSearch = '' }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [viewMode, setViewMode] = useState('agenda');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedDrive, setSelectedDrive] = useState(null);

  // Form state for creating a new drive
  const [newCompany, setNewCompany] = useState('');
  const [newCtc, setNewCtc] = useState('');
  const [newCgpa, setNewCgpa] = useState('');

  // Initial drives list based on exact Stitch design
  const [drivesList, setDrivesList] = useState([
    {
      id: 'tcs',
      abbr: 'TCS',
      abbrBg: 'bg-gradient-to-br from-primary-container to-primary text-white shadow-[0_4px_14px_rgba(107,0,24,0.28)] ring-1 ring-white/40',
      name: 'Tata Consultancy Services (TCS)',
      status: 'In Progress',
      statusType: 'ongoing',
      badge: 'Campus Drive',
      badgeStyle: 'bg-surface-container text-on-surface-variant',
      ctc: '₹7.5 – 11.5 LPA',
      eligibility: 'B.Tech CSE / IT • CGPA ≥ 6.5',
      registeredText: '320 registered • 142 in Round 2',
      category: 'ongoing',
      stages: [
        { label: '1. OA (Done)', icon: 'check_circle', active: true, done: true },
        { label: '2. Tech Viva (Ongoing)', icon: 'hourglass_top', active: true, ongoing: true },
        { label: '3. Managerial HR', active: false },
        { label: '4. Final Rollout', active: false },
      ],
      panelTitle: 'Interview Panel',
      panelLocation: 'Auditorium 1 (Panel 1–8)',
      panelTime: 'Oct 14, 09:00 AM IST',
      cardGradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(254, 242, 244, 0.75) 45%, rgba(255, 255, 255, 0.88) 100%)',
      cardShadow: 'rgba(139, 29, 44, 0.08) 0px 16px 36px -10px, rgba(0, 0, 0, 0.04) 0px 4px 18px 0px, rgba(255, 255, 255, 0.95) 0px 1px 1px 0px inset, rgba(0, 0, 0, 0.03) 0px -1px 2px 0px inset',
      glowColor: 'bg-rose-500/15',
      sheenColor: 'from-transparent via-rose-200/50 to-transparent',
    },
    {
      id: 'infosys',
      abbr: 'INFY',
      abbrBg: 'bg-tint-blue text-info-blue shadow-inner font-extrabold',
      name: 'Infosys SpringBoard Recruitment',
      status: 'Registration Open',
      statusType: 'upcoming',
      badge: 'Pan-Campus Pooled',
      badgeStyle: 'bg-surface-container text-on-surface-variant',
      ctc: '₹6.5 – 9.5 LPA',
      eligibility: 'B.Tech & MCA • CGPA ≥ 7.0 • No Active Backlogs',
      registeredText: 'Closes in 48 hours',
      category: 'upcoming',
      stages: [
        { label: '1. Portal Registration (410 Submissions)', icon: 'assignment', active: true, info: true },
        { label: '2. InfyTQ Aptitude Exam', active: false },
        { label: '3. Technical + HR Interview', active: false },
      ],
      panelTitle: 'Assessment Date',
      panelLocation: 'Oct 19, 2025',
      panelTime: '410 Candidates Registered',
      cardGradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(240, 246, 255, 0.78) 45%, rgba(255, 255, 255, 0.88) 100%)',
      cardShadow: 'rgba(62, 111, 217, 0.08) 0px 16px 36px -10px, rgba(0, 0, 0, 0.04) 0px 4px 18px 0px, rgba(255, 255, 255, 0.95) 0px 1px 1px 0px inset, rgba(0, 0, 0, 0.03) 0px -1px 2px 0px inset',
      glowColor: 'bg-blue-500/15',
      sheenColor: 'from-transparent via-blue-200/50 to-transparent',
    },
    {
      id: 'wipro',
      abbr: 'WIPRO',
      abbrBg: 'bg-secondary-fixed/30 text-secondary shadow-inner ring-1 ring-white/60 font-extrabold',
      name: 'Wipro Elite National Talent Hunt',
      status: 'Round 3 Ongoing',
      statusType: 'ongoing',
      badge: 'National Grid',
      badgeStyle: 'bg-surface-container text-on-surface-variant',
      ctc: '₹5.5 – 7.0 LPA',
      eligibility: 'All Engineering Branches • CGPA ≥ 6.0',
      registeredText: '86 Active in Stage 3',
      category: 'ongoing',
      stages: [
        { label: '1. Aptitude Test', icon: 'check_circle', active: true, done: true },
        { label: '2. Coding Round', icon: 'check_circle', active: true, done: true },
        { label: '3. Technical Interviews', icon: 'call', active: true, amber: true },
        { label: '4. HR Assessment', active: false },
      ],
      panelTitle: 'Interview Mode',
      panelLocation: 'Virtual MS Teams Panels',
      panelTime: 'Today, Concluding 5:30 PM',
      cardGradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(254, 252, 232, 0.75) 45%, rgba(255, 255, 255, 0.88) 100%)',
      cardShadow: 'rgba(239, 192, 80, 0.08) 0px 16px 36px -10px, rgba(0, 0, 0, 0.04) 0px 4px 18px 0px, rgba(255, 255, 255, 0.95) 0px 1px 1px 0px inset, rgba(0, 0, 0, 0.03) 0px -1px 2px 0px inset',
      glowColor: 'bg-amber-500/15',
      sheenColor: 'from-transparent via-amber-200/50 to-transparent',
    },
    {
      id: 'amazon',
      abbr: 'AMZN',
      abbrBg: 'bg-tint-green text-success-green shadow-inner ring-1 ring-white/60 font-extrabold',
      name: 'Amazon WOW & FTE Software Dev',
      status: 'Offer Rollout Phase',
      statusType: 'completed',
      badge: 'High Package Tier',
      badgeStyle: 'bg-tint-maroon text-primary-container font-bold border border-rose-200/80 shadow-sm',
      ctc: '₹28.0 LPA',
      eligibility: 'Role: SDE-1 • 14 Shortlisted for Offers',
      registeredText: 'Stage: Final HR Round Completed',
      category: 'completed',
      stages: [
        { label: '1. Debugging Test', icon: 'check_circle', active: true, done: true },
        { label: '2. DSA Tech Rounds (3x)', icon: 'check_circle', active: true, done: true },
        { label: '3. Bar Raiser HR', icon: 'check_circle', active: true, done: true },
        { label: '4. 14 Letter Of Intents Pending', icon: 'verified_user', active: true, done: true },
      ],
      panelTitle: 'Placement Status',
      panelLocation: '14 Verified Offers',
      panelTime: 'LOI Distribution Today',
      cardGradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(240, 253, 244, 0.78) 45%, rgba(255, 255, 255, 0.88) 100%)',
      cardShadow: 'rgba(30, 158, 90, 0.08) 0px 16px 36px -10px, rgba(0, 0, 0, 0.04) 0px 4px 18px 0px, rgba(255, 255, 255, 0.95) 0px 1px 1px 0px inset, rgba(0, 0, 0, 0.03) 0px -1px 2px 0px inset',
      glowColor: 'bg-emerald-500/15',
      sheenColor: 'from-transparent via-emerald-200/50 to-transparent',
    },
  ]);

  const effectiveSearch = (globalSearch || searchFilter).toLowerCase().trim();

  const filteredDrives = useMemo(() => {
    return drivesList.filter((drive) => {
      if (activeFilter === 'ongoing' && drive.category !== 'ongoing') return false;
      if (activeFilter === 'upcoming' && drive.category !== 'upcoming') return false;
      if (activeFilter === 'completed' && drive.category !== 'completed') return false;
      if (activeFilter === 'archived' && drive.category !== 'archived') return false;

      if (effectiveSearch) {
        const matches =
          drive.name.toLowerCase().includes(effectiveSearch) ||
          drive.ctc.toLowerCase().includes(effectiveSearch) ||
          drive.eligibility.toLowerCase().includes(effectiveSearch);
        if (!matches) return false;
      }
      return true;
    });
  }, [drivesList, activeFilter, effectiveSearch]);

  const handleCreateDriveSubmit = (e) => {
    e.preventDefault();
    if (!newCompany.trim()) return;

    const newDrive = {
      id: `drive-${Date.now()}`,
      abbr: newCompany.slice(0, 4).toUpperCase(),
      abbrBg: 'bg-tint-blue text-info-blue shadow-inner font-extrabold',
      name: newCompany,
      status: 'Registration Open',
      statusType: 'upcoming',
      badge: 'Campus Drive',
      badgeStyle: 'bg-surface-container text-on-surface-variant',
      ctc: newCtc ? `₹${newCtc}` : '₹8.0 – 12.0 LPA',
      eligibility: `B.Tech CSE/IT • CGPA ≥ ${newCgpa || '7.0'}`,
      registeredText: 'New drive scheduled',
      category: 'upcoming',
      stages: [
        { label: '1. Online Registration', icon: 'assignment', active: true, info: true },
        { label: '2. Aptitude & Technical Exam', active: false },
        { label: '3. Technical Interview', active: false },
        { label: '4. Final HR Assessment', active: false },
      ],
      panelTitle: 'Assessment Date',
      panelLocation: 'Upcoming Week',
      panelTime: '0 Candidates Registered',
      cardGradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(240, 246, 255, 0.78) 45%, rgba(255, 255, 255, 0.88) 100%)',
      cardShadow: 'rgba(62, 111, 217, 0.08) 0px 16px 36px -10px, rgba(0, 0, 0, 0.04) 0px 4px 18px 0px, rgba(255, 255, 255, 0.95) 0px 1px 1px 0px inset, rgba(0, 0, 0, 0.03) 0px -1px 2px 0px inset',
      glowColor: 'bg-blue-500/15',
      sheenColor: 'from-transparent via-blue-200/50 to-transparent',
    };

    setDrivesList([newDrive, ...drivesList]);
    setNewCompany('');
    setNewCtc('');
    setNewCgpa('');
    setShowCreateModal(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
      {/* 1. Top Action Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-label-eyebrow text-[11px] text-text-secondary uppercase tracking-wider font-bold">
              MODULE 03 • T&amp;P OPERATIONS
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-tint-maroon text-primary border border-rose-200/80">
              LIVE CYCLE
            </span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="font-headline-page text-2xl lg:text-3xl text-text-primary tracking-tight font-extrabold">
              Placement Drive Management
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-badge text-xs font-semibold">
              2024-25 Series
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => alert('Exporting full drive schedule to Excel/CSV...')}
            className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-label-button text-xs font-semibold text-text-primary shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden border border-white/80"
            style={{
              background: 'linear-gradient(rgb(248, 249, 250) 0%, rgb(233, 236, 239) 48%, rgb(221, 225, 230) 100%)',
              boxShadow: 'rgba(255, 255, 255, 0.9) 0px 1px 1px 0px inset, rgba(0, 0, 0, 0.08) 0px -1px 2px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 6px 0px',
            }}
          >
            <div className="pointer-events-none absolute inset-0 z-0 opacity-40 bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-12 animate-glossy" />
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />
            <span className="material-symbols-outlined text-lg text-text-secondary group-hover:text-text-primary transition-colors relative z-10 drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
              file_download
            </span>
            <span className="relative z-10 font-semibold tracking-tight text-text-primary drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
              Export Drive Schedule
            </span>
          </button>

          <button
            onClick={() => setShowCreateModal(true)}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-label-button text-xs font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden border border-white/25"
            style={{
              background: 'linear-gradient(rgb(155, 29, 44) 0%, rgb(126, 18, 32) 52%, rgb(94, 11, 22) 100%)',
              boxShadow: 'rgba(255, 255, 255, 0.45) 0px 1px 1px 0px inset, rgba(0, 0, 0, 0.35) 0px -1px 2px 0px inset, rgba(103, 13, 24, 0.45) 0px 4px 14px',
            }}
          >
            <div className="pointer-events-none absolute inset-0 z-0 opacity-40 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-glossy" />
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
            <span className="material-symbols-outlined text-lg relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
              add
            </span>
            <span className="relative z-10 tracking-wide drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
              + Create New Drive
            </span>
          </button>
        </div>
      </div>

      {/* 2. Dark Hero Card (Next Upcoming On-Campus Drive) with High Zoom Animation */}
      <div
        className="group relative overflow-hidden rounded-2xl p-6 lg:p-8 text-white shadow-2xl border border-white/10 bg-surface-hero cursor-pointer select-none transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] hover:-translate-y-1.5 hover:shadow-2xl hover:z-20 active:scale-[0.99]"
        style={{
          background: 'radial-gradient(120% 120% at 85% 15%, rgba(139, 29, 44, 0.32) 0%, rgba(26, 27, 46, 0.65) 45%, rgba(21, 21, 31, 0.98) 100%), linear-gradient(135deg, rgb(21, 21, 31) 0%, rgb(17, 17, 26) 100%)',
          boxShadow: 'rgba(0, 0, 0, 0.5) 0px 20px 45px -10px, rgba(255, 255, 255, 0.12) 0px 1px 0px inset',
        }}
      >
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-primary-container/30 blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute right-1/4 -bottom-20 w-64 h-64 rounded-full bg-secondary-container/15 blur-3xl pointer-events-none" />
        <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="w-32 h-[250%] bg-gradient-to-r from-transparent via-white/10 to-transparent absolute -top-1/2 left-0 animate-hero-sweep pointer-events-none" />
          <div
            className="w-20 h-[250%] bg-gradient-to-r from-transparent via-secondary-fixed/20 to-transparent absolute -top-1/2 left-0 animate-hero-sweep pointer-events-none"
            style={{ animationDelay: '0.2s' }}
          />
        </div>

        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#ffdf9b] ring-4 ring-[#ffdf9b]/20 animate-pulse" />
              <span className="font-label-eyebrow text-[11px] tracking-widest text-[#ffdf9b] uppercase font-bold">
                NEXT UPCOMING ON-CAMPUS DRIVE
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/15 text-xs font-semibold backdrop-blur-md shadow-sm">
                Flagship Tier-1
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white flex flex-wrap items-center gap-3">
                TCS Digital &amp; Ninja Hiring 2025
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success-green/20 text-success-green border border-success-green/30 text-xs font-semibold shadow-sm backdrop-blur-md">
                  <span className="material-symbols-outlined text-sm font-bold">verified</span>
                  Verified Drive
                </span>
              </h2>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs lg:text-sm text-surface-container-high/90 mt-2 relative z-10">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <span className="material-symbols-outlined text-base text-[#ffdf9b]">calendar_today</span>
                  Oct 14, 2025 • 09:00 AM IST
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <span className="material-symbols-outlined text-base text-[#ffdf9b]">pin_drop</span>
                  Auditorium 1 &amp; Lab 4 (West Campus)
                </span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-white">
                  <span className="material-symbols-outlined text-base text-[#ffdf9b]">payments</span>
                  ₹7.5 – ₹11.5 LPA
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <span className="material-symbols-outlined text-base text-[#ffdf9b]">group</span>
                  320 Eligible Candidates Registered
                </span>
              </div>
            </div>
          </div>

          <div className="flex lg:flex-col items-center sm:items-start lg:items-end justify-between gap-4 pt-2 lg:pt-0">
            <div className="hidden sm:flex flex-col lg:items-end bg-white/5 p-3.5 rounded-xl border border-white/10 backdrop-blur-md">
              <span className="font-label-eyebrow text-[10px] text-[#ffdf9b]/90 uppercase tracking-wider font-semibold">
                Company Liaison
              </span>
              <span className="text-sm font-bold text-white mt-0.5">Anand Verma (Lead Campus HR)</span>
              <span className="text-xs text-surface-container-high/70">TCS Northern Region TPO Cell</span>
            </div>

            <button
              onClick={() => setSelectedDrive(drivesList[0])}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#ffdf9b] text-[#251a00] font-label-button text-xs font-bold hover:bg-[#efc050] transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
            >
              <span>Manage Round 2</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. KPI Stat Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1: Active Drives Scheduled */}
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
              <span className="material-symbols-outlined text-[22px]">calendar_month</span>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 border border-rose-200/80 shadow-[0_2px_8px_rgba(139,29,44,0.08)] text-primary font-label-badge text-xs font-semibold backdrop-blur-md transform transition-transform duration-300 group-hover:scale-105">
              <span className="material-symbols-outlined text-[14px] text-primary">trending_up</span>
              <span>+3 this week</span>
            </div>
          </div>

          <div className="relative z-10 mt-5 flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-display-stat text-3xl text-text-primary tracking-tight font-extrabold transform transition-transform duration-300 group-hover:scale-[1.03] origin-left">14</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-primary border border-rose-100">
                Active
              </span>
            </div>
            <span className="font-semibold text-text-primary text-sm mt-1">Active Drives Scheduled</span>
            <span className="text-xs text-text-secondary flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/70" />
              2024–25 Campus Series
            </span>
          </div>
        </div>

        {/* Card 2: Total Offers Extended */}
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
              <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 border border-emerald-200/80 shadow-[0_2px_8px_rgba(30,158,90,0.08)] text-success-green font-label-badge text-xs font-semibold backdrop-blur-md transform transition-transform duration-300 group-hover:scale-105">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success-green" />
              </span>
              <span>+18.4% YoY</span>
            </div>
          </div>

          <div className="relative z-10 mt-5 flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-display-stat text-3xl text-text-primary tracking-tight font-extrabold transform transition-transform duration-300 group-hover:scale-[1.03] origin-left">684</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-success-green border border-emerald-100">
                Validated
              </span>
            </div>
            <span className="font-semibold text-text-primary text-sm mt-1">Total Offers Extended</span>
            <span className="text-xs text-text-secondary flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success-green" />
              Avg ₹6.8 LPA CTC
            </span>
          </div>
        </div>

        {/* Card 3: Visiting Companies */}
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
              <span className="material-symbols-outlined text-[22px]">apartment</span>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 border border-blue-200/80 shadow-[0_2px_8px_rgba(62,111,217,0.08)] text-info-blue font-label-badge text-xs font-semibold backdrop-blur-md transform transition-transform duration-300 group-hover:scale-105">
              <span className="material-symbols-outlined text-[14px]">stars</span>
              <span>8 Fortune 500</span>
            </div>
          </div>

          <div className="relative z-10 mt-5 flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-display-stat text-3xl text-text-primary tracking-tight font-extrabold transform transition-transform duration-300 group-hover:scale-[1.03] origin-left">48</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-info-blue border border-blue-100">
                Registered
              </span>
            </div>
            <span className="font-semibold text-text-primary text-sm mt-1">Visiting Companies</span>
            <span className="text-xs text-text-secondary flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-info-blue" />
              Across 12 Core Sectors
            </span>
          </div>
        </div>

        {/* Card 4: Highest Package Offered */}
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
                military_tech
              </span>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 border border-amber-200/80 shadow-[0_2px_8px_rgba(120,90,0,0.08)] text-secondary font-label-badge text-xs font-semibold backdrop-blur-md transform transition-transform duration-300 group-hover:scale-105">
              <span className="material-symbols-outlined text-[13px] text-amber-600">verified</span>
              <span>Trust Record</span>
            </div>
          </div>

          <div className="relative z-10 mt-5 flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-display-stat text-3xl text-text-primary tracking-tight font-extrabold transform transition-transform duration-300 group-hover:scale-[1.03] origin-left">₹34.5 LPA</span>
            </div>
            <span className="font-semibold text-text-primary text-sm mt-1">Highest Package Offered</span>
            <span className="text-xs text-text-secondary flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Atlassian Corp (Offered)
            </span>
          </div>
        </div>
      </div>

      {/* 4. Filter Pills & Search Section */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Filter Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveFilter('all')}
            className={`group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-label-button text-xs transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden whitespace-nowrap ${
              activeFilter === 'all'
                ? 'text-white shadow-md border border-white/30 font-semibold'
                : 'text-text-secondary hover:text-text-primary backdrop-blur-md border border-white/80 shadow-sm'
            }`}
            style={
              activeFilter === 'all'
                ? {
                    background: 'linear-gradient(135deg, rgb(139, 29, 44) 0%, rgb(110, 21, 33) 100%)',
                    boxShadow: 'rgba(107, 0, 24, 0.3) 0px 4px 12px, rgba(255, 255, 255, 0.35) 0px 1px 1px inset',
                  }
                : {
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(235, 238, 243, 0.9) 100%)',
                  }
            }
          >
            {activeFilter === 'all' && (
              <div className="pointer-events-none absolute inset-0 z-0 opacity-40 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-glossy" />
            )}
            <span className="relative z-10">All Drives (48)</span>
          </button>

          <button
            onClick={() => setActiveFilter('ongoing')}
            className={`group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-label-button text-xs transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden whitespace-nowrap ${
              activeFilter === 'ongoing'
                ? 'text-white shadow-md border border-white/30 font-semibold'
                : 'text-text-secondary hover:text-text-primary backdrop-blur-md border border-white/80 shadow-sm'
            }`}
            style={
              activeFilter === 'ongoing'
                ? {
                    background: 'linear-gradient(135deg, rgb(139, 29, 44) 0%, rgb(110, 21, 33) 100%)',
                    boxShadow: 'rgba(107, 0, 24, 0.3) 0px 4px 12px, rgba(255, 255, 255, 0.35) 0px 1px 1px inset',
                  }
                : {
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(235, 238, 243, 0.9) 100%)',
                  }
            }
          >
            <span className="relative z-10">Active / Ongoing (14)</span>
          </button>

          <button
            onClick={() => setActiveFilter('upcoming')}
            className={`group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-label-button text-xs transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden whitespace-nowrap ${
              activeFilter === 'upcoming'
                ? 'text-white shadow-md border border-white/30 font-semibold'
                : 'text-text-secondary hover:text-text-primary backdrop-blur-md border border-white/80 shadow-sm'
            }`}
            style={
              activeFilter === 'upcoming'
                ? {
                    background: 'linear-gradient(135deg, rgb(139, 29, 44) 0%, rgb(110, 21, 33) 100%)',
                    boxShadow: 'rgba(107, 0, 24, 0.3) 0px 4px 12px, rgba(255, 255, 255, 0.35) 0px 1px 1px inset',
                  }
                : {
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(235, 238, 243, 0.9) 100%)',
                  }
            }
          >
            <span className="relative z-10">Upcoming (18)</span>
          </button>

          <button
            onClick={() => setActiveFilter('completed')}
            className={`group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-label-button text-xs transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden whitespace-nowrap ${
              activeFilter === 'completed'
                ? 'text-white shadow-md border border-white/30 font-semibold'
                : 'text-text-secondary hover:text-text-primary backdrop-blur-md border border-white/80 shadow-sm'
            }`}
            style={
              activeFilter === 'completed'
                ? {
                    background: 'linear-gradient(135deg, rgb(139, 29, 44) 0%, rgb(110, 21, 33) 100%)',
                    boxShadow: 'rgba(107, 0, 24, 0.3) 0px 4px 12px, rgba(255, 255, 255, 0.35) 0px 1px 1px inset',
                  }
                : {
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(235, 238, 243, 0.9) 100%)',
                  }
            }
          >
            <span className="relative z-10">Completed (16)</span>
          </button>

          <button
            onClick={() => setActiveFilter('archived')}
            className={`group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-label-button text-xs transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden whitespace-nowrap ${
              activeFilter === 'archived'
                ? 'text-white shadow-md border border-white/30 font-semibold'
                : 'text-text-secondary hover:text-text-primary backdrop-blur-md border border-white/80 shadow-sm'
            }`}
            style={
              activeFilter === 'archived'
                ? {
                    background: 'linear-gradient(135deg, rgb(139, 29, 44) 0%, rgb(110, 21, 33) 100%)',
                    boxShadow: 'rgba(107, 0, 24, 0.3) 0px 4px 12px, rgba(255, 255, 255, 0.35) 0px 1px 1px inset',
                  }
                : {
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(235, 238, 243, 0.9) 100%)',
                  }
            }
          >
            <span className="relative z-10">Archived</span>
          </button>
        </div>

        {/* Quick Search & View Switcher */}
        <div
          className="group relative rounded-2xl p-2 px-3 overflow-hidden backdrop-blur-xl border border-white/80 shadow-md flex items-center justify-between gap-3"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(240, 246, 255, 0.78) 45%, rgba(255, 255, 255, 0.88) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.9)',
          }}
        >
          <div className="relative w-48 sm:w-64">
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-text-secondary text-base">
              filter_alt
            </span>
            <input
              className="w-full h-9 pl-8 pr-3 bg-white/80 text-text-primary placeholder:text-text-secondary rounded-lg font-body-sm text-xs shadow-xs outline-none focus:bg-white transition-all"
              placeholder="Filter by company, CTC..."
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>

          <div className="bg-white/80 rounded-lg p-1 shadow-xs flex items-center gap-1 relative z-10 border border-white/60">
            <button
              onClick={() => setViewMode('agenda')}
              className={`p-1 rounded transition-colors ${
                viewMode === 'agenda' ? 'bg-surface-container-high text-text-primary' : 'text-text-secondary hover:text-text-primary'
              }`}
              title="Card Agenda View"
            >
              <span className="material-symbols-outlined text-base">view_agenda</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1 rounded transition-colors ${
                viewMode === 'table' ? 'bg-surface-container-high text-text-primary' : 'text-text-secondary hover:text-text-primary'
              }`}
              title="Table Rows View"
            >
              <span className="material-symbols-outlined text-base">table_rows</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. Live Placement Drive Pipeline (Cards) */}
      <div className="flex flex-col gap-4">
        {filteredDrives.map((drive) => (
          <div
            key={drive.id}
            className="group relative rounded-2xl p-5 lg:p-6 overflow-hidden backdrop-blur-xl border border-white/80 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            style={{
              background: drive.cardGradient,
              backdropFilter: 'blur(16px)',
              boxShadow: drive.cardShadow,
              border: '1px solid rgba(255, 255, 255, 0.9)',
            }}
          >
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />
            <div className={`absolute -right-12 -top-12 w-44 h-44 rounded-full ${drive.glowColor} blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500`} />
            <div className={`pointer-events-none absolute inset-0 z-0 opacity-40 bg-gradient-to-r ${drive.sheenColor} -skew-x-12 animate-glossy`} />

            <div className="relative z-10 flex items-start gap-4 flex-1">
              <div className={`w-14 h-14 rounded-2xl ${drive.abbrBg} flex items-center justify-center shrink-0 font-extrabold text-lg`}>
                {drive.abbr}
              </div>

              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-headline-section text-base lg:text-lg text-text-primary font-bold">
                    {drive.name}
                  </h3>

                  {drive.statusType === 'ongoing' ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-tint-green text-success-green font-label-badge text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm border border-emerald-200/80 backdrop-blur-md">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-success-green" />
                      </span>
                      {drive.status}
                    </span>
                  ) : drive.statusType === 'upcoming' ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-tint-blue text-info-blue font-label-badge text-xs font-semibold inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-info-blue" />
                      {drive.status}
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-tint-green text-success-green font-label-badge text-xs font-semibold inline-flex items-center gap-1 border border-emerald-200/80 shadow-sm">
                      <span className="material-symbols-outlined text-sm">task_alt</span>
                      {drive.status}
                    </span>
                  )}

                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium border border-white/60 shadow-sm ${drive.badgeStyle}`}>
                    {drive.badge}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-text-secondary mt-0.5">
                  <span className="flex items-center gap-1 font-semibold text-text-primary">
                    <span className="material-symbols-outlined text-sm text-primary-container">monetization_on</span>
                    CTC: {drive.ctc}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">school</span>
                    Eligibility: {drive.eligibility}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">group</span>
                    {drive.registeredText}
                  </span>
                </div>

                {/* Stages Progression */}
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  {drive.stages.map((stage, sIdx) => (
                    <React.Fragment key={sIdx}>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border shadow-xs backdrop-blur-sm ${
                          stage.done
                            ? 'bg-emerald-50 text-success-green border-emerald-100'
                            : stage.ongoing
                            ? 'bg-tint-blue text-info-blue border-blue-100'
                            : stage.amber
                            ? 'bg-secondary-fixed/30 text-secondary border-amber-200/80'
                            : stage.info
                            ? 'bg-tint-blue text-info-blue border-blue-100'
                            : 'bg-surface-container text-text-secondary border-white/50'
                        }`}
                      >
                        {stage.icon && (
                          <span className="material-symbols-outlined text-sm">{stage.icon}</span>
                        )}
                        {stage.label}
                      </span>
                      {sIdx < drive.stages.length - 1 && (
                        <span className="material-symbols-outlined text-text-secondary text-sm">arrow_forward</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between lg:justify-end gap-4 shrink-0 pt-2 lg:pt-0">
              <div className="flex flex-col text-left lg:text-right">
                <span className="font-label-eyebrow text-[10px] text-text-secondary uppercase font-bold tracking-wider">
                  {drive.panelTitle}
                </span>
                <span className="text-xs font-semibold text-text-primary">{drive.panelLocation}</span>
                <span className="text-[11px] text-text-secondary">{drive.panelTime}</span>
              </div>

              <button
                onClick={() => setSelectedDrive(drive)}
                className="group/btn relative inline-flex items-center gap-1 px-4 py-2.5 rounded-xl font-label-button text-xs font-semibold text-text-primary shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden border border-white/80"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(235, 238, 243, 0.9) 100%)',
                }}
              >
                <div className="pointer-events-none absolute inset-0 z-0 opacity-25 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 group-hover/btn:opacity-60 transition-opacity" />
                <span className="relative z-10 font-semibold">Manage Drive</span>
                <span className="material-symbols-outlined text-base relative z-10">chevron_right</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 6. Secondary Operational Context (Two-column layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left 2 Cols: Drive Schedule & Room Allocations */}
        <div
          className="lg:col-span-2 group relative rounded-2xl p-5 lg:p-6 overflow-hidden backdrop-blur-xl border border-white/80 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col gap-4"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(240, 246, 255, 0.78) 50%, rgba(255, 255, 255, 0.88) 100%)',
            backdropFilter: 'blur(16px)',
            boxShadow: 'rgba(62, 111, 217, 0.08) 0px 16px 36px -10px, rgba(0, 0, 0, 0.04) 0px 4px 18px 0px, rgba(255, 255, 255, 0.95) 0px 1px 1px 0px inset, rgba(0, 0, 0, 0.03) 0px -1px 2px 0px inset',
            border: '1px solid rgba(255, 255, 255, 0.9)',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-blue-500/15 blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
          <div className="pointer-events-none absolute inset-0 z-0 opacity-40 bg-gradient-to-r from-transparent via-blue-200/50 to-transparent -skew-x-12 animate-glossy" style={{ animationDelay: '1.2s' }} />

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-info-blue flex items-center justify-center text-white shadow-[0_4px_14px_rgba(62,111,217,0.3)] ring-1 ring-white/40">
                <span className="material-symbols-outlined text-lg">meeting_room</span>
              </div>
              <div>
                <h3 className="font-headline-section text-base font-bold text-text-primary">
                  Campus Lab &amp; Auditorium Allotments
                </h3>
                <p className="font-body-sm text-xs text-text-secondary">
                  Real-time venue booking for drives scheduled this week
                </p>
              </div>
            </div>

            <button
              onClick={() => alert('Opening Campus Facilities & Hall Booking Calendar...')}
              className="inline-flex items-center gap-1 text-primary-container text-xs font-semibold hover:underline bg-white/60 hover:bg-white/90 px-3 py-1.5 rounded-full border border-rose-200/80 shadow-xs backdrop-blur-md transition-all"
            >
              <span>View Calendar</span>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
            </button>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div
              className="group/slot relative p-4 rounded-xl backdrop-blur-md flex flex-col gap-1 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 border border-white/90 shadow-xs"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 246, 255, 0.85) 100%)',
              }}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-label-eyebrow text-[10px] text-text-secondary uppercase tracking-wider font-bold">
                  Lab 4 (Systems)
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-info-blue border border-blue-100">
                  Lab Session
                </span>
              </div>
              <span className="text-sm font-bold text-text-primary">TCS OA Slot A &amp; B</span>
              <span className="text-xs text-info-blue font-semibold flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-xs">schedule</span>
                09:00 AM – 01:00 PM
              </span>
              <span className="text-[11px] text-text-secondary flex items-center gap-1 mt-1 pt-1 border-t border-blue-100/60">
                <span className="material-symbols-outlined text-xs text-text-secondary">desktop_windows</span>
                Capacity: 120 Terminals
              </span>
            </div>

            <div
              className="group/slot relative p-4 rounded-xl backdrop-blur-md flex flex-col gap-1 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 border border-white/90 shadow-xs"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(254, 242, 244, 0.85) 100%)',
              }}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-label-eyebrow text-[10px] text-text-secondary uppercase tracking-wider font-bold">
                  Auditorium 1
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-primary border border-rose-100">
                  PPT Hall
                </span>
              </div>
              <span className="text-sm font-bold text-text-primary">Pre-Placement Talk (Infosys)</span>
              <span className="text-xs text-primary-container font-semibold flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-xs">schedule</span>
                02:00 PM – 04:00 PM
              </span>
              <span className="text-[11px] text-text-secondary flex items-center gap-1 mt-1 pt-1 border-t border-rose-100/60">
                <span className="material-symbols-outlined text-xs text-text-secondary">chair</span>
                Capacity: 450 Seats
              </span>
            </div>

            <div
              className="group/slot relative p-4 rounded-xl backdrop-blur-md flex flex-col gap-1 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 border border-white/90 shadow-xs"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 253, 244, 0.85) 100%)',
              }}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-label-eyebrow text-[10px] text-text-secondary uppercase tracking-wider font-bold">
                  Seminar Hall 2
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-success-green border border-emerald-100">
                  Interviews
                </span>
              </div>
              <span className="text-sm font-bold text-text-primary">Wipro GD &amp; Tech Interview</span>
              <span className="text-xs text-success-green font-semibold flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-xs">schedule</span>
                Full Day Occupied
              </span>
              <span className="text-[11px] text-text-secondary flex items-center gap-1 mt-1 pt-1 border-t border-emerald-100/60">
                <span className="material-symbols-outlined text-xs text-text-secondary">badge</span>
                Panels 1 to 4
              </span>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Duty Coordinators */}
        <div
          className="group relative rounded-2xl p-5 lg:p-6 overflow-hidden backdrop-blur-xl border border-white/80 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-4"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(254, 242, 244, 0.72) 45%, rgba(255, 255, 255, 0.88) 100%)',
            backdropFilter: 'blur(16px)',
            boxShadow: 'rgba(107, 0, 24, 0.06) 0px 16px 36px -10px, rgba(0, 0, 0, 0.04) 0px 4px 18px 0px, rgba(255, 255, 255, 0.95) 0px 1px 1px 0px inset, rgba(0, 0, 0, 0.03) 0px -1px 2px 0px inset',
            border: '1px solid rgba(255, 255, 255, 0.9)',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />
          <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-rose-500/15 blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
          <div className="pointer-events-none absolute inset-0 z-0 opacity-40 bg-gradient-to-r from-transparent via-rose-200/50 to-transparent -skew-x-12 animate-glossy" style={{ animationDelay: '1.8s' }} />

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-container to-primary flex items-center justify-center text-white shadow-[0_4px_14px_rgba(107,0,24,0.28)] ring-1 ring-white/40">
                <span className="material-symbols-outlined text-lg">support_agent</span>
              </div>
              <div>
                <h3 className="font-headline-section text-base font-bold text-text-primary">
                  Duty Coordinators
                </h3>
                <p className="font-body-sm text-xs text-text-secondary">
                  Faculty in-charge on floor
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 border border-rose-200/80 shadow-xs text-primary font-label-badge text-xs font-semibold backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-success-green animate-pulse" />
              2 Active
            </span>
          </div>

          <div className="relative z-10 flex flex-col gap-2.5">
            <div
              className="flex items-center justify-between p-2.5 rounded-xl border border-white/80 shadow-xs backdrop-blur-md transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(254, 242, 244, 0.85) 100%)',
              }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary-container text-white flex items-center justify-center text-xs font-bold shadow-xs ring-1 ring-white/40">
                  RS
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-text-primary">Dr. Rajan Sharma</span>
                  <span className="text-[11px] text-text-secondary flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-text-secondary">room</span>
                    Lab 4 • Ext. 214
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-tint-green text-success-green text-[10px] font-bold border border-emerald-100 shadow-xs">
                On Duty
              </span>
            </div>

            <div
              className="flex items-center justify-between p-2.5 rounded-xl border border-white/80 shadow-xs backdrop-blur-md transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 246, 255, 0.85) 100%)',
              }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-info-blue text-white flex items-center justify-center text-xs font-bold shadow-xs ring-1 ring-white/40">
                  PK
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-text-primary">Prof. Preeti Kaur</span>
                  <span className="text-[11px] text-text-secondary flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-text-secondary">room</span>
                    Auditorium 1 • Ext. 108
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-tint-green text-success-green text-[10px] font-bold border border-emerald-100 shadow-xs">
                On Duty
              </span>
            </div>
          </div>

          <div className="relative z-10 pt-1">
            <button
              onClick={() => alert('Opening Coordinator Duty Roster Management...')}
              className="group/btn relative w-full py-2.5 rounded-xl font-label-button text-xs font-semibold text-text-primary shadow-xs hover:shadow-md transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] overflow-hidden border border-white/80 flex items-center justify-center gap-1.5"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(235, 238, 243, 0.9) 100%)',
              }}
            >
              <div className="pointer-events-none absolute inset-0 z-0 opacity-25 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 group-hover/btn:opacity-60 transition-opacity" />
              <span className="material-symbols-outlined text-sm relative z-10 text-text-secondary group-hover/btn:text-primary transition-colors">
                badge
              </span>
              <span className="relative z-10 font-semibold">Manage Coordinator Rosters</span>
            </button>
          </div>
        </div>
      </div>

      {/* 7. Create Drive Slide-over / Centered Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col border border-white/80 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 bg-surface-hero text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary-container text-white flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-lg">add_task</span>
                </div>
                <div>
                  <h3 className="font-headline-section text-base font-bold">Schedule New Placement Drive</h3>
                  <p className="text-xs text-surface-container-high/80">
                    Input recruitment company criteria &amp; pipeline stages
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-lg text-surface-container-high hover:text-white hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateDriveSubmit} className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-label-eyebrow text-[11px] font-bold text-text-secondary uppercase">
                  Company Name
                </label>
                <input
                  required
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-text-primary placeholder:text-text-secondary font-body-sm text-sm outline-none border border-border-subtle focus:border-primary transition-colors"
                  placeholder="e.g. Microsoft India, Cognizant, Zscaler"
                  type="text"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-label-eyebrow text-[11px] font-bold text-text-secondary uppercase">
                    Offered CTC Range (LPA)
                  </label>
                  <input
                    value={newCtc}
                    onChange={(e) => setNewCtc(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-text-primary placeholder:text-text-secondary font-body-sm text-sm outline-none border border-border-subtle focus:border-primary transition-colors"
                    placeholder="e.g. 8.0 - 12.0 LPA"
                    type="text"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-eyebrow text-[11px] font-bold text-text-secondary uppercase">
                    Minimum CGPA Cutoff
                  </label>
                  <input
                    value={newCgpa}
                    onChange={(e) => setNewCgpa(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-text-primary placeholder:text-text-secondary font-body-sm text-sm outline-none border border-border-subtle focus:border-primary transition-colors"
                    placeholder="e.g. 7.5 or above"
                    type="text"
                  />
                </div>
              </div>

              <div className="p-4 bg-tint-maroon/20 rounded-xl border border-rose-200/80 flex items-start gap-2.5 text-xs text-text-primary">
                <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">info</span>
                <span>
                  Publishing this drive will automatically send verified portal notifications to all eligible scholars in the 2024–25 cohort meeting the minimum CGPA criteria.
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border-subtle">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg bg-surface-card text-text-secondary hover:text-text-primary font-label-button text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-primary-container text-white font-label-button text-xs font-semibold shadow-md hover:bg-primary-hover transition-all"
                  style={{
                    background: 'linear-gradient(135deg, rgb(155, 29, 44) 0%, rgb(110, 21, 33) 100%)',
                  }}
                >
                  Schedule &amp; Publish Drive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. Selected Drive Detail Drawer / Modal */}
      {selectedDrive && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col border border-white/80 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 bg-surface-hero text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${selectedDrive.abbrBg} flex items-center justify-center font-bold text-base shadow-sm`}>
                  {selectedDrive.abbr}
                </div>
                <div>
                  <h3 className="font-headline-section text-base font-bold">{selectedDrive.name}</h3>
                  <p className="text-xs text-surface-container-high/80">Recruitment Pipeline &amp; Stage Control</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDrive(null)}
                className="p-1.5 rounded-lg text-surface-container-high hover:text-white hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-surface-container-low border border-border-subtle/80 text-xs">
                <div>
                  <span className="text-text-secondary uppercase font-bold text-[10px]">Package Offered</span>
                  <p className="font-bold text-sm text-text-primary">{selectedDrive.ctc}</p>
                </div>
                <div>
                  <span className="text-text-secondary uppercase font-bold text-[10px]">Drive Status</span>
                  <p className="font-bold text-sm text-success-green">{selectedDrive.status}</p>
                </div>
                <div className="col-span-2 pt-2 border-t border-border-subtle/60">
                  <span className="text-text-secondary uppercase font-bold text-[10px]">Eligibility Criteria</span>
                  <p className="font-medium text-text-primary">{selectedDrive.eligibility}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-2">
                  Pipeline Assessment Stages
                </h4>
                <div className="flex flex-col gap-2">
                  {selectedDrive.stages.map((stg, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-xl bg-surface-card border border-border-subtle shadow-xs"
                    >
                      <span className="text-xs font-semibold text-text-primary flex items-center gap-2">
                        {stg.icon && (
                          <span className="material-symbols-outlined text-sm text-primary">
                            {stg.icon}
                          </span>
                        )}
                        {stg.label}
                      </span>
                      <span className="text-[11px] font-bold text-success-green px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100">
                        Configured
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-border-subtle">
                <button
                  onClick={() => {
                    alert(`Exporting candidate roster for ${selectedDrive.name}...`);
                  }}
                  className="px-4 py-2 rounded-lg bg-surface-container text-text-primary text-xs font-semibold hover:bg-surface-container-high transition-colors"
                >
                  Export Candidate Roster
                </button>
                <button
                  onClick={() => setSelectedDrive(null)}
                  className="px-5 py-2 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
