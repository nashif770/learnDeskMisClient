"use client";
import useStudentData from "@/app/Hooks/useStudentData";
import UniversalSearchBar from "@/app/shared/UniversalSearchBar";
import React, { useEffect, useState } from "react";
import { 
  ChartBarSquareIcon, 
  UsersIcon, 
  CalendarIcon, 
  ArrowUpRightIcon 
} from "@heroicons/react/20/solid"; // Using smaller 20px icons

const overallAttendnace = () => {
  const { studentData, isLoading } = useStudentData();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (studentData?.length > 0) {
      setFilteredData(studentData);
    }
  }, [studentData]);

  const totalFilteredStudents = filteredData.length;
  
  const averageAttendance = totalFilteredStudents
    ? (
        filteredData.reduce((acc, s) => acc + (Number(s.present) / Number(s.total)) * 100, 0) /
        totalFilteredStudents
      ).toFixed(1)
    : 0;

  const totalClassDays = filteredData[0]?.total || 0;

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-4 md:p-8 font-sans antialiased text-slate-900">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* --- Minimal Header --- */}
        <div className="flex justify-between items-end border-b border-slate-100 pb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Attendance</h1>
            <p className="text-xs font-medium text-slate-500 mt-1">
              Spring 2026 Academic Cycle
            </p>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">System Status</span>
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Live Sync Active
            </span>
          </div>
        </div>

        {/* --- Modern Metric Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MetricCard 
            label="Enrollment" 
            value={isLoading ? "..." : totalFilteredStudents} 
            icon={<UsersIcon className="w-4 h-4" />}
            isLoading={isLoading}
          />
          <MetricCard 
            label="Avg. Rate" 
            value={isLoading ? "..." : `${averageAttendance}%`} 
            icon={<ArrowUpRightIcon className="w-4 h-4" />}
            isLoading={isLoading}
            isIndigo
          />
          <MetricCard 
            label="Class Days" 
            value={isLoading ? "..." : totalClassDays} 
            icon={<CalendarIcon className="w-4 h-4" />}
            isLoading={isLoading}
          />
        </div>

        {/* --- Search Interface --- */}
        <div className="bg-white rounded-xl border border-slate-200/60 p-2 shadow-sm">
          <UniversalSearchBar
            data={studentData || []}
            filterKeys={["class"]}
            sortKeys={["Id", "class", "userNameEn"]}
            onFilter={(data) => setFilteredData(data)}
          />
        </div>

        {/* --- High-Density Table --- */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">#</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Student Details</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Days</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Present</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Progress</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {!isLoading && filteredData.map((s, index) => {
                  const percentage = ((Number(s.present) / Number(s.total)) * 100).toFixed(0);
                  const isWarning = parseInt(percentage) < 75;

                  return (
                    <tr key={s.Id || index} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-4 py-3 text-xs font-medium text-slate-400 text-center">{index + 1}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">{s.userNameEn}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Class {s.class || "—"}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-xs font-semibold text-slate-600">{s.total}</td>
                      <td className="px-4 py-3 text-center text-xs font-bold text-emerald-600">{s.present}</td>
                      <td className="px-4 py-3 min-w-[140px]">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${isWarning ? 'bg-rose-500' : 'bg-indigo-500'}`} 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className={`text-[11px] font-bold w-7 ${isWarning ? 'text-rose-500' : 'text-slate-700'}`}>
                            {percentage}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter ${
                          isWarning 
                            ? 'bg-rose-50 text-rose-600' 
                            : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          {isWarning ? 'Attention' : 'Optimal'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, icon, isLoading, isIndigo }) => (
  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      {isLoading ? (
        <div className="h-6 w-16 bg-slate-100 animate-pulse rounded" />
      ) : (
        <p className={`text-xl font-bold tracking-tight ${isIndigo ? 'text-indigo-600' : 'text-slate-900'}`}>{value}</p>
      )}
    </div>
    <div className={`p-2 rounded-lg ${isIndigo ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400'}`}>
      {icon}
    </div>
  </div>
);

export default overallAttendnace;