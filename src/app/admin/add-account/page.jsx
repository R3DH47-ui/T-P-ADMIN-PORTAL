'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogin, adminSignup, getSavedAccounts, saveAccountSession } from '@/lib/authApi';

export default function AddAccountPage() {
  const router = useRouter();
  const [mode, setMode] = useState('login'); // 'login' | 'register'

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerRole, setRegisterRole] = useState('ADMIN');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Existing saved accounts for quick switch
  const [savedAccounts, setSavedAccounts] = useState([]);

  useEffect(() => {
    setSavedAccounts(getSavedAccounts());
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (!loginIdentifier || !loginPassword) {
        throw new Error('Please enter administrator name/email and password.');
      }

      const res = await adminLogin({
        name: loginIdentifier.trim(),
        password: loginPassword,
        remember_me: true,
      });

      setSuccessMsg(`Authenticated as ${res.admin.full_name}! Redirecting...`);

      // Mark that splash should show for this fresh login
      try { sessionStorage.setItem('rimt_show_splash_for_add', 'true'); } catch {}

      setTimeout(() => {
        router.push('/');
      }, 800);
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (!registerName.trim()) {
        throw new Error('Please enter administrator full name.');
      }
      if (!registerEmail.trim()) {
        throw new Error('Please enter institutional email address.');
      }
      if (!registerPassword) {
        throw new Error('Please create a password.');
      }
      if (registerPassword.length < 6) {
        throw new Error('Password must be at least 6 characters long.');
      }
      if (registerPassword !== registerConfirmPassword) {
        throw new Error('Passwords do not match. Please confirm your password.');
      }

      const res = await adminSignup({
        name: registerName.trim(),
        email: registerEmail.trim(),
        password: registerPassword,
        role: registerRole,
      });

      setSuccessMsg(`Administrator ${res.admin.full_name} registered successfully! Redirecting...`);

      // Mark that splash should show for this fresh signup
      try { sessionStorage.setItem('rimt_show_splash_for_add', 'true'); } catch {}

      setTimeout(() => {
        router.push('/');
      }, 800);
    } catch (err) {
      setError(err.message || 'Failed to register administrator.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSwitch = (acc) => {
    try {
      localStorage.setItem('rimt_admin_token', acc.token);
      localStorage.setItem('rimt_admin_user', JSON.stringify(acc));
    } catch {}
    router.push('/');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#FAF7F2] via-[#F5ECE1]/60 to-[#EDE3D4] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden select-none">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes addAccountSlideUp {
          0% { opacity: 0; transform: translateY(24px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes addAccountSweep {
          0% { transform: translateX(-160%) skewX(-20deg); opacity: 0; }
          20% { opacity: 0.55; }
          80% { opacity: 0.55; }
          100% { transform: translateX(260%) skewX(-20deg); opacity: 0; }
        }
        .add-account-slide-up {
          animation: addAccountSlideUp 0.6s cubic-bezier(0.34, 1.25, 0.64, 1) forwards;
        }
        .add-account-sweep {
          animation: addAccountSweep 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}} />

      {/* Ambient Glows */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-rose-500/10 via-primary/8 to-amber-400/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-blue-500/8 blur-3xl pointer-events-none" />

      {/* Main Card Container */}
      <div className="relative z-10 w-full max-w-xl add-account-slide-up">
        {/* RIMT Logo Top */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-16 h-16 rounded-2xl bg-white p-2.5 flex items-center justify-center border border-[#E7D6C4] shadow-[0_12px_36px_rgba(107,0,24,0.15)] overflow-hidden mb-3">
            <img
              alt="RIMT University Logo"
              className="max-h-full max-w-full object-contain relative z-10"
              style={{ filter: 'saturate(1.8) contrast(1.2) brightness(1.04)' }}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC19AQmgWL-gUir-ndxuF4jup3xrY5qBj64LUXlgD9RJE6IRXQl7Uw9pQ_cKLppluBw_ZpAaGrjzn9MM_33NeGwHee4byWlTWDl3k3ZH1ODJBySdYc1fAI_vX56Ks6Y_9rsUeDdfxgzgIKrwrKJRiXXd43-8bqVix0hb9h_KVy-x333S8_1qgi_MEC7mirEEZdIdmjQrVxbxQLOkTdB8x3YlxqRC5q1PzKVSKVWY-4rZfKHynQQWu8oLw4z4yUS8WIugw"
            />
            <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-2xl">
              <div className="w-[60%] h-[250%] bg-gradient-to-r from-transparent via-white/90 to-transparent add-account-sweep pointer-events-none" />
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#2D2420] tracking-tight text-center">
            Add Another Account
          </h1>
          <p className="text-xs sm:text-sm text-[#6B5E54] mt-1 text-center max-w-sm">
            Sign in to an existing administrator account or register a new one on this device
          </p>
        </div>

        {/* White Card */}
        <div className="bg-white rounded-3xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.12)] border border-white/80 overflow-hidden">
          {/* Black Header Strip with Sweep */}
          <div className="relative overflow-hidden bg-gradient-to-r from-[#14141E] via-[#1E1E2C] to-[#14141E] px-6 py-4 border-b border-white/10">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="w-1/2 h-[220%] bg-gradient-to-r from-transparent via-white/10 to-transparent add-account-sweep pointer-events-none" />
            </div>
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

            {/* Tab Toggle */}
            <div className="relative z-10 flex items-center gap-2">
              <button
                type="button"
                onClick={() => { setMode('login'); setError(null); setSuccessMsg(null); }}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  mode === 'login'
                    ? 'bg-white/15 text-white border border-white/20 shadow-sm backdrop-blur-sm'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                <span className="material-symbols-outlined text-base">login</span>
                <span>Sign In</span>
              </button>
              <button
                type="button"
                onClick={() => { setMode('register'); setError(null); setSuccessMsg(null); }}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  mode === 'register'
                    ? 'bg-white/15 text-white border border-white/20 shadow-sm backdrop-blur-sm'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                <span className="material-symbols-outlined text-base">app_registration</span>
                <span>Register New Admin</span>
              </button>
            </div>
          </div>

          {/* Form Body */}
          <div className="p-6 sm:p-8">
            {/* Error Alert */}
            {error && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-rose-600 text-base shrink-0 mt-0.5">error</span>
                <span className="leading-relaxed">{error}</span>
              </div>
            )}

            {/* Success Alert */}
            {successMsg && (
              <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-emerald-600 text-base shrink-0 mt-0.5">check_circle</span>
                <span className="font-bold leading-relaxed">{successMsg}</span>
              </div>
            )}

            {mode === 'login' ? (
              /* ── Sign In Form ── */
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Administrator Name or Email
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                      person
                    </span>
                    <input
                      type="text"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="e.g. Sagrika, Raj Kumar, or dean.tp.rimt@gmail.com"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-xs transition-all bg-slate-50/50 hover:bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Security Password
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                      lock
                    </span>
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-11 pr-11 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-xs transition-all bg-slate-50/50 hover:bg-white"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {showLoginPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => router.push('/')}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 transition-all"
                  >
                    ← Back to Dashboard
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 rounded-xl text-white text-sm font-bold hover:shadow-xl transition-all disabled:opacity-50 flex items-center gap-2.5 active:scale-[0.98]"
                    style={{
                      background: 'linear-gradient(135deg, #8B1D2C 0%, #6B0018 100%)',
                      boxShadow: '0 6px 20px rgba(107, 0, 24, 0.35)',
                    }}
                  >
                    {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                    <span className="material-symbols-outlined text-base">login</span>
                    <span>Sign In & Add Account</span>
                  </button>
                </div>
              </form>
            ) : (
              /* ── Register New Admin Form ── */
              <form onSubmit={handleRegisterSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                      badge
                    </span>
                    <input
                      type="text"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      placeholder="e.g. Dr. Harpreet Singh"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-xs transition-all bg-slate-50/50 hover:bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Institutional Email Address
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                      mail
                    </span>
                    <input
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="e.g. harpreet.singh@rimt.ac.in"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-xs transition-all bg-slate-50/50 hover:bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Administrative Designation
                  </label>
                  <select
                    value={registerRole}
                    onChange={(e) => setRegisterRole(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-xs bg-slate-50/50 hover:bg-white transition-all"
                  >
                    <option value="ADMIN">Academic Administrator / HOD</option>
                    <option value="SUPER_ADMIN">University Dean / Director</option>
                    <option value="PLACEMENT_OFFICER">Training &amp; Placement Officer</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Create Password
                    </label>
                    <div className="relative">
                      <input
                        type={showRegisterPassword ? 'text' : 'password'}
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        placeholder="Min 6 characters"
                        className="w-full px-4 pr-10 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-xs transition-all bg-slate-50/50 hover:bg-white"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        <span className="material-symbols-outlined text-base">
                          {showRegisterPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={registerConfirmPassword}
                        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
                        className="w-full px-4 pr-10 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-xs transition-all bg-slate-50/50 hover:bg-white"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        <span className="material-symbols-outlined text-base">
                          {showConfirmPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Password Strength Hint */}
                {registerPassword && (
                  <div className="flex items-center gap-2 text-[11px]">
                    <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          registerPassword.length >= 10
                            ? 'w-full bg-emerald-500'
                            : registerPassword.length >= 6
                            ? 'w-2/3 bg-amber-500'
                            : 'w-1/3 bg-rose-500'
                        }`}
                      />
                    </div>
                    <span className={`font-bold ${
                      registerPassword.length >= 10
                        ? 'text-emerald-600'
                        : registerPassword.length >= 6
                        ? 'text-amber-600'
                        : 'text-rose-600'
                    }`}>
                      {registerPassword.length >= 10 ? 'Strong' : registerPassword.length >= 6 ? 'Good' : 'Weak'}
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-3 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => router.push('/')}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 transition-all"
                  >
                    ← Back to Dashboard
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 rounded-xl text-white text-sm font-bold hover:shadow-xl transition-all disabled:opacity-50 flex items-center gap-2.5 active:scale-[0.98]"
                    style={{
                      background: 'linear-gradient(135deg, #8B1D2C 0%, #6B0018 100%)',
                      boxShadow: '0 6px 20px rgba(107, 0, 24, 0.35)',
                    }}
                  >
                    {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                    <span className="material-symbols-outlined text-base">app_registration</span>
                    <span>Register & Add Account</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* ── Gmail-style Saved Accounts List ── */}
        {savedAccounts.length > 0 && (
          <div className="mt-5 bg-white rounded-2xl shadow-[0_8px_30px_-6px_rgba(0,0,0,0.08)] border border-white/80 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-primary">group</span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Accounts on this Device ({savedAccounts.length})
              </span>
            </div>
            <div className="divide-y divide-slate-50">
              {savedAccounts.map((acc) => {
                const accName = acc.full_name || acc.name || 'Admin';
                const accAvatar = acc.profile_pic_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(accName)}&background=7A1D27&color=fff&bold=true`;
                const accEmail = acc.email || `${accName.toLowerCase().replace(/\s+/g, '.')}@rimt.ac.in`;
                const isCurrentActive = (() => {
                  try {
                    const curr = localStorage.getItem('rimt_admin_user');
                    if (curr) {
                      const parsed = JSON.parse(curr);
                      return parsed.id === acc.id || (parsed.email || '').toLowerCase() === (acc.email || '').toLowerCase();
                    }
                  } catch {}
                  return false;
                })();

                return (
                  <button
                    key={acc.id || acc.email}
                    onClick={() => handleQuickSwitch(acc)}
                    className={`w-full px-5 py-3 flex items-center gap-3 text-left transition-all group/acc ${
                      isCurrentActive
                        ? 'bg-emerald-50/50 hover:bg-emerald-50'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <img
                      src={accAvatar}
                      alt={accName}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-xs shrink-0"
                    />
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-sm font-bold text-slate-800 group-hover/acc:text-primary transition-colors truncate">
                        {accName}
                      </span>
                      <span className="text-xs text-slate-500 truncate">
                        {accEmail}
                      </span>
                    </div>
                    {isCurrentActive ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold border border-emerald-200 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    ) : (
                      <span className="material-symbols-outlined text-sm text-slate-300 group-hover/acc:text-primary transition-colors shrink-0">
                        arrow_forward_ios
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-[11px] text-[#9B8E82]">
            RIMT University • Training &amp; Placement Portal
          </p>
          <p className="text-[10px] text-[#B5A99D] mt-0.5">
            Multi-administrator session management — secured with JWT authentication
          </p>
        </div>
      </div>
    </div>
  );
}
