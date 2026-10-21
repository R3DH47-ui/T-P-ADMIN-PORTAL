'use client';

import React, { useState } from 'react';
import { adminLogin, adminSignup } from '@/lib/authApi';

export default function AddAccountModal({ isOpen, onClose, onAccountAdded }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  
  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerRole, setRegisterRole] = useState('ADMIN');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);
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

      setSuccessMsg(`Authenticated as ${res.admin.full_name}! Switching account...`);
      setTimeout(() => {
        if (onAccountAdded) onAccountAdded(res.admin, res.token);
        onClose();
      }, 700);
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!registerName.trim()) {
        throw new Error('Please enter administrator full name.');
      }
      if (!registerPassword) {
        throw new Error('Please enter a password.');
      }
      if (registerPassword.length < 6) {
        throw new Error('Password must be at least 6 characters long.');
      }
      if (registerPassword !== registerConfirmPassword) {
        throw new Error('Passwords do not match.');
      }

      const res = await adminSignup({
        name: registerName.trim(),
        email: registerEmail.trim() || undefined,
        password: registerPassword,
        role: registerRole,
      });

      setSuccessMsg(`Administrator ${res.admin.full_name} registered and verified! Switching account...`);
      setTimeout(() => {
        if (onAccountAdded) onAccountAdded(res.admin, res.token);
        onClose();
      }, 700);
    } catch (err) {
      setError(err.message || 'Failed to register administrator.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (name, pwd) => {
    setLoginIdentifier(name);
    setLoginPassword(pwd);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-white/80 overflow-hidden flex flex-col">
        {/* Header Bar */}
        <div className="p-6 bg-gradient-to-r from-[#14141E] via-[#1E1E2C] to-[#14141E] text-white flex items-center justify-between border-b border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 pointer-events-none" />
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-sm">
              <span className="material-symbols-outlined text-xl">person_add</span>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Add Another Administrator Account
              </h2>
              <p className="text-[11px] text-white/70">
                Sign in or register another administrative user on this device
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-colors relative z-10"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              mode === 'login'
                ? 'bg-white text-primary shadow-xs border border-rose-200/80'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-base">login</span>
            <span>Sign In to Existing Account</span>
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(null); }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              mode === 'register'
                ? 'bg-white text-primary shadow-xs border border-rose-200/80'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-base">app_registration</span>
            <span>Register New Admin</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
              <span className="material-symbols-outlined text-rose-600 text-base shrink-0">error</span>
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-base shrink-0">check_circle</span>
              <span className="font-bold">{successMsg}</span>
            </div>
          )}

          {mode === 'login' ? (
            /* ── Sign In to Existing Account Form ── */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Administrator Name or Email
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-base">
                    person
                  </span>
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="e.g. Sagrika, Raj Kumar, or dean.tp.rimt@gmail.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-2xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Security Password
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-base">
                    lock
                  </span>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-2xs"
                    required
                  />
                </div>
              </div>

              {/* Quick Select Preset Admin Accounts */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <p className="text-[11px] font-bold text-slate-600 mb-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-primary">badge</span>
                  Quick Switch Known Institutional Accounts:
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickFill('Sagrika', 'Admin@RIMT#2026')}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-[11px] font-semibold text-slate-800 transition-colors shadow-2xs flex items-center gap-1"
                  >
                    <span>Sagrika (Vice HOD)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('Raj Kumar', 'Admin@RIMT#2026')}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-[11px] font-semibold text-slate-800 transition-colors shadow-2xs flex items-center gap-1"
                  >
                    <span>Raj Kumar (HOD)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('Dean T&P Cell', 'Admin@RIMT#2026')}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-[11px] font-semibold text-slate-800 transition-colors shadow-2xs flex items-center gap-1"
                  >
                    <span>Dean T&amp;P Cell</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-container to-primary text-white text-xs font-bold hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {loading && <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                  <span>Sign In &amp; Add Account</span>
                </button>
              </div>
            </form>
          ) : (
            /* ── Register New Administrator Form ── */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-base">
                    badge
                  </span>
                  <input
                    type="text"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    placeholder="e.g. Dr. Harpreet Singh"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-2xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Institutional Email
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-base">
                    mail
                  </span>
                  <input
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    placeholder="e.g. harpreet.singh@rimt.ac.in"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Administrative Designation
                </label>
                <select
                  value={registerRole}
                  onChange={(e) => setRegisterRole(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-2xs bg-white"
                >
                  <option value="ADMIN">Academic Administrator / HOD</option>
                  <option value="SUPER_ADMIN">University Dean / Director</option>
                  <option value="PLACEMENT_OFFICER">Training &amp; Placement Officer</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-2xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-2xs"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-container to-primary text-white text-xs font-bold hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {loading && <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                  <span>Register &amp; Add Account</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
