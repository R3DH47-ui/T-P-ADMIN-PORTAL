'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isSameAdminAccount, getSavedAccounts, isAdminAccount, isCompanyAccount } from '@/lib/authApi';

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

  const isCompany = admin?.role === 'COMPANY';
  const fullName = isCompany
    ? (admin?.company_name || admin?.recruiter_name || 'Corporate Partner')
    : (admin?.full_name || 'Administrator');
  const roleTitle = isCompany
    ? 'Corporate Recruiter'
    : admin?.full_name === 'Raj Kumar' 
    ? 'HOD BCA' 
    : admin?.full_name === 'Sagrika' 
    ? 'Vice HOD BCA' 
    : (admin?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Administrator');
  const avatarUrl = admin?.avatar_url || admin?.profile_pic_url || (
    isCompany
      ? `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=0B4EA2&color=fff&bold=true`
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=7A1D27&color=fff&bold=true`
  );
  const emailDisplay = admin?.email || (admin?.full_name ? `${admin.full_name.toLowerCase().replace(/\s+/g, '.')}@rimt.ac.in` : 'admin@rimt.ac.in');

  // Other saved accounts not currently active (Gmail-style list)
  // Strictly filter by role: Company accounts only see Company accounts, Admin accounts only see Admin accounts
  const sourceAccounts = Array.isArray(accounts) && accounts.length > 0 ? accounts : (typeof window !== 'undefined' ? getSavedAccounts() : []);
  const otherAccounts = sourceAccounts.filter((acc) => {
    if (isSameAdminAccount(acc, admin)) return false;
    return isCompany ? isCompanyAccount(acc) : isAdminAccount(acc);
  });

  const handleAccountSwitch = (acc) => {
    setOpen(false);
    if (onSwitchAccount) {
      onSwitchAccount(acc);
    }
  };

  const handleAddAccount = () => {
    setOpen(false);
    // Navigate to appropriate add-account / sign-in screen
    if (isCompany) {
      router.push('/company/auth');
    } else {
      router.push('/admin/add-account');
    }
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
            className={`w-8 h-8 rounded-full object-cover ring-2 ${isCompany ? 'ring-blue-500/30 group-hover/user:ring-blue-500/60' : 'ring-primary/20 group-hover/user:ring-primary/50'} transition-all shadow-sm`}
            src={avatarUrl}
          />
          <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-success-green ring-1 ring-white" />
        </div>

        <div className="hidden sm:flex flex-col text-left">
          <span className={`text-xs font-semibold text-text-primary leading-tight ${isCompany ? 'group-hover/user:text-[#0B4EA2]' : 'group-hover/user:text-primary'} transition-colors max-w-[130px] truncate`}>
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
          {/* Active Identity Header */}
          <div className="px-4 py-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <img
                alt={fullName}
                className={`w-11 h-11 rounded-full object-cover ring-2 ${isCompany ? 'ring-blue-500/30' : 'ring-primary/20'} shadow-xs`}
                src={avatarUrl}
              />
              <div className="flex flex-col min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-900 truncate">{fullName}</p>
                <p className="text-[11px] text-slate-500 truncate">{emailDisplay}</p>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${isCompany ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'} text-[10px] font-semibold border`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isCompany ? 'bg-blue-600 animate-pulse' : 'bg-emerald-500 animate-pulse'}`} />
                Active Session
              </span>
              <span className="text-[10px] text-slate-400 font-medium">{roleTitle}</span>
            </div>
          </div>

          {/* Gmail-style Other Accounts — Instant 1-Click Switch */}
          {otherAccounts.length > 0 && (
            <div className="py-1.5 px-2 border-b border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">
                Switch {isCompany ? 'Company' : 'Administrator'} Account
              </p>
              <div className="space-y-0.5">
                {otherAccounts.map((acc) => {
                  const accIsCompany = acc.role === 'COMPANY' || !!acc.company_name;
                  const accName = accIsCompany
                    ? (acc.company_name || acc.recruiter_name || 'Corporate Partner')
                    : (acc.full_name || acc.name || 'Admin');
                  const accAvatar = acc.profile_pic_url || acc.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(accName)}&background=${accIsCompany ? '0B4EA2' : '7A1D27'}&color=fff&bold=true`;
                  const accEmail = acc.email || (accIsCompany ? 'corporate@partner.com' : `${accName.toLowerCase().replace(/\s+/g, '.')}@rimt.ac.in`);
                  return (
                    <button
                      key={acc.id || acc.email}
                      onClick={() => handleAccountSwitch(acc)}
                      className="w-full p-2 rounded-xl hover:bg-slate-50 text-left transition-all flex items-center gap-2.5 group/acc cursor-pointer"
                    >
                      <img
                        src={accAvatar}
                        alt={accName}
                        className={`w-8 h-8 rounded-full object-cover ring-1 ${accIsCompany ? 'ring-blue-200' : 'ring-slate-200'} shrink-0`}
                      />
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className={`text-xs font-bold text-slate-800 ${accIsCompany ? 'group-hover/acc:text-[#0B4EA2]' : 'group-hover/acc:text-primary'} transition-colors truncate`}>
                          {accName}
                        </span>
                        <span className="text-[10px] text-slate-500 truncate">
                          {accEmail}
                        </span>
                      </div>
                      <span className={`material-symbols-outlined text-xs text-slate-300 ${accIsCompany ? 'group-hover/acc:text-[#0B4EA2]' : 'group-hover/acc:text-primary'} transition-colors shrink-0`}>
                        arrow_forward_ios
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add Another Account — Navigates to appropriate screen */}
          <div className="py-1 border-b border-slate-100">
            <button
              onClick={handleAddAccount}
              className={`w-full px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 ${isCompany ? 'hover:text-[#0B4EA2]' : 'hover:text-primary'} flex items-center gap-2.5 transition-colors text-left cursor-pointer`}
            >
              <span className={`material-symbols-outlined text-base ${isCompany ? 'text-[#0B4EA2]' : 'text-primary'}`}>
                {isCompany ? 'domain_add' : 'person_add'}
              </span>
              <span>{isCompany ? 'Add another company account' : 'Add another account'}</span>
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
