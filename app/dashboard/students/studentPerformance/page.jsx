"use client";
import React, { useState, useEffect } from "react";
import useStudentData from "@/app/Hooks/useStudentData";
import { 
  AcademicCapIcon, 
  TrophyIcon, 
  PresentationChartLineIcon,
  StarIcon 
} from "@heroicons/react/24/outline";

const StudentPerformance = () => {
  const { studentData } = useStudentData();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (studentData?.length > 0) {
      setStudents(studentData);
    }
  }, [studentData]);

  const calculateAverage = (performance) => {
    if (!performance) return null;
    const subjects = ["math", "science", "english"];
    let total = 0;
    let count = 0;

    subjects.forEach((sub) => {
      if (performance[sub] !== undefined && performance[sub] !== null) {
        total += Number(performance[sub]);
        count++;
      }
    });

    return count > 0 ? (total / count).toFixed(1) : null;
  };

  const getGradeStyles = (avg) => {
    if (!avg) return { label: "N/A", bg: "bg-slate-100 text-slate-400 border-slate-200" };
    const num = parseFloat(avg);
    if (num >= 90) return { label: "A+", bg: "bg-emerald-50 text-emerald-700 border-emerald-200" };
    if (num >= 80) return { label: "A", bg: "bg-teal-50 text-teal-700 border-teal-200" };
    if (num >= 70) return { label: "B", bg: "bg-blue-50 text-blue-700 border-blue-200" };
    if (num >= 60) return { label: "C", bg: "bg-amber-50 text-amber-700 border-amber-200" };
    return { label: "D", bg: "bg-rose-50 text-rose-700 border-rose-200" };
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 md:p-12 space-y-10">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight flex items-center gap-4">
              Academic Performance
            </h1>
            <p className="text-slate-500 font-medium mt-3 text-xl italic">
              Analyzing student achievement benchmarks and attendance correlation.
            </p>
          </div>
          <div className="bg-emerald-900 px-6 py-4 rounded-3xl shadow-xl shadow-emerald-100 text-white flex items-center gap-4">
            <TrophyIcon className="w-8 h-8 text-emerald-400" />
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Top Performer</p>
              <p className="text-lg font-bold tracking-tight">Spring 2026 Batch</p>
            </div>
          </div>
        </div>

        {/* Quick Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard 
            title="Total Students" 
            value={students.length} 
            icon={<AcademicCapIcon className="w-8 h-8" />} 
            color="emerald" 
          />
          <StatCard 
            title="Average Batch GPA" 
            value="3.84" 
            icon={<PresentationChartLineIcon className="w-8 h-8" />} 
            color="blue" 
          />
          <StatCard 
            title="Excellence Rate" 
            value="84%" 
            icon={<StarIcon className="w-8 h-8" />} 
            color="amber" 
          />
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Rank</th>
                  <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Student Identity</th>
                  <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em] text-center">Avg Score</th>
                  <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em] text-center">Grade</th>
                  <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Attendance Vitality</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {students.length > 0 ? (
                  students.map((student, index) => {
                    const avg = calculateAverage(student.performance);
                    const grade = getGradeStyles(avg);
                    const attendance = parseInt(student.performance?.attendance) || 0;

                    return (
                      <tr key={student.Id || index} className="group hover:bg-emerald-50/10 transition-all">
                        <td className="px-10 py-8">
                          <span className="text-base font-black text-emerald-300 font-mono">
                            #{String(index + 1).padStart(2, '0')}
                          </span>
                        </td>
                        <td className="px-8 py-8">
                          <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-400 transition-all shadow-sm text-lg">
                              {(student.userNameEn || student.userdata?.name || "U").charAt(0)}
                            </div>
                            <div>
                              <p className="text-lg font-black text-slate-800 tracking-tight">
                                {student.userNameEn || student.userdata?.name}
                              </p>
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                UID: {student.Id || "0000"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-8 text-center">
                          <span className="text-2xl font-black text-slate-800">{avg || "—"}</span>
                          <span className="text-xs text-slate-400 font-bold ml-1.5 uppercase tracking-tighter">pts</span>
                        </td>
                        <td className="px-8 py-8 text-center">
                          <span className={`px-5 py-2.5 rounded-xl text-sm font-black shadow-sm border-2 ${grade.bg}`}>
                            {grade.label}
                          </span>
                        </td>
                        <td className="px-10 py-8">
                          <div className="flex items-center gap-5">
                            <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden min-w-[140px] shadow-inner">
                              <div 
                                className={`h-full rounded-full transition-all duration-1000 ${
                                  attendance > 80 ? 'bg-emerald-500' : attendance > 60 ? 'bg-amber-400' : 'bg-rose-500'
                                }`}
                                style={{ width: `${attendance}%` }}
                              />
                            </div>
                            <span className="text-base font-black text-slate-700 w-12">{attendance}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="py-32 text-center">
                      <p className="text-slate-300 font-black text-2xl uppercase tracking-[0.2em] italic opacity-40">
                        No performance records available.
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

const StatCard = ({ title, value, icon, color }) => {
  const colorMap = {
    emerald: "text-emerald-700 bg-emerald-50 border-emerald-500 shadow-emerald-100",
    blue: "text-blue-700 bg-blue-50 border-blue-500 shadow-blue-100",
    amber: "text-amber-700 bg-amber-50 border-amber-500 shadow-amber-100",
  };

  return (
    <div className={`p-8 bg-white rounded-[2.5rem] border-b-8 shadow-xl shadow-slate-50 transition-transform hover:-translate-y-2 ${colorMap[color]}`}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">{title}</p>
        <div className="opacity-40">{icon}</div>
      </div>
      <p className="text-5xl font-black tracking-tighter">{value}</p>
    </div>
  );
};

export default StudentPerformance;