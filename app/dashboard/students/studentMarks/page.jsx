'use client';
import useStudents from "@/app/Hooks/useStudents";
import React, { useState } from "react";

const studentMarks = () => {

    const {students}= useStudents()
  const [filterClass, setFilterClass] = useState("");
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter(
    (s) =>
      (filterClass ? s.class === filterClass : true) &&
      s.name.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate totals and percentage based on semesters only
  const calculateSemesterTotalAndPercentage = (student) => {
    const total = student.semesters.reduce((a, b) => a + b, 0);
    const max = 100 * student.semesters.length;
    const percentage = ((total / max) * 100).toFixed(1);
    return { total, percentage };
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">📝 Student Marks Overview</h1>

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
          <option value="Class 7">Class 7</option>
          <option value="Class 9">Class 9</option>
        </select>

        <button
          onClick={() => { setFilterClass(""); setSearch(""); }}
          className="border px-3 py-2 rounded hover:bg-gray-100"
        >
          Reset
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded shadow">
        <table className="w-full text-left border-collapse bg-white">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Student ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Class</th>
              <th className="p-3 border text-center">CT1</th>
              <th className="p-3 border text-center">CT2</th>
              <th className="p-3 border text-center">CT3</th>
              <th className="p-3 border text-center">Total CT</th>
              <th className="p-3 border text-center">Mid1</th>
              <th className="p-3 border text-center">Mid2</th>
              <th className="p-3 border text-center">Mid3</th>
              <th className="p-3 border text-center">1st Sem</th>
              <th className="p-3 border text-center">2nd Sem</th>
              <th className="p-3 border text-center">Final Sem</th>
              <th className="p-3 border text-center font-semibold">Total Sem</th>
              <th className="p-3 border text-center font-semibold">Percentage</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((s, index) => {
              const { total, percentage } = calculateSemesterTotalAndPercentage(s);
              const ctTotal = s.monthlyTests.reduce((a, b) => a + b, 0);
              return (
                <tr key={s.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border">{s.id}</td>
                  <td className="p-3 border">{s.name}</td>
                  <td className="p-3 border">{s.class}</td>

                  {/* Class Tests */}
                  <td className="p-3 border text-center">{s.monthlyTests[0]}</td>
                  <td className="p-3 border text-center">{s.monthlyTests[1]}</td>
                  <td className="p-3 border text-center">{s.monthlyTests[2]}</td>
                  <td className="p-3 border text-center font-semibold">{ctTotal}</td>

                  {/* Mid Terms */}
                  <td className="p-3 border text-center">{s.midTerms[0]}</td>
                  <td className="p-3 border text-center">{s.midTerms[1]}</td>
                  <td className="p-3 border text-center">{s.midTerms[2]}</td>

                  {/* Semesters */}
                  <td className="p-3 border text-center">{s.semesters[0]}</td>
                  <td className="p-3 border text-center">{s.semesters[1]}</td>
                  <td className="p-3 border text-center">{s.semesters[2]}</td>

                  {/* Total & Percentage based on semesters only */}
                  <td className="p-3 border text-center font-semibold">{total}</td>
                  <td className="p-3 border text-center font-semibold">{percentage}%</td>
                </tr>
              );
            })}

            {filteredStudents.length === 0 && (
              <tr>
                <td
                  colSpan="16"
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

export default studentMarks;
