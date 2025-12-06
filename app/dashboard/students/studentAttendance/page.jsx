'use client'
import useStudents from "@/app/Hooks/useStudents";
import React, { useState } from "react";

const StudentAttendance = () => {
    const {students}= useStudents()
  const [search, setSearch] = useState("");
  const [filterClass, setFilterClass] = useState("");

  // Filtered students based on search and class
  const filtered = students.filter((s) => {
    return (
      s.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterClass ? s.class === filterClass : true)
    );
  });

  // Overhead summary based on filtered students
  const totalFilteredStudents = filtered.length;
  const averageAttendance = totalFilteredStudents
    ? (
        filtered.reduce((acc, s) => acc + (s.present / s.total) * 100, 0) /
        totalFilteredStudents
      ).toFixed(1)
    : 0;
  const totalClassDays = filtered[0]?.total || 0;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">📊 Student Attendance Overview</h1>

      {/* Summary */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 p-4 bg-gray-100 rounded shadow text-center">
          <p className="text-gray-600">Total Students</p>
          <p className="text-2xl font-bold">{totalFilteredStudents}</p>
        </div>

        <div className="flex-1 p-4 bg-gray-100 rounded shadow text-center">
          <p className="text-gray-600">Average Attendance %</p>
          <p className="text-2xl font-bold">{averageAttendance}%</p>
        </div>

        <div className="flex-1 p-4 bg-gray-100 rounded shadow text-center">
          <p className="text-gray-600">Total Class Days</p>
          <p className="text-2xl font-bold">{totalClassDays}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Search student..."
          className="border p-2 rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded w-full md:w-1/4"
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
        >
          <option value="">Filter by class</option>
          <option value="Class 7">Class 7</option>
          <option value="Class 8">Class 8</option>
          <option value="Class 9">Class 9</option>
        </select>

        <button
          className="border px-4 py-2 rounded hover:bg-gray-100"
          onClick={() => { setSearch(""); setFilterClass(""); }}
        >
          Reset
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded shadow">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Class</th>
              <th className="p-3 border text-center">Days Present</th>
              <th className="p-3 border text-center">Total Days</th>
              <th className="p-3 border text-center">Percentage</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td className="p-3 border">{s.name}</td>
                <td className="p-3 border">{s.class}</td>
                <td className="p-3 border text-center">{s.present}</td>
                <td className="p-3 border text-center">{s.total}</td>
                <td className="p-3 border text-center font-semibold">
                  {((s.present / s.total) * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-6 text-center text-gray-500">No students found.</div>
        )}
      </div>
    </div>
  );
};

export default StudentAttendance;
