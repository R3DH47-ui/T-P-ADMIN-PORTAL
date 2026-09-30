'use client';

import React, { useState } from 'react';
import { adminLogin } from '@/lib/authApi';

export default function AuthScreen({ onAuthenticated }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Sign In Form State
  const [loginName, setLoginName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (e) => {
    e?.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!loginName.trim() || !loginPassword) {
      setError('Please provide your administrator name and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await adminLogin({
        name: loginName.trim(),
        password: loginPassword,
        remember_me: rememberMe,
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

  return (
    <div className="min-h-screen w-full bg-[#F7F4EE] text-[#221C18] flex flex-col justify-between relative overflow-hidden select-none font-sans">
      {/* Background Ambient Desert Glow & Subtle Natural Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_50%_-10%,rgba(217,185,142,0.35),rgba(247,244,238,0))] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #7A5B35 1px, transparent 0)',
          backgroundSize: '28px 28px'
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
            <p className="text-[11px] text-[#7A6F62]">Institutional Training, Operations &amp; Placement Directorate</p>
          </div>
        </div>

        {/* Institutional Verification Status */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFE9DC] border border-[#DDD4C1] text-[#5A5044] text-xs font-medium shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Official Portal &bull; ISO 27001 TLS 1.3</span>
        </div>
      </header>

      {/* Main Form Center Stage */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 text-[#221C18] shadow-[0_16px_40px_-12px_rgba(70,55,40,0.08),0_1px_3px_rgba(0,0,0,0.04)] border border-[#E5DEC9] relative transition-all">
          
          {/* Card Top Pill Badge */}
          <div className="flex justify-between items-center mb-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8F4EC] border border-[#E7DFCD] text-[#7A1D27] text-xs font-semibold">
              <span className="material-symbols-outlined text-sm">shield_person</span>
              Administrative Access Gateway
            </div>
            <span className="text-[11px] text-[#8C8070] font-mono font-medium">Authorized Only</span>
          </div>

          <div className="text-left mb-6">
            <h2 className="text-2xl font-bold text-[#221C18] tracking-tight">
              Institutional Sign In
            </h2>
            <p className="text-xs text-[#7A6F62] mt-1">
              Enter your authorized administrator credentials to access the operations suite.
            </p>
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

          {/* SIGN IN FORM */}
          <form onSubmit={handleSignIn} className="space-y-4">
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
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
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
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="w-full h-11 pl-10 pr-10 bg-[#FAF8F5] border border-[#DDD4C1] rounded-xl text-xs sm:text-sm text-[#221C18] placeholder:text-[#9E9283] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7A1D27]/20 focus:border-[#7A1D27] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9B8F80] hover:text-[#5C5246] p-1"
                >
                  <span className="material-symbols-outlined text-base">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#7A1D27] focus:ring-[#7A1D27] border-[#DDD4C1]"
                />
                <span className="text-xs text-[#5C5246] font-medium">Keep session active (30 days)</span>
              </label>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 mt-2 bg-[#7A1D27] hover:bg-[#64141D] active:scale-[0.99] text-[#FAF8F5] font-semibold text-xs sm:text-sm rounded-xl shadow-md shadow-[#7A1D27]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
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

            {/* Access Notice */}
            <div className="mt-4 pt-4 border-t border-[#EAE3D4]">
              <p className="text-[11px] text-[#8C8070] text-center leading-relaxed">
                <span className="material-symbols-outlined text-xs align-middle mr-0.5">info</span>
                Access restricted to authorized university administrators only. 
                Contact IT Registrar for credential assistance.
              </p>
            </div>
          </form>

        </div>
      </main>

      {/* Footer System Credits */}
      <footer className="relative z-10 w-full py-4 text-center text-xs text-[#8C8070] border-t border-[#E5DEC9] bg-[#FAF8F5]/85">
        RIMT University Corporate Placement Directorate &bull; Authorized Personnel Only &bull; All Access Logged &amp; Monitored
      </footer>
    </div>
  );
}
