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

function AdminPortalDashboard() {
  const { admin, setAdmin, signOut } = useAdminAuth();
  const [activeModule, setActiveModule] = useState('students');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileModalDefaultTab, setProfileModalDefaultTab] = useState('profile');

  const openProfileModal = (tab = 'profile') => {
    setProfileModalDefaultTab(tab);
    setProfileModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background font-body-default text-on-surface antialiased">
      {/* Exact 3-State Responsive Sidebar */}
      <Sidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* Dynamic Header Bar with Active Admin Session */}
      <Header
        onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        admin={admin}
        onOpenProfile={() => openProfileModal('profile')}
        onOpenChangePassword={() => openProfileModal('password')}
        onSignOut={signOut}
      />

      {/* Main Content Area */}
      <div className="pl-0 md:pl-20 lg:pl-72 transition-all duration-300">
        <main className="relative pt-16 bg-surface min-h-screen">
          <div className="flex flex-col w-full">
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
