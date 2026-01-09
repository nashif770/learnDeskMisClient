"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UniversalSearchBar from "@/app/shared/UniversalSearchBar";
import useStudentData from "@/app/Hooks/useStudentData";
import {
  IdentificationIcon,
  UserGroupIcon,
  MapPinIcon,
  PhoneIcon,
  PencilSquareIcon,
  UserMinusIcon,
  PlusIcon,
  ArrowUpRightIcon
} from "@heroicons/react/24/outline";

const StudentList = () => {
  const { studentData, setStudentData, isLoading } = useStudentData(); 
  const router = useRouter();
  const [filteredData, setFilteredData] = useState([]);

  // FIX: Added isLoading to dependencies and ensured data exists before setting
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

  const handleDetailsClick = (id) => {
    router.push(`/dashboard/students/studentProfile/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Student Roster
            </h1>
            <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
              <UserGroupIcon className="w-4 h-4" />
              <span>{isLoading ? "Syncing Ledger..." : `${filteredData.length} Students Enrolled`}</span>
            </div>
          </div>

          <Link href="/dashboard/students/addStudents">
            <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-blue-600 transition-all active:scale-95 flex items-center gap-2">
              <PlusIcon className="w-5 h-5 stroke-[2.5]" />
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

        {/* DATA TABLE */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-6 text-xs font-semibold uppercase text-slate-500 tracking-wider">Student Profile</th>
                  <th className="p-6 text-xs font-semibold uppercase text-slate-500 tracking-wider">Guardian Info</th>
                  <th className="p-6 text-xs font-semibold uppercase text-slate-500 tracking-wider">Contact</th>
                  <th className="p-6 text-xs font-semibold uppercase text-slate-500 tracking-wider text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* CASE 1: LOADING STATE (Skeleton Rows) */}
                {isLoading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-200" />
                          <div className="space-y-2">
                            <div className="h-4 w-32 bg-slate-200 rounded" />
                            <div className="h-3 w-20 bg-slate-100 rounded" />
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="space-y-2">
                          <div className="h-4 w-24 bg-slate-200 rounded" />
                          <div className="h-3 w-16 bg-slate-100 rounded" />
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="space-y-2">
                          <div className="h-4 w-28 bg-slate-200 rounded" />
                          <div className="h-3 w-24 bg-slate-100 rounded" />
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex justify-center gap-2">
                          <div className="w-10 h-10 bg-slate-100 rounded-lg" />
                          <div className="w-10 h-10 bg-slate-100 rounded-lg" />
                          <div className="w-10 h-10 bg-slate-100 rounded-lg" />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : filteredData.length > 0 ? (
                  // CASE 2: DATA LOADED
                  filteredData.map((student) => (
                    <tr key={student.Id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                            {student.userNameEn?.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 text-base">{student.userNameEn}</p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <IdentificationIcon className="w-3.5 h-3.5 text-slate-400" />
                              <span className="text-xs text-slate-400 font-medium">ID: {student.Id}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="space-y-0.5">
                          <p className="text-sm font-semibold text-slate-700">{student.fatherName}</p>
                          <p className="text-xs text-slate-400">M: {student.motherName}</p>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="space-y-1">
                           <div className="flex items-center gap-2 text-slate-700">
                             <PhoneIcon className="w-3.5 h-3.5 text-blue-500" />
                             <span className="font-medium text-sm">{student.mobile}</span>
                           </div>
                           <div className="flex items-center gap-2 text-slate-400 text-xs">
                             <MapPinIcon className="w-3.5 h-3.5" />
                             <span>{student.currentDistrict || "Not Specified"}</span>
                           </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex justify-center items-center gap-2">
                          <button onClick={() => handleDetailsClick(student._id)} className="p-2.5 bg-white border border-slate-200 text-slate-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                            <ArrowUpRightIcon className="w-5 h-5" />
                          </button>
                          <button className="p-2.5 bg-white border border-slate-200 text-slate-400 rounded-lg hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                            <PencilSquareIcon className="w-5 h-5" />
                          </button>
                          <button onClick={() => handleRemove(student.Id)} className="p-2.5 bg-rose-50 border border-rose-100 text-rose-500 rounded-lg hover:bg-rose-600 hover:text-white transition-all shadow-sm">
                            <UserMinusIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  // CASE 3: LOADED BUT TRULY EMPTY
                  <tr>
                    <td colSpan="4" className="py-24">
                      <div className="flex flex-col items-center justify-center space-y-2 opacity-40">
                        <UserGroupIcon className="w-12 h-12 text-slate-400" />
                        <p className="font-medium text-slate-500 text-lg">No student records found</p>
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