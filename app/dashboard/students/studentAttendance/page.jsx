"use client";
import useStudents from "@/app/Hooks/useStudents";
import UniversalSearchBar from "@/app/shared/UniversalSearchBar";
import React, { useEffect, useState } from "react";

const StudentAttendance = () => {
  const { students } = useStudents();
  const [filteredData, setFilteredData] = useState(students);

  // Filtered students based on search and class
  const filtered = filteredData;

  useEffect(() => {
    if (students.length > 0) {
      setFilteredData(students);
    }
  }, [students]);

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
      <UniversalSearchBar
        data={students}
        filterKeys={["class"]}
        sortKeys={["id", "class", "name"]}
        onFilter={(data) => setFilteredData(data)}
      ></UniversalSearchBar>

      {/* Table */}
      <div className="overflow-x-auto border rounded shadow">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 border">Id</th>
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
                <td className="p-3 border">{s.id}</td>
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
          <div className="p-6 text-center text-gray-500">
            No students found.
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAttendance;
