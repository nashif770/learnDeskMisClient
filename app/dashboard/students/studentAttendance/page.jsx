"use client";
import useUserData from "@/app/Hooks/useUserData";
import UniversalSearchBar from "@/app/shared/UniversalSearchBar";
import React, { useEffect, useState } from "react";

const StudentAttendance = () => {
  const { userData } = useUserData();
  const students = userData;

  const [filteredData, setFilteredData] = useState(students);

  useEffect(() => {
    if (students.length > 0) {
      setFilteredData(students);
    }
  }, [students]);

  const totalFilteredStudents = filteredData.length;
  const averageAttendance = totalFilteredStudents
    ? (
        filteredData.reduce((acc, s) => acc + (s.present / s.total) * 100, 0) /
        totalFilteredStudents
      ).toFixed(1)
    : 0;
  const totalClassDays = filteredData[0]?.total || 0;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-emerald-700">
        📊 Student Attendance Overview
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
          <p className="text-gray-500">Total Students</p>
          <p className="text-3xl font-bold text-emerald-600">
            {totalFilteredStudents}
          </p>
        </div>

        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
          <p className="text-gray-500">Average Attendance %</p>
          <p className="text-3xl font-bold text-blue-600">
            {averageAttendance}%
          </p>
        </div>

        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
          <p className="text-gray-500">Total Class Days</p>
          <p className="text-3xl font-bold text-purple-600">{totalClassDays}</p>
        </div>
      </div>

      {/* Filters */}
      <UniversalSearchBar
        data={students}
        filterKeys={["class"]}
        sortKeys={["id", "class", "name"]}
        onFilter={(data) => setFilteredData(data)}
      />

      {/* Attendance Table */}
      <div className="overflow-x-auto mt-4 shadow rounded-lg">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border-b">ID</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Class</th>
              <th className="p-3 border-b text-center">Days Present</th>
              <th className="p-3 border-b text-center">Total Days</th>
              <th className="p-3 border-b text-center">Percentage</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 transition">
                  <td className="p-3 border-b">{s.id}</td>
                  <td className="p-3 border-b">{s.name}</td>
                  <td className="p-3 border-b">{s.class}</td>
                  <td className="p-3 border-b text-center">{s.present}</td>
                  <td className="p-3 border-b text-center">{s.total}</td>
                  <td className="p-3 border-b text-center font-semibold text-blue-600">
                    {((s.present / s.total) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="p-6 text-center text-gray-400 italic"
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

export default StudentAttendance;
