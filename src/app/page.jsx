'use client';

import React, { useState } from 'react';
import AuthGuard, { useAdminAuth } from '../components/auth/AuthGuard';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StudentManagement from '../views/StudentManagement';
import OnboardingApprovals from '../views/OnboardingApprovals';
import CompanyManagement from '../views/CompanyManagement';
import DriveManagement from '../views/DriveManagement';
import PlacementStatistics from '../views/PlacementStatistics';
import TrainingManagement from '../views/TrainingManagement';
import InternshipMonitoring from '../views/InternshipMonitoring';
import ReportGeneration from '../views/ReportGeneration';
import ProfileTab from '../views/ProfileTab';
import ProfileModal from '../components/profile/ProfileModal';

function CompanyLockedModuleView({ module, onGoToTalentPool, onGoToStats }) {
  const moduleNames = {
    approvals: 'Onboarding Approvals',
    students: 'Student Management (Full Directory)',
    drives: 'Placement Drive Operations',
    trainings: 'Technical Training Management',
    internships: 'Academic Internship Tracking',
    reports: 'Compliance Report Generation',
  };

  const name = moduleNames[module] || 'Administrative Suite';

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-3xl p-8 border border-slate-200/80 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.08)] text-center relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />

        {/* Lock Icon Badge */}
        <div className="relative w-16 h-16 mx-auto mb-5 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700 shadow-inner">
          <span className="material-symbols-outlined text-3xl">lock</span>
          <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-bold">
            ✕
          </span>
        </div>

        {/* Heading */}
        <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-2">
          Staff-Restricted Operational Module
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {name} is Locked
        </h2>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          This section is restricted exclusively to authorized RIMT University administrative officers and faculty. As an authorized Corporate Recruiter, you have full access to our placement-ready talent pool and institutional statistics.
        </p>

        {/* Privileges card */}
        <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/60 text-left space-y-2">
          <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
            Your Corporate Recruiter Access:
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
            <span className="material-symbols-outlined text-base text-emerald-600">check_circle</span>
            <span>Verified Student Talent Pool (LinkedIn &amp; GitHub Portfolios)</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
            <span className="material-symbols-outlined text-base text-emerald-600">check_circle</span>
            <span>Placement Statistics &amp; Package Benchmarks</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="material-symbols-outlined text-base text-slate-400">lock</span>
            <span>Institutional Student Approvals (Staff Only)</span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onGoToTalentPool}
            className="w-full sm:flex-1 h-11 bg-[#0B4EA2] hover:bg-[#083E82] text-white text-xs font-bold rounded-xl shadow-md shadow-blue-900/15 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">business</span>
            <span>Browse Talent Pool</span>
          </button>
          <button
            onClick={onGoToStats}
            className="w-full sm:flex-1 h-11 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-2xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">bar_chart</span>
            <span>Placement Statistics</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function AdminPortalDashboard() {
  const { admin, setAdmin, accounts, switchAccount, addAccount, signOut } = useAdminAuth();
  const isCompany = admin?.role === 'COMPANY';

  // Default to 'companies' for company recruiters, 'students' for admin staff
  const [activeModule, setActiveModule] = useState(isCompany ? 'companies' : 'students');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileModalDefaultTab, setProfileModalDefaultTab] = useState('profile');

  // Enforce company landing
  React.useEffect(() => {
    if (isCompany && activeModule !== 'companies' && activeModule !== 'statistics') {
      setActiveModule('companies');
    }
  }, [isCompany]);

  const openProfileModal = (tab = 'profile') => {
    setProfileModalDefaultTab(tab);
    setProfileModalOpen(true);
  };

  const isModuleLockedForUser = isCompany && activeModule !== 'companies' && activeModule !== 'statistics';

  return (
    <div className="min-h-screen bg-background font-body-default text-on-surface antialiased">
      {/* Exact 3-State Responsive Sidebar */}
      <Sidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        userRole={admin?.role || 'ADMIN'}
      />

      {/* Dynamic Header Bar with Active Session */}
      <Header
        onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        admin={admin}
        accounts={accounts}
        onSwitchAccount={switchAccount}
        onAddAccountSuccess={addAccount}
        onOpenProfile={() => openProfileModal('profile')}
        onOpenChangePassword={() => openProfileModal('password')}
        onSignOut={signOut}
      />

      {/* Main Content Area */}
      <div className="pl-0 md:pl-20 lg:pl-72 transition-all duration-300">
        <main className="relative pt-16 bg-surface min-h-screen">
          <div className="flex flex-col w-full">
            {/* If company attempts to access locked module, show locked view */}
            {isModuleLockedForUser ? (
              <CompanyLockedModuleView
                module={activeModule}
                onGoToTalentPool={() => setActiveModule('companies')}
                onGoToStats={() => setActiveModule('statistics')}
              />
            ) : (
              <>
                {activeModule === 'approvals' && (
                  <OnboardingApprovals globalSearch={searchQuery} />
                )}
                {activeModule === 'students' && (
                  <StudentManagement globalSearch={searchQuery} />
                )}
                {activeModule === 'companies' && (
                  <CompanyManagement globalSearch={searchQuery} />
                )}
                {activeModule === 'drives' && (
                  <DriveManagement globalSearch={searchQuery} />
                )}
                {activeModule === 'statistics' && (
                  <PlacementStatistics globalSearch={searchQuery} />
                )}
                {activeModule === 'trainings' && (
                  <TrainingManagement globalSearch={searchQuery} />
                )}
                {activeModule === 'internships' && (
                  <InternshipMonitoring globalSearch={searchQuery} />
                )}
                {activeModule === 'reports' && (
                  <ReportGeneration globalSearch={searchQuery} />
                )}
                {activeModule === 'profile' && (
                  <ProfileTab
                    admin={admin}
                    onAdminUpdated={setAdmin}
                    onSignOut={signOut}
                  />
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Profile & Security Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        admin={admin}
        onAdminUpdated={setAdmin}
        onSignOut={signOut}
        defaultTab={profileModalDefaultTab}
      />
    </div>
  );
}

export default function AdminPortalHome() {
  return (
    <AuthGuard>
      <AdminPortalDashboard />
    </AuthGuard>
  );
}
