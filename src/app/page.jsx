'use client';

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StudentManagement from '../views/StudentManagement';
import CompanyManagement from '../views/CompanyManagement';
import DriveManagement from '../views/DriveManagement';
import PlacementStatistics from '../views/PlacementStatistics';
import TrainingManagement from '../views/TrainingManagement';
import InternshipMonitoring from '../views/InternshipMonitoring';
import ReportGeneration from '../views/ReportGeneration';

export default function AdminPortalHome() {
  const [activeModule, setActiveModule] = useState('students');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-background font-body-default text-on-surface antialiased">
      {/* Exact 3-State Responsive Sidebar */}
      <Sidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* Exact Header Bar */}
      <Header
        onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <div className="pl-0 md:pl-20 lg:pl-72 transition-all duration-300">
        <main className="relative pt-16 bg-surface min-h-screen">
          <div className="flex flex-col w-full">
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
          </div>
        </main>
      </div>
    </div>
  );
}
