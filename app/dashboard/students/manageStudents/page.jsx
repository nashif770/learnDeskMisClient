"use client";
import useStudentData from "@/app/Hooks/useStudentData";
import UniversalSearchBar from "@/app/shared/UniversalSearchBar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  UserMinusIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

const ManageStudents = () => {
  const { studentData, setStudentData } = useStudentData();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (studentData?.length > 0) {
      setFilteredData(studentData);
    }
  }, [studentData]);

  const handleRemove = (studentId) => {
    if (
      confirm(
        "⚠️ Permanent Action: Are you sure you want to remove this student record?"
      )
    ) {
      const updatedStudents = studentData.filter(
        (student) => student.Id !== studentId
      );
      if (setStudentData) {
        setStudentData(updatedStudents);
      }
      setFilteredData(updatedStudents);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 space-y-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Student Management
            </h1>
            <p className="text-gray-500 md:text-lg mt-2 md:mt-3 italic">
              Centralized database for student academic records.
            </p>
          </div>

          <Link href="/dashboard/students/addStudents">
            <button className="flex items-center gap-3 bg-emerald-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-black text-sm md:text-base uppercase tracking-widest shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:translate-y-[-2px] transition-all active:scale-95">
              <PlusIcon className="w-5 md:w-6 h-5 md:h-6 stroke-[2]" />
              Add Student
            </button>
          </Link>
        </div>

        {/* Search & Utility Bar */}
        <div className="bg-white p-4 md:p-5 rounded-2xl shadow-md border border-gray-200">
          <UniversalSearchBar
            data={studentData || []}
            filterKeys={["class"]}
            sortKeys={["Id", "class", "userNameEn"]}
            onFilter={(data) => setFilteredData(data)}
          />
        </div>

        {/* Management Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-separate border-spacing-0 rounded-2xl bg-white shadow-md">
            <thead>
              <tr className="bg-gray-100 rounded-t-2xl">
                {["#", "Student", "Guardian", "Contact", "Actions"].map(
                  (header, i) => (
                    <th
                      key={i}
                      className="px-4 md:px-6 py-3 text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wide text-left"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.length > 0 ? (
                filteredData.map((student, index) => (
                  <tr
                    key={student.Id}
                    className="hover:bg-gray-50 transition-all group"
                  >
                    {/* Index */}
                    <td className="px-4 md:px-6 py-4 text-sm font-semibold text-gray-700">
                      {String(index + 1).padStart(2, "0")}
                    </td>

                    {/* Student Info */}
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gray-200 flex items-center justify-center font-bold text-gray-500 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm">
                          {student.userNameEn?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm md:text-base font-bold text-gray-800">
                            {student.userNameEn}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            UID: {student.Id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Guardian Info */}
                    <td className="px-4 md:px-6 py-4">
                      <p className="text-sm font-bold text-gray-700">
                        {student.fatherName}
                      </p>
                      <p className="text-xs text-gray-400">
                        M: {student.motherName}
                      </p>
                    </td>

                    {/* Contact */}
                    <td className="px-4 md:px-6 py-4">
                      <span className="text-sm font-bold text-gray-700 bg-gray-50 px-2 md:px-3 py-1.5 rounded-lg border border-gray-200">
                        {student.mobile}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-3">
                        <button className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-wide text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all shadow-sm">
                          <PencilSquareIcon className="w-4 h-4" /> Edit
                        </button>
                        <button
                          onClick={() => handleRemove(student.Id)}
                          className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-wide text-rose-600 bg-rose-50 border border-rose-100 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-md"
                        >
                          <UserMinusIcon className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <p className="text-gray-400 font-bold text-lg md:text-xl italic uppercase opacity-50">
                      No records found
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageStudents;
