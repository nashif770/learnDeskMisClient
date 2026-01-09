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
  ArchiveBoxIcon
} from "@heroicons/react/24/outline";

const AcademicYear = () => {
  // Modal States
  const [modalType, setModalType] = useState(null); // 'create' | 'edit' | 'archive' | null
  const [selectedYear, setSelectedYear] = useState(null);

  const [academicYears, setAcademicYears] = useState([
    {
      id: "ay1",
      name: "2024–2025",
      status: "Active",
      stats: {
        totalGrades: "Nursery - Grade 10",
        vacationDays: 42,
        avgAttendance: "94.2%",
        avgResult: "GPA 4.10",
        revenue: "৳ 1,240,000",
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
        revenue: "৳ 980,500",
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
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-6 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-4 border-slate-900 pb-8 gap-4">
          <div>
            <h1 className="text-5xl font-black tracking-tighter uppercase">Academic Sessions</h1>
            <p className="text-lg text-slate-500 font-bold mt-2">Executive summary of institutional performance by year.</p>
          </div>
          <button 
            onClick={() => openModal('create')}
            className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-emerald-600 transition-all shadow-xl active:scale-95"
          >
            <PlusIcon className="w-6 h-6 stroke-[3]" />
            CREATE NEW YEAR
          </button>
        </div>

        {/* YEAR CARDS */}
        <div className="grid grid-cols-1 gap-8">
          {academicYears.map((year) => (
            <div key={year.id} className="bg-white border-2 border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-8 py-6 flex justify-between items-center border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-black">{year.name}</h2>
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                    year.status === 'Active' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {year.status}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-slate-400 font-bold text-sm uppercase">
                    <CalendarIcon className="w-5 h-5" /> {year.timeline}
                  </div>
                  <button onClick={() => openModal('edit', year)} className="p-2 hover:bg-white rounded-xl transition-colors border border-transparent hover:border-slate-200">
                    <PencilSquareIcon className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                <MetricBox label="Grades Running" value={year.stats.totalGrades} icon={<UserGroupIcon className="w-5 h-5"/>} />
                <MetricBox label="Vacation Days" value={year.stats.vacationDays} unit="Days" icon={<SunIcon className="w-5 h-5 text-amber-500"/>} />
                <MetricBox label="Avg. Attendance" value={year.stats.avgAttendance} icon={<ChartBarIcon className="w-5 h-5 text-blue-500"/>} />
                <MetricBox label="Academic Result" value={year.stats.avgResult} icon={<ChartBarIcon className="w-5 h-5 text-emerald-500"/>} />
                <MetricBox label="Collection" value={year.stats.revenue} icon={<BanknotesIcon className="w-5 h-5 text-slate-900"/>} highlight />
              </div>

              <div className="px-8 py-4 bg-slate-50/50 flex justify-end gap-6 border-t border-slate-100">
                <button 
                  onClick={() => openModal('archive', year)}
                  className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-red-500 transition-colors"
                >
                  <ArchiveBoxIcon className="w-4 h-4" /> Archive Data
                </button>
                <button className="text-[11px] font-black text-slate-900 uppercase tracking-widest hover:text-emerald-600">Full Analytics Report</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL SYSTEM */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeModal} />
          
          <div className="relative bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-10 space-y-8">
              {/* Modal Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black tracking-tight">
                  {modalType === 'create' && "Initialize New Year"}
                  {modalType === 'edit' && `Edit Session: ${selectedYear?.name}`}
                  {modalType === 'archive' && "Archive Session"}
                </h2>
                <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <XMarkIcon className="w-8 h-8 text-slate-400" />
                </button>
              </div>

              {/* Modal Body */}
              {modalType === 'archive' ? (
                <div className="space-y-6">
                  <p className="text-slate-600 font-medium text-lg leading-relaxed">
                    Are you sure you want to archive <span className="font-black text-slate-900">{selectedYear?.name}</span>? 
                    This will move the session to history and finalize all financial records.
                  </p>
                  <div className="flex gap-4 pt-4">
                    <button onClick={closeModal} className="flex-1 py-4 rounded-2xl font-black text-slate-400 border-2 border-slate-100 hover:bg-slate-50 transition-colors">CANCEL</button>
                    <button className="flex-1 py-4 rounded-2xl font-black text-white bg-red-500 hover:bg-red-600 transition-colors shadow-lg shadow-red-100">CONFIRM ARCHIVE</button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <FormField label="Session Name" placeholder="e.g. 2025–2026" defaultValue={selectedYear?.name} fullWidth />
                    <FormField label="Start Date" type="date" defaultValue={selectedYear?.startDate} />
                    <FormField label="End Date" type="date" defaultValue={selectedYear?.endDate} />
                    <FormField label="Target Revenue (Optional)" placeholder="৳" defaultValue={selectedYear?.stats.revenue} />
                    <FormField label="Status" type="select" options={['Active', 'Upcoming', 'Archived']} defaultValue={selectedYear?.status} />
                  </div>
                  
                  <button className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black text-xl hover:bg-emerald-600 transition-all shadow-xl active:scale-[0.98]">
                    {modalType === 'create' ? "INITIALIZE SESSION" : "UPDATE SESSION DATA"}
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
  <div className={`space-y-3 ${highlight ? 'bg-slate-50 rounded-3xl p-4 -m-4' : ''}`}>
    <div className="flex items-center gap-2 text-slate-400 uppercase tracking-widest text-[10px] font-black">
      {icon} {label}
    </div>
    <div className="flex items-baseline gap-1">
      <p className={`text-xl font-black tracking-tight ${highlight ? 'text-slate-900 underline decoration-emerald-400 decoration-4' : 'text-slate-800'}`}>
        {value}
      </p>
      {unit && <span className="text-[10px] font-bold text-slate-400 uppercase">{unit}</span>}
    </div>
  </div>
);

const FormField = ({ label, type = "text", placeholder, defaultValue, fullWidth, options }) => (
  <div className={fullWidth ? "col-span-2 space-y-2" : "space-y-2"}>
    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">{label}</label>
    {type === "select" ? (
      <select defaultValue={defaultValue} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold outline-none focus:border-slate-900 appearance-none">
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    ) : (
      <input 
        type={type} 
        placeholder={placeholder} 
        defaultValue={defaultValue}
        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold outline-none focus:border-slate-900 transition-all" 
      />
    )}
  </div>
);

export default AcademicYear;