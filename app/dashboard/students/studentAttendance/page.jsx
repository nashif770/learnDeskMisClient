"use client";
import useStudentData from "@/app/Hooks/useStudentData";
import UniversalSearchBar from "@/app/shared/UniversalSearchBar";
import React, { useEffect, useState } from "react";
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  CalendarDaysIcon, 
  ArrowTrendingUpIcon 
} from "@heroicons/react/24/outline";

const StudentAttendance = () => {
  const { studentData } = useStudentData();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (studentData?.length > 0) {
      setFilteredData(studentData);
    }
  }, [studentData]);

  const totalFilteredStudents = filteredData.length;
  
  const averageAttendance = totalFilteredStudents
    ? (
        filteredData.reduce((acc, s) => acc + (s.present / s.total) * 100, 0) /
        totalFilteredStudents
      ).toFixed(1)
    : 0;

  const totalClassDays = filteredData[0]?.total || 0;

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 md:p-12 space-y-10">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight flex items-center gap-4">
              Attendance Analytics
            </h1>
            <p className="text-slate-500 font-medium mt-3 text-xl italic italic">
              Real-time monitoring of student presence and academic engagement.
            </p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl border border-slate-200 shadow-sm text-right">
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Academic Term</p>
            <p className="text-lg font-black text-emerald-600">Spring 2026</p>
          </div>
        </div>

        {/* Enhanced Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SummaryCard 
            label="Total Enrollment" 
            value={totalFilteredStudents} 
            sub="Active Database"
            icon={<UserGroupIcon className="w-8 h-8 text-emerald-600" />}
            color="emerald"
          />
          <SummaryCard 
            label="Avg. Attendance" 
            value={`${averageAttendance}%`} 
            sub="System Performance"
            icon={<ArrowTrendingUpIcon className="w-8 h-8 text-blue-600" />}
            color="blue"
          />
          <SummaryCard 
            label="Total Class Days" 
            value={totalClassDays} 
            sub="Year to Date"
            icon={<CalendarDaysIcon className="w-8 h-8 text-purple-600" />}
            color="purple"
          />
        </div>

        {/* Search & Utility Bar */}
        <div className="bg-white p-5 rounded-[2.5rem] shadow-sm border border-slate-100">
          <UniversalSearchBar
            data={studentData || []}
            filterKeys={["class"]}
            sortKeys={["Id", "class", "userNameEn"]}
            onFilter={(data) => setFilteredData(data)}
          />
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">SL</th>
                  <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Student</th>
                  <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em] text-center">Sessions</th>
                  <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em] text-center">Present</th>
                  <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em] text-center">Performance</th>
                  <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredData.length > 0 ? (
                  filteredData.map((s, index) => {
                    const percentage = ((s.present / s.total) * 100).toFixed(1);
                    const isWarning = parseFloat(percentage) < 75;

                    return (
                      <tr key={s.Id || index} className="hover:bg-slate-50/30 transition-all group">
                        <td className="px-10 py-8 text-sm font-black text-slate-300 font-mono">
                          {String(index + 1).padStart(2, '0')}
                        </td>
                        <td className="px-8 py-8">
                          <p className="text-lg font-black text-slate-800 tracking-tight">{s.userNameEn}</p>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                            Class: {s.class || "N/A"}
                          </p>
                        </td>
                        <td className="px-8 py-8 text-center text-base font-bold text-slate-600">
                          {s.total}
                        </td>
                        <td className="px-8 py-8 text-center text-base font-black text-emerald-600">
                          {s.present}
                        </td>
                        <td className="px-8 py-8 text-center">
                          <div className="inline-block">
                            <span className={`text-xl font-black ${isWarning ? 'text-rose-500' : 'text-blue-600'}`}>
                              {percentage}%
                            </span>
                            <div className={`h-1.5 w-full rounded-full mt-2 bg-slate-100 overflow-hidden`}>
                                <div 
                                  className={`h-full ${isWarning ? 'bg-rose-500' : 'bg-blue-500'}`} 
                                  style={{ width: `${percentage}%` }}
                                />
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-8">
                          <div className={`inline-flex items-center px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest border-2 ${
                            isWarning 
                              ? 'bg-rose-50 text-rose-600 border-rose-100 shadow-sm shadow-rose-50' 
                              : 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm shadow-emerald-50'
                          }`}>
                            {isWarning ? '⚠️ Low' : '✅ Stable'}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="py-32 text-center">
                      <p className="text-slate-300 font-black text-2xl uppercase tracking-widest opacity-40 italic">
                        No Attendance Data Found
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ label, value, sub, icon, color }) => (
  <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 flex items-center justify-between group hover:border-slate-300 transition-all">
    <div className="space-y-2">
      <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{label}</p>
      <p className="text-5xl font-black text-slate-800 tracking-tighter">{value}</p>
      <p className="text-sm font-bold text-slate-500 italic">{sub}</p>
    </div>
    <div className={`w-20 h-20 bg-${color}-50 rounded-3xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner`}>
      {icon}
    </div>
  </div>
);

export default StudentAttendance;