'use client';

import React, { useState, useMemo } from 'react';
import HeroCard from '../components/HeroCard';
import KpiCard from '../components/KpiCard';
import FilterPills from '../components/FilterPills';
import Modal from '../components/Modal';
import { TRAININGS_DATA } from '../constants/data';

export default function TrainingManagement({ globalSearch = '' }) {
  const [trainings, setTrainings] = useState(TRAININGS_DATA);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newTraining, setNewTraining] = useState({
    title: '',
    trainer: '',
    dept: 'CSE & IT • Final Year',
    duration: '40 Hours (4 Weeks)',
    totalSessions: 10,
    materials: 'Microservices Guide, Lab Sandbox',
  });

  const filterPills = [
    { id: 'all', label: 'All Skill Programs', count: trainings.length, icon: 'menu_book' },
    { id: 'ongoing', label: 'Ongoing Sprints', count: trainings.filter(t => t.category === 'ongoing').length, icon: 'play_circle' },
    { id: 'upcoming', label: 'Upcoming Programs', count: trainings.filter(t => t.category === 'upcoming').length, icon: 'event' },
    { id: 'completed', label: 'Concluded & Certified', count: trainings.filter(t => t.category === 'completed').length, icon: 'verified' },
  ];

  const filteredTrainings = useMemo(() => {
    return trainings.filter(tr => {
      const matchesFilter =
        activeFilter === 'all' ? true : tr.category === activeFilter;
      const q = globalSearch.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tr.title.toLowerCase().includes(q) ||
        tr.trainer.toLowerCase().includes(q) ||
        tr.dept.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [trainings, activeFilter, globalSearch]);

  const handleAddTrainingSubmit = (e) => {
    e.preventDefault();
    if (!newTraining.title || !newTraining.trainer) return;

    const created = {
      id: `tr-${Date.now()}`,
      title: newTraining.title,
      trainer: newTraining.trainer,
      dept: newTraining.dept,
      duration: newTraining.duration,
      sessionsDone: 0,
      totalSessions: Number(newTraining.totalSessions) || 10,
      attendanceRate: 'Upcoming',
      enrolledCount: 120,
      status: 'Upcoming',
      statusType: 'upcoming',
      category: 'upcoming',
      nextClass: 'Orientation Next Week',
      materials: newTraining.materials.split(',').map(m => m.trim()),
    };

    setTrainings([created, ...trainings]);
    setShowAddModal(false);
    setNewTraining({
      title: '',
      trainer: '',
      dept: 'CSE & IT • Final Year',
      duration: '40 Hours (4 Weeks)',
      totalSessions: 10,
      materials: 'Microservices Guide, Lab Sandbox',
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
            <span className="font-bold text-primary uppercase tracking-wider text-[11px]">Module 05</span>
            <span>•</span>
            <span>Skill Upskilling &amp; Industry Certifications</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
            Training Management &amp; Technical Sprints
          </h2>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex-1 sm:flex-initial h-10 px-5 rounded-full text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #8B1D2C 0%, #6E1521 100%)',
              boxShadow: '0 4px 14px rgba(139, 29, 44, 0.35)',
            }}
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            <span>+ Add Training Program</span>
          </button>
        </div>
      </div>

      {/* 2. Glossy Dark Hero Card */}
      <HeroCard
        badgeText="Pre-Placement Readiness Track"
        badgeIcon="psychology"
        secondaryBadge="AY 2024–25 Active Cohort"
        title="Institutional Skill Sprints & Certification Modules"
        description="Comprehensive training roadmap delivering deep hands-on expertise in Cloud Computing, Full-Stack Architecture, Data Structures, and Executive Communication."
        metrics={[
          {
            label: 'Ongoing Sprints',
            value: '3',
            caption: '128 Scholars Active',
            captionIcon: 'play_circle',
          },
          {
            label: 'Avg Attendance',
            value: '93.4%',
            caption: 'Automated RFID Log',
            captionIcon: 'verified',
          },
        ]}
      />

      {/* 3. Four Glossy KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          variant="amber"
          icon="menu_book"
          trend="3 Sprints Active"
          trendIcon="play_circle"
          value="4"
          badgeText="Programs"
          title="Training Modules"
          subtitle="DSA, Java, Soft Skills, EV"
        />
        <KpiCard
          variant="emerald"
          icon="task_alt"
          trend="220 Certified"
          trendIcon="verified"
          value="1"
          badgeText="Concluded"
          title="Completed Trainings"
          subtitle="Advanced DSA Masterclass"
        />
        <KpiCard
          variant="blue"
          icon="person_add"
          trend="Ex-Google & Infosys"
          trendIcon="star"
          value="12"
          badgeText="Trainers"
          title="Corporate Mentors"
          subtitle="Industry Veteran Instructors"
        />
        <KpiCard
          variant="maroon"
          icon="fact_check"
          trend="+3.2% vs Last Cohort"
          trendIcon="trending_up"
          value="93.4%"
          badgeText="Rate"
          title="Average Attendance"
          subtitle="Mandatory 85% Benchmark"
        />
      </div>

      {/* 4. Filter Pills */}
      <FilterPills
        pills={filterPills}
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
      />

      {/* 5. Main Training Programs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTrainings.map((tr) => {
          const progressPercent = Math.round((tr.sessionsDone / tr.totalSessions) * 100);
          return (
            <div
              key={tr.id}
              className="group relative rounded-2xl p-5 bg-white border border-border-subtle shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Specular highlight */}
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-tint-maroon text-primary flex items-center justify-center font-bold text-xl shrink-0 border border-rose-200/60 shadow-xs">
                      <span className="material-symbols-outlined">menu_book</span>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-bold text-base text-text-primary group-hover:text-primary transition-colors">
                        {tr.title}
                      </h3>
                      <span className="text-xs text-text-secondary mt-0.5">
                        {tr.trainer}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      tr.status === 'Ongoing'
                        ? 'bg-tint-blue text-info-blue border border-blue-200/60'
                        : tr.status === 'Completed'
                        ? 'bg-tint-green text-success-green border border-emerald-200/60'
                        : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                    }`}
                  >
                    {tr.status}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-low text-text-secondary font-medium">
                    {tr.dept}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-tint-maroon text-primary font-bold">
                    {tr.duration}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-tint-green text-success-green font-semibold">
                    Att: {tr.attendanceRate}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-4 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary font-medium">Sprint Completion</span>
                    <span className="font-bold text-text-primary">
                      {tr.sessionsDone} / {tr.totalSessions} Sessions ({progressPercent}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-surface-container-low overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#8B1D2C] to-[#E7B94A] transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 p-2.5 rounded-xl bg-surface-container-low/70 text-xs flex items-center justify-between">
                  <span className="text-text-secondary font-medium flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-primary">schedule</span>
                    Next Session:
                  </span>
                  <span className="font-bold text-text-primary">{tr.nextClass}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-xs">
                <span className="text-text-secondary">
                  <strong>{tr.enrolledCount}</strong> Scholars Enrolled
                </span>
                <button
                  onClick={() => setSelectedTraining(tr)}
                  className="font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <span>Materials &amp; Schedule</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Materials & Schedule Modal */}
      {selectedTraining && (
        <Modal
          isOpen={!!selectedTraining}
          onClose={() => setSelectedTraining(null)}
          title={selectedTraining.title}
          subtitle={`Trainer: ${selectedTraining.trainer} • ${selectedTraining.duration}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#15151F] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-bold">Progress</span>
                <h4 className="text-lg font-extrabold text-[#FFDF9B]">
                  {selectedTraining.sessionsDone} of {selectedTraining.totalSessions} Done
                </h4>
                <p className="text-xs text-gray-300 mt-0.5">{selectedTraining.dept}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-400 uppercase font-bold">Attendance</span>
                <h4 className="text-base font-bold text-success-green">{selectedTraining.attendanceRate}</h4>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-text-primary">Curriculum Materials &amp; Sandboxes</h5>
              {selectedTraining.materials?.map((mat, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-surface-container-low border border-border-subtle flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">download</span>
                    <span className="font-semibold text-text-primary">{mat}</span>
                  </div>
                  <span className="text-[11px] text-primary font-bold cursor-pointer hover:underline">
                    Download PDF
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-border-subtle">
              <button
                onClick={() => setSelectedTraining(null)}
                className="px-4 py-2 rounded-xl text-text-secondary hover:bg-surface-container-low"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Accessing live session roster for ${selectedTraining.title}`);
                  setSelectedTraining(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold shadow-sm"
              >
                Log Session Attendance
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Training Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Schedule New Training Sprint"
        subtitle="Define course title, faculty trainer, and session capacity."
      >
        <form onSubmit={handleAddTrainingSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-text-primary mb-1">Course Title</label>
            <input
              type="text"
              required
              value={newTraining.title}
              onChange={(e) => setNewTraining({ ...newTraining, title: e.target.value })}
              placeholder="e.g. Applied Generative AI & LLM Systems"
              className="w-full h-10 px-3 rounded-xl border border-border-subtle focus:border-primary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-text-primary mb-1">Assigned Trainer</label>
              <input
                type="text"
                required
                value={newTraining.trainer}
                onChange={(e) => setNewTraining({ ...newTraining, trainer: e.target.value })}
                placeholder="e.g. Dr. Harjit Singh (AI Lead)"
                className="w-full h-10 px-3 rounded-xl border border-border-subtle focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-text-primary mb-1">Target Department</label>
              <input
                type="text"
                value={newTraining.dept}
                onChange={(e) => setNewTraining({ ...newTraining, dept: e.target.value })}
                placeholder="CSE & IT • Final Year"
                className="w-full h-10 px-3 rounded-xl border border-border-subtle focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-text-primary mb-1">Duration &amp; Hours</label>
              <input
                type="text"
                value={newTraining.duration}
                onChange={(e) => setNewTraining({ ...newTraining, duration: e.target.value })}
                placeholder="40 Hours (4 Weeks)"
                className="w-full h-10 px-3 rounded-xl border border-border-subtle focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-text-primary mb-1">Total Sessions</label>
              <input
                type="number"
                value={newTraining.totalSessions}
                onChange={(e) => setNewTraining({ ...newTraining, totalSessions: e.target.value })}
                placeholder="10"
                className="w-full h-10 px-3 rounded-xl border border-border-subtle focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border-subtle">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 rounded-xl text-text-secondary hover:bg-surface-container-low"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold shadow-md hover:shadow-lg transition-transform hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, #8B1D2C 0%, #6E1521 100%)' }}
            >
              Create Training Track
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
