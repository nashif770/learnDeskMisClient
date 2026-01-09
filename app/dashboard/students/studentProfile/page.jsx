"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UniversalSearchBar from "@/app/shared/UniversalSearchBar";
import useStudentData from "@/app/Hooks/useStudentData";
import {
  PhoneIcon,
  PencilSquareIcon,
  UserMinusIcon,
  PlusIcon,
  ArrowUpRightIcon,
  IdentificationIcon
} from "@heroicons/react/24/outline";

const StudentList = () => {
  const { studentData, setStudentData, isLoading } = useStudentData();
  const router = useRouter();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (!isLoading && studentData) {
      setFilteredData(studentData);
    }
  }, [studentData, isLoading]);

  const handleRemove = (studentId) => {
    if (confirm("⚠️ Permanent Action: Are you sure you want to remove this student?")) {
      const updatedStudents = studentData.filter((s) => s.Id !== studentId);
      if (setStudentData) setStudentData(updatedStudents);
      setFilteredData(updatedStudents);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-6 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* EXECUTIVE HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-slate-200 pb-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black tracking-tighter uppercase text-slate-900">
              Student <span className="text-indigo-600">Ledger</span>
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
              System Status: <span className="text-emerald-500">Live Database</span> • {filteredData.length} Records
            </p>
          </div>

          <Link href="/dashboard/students/addStudents">
            <button className="bg-slate-900 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg active:scale-95">
              <PlusIcon className="w-4 h-4 stroke-[3]" />
              New Registration
            </button>
          </Link>
        </div>

        {/* SEARCH BAR */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
          <UniversalSearchBar
            data={studentData || []}
            filterKeys={["class"]}
            sortKeys={["Id", "class", "userNameEn"]}
            onFilter={(data) => setFilteredData(data)}
          />
        </div>

        {/* SIMPLIFIED LEDGER TABLE */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest w-16">SL</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Student Info</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Parental Info</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Contact</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="p-20 text-center animate-pulse font-black text-slate-300 uppercase tracking-widest">Syncing...</td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((student, index) => (
                  <tr key={student.Id} className="hover:bg-slate-50/50 transition-colors group">
                    {/* SERIAL NUMBER */}
                    <td className="px-6 py-4">
                      <span className="text-xs font-black text-slate-300 group-hover:text-indigo-600 transition-colors">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </td>

                    {/* STUDENT INFO */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-sm group-hover:bg-indigo-600 transition-colors">
                          {student.userNameEn?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 leading-none mb-1">{student.userNameEn}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">ID: {student._id} • Class: {student.class || 'N/A'}</p>
                        </div>
                      </div>
                    </td>

                    {/* PARENTAL INFO */}
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-700 leading-none">{student.fatherName}</p>
                      <p className="text-[10px] text-slate-400 font-medium uppercase mt-1">M: {student.motherName}</p>
                    </td>

                    {/* CONTACT */}
                    <td className="px-6 py-4 text-sm font-bold text-slate-600">
                      <div className="flex items-center gap-2">
                        <PhoneIcon className="w-3 h-3 text-indigo-500" />
                        {student.mobile}
                      </div>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => router.push(`/dashboard/students/studentProfile/${student._id}`)}
                          className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                        >
                          <ArrowUpRightIcon className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleRemove(student.Id)}
                          className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                        >
                          <UserMinusIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                   <td colSpan="5" className="p-20 text-center font-bold text-slate-300 uppercase tracking-widest">No Records Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentList;