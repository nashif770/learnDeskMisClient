"use client";
import React, { useState } from "react";
import { 
  PlusIcon, 
  CalendarIcon, 
  BanknotesIcon, 
  ChartBarIcon, 
  UserGroupIcon, 
  SunIcon,
  XMarkIcon,
  PencilSquareIcon,
  ArchiveBoxIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

const AcademicYear = () => {
  const [modalType, setModalType] = useState(null); 
  const [selectedYear, setSelectedYear] = useState(null);

  const [academicYears] = useState([
    {
      id: "ay1",
      name: "2024–2025",
      status: "Active",
      stats: {
        totalGrades: "Nursery - Grade 10",
        vacationDays: 42,
        avgAttendance: "94.2%",
        avgResult: "GPA 4.10",
        revenue: "2,40,000",
      },
      startDate: "2024-01-01",
      endDate: "2025-12-31",
      timeline: "Jan 2024 - Dec 2025",
    },
    {
      id: "ay2",
      name: "2023–2024",
      status: "Archived",
      stats: {
        totalGrades: "Nursery - Grade 09",
        vacationDays: 38,
        avgAttendance: "91.8%",
        avgResult: "GPA 3.85",
        revenue: "1,80,500",
      },
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      timeline: "Jan 2023 - Dec 2023",
    },
  ]);

  const openModal = (type, year = null) => {
    setSelectedYear(year);
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedYear(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* EXECUTIVE HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-slate-300 pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Academic Sessions</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">Institutional performance and lifecycle management.</p>
          </div>
          <button 
            onClick={() => openModal('create')}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-md active:scale-95"
          >
            <PlusIcon className="w-4 h-4 stroke-[3]" />
            New Session
          </button>
        </div>

        {/* YEAR CARDS */}
        <div className="space-y-6">
          {academicYears.map((year) => (
            <div key={year.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-6 py-4 flex justify-between items-center border-b border-slate-200">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-bold text-slate-800">{year.name}</h2>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    year.status === 'Active' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {year.status}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex items-center gap-2 text-slate-400 font-bold text-[11px] uppercase tracking-wider">
                    <CalendarIcon className="w-4 h-4" /> {year.timeline}
                  </div>
                  <button onClick={() => openModal('edit', year)} className="p-1.5 hover:bg-white rounded border border-transparent hover:border-slate-200 transition-all">
                    <PencilSquareIcon className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <MetricBox label="Active Grades" value={year.stats.totalGrades} icon={<UserGroupIcon className="w-4 h-4"/>} />
                <MetricBox label="Annual Holidays" value={year.stats.vacationDays} unit="Days" icon={<SunIcon className="w-4 h-4 text-amber-500"/>} />
                <MetricBox label="Avg. Attendance" value={year.stats.avgAttendance} icon={<ChartBarIcon className="w-4 h-4 text-blue-500"/>} />
                <MetricBox label="Avg. Performance" value={year.stats.avgResult} icon={<ChartBarIcon className="w-4 h-4 text-indigo-500"/>} />
                <MetricBox label="Total Revenue" value={year.stats.revenue} unit="BDT" icon={<BanknotesIcon className="w-4 h-4 text-slate-900"/>} highlight />
              </div>

              <div className="px-6 py-3 bg-slate-50/50 flex justify-between items-center border-t border-slate-100">
                 <button className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest hover:underline flex items-center gap-1">
                  View Full Analytics <ChevronRightIcon className="w-3 h-3" />
                </button>
                <button 
                  onClick={() => openModal('archive', year)}
                  className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-red-600 transition-colors"
                >
                  <ArchiveBoxIcon className="w-3.5 h-3.5" /> Archive
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL SYSTEM */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" onClick={closeModal} />
          
          <div className="relative bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden">
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <h2 className="text-xl font-bold text-slate-800">
                  {modalType === 'create' && "Initialize Session"}
                  {modalType === 'edit' && "Modify Session"}
                  {modalType === 'archive' && "Archive Data"}
                </h2>
                <button onClick={closeModal} className="p-1 hover:bg-slate-100 rounded transition-colors">
                  <XMarkIcon className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              {modalType === 'archive' ? (
                <div className="space-y-6">
                  <p className="text-slate-600 font-medium text-sm leading-relaxed">
                    Are you sure you want to archive <span className="font-bold text-slate-900">{selectedYear?.name}</span>? 
                    This finalized all records and moves the data to the read-only historical vault.
                  </p>
                  <div className="flex gap-3">
                    <button onClick={closeModal} className="flex-1 py-3 rounded-lg font-bold text-xs text-slate-500 border border-slate-200 hover:bg-slate-50 transition-colors">CANCEL</button>
                    <button className="flex-1 py-3 rounded-lg font-bold text-xs text-white bg-red-600 hover:bg-red-700 transition-colors shadow-md">ARCHIVE SESSION</button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Session Label" placeholder="e.g. 2025–2026" defaultValue={selectedYear?.name} fullWidth />
                    <FormField label="Start Date" type="date" defaultValue={selectedYear?.startDate} />
                    <FormField label="End Date" type="date" defaultValue={selectedYear?.endDate} />
                    <FormField label="Revenue Target" placeholder="BDT" defaultValue={selectedYear?.stats.revenue} />
                    <FormField label="System Status" type="select" options={['Active', 'Upcoming', 'Archived']} defaultValue={selectedYear?.status} />
                  </div>
                  
                  <button className="w-full bg-indigo-600 text-white py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-md active:scale-[0.98] mt-4">
                    {modalType === 'create' ? "Confirm Initialization" : "Save Changes"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const MetricBox = ({ label, value, unit, icon, highlight }) => (
  <div className="space-y-2">
    <div className="flex items-center gap-1.5 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
      {icon} {label}
    </div>
    <div className="flex items-baseline gap-1">
      <p className={`text-lg font-bold tracking-tight ${highlight ? 'text-indigo-600' : 'text-slate-800'}`}>
        {value}
      </p>
      {unit && <span className="text-[9px] font-bold text-slate-400 uppercase">{unit}</span>}
    </div>
  </div>
);

const FormField = ({ label, type = "text", placeholder, defaultValue, fullWidth, options }) => (
  <div className={fullWidth ? "col-span-2 space-y-1.5" : "space-y-1.5"}>
    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{label}</label>
    {type === "select" ? (
      <select defaultValue={defaultValue} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm font-semibold outline-none focus:border-indigo-600 appearance-none">
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    ) : (
      <input 
        type={type} 
        placeholder={placeholder} 
        defaultValue={defaultValue}
        className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm font-semibold outline-none focus:border-indigo-600 transition-all" 
      />
    )}
  </div>
);

export default AcademicYear;