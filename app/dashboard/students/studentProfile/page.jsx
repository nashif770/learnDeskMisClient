"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UniversalSearchBar from "@/app/shared/UniversalSearchBar";
import useStudentData from "@/app/Hooks/useStudentData";
import {
  IdentificationIcon,
  UserCircleIcon,
  MapPinIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const StudentList = () => {
  const { studentData } = useStudentData();
  const router = useRouter();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (studentData) setFilteredData(studentData);
  }, [studentData]);

  const handleDetailsClick = (id) => {
    // console.log("checking id", id);
    router.push(`/dashboard/students/studentProfile/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 md:p-12 space-y-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight flex items-center gap-4">
              Student Directory
            </h1>
            <p className="text-slate-500 font-medium mt-3 text-xl italic">
              Comprehensive registry of all enrolled academic profiles.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-blue-600 px-8 py-4 rounded-[1.5rem] shadow-xl shadow-blue-100 transition-transform hover:scale-105">
            <UserCircleIcon className="w-8 h-8 text-blue-100" />
            <div>
              <p className="text-[10px] font-black text-blue-200 uppercase tracking-[0.2em]">
                Total Records
              </p>
              <p className="text-2xl font-black text-white leading-none">
                {filteredData.length}
              </p>
            </div>
          </div>
        </div>

        {/* Search & Utility Wrapper */}
        <div className="bg-white p-5 rounded-[2.5rem] shadow-sm border border-slate-100">
          <UniversalSearchBar
            data={studentData || []}
            filterKeys={["education"]}
            sortKeys={["Id", "education", "userNameEn"]}
            onFilter={(data) => setFilteredData(data)}
          />
        </div>

        {/* Directory Table */}
        <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                    Index
                  </th>
                  <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                    Student Identity
                  </th>
                  <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                    Academic Level
                  </th>
                  <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                    Contact & Region
                  </th>
                  <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                    Family Details
                  </th>
                  <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em] text-right">
                    Profile
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredData.length > 0 ? (
                  filteredData.map((s, index) => (
                    <tr
                      key={s._id}
                      className="group hover:bg-blue-50/20 transition-all cursor-default"
                    >
                      {console.log("filtered student", s)}
                      <td className="px-10 py-8 text-base font-black text-slate-300 font-mono">
                        {String(index + 1).padStart(2, "0")}
                      </td>
                      <td className="px-8 py-8">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xl border border-blue-100 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all shadow-sm">
                            {s.userNameEn?.charAt(0)}
                          </div>
                          <div>
                            <p className="text-lg font-black text-slate-800 tracking-tight group-hover:text-blue-700 transition-colors">
                              {s.userNameEn}
                            </p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5 flex items-center gap-1">
                              <IdentificationIcon className="w-3.5 h-3.5" /> ID:{" "}
                              {s.Id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <span className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-200">
                          {s.education || "General"}
                        </span>
                        <p className="text-sm font-bold text-slate-500 mt-2 ml-1 italic">
                          Roll: {s.roll || "—"}
                        </p>
                      </td>
                      <td className="px-8 py-8">
                        <p className="text-base font-black text-slate-700">
                          {s.mobile}
                        </p>
                        <p className="text-xs font-bold text-blue-500 uppercase tracking-tight flex items-center gap-1 mt-1">
                          <MapPinIcon className="w-3.5 h-3.5" />{" "}
                          {s.currentDistrict}
                        </p>
                      </td>
                      <td className="px-8 py-8">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                            <p className="text-sm font-bold text-slate-600 truncate max-w-[150px]">
                              {s.fatherName}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
                            <p className="text-sm font-bold text-slate-600 truncate max-w-[150px]">
                              {s.motherName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <button
                          onClick={() => handleDetailsClick(s._id)}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-100 text-slate-900 text-xs font-black uppercase tracking-widest rounded-2xl shadow-sm hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all active:scale-95 group/btn"
                        >
                          View Profile
                          <ChevronRightIcon className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-40 text-center">
                      <div className="flex flex-col items-center justify-center space-y-4 opacity-30">
                        <div className="text-7xl">🔍</div>
                        <p className="text-2xl font-black text-slate-900 uppercase tracking-widest">
                          No Matches Found
                        </p>
                      </div>
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

export default StudentList;
