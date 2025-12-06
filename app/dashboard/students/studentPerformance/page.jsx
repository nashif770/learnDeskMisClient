"use client";
import useStudents from "@/app/Hooks/useStudents";
import React, { useState } from "react";

const StudentPerformance = () => {
  const {students}= useStudents()

  const [filterClass, setFilterClass] = useState("");
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");

  const avg = (arr) => (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1);

  // Filtered students
  let filteredStudents = students.filter(
    (s) =>
      (filterClass ? s.class === filterClass : true) &&
      s.name.toLowerCase().includes(search.toLowerCase())
  );

  // Map semester averages for sorting
  filteredStudents = filteredStudents.map((s) => ({
    ...s,
    avgClassTest: Number(avg(s.monthlyTests)),
    avgMidTerm: Number(avg(s.midTerms)),
    semesterAvg: Number(avg(s.semesters)),
  }));

  // Sorting logic
  if (sortOption) {
    filteredStudents.sort((a, b) => {
      if (sortOption === "name") return a.name.localeCompare(b.name);
      return b[sortOption] - a[sortOption]; // descending for scores
    });
  }

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
      <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
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
          <option value="Class 7">Class 7</option>
          <option value="Class 9">Class 9</option>
        </select>

        <select
          className="border p-2 rounded w-full md:w-1/4"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="name">Name</option>
          <option value="avgClassTest">Avg Class Test</option>
          <option value="avgMidTerm">Avg Mid-Term</option>
          <option value="semesterAvg">Semester Avg</option>
        </select>

        <button
          onClick={() => {
            setFilterClass("");
            setSearch("");
            setSortOption("");
          }}
          className="border px-3 py-2 rounded hover:bg-gray-100"
        >
          Reset
        </button>
      </div>

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
