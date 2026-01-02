"use client";
import useStudentData from "@/app/Hooks/useStudentData";
import UniversalSearchBar from "@/app/shared/UniversalSearchBar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { UserMinusIcon, PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";

const ManageStudents = () => {
  const { studentData, setStudentData } = useStudentData();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (studentData?.length > 0) {
      setFilteredData(studentData);
    }
  }, [studentData]);

  const handleRemove = (studentId) => {
    if (confirm("⚠️ Permanent Action: Are you sure you want to remove this student record?")) {
      const updatedStudents = studentData.filter((student) => student.Id !== studentId);
      if (setStudentData) {
        setStudentData(updatedStudents);
      }
      setFilteredData(updatedStudents);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 md:p-12 space-y-10">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">
              Student Management
            </h1>
            <p className="text-slate-500 font-medium mt-3 text-xl italic">
              Centralized database for student academic records.
            </p>
          </div>
          
          <Link href="/dashboard/students/addStudents">
            <button className="flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-[1.5rem] font-black text-base uppercase tracking-widest shadow-xl shadow-emerald-100 hover:bg-emerald-700 hover:-translate-y-1 transition-all active:scale-95">
              <PlusIcon className="w-6 h-6 stroke-[3]" />
              Add Student
            </button>
          </Link>
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

        {/* Management Table */}
        <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-10 py-6 text-xs font-black text-slate-600 uppercase tracking-[0.2em]">Index</th>
                  <th className="px-8 py-6 text-xs font-black text-slate-600 uppercase tracking-[0.2em]">Student Details</th>
                  <th className="px-8 py-6 text-xs font-black text-slate-600 uppercase tracking-[0.2em]">Guardian Info</th>
                  <th className="px-8 py-6 text-xs font-black text-slate-600 uppercase tracking-[0.2em]">Contact</th>
                  <th className="px-10 py-6 text-xs font-black text-slate-600 uppercase tracking-[0.2em] text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredData.length > 0 ? (
                  filteredData.map((student, index) => (
                    <tr key={student.Id} className="hover:bg-slate-50/30 transition-all group">
                      <td className="px-10 py-8 text-sm font-black text-slate-600">
                        {String(index + 1).padStart(2, '0')}
                      </td>
                      <td className="px-8 py-8">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 font-black text-lg border border-slate-200 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-400 transition-all shadow-sm">
                            {student.userNameEn?.charAt(0)}
                          </div>
                          <div>
                            <p className="text-lg font-black text-slate-800 tracking-tight">{student.userNameEn}</p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">UID: {student.Id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <p className="text-base font-bold text-slate-700 tracking-tight">{student.fatherName}</p>
                        <p className="text-xs font-semibold text-slate-400">M: {student.motherName}</p>
                      </td>
                      <td className="px-8 py-8">
                        <span className="text-base font-black text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                          {student.mobile}
                        </span>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all">
                          <button className="flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm">
                            <PencilSquareIcon className="w-4 h-4" /> Edit
                          </button>
                          <button
                            onClick={() => handleRemove(student.Id)}
                            className="flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-rose-600 bg-rose-50 border border-rose-100 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-lg shadow-rose-100"
                          >
                            <UserMinusIcon className="w-4 h-4" /> Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-32 text-center">
                      <p className="text-slate-300 font-black text-2xl italic tracking-tight uppercase opacity-50">No records found</p>
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

export default ManageStudents;