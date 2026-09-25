'use client';

import React, { useState } from 'react';
import Modal from '../components/Modal';

export default function StudentManagement({ globalSearch = '' }) {
  const [selectedKey, setSelectedKey] = useState('harpreet');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('2024-25');
  const [selectedDept, setSelectedDept] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const studentData = {
    harpreet: {
      name: 'Harpreet Kaur',
      roll: 'RIMT-21-CSE-084',
      initials: 'HK',
      program: 'B.Tech Computer Science & Engg',
      dept: 'B.Tech CSE',
      section: 'Sec A • 2021–25',
      cgpa: '8.84',
      status: 'Placed @ Microsoft',
      statusType: 'placed',
      verified: true,
      email: 'h.kaur@rimt.ac.in',
      phone: '+91 98765-43210',
      spoc: 'Prof. J. K. Singla',
      avatarBg: 'bg-tint-maroon text-primary border-rose-200/60',
    },
    aman: {
      name: 'Aman Sharma',
      roll: 'RIMT-21-CSE-012',
      initials: 'AS',
      program: 'B.Tech Computer Science & Engg',
      dept: 'B.Tech CSE',
      section: 'Sec B • 2021–25',
      cgpa: '9.12',
      status: 'In Drive (TCS)',
      statusType: 'in-drive',
      verified: true,
      email: 'aman.sharma@rimt.ac.in',
      phone: '+91 98112-23344',
      spoc: 'Prof. J. K. Singla',
      avatarBg: 'bg-tint-blue text-info-blue border-blue-200/60',
    },
    simranjeet: {
      name: 'Simranjeet Singh',
      roll: 'RIMT-21-ME-045',
      initials: 'SS',
      program: 'B.Tech Mechanical Engineering',
      dept: 'B.Tech Mech',
      section: 'Sec A • 2021–25',
      cgpa: '7.95',
      status: 'Placed @ L&T',
      statusType: 'placed',
      verified: false,
      email: 's.singh@rimt.ac.in',
      phone: '+91 98223-34455',
      spoc: 'Dr. Gurmeet Singh',
      avatarBg: 'bg-tint-green text-success-green border-emerald-200/60',
    },
    priya: {
      name: 'Priya Patel',
      roll: 'RIMT-21-BT-019',
      initials: 'PP',
      program: 'B.Tech Biotechnology',
      dept: 'B.Tech Biotech',
      section: 'Sec A • 2021–25',
      cgpa: '8.45',
      status: 'Open / Active',
      statusType: 'unplaced',
      verified: true,
      email: 'priya.patel@rimt.ac.in',
      phone: '+91 98334-45566',
      spoc: 'Dr. Monika Aggarwal',
      avatarBg: 'bg-tint-maroon text-primary border-rose-200/60',
    },
    rohit: {
      name: 'Rohit Verma',
      roll: 'RIMT-21-CSE-102',
      initials: 'RV',
      program: 'B.Tech Computer Science & Engg',
      dept: 'B.Tech CSE',
      section: 'Sec C • 2021–25',
      cgpa: '8.10',
      status: 'Placed @ Infosys',
      statusType: 'placed',
      verified: true,
      email: 'rohit.v@rimt.ac.in',
      phone: '+91 98445-56677',
      spoc: 'Prof. J. K. Singla',
      avatarBg: 'bg-tint-blue text-info-blue border-blue-200/60',
    },
  };

  const currentStudent = studentData[selectedKey] || studentData.harpreet;

  const studentsList = Object.keys(studentData).map((k) => ({
    key: k,
    ...studentData[k],
  }));

  const effectiveSearch = (globalSearch || searchQuery).toLowerCase().trim();

  const filteredStudents = studentsList.filter((s) => {
    if (activeFilter === 'verified' && !s.verified) return false;
    if (activeFilter === 'pending' && s.verified) return false;
    if (activeFilter === 'placed' && s.statusType !== 'placed') return false;
    if (activeFilter === 'unplaced' && s.statusType !== 'unplaced') return false;

    if (effectiveSearch) {
      const match =
        s.name.toLowerCase().includes(effectiveSearch) ||
        s.roll.toLowerCase().includes(effectiveSearch) ||
        s.email.toLowerCase().includes(effectiveSearch);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
      {/* 1. Module Header Bar & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-text-secondary">
            <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-wider text-text-secondary">
              Module 01
            </span>
            <span className="text-xs text-outline">•</span>
            <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-wider text-text-secondary">
              Records &amp; Credentials
            </span>
          </div>
          <h1 className="font-headline-page text-headline-page text-text-primary tracking-tight">
            Student Management
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={() => setShowImportModal(true)}
            className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-br from-white/80 via-surface-container-low/70 to-surface-container-high backdrop-blur-md text-text-primary hover:bg-surface-container hover:shadow-md transition-all shadow-sm ring-1 ring-white/70 border-t border-white/80"
          >
            <span className="material-symbols-outlined text-base text-text-secondary drop-shadow-sm">
              file_upload
            </span>
            <span className="font-label-button text-label-button font-medium text-text-primary">
              Bulk Import
            </span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-white font-label-button text-label-button transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl border-t border-white/30"
            style={{
              background: 'linear-gradient(rgb(139, 20, 36) 0%, rgb(96, 7, 19) 100%)',
              boxShadow: 'rgba(107, 0, 24, 0.4) 0px 4px 16px, rgba(255, 255, 255, 0.35) 0px 1px 1px inset',
              textShadow: 'rgba(0, 0, 0, 0.25) 0px 1px 2px',
            }}
          >
            <span className="material-symbols-outlined text-base">person_add</span>
            <span>+ Add Student</span>
          </button>
        </div>
      </div>

      {/* 2. Dark Hero / Summary Card (#15151F) with High Zoom Animation */}
      <div
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#12121a] via-[#1a121d] to-[#250d18] p-5 sm:p-6 lg:p-7 text-white shadow-xl border-t border-white/20 ring-1 ring-white/10 cursor-pointer select-none transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] hover:-translate-y-1.5 hover:shadow-2xl hover:z-20 active:scale-[0.99]"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(18, 18, 26, 0.9) 0%, rgba(26, 18, 29, 0.88) 50%, rgba(37, 13, 24, 0.92) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDkHZ4rkvxIvMjCvWwlc7ZS0M6rHCgYz9SbtwkesDgRbTwe2Dch8XQI2alHNRvXA_dxS3PXj9yNNJ7yEsWUzWFasROkKrmAdnId9S29FITNeIY3e95Hvv1-IxT5yt4wJZ3JAQ2tYHjoXV2tFT6HZgZy_vntJNGi_wqaH1427wtS7AXUCWUpeYKBi3eLspNYU0w9MusgTGQ7BybwFNBokdRnOiqdlXa0bq5CeN5E0N6w7mvKSYIBBCSAS7BGeDUVdEa7Gw")',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <div className="absolute -right-16 -top-20 w-80 h-80 rounded-full bg-primary-container/30 blur-3xl pointer-events-none animate-aura-pulse group-hover:scale-125 transition-transform duration-500" />
        <div
          className="absolute right-48 -bottom-16 w-60 h-60 rounded-full bg-info-blue/20 blur-2xl pointer-events-none animate-aura-pulse group-hover:scale-125 transition-transform duration-500"
          style={{ animationDelay: '3s' }}
        />
        <div className="absolute left-1/4 -top-12 w-48 h-48 rounded-full bg-[#ffdf9b]/15 blur-2xl pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent absolute top-0 -left-1/4 animate-sheen-sweep pointer-events-none transform -skew-x-12" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white backdrop-blur-md font-label-badge text-label-badge ring-1 ring-white/10 transform transition-transform duration-300 group-hover:scale-105">
                <span
                  className="material-symbols-outlined text-sm text-success-green"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                Active Batch 2024–2025
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/5 text-gray-300 font-label-eyebrow text-label-eyebrow uppercase ring-1 ring-white/5 transform transition-transform duration-300 group-hover:scale-105">
                T&amp;P Verified Stream
              </span>
            </div>
            <h2 className="font-headline-page text-xl sm:text-2xl text-white tracking-tight drop-shadow-sm font-bold">
              Comprehensive Scholar Directory &amp; Verification Vault
            </h2>
            <p className="font-body-default text-xs sm:text-sm text-gray-300 leading-relaxed">
              Cryptographically sealed academic records, multi-tier placement tracking, and instant credential validation for all final-year undergraduate and postgraduate cohorts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white/10 hover:bg-white/15 backdrop-blur-md p-4 sm:p-5 rounded-xl ring-1 ring-white/10 shadow-lg shrink-0 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex flex-col pr-0 sm:pr-4">
              <span className="font-label-eyebrow text-[10px] uppercase text-gray-300 tracking-wider">
                Verification Rate
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-white transform transition-transform duration-300 group-hover:scale-105 origin-left">
                94.2%
              </span>
              <span className="text-xs text-success-green flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-xs">trending_up</span>
                +3.8% this month
              </span>
            </div>

            <div className="hidden sm:block w-px h-12 bg-white/10" />

            <div className="flex flex-col">
              <span className="font-label-eyebrow text-[10px] uppercase text-gray-300 tracking-wider">
                Eligible Students
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-white transform transition-transform duration-300 group-hover:scale-105 origin-left">
                  1,840
                </span>
                <span className="text-gray-300 text-xs">/ 1,950</span>
              </div>
              <a
                className="mt-1 text-xs text-secondary-container hover:underline inline-flex items-center gap-1 font-semibold transform transition-transform duration-200 hover:translate-x-1"
                href="#pending"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveFilter('pending');
                }}
              >
                Review 110 Pending Profiles →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. KPI Stat Grid (4 Ultra-Modern Glossy Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1: Total Enrolled Scholars */}
        <div
          className="group relative rounded-2xl p-5 sm:p-6 overflow-hidden backdrop-blur-xl border border-white/80 shadow-lg cursor-pointer select-none transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.045] hover:-translate-y-2 hover:shadow-2xl hover:z-20 active:scale-[0.98] flex flex-col justify-between"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(253, 242, 244, 0.75) 50%, rgba(255, 255, 255, 0.88) 100%)',
            boxShadow: 'rgba(107, 0, 24, 0.07) 0px 14px 34px -4px, rgba(255, 255, 255, 0.95) 0px 1px 0px inset, rgba(255, 255, 255, 0.6) 0px -1px 0px inset',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />
          <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-rose-500/15 blur-2xl pointer-events-none group-hover:scale-150 group-hover:opacity-90 transition-all duration-500" />
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="w-32 h-[220%] bg-gradient-to-r from-transparent via-rose-400/25 to-transparent absolute -top-1/2 left-0 animate-sweep-maroon pointer-events-none" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-container to-primary flex items-center justify-center text-white shadow-[0_4px_14px_rgba(107,0,24,0.28)] ring-1 ring-white/40 transform transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-[-2deg]">
              <span className="material-symbols-outlined text-[22px]">school</span>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 border border-rose-200/60 shadow-[0_2px_8px_rgba(139,29,44,0.08)] text-primary font-label-badge text-label-badge backdrop-blur-md transform transition-transform duration-300 group-hover:scale-105">
              <span className="material-symbols-outlined text-[14px] text-primary">trending_up</span>
              <span>+4.2% YoY</span>
            </div>
          </div>

          <div className="relative z-10 mt-5 flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-[26px] lg:text-[32px] text-text-primary tracking-tight font-extrabold transform transition-transform duration-300 group-hover:scale-[1.03] origin-left">
                2,480
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-primary border border-rose-100">
                Live
              </span>
            </div>
            <span className="font-semibold text-text-primary text-sm mt-1">
              Total Enrolled Scholars
            </span>
            <span className="text-xs text-text-secondary flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              Active Batch 2024–25
            </span>
          </div>
        </div>

        {/* Card 2: Verified Vault Records */}
        <div
          className="group relative rounded-2xl p-5 sm:p-6 overflow-hidden backdrop-blur-xl border border-white/80 shadow-lg cursor-pointer select-none transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.045] hover:-translate-y-2 hover:shadow-2xl hover:z-20 active:scale-[0.98] flex flex-col justify-between"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(240, 253, 244, 0.75) 50%, rgba(255, 255, 255, 0.88) 100%)',
            boxShadow: 'rgba(30, 158, 90, 0.08) 0px 14px 34px -4px, rgba(255, 255, 255, 0.95) 0px 1px 0px inset, rgba(255, 255, 255, 0.6) 0px -1px 0px inset',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />
          <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-emerald-500/15 blur-2xl pointer-events-none group-hover:scale-150 group-hover:opacity-90 transition-all duration-500" />
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="w-32 h-[220%] bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent absolute -top-1/2 left-0 animate-sweep-emerald pointer-events-none" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-success-green flex items-center justify-center text-white shadow-[0_4px_14px_rgba(30,158,90,0.3)] ring-1 ring-white/40 transform transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-[-2deg]">
              <span
                className="material-symbols-outlined text-[22px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 border border-emerald-200/60 shadow-[0_2px_8px_rgba(30,158,90,0.08)] text-success-green font-label-badge text-label-badge backdrop-blur-md transform transition-transform duration-300 group-hover:scale-105">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success-green" />
              </span>
              <span>94.2% Verified</span>
            </div>
          </div>

          <div className="relative z-10 mt-5 flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-[26px] lg:text-[32px] text-text-primary tracking-tight font-extrabold transform transition-transform duration-300 group-hover:scale-[1.03] origin-left">
                2,336
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-success-green border border-emerald-100">
                Validated
              </span>
            </div>
            <span className="font-semibold text-text-primary text-sm mt-1">
              Verified Vault Records
            </span>
            <span className="text-xs text-text-secondary flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success-green" />
              Cryptographically Sealed
            </span>
          </div>
        </div>

        {/* Card 3: Offers Accepted */}
        <div
          className="group relative rounded-2xl p-5 sm:p-6 overflow-hidden backdrop-blur-xl border border-white/80 shadow-lg cursor-pointer select-none transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.045] hover:-translate-y-2 hover:shadow-2xl hover:z-20 active:scale-[0.98] flex flex-col justify-between"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(239, 246, 255, 0.75) 50%, rgba(255, 255, 255, 0.88) 100%)',
            boxShadow: 'rgba(62, 111, 217, 0.08) 0px 14px 34px -4px, rgba(255, 255, 255, 0.95) 0px 1px 0px inset, rgba(255, 255, 255, 0.6) 0px -1px 0px inset',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />
          <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-blue-500/15 blur-2xl pointer-events-none group-hover:scale-150 group-hover:opacity-90 transition-all duration-500" />
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="w-32 h-[220%] bg-gradient-to-r from-transparent via-blue-400/25 to-transparent absolute -top-1/2 left-0 animate-sweep-blue pointer-events-none" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-info-blue flex items-center justify-center text-white shadow-[0_4px_14px_rgba(62,111,217,0.3)] ring-1 ring-white/40 transform transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-[-2deg]">
              <span className="material-symbols-outlined text-[22px]">work</span>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 border border-blue-200/60 shadow-[0_2px_8px_rgba(62,111,217,0.08)] text-info-blue font-label-badge text-label-badge backdrop-blur-md transform transition-transform duration-300 group-hover:scale-105">
              <span className="material-symbols-outlined text-[14px]">stars</span>
              <span>57.2% of eligible</span>
            </div>
          </div>

          <div className="relative z-10 mt-5 flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-[26px] lg:text-[32px] text-text-primary tracking-tight font-extrabold transform transition-transform duration-300 group-hover:scale-[1.03] origin-left">
                1,420
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-info-blue border border-blue-100">
                +12 Today
              </span>
            </div>
            <span className="font-semibold text-text-primary text-sm mt-1">
              Offers Accepted
            </span>
            <span className="text-xs text-text-secondary flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-info-blue" />
              Across 142 Recruiters
            </span>
          </div>
        </div>

        {/* Card 4: Pending Cryptographic Check */}
        <div
          className="group relative rounded-2xl p-5 sm:p-6 overflow-hidden backdrop-blur-xl border border-white/80 shadow-lg cursor-pointer select-none transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.045] hover:-translate-y-2 hover:shadow-2xl hover:z-20 active:scale-[0.98] flex flex-col justify-between"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(254, 252, 232, 0.75) 50%, rgba(255, 255, 255, 0.88) 100%)',
            boxShadow: 'rgba(231, 185, 74, 0.1) 0px 14px 34px -4px, rgba(255, 255, 255, 0.95) 0px 1px 0px inset, rgba(255, 255, 255, 0.6) 0px -1px 0px inset',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />
          <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-amber-500/15 blur-2xl pointer-events-none group-hover:scale-150 group-hover:opacity-90 transition-all duration-500" />
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="w-32 h-[220%] bg-gradient-to-r from-transparent via-amber-400/25 to-transparent absolute -top-1/2 left-0 animate-sweep-amber pointer-events-none" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-secondary flex items-center justify-center text-white shadow-[0_4px_14px_rgba(120,90,0,0.28)] ring-1 ring-white/40 transform transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-[-2deg]">
              <span className="material-symbols-outlined text-[22px]">pending_actions</span>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 border border-amber-200/70 shadow-[0_2px_8px_rgba(120,90,0,0.08)] text-secondary font-label-badge text-label-badge backdrop-blur-md transform transition-transform duration-300 group-hover:scale-105">
              <span className="material-symbols-outlined text-[13px] text-amber-600">error</span>
              <span>Needs review</span>
            </div>
          </div>

          <div className="relative z-10 mt-5 flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-[26px] lg:text-[32px] text-text-primary tracking-tight font-extrabold transform transition-transform duration-300 group-hover:scale-[1.03] origin-left">
                110
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-secondary border border-amber-200/60">
                High Priority
              </span>
            </div>
            <span className="font-semibold text-text-primary text-sm mt-1">
              Pending Cryptographic Check
            </span>
            <span className="text-xs text-text-secondary flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Action Required within 48h
            </span>
          </div>
        </div>
      </div>

      {/* 4. Filter Pills & Search Control Strip */}
      <div className="relative overflow-hidden bg-white/85 backdrop-blur-xl border border-white/60 p-4 sm:p-5 rounded-2xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05),0_0_0_1px_rgba(255,255,255,0.8)_inset] flex flex-col gap-4">
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-surface-container-high/60 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-lg">
              search
            </span>
            <input
              className="w-full h-10 pl-10 pr-4 bg-surface-container-low/70 border border-white/80 rounded-lg text-text-primary placeholder:text-text-secondary text-xs sm:text-sm outline-none focus:bg-white transition-all shadow-sm"
              placeholder="Filter by scholar name, roll number, or email..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters & Export */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <div className="relative">
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="h-10 px-3 pr-8 rounded-lg bg-surface-container-low/70 border border-white/80 text-text-primary font-medium outline-none appearance-none cursor-pointer hover:bg-white transition-colors shadow-sm"
              >
                <option value="2024-25">Batch 2024–25 (Final Year)</option>
                <option value="2025-26">Batch 2025–26 (Pre-Final)</option>
                <option value="2023-24">Batch 2023–24 (Archived)</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none text-base">
                expand_more
              </span>
            </div>

            <div className="relative">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="h-10 px-3 pr-8 rounded-lg bg-surface-container-low/70 border border-white/80 text-text-primary font-medium outline-none appearance-none cursor-pointer hover:bg-white transition-colors shadow-sm"
              >
                <option value="all">All Departments</option>
                <option value="cse">CSE &amp; IT</option>
                <option value="me">Mechanical Engg</option>
                <option value="mgmt">Management Studies</option>
                <option value="bt">Biotechnology</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none text-base">
                expand_more
              </span>
            </div>

            <button
              onClick={() => alert('Exporting full scholar roster to CSV format...')}
              className="h-10 px-3 rounded-lg bg-surface-container-low/70 border border-white/80 text-text-secondary hover:text-text-primary hover:bg-white transition-colors flex items-center gap-1.5 font-semibold shadow-sm"
              title="Export Table CSV"
            >
              <span className="material-symbols-outlined text-base">download</span>
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Filter Pills row */}
        <div className="relative z-10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'All Students (2,480)' },
            { id: 'verified', label: 'Verified (2,336)' },
            { id: 'pending', label: 'Pending Verification (110)' },
            { id: 'placed', label: 'Placed (1,420)' },
            { id: 'unplaced', label: 'Unplaced (420)' },
          ].map((pill) => {
            const isActive = activeFilter === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setActiveFilter(pill.id)}
                className={`px-4 py-1.5 rounded-full font-label-badge text-label-badge whitespace-nowrap transition-colors shadow-sm ${
                  isActive
                    ? 'bg-primary-container text-white border-t border-white/20'
                    : 'bg-surface-container-low/70 border border-white/60 text-text-secondary hover:bg-white hover:text-text-primary'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Main Content Area: Directory Table + Interactive Slide-out Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table Section (8 Cols) */}
        <div
          className="lg:col-span-8 relative flex flex-col rounded-2xl border border-white/80 backdrop-blur-xl p-5 sm:p-6 overflow-hidden transition-all duration-300 shadow-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.82) 50%, rgba(248, 249, 253, 0.88) 100%)',
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 10px 30px -5px, rgba(255, 255, 255, 0.95) 0px 1px 0px inset, rgba(255, 255, 255, 0.6) 0px -1px 0px inset',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />
          <div className="absolute -right-16 -top-16 w-60 h-60 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />

          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-border-subtle">
            <div className="flex items-center gap-3">
              <h2 className="font-headline-section text-headline-section text-text-primary font-bold tracking-tight">
                Scholar Roster
              </h2>
              <span className="px-2.5 py-1 rounded-full bg-surface-container-low text-text-secondary font-label-badge text-label-badge font-medium border border-border-subtle">
                Showing {filteredStudents.length} of 2,480 scholars
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="h-9 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-text-secondary hover:text-text-primary text-xs font-semibold border border-border-subtle flex items-center gap-1.5 transition-colors"
                title="Sort Table"
              >
                <span className="material-symbols-outlined text-base">swap_vert</span>
                <span>Sort</span>
              </button>
              <button
                className="h-9 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-text-secondary hover:text-text-primary text-xs font-semibold border border-border-subtle flex items-center gap-1.5 transition-colors"
                title="Customize Columns"
              >
                <span className="material-symbols-outlined text-base">view_column</span>
                <span>Columns</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto my-1">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-border-subtle text-text-secondary font-label-eyebrow text-label-eyebrow uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 font-semibold">Scholar Details</th>
                  <th className="py-3.5 px-4 font-semibold">Dept &amp; Section</th>
                  <th className="py-3.5 px-4 font-semibold text-center">Academic CGPA</th>
                  <th className="py-3.5 px-4 font-semibold text-center">Verification</th>
                  <th className="py-3.5 px-4 font-semibold">Placement Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle font-body-default text-body-default">
                {filteredStudents.map((std) => {
                  const isSelected = selectedKey === std.key;
                  return (
                    <tr
                      key={std.key}
                      onClick={() => setSelectedKey(std.key)}
                      className={`cursor-pointer transition-colors group ${
                        isSelected
                          ? 'bg-tint-maroon/20 hover:bg-tint-maroon/30'
                          : 'hover:bg-surface-container-low/60'
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`relative w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-sm border ${std.avatarBg}`}
                          >
                            {std.initials}
                            {std.verified && (
                              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-success-green ring-2 ring-white flex items-center justify-center">
                                <span className="material-symbols-outlined text-[9px] text-white font-bold">
                                  check
                                </span>
                              </span>
                            )}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-text-primary group-hover:text-primary transition-colors text-sm truncate">
                              {std.name}
                            </span>
                            <span className="text-xs text-text-secondary font-mono">
                              {std.roll}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-text-primary font-medium text-xs">
                            {std.dept}
                          </span>
                          <span className="text-xs text-text-secondary">{std.section}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tint-maroon text-primary font-bold text-xs border border-rose-200/70">
                          <span className="material-symbols-outlined text-xs text-primary">
                            star
                          </span>
                          {std.cgpa}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        {std.verified ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tint-green text-success-green font-medium text-xs border border-emerald-200/60">
                            <span className="material-symbols-outlined text-xs text-success-green">
                              verified
                            </span>
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 font-medium text-xs border border-amber-200/70">
                            <span className="material-symbols-outlined text-xs text-amber-600">
                              pending
                            </span>
                            Pending Review
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium text-xs border ${
                            std.statusType === 'placed'
                              ? 'bg-tint-blue text-info-blue border-blue-200/60'
                              : std.statusType === 'in-drive'
                              ? 'bg-surface-container-high/80 text-text-primary border-border-subtle'
                              : 'bg-surface-container-high/80 text-text-secondary border-border-subtle'
                          }`}
                        >
                          {std.statusType === 'placed' ? (
                            <span className="material-symbols-outlined text-xs">business</span>
                          ) : std.statusType === 'in-drive' ? (
                            <span className="material-symbols-outlined text-xs text-info-blue">
                              pending
                            </span>
                          ) : null}
                          {std.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            className="p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-white transition-colors"
                            title="View Credentials"
                          >
                            <span className="material-symbols-outlined text-lg">shield</span>
                          </button>
                          <button
                            className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white transition-colors"
                            title="More Options"
                          >
                            <span className="material-symbols-outlined text-lg">
                              more_vert
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-border-subtle mt-2 text-text-secondary text-xs">
            <span className="font-medium">Showing 1 to 5 of 2,480 scholars</span>
            <div className="flex items-center gap-1.5">
              <button
                className="h-8 px-2.5 rounded-lg bg-surface-container-low border border-border-subtle hover:bg-surface-container font-label-button text-xs text-text-primary disabled:opacity-40 transition-colors"
                disabled
              >
                Previous
              </button>
              <button className="h-8 w-8 rounded-lg bg-primary text-white font-semibold text-xs shadow-sm flex items-center justify-center">
                1
              </button>
              <button className="h-8 w-8 rounded-lg bg-surface-container-low border border-border-subtle hover:bg-surface-container text-text-primary font-medium text-xs flex items-center justify-center transition-colors">
                2
              </button>
              <span className="px-1 text-text-secondary">...</span>
              <button className="h-8 px-2 rounded-lg bg-surface-container-low border border-border-subtle hover:bg-surface-container text-text-primary font-medium text-xs flex items-center justify-center transition-colors">
                496
              </button>
              <button className="h-8 px-2.5 rounded-lg bg-surface-container-low border border-border-subtle hover:bg-surface-container font-label-button text-xs text-text-primary transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Scholar Dossier Detail Drawer (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5" id="scholarDetailDrawer">
          {/* 1. Academic Overview Stats Card */}
          <div
            className="relative rounded-2xl p-5 flex flex-col gap-4 overflow-hidden backdrop-blur-xl border border-white/80 shadow-lg transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(254, 245, 247, 0.78) 45%, rgba(255, 255, 255, 0.9) 100%)',
              boxShadow: 'rgba(139, 29, 44, 0.08) 0px 20px 40px -15px, rgba(255, 255, 255, 0.95) 0px 1px 0px inset, rgba(255, 255, 255, 0.6) 0px -1px 0px inset, rgba(0, 0, 0, 0.03) 0px 2px 6px',
            }}
          >
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />
            <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-rose-500/10 blur-2xl pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between pb-3 border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <h3 className="font-headline-section text-headline-section text-text-primary font-bold tracking-tight text-base">
                  Academic Overview
                </h3>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success-green" />
                </span>
              </div>
              <span className="font-label-badge text-label-badge px-2.5 py-0.5 rounded-full bg-tint-maroon text-primary border border-rose-200/60 font-bold shadow-sm backdrop-blur-sm">
                CR-3
              </span>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-3">
              {/* CGPA */}
              <div
                className="relative overflow-hidden p-3.5 rounded-xl border border-white/80 flex flex-col justify-between backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-md"
                style={{
                  background: 'linear-gradient(135deg, rgba(251, 234, 234, 0.75) 0%, rgba(255, 255, 255, 0.8) 100%)',
                  boxShadow: 'rgba(107, 0, 24, 0.04) 0px 4px 14px, rgba(255, 255, 255, 0.9) 0px 1px 0px inset',
                }}
              >
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 pointer-events-none" />
                <div className="flex items-center justify-between">
                  <span className="font-label-eyebrow text-[10px] text-primary uppercase font-bold tracking-wider">Cumulative GPA</span>
                  <span className="material-symbols-outlined text-sm text-primary">grade</span>
                </div>
                <span className="text-2xl font-extrabold text-primary tracking-tight mt-1">{currentStudent.cgpa}</span>
                <div className="mt-1 flex items-center gap-1">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-white/90 text-primary border border-rose-200/60 shadow-sm backdrop-blur-sm">
                    Rank 04 / 142
                  </span>
                </div>
              </div>

              {/* Attendance */}
              <div
                className="relative overflow-hidden p-3.5 rounded-xl border border-white/80 flex flex-col justify-between backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-md"
                style={{
                  background: 'linear-gradient(135deg, rgba(234, 248, 239, 0.75) 0%, rgba(255, 255, 255, 0.8) 100%)',
                  boxShadow: 'rgba(30, 158, 90, 0.04) 0px 4px 14px, rgba(255, 255, 255, 0.9) 0px 1px 0px inset',
                }}
              >
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 pointer-events-none" />
                <div className="flex items-center justify-between">
                  <span className="font-label-eyebrow text-[10px] text-success-green uppercase font-bold tracking-wider">Attendance</span>
                  <span className="material-symbols-outlined text-sm text-success-green">verified</span>
                </div>
                <span className="text-2xl font-extrabold text-success-green tracking-tight mt-1">92.4%</span>
                <div className="mt-1 flex items-center gap-1">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-white/90 text-success-green border border-emerald-200/60 shadow-sm backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-success-green" />
                    Mandatory Met
                  </span>
                </div>
              </div>

              {/* Certifications */}
              <div
                className="relative overflow-hidden p-3.5 rounded-xl border border-white/80 flex flex-col justify-between backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-md"
                style={{
                  background: 'linear-gradient(135deg, rgba(234, 240, 252, 0.75) 0%, rgba(255, 255, 255, 0.8) 100%)',
                  boxShadow: 'rgba(62, 111, 217, 0.04) 0px 4px 14px, rgba(255, 255, 255, 0.9) 0px 1px 0px inset',
                }}
              >
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 pointer-events-none" />
                <div className="flex items-center justify-between">
                  <span className="font-label-eyebrow text-[10px] text-info-blue uppercase font-bold tracking-wider">Certifications</span>
                  <span className="material-symbols-outlined text-sm text-info-blue">workspace_premium</span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-bold text-info-blue">6</span>
                  <span className="text-xs font-semibold text-text-primary uppercase tracking-wide">Vaulted</span>
                </div>
                <div className="mt-1 flex items-center gap-1">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-white/90 text-info-blue border border-blue-200/60 shadow-sm backdrop-blur-sm">
                    3 MS, 2 AWS
                  </span>
                </div>
              </div>

              {/* Active Drives */}
              <div
                className="relative overflow-hidden p-3.5 rounded-xl border border-white/80 flex flex-col justify-between backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-md"
                style={{
                  background: 'linear-gradient(135deg, rgba(254, 250, 235, 0.85) 0%, rgba(255, 255, 255, 0.8) 100%)',
                  boxShadow: 'rgba(120, 90, 0, 0.04) 0px 4px 14px, rgba(255, 255, 255, 0.9) 0px 1px 0px inset',
                }}
              >
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 pointer-events-none" />
                <div className="flex items-center justify-between">
                  <span className="font-label-eyebrow text-[10px] text-secondary uppercase font-bold tracking-wider">Active Drives</span>
                  <span className="material-symbols-outlined text-sm text-secondary">event_available</span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-bold text-secondary">4</span>
                  <span className="text-xs font-semibold text-text-primary uppercase tracking-wide">Joined</span>
                </div>
                <div className="mt-1 flex items-center gap-1">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-white/90 text-success-green border border-emerald-200/60 shadow-sm backdrop-blur-sm">
                    <span className="w-1 h-1 rounded-full bg-success-green" />
                    1 Placed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Vault Credentials Section */}
          <div
            className="relative rounded-2xl p-5 flex flex-col gap-3 overflow-hidden backdrop-blur-xl border border-white/80 shadow-lg transition-all duration-300 group"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(246, 248, 254, 0.8) 45%, rgba(255, 255, 255, 0.9) 100%)',
              boxShadow: 'rgba(62, 111, 217, 0.08) 0px 20px 40px -15px, rgba(255, 255, 255, 0.95) 0px 1px 0px inset, rgba(255, 255, 255, 0.6) 0px -1px 0px inset, rgba(0, 0, 0, 0.03) 0px 2px 6px',
            }}
          >
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />
            <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-blue-500/10 blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

            <div className="relative z-10 flex items-center justify-between pb-2 border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-container to-primary text-white flex items-center justify-center shadow-[0_2px_8px_rgba(139,29,44,0.25)] ring-1 ring-white/60">
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                </div>
                <h3 className="font-headline-section text-headline-section text-text-primary font-bold text-sm tracking-tight">
                  Vault Credentials
                </h3>
              </div>
              <a
                className="font-label-button text-xs text-primary font-semibold hover:underline inline-flex items-center gap-0.5"
                href="#all"
              >
                View All
              </a>
            </div>

            <div className="relative z-10 flex flex-col gap-2 pt-1">
              <div className="p-3 rounded-xl bg-white/70 border border-white/80 backdrop-blur-md flex items-center justify-between hover:bg-white transition-all shadow-sm group/item">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-tint-green text-success-green flex items-center justify-center shrink-0 border border-emerald-200/60 shadow-sm">
                    <span
                      className="material-symbols-outlined text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-text-primary font-semibold text-xs leading-tight group-hover/item:text-primary transition-colors">
                      Degree Provisional Sheet
                    </span>
                    <span className="text-[11px] text-text-secondary font-mono mt-0.5">
                      SHA-256: 7f3b...942c • Verified
                    </span>
                  </div>
                </div>
                <button
                  className="p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-white transition-all border border-transparent hover:border-border-subtle shadow-none hover:shadow-sm"
                  title="Download Token"
                >
                  <span className="material-symbols-outlined text-base">download</span>
                </button>
              </div>

              <div className="p-3 rounded-xl bg-white/70 border border-white/80 backdrop-blur-md flex items-center justify-between hover:bg-white transition-all shadow-sm group/item">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-tint-blue text-info-blue flex items-center justify-center shrink-0 border border-blue-200/60 shadow-sm">
                    <span className="material-symbols-outlined text-base">
                      workspace_premium
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-text-primary font-semibold text-xs leading-tight group-hover/item:text-primary transition-colors">
                      Azure Solutions Architect
                    </span>
                    <span className="text-[11px] text-text-secondary font-mono mt-0.5">
                      Issued: Microsoft • Active
                    </span>
                  </div>
                </div>
                <button
                  className="p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-white transition-all border border-transparent hover:border-border-subtle shadow-none hover:shadow-sm"
                  title="Download Token"
                >
                  <span className="material-symbols-outlined text-base">download</span>
                </button>
              </div>
            </div>
          </div>

          {/* 3. Contact & Placement Rep Section */}
          <div
            className="relative rounded-2xl p-5 flex flex-col gap-3 overflow-hidden backdrop-blur-xl border border-white/80 shadow-lg transition-all duration-300 group"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(254, 245, 247, 0.8) 45%, rgba(255, 255, 255, 0.9) 100%)',
              boxShadow: 'rgba(139, 29, 44, 0.08) 0px 20px 40px -15px, rgba(255, 255, 255, 0.95) 0px 1px 0px inset, rgba(255, 255, 255, 0.6) 0px -1px 0px inset, rgba(0, 0, 0, 0.03) 0px 2px 6px',
            }}
          >
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />
            <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-rose-500/10 blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

            <div className="relative z-10 flex items-center justify-between pb-2 border-b border-border-subtle cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-container to-primary text-white flex items-center justify-center shadow-[0_2px_8px_rgba(139,29,44,0.25)] ring-1 ring-white/60">
                  <span className="material-symbols-outlined text-[16px]">support_agent</span>
                </div>
                <h3 className="font-headline-section text-headline-section text-text-primary font-bold text-sm tracking-tight">
                  Contact &amp; Placement Rep
                </h3>
              </div>
              <span className="material-symbols-outlined text-text-secondary text-base group-hover:text-primary transition-colors">
                expand_more
              </span>
            </div>

            <div className="relative z-10 flex flex-col gap-2 pt-1 text-xs">
              <div className="p-2.5 rounded-xl bg-white/70 border border-white/80 backdrop-blur-md flex items-center justify-between shadow-sm hover:bg-white transition-all">
                <span className="text-text-secondary flex items-center gap-2 font-medium">
                  <span className="material-symbols-outlined text-sm text-primary">mail</span>
                  Email
                </span>
                <span className="text-text-primary font-semibold font-mono">
                  {currentStudent.email}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/70 border border-white/80 backdrop-blur-md flex items-center justify-between shadow-sm hover:bg-white transition-all">
                <span className="text-text-secondary flex items-center gap-2 font-medium">
                  <span className="material-symbols-outlined text-sm text-success-green">call</span>
                  Contact
                </span>
                <span className="text-text-primary font-semibold font-mono">
                  {currentStudent.phone}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/70 border border-white/80 backdrop-blur-md flex items-center justify-between shadow-sm hover:bg-white transition-all">
                <span className="text-text-secondary flex items-center gap-2 font-medium">
                  <span className="material-symbols-outlined text-sm text-info-blue">badge</span>
                  Assigned SPOC
                </span>
                <span className="text-text-primary font-semibold">{currentStudent.spoc}</span>
              </div>
            </div>

            <div className="relative z-10 pt-2 flex items-center gap-2">
              <button
                onClick={() => alert(`Editing dossier for ${currentStudent.name}`)}
                className="flex-1 py-2.5 px-4 rounded-xl text-white font-label-button text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] border-t border-white/30"
                style={{
                  background: 'linear-gradient(135deg, rgb(139, 29, 44) 0%, rgb(110, 21, 33) 100%)',
                  boxShadow: 'rgba(107, 0, 24, 0.3) 0px 4px 14px, rgba(255, 255, 255, 0.35) 0px 1px 1px inset',
                }}
              >
                <span className="material-symbols-outlined text-base">edit_square</span>
                <span>Edit Dossier</span>
              </button>

              <button
                onClick={() => window.print()}
                className="p-2.5 rounded-xl bg-white/70 border border-white/80 backdrop-blur-md hover:bg-white text-text-primary transition-all shadow-sm hover:shadow-md flex items-center justify-center"
                title="Print Scholar Dossier"
              >
                <span className="material-symbols-outlined text-base text-text-secondary hover:text-text-primary">
                  print
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Student Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Scholar"
        subtitle="Register a scholar into the T&P cryptographically verified directory."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('Scholar registered successfully!');
            setShowAddModal(false);
          }}
          className="space-y-4 text-xs"
        >
          <div>
            <label className="block font-semibold text-text-primary mb-1">Scholar Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Jaspreet Singh"
              className="w-full h-10 px-3 rounded-xl border border-border-subtle focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold text-text-primary mb-1">University Roll Number</label>
            <input
              type="text"
              required
              placeholder="RIMT-21-CSE-150"
              className="w-full h-10 px-3 rounded-xl border border-border-subtle focus:border-primary focus:outline-none font-mono"
            />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-border-subtle">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 rounded-xl text-text-secondary hover:bg-surface-container-low"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold shadow-sm"
            >
              Register Scholar
            </button>
          </div>
        </form>
      </Modal>

      {/* Bulk Import Modal */}
      <Modal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        title="Bulk Import Scholar Records"
        subtitle="Upload an ERP Excel/CSV sheet to populate batch records in bulk."
      >
        <div className="space-y-4 text-xs">
          <div className="border-2 border-dashed border-border-subtle rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-surface-container-low/40">
            <span className="material-symbols-outlined text-4xl text-primary mb-2">cloud_upload</span>
            <p className="font-semibold text-text-primary">Drag &amp; drop student CSV or Excel file</p>
            <p className="text-[11px] text-text-secondary mt-1">
              Supports UTF-8 .csv, .xlsx up to 25MB (2,500 records/batch)
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowImportModal(false)}
              className="px-4 py-2 rounded-xl text-text-secondary hover:bg-surface-container-low"
            >
              Close
            </button>
            <button
              onClick={() => {
                alert('Imported 50 new scholar records successfully!');
                setShowImportModal(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold shadow-sm"
            >
              Start Automated Import
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
