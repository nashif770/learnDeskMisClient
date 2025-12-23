'use client';
import useStudentData from "@/app/Hooks/useStudentData";
import UniversalSearchBar from "@/app/shared/UniversalSearchBar";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ManageStudents = () => {
  const {studentData} = useStudentData();
  
  const students = studentData

  console.log("just checking", studentData)
  
  const [filteredData, setFilteredData] = useState(students);

  console.log("Help",students)

  useEffect(() => {
    if (students?.length > 0) {
      setFilteredData(students);
    }
  }, [students]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-emerald-700">Students List</h2>
        <Link href="/dashboard/students/addStudents">
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg shadow hover:bg-emerald-700 transition">
            + Add Student
          </button>
        </Link>
      </div>

      {/* Search */}
      <UniversalSearchBar
        data={students}
        filterKeys={["class"]}
        sortKeys={["id", "class", "name"]}
        onFilter={(data) => setFilteredData(data)}
      />

      {/* Table */}
      <div className="overflow-x-auto mt-6 shadow rounded-lg">
        <table className="min-w-full text-left bg-white rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b">Student ID</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Class</th>
              <th className="p-3 border-b">Mobile</th>
              <th className="p-3 border-b text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((student, index) => (
                // console.log("Students help",student.id)
                <tr
                  key={student.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b">{student.id}</td>
                  <td className="p-3 border-b">{student?.userdata.name}</td>
                  <td className="p-3 border-b">{student.class}</td>
                  <td className="p-3 border-b">{student.mobile}</td>
                  <td className="p-3 border-b text-center">
                    <div className="flex justify-center gap-2">
                      <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm transition">
                        Details
                      </button>
                      <button className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm transition">
                        Promote
                      </button>
                      <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm transition">
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) 
            : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500 italic">
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

export default ManageStudents;
