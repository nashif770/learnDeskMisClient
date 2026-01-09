"use client";
import React, { useState } from "react";
import { 
  BuildingOfficeIcon, 
  MapPinIcon, 
  UserGroupIcon, 
  ShieldCheckIcon,
  IdentificationIcon,
  ChevronUpDownIcon,
  CalendarDaysIcon,
  ArrowsRightLeftIcon,
  EnvelopeIcon,
  PhoneIcon
} from "@heroicons/react/24/outline";

const AcademyInfo = () => {
  const myInstitutes = [
    { id: "USTI-MYM-01", name: "UCEP Mymensingh TVET" },
    { id: "USTI-DHK-04", name: "UCEP Gazipur Campus" },
    { id: "USTI-CTG-02", name: "UCEP Chittagong Institute" },
  ];

  const [activeCenterId, setActiveCenterId] = useState(myInstitutes[0].id);

  const center = {
    name: "UCEP Skills Training Institute – Mymensingh",
    code: activeCenterId,
    type: "TVET Training Center",
    established: 2015,
    status: "Active",
    address: "Kanchijhuli, Mymensingh Sadar, Mymensingh",
    district: "Mymensingh",
    division: "Mymensingh",
    phone: "+880 1712-345678",
    email: "mymensingh@ucepbd.org",
    adminName: "Nashif Ahmed",
    subscription: "Enterprise Plan",
    studentCapacity: 500,
    currentStudents: 380,
    totalTeachers: 24,
    createdAt: "12 March 2024",
    updatedAt: "02 January 2026",
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-6 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* TOP NAV: INSTITUTE SWITCHER */}
        <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col md:flex-row items-center justify-between shadow-sm gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="bg-indigo-600 p-2 rounded-lg shrink-0">
              <ArrowsRightLeftIcon className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Active Institution</span>
              <div className="relative inline-block">
                <select 
                  value={activeCenterId}
                  onChange={(e) => setActiveCenterId(e.target.value)}
                  className="appearance-none bg-transparent pr-8 font-bold text-slate-900 focus:outline-none cursor-pointer text-sm"
                >
                  {myInstitutes.map((inst) => (
                    <option key={inst.id} value={inst.id}>{inst.name}</option>
                  ))}
                </select>
                <ChevronUpDownIcon className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
              </div>
            </div>
          </div>
          <div className="hidden md:block h-8 w-px bg-slate-200" />
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Administrative Access</span>
            <div className="flex -space-x-2">
              {[1, 2].map((i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-slate-800 flex items-center justify-center text-[10px] text-white font-bold">
                  {i === 1 ? 'JD' : 'NA'}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HEADER SECTION */}
        <header className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded border border-emerald-200">
                  {center.status}
                </span>
                <span className="text-slate-400 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 border-l border-slate-200 pl-3">
                  <IdentificationIcon className="w-4 h-4" /> {center.code}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                {center.name}
              </h1>
              <p className="text-slate-500 font-medium flex items-center gap-2 uppercase text-xs tracking-widest">
                <BuildingOfficeIcon className="w-4 h-4 text-indigo-600" /> {center.type}
              </p>
            </div>
            <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg border-b-4 border-indigo-500 min-w-[200px]">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Service Tier</p>
              <p className="text-xl font-bold text-white tracking-tight">{center.subscription}</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* STATS COLUMN */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">Capacity Utilization</p>
              <div className="space-y-6">
                <div>
                  <p className="text-5xl font-bold text-slate-900 tracking-tight">{center.currentStudents}</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Enrolled Students</p>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 rounded-full" 
                      style={{ width: `${(center.currentStudents/center.studentCapacity)*100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400 tracking-tighter">
                    <span>{Math.round((center.currentStudents/center.studentCapacity)*100)}% Occupied</span>
                    <span>Max Limit: {center.studentCapacity}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-600 rounded-xl p-6 text-white flex items-center justify-between shadow-md">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 mb-1">Faculty Strength</p>
                <p className="text-3xl font-bold">{center.totalTeachers} Teachers</p>
              </div>
              <UserGroupIcon className="w-10 h-10 text-indigo-400 opacity-50" />
            </div>
          </div>

          {/* CORE DATA COLUMN */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                <DataRow label="Institutional Address" value={center.address} icon={<MapPinIcon className="w-4 h-4"/>} fullWidth />
                <DataRow label="Regional Hub" value={`${center.district}, ${center.division}`} />
                <DataRow label="Founding Year" value={center.established} />
                <DataRow label="Official Contact" value={center.phone} icon={<PhoneIcon className="w-4 h-4"/>} />
                <DataRow label="Email Access" value={center.email} icon={<EnvelopeIcon className="w-4 h-4"/>} />
              </div>
              
              {/* SYSTEM FOOTER */}
              <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
                    <ShieldCheckIcon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Principal Admin</p>
                    <p className="text-base font-bold text-slate-800">{center.adminName}</p>
                  </div>
                </div>
                <div className="flex gap-8">
                  <AuditDate label="Onboarding Date" date={center.createdAt} />
                  <AuditDate label="Last Sync" date={center.updatedAt} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* REUSABLE UI HELPERS */

const DataRow = ({ label, value, icon, fullWidth = false }) => (
  <div className={fullWidth ? "md:col-span-2" : ""}>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
      {label}
    </p>
    <p className="text-lg font-bold text-slate-800 leading-tight">
      {value}
    </p>
  </div>
);

const AuditDate = ({ label, date }) => (
  <div className="text-right md:text-left">
    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <div className="flex items-center gap-1.5 text-slate-700 font-bold text-xs">
      <CalendarDaysIcon className="w-3.5 h-3.5 text-slate-400" /> {date}
    </div>
  </div>
);

export default AcademyInfo;