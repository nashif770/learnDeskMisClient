"use client";
import React, { useState, useEffect } from "react";
import useStudentData from "@/app/Hooks/useStudentData";
import { 
  AcademicCapIcon, 
  TrophyIcon, 
  PresentationChartLineIcon,
  StarIcon,
  ChevronRightIcon
} from "@heroicons/react/20/solid";

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
    if (!avg) return { label: "N/A", color: "text-slate-400 bg-slate-50" };
    const num = parseFloat(avg);
    if (num >= 90) return { label: "A+", color: "text-emerald-600 bg-emerald-50" };
    if (num >= 80) return { label: "A", color: "text-blue-600 bg-blue-50" };
    if (num >= 70) return { label: "B", color: "text-indigo-600 bg-indigo-50" };
    if (num >= 60) return { label: "C", color: "text-amber-600 bg-amber-50" };
    return { label: "D", color: "text-rose-600 bg-rose-50" };
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-4 md:p-8 font-sans antialiased text-slate-900">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* --- Slim Header --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Academic Analytics</h1>
            <p className="text-xs font-medium text-slate-500 mt-1">Benchmark assessment for current term</p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg">
            <TrophyIcon className="w-4 h-4 text-amber-400" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Top Batch: 2026</span>
          </div>
        </div>

        {/* --- Performance Metrics --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <CompactStatCard title="Enrollment" value={students.length} icon={AcademicCapIcon} />
          <CompactStatCard title="Average GPA" value="3.84" icon={PresentationChartLineIcon} highlight />
          <CompactStatCard title="Excellence" value="84%" icon={StarIcon} />
        </div>

        {/* --- High-Density Performance Ledger --- */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center w-16">Rank</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Student Profile</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Score</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Grade</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Attendance Track</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {students.map((student, index) => {
                  const avg = calculateAverage(student.performance);
                  const grade = getGradeStyles(avg);
                  const attendance = parseInt(student.performance?.attendance) || 0;

                  return (
                    <tr key={student.Id || index} className="group hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-4 text-center">
                        <span className="text-xs font-bold text-slate-300">#{index + 1}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs border border-slate-200 uppercase">
                            {(student.userNameEn || "U").charAt(0)}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                              {student.userNameEn}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400">ID: {student.Id || "N/A"}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-sm font-bold text-slate-700">{avg || "—"}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight ${grade.color}`}>
                          {grade.label}
                        </span>
                      </td>
                      <td className="px-4 py-4 min-w-[140px]">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-700 ${
                                attendance > 80 ? "bg-emerald-500" : attendance > 60 ? "bg-amber-400" : "bg-rose-500"
                              }`}
                              style={{ width: `${attendance}%` }}
                            />
                          </div>
                          <span className="text-[11px] font-bold text-slate-500 w-8">{attendance}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                         <button className="p-1 hover:bg-indigo-50 rounded text-slate-300 hover:text-indigo-500 transition-colors">
                            <ChevronRightIcon className="w-4 h-4" />
                         </button>
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

const CompactStatCard = ({ title, value, icon: Icon, highlight }) => (
  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
      <p className={`text-xl font-bold tracking-tight ${highlight ? 'text-indigo-600' : 'text-slate-900'}`}>{value}</p>
    </div>
    <div className={`p-2 rounded-lg ${highlight ? 'bg-indigo-50 text-indigo-500' : 'bg-slate-50 text-slate-400'}`}>
      <Icon className="w-4 h-4" />
    </div>
  </div>
);

export default StudentPerformance;