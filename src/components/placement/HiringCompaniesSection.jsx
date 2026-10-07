'use client';

import React, { useState } from 'react';

/* ── High-Fidelity Official Corporate Vector Logos ── */
function CompanyBrandLogo({ company }) {
  const norm = (company?.shortName || company?.name || company?.id || '').toLowerCase();

  // 1. Google India
  if (norm.includes('google')) {
    return (
      <svg viewBox="0 0 48 48" className="w-full h-full" aria-label="Google Logo">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      </svg>
    );
  }

  // 2. Microsoft Corporation
  if (norm.includes('microsoft')) {
    return (
      <svg viewBox="0 0 23 23" className="w-full h-full p-0.5" aria-label="Microsoft Logo">
        <path fill="#f25022" d="M1 1h10v10H1z"/>
        <path fill="#00a4ef" d="M1 12h10v10H1z"/>
        <path fill="#7fba00" d="M12 1h10v10H12z"/>
        <path fill="#ffb900" d="M12 12h10v10H12z"/>
      </svg>
    );
  }

  // 3. Amazon Web Services (AWS)
  if (norm.includes('amazon') || norm.includes('aws')) {
    return (
      <svg viewBox="0 0 64 64" className="w-full h-full" aria-label="Amazon AWS Logo">
        <rect width="64" height="64" rx="8" fill="#232F3E" />
        <path fill="#FF9900" d="M13 39c9 5 25 7 38-1 1.2-0.8 2.2 0.4 1.2 1.5-13 10-30 7-40 1-1.2-0.8-0.2-2.1 0.8-1.5z" />
        <path fill="#FF9900" d="M52 35c-0.6 1.8-1.8 4.2-4.2 5.4 0 0 0 1.2 0.6 1.2 2.4-0.6 4.8-1.8 6.6-3.6 0.6-0.6 0-1.2-0.6-1.2-1.2-0.6-1.8-1.2-2.4-1.8z" />
        <text x="32" y="28" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="16" fill="#FFFFFF" textAnchor="middle" letterSpacing="1">AWS</text>
      </svg>
    );
  }

  // 4. Deloitte
  if (norm.includes('deloitte')) {
    return (
      <svg viewBox="0 0 70 30" className="w-full h-full" aria-label="Deloitte Logo">
        <text x="2" y="21" fontFamily="Arial, Helvetica, sans-serif" fontWeight="bold" fontSize="15.5" fill="#000000" letterSpacing="-0.3">Deloitte</text>
        <circle cx="63" cy="20" r="2.5" fill="#86BC25" />
      </svg>
    );
  }

  // 5. HDFC Bank
  if (norm.includes('hdfc')) {
    return (
      <svg viewBox="0 0 64 64" className="w-full h-full" aria-label="HDFC Bank Logo">
        <rect width="64" height="64" rx="8" fill="#004c8f" />
        <rect x="24" y="10" width="16" height="44" fill="#ffffff" />
        <rect x="10" y="24" width="44" height="16" fill="#ffffff" />
        <rect x="27" y="27" width="10" height="10" fill="#ed232a" />
      </svg>
    );
  }

  // 6. Tata Consultancy Services (TCS)
  if (norm.includes('tata') || norm.includes('tcs')) {
    return (
      <svg viewBox="0 0 64 64" className="w-full h-full" aria-label="TCS Logo">
        <rect width="64" height="64" rx="8" fill="#001F3F" />
        <path fill="#00A3E0" d="M16 18h32v4H34v22h-4V22H16z" />
        <text x="32" y="54" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="11" fill="#FFFFFF" textAnchor="middle" letterSpacing="2">TCS</text>
      </svg>
    );
  }

  // 7. L&T
  if (norm.includes('l&t') || norm.includes('larsen')) {
    return (
      <svg viewBox="0 0 64 64" className="w-full h-full" aria-label="L&T Logo">
        <rect width="64" height="64" rx="8" fill="#00457C" />
        <circle cx="32" cy="32" r="23" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
        <text x="32" y="38" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="15" fill="#FFFFFF" textAnchor="middle" letterSpacing="1">L&T</text>
      </svg>
    );
  }

  // 8. Infosys
  if (norm.includes('infosys')) {
    return (
      <svg viewBox="0 0 64 64" className="w-full h-full" aria-label="Infosys Logo">
        <rect width="64" height="64" rx="8" fill="#007CC3" />
        <text x="32" y="38" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="12" fill="#FFFFFF" textAnchor="middle">Infosys</text>
      </svg>
    );
  }

  // 9. Wipro
  if (norm.includes('wipro')) {
    return (
      <svg viewBox="0 0 64 64" className="w-full h-full" aria-label="Wipro Logo">
        <rect width="64" height="64" rx="8" fill="#FFFFFF" stroke="#E2E8F0" />
        <circle cx="24" cy="27" r="7" fill="#E84A5F" />
        <circle cx="40" cy="27" r="7" fill="#2A363B" />
        <circle cx="32" cy="39" r="7" fill="#FF847C" />
      </svg>
    );
  }

  // Fallback: Custom monogram initials badge
  const initials = (company?.shortName || company?.name || 'CO').slice(0, 3).toUpperCase();
  return (
    <div className="w-full h-full rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-xs tracking-wider">
      {initials}
    </div>
  );
}

export default function HiringCompaniesSection({
  companies = [],
  onSelectStudent = null,
}) {
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');

  const states = ['ALL', ...new Set(companies.map((c) => c.state).filter(Boolean))];

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      company.city.toLowerCase().includes(searchFilter.toLowerCase()) ||
      company.state.toLowerCase().includes(searchFilter.toLowerCase()) ||
      company.sector.toLowerCase().includes(searchFilter.toLowerCase()) ||
      company.hiredScholars?.some((s) => s.studentName.toLowerCase().includes(searchFilter.toLowerCase()));

    const matchesState = selectedState === 'ALL' || company.state === selectedState;
    return matchesSearch && matchesState;
  });

  return (
    <div
      className="group relative rounded-2xl p-6 lg:p-8 overflow-hidden backdrop-blur-xl border border-white/80 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col gap-6"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(254, 248, 245, 0.88) 45%, rgba(255, 255, 255, 0.94) 100%)',
        boxShadow: 'rgba(107, 0, 24, 0.07) 0px 14px 34px -4px, rgba(255, 255, 255, 0.95) 0px 1px 0px inset',
        border: '1px solid rgba(255, 255, 255, 0.85)',
      }}
    >
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />
      <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-60 h-60 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-40 bg-gradient-to-r from-transparent via-rose-200/40 to-transparent -skew-x-12 animate-glossy" />

      {/* ── Section Header ── */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-border-subtle/50">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-label-eyebrow text-[10px] text-primary-container uppercase font-bold tracking-wider">
              CORPORATE RECRUITMENT PARTNERS
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tint-maroon text-primary font-bold text-[10px] border border-rose-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Active Hirers
            </span>
          </div>
          <h2 className="font-headline-section text-xl lg:text-2xl font-extrabold text-text-primary tracking-tight">
            Companies That Hired RIMT Scholars
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1 max-w-2xl">
            Detailed corporate intelligence on partner enterprises that officially recruited students from our batch, including headquarters, operational state, corporate SPOC liaison, and package ranges.
          </p>
        </div>

        {/* Search & State Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          {/* Search Input */}
          <div className="relative min-w-[200px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-sm">
              search
            </span>
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search company, state, student..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/90 border border-white/80 text-xs text-text-primary placeholder:text-text-secondary/70 focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-xs"
            />
          </div>

          {/* State Pills Dropdown / Filter */}
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            {states.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedState(st)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedState === st
                    ? 'bg-primary text-white shadow-xs font-bold'
                    : 'bg-white/80 text-text-secondary hover:text-text-primary hover:bg-white border border-white/60'
                }`}
              >
                {st === 'ALL' ? 'All States' : st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Companies Grid ── */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCompanies.map((company, idx) => (
          <div
            key={company.id || idx}
            className="group/card relative rounded-2xl p-5 bg-white/90 hover:bg-white backdrop-blur-md border border-white/80 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              {/* Card Header: Logo, Name & State Badge */}
              <div className="flex items-start justify-between gap-2.5">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  {/* Official Corporate Logo (44px) */}
                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-center p-1.5 shrink-0 group-hover/card:scale-105 transition-transform overflow-hidden">
                    <CompanyBrandLogo company={company} />
                  </div>

                  {/* Company Name & Sector */}
                  <div className="flex flex-col min-w-0 flex-1">
                    <h3
                      className="font-bold text-xs sm:text-[13px] text-text-primary tracking-tight leading-snug group-hover/card:text-primary transition-colors truncate"
                      title={company.name}
                    >
                      {company.name}
                    </h3>
                    <span
                      className="text-[10.5px] text-text-secondary font-medium truncate mt-0.5"
                      title={company.sector}
                    >
                      {company.sector}
                    </span>
                  </div>
                </div>

                {/* State Location Tag — clickable → opens Google Maps */}
                <div className="shrink-0">
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(company.city + ', ' + company.state + ', India')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50/90 text-info-blue border border-blue-200/80 text-[10px] font-bold shadow-xs whitespace-nowrap hover:bg-blue-100 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                    title={`Open ${company.city}, ${company.state} in Google Maps`}
                  >
                    <span className="material-symbols-outlined text-[11px] text-info-blue">location_on</span>
                    {company.state}
                  </a>
                </div>
              </div>

              {/* Geographical Location & Campus details — clickable → Google Maps */}
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent((company.location || '') + ', ' + company.city + ', ' + company.state + ', India')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3.5 p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-start gap-2 text-xs hover:bg-blue-50/60 hover:border-blue-200/60 transition-all cursor-pointer group/loc"
                title={`Open ${company.location || company.city} in Google Maps`}
              >
                <span className="material-symbols-outlined text-text-secondary text-base shrink-0 mt-0.5 group-hover/loc:text-info-blue transition-colors">
                  apartment
                </span>
                <div className="flex flex-col">
                  <span className="font-semibold text-text-primary text-[11px] group-hover/loc:text-info-blue transition-colors">
                    {company.city}, {company.state}
                  </span>
                  <span className="text-[10px] text-text-secondary leading-tight mt-0.5">
                    {company.location}
                  </span>
                </div>
                <span className="material-symbols-outlined text-[11px] text-slate-300 group-hover/loc:text-info-blue transition-colors shrink-0 mt-0.5 ml-auto">
                  open_in_new
                </span>
              </a>

              {/* Hired Scholars Badge Strip */}
              <div className="mt-3 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-text-secondary uppercase tracking-wider text-[10px]">
                    Hired Scholar(s) from Batch
                  </span>
                  <span className="font-bold text-primary text-[11px]">
                    {company.hiredCount} {company.hiredCount === 1 ? 'Scholar' : 'Scholars'}
                  </span>
                </div>

                <div className="space-y-1.5">
                  {company.hiredScholars?.map((scholar, sIdx) => (
                    <div
                      key={sIdx}
                      onClick={() => onSelectStudent && onSelectStudent({
                        id: scholar.studentId,
                        name: scholar.studentName,
                        roll: scholar.studentRoll,
                        avatar: scholar.studentPhoto,
                        department: scholar.studentDepartment,
                      })}
                      className="p-2 rounded-xl bg-tint-maroon/25 hover:bg-tint-maroon/40 border border-rose-200/70 cursor-pointer transition-colors flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {scholar.studentPhoto ? (
                          <img
                            src={scholar.studentPhoto}
                            alt={scholar.studentName}
                            className="w-7 h-7 rounded-full object-cover border border-white shadow-xs shrink-0"
                          />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                            {scholar.studentName.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-text-primary text-xs truncate">
                            {scholar.studentName}
                          </span>
                          <span className="text-[10px] text-text-secondary truncate">
                            {scholar.jobRole} • {scholar.studentRoll}
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-1">
                        <span className="px-2 py-0.5 rounded-full bg-white text-primary font-extrabold text-[11px] shadow-xs border border-rose-200/80">
                          ₹{scholar.ctcLpa} LPA
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom: MoU Status & SPOC Contact Footer */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="inline-flex items-center gap-1 text-text-secondary">
                  <span className="material-symbols-outlined text-xs text-amber-600">verified</span>
                  <span>{company.mouStatus}</span>
                </span>
                <span className="font-semibold text-text-primary">
                  {company.packageRange}
                </span>
              </div>

              {/* Corporate SPOC info */}
              {company.spoc && (
                <div className="flex items-center justify-between text-[10px] text-text-secondary bg-white p-2 rounded-lg border border-slate-200/70 shadow-2xs">
                  <div className="flex flex-col">
                    <span className="font-bold text-text-primary">
                      {company.spoc.name}
                    </span>
                    <span>{company.spoc.role}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-primary">
                    <a
                      href={`mailto:${company.spoc.email}`}
                      title={company.spoc.email}
                      className="p-1 rounded-md hover:bg-rose-50"
                    >
                      <span className="material-symbols-outlined text-sm">mail</span>
                    </a>
                    <a
                      href={`tel:${company.spoc.phone}`}
                      title={company.spoc.phone}
                      className="p-1 rounded-md hover:bg-rose-50"
                    >
                      <span className="material-symbols-outlined text-sm">call</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="relative z-10 pt-3 border-t border-white/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-text-secondary">
        <span className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sm text-success-green">verified_user</span>
          <span>
            Showing {filteredCompanies.length} corporate recruitment partners with verified placements across {states.length - 1} Indian states.
          </span>
        </span>
        <span className="font-bold text-primary-container">
          100% Institutional MoU Compliance
        </span>
      </div>
    </div>
  );
}
