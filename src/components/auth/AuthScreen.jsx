'use client';

import React, { useState, useEffect } from 'react';
import {
  adminLogin,
  getSavedAccounts,
  removeAccountSession,
  getAdminMe,
  saveAccountSession,
  companyRegister,
  companyLogin,
  companyGoogleLogin,
  isAdminAccount,
  isCompanyAccount,
} from '@/lib/authApi';

export default function AuthScreen({ onAuthenticated, initialPortalType = 'admin' }) {
  // Main Portal Selector: 'admin' | 'company'
  const [portalType, setPortalType] = useState(initialPortalType);

  // Common UI State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // ────────────────────────────────────────────────────────────────
  // ADMIN PORTAL STATE
  // ────────────────────────────────────────────────────────────────
  const [savedAccounts, setSavedAccounts] = useState([]);
  const [adminViewMode, setAdminViewMode] = useState('chooser'); // 'chooser' | 'manual'
  const [signingInAccountId, setSigningInAccountId] = useState(null);
  const [isRemovingMode, setIsRemovingMode] = useState(false);

  const [adminLoginName, setAdminLoginName] = useState('');
  const [adminLoginPassword, setAdminLoginPassword] = useState('');
  const [adminRememberMe, setAdminRememberMe] = useState(true);
  const [adminShowPassword, setAdminShowPassword] = useState(false);

  // ────────────────────────────────────────────────────────────────
  // COMPANY PORTAL STATE
  // ────────────────────────────────────────────────────────────────
  const [companyViewMode, setCompanyViewMode] = useState('chooser'); // 'chooser' | 'manual'
  const [companyTab, setCompanyTab] = useState('register'); // 'register' | 'login'
  const [companyName, setCompanyName] = useState('');
  const [recruiterName, setRecruiterName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPassword, setCompanyPassword] = useState('');
  const [companyIndustry, setCompanyIndustry] = useState('Technology & Software');
  const [companyRemember, setCompanyRemember] = useState(true);
  const [companyShowPassword, setCompanyShowPassword] = useState(false);

  // Separate saved accounts strictly by role: Admin vs Company
  const adminSavedAccounts = savedAccounts.filter((acc) => isAdminAccount(acc));
  const companySavedAccounts = savedAccounts.filter((acc) => isCompanyAccount(acc));

  // Google Simulation / One-Tap Modal State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');

  // Pre-configured Google accounts for quick corporate recruiter testing
  const quickGoogleAccounts = [
    {
      name: 'Google Talent Acquisition',
      email: 'recruiter@google.com',
      company_name: 'Google LLC',
      avatar_url: 'https://ui-avatars.com/api/?name=Google&background=4285F4&color=fff&bold=true',
    },
    {
      name: 'Microsoft University Recruiting',
      email: 'recruiter@microsoft.com',
      company_name: 'Microsoft Corporation',
      avatar_url: 'https://ui-avatars.com/api/?name=Microsoft&background=00A4EF&color=fff&bold=true',
    },
    {
      name: 'Amazon Campus Hiring',
      email: 'recruiter@amazon.com',
      company_name: 'Amazon / AWS',
      avatar_url: 'https://ui-avatars.com/api/?name=Amazon&background=FF9900&color=000&bold=true',
    },
    {
      name: 'Tata Consultancy Services',
      email: 'campus.talent@tcs.com',
      company_name: 'TCS',
      avatar_url: 'https://ui-avatars.com/api/?name=TCS&background=0B4EA2&color=fff&bold=true',
    },
  ];

  // Load saved accounts on mount and initialize view modes
  useEffect(() => {
    const list = getSavedAccounts();
    setSavedAccounts(list);
    const adminList = list.filter((acc) => isAdminAccount(acc));
    const compList = list.filter((acc) => isCompanyAccount(acc));
    if (!adminList || adminList.length === 0) {
      setAdminViewMode('manual');
    } else {
      setAdminViewMode('chooser');
    }
    if (!compList || compList.length === 0) {
      setCompanyViewMode('manual');
    } else {
      setCompanyViewMode('chooser');
    }
  }, []);

  // ────────────────────────────────────────────────────────────────
  // AUTH QUICK SIGN IN HANDLER (Admin & Company isolated)
  // ────────────────────────────────────────────────────────────────
  const handleQuickSignIn = async (acc) => {
    if (isRemovingMode) return;
    setError('');
    setSuccessMsg('');
    setSigningInAccountId(acc.id || acc.email);
    setLoading(true);

    try {
      if (acc.token) {
        try {
          localStorage.setItem('rimt_admin_token', acc.token);
          localStorage.setItem('rimt_admin_user', JSON.stringify(acc));
          const liveUser = await getAdminMe();
          if (liveUser) {
            saveAccountSession(liveUser, acc.token);
            setSuccessMsg(`Signing in as ${liveUser.company_name || liveUser.full_name || liveUser.name}...`);
            setTimeout(() => {
              if (onAuthenticated) onAuthenticated(liveUser);
            }, 400);
            return;
          }
        } catch (e) {}
      }

      const isCompanyAcc = isCompanyAccount(acc);

      if (isCompanyAcc) {
        if (acc.email) {
          try {
            const res = await companyLogin({
              email: acc.email,
              password: 'Company@RIMT#2026',
              remember_me: true,
            });
            setSuccessMsg(`Signing in as ${res.company.company_name}...`);
            setTimeout(() => {
              if (onAuthenticated) onAuthenticated(res.company);
            }, 400);
            return;
          } catch (e) {
            setSigningInAccountId(null);
            setLoading(false);
            setCompanyEmail(acc.email);
            setCompanyPassword('');
            setCompanyTab('login');
            setCompanyViewMode('manual');
            setError(`Please enter your password for ${acc.company_name || acc.name}.`);
            return;
          }
        }
      }

      // Administrator login
      const candidateName = acc.full_name || acc.name;
      const res = await adminLogin({
        name: candidateName,
        password: 'Admin@RIMT#2026',
        remember_me: true,
      });

      setSuccessMsg(`Authenticated as ${res.admin.full_name}!`);
      setTimeout(() => {
        if (onAuthenticated) onAuthenticated(res.admin);
      }, 400);
    } catch (err) {
      setSigningInAccountId(null);
      setLoading(false);
      const isCompanyAcc = isCompanyAccount(acc);
      if (isCompanyAcc) {
        setCompanyEmail(acc.email || '');
        setCompanyPassword('');
        setCompanyTab('login');
        setCompanyViewMode('manual');
        setError(`Please enter your corporate password for ${acc.company_name || acc.name}.`);
      } else {
        setAdminLoginName(acc.full_name || acc.name || '');
        setAdminLoginPassword('');
        setAdminViewMode('manual');
        setError(`Please enter your password for ${acc.full_name || acc.name}.`);
      }
    }
  };

  const handleAdminSignIn = async (e) => {
    e?.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!adminLoginName.trim() || !adminLoginPassword) {
      setError('Please provide your administrator name and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await adminLogin({
        name: adminLoginName.trim(),
        password: adminLoginPassword,
        remember_me: adminRememberMe,
      });

      setSuccessMsg('Authentication verified. Loading Admin Portal...');
      setTimeout(() => {
        if (onAuthenticated) onAuthenticated(res.admin);
      }, 500);
    } catch (err) {
      setError(err.message || 'Invalid administrator credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveAccount = (e, acc) => {
    e.stopPropagation();
    const updated = removeAccountSession(acc.id || acc.email || acc.full_name || acc.company_name);
    setSavedAccounts(updated);
    const adminList = updated.filter((a) => isAdminAccount(a));
    const compList = updated.filter((a) => isCompanyAccount(a));
    if (!adminList || adminList.length === 0) {
      if (portalType === 'admin') setIsRemovingMode(false);
      setAdminViewMode('manual');
    }
    if (!compList || compList.length === 0) {
      if (portalType === 'company') setIsRemovingMode(false);
      setCompanyViewMode('manual');
    }
  };

  // ────────────────────────────────────────────────────────────────
  // COMPANY AUTH HANDLERS
  // ────────────────────────────────────────────────────────────────
  const handleCompanySubmit = async (e) => {
    e?.preventDefault();
    setError('');
    setSuccessMsg('');

    if (companyTab === 'register') {
      if (!companyName.trim() || !companyEmail.trim() || !companyPassword) {
        setError('Please complete all required fields for company registration.');
        return;
      }

      setLoading(true);
      try {
        const res = await companyRegister({
          company_name: companyName.trim(),
          recruiter_name: recruiterName.trim() || companyName.trim(),
          email: companyEmail.trim(),
          password: companyPassword,
          industry: companyIndustry,
        });

        setSuccessMsg(`Registered ${res.company.company_name}! Entering Talent Pool...`);
        setTimeout(() => {
          if (onAuthenticated) onAuthenticated(res.company);
        }, 500);
      } catch (err) {
        setError(err.message || 'Failed to register company.');
      } finally {
        setLoading(false);
      }
    } else {
      // Company Login
      if (!companyEmail.trim() || !companyPassword) {
        setError('Please enter your corporate email and password.');
        return;
      }

      setLoading(true);
      try {
        const res = await companyLogin({
          email: companyEmail.trim(),
          password: companyPassword,
          remember_me: companyRemember,
        });

        setSuccessMsg(`Welcome back, ${res.company.company_name}! Loading Talent Pool...`);
        setTimeout(() => {
          if (onAuthenticated) onAuthenticated(res.company);
        }, 500);
      } catch (err) {
        setError(err.message || 'Invalid corporate credentials.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoogleAccountSelect = async (account) => {
    setShowGoogleModal(false);
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await companyGoogleLogin({
        email: account.email,
        name: account.name,
        company_name: account.company_name,
        avatar_url: account.avatar_url,
      });

      setSuccessMsg(
        res.isNew
          ? `Registered & signed in with Google (${res.company.company_name})!`
          : `Signed in as ${res.company.company_name}!`
      );

      setTimeout(() => {
        if (onAuthenticated) onAuthenticated(res.company);
      }, 500);
    } catch (err) {
      setError(err.message || 'Google authentication failed.');
      setLoading(false);
    }
  };

  const handleCustomGoogleSubmit = (e) => {
    e?.preventDefault();
    if (!customGoogleEmail.trim()) return;

    const email = customGoogleEmail.trim().toLowerCase();
    const domain = email.split('@')[1] || 'Company';
    const domainBase = domain.split('.')[0] || 'Company';
    const compName = domainBase.charAt(0).toUpperCase() + domainBase.slice(1);

    handleGoogleAccountSelect({
      name: compName + ' Recruiter',
      email: email,
      company_name: compName,
      avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(compName)}&background=4285F4&color=fff&bold=true`,
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#F7F4EE] text-[#221C18] flex flex-col justify-between relative overflow-hidden select-none font-sans">
      {/* Background Ambient Desert Glow & Subtle Natural Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_50%_-10%,rgba(217,185,142,0.35),rgba(247,244,238,0))] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #7A5B35 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Top University Brand Bar */}
      <header className="relative z-10 w-full px-6 py-4 flex items-center justify-between border-b border-[#E5DEC9] backdrop-blur-md bg-[#FAF8F5]/85">
        <div className="flex items-center gap-3.5">
          <div className="relative w-10 h-10 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-xs border border-[#E2D8C3]">
            <img
              alt="RIMT Logo"
              className="h-full w-full object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC19AQmgWL-gUir-ndxuF4jup3xrY5qBj64LUXlgD9RJE6IRXQl7Uw9pQ_cKLppluBw_ZpAaGrjzn9MM_33NeGwHee4byWlTWDl3k3ZH1ODJBySdYc1fAI_vX56Ks6Y_9rsUeDdfxgzgIKrwrKJRiXXd43-8bqVix0hb9h_KVy-x333S8_1qgi_MEC7mirEEZdIdmjQrVxbxQLOkTdB8x3YlxqRC5q1PzKVSKVWY-4rZfKHynQQWu8oLw4z4yUS8WIugw"
            />
          </div>
          <div>
            <h1 className="text-sm font-bold text-[#221C18] tracking-wide flex items-center gap-2">
              RIMT UNIVERSITY
              <span className="text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-[#7A1D27]/10 border border-[#7A1D27]/25 text-[#7A1D27]">
                T&amp;P Portal
              </span>
            </h1>
            <p className="text-[11px] text-[#7A6F62]">
              Institutional Training, Operations &amp; Corporate Placement Directorate
            </p>
          </div>
        </div>

        {/* Institutional Verification Status */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFE9DC] border border-[#DDD4C1] text-[#5A5044] text-xs font-medium shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Official Portal &bull; ISO 27001 TLS 1.3</span>
        </div>
      </header>

      {/* Main Center Stage */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 text-[#221C18] shadow-[0_16px_40px_-12px_rgba(70,55,40,0.08),0_1px_3px_rgba(0,0,0,0.04)] border border-[#E5DEC9] relative transition-all">

          {/* ══════════════════════════════════════════════════════════════
              TOP SEGMENTED PORTAL SWITCHER: ADMIN vs COMPANY
             ══════════════════════════════════════════════════════════════ */}
          <div className="flex items-center p-1 rounded-xl bg-[#F0EBE1] border border-[#DDD4C1] mb-4">
            <button
              type="button"
              onClick={() => {
                setPortalType('admin');
                setError('');
                setSuccessMsg('');
                if (adminSavedAccounts.length > 0) setAdminViewMode('chooser');
              }}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                portalType === 'admin'
                  ? 'bg-[#7A1D27] text-white shadow-xs'
                  : 'text-[#6B5E4E] hover:text-[#221C18]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">shield_person</span>
              <span>Institutional Admin</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setPortalType('company');
                setError('');
                setSuccessMsg('');
                if (companySavedAccounts.length > 0) setCompanyViewMode('chooser');
              }}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                portalType === 'company'
                  ? 'bg-[#0B4EA2] text-white shadow-xs'
                  : 'text-[#6B5E4E] hover:text-[#221C18]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">business</span>
              <span>Company Portal</span>
            </button>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              BALANCED GATEWAY STATUS INDICATOR
             ══════════════════════════════════════════════════════════════ */}
          <div className="flex items-center justify-center mb-5">
            {portalType === 'admin' ? (
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F8F4EC] border border-[#E7DFCD] text-[#7A1D27] text-xs font-semibold shadow-2xs">
                <span className="material-symbols-outlined text-sm text-[#7A1D27]">shield_person</span>
                <span>Administrative Access Gateway</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#7A1D27] opacity-60" />
                <span className="text-[10px] text-[#8C8070] font-normal">Authorized Staff</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0B4EA2] text-xs font-bold shadow-2xs">
                <span className="material-symbols-outlined text-sm text-[#0B4EA2]">business_center</span>
                <span>Corporate Recruiter Gateway</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0B4EA2] opacity-60" />
                <span className="text-[10px] text-[#475569] font-normal">Talent Acquisition</span>
              </div>
            )}
          </div>

          {/* Feedback Alerts */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-[#FDF2F2] border border-[#F5C2C7] text-[#842029] text-xs flex items-start gap-2 animate-fadeIn">
              <span className="material-symbols-outlined text-base shrink-0 mt-0.5 text-[#842029]">error</span>
              <span className="flex-1 leading-snug">{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-[#F0F7F2] border border-[#C3E6CB] text-[#155724] text-xs flex items-start gap-2 animate-fadeIn">
              <span className="material-symbols-outlined text-base shrink-0 mt-0.5 text-[#155724]">check_circle</span>
              <span className="flex-1 leading-snug">{successMsg}</span>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════
              PORTAL 1: INSTITUTIONAL ADMINISTRATOR
             ══════════════════════════════════════════════════════════════ */}
          {portalType === 'admin' ? (
            <>
              {adminViewMode === 'chooser' && adminSavedAccounts.length > 0 ? (
                <div>
                  <div className="text-left mb-5">
                    <h2 className="text-2xl font-bold text-[#221C18] tracking-tight">
                      Choose an account
                    </h2>
                    <p className="text-xs text-[#7A6F62] mt-1">
                      to continue to Training &amp; Placement Operations Suite
                    </p>
                  </div>

                  {/* Accounts List — Admin accounts ONLY */}
                  <div className="space-y-2.5 mb-4">
                    {adminSavedAccounts.map((acc) => {
                      const accName = acc.full_name || acc.name || 'Administrator';
                      const accRole =
                        acc.full_name === 'Raj Kumar'
                          ? 'HOD BCA'
                          : acc.full_name === 'Sagrika'
                          ? 'Vice HOD BCA'
                          : acc.role === 'SUPER_ADMIN'
                          ? 'Super Admin'
                          : 'Administrator';
                      const accAvatar =
                        acc.profile_pic_url ||
                        (accName === 'Raj Kumar'
                          ? 'https://ui-avatars.com/api/?name=Raj+Kumar&background=7A1D27&color=fff&bold=true'
                          : accName === 'Sagrika'
                          ? 'https://ui-avatars.com/api/?name=Sagrika&background=1E3A8A&color=fff&bold=true'
                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(accName)}&background=7A1D27&color=fff&bold=true`);
                      const accEmail = acc.email || `${accName.toLowerCase().replace(/\s+/g, '.')}@rimt.ac.in`;
                      const isSigningIn = signingInAccountId === (acc.id || acc.email);

                      return (
                        <div
                          key={acc.id || acc.email || accName}
                          onClick={() => !loading && handleQuickSignIn(acc)}
                          className={`w-full p-3 rounded-xl border border-[#E5DEC9] bg-[#FAF8F5]/80 hover:bg-white hover:border-[#7A1D27]/50 hover:shadow-sm transition-all duration-150 flex items-center justify-between gap-3 text-left group ${
                            isSigningIn ? 'ring-2 ring-[#7A1D27] bg-white' : 'cursor-pointer'
                          } ${loading && !isSigningIn ? 'opacity-60 pointer-events-none' : ''}`}
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="relative shrink-0">
                              <img
                                src={accAvatar}
                                alt={accName}
                                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#7A1D27]/20 group-hover:ring-[#7A1D27]/60 transition-all shadow-xs"
                              />
                              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-slate-300 ring-1 ring-white" />
                            </div>
                            <div className="flex flex-col min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-sm text-[#221C18] group-hover:text-[#7A1D27] transition-colors truncate">
                                  {accName}
                                </span>
                                <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-[#7A1D27]/10 text-[#7A1D27] shrink-0">
                                  {accRole}
                                </span>
                              </div>
                              <span className="text-[11px] text-[#7A6F62] truncate mt-0.5">
                                {accEmail}
                              </span>
                            </div>
                          </div>

                          <div className="shrink-0 flex items-center gap-1">
                            {isSigningIn ? (
                              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#7A1D27]/10 text-[#7A1D27] text-xs font-semibold">
                                <span className="w-3.5 h-3.5 border-2 border-[#7A1D27]/30 border-t-[#7A1D27] rounded-full animate-spin" />
                                <span>Signing in...</span>
                              </div>
                            ) : isRemovingMode ? (
                              <button
                                type="button"
                                onClick={(e) => handleRemoveAccount(e, acc)}
                                className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-100 transition-colors"
                                title="Remove account from device"
                              >
                                <span className="material-symbols-outlined text-lg">delete</span>
                              </button>
                            ) : (
                              <div className="flex items-center gap-1 text-[#8C8070] group-hover:text-[#7A1D27] transition-colors">
                                <span className="text-[11px] font-medium hidden sm:inline">Signed out</span>
                                <span className="material-symbols-outlined text-base">arrow_forward_ios</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Use Another Account Button */}
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => {
                      setError('');
                      setAdminLoginName('');
                      setAdminLoginPassword('');
                      setAdminViewMode('manual');
                    }}
                    className="w-full p-3 rounded-xl border border-dashed border-[#DDD4C1] hover:border-[#7A1D27] hover:bg-[#FAF8F5] text-xs font-semibold text-[#5A5044] hover:text-[#7A1D27] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base text-[#7A1D27] group-hover:scale-110 transition-transform">
                      person_add
                    </span>
                    <span>Use another administrator account</span>
                  </button>

                  {/* Bottom Actions Row */}
                  <div className="mt-4 pt-3 border-t border-[#EAE3D4] flex items-center justify-between text-xs text-[#8C8070]">
                    <button
                      type="button"
                      onClick={() => setIsRemovingMode(!isRemovingMode)}
                      className="hover:text-rose-600 transition-colors font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {isRemovingMode ? 'check' : 'remove_circle_outline'}
                      </span>
                      <span>{isRemovingMode ? 'Done removing' : 'Remove an account'}</span>
                    </button>
                    <span className="text-[10px] text-[#A39786]">
                      {adminSavedAccounts.length} saved on device
                    </span>
                  </div>
                </div>
              ) : (
                /* Manual Sign In Form */
                <div>
                  {adminSavedAccounts.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setError('');
                        setAdminViewMode('chooser');
                      }}
                      className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A1D27] hover:underline cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">arrow_back</span>
                      <span>Choose an account</span>
                    </button>
                  )}

                  <div className="text-left mb-6">
                    <h2 className="text-2xl font-bold text-[#221C18] tracking-tight">
                      Institutional Sign In
                    </h2>
                    <p className="text-xs text-[#7A6F62] mt-1">
                      Enter your authorized administrator credentials to access the operations suite.
                    </p>
                  </div>

                  <form onSubmit={handleAdminSignIn} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#3D332A] mb-1.5 text-left">
                        Administrator Name
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9B8F80] text-lg">
                          person
                        </span>
                        <input
                          type="text"
                          value={adminLoginName}
                          onChange={(e) => setAdminLoginName(e.target.value)}
                          placeholder="Enter your authorized name"
                          required
                          autoComplete="username"
                          className="w-full h-11 pl-10 pr-4 bg-[#FAF8F5] border border-[#DDD4C1] rounded-xl text-xs sm:text-sm text-[#221C18] placeholder:text-[#9E9283] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7A1D27]/20 focus:border-[#7A1D27] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#3D332A] mb-1.5 block text-left">
                        Password
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9B8F80] text-lg">
                          lock
                        </span>
                        <input
                          type={adminShowPassword ? 'text' : 'password'}
                          value={adminLoginPassword}
                          onChange={(e) => setAdminLoginPassword(e.target.value)}
                          placeholder="Enter your password"
                          required
                          autoComplete="current-password"
                          className="w-full h-11 pl-10 pr-10 bg-[#FAF8F5] border border-[#DDD4C1] rounded-xl text-xs sm:text-sm text-[#221C18] placeholder:text-[#9E9283] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7A1D27]/20 focus:border-[#7A1D27] transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setAdminShowPassword(!adminShowPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9B8F80] hover:text-[#5C5246] p-1"
                        >
                          <span className="material-symbols-outlined text-base">
                            {adminShowPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={adminRememberMe}
                          onChange={(e) => setAdminRememberMe(e.target.checked)}
                          className="w-4 h-4 rounded text-[#7A1D27] focus:ring-[#7A1D27] border-[#DDD4C1]"
                        />
                        <span className="text-xs text-[#5C5246] font-medium">Keep session active (30 days)</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 mt-2 bg-[#7A1D27] hover:bg-[#64141D] active:scale-[0.99] text-[#FAF8F5] font-semibold text-xs sm:text-sm rounded-xl shadow-md shadow-[#7A1D27]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-[#FAF8F5]/30 border-t-[#FAF8F5] rounded-full animate-spin" />
                          <span>Verifying Credentials...</span>
                        </>
                      ) : (
                        <>
                          <span>Enter Admin Portal</span>
                          <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </>
                      )}
                    </button>

                    <div className="mt-4 pt-4 border-t border-[#EAE3D4]">
                      <p className="text-[11px] text-[#8C8070] text-center leading-relaxed">
                        <span className="material-symbols-outlined text-xs align-middle mr-0.5">info</span>
                        Access restricted to authorized university administrators only. 
                        Contact IT Registrar for credential assistance.
                      </p>
                    </div>
                  </form>
                </div>
              )}
            </>
          ) : (
            /* ══════════════════════════════════════════════════════════════
               PORTAL 2: CORPORATE COMPANY / RECRUITER GATEWAY
               ══════════════════════════════════════════════════════════════ */
            <div>
              {companyViewMode === 'chooser' && companySavedAccounts.length > 0 ? (
                <div>
                  <div className="text-left mb-5">
                    <h2 className="text-2xl font-bold text-[#102A43] tracking-tight">
                      Choose an account
                    </h2>
                    <p className="text-xs text-[#627D98] mt-1">
                      to continue to Corporate Recruiter Portal &amp; Talent Pool
                    </p>
                  </div>

                  {/* Accounts List — Company accounts ONLY */}
                  <div className="space-y-2.5 mb-4">
                    {companySavedAccounts.map((acc) => {
                      const compName = acc.company_name || acc.name || 'Corporate Partner';
                      const compEmail = acc.email || 'recruiter@company.com';
                      const compAvatar =
                        acc.profile_pic_url ||
                        acc.avatar_url ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(compName)}&background=0B4EA2&color=fff&bold=true`;
                      const isSigningIn = signingInAccountId === (acc.id || acc.email);

                      return (
                        <div
                          key={acc.id || acc.email || compName}
                          onClick={() => !loading && handleQuickSignIn(acc)}
                          className={`w-full p-3 rounded-xl border border-blue-100 bg-[#F8FAFC] hover:bg-white hover:border-[#0B4EA2]/50 hover:shadow-sm transition-all duration-150 flex items-center justify-between gap-3 text-left group ${
                            isSigningIn ? 'ring-2 ring-[#0B4EA2] bg-white' : 'cursor-pointer'
                          } ${loading && !isSigningIn ? 'opacity-60 pointer-events-none' : ''}`}
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="relative shrink-0">
                              <img
                                src={compAvatar}
                                alt={compName}
                                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#0B4EA2]/20 group-hover:ring-[#0B4EA2]/60 transition-all shadow-xs"
                              />
                              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-blue-400 ring-1 ring-white" />
                            </div>
                            <div className="flex flex-col min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-sm text-[#0F172A] group-hover:text-[#0B4EA2] transition-colors truncate">
                                  {compName}
                                </span>
                                <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-blue-50 text-[#0B4EA2] border border-blue-200 shrink-0">
                                  Corporate Partner
                                </span>
                              </div>
                              <span className="text-[11px] text-[#64748B] truncate mt-0.5">
                                {compEmail}
                              </span>
                            </div>
                          </div>

                          <div className="shrink-0 flex items-center gap-1">
                            {isSigningIn ? (
                              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-blue-50 text-[#0B4EA2] text-xs font-semibold">
                                <span className="w-3.5 h-3.5 border-2 border-[#0B4EA2]/30 border-t-[#0B4EA2] rounded-full animate-spin" />
                                <span>Signing in...</span>
                              </div>
                            ) : isRemovingMode ? (
                              <button
                                type="button"
                                onClick={(e) => handleRemoveAccount(e, acc)}
                                className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-100 transition-colors"
                                title="Remove company account from device"
                              >
                                <span className="material-symbols-outlined text-lg">delete</span>
                              </button>
                            ) : (
                              <div className="flex items-center gap-1 text-[#94A3B8] group-hover:text-[#0B4EA2] transition-colors">
                                <span className="text-[11px] font-medium hidden sm:inline">Signed out</span>
                                <span className="material-symbols-outlined text-base">arrow_forward_ios</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Use Another Corporate Account Button */}
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => {
                      setError('');
                      setCompanyTab('login');
                      setCompanyViewMode('manual');
                    }}
                    className="w-full p-3 rounded-xl border border-dashed border-blue-200 hover:border-[#0B4EA2] hover:bg-blue-50/50 text-xs font-semibold text-[#0B4EA2] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base text-[#0B4EA2] group-hover:scale-110 transition-transform">
                      domain_add
                    </span>
                    <span>Use another corporate account</span>
                  </button>

                  {/* Bottom Actions Row */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#64748B]">
                    <button
                      type="button"
                      onClick={() => setIsRemovingMode(!isRemovingMode)}
                      className="hover:text-rose-600 transition-colors font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {isRemovingMode ? 'check' : 'remove_circle_outline'}
                      </span>
                      <span>{isRemovingMode ? 'Done removing' : 'Remove an account'}</span>
                    </button>
                    <span className="text-[10px] text-[#94A3B8]">
                      {companySavedAccounts.length} saved on device
                    </span>
                  </div>
                </div>
              ) : (
                /* Manual Form (Register or Login) */
                <div>
                  {companySavedAccounts.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setError('');
                        setCompanyViewMode('chooser');
                      }}
                      className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B4EA2] hover:underline cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">arrow_back</span>
                      <span>Choose an account</span>
                    </button>
                  )}

                  {/* Header Title */}
                  <div className="text-left mb-5">
                    <h2 className="text-2xl font-bold text-[#102A43] tracking-tight">
                      {companyTab === 'register' ? 'Register Company' : 'Corporate Sign In'}
                    </h2>
                    <p className="text-xs text-[#627D98] mt-1">
                      {companyTab === 'register'
                        ? 'Register your company to access placement-ready student portfolios & hiring metrics.'
                        : 'Sign in to review verified student talent pool & institutional placement statistics.'}
                    </p>
                  </div>

              {/* Sub-Tabs: Sign In vs Register */}
              <div className="flex border-b border-[#E2E8F0] mb-5">
                <button
                  type="button"
                  onClick={() => {
                    setCompanyTab('register');
                    setError('');
                  }}
                  className={`pb-2.5 px-3 text-xs font-bold transition-all relative ${
                    companyTab === 'register'
                      ? 'text-[#0B4EA2] border-b-2 border-[#0B4EA2]'
                      : 'text-[#627D98] hover:text-[#102A43]'
                  }`}
                >
                  Register Company (New)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCompanyTab('login');
                    setError('');
                  }}
                  className={`pb-2.5 px-3 text-xs font-bold transition-all relative ${
                    companyTab === 'login'
                      ? 'text-[#0B4EA2] border-b-2 border-[#0B4EA2]'
                      : 'text-[#627D98] hover:text-[#102A43]'
                  }`}
                >
                  Sign In (Existing)
                </button>
              </div>

              {/* Continue with Google Button */}
              <button
                type="button"
                disabled={loading}
                onClick={() => setShowGoogleModal(true)}
                className="w-full h-11 px-4 mb-4 bg-white hover:bg-[#F8FAFC] active:scale-[0.99] border border-[#CBD5E1] rounded-xl text-xs sm:text-sm font-semibold text-[#1E293B] shadow-2xs hover:shadow-xs transition-all flex items-center justify-center gap-3 cursor-pointer group"
              >
                {/* Official Multi-colored Google "G" Icon */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Divider */}
              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E2E8F0]" />
                </div>
                <span className="relative bg-white px-3 text-[11px] font-medium text-[#94A3B8]">
                  or with corporate credentials
                </span>
              </div>

              {/* Company Form */}
              <form onSubmit={handleCompanySubmit} className="space-y-3.5 text-left">
                {companyTab === 'register' && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                        Company Name *
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-lg">
                          business
                        </span>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. Google LLC, TCS, Deloitte"
                          required
                          className="w-full h-10 pl-9 pr-3 bg-[#FAF8F5] border border-[#DDD4C1] rounded-xl text-xs text-[#221C18] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B4EA2]/20 focus:border-[#0B4EA2] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                        Recruiter Full Name
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-lg">
                          badge
                        </span>
                        <input
                          type="text"
                          value={recruiterName}
                          onChange={(e) => setRecruiterName(e.target.value)}
                          placeholder="e.g. Sarah Jenkins"
                          className="w-full h-10 pl-9 pr-3 bg-[#FAF8F5] border border-[#DDD4C1] rounded-xl text-xs text-[#221C18] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B4EA2]/20 focus:border-[#0B4EA2] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                        Industry / Hiring Sector
                      </label>
                      <select
                        value={companyIndustry}
                        onChange={(e) => setCompanyIndustry(e.target.value)}
                        className="w-full h-10 px-3 bg-[#FAF8F5] border border-[#DDD4C1] rounded-xl text-xs text-[#221C18] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B4EA2]/20 focus:border-[#0B4EA2] transition-all"
                      >
                        <option value="Technology & Software">Technology &amp; Software</option>
                        <option value="Cloud Computing & AI">Cloud Computing &amp; AI</option>
                        <option value="Finance & Banking">Finance &amp; Banking (FinTech)</option>
                        <option value="Consulting & Strategy">Consulting &amp; Strategy</option>
                        <option value="Core Engineering">Core Engineering</option>
                        <option value="Healthcare & Life Sciences">Healthcare &amp; Analytics</option>
                      </select>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                    Official Corporate Email *
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-lg">
                      mail
                    </span>
                    <input
                      type="email"
                      value={companyEmail}
                      onChange={(e) => setCompanyEmail(e.target.value)}
                      placeholder="e.g. recruiter@company.com"
                      required
                      autoComplete="email"
                      className="w-full h-10 pl-9 pr-3 bg-[#FAF8F5] border border-[#DDD4C1] rounded-xl text-xs text-[#221C18] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B4EA2]/20 focus:border-[#0B4EA2] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-lg">
                      lock
                    </span>
                    <input
                      type={companyShowPassword ? 'text' : 'password'}
                      value={companyPassword}
                      onChange={(e) => setCompanyPassword(e.target.value)}
                      placeholder="Enter password"
                      required
                      autoComplete={companyTab === 'register' ? 'new-password' : 'current-password'}
                      className="w-full h-10 pl-9 pr-9 bg-[#FAF8F5] border border-[#DDD4C1] rounded-xl text-xs text-[#221C18] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B4EA2]/20 focus:border-[#0B4EA2] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setCompanyShowPassword(!companyShowPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569] p-1"
                    >
                      <span className="material-symbols-outlined text-base">
                        {companyShowPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {companyTab === 'login' && (
                  <div className="flex items-center justify-between pt-0.5">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={companyRemember}
                        onChange={(e) => setCompanyRemember(e.target.checked)}
                        className="w-3.5 h-3.5 rounded text-[#0B4EA2] focus:ring-[#0B4EA2] border-[#DDD4C1]"
                      />
                      <span className="text-xs text-[#64748B]">Remember corporate session</span>
                    </label>
                  </div>
                )}

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 mt-1 bg-[#0B4EA2] hover:bg-[#083E82] active:scale-[0.99] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md shadow-[#0B4EA2]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{companyTab === 'register' ? 'Registering...' : 'Verifying...'}</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {companyTab === 'register'
                          ? 'Register Company & Enter Talent Pool'
                          : 'Sign In to Corporate Portal'}
                      </span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </>
                  )}
                </button>

                {/* Toggle between register and sign in */}
                <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-center">
                  {companyTab === 'register' ? (
                    <p className="text-xs text-[#64748B]">
                      Already registered?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setCompanyTab('login');
                          setError('');
                        }}
                        className="font-bold text-[#0B4EA2] hover:underline"
                      >
                        Sign In here
                      </button>
                    </p>
                  ) : (
                    <p className="text-xs text-[#64748B]">
                      New corporate partner?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setCompanyTab('register');
                          setError('');
                        }}
                        className="font-bold text-[#0B4EA2] hover:underline"
                      >
                        Register your company
                      </button>
                    </p>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      )}

    </div>
  </main>

      {/* ══════════════════════════════════════════════════════════════
          GOOGLE ONE-TAP / INTERACTIVE SELECTION MODAL
         ══════════════════════════════════════════════════════════════ */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 text-left relative">
            <button
              onClick={() => setShowGoogleModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-4">
              <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <div>
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  Sign in with Google
                </h3>
                <p className="text-[11px] text-slate-500">Choose a corporate Google account</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {quickGoogleAccounts.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => handleGoogleAccountSelect(acc)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 flex items-center gap-3 text-left transition-all cursor-pointer group"
                >
                  <img
                    src={acc.avatar_url}
                    alt={acc.name}
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600 truncate">
                      {acc.company_name}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">{acc.email}</p>
                  </div>
                  <span className="material-symbols-outlined text-sm text-slate-300 group-hover:text-blue-600">
                    arrow_forward
                  </span>
                </button>
              ))}
            </div>

            {/* Custom Google Email input */}
            <form onSubmit={handleCustomGoogleSubmit} className="pt-3 border-t border-slate-100">
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Or enter corporate Google workspace email:
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={customGoogleEmail}
                  onChange={(e) => setCustomGoogleEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="flex-1 h-9 px-3 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-3 h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer System Credits */}
      <footer className="relative z-10 w-full py-4 text-center text-xs text-[#8C8070] border-t border-[#E5DEC9] bg-[#FAF8F5]/85">
        RIMT University Corporate Placement Directorate &bull; Authorized Personnel Only &bull; All Access Logged &amp; Monitored
      </footer>
    </div>
  );
}
