"use client";
import React, { useState } from "react";
import { 
  PlusIcon, 
  CalendarIcon, 
  BanknotesIcon, 
  ChartBarIcon, 
  UserGroupIcon, 
  SunIcon,
  ArchiveBoxIcon,
  ChevronRightIcon,
  PencilSquareIcon,
  HistoryIcon
} from "@heroicons/react/24/outline";
import theme from "@/theme";
import AcademicYearModal from "./componenet/AcademicYearModal";

const AcademicYear = () => {
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null, data: null });

  // Mock Data: In a real app, this would come from an API
  const [academicYears] = useState([
    {
      id: "ay1",
      name: "2024–2025",
      status: "Active",
      stats: { totalGrades: "Nursery - Grade 10", vacationDays: 42, avgAttendance: "94.2%", avgResult: "GPA 4.10", revenue: "2,40,000" },
      startDate: "2024-01-01",
      endDate: "2025-12-31",
      timeline: "Jan 2024 - Dec 2025",
    },
    {
      id: "ay2",
      name: "2023–2024",
      status: "Archived",
      stats: { totalGrades: "Nursery - Grade 09", vacationDays: 38, avgAttendance: "91.8%", avgResult: "GPA 3.85", revenue: "1,80,500" },
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      timeline: "Jan 2023 - Dec 2023",
    },
  ]);

  const handleOpenModal = (type, data = null) => {
    setModalConfig({ isOpen: true, type, data });
  };

  const handleCloseModal = () => {
    setModalConfig({ isOpen: false, type: null, data: null });
  };

  return (
    <div className="min-h-screen py-10 px-6 font-sans" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* EXECUTIVE HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end border-b pb-6 gap-4" style={{ borderColor: theme.colors.border }}>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: theme.colors.textMain }}>
              Academic Sessions
            </h1>
            <p className="text-sm font-medium mt-1" style={{ color: theme.colors.textMuted }}>
              Manage institutional lifecycles, performance history, and session initialization.
            </p>
          </div>
          <button 
            onClick={() => handleOpenModal('create')}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all shadow-md active:scale-95 text-white"
            style={{ backgroundColor: theme.colors.primary }}
          >
            <PlusIcon className="w-4 h-4 stroke-[3]" />
            Initialize New Session
          </button>
        </div>

        {/* PREVIOUS & ACTIVE SESSIONS LIST */}
        <div className="space-y-6">
          {academicYears.map((year) => (
            <div 
              key={year.id} 
              className="border rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md"
              style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
            >
              {/* Card Header */}
              <div className="px-6 py-4 flex justify-between items-center border-b" style={{ backgroundColor: `${theme.colors.background}50`, borderColor: theme.colors.border }}>
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-bold" style={{ color: theme.colors.textMain }}>{year.name}</h2>
                  <StatusBadge status={year.status} />
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex items-center gap-2 font-bold text-[11px] uppercase tracking-wider" style={{ color: theme.colors.textDisabled }}>
                    <CalendarIcon className="w-4 h-4" /> {year.timeline}
                  </div>
                  <button 
                    onClick={() => handleOpenModal('edit', year)}
                    className="p-1.5 rounded border border-transparent hover:bg-white transition-all"
                  >
                    <PencilSquareIcon className="w-4 h-4" style={{ color: theme.colors.textMuted }} />
                  </button>
                </div>
              </div>

              {/* Card Body: Metrics */}
              <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <MetricBox label="Active Grades" value={year.stats.totalGrades} icon={<UserGroupIcon className="w-4 h-4"/>} />
                <MetricBox label="Annual Holidays" value={year.stats.vacationDays} unit="Days" icon={<SunIcon className="w-4 h-4 text-amber-500"/>} />
                <MetricBox label="Avg. Attendance" value={year.stats.avgAttendance} icon={<ChartBarIcon className="w-4 h-4 text-blue-500"/>} />
                <MetricBox label="Avg. Performance" value={year.stats.avgResult} icon={<ChartBarIcon className="w-4 h-4" style={{ color: theme.colors.primary }}/>} />
                <MetricBox label="Total Revenue" value={year.stats.revenue} unit="BDT" icon={<BanknotesIcon className="w-4 h-4"/>} highlight />
              </div>

              {/* Card Footer: Actions */}
              <div className="px-6 py-3 flex justify-between items-center border-t" style={{ backgroundColor: `${theme.colors.background}30`, borderColor: theme.colors.border }}>
                 <button className="text-[10px] font-bold uppercase tracking-widest hover:underline flex items-center gap-1" style={{ color: theme.colors.primary }}>
                   View Full Analytics <ChevronRightIcon className="w-3 h-3" />
                </button>
                {year.status !== 'Archived' && (
                  <button 
                    onClick={() => handleOpenModal('archive', year)}
                    className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest hover:text-red-600 transition-colors"
                    style={{ color: theme.colors.textDisabled }}
                  >
                    <ArchiveBoxIcon className="w-3.5 h-3.5" /> Archive Session
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EXTERNAL MODAL COMPONENT */}
      <AcademicYearModal 
        isOpen={modalConfig.isOpen} 
        type={modalConfig.type} 
        data={modalConfig.data} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

/* --- SHARED UI HELPERS --- */

const MetricBox = ({ label, value, unit, icon, highlight }) => (
  <div className="space-y-1">
    <div className="flex items-center gap-1.5 uppercase tracking-wider text-[10px] font-bold" style={{ color: theme.colors.textDisabled }}>
      {icon} {label}
    </div>
    <div className="flex items-baseline gap-1">
      <p className="text-base font-bold tracking-tight" style={{ color: highlight ? theme.colors.primary : theme.colors.textMain }}>
        {value}
      </p>
      {unit && <span className="text-[9px] font-bold uppercase" style={{ color: theme.colors.textDisabled }}>{unit}</span>}
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const isActive = status === 'Active';
  return (
    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
      isActive ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'
    }`}>
      {status}
    </span>
  );
};

export default AcademicYear;