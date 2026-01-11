"use client";
import React, { useState } from "react";
import theme from "@/theme"; 
import { 
  Squares2X2Icon, 
  PlusIcon, 
  ArrowTopRightOnSquareIcon 
} from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

const ManageClass = () => {
  const router = useRouter();
  
  const [classes] = useState([
    { id: "C101", name: "Class 1", section: "A", academicYear: "2024", shift: "Morning", roomNo: "101" },
    { id: "C102", name: "Class 2", section: "B", academicYear: "2024", shift: "Day", roomNo: "102" },
    { id: "C103", name: "Class 3", section: "A", academicYear: "2024", shift: "Morning", roomNo: "103" },
  ]);

  const handleViewDetails = (classId) => {
    router.push(`/dashboard/classManagement/manageClass/${classId}`); 
  };

  return (
    <div className="min-h-screen p-8 bg-slate-50 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                <Squares2X2Icon className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Class Management
              </h2>
            </div>
            <p className="text-sm text-slate-500">
              Manage academic structures, schedules, and classroom assignments.
            </p>
          </div>
          
          <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-200 active:scale-95">
            <PlusIcon className="w-4 h-4" />
            Register New Class
          </button>
        </div>

        {/* TABLE CONTAINER */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-emerald-50/50">
                <th className="px-6 py-4 text-[11px] font-bold text-emerald-700 uppercase tracking-widest">Class Identity</th>
                <th className="px-6 py-4 text-[11px] font-bold text-emerald-700 uppercase tracking-widest">Section</th>
                <th className="px-6 py-4 text-[11px] font-bold text-emerald-700 uppercase tracking-widest">Academic Year</th>
                <th className="px-6 py-4 text-[11px] font-bold text-emerald-700 uppercase tracking-widest text-right">Management</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {classes.map((cls) => (
                <tr key={cls.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800 text-sm">{cls.name}</div>
                    <div className="text-[11px] text-slate-400 font-medium">ID: {cls.id} • Room {cls.roomNo}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 bg-white border border-slate-200 rounded-lg text-[11px] font-black text-emerald-600 uppercase">
                      {cls.section}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-600">{cls.academicYear}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleViewDetails(cls.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-emerald-500 hover:text-emerald-600 rounded-xl text-xs font-bold text-slate-600 transition-all shadow-sm"
                    >
                      Class Details
                      <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {classes.length === 0 && (
            <div className="py-20 text-center">
              <Squares2X2Icon className="w-12 h-12 mx-auto text-slate-200 mb-3" />
              <p className="text-slate-400 font-medium">No classes registered yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageClass;