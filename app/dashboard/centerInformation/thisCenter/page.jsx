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
import theme from "@/theme";

const thisCenter = () => {
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
    <div 
      className="min-h-screen py-6 px-4 font-sans"
      style={{ backgroundColor: theme.colors.background, color: theme.colors.textMain }}
    >
      <div className="max-w-5xl mx-auto space-y-4">
        
        {/* TOP NAV: COMPACT INSTITUTE SWITCHER */}
        <div 
          className="border rounded-lg p-2.5 flex flex-col md:flex-row items-center justify-between shadow-sm gap-3"
          style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
        >
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div 
              className="p-1.5 rounded-md shrink-0 shadow-sm"
              style={{ backgroundColor: theme.colors.primary }}
            >
              <ArrowsRightLeftIcon className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span 
                className="text-[9px] font-bold uppercase tracking-wider leading-none mb-1"
                style={{ color: theme.colors.textDisabled }}
              >
                Active Institution
              </span>
              <div className="relative inline-block">
                <select 
                  value={activeCenterId}
                  onChange={(e) => setActiveCenterId(e.target.value)}
                  className="appearance-none bg-transparent pr-6 font-bold focus:outline-none cursor-pointer text-xs"
                  style={{ color: theme.colors.textMain }}
                >
                  {myInstitutes.map((inst) => (
                    <option key={inst.id} value={inst.id}>{inst.name}</option>
                  ))}
                </select>
                <ChevronUpDownIcon 
                  className="w-3 h-3 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: theme.colors.textDisabled }}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span 
              className="text-[9px] font-bold uppercase tracking-widest"
              style={{ color: theme.colors.textDisabled }}
            >
              Admin Access
            </span>
            <div className="flex -space-x-1.5">
              {['JD', 'NA'].map((initials, i) => (
                <div 
                  key={i} 
                  className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-[8px] text-white font-bold"
                  style={{ backgroundColor: theme.colors.textMain, borderColor: theme.colors.surface }}
                >
                  {initials}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COMPACT HEADER SECTION */}
        <header 
          className="border rounded-lg p-5 shadow-sm"
          style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span 
                  className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded border"
                  style={{ 
                    backgroundColor: `${theme.colors.primary}10`, 
                    color: theme.colors.primary,
                    borderColor: `${theme.colors.primary}30`
                  }}
                >
                  {center.status}
                </span>
                <span 
                  className="font-bold text-[10px] uppercase tracking-widest flex items-center gap-1 border-l pl-2"
                  style={{ color: theme.colors.textDisabled, borderColor: theme.colors.border }}
                >
                  <IdentificationIcon className="w-3 h-3" /> {center.code}
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight leading-tight" style={{ color: theme.colors.textMain }}>
                {center.name}
              </h1>
              <p 
                className="font-semibold flex items-center gap-1.5 uppercase text-[10px] tracking-wider"
                style={{ color: theme.colors.textMuted }}
              >
                <BuildingOfficeIcon className="w-3 h-3" style={{ color: theme.colors.primary }} /> {center.type}
              </p>
            </div>
            <div 
              className="py-3 px-4 rounded-lg border-b-2 w-full md:w-auto shadow-md"
              style={{ backgroundColor: theme.colors.textMain, borderColor: theme.colors.primary }}
            >
              <p 
                className="text-[8px] font-bold uppercase tracking-widest mb-0.5"
                style={{ color: theme.colors.textDisabled }}
              >
                Service Tier
              </p>
              <p className="text-sm font-bold text-white tracking-wide">{center.subscription}</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* STATS COLUMN */}
          <div className="lg:col-span-4 space-y-4">
            <div 
              className="border rounded-lg p-5 shadow-sm"
              style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
            >
              <p 
                className="text-[9px] font-bold uppercase tracking-widest mb-4"
                style={{ color: theme.colors.textDisabled }}
              >
                Capacity Utilization
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-3xl font-extrabold tracking-tight" style={{ color: theme.colors.textMain }}>
                    {center.currentStudents}
                  </p>
                  <p 
                    className="text-[9px] font-bold uppercase tracking-wider mt-0.5"
                    style={{ color: theme.colors.textMuted }}
                  >
                    Enrolled Students
                  </p>
                </div>
                <div className="space-y-1.5">
                  <div 
                    className="h-1.5 w-full rounded-full overflow-hidden"
                    style={{ backgroundColor: theme.colors.background }}
                  >
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: `${(center.currentStudents/center.studentCapacity)*100}%`,
                        backgroundColor: theme.colors.primary 
                      }}
                    />
                  </div>
                  <div 
                    className="flex justify-between text-[8px] font-bold uppercase tracking-tighter"
                    style={{ color: theme.colors.textDisabled }}
                  >
                    <span style={{ color: theme.colors.primary }}>
                      {Math.round((center.currentStudents/center.studentCapacity)*100)}% Occupied
                    </span>
                    <span>Limit: {center.studentCapacity}</span>
                  </div>
                </div>
              </div>
            </div>

            <div 
              className="rounded-lg p-4 text-white flex items-center justify-between border-l-4 shadow-sm"
              style={{ backgroundColor: theme.colors.textMain, borderLeftColor: theme.colors.primary }}
            >
              <div>
                <p 
                  className="text-[8px] font-bold uppercase tracking-widest mb-0.5"
                  style={{ color: theme.colors.textDisabled }}
                >
                  Faculty Strength
                </p>
                <p className="text-xl font-bold">{center.totalTeachers} Teachers</p>
              </div>
              <UserGroupIcon className="w-6 h-6 opacity-20" />
            </div>
          </div>

          {/* CORE DATA COLUMN */}
          <div className="lg:col-span-8">
            <div 
              className="border rounded-lg p-6 shadow-sm h-full flex flex-col justify-between"
              style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                <DataRow label="Address" value={center.address} icon={<MapPinIcon className="w-3 h-3"/>} fullWidth />
                <DataRow label="Regional Hub" value={`${center.district}, ${center.division}`} />
                <DataRow label="Founding Year" value={center.established} />
                <DataRow label="Contact" value={center.phone} icon={<PhoneIcon className="w-3 h-3"/>} />
                <DataRow label="Email" value={center.email} icon={<EnvelopeIcon className="w-3 h-3"/>} />
              </div>
              
              {/* SYSTEM FOOTER */}
              <div 
                className="mt-8 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4"
                style={{ borderColor: theme.colors.border }}
              >
                <div className="flex items-center gap-2.5">
                  <div 
                    className="w-8 h-8 rounded flex items-center justify-center border"
                    style={{ backgroundColor: theme.colors.background, borderColor: theme.colors.border }}
                  >
                    <ShieldCheckIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
                  </div>
                  <div>
                    <p 
                      className="text-[8px] font-bold uppercase tracking-widest"
                      style={{ color: theme.colors.textDisabled }}
                    >
                      Principal Admin
                    </p>
                    <p className="text-xs font-bold" style={{ color: theme.colors.textMain }}>{center.adminName}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <AuditDate label="Created" date={center.createdAt} />
                  <AuditDate label="Sync" date={center.updatedAt} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* COMPACT UI HELPERS */

const DataRow = ({ label, value, icon, fullWidth = false }) => (
  <div className={fullWidth ? "md:col-span-2" : ""}>
    <p 
      className="text-[9px] font-bold uppercase tracking-widest mb-1 flex items-center gap-1"
      style={{ color: theme.colors.textDisabled }}
    >
      {icon && React.cloneElement(icon, { style: { color: theme.colors.primary } })} {label}
    </p>
    <p className="text-sm font-semibold leading-snug" style={{ color: theme.colors.textMain }}>
      {value}
    </p>
  </div>
);

const AuditDate = ({ label, date }) => (
  <div className="text-right md:text-left">
    <p 
      className="text-[8px] font-bold uppercase tracking-widest mb-0.5"
      style={{ color: theme.colors.textDisabled }}
    >
      {label}
    </p>
    <div 
      className="flex items-center gap-1 font-bold text-[10px]"
      style={{ color: theme.colors.textMuted }}
    >
      <CalendarDaysIcon className="w-3 h-3" style={{ color: theme.colors.textDisabled }} /> {date}
    </div>
  </div>
);

export default thisCenter;