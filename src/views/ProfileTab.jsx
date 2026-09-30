'use client';

import React, { useState } from 'react';
import { updateAdminProfilePic, changeAdminPassword } from '@/lib/authApi';

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

export default function ProfileTab({ admin, onAdminUpdated, onSignOut }) {
  const [uploading, setUploading] = useState(false);
  const [changingPw, setChangingPw] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Only JPG, PNG, and WebP images are permitted.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must not exceed 5MB.');
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
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!currentPassword || !newPassword) {
      setError('Please provide current and new passwords.');
      return;
    }

    if (!PASSWORD_REGEX.test(newPassword)) {
      setError('New password must have min 8 chars with 1 uppercase, 1 number, and 1 special symbol.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setChangingPw(true);
    try {
      await changeAdminPassword({
        current_password: currentPassword,
        new_password: newPassword,
      });
      setSuccess('Password changed successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordForm(false);
    } catch (err) {
      setError(err.message || 'Failed to change password.');
    } finally {
      setChangingPw(false);
    }
  };

  const fullName = admin?.full_name || 'Administrator';
  const role = admin?.full_name === 'Raj Kumar' 
    ? 'HOD BCA' 
    : admin?.full_name === 'Sagrika' 
    ? 'Vice HOD BCA' 
    : (admin?.role || 'ADMIN');
  const email = admin?.email || (admin?.full_name ? `${admin.full_name.toLowerCase().replace(/\s+/g, '.')}@rimt.ac.in` : 'admin@rimt.ac.in');
  const avatarUrl = admin?.profile_pic_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=7A1D27&color=fff&bold=true`;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border-subtle pb-5">
        <div>
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2.5">
            <span className="material-symbols-outlined text-primary text-2xl">manage_accounts</span>
            Administrator Profile &amp; Security
          </h2>
          <p className="text-xs text-text-secondary mt-1">
            Manage your administrative identity, official credentials, and security settings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Verified Officer
          </span>
          {onSignOut && (
            <button
              onClick={onSignOut}
              className="px-3.5 py-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              Sign Out
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5">
          <span className="material-symbols-outlined text-lg shrink-0">error</span>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2.5">
          <span className="material-symbols-outlined text-lg shrink-0">check_circle</span>
          <span>{success}</span>
        </div>
      )}

      {/* Profile Overview Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-border-subtle">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar with Upload */}
          <div className="relative group shrink-0">
            <div className="w-28 h-28 rounded-full border-4 border-white shadow-xl overflow-hidden ring-4 ring-primary/20 bg-slate-50 flex items-center justify-center">
              <img
                src={avatarUrl}
                alt={fullName}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            {uploading && (
              <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
                <span className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              </div>
            )}
            <label
              htmlFor="profile-tab-photo"
              className="absolute bottom-1 right-1 p-2 rounded-full bg-primary hover:bg-primary-hover text-white shadow-lg cursor-pointer transition-transform hover:scale-105"
              title="Change Profile Photo"
            >
              <span className="material-symbols-outlined text-sm">photo_camera</span>
            </label>
            <input
              id="profile-tab-photo"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handlePhotoUpload}
              disabled={uploading}
              className="hidden"
            />
          </div>

          <div className="flex-1 text-center sm:text-left space-y-3">
            <div>
              <h3 className="text-lg font-bold text-text-primary">{fullName}</h3>
              <p className="text-xs text-text-secondary mt-0.5">{email}</p>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <span className="px-3 py-1 rounded-full bg-[#8B1D2C]/10 text-[#8B1D2C] text-xs font-semibold">
                Role: {role}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                Campus: RIMT Central Administrative Block
              </span>
            </div>

            <div className="pt-2 flex flex-wrap gap-2.5 justify-center sm:justify-start">
              <label
                htmlFor="profile-tab-photo"
                className="px-4 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-xs font-semibold text-text-primary border border-border-subtle cursor-pointer transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">upload</span>
                Change Photo
              </label>

              <button
                type="button"
                onClick={() => { setShowPasswordForm(!showPasswordForm); setError(''); setSuccess(''); }}
                className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">lock_reset</span>
                {showPasswordForm ? 'Hide Password Form' : 'Change Password'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Password Change Sub-Card */}
      {showPasswordForm && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border-subtle space-y-4 animate-fadeIn">
          <div className="border-b border-border-subtle pb-3">
            <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">security</span>
              Update Administrative Master Password
            </h4>
            <p className="text-xs text-text-secondary mt-0.5">
              Ensure new password has at least 8 characters, an uppercase letter, a number, and a special character.
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-bold text-text-primary mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full h-10 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-text-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-text-primary mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New strong password"
                required
                className="w-full h-10 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-text-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-text-primary mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                required
                className="w-full h-10 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-text-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={changingPw}
                className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 disabled:opacity-50"
              >
                {changingPw ? 'Updating...' : 'Save New Password'}
              </button>
              <button
                type="button"
                onClick={() => setShowPasswordForm(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
