"use client";
import useStudents from "@/app/Hooks/useStudents";
import UniversalSearchBar from "@/app/shared/UniversalSearchBar";
import React, { useEffect, useState } from "react";

const StudentPerformance = () => {
  const { students } = useStudents();
  const [filteredData, setFilteredData] = useState(students);

  const avg = (arr) => (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1);

  // Filtered students
  let filteredStudents = filteredData;
  useEffect(() => {
    if (students.length > 0) {
      setFilteredData(students);
    }
  }, [students]);

  // Map semester averages for sorting
  filteredStudents = filteredStudents.map((s) => ({
    ...s,
    avgClassTest: Number(avg(s.monthlyTests)),
    avgMidTerm: Number(avg(s.midTerms)),
    semesterAvg: Number(avg(s.semesters)),
  }));

  // Top and bottom performer
  const sortedBySemester = [...filteredStudents].sort(
    (a, b) => b.semesterAvg - a.semesterAvg
  );
  const topPerformer = sortedBySemester[0];
  const bottomPerformer = sortedBySemester[sortedBySemester.length - 1];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">
        📊 Student Performance Overview
      </h1>

      {/* Filters */}
      <UniversalSearchBar
        data={students}
        filterKeys={["class"]}
        sortKeys={["id", "class", "name"]}
        onFilter={(data) => setFilteredData(data)}
      ></UniversalSearchBar>

      {/* Summary Metrics */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 p-4 bg-gray-100 rounded shadow text-center">
          <p className="text-gray-600">Total Students</p>
          <p className="text-2xl font-bold">{filteredStudents.length}</p>
        </div>

        <div className="flex-1 p-4 bg-gray-100 rounded shadow text-center">
          <p className="text-gray-600">Avg Class Test Score</p>
          <p className="text-2xl font-bold">
            {filteredStudents.length > 0
              ? avg(filteredStudents.map((s) => s.avgClassTest))
              : 0}
          </p>
        </div>

        <div className="flex-1 p-4 bg-gray-100 rounded shadow text-center">
          <p className="text-gray-600">Avg Mid-Term Score</p>
          <p className="text-2xl font-bold">
            {filteredStudents.length > 0
              ? avg(filteredStudents.map((s) => s.avgMidTerm))
              : 0}
          </p>
        </div>

        <div className="flex-1 p-4 bg-gray-100 rounded shadow text-center">
          <p className="text-gray-600">Avg Semester Score</p>
          <p className="text-2xl font-bold">
            {filteredStudents.length > 0
              ? avg(filteredStudents.map((s) => s.semesterAvg))
              : 0}
          </p>
        </div>
      </div>

      {/* Top & Bottom Performer */}
      {filteredStudents.length > 0 && (
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="flex-1 p-4 bg-green-100 rounded shadow text-center">
            <p className="text-gray-600 font-medium">Top Performer</p>
            <p className="text-lg font-bold">{topPerformer.name}</p>
            <p>Semester Avg: {topPerformer.semesterAvg}</p>
          </div>

          <div className="flex-1 p-4 bg-red-100 rounded shadow text-center">
            <p className="text-gray-600 font-medium">Lowest Performer</p>
            <p className="text-lg font-bold">{bottomPerformer.name}</p>
            <p>Semester Avg: {bottomPerformer.semesterAvg}</p>
          </div>
        </div>
      )}

      {/* Performance Table */}
      <div className="overflow-x-auto border rounded shadow mt-4">
        <table className="w-full text-left border-collapse bg-white">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Student ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Class</th>
              <th className="p-3 border text-center">Avg Class Test</th>
              <th className="p-3 border text-center">Avg Mid-Term</th>
              <th className="p-3 border text-center">Semester 1</th>
              <th className="p-3 border text-center">Semester 2</th>
              <th className="p-3 border text-center">Final Semester</th>
              <th className="p-3 border text-center font-semibold">
                Semester Avg
              </th>
              <th className="p-3 border text-center font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((s, index) => (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">{s.id}</td>
                <td className="p-3 border">{s.name}</td>
                <td className="p-3 border">{s.class}</td>
                <td className="p-3 border text-center">{s.avgClassTest}</td>
                <td className="p-3 border text-center">{s.avgMidTerm}</td>
                <td className="p-3 border text-center">{s.semesters[0]}</td>
                <td className="p-3 border text-center">{s.semesters[1]}</td>
                <td className="p-3 border text-center">{s.semesters[2]}</td>
                <td className="p-3 border text-center font-semibold">
                  {s.semesterAvg}
                </td>
                <td className="p-3 border text-center font-semibold"></td>
              </tr>
            ))}

            {filteredStudents.length === 0 && (
              <tr>
                <td
                  colSpan="11"
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

export default StudentPerformance;
