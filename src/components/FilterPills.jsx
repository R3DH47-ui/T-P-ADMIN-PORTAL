'use client';

import React from 'react';

export default function FilterPills({ pills, activeFilter, onSelectFilter }) {
  return (
    <div className="w-full overflow-x-auto pb-1 scrollbar-none">
      <div className="flex items-center gap-2 min-w-max">
        {pills.map((pill) => {
          const isActive = activeFilter === pill.id;
          return (
            <button
              key={pill.id}
              onClick={() => onSelectFilter(pill.id)}
              className={`min-h-[38px] px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5
                ${isActive
                  ? 'bg-gradient-to-r from-[#8B1D2C] to-[#6E1521] text-white shadow-sm ring-1 ring-white/20'
                  : 'bg-white/80 hover:bg-white text-text-secondary hover:text-text-primary border border-border-subtle hover:border-slate-300'
                }`}
            >
              {pill.icon && (
                <span className="material-symbols-outlined text-sm">
                  {pill.icon}
                </span>
              )}
              <span>{pill.label}</span>
              {pill.count !== undefined && (
                <span
                  className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-surface-container-low text-text-secondary'
                  }`}
                >
                  {pill.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
