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
  ArrowsRightLeftIcon
} from "@heroicons/react/24/outline";

const AcademyInfo = () => {
  // Mock data for registered institutes under this user
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
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* INSTITUTE SWITCHER NAVIGATOR */}
        <div className="bg-white border-2 border-slate-100 rounded-3xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-slate-900 p-2.5 rounded-2xl">
              <ArrowsRightLeftIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Switch Institute</p>
              <div className="relative inline-block">
                <select 
                  value={activeCenterId}
                  onChange={(e) => setActiveCenterId(e.target.value)}
                  className="appearance-none bg-transparent pr-8 font-black text-slate-900 focus:outline-none cursor-pointer"
                >
                  {myInstitutes.map((inst) => (
                    <option key={inst.id} value={inst.id}>{inst.name}</option>
                  ))}
                </select>
                <ChevronUpDownIcon className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
              </div>
            </div>
          </div>
          <div className="hidden md:block h-8 w-px bg-slate-100" />
          <div className="hidden md:flex items-center gap-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase italic">Managed by you</span>
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold">
                  {i}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PRIMARY HEADER CARD */}
        <header className="bg-white border-b-8 border-slate-900 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-4 py-1.5 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                  {center.status}
                </span>
                <span className="text-slate-400 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
                  <IdentificationIcon className="w-4 h-4" /> {center.code}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">
                {center.name}
              </h1>
            </div>
            <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 opacity-70">Licensing Tier</p>
              <p className="text-xl font-black text-emerald-400 tracking-tight">{center.subscription}</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: METRICS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-10 shadow-sm">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10">Occupancy</h2>
              <div className="space-y-6">
                <div>
                  <p className="text-6xl font-black text-slate-900 tracking-tighter">{center.currentStudents}</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Active Students</p>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-slate-900" 
                      style={{ width: `${(center.currentStudents/center.studentCapacity)*100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                    <span>Utilization</span>
                    <span>Max: {center.studentCapacity}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-500 rounded-[2.5rem] p-8 text-white flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Faculty Size</p>
                <p className="text-4xl font-black">{center.totalTeachers}</p>
              </div>
              <UserGroupIcon className="w-12 h-12 opacity-30" />
            </div>
          </div>

          {/* RIGHT COLUMN: CORE DATA */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-12">
                <DataRow label="Institutional Address" value={center.address} fullWidth />
                <DataRow label="Regional Hub" value={`${center.district}, ${center.division}`} />
                <DataRow label="Est. Year" value={center.established} />
                <DataRow label="Contact Line" value={center.phone} />
                <DataRow label="Email Access" value={center.email} />
              </div>
            </div>

            <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center">
                  <ShieldCheckIcon className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Master Administrator</p>
                  <p className="text-lg font-black text-slate-900">{center.adminName}</p>
                </div>
              </div>
              <div className="flex gap-10">
                <AuditDate label="Record Created" date={center.createdAt} />
                <AuditDate label="System Update" date={center.updatedAt} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataRow = ({ label, value, fullWidth = false }) => (
  <div className={fullWidth ? "md:col-span-2" : ""}>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{label}</p>
    <p className="text-xl font-bold text-slate-900 leading-tight">{value}</p>
  </div>
);

const AuditDate = ({ label, date }) => (
  <div>
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <div className="flex items-center gap-1.5 text-slate-600 font-bold text-xs uppercase">
      <CalendarDaysIcon className="w-3.5 h-3.5" /> {date}
    </div>
  </div>
);

export default AcademyInfo;