'use client';

import React from 'react';

export default function Header({
  onOpenMobileSidebar,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <header className="fixed top-0 left-0 md:left-20 lg:left-72 right-0 h-16 bg-white/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-border-subtle/80 transition-all duration-300">
      {/* Left Area: Mobile Brand + Search Input */}
      <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 -ml-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-container-low transition-colors md:hidden"
          aria-label="Open sidebar"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>

        {/* Mobile RIMT Logo with Sweep Animation */}
        <div className="flex items-center gap-2 md:hidden shrink-0">
          <div className="relative w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 shadow-sm border border-slate-200 overflow-hidden">
            <img
              alt="RIMT Logo"
              className="h-full w-full object-contain relative z-10"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC19AQmgWL-gUir-ndxuF4jup3xrY5qBj64LUXlgD9RJE6IRXQl7Uw9pQ_cKLppluBw_ZpAaGrjzn9MM_33NeGwHee4byWlTWDl3k3ZH1ODJBySdYc1fAI_vX56Ks6Y_9rsUeDdfxgzgIKrwrKJRiXXd43-8bqVix0hb9h_KVy-x333S8_1qgi_MEC7mirEEZdIdmjQrVxbxQLOkTdB8x3YlxqRC5q1PzKVSKVWY-4rZfKHynQQWu8oLw4z4yUS8WIugw"
            />
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
              <div className="w-5 h-[250%] bg-gradient-to-r from-transparent via-white/90 to-transparent absolute -top-1/2 left-0 animate-logo-sweep pointer-events-none" />
            </div>
          </div>
          <span className="text-xs font-bold text-primary hidden xs:inline truncate">RIMT Trust</span>
        </div>

        <div
          className="relative w-full max-w-xs sm:max-w-md rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
          style={{
            background: 'linear-gradient(135deg, rgba(243, 244, 248, 0.9) 0%, rgba(235, 237, 243, 0.82) 100%)',
            backdropFilter: 'blur(14px)',
            border: '1px solid rgba(255, 255, 255, 0.85)',
            boxShadow: 'rgba(0, 0, 0, 0.06) 0px 4px 20px -2px, rgba(255, 255, 255, 0.9) 0px 1px 1px inset, rgba(0, 0, 0, 0.04) 0px -1px 1px inset',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 pointer-events-none" />
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary text-lg pointer-events-none drop-shadow-sm">
            search
          </span>
          <input
            className="w-full h-10 pl-10 pr-4 bg-transparent text-text-primary placeholder:text-text-secondary font-body-default text-xs sm:text-sm outline-none transition-all"
            placeholder="Search students, companies, drives..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary text-xs hover:text-text-primary"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Profile Capsule on Right */}
      <div className="backdrop-blur-md bg-white/70 border border-white/60 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05),0_0_0_1px_rgba(255,255,255,0.8)_inset] rounded-2xl px-2.5 sm:px-3 py-1.5 flex items-center gap-2 sm:gap-3 relative overflow-hidden group transition-all duration-300 hover:shadow-md ml-3 shrink-0">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80 pointer-events-none" />

        <button
          onClick={() => alert('No new unread administrative alerts.')}
          className="relative p-1.5 sm:p-2 rounded-xl text-text-secondary hover:bg-white/80 hover:text-primary transition-all duration-200 flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-lg sm:text-xl">
            notifications
          </span>
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary rounded-full ring-2 ring-white" />
        </button>

        <div className="h-5 w-px bg-surface-container-highest/80" />

        <div className="flex items-center gap-2.5 pl-0.5 cursor-pointer group/user">
          <div className="relative">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20 group-hover/user:ring-primary/40 transition-all"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuJFov-8nCrBTs3RZdR6gNnHPK7-OqoZWkaainCk_EWKXLPDEEfEf9bygbDF3S9aYJ8SHx8bU3-gRahDOd_evx6Hv2jJEihZSIMMILC3smv0WefgvgIJrx5v93zacLG7J_TrJYrFZWKRGyYpjxE3ZyPe9zi5sTpBJk7vSkJ938d2J3lbJBHjC3mUpvfzYyoJICWKWfLuPD4KXEDQJ7ewtQlfUI7JOFLivTiFHSEjqgCEkLhlHPAVqP"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-success-green ring-1 ring-white" />
          </div>

          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-semibold text-text-primary leading-tight group-hover/user:text-primary transition-colors">
              Prof. H. S. Bawa
            </span>
            <span className="text-[11px] text-text-secondary leading-tight">
              Dean T&amp;P
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
