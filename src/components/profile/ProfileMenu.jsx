'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isSameAdminAccount, getSavedAccounts } from '@/lib/authApi';

export default function ProfileMenu({
  admin,
  accounts = [],
  onSwitchAccount,
  onAddAccountSuccess,
  onOpenProfile,
  onOpenChangePassword,
  onSignOut,
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

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

  // Other saved accounts not currently active (Gmail-style list)
  const sourceAccounts = Array.isArray(accounts) && accounts.length > 0 ? accounts : (typeof window !== 'undefined' ? getSavedAccounts() : []);
  const otherAccounts = sourceAccounts.filter((acc) => !isSameAdminAccount(acc, admin));

  const handleAccountSwitch = (acc) => {
    setOpen(false);
    if (onSwitchAccount) {
      onSwitchAccount(acc);
    }
  };

  const handleAddAccount = () => {
    setOpen(false);
    // Navigate to the dedicated full-page Add Account screen
    router.push('/admin/add-account');
  };

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

      {/* Dropdown Menu — Gmail-style multi-account */}
      {open && (
        <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-[0_12px_36px_-6px_rgba(0,0,0,0.18)] border border-slate-100 py-1 z-50 animate-fadeIn text-left overflow-hidden">
          {/* Active Admin Identity Header */}
          <div className="px-4 py-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <img
                alt={fullName}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/20 shadow-xs"
                src={avatarUrl}
              />
              <div className="flex flex-col min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-900 truncate">{fullName}</p>
                <p className="text-[11px] text-slate-500 truncate">{emailDisplay}</p>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Session
              </span>
              <span className="text-[10px] text-slate-400 font-medium">{roleTitle}</span>
            </div>
          </div>

          {/* Gmail-style Other Accounts — Instant 1-Click Switch */}
          {otherAccounts.length > 0 && (
            <div className="py-1.5 px-2 border-b border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">
                Switch Account
              </p>
              <div className="space-y-0.5">
                {otherAccounts.map((acc) => {
                  const accName = acc.full_name || acc.name || 'Admin';
                  const accAvatar = acc.profile_pic_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(accName)}&background=1E3A8A&color=fff&bold=true`;
                  const accEmail = acc.email || `${accName.toLowerCase().replace(/\s+/g, '.')}@rimt.ac.in`;
                  return (
                    <button
                      key={acc.id || acc.email}
                      onClick={() => handleAccountSwitch(acc)}
                      className="w-full p-2 rounded-xl hover:bg-slate-50 text-left transition-all flex items-center gap-2.5 group/acc"
                    >
                      <img
                        src={accAvatar}
                        alt={accName}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                      />
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-xs font-bold text-slate-800 group-hover/acc:text-primary transition-colors truncate">
                          {accName}
                        </span>
                        <span className="text-[10px] text-slate-500 truncate">
                          {accEmail}
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-xs text-slate-300 group-hover/acc:text-primary transition-colors shrink-0">
                        arrow_forward_ios
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add Another Account — Navigates to full page */}
          <div className="py-1 border-b border-slate-100">
            <button
              onClick={handleAddAccount}
              className="w-full px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-primary flex items-center gap-2.5 transition-colors text-left"
            >
              <span className="material-symbols-outlined text-base text-primary">person_add</span>
              <span>Add another account</span>
            </button>
          </div>

          {/* Profile Settings & Change Password */}
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

          {/* Sign Out */}
          <div className="pt-1 border-t border-slate-100">
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
