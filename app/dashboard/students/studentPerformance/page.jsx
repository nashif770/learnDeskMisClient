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
    if (!avg) return { label: "N/A", bg: "bg-gray-100 text-gray-400 border-gray-200" };
    const num = parseFloat(avg);
    if (num >= 90) return { label: "A+", bg: "bg-emerald-50 text-emerald-700 border-emerald-200" };
    if (num >= 80) return { label: "A", bg: "bg-teal-50 text-teal-700 border-teal-200" };
    if (num >= 70) return { label: "B", bg: "bg-blue-50 text-blue-700 border-blue-200" };
    if (num >= 60) return { label: "C", bg: "bg-amber-50 text-amber-700 border-amber-200" };
    return { label: "D", bg: "bg-rose-50 text-rose-700 border-rose-200" };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 space-y-10">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
              Academic Performance
            </h1>
            <p className="text-gray-500 md:text-lg mt-2 md:mt-3 italic">
              Analyzing student achievement benchmarks and attendance correlation.
            </p>
          </div>
          <div className="bg-emerald-900 px-5 md:px-6 py-3 md:py-4 rounded-3xl shadow-xl flex items-center gap-4">
            <TrophyIcon className="w-7 h-7 text-emerald-400" />
            <div>
              <p className="text-[10px] md:text-xs font-black uppercase tracking-widest opacity-60">Top Performer</p>
              <p className="text-sm md:text-lg font-bold tracking-tight">Spring 2026 Batch</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <StatCard 
            title="Total Students" 
            value={students.length} 
            icon={<AcademicCapIcon className="w-7 h-7" />} 
            color="emerald" 
          />
          <StatCard 
            title="Average Batch GPA" 
            value="3.84" 
            icon={<PresentationChartLineIcon className="w-7 h-7" />} 
            color="blue" 
          />
          <StatCard 
            title="Excellence Rate" 
            value="84%" 
            icon={<StarIcon className="w-7 h-7" />} 
            color="amber" 
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-separate border-spacing-0">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 md:px-10 py-4 md:py-6 text-xs md:text-sm font-black text-gray-500 uppercase tracking-widest text-center">Rank</th>
                  <th className="px-4 md:px-8 py-4 md:py-6 text-xs md:text-sm font-black text-gray-500 uppercase tracking-widest">Student</th>
                  <th className="px-4 md:px-8 py-4 md:py-6 text-xs md:text-sm font-black text-gray-500 uppercase tracking-widest text-center">Avg Score</th>
                  <th className="px-4 md:px-8 py-4 md:py-6 text-xs md:text-sm font-black text-gray-500 uppercase tracking-widest text-center">Grade</th>
                  <th className="px-4 md:px-10 py-4 md:py-6 text-xs md:text-sm font-black text-gray-500 uppercase tracking-widest">Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.length > 0 ? (
                  students.map((student, index) => {
                    const avg = calculateAverage(student.performance);
                    const grade = getGradeStyles(avg);
                    const attendance = parseInt(student.performance?.attendance) || 0;

                    return (
                      <tr key={student.Id || index} className="group hover:bg-gray-50 transition-all">
                        <td className="px-4 md:px-10 py-4 text-center font-mono font-bold text-gray-400">
                          #{String(index + 1).padStart(2, "0")}
                        </td>
                        <td className="px-4 md:px-8 py-4">
                          <div className="flex items-center gap-3 md:gap-5">
                            <div className="w-12 md:w-14 h-12 md:h-14 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 font-black text-lg group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm">
                              {(student.userNameEn || student.userdata?.name || "U").charAt(0)}
                            </div>
                            <div>
                              <p className="text-base md:text-lg font-black text-gray-800">{student.userNameEn || student.userdata?.name}</p>
                              <p className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wide mt-0.5">
                                UID: {student.Id || "0000"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 md:px-8 py-4 text-center text-lg md:text-xl font-black text-gray-800">
                          {avg || "—"}
                        </td>
                        <td className="px-4 md:px-8 py-4 text-center">
                          <span className={`px-4 py-1.5 md:px-5 md:py-2 rounded-xl text-sm md:text-base font-black shadow-sm border-2 ${grade.bg}`}>
                            {grade.label}
                          </span>
                        </td>
                        <td className="px-4 md:px-10 py-4">
                          <div className="flex items-center gap-3 md:gap-5">
                            <div className="flex-1 h-3 md:h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner min-w-[140px]">
                              <div
                                className={`h-full rounded-full transition-all duration-1000 ${
                                  attendance > 80 ? "bg-emerald-500" :
                                  attendance > 60 ? "bg-amber-400" :
                                  "bg-rose-500"
                                }`}
                                style={{ width: `${attendance}%` }}
                              />
                            </div>
                            <span className="text-base md:text-lg font-black text-gray-700 w-12">{attendance}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="py-24 text-center">
                      <p className="text-gray-400 font-black text-xl md:text-2xl uppercase italic opacity-40">
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
    emerald: "text-emerald-700 bg-emerald-50 border-emerald-200 shadow-emerald-100",
    blue: "text-blue-700 bg-blue-50 border-blue-200 shadow-blue-100",
    amber: "text-amber-700 bg-amber-50 border-amber-200 shadow-amber-100",
  };

  return (
    <div className={`p-6 md:p-8 bg-white rounded-3xl border shadow-md flex flex-col gap-3 hover:shadow-lg transition-transform hover:-translate-y-2 ${colorMap[color]}`}>
      <div className="flex items-center justify-between opacity-80">
        <p className="text-xs md:text-sm font-black uppercase tracking-widest">{title}</p>
        <div className="opacity-50">{icon}</div>
      </div>
      <p className="text-4xl md:text-5xl font-black tracking-tight">{value}</p>
    </div>
  );
};

export default StudentPerformance;
