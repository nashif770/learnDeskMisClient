"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UniversalSearchBar from "@/app/shared/UniversalSearchBar";
import useUserData from "@/app/Hooks/useUserData";

const StudentList = () => {
  const router = useRouter();
    const { userData } = useUserData();
  const students = userData
  const [filteredData, setFilteredData] = useState(students);

  useEffect(() => {
    if (students.length > 0) setFilteredData(students);
  }, [students]);

  const handleDetailsClick = (id) => {
    router.push(`/dashboard/students/studentProfile/${id}`);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">👥 Students List</h1>

      {/* Filters */}
      <UniversalSearchBar
        data={students}
        filterKeys={["class"]}
        sortKeys={["id", "class", "name"]}
        onFilter={(data) => setFilteredData(data)}
      />

      {/* Students Table */}
      <div className="overflow-x-auto border rounded shadow">
        <table className="w-full text-left border-collapse bg-white">
          <thead className="bg-gray-200 text-gray-700 sticky top-0 z-10">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Student ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Class</th>
              <th className="p-3 border">Roll</th>
              <th className="p-3 border">Mobile</th>
              <th className="p-3 border">Father's Name</th>
              <th className="p-3 border">Mother's Name</th>
              <th className="p-3 border text-center">Details</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((s, index) => (
                <tr
                  key={s.id}
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                >
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border">{s.id}</td>
                  <td className="p-3 border">{s.name}</td>
                  <td className="p-3 border">{s.class}</td>
                  <td className="p-3 border">{s.roll}</td>
                  <td className="p-3 border">{s.mobile}</td>
                  <td className="p-3 border">{s.fatherName}</td>
                  <td className="p-3 border">{s.motherName}</td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={() => handleDetailsClick(s.id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="p-4 text-center text-gray-500 italic border"
                >
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
