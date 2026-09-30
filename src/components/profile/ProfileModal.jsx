'use client';

import React, { useState } from 'react';
import { updateAdminProfilePic, changeAdminPassword } from '@/lib/authApi';

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

export default function ProfileModal({ isOpen, onClose, admin, onAdminUpdated, onSignOut, defaultTab = 'profile' }) {
  const [activeTab, setActiveTab] = useState(defaultTab); // 'profile' | 'password'
  const [uploading, setUploading] = useState(false);
  const [changingPw, setChangingPw] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  if (!isOpen) return null;

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Only JPG, PNG, and WebP images are permitted.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be under 5MB.');
      return;
    }

    setError('');
    setSuccess('');
    setUploading(true);

    try {
      const res = await updateAdminProfilePic(file);
      setSuccess('Profile picture updated successfully!');
      if (onAdminUpdated) {
        onAdminUpdated(res.admin || { ...admin, profile_pic_url: res.profile_pic_url });
      }
    } catch (err) {
      setError(err.message || 'Failed to update photo.');
    } finally {
      setUploading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e?.preventDefault();
    setError('');
    setSuccess('');

    if (!currentPassword || !newPassword) {
      setError('Both current and new passwords are required.');
      return;
    }

    if (!PASSWORD_REGEX.test(newPassword)) {
      setError('New password must be at least 8 chars with 1 uppercase, 1 digit, and 1 special symbol.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match.');
      return;
    }

    setChangingPw(true);
    try {
      await changeAdminPassword({
        current_password: currentPassword,
        new_password: newPassword,
      });
      setSuccess('Master password changed successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      setError(err.message || 'Failed to change password.');
    } finally {
      setChangingPw(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#8B1D2C] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
            <h3 className="text-base font-bold tracking-wide">Administrator Account Settings</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 bg-slate-50/80 px-6 pt-3 gap-4">
          <button
            onClick={() => { setActiveTab('profile'); setError(''); setSuccess(''); }}
            className={`pb-3 text-xs font-bold transition-all relative flex items-center gap-1.5 ${
              activeTab === 'profile' ? 'text-[#8B1D2C]' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-base">person</span>
            Profile Information
            {activeTab === 'profile' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B1D2C]" />
            )}
          </button>
          <button
            onClick={() => { setActiveTab('password'); setError(''); setSuccess(''); }}
            className={`pb-3 text-xs font-bold transition-all relative flex items-center gap-1.5 ${
              activeTab === 'password' ? 'text-[#8B1D2C]' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-base">key</span>
            Change Password
            {activeTab === 'password' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B1D2C]" />
            )}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-base shrink-0">error</span>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-base shrink-0">check_circle</span>
              <span>{success}</span>
            </div>
          )}

          {/* TAB 1: PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-5">
              {/* Photo & Upload */}
              <div className="flex items-center gap-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                <div className="relative group shrink-0">
                  <div className="w-20 h-20 rounded-full border-2 border-[#8B1D2C]/40 p-0.5 overflow-hidden bg-white shadow-sm flex items-center justify-center">
                    {admin?.profile_pic_url ? (
                      <img
                        src={admin.profile_pic_url}
                        alt="Admin Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-4xl text-slate-300">
                        account_circle
                      </span>
                    )}
                  </div>
                  {uploading && (
                    <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
                      <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">
                    {admin?.full_name || 'Administrator'}
                  </h4>
                  <p className="text-xs text-slate-500 mb-2 truncate">
                    {admin?.email || (admin?.full_name ? `${admin.full_name.toLowerCase().replace(/\s+/g, '.')}@rimt.ac.in` : 'admin@rimt.ac.in')}
                  </p>

                  <label
                    htmlFor="modal-photo-upload"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer shadow-sm transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">photo_camera</span>
                    <span>Change Photo</span>
                  </label>
                  <input
                    id="modal-photo-upload"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handlePhotoUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Readonly Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Full Name
                  </span>
                  <span className="text-xs font-semibold text-slate-800 mt-0.5 block truncate">
                    {admin?.full_name || 'Administrator'}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Institutional Role
                  </span>
                  <span className="text-xs font-semibold text-[#8B1D2C] mt-0.5 block">
                    {admin?.full_name === 'Raj Kumar' ? 'HOD BCA (Administrator)' : admin?.full_name === 'Sagrika' ? 'Vice HOD BCA (Administrator)' : (admin?.role || 'ADMIN')}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 sm:col-span-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Institutional Email (Official)
                  </span>
                  <span className="text-xs font-semibold text-slate-800 mt-0.5 block truncate">
                    {admin?.email || (admin?.full_name ? `${admin.full_name.toLowerCase().replace(/\s+/g, '.')}@rimt.ac.in` : 'admin@rimt.ac.in')}
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => { setActiveTab('password'); setError(''); setSuccess(''); }}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">lock_reset</span>
                  Update Password
                </button>

                <button
                  type="button"
                  onClick={() => { onClose(); if (onSignOut) onSignOut(); }}
                  className="px-4 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">logout</span>
                  Sign Out
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: CHANGE PASSWORD */}
          {activeTab === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-3.5 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full h-10 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1D2C]/30 focus:border-[#8B1D2C] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  New Master Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 8 chars with uppercase, number & symbol"
                  required
                  className="w-full h-10 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1D2C]/30 focus:border-[#8B1D2C] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  required
                  className="w-full h-10 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1D2C]/30 focus:border-[#8B1D2C] transition-all"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setActiveTab('profile')}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={changingPw}
                  className="px-5 py-2 rounded-xl bg-[#8B1D2C] hover:bg-[#6E1521] text-white text-xs font-bold shadow-md shadow-[#8B1D2C]/20 transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  {changingPw ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <span>Save Password</span>
                      <span className="material-symbols-outlined text-sm">check</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
