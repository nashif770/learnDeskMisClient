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
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 space-y-10">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight flex items-center gap-4">
              Attendance Analytics
            </h1>
            <p className="text-gray-500 md:text-xl font-medium mt-2 md:mt-3 italic">
              Real-time monitoring of student presence and academic engagement.
            </p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl border border-gray-200 shadow-sm text-right">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Academic Term</p>
            <p className="text-lg font-black text-emerald-600">Spring 2026</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
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

        {/* Search Bar */}
        <div className="bg-white p-4 md:p-5 rounded-2xl shadow-md border border-gray-200">
          <UniversalSearchBar
            data={studentData || []}
            filterKeys={["class"]}
            sortKeys={["Id", "class", "userNameEn"]}
            onFilter={(data) => setFilteredData(data)}
          />
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-separate border-spacing-0">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 md:px-10 py-4 text-xs md:text-sm font-black text-gray-500 uppercase tracking-widest text-center">SL</th>
                  <th className="px-4 md:px-8 py-4 text-xs md:text-sm font-black text-gray-500 uppercase tracking-widest text-left">Student</th>
                  <th className="px-4 md:px-8 py-4 text-xs md:text-sm font-black text-gray-500 uppercase tracking-widest text-center">Sessions</th>
                  <th className="px-4 md:px-8 py-4 text-xs md:text-sm font-black text-gray-500 uppercase tracking-widest text-center">Present</th>
                  <th className="px-4 md:px-8 py-4 text-xs md:text-sm font-black text-gray-500 uppercase tracking-widest text-center">Performance</th>
                  <th className="px-4 md:px-10 py-4 text-xs md:text-sm font-black text-gray-500 uppercase tracking-widest text-center">Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.length > 0 ? (
                  filteredData.map((s, index) => {
                    const percentage = ((s.present / s.total) * 100).toFixed(1);
                    const isWarning = parseFloat(percentage) < 75;

                    return (
                      <tr key={s.Id || index} className="hover:bg-gray-50 transition-all">
                        <td className="px-4 md:px-10 py-4 text-sm font-mono font-bold text-gray-400 text-center">{String(index + 1).padStart(2, '0')}</td>
                        <td className="px-4 md:px-8 py-4">
                          <p className="text-base md:text-lg font-bold text-gray-800">{s.userNameEn}</p>
                          <p className="text-xs md:text-sm text-gray-400 uppercase tracking-wide mt-0.5">
                            Class: {s.class || "N/A"}
                          </p>
                        </td>
                        <td className="px-4 md:px-8 py-4 text-center text-sm md:text-base font-bold text-gray-700">{s.total}</td>
                        <td className="px-4 md:px-8 py-4 text-center text-sm md:text-base font-black text-emerald-600">{s.present}</td>
                        <td className="px-4 md:px-8 py-4 text-center">
                          <div className="w-full max-w-xs mx-auto">
                            <span className={`text-base md:text-lg font-black ${isWarning ? 'text-rose-500' : 'text-blue-600'}`}>
                              {percentage}%
                            </span>
                            <div className="h-2 w-full bg-gray-200 rounded-full mt-2 overflow-hidden">
                              <div 
                                className={`h-full ${isWarning ? 'bg-rose-500' : 'bg-blue-500'}`} 
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 md:px-10 py-4 text-center">
                          <div className={`inline-flex items-center px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wide border-2 ${
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
                    <td colSpan="6" className="py-20 text-center">
                      <p className="text-gray-400 font-black text-xl md:text-2xl italic uppercase opacity-40">
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
  <div className="bg-white p-6 md:p-8 rounded-3xl shadow-md border border-gray-200 flex items-center justify-between transition-all hover:shadow-lg hover:border-gray-300">
    <div className="space-y-1 md:space-y-2">
      <p className="text-xs md:text-sm font-black text-gray-400 uppercase tracking-widest">{label}</p>
      <p className="text-3xl md:text-5xl font-black text-gray-800 tracking-tight">{value}</p>
      <p className="text-sm md:text-base font-bold text-gray-500 italic">{sub}</p>
    </div>
    <div className={`w-16 h-16 md:w-20 md:h-20 bg-${color}-50 rounded-3xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner`}>
      {icon}
    </div>
  </div>
);

export default StudentAttendance;
