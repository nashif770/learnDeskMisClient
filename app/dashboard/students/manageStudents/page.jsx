"use client";
import useStudents from "@/app/Hooks/useStudents";
import Link from "next/link";
import React, { useState } from "react";

const manageStudents = () => {
  const { students } = useStudents();
  const [filterClass, setFilterClass] = useState("");
  const [search, setSearch] = useState("");

  // Filter by class and search
  const filteredStudents = students.filter(
    (s) =>
      (filterClass ? s.class === filterClass : true) &&
      s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Students List</h2>

        {/* Add Button */}
        <Link href={"/dashboard/students/addStudents"}>
          <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
            + Add Student
          </button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-2 rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded w-full md:w-1/4"
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
        >
          <option value="">Filter by Class</option>
          <option value="Class 1">Class 1</option>
          <option value="Class 2">Class 2</option>
          <option value="Class 3">Class 3</option>
        </select>

        <button
          onClick={() => {
            setFilterClass("");
            setSearch("");
          }}
          className="border px-3 py-2 rounded hover:bg-gray-100"
        >
          Reset
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded shadow">
        <table className="w-full text-left border-collapse bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 border">#</th>
              <th className="p-3 border">Student ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Class</th>
              <th className="p-3 border">Mobile</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">{student.id}</td>
                <td className="p-3 border">{student.name}</td>
                <td className="p-3 border">{student.class}</td>
                <td className="p-3 border">{student.mobile}</td>

                <td className="p-3 border text-center">
                  <div className="flex justify-center gap-2">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
                      Details
                    </button>
                    <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm">
                      Promote
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm">
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredStudents.length === 0 && (
              <tr>
                <td
                  colSpan="6"
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

export default manageStudents;
