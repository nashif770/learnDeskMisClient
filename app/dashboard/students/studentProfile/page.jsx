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
    router.push(`/dashboard/students/studentProfile/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 space-y-10">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
              Student Directory
            </h1>
            <p className="text-gray-500 font-medium mt-2 md:mt-3 text-lg italic">
              Comprehensive registry of all enrolled academic profiles.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-2xl shadow-xl shadow-blue-100 transition-transform hover:scale-105">
            <UserCircleIcon className="w-7 h-7 text-blue-100" />
            <div>
              <p className="text-[10px] md:text-xs font-black text-blue-200 uppercase tracking-[0.2em]">
                Total Records
              </p>
              <p className="text-2xl md:text-3xl font-black text-white leading-none">
                {filteredData.length}
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-200">
          <UniversalSearchBar
            data={studentData || []}
            filterKeys={["education"]}
            sortKeys={["Id", "education", "userNameEn"]}
            onFilter={(data) => setFilteredData(data)}
          />
        </div>

        {/* Student Table */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-separate border-spacing-0">
              <thead>
                <tr className="bg-gray-100">
                  {["Index", "Student Identity", "Academic Level", "Contact & Region", "Family Details", "Profile"].map((header, i) => (
                    <th
                      key={i}
                      className="px-4 md:px-10 py-4 md:py-6 text-xs md:text-sm font-black text-gray-500 uppercase tracking-widest text-center md:text-left"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.length > 0 ? (
                  filteredData.map((s, index) => (
                    <tr
                      key={s._id}
                      className="group hover:bg-blue-50/30 transition-all"
                    >
                      {/* Index */}
                      <td className="px-4 md:px-10 py-4 text-center font-mono font-bold text-gray-400">
                        {String(index + 1).padStart(2, "0")}
                      </td>

                      {/* Student Identity */}
                      <td className="px-4 md:px-8 py-4">
                        <div className="flex items-center gap-4 md:gap-5">
                          <div className="w-12 md:w-14 h-12 md:h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-lg border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                            {s.userNameEn?.charAt(0)}
                          </div>
                          <div>
                            <p className="text-base md:text-lg font-black text-gray-800 group-hover:text-blue-700 transition-colors">
                              {s.userNameEn}
                            </p>
                            <p className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wide mt-0.5 flex items-center gap-1">
                              <IdentificationIcon className="w-3.5 h-3.5" /> ID: {s.Id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Academic Level */}
                      <td className="px-4 md:px-8 py-4">
                        <span className="px-3 md:px-4 py-1 bg-gray-900 text-white rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest shadow-lg shadow-gray-200">
                          {s.education || "General"}
                        </span>
                        <p className="text-xs md:text-sm font-bold text-gray-500 mt-1 ml-1 italic">
                          Roll: {s.roll || "—"}
                        </p>
                      </td>

                      {/* Contact & Region */}
                      <td className="px-4 md:px-8 py-4">
                        <p className="text-sm md:text-base font-black text-gray-700">
                          {s.mobile}
                        </p>
                        <p className="text-xs md:text-sm font-bold text-blue-500 uppercase tracking-tight flex items-center gap-1 mt-1">
                          <MapPinIcon className="w-3.5 h-3.5" /> {s.currentDistrict}
                        </p>
                      </td>

                      {/* Family Details */}
                      <td className="px-4 md:px-8 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                            <p className="text-sm font-bold text-gray-600 truncate max-w-[150px]">
                              {s.fatherName}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
                            <p className="text-sm font-bold text-gray-600 truncate max-w-[150px]">
                              {s.motherName}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Profile Button */}
                      <td className="px-4 md:px-10 py-4 text-right">
                        <button
                          onClick={() => handleDetailsClick(s._id)}
                          className="inline-flex items-center gap-2 px-5 md:px-6 py-2 md:py-3 bg-white border-2 border-gray-200 text-gray-900 text-xs md:text-sm font-black uppercase tracking-widest rounded-2xl shadow-sm hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all active:scale-95 group/btn"
                        >
                          View Profile
                          <ChevronRightIcon className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-24 text-center">
                      <div className="flex flex-col items-center justify-center space-y-4 opacity-30">
                        <div className="text-6xl md:text-7xl">🔍</div>
                        <p className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-widest">
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
