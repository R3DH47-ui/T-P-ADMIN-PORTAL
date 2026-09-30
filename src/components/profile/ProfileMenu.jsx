'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function ProfileMenu({ admin, onOpenProfile, onOpenChangePassword, onSignOut }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fullName = admin?.full_name || 'Administrator';
  const roleTitle = admin?.full_name === 'Raj Kumar' 
    ? 'HOD BCA' 
    : admin?.full_name === 'Sagrika' 
    ? 'Vice HOD BCA' 
    : (admin?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Administrator');
  const avatarUrl = admin?.profile_pic_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=7A1D27&color=fff&bold=true`;
  const emailDisplay = admin?.email || (admin?.full_name ? `${admin.full_name.toLowerCase().replace(/\s+/g, '.')}@rimt.ac.in` : 'admin@rimt.ac.in');

  return (
    <div className="relative" ref={menuRef}>
      {/* Clickable Header Capsule */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 pl-0.5 cursor-pointer group/user text-left focus:outline-none"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <div className="relative">
          <img
            alt={fullName}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20 group-hover/user:ring-primary/50 transition-all shadow-sm"
            src={avatarUrl}
          />
          <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-success-green ring-1 ring-white" />
        </div>

        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-semibold text-text-primary leading-tight group-hover/user:text-primary transition-colors max-w-[130px] truncate">
            {fullName}
          </span>
          <span className="text-[11px] text-text-secondary leading-tight flex items-center gap-1">
            {roleTitle}
            <span className="material-symbols-outlined text-[12px] opacity-70">
              {open ? 'expand_less' : 'expand_more'}
            </span>
          </span>
        </div>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-[0_12px_36px_-6px_rgba(0,0,0,0.15)] border border-slate-100 py-2 z-50 animate-fadeIn text-left">
          {/* Admin Identity Mini Header */}
          <div className="px-4 py-2.5 border-b border-slate-100">
            <p className="text-xs font-bold text-slate-900 truncate">{fullName}</p>
            <p className="text-[11px] text-slate-500 truncate">{emailDisplay}</p>
            <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">
              Active Session
            </span>
          </div>

          <div className="py-1">
            <button
              onClick={() => {
                setOpen(false);
                if (onOpenProfile) onOpenProfile();
              }}
              className="w-full px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#8B1D2C] flex items-center gap-2.5 transition-colors text-left"
            >
              <span className="material-symbols-outlined text-base text-slate-400">person</span>
              <span>Profile Settings</span>
            </button>

            <button
              onClick={() => {
                setOpen(false);
                if (onOpenChangePassword) onOpenChangePassword();
              }}
              className="w-full px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#8B1D2C] flex items-center gap-2.5 transition-colors text-left"
            >
              <span className="material-symbols-outlined text-base text-slate-400">key</span>
              <span>Change Password</span>
            </button>
          </div>

          <div className="border-t border-slate-100 pt-1">
            <button
              onClick={() => {
                setOpen(false);
                if (onSignOut) onSignOut();
              }}
              className="w-full px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 transition-colors text-left"
            >
              <span className="material-symbols-outlined text-base text-rose-500">logout</span>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
