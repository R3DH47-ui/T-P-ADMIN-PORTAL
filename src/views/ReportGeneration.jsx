'use client';

import React, { useState, useMemo } from 'react';
import HeroCard from '../components/HeroCard';
import KpiCard from '../components/KpiCard';
import FilterPills from '../components/FilterPills';
import Modal from '../components/Modal';
import { REPORTS_DATA } from '../constants/data';

export default function ReportGeneration({ globalSearch = '' }) {
  const [reports, setReports] = useState(REPORTS_DATA);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const [newReport, setNewReport] = useState({
    name: '',
    type: 'Placement & NAAC',
    cycle: 'Academic Year 2024–25',
    format: 'PDF',
    description: '',
  });

  const filterPills = [
    { id: 'all', label: 'All Generated Reports', count: reports.length, icon: 'description' },
    { id: 'placement', label: 'Placement & Salary Audit', count: reports.filter(r => r.category === 'placement').length, icon: 'bar_chart' },
    { id: 'internship', label: 'Internship Records', count: reports.filter(r => r.category === 'internship').length, icon: 'assignment' },
    { id: 'training', label: 'Skill Training Logs', count: reports.filter(r => r.category === 'training').length, icon: 'menu_book' },
    { id: 'custom', label: 'MoU & Corporate Visits', count: reports.filter(r => r.category === 'custom').length, icon: 'handshake' },
  ];

  const filteredReports = useMemo(() => {
    return reports.filter(item => {
      const matchesFilter =
        activeFilter === 'all' ? true : item.category === activeFilter;
      const q = globalSearch.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        item.cycle.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [reports, activeFilter, globalSearch]);

  const handleGenerateSubmit = (e) => {
    e.preventDefault();
    if (!newReport.name) return;

    const created = {
      id: `rep-${Date.now()}`,
      name: newReport.name,
      type: newReport.type,
      cycle: newReport.cycle,
      generatedDate: 'Just now • Instant Compile',
      format: newReport.format,
      size: newReport.format === 'PDF' ? '3.4 MB' : '1.8 MB',
      status: 'Ready',
      category: newReport.type.toLowerCase().includes('intern')
        ? 'internship'
        : newReport.type.toLowerCase().includes('training')
        ? 'training'
        : 'placement',
      scheduled: false,
      description: newReport.description || 'Custom compiled audit dossier for institutional accreditation.',
    };

    setReports([created, ...reports]);
    setShowGenerateModal(false);
    setSelectedReport(created);
    setNewReport({
      name: '',
      type: 'Placement & NAAC',
      cycle: 'Academic Year 2024–25',
      format: 'PDF',
      description: '',
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
            <span className="font-bold text-primary uppercase tracking-wider text-[11px]">Module 07</span>
            <span>•</span>
            <span>Compliance &amp; Accreditation Exports</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
            Report Generation &amp; Institutional Export Engine
          </h2>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setShowGenerateModal(true)}
            className="flex-1 sm:flex-initial h-10 px-5 rounded-full text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #8B1D2C 0%, #6E1521 100%)',
              boxShadow: '0 4px 14px rgba(139, 29, 44, 0.35)',
            }}
          >
            <span className="material-symbols-outlined text-base">post_add</span>
            <span>+ Generate Custom Report</span>
          </button>
        </div>
      </div>

      {/* 2. Glossy Dark Hero Card */}
      <HeroCard
        badgeText="Statutory Audit Engine"
        badgeIcon="verified"
        secondaryBadge="NAAC Criteria 5.2"
        title="18 Reports Generated This Month • 3 Scheduled"
        description="One-click generation of university-grade placement registers, salary distribution certificates, recruiter feedback summaries, and NBA/NIRF compliance documents."
        metrics={[
          {
            label: 'Total Dossiers',
            value: '18',
            caption: 'All Verified & Signed',
            captionIcon: 'verified',
          },
          {
            label: 'Automated Queues',
            value: '3',
            caption: 'Scheduled Weekly Sync',
            captionIcon: 'schedule',
          },
        ]}
      />

      {/* 3. Four Glossy KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          variant="maroon"
          icon="description"
          trend="+5 This Week"
          trendIcon="trending_up"
          value="18"
          badgeText="Reports"
          title="Generated Reports"
          subtitle="Audit-Ready Documents"
        />
        <KpiCard
          variant="amber"
          icon="update"
          trend="Next: Monday 09:00"
          trendIcon="schedule"
          value="3"
          badgeText="Active"
          title="Scheduled Jobs"
          subtitle="Automated Email Delivery"
        />
        <KpiCard
          variant="blue"
          icon="insights"
          trend="64% Share"
          trendIcon="star"
          value="NAAC / NBA"
          badgeText="Top"
          title="Most Requested Type"
          subtitle="Salary & Placement Audits"
        />
        <KpiCard
          variant="emerald"
          icon="check_circle"
          trend="100% Up to Date"
          trendIcon="done_all"
          value="24 Sep"
          badgeText="Live"
          title="Last Synchronized"
          subtitle="Real-Time Database Sync"
        />
      </div>

      {/* 4. Filter Pills */}
      <FilterPills
        pills={filterPills}
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
      />

      {/* 5. Main Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredReports.map((rep) => (
          <div
            key={rep.id}
            className="group relative rounded-2xl p-5 bg-white border border-border-subtle shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Specular highlight */}
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shrink-0 shadow-xs border ${
                      rep.format === 'PDF'
                        ? 'bg-tint-maroon text-primary border-rose-200/60'
                        : 'bg-tint-green text-success-green border-emerald-200/60'
                    }`}
                  >
                    <span className="material-symbols-outlined">
                      {rep.format === 'PDF' ? 'picture_as_pdf' : 'table_view'}
                    </span>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <h3 className="font-bold text-base text-text-primary group-hover:text-primary transition-colors truncate">
                      {rep.name}
                    </h3>
                    <span className="text-xs text-text-secondary mt-0.5">
                      {rep.type} • {rep.cycle}
                    </span>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                    rep.format === 'PDF'
                      ? 'bg-rose-50 text-primary border border-rose-200/60'
                      : 'bg-emerald-50 text-success-green border border-emerald-200/60'
                  }`}
                >
                  {rep.format} ({rep.size})
                </span>
              </div>

              <p className="mt-3 text-xs text-text-secondary line-clamp-2 leading-relaxed">
                {rep.description}
              </p>

              <div className="mt-3 p-2.5 rounded-xl bg-surface-container-low/70 flex items-center justify-between text-[11px]">
                <span className="text-text-secondary font-medium">Generated On:</span>
                <span className="font-semibold text-text-primary font-mono">{rep.generatedDate}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-xs">
              <span className="text-text-secondary font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-success-green">verified</span>
                Audit Sealed
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedReport(rep)}
                  className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container font-semibold text-text-primary transition-colors"
                >
                  Preview
                </button>
                <button
                  onClick={() => alert(`Downloading verified ${rep.name} (${rep.format})...`)}
                  className="px-3.5 py-1.5 rounded-lg text-white font-bold flex items-center gap-1 shadow-xs transition-transform hover:scale-[1.02]"
                  style={{ background: 'linear-gradient(135deg, #8B1D2C 0%, #6E1521 100%)' }}
                >
                  <span className="material-symbols-outlined text-base">download</span>
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Preview Modal */}
      {selectedReport && (
        <Modal
          isOpen={!!selectedReport}
          onClose={() => setSelectedReport(null)}
          title={selectedReport.name}
          subtitle={`${selectedReport.type} • ${selectedReport.cycle} (${selectedReport.format})`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#15151F] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-bold">Document Format</span>
                <h4 className="text-lg font-extrabold text-[#FFDF9B]">
                  {selectedReport.format} Document ({selectedReport.size})
                </h4>
                <p className="text-xs text-gray-300 mt-0.5">{selectedReport.generatedDate}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-white/10 text-success-green font-semibold">
                Digitally Signed
              </span>
            </div>

            <div className="p-4 rounded-xl border border-border-subtle bg-surface-container-low space-y-2">
              <h5 className="font-bold text-text-primary text-sm">Summary Abstract</h5>
              <p className="text-text-secondary leading-relaxed">{selectedReport.description}</p>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-border-subtle">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 rounded-xl text-text-secondary hover:bg-surface-container-low"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Downloading ${selectedReport.name}`);
                  setSelectedReport(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold shadow-sm"
              >
                Download Official Document
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Generate Custom Report Modal */}
      <Modal
        isOpen={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        title="Generate Institutional T&P Report"
        subtitle="Configure criteria, cycle, and export format."
      >
        <form onSubmit={handleGenerateSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-text-primary mb-1">Report Title</label>
            <input
              type="text"
              required
              value={newReport.name}
              onChange={(e) => setNewReport({ ...newReport, name: e.target.value })}
              placeholder="e.g. Q4 Campus Hiring & CTC Audit Index"
              className="w-full h-10 px-3 rounded-xl border border-border-subtle focus:border-primary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-text-primary mb-1">Report Module</label>
              <select
                value={newReport.type}
                onChange={(e) => setNewReport({ ...newReport, type: e.target.value })}
                className="w-full h-10 px-3 rounded-xl border border-border-subtle focus:border-primary focus:outline-none"
              >
                <option>Placement &amp; NAAC</option>
                <option>Department Performance</option>
                <option>Corporate Relations</option>
                <option>Internships</option>
                <option>Skill Training</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-text-primary mb-1">Export Format</label>
              <select
                value={newReport.format}
                onChange={(e) => setNewReport({ ...newReport, format: e.target.value })}
                className="w-full h-10 px-3 rounded-xl border border-border-subtle focus:border-primary focus:outline-none"
              >
                <option value="PDF">Adobe PDF (.pdf)</option>
                <option value="Excel">Microsoft Excel (.xlsx)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-text-primary mb-1">Cohort Cycle</label>
            <input
              type="text"
              value={newReport.cycle}
              onChange={(e) => setNewReport({ ...newReport, cycle: e.target.value })}
              placeholder="Academic Year 2024–25"
              className="w-full h-10 px-3 rounded-xl border border-border-subtle focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-text-primary mb-1">Description / Notes</label>
            <textarea
              rows={3}
              value={newReport.description}
              onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
              placeholder="Brief institutional objective for this export..."
              className="w-full p-3 rounded-xl border border-border-subtle focus:border-primary focus:outline-none resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border-subtle">
            <button
              type="button"
              onClick={() => setShowGenerateModal(false)}
              className="px-4 py-2 rounded-xl text-text-secondary hover:bg-surface-container-low"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold shadow-md hover:shadow-lg transition-transform hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, #8B1D2C 0%, #6E1521 100%)' }}
            >
              Compile &amp; Download Document
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
