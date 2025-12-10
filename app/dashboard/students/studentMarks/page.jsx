"use client";
import useUserData from "@/app/Hooks/useUserData";
import UniversalSearchBar from "@/app/shared/UniversalSearchBar";
import React, { useEffect, useState } from "react";

const StudentMarks = () => {
  const { userData } = useUserData();
  const students = userData;

  const [filteredData, setFilteredData] = useState(students);

  useEffect(() => {
    if (students.length > 0) setFilteredData(students);
  }, [students]);

  const calculateSemesterTotalAndPercentage = (student) => {
    const total = student.semesters.reduce((a, b) => a + b, 0);
    const max = 100 * student.semesters.length;
    const percentage = ((total / max) * 100).toFixed(1);
    return { total, percentage };
  };

  // Overall summary
  const totalStudents = filteredData.length;
  const avgPercentage =
    totalStudents > 0
      ? (
          filteredData.reduce(
            (acc, s) =>
              acc + calculateSemesterTotalAndPercentage(s).percentage * 1,
            0
          ) / totalStudents
        ).toFixed(1)
      : 0;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-emerald-700">
        📝 Student Marks Overview
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col items-center p-4 bg-white shadow rounded-lg hover:shadow-lg transition">
          <p className="text-gray-500">Total Students</p>
          <p className="text-3xl font-bold text-emerald-600">{totalStudents}</p>
        </div>
        <div className="flex flex-col items-center p-4 bg-white shadow rounded-lg hover:shadow-lg transition">
          <p className="text-gray-500">Average Percentage</p>
          <p className="text-3xl font-bold text-blue-600">{avgPercentage}%</p>
        </div>
      </div>

      {/* Filters */}
      <UniversalSearchBar
        data={students}
        filterKeys={["class"]}
        sortKeys={["id", "class", "name"]}
        onFilter={(data) => setFilteredData(data)}
      />

      {/* Marks Table */}
      <div className="overflow-x-auto mt-4 shadow rounded-lg">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-100 text-gray-700 sticky top-0">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Student ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Class</th>
              <th className="p-3 border text-center">CT1</th>
              <th className="p-3 border text-center">CT2</th>
              <th className="p-3 border text-center">CT3</th>
              <th className="p-3 border text-center font-semibold">Total CT</th>
              <th className="p-3 border text-center">Mid1</th>
              <th className="p-3 border text-center">Mid2</th>
              <th className="p-3 border text-center">Mid3</th>
              <th className="p-3 border text-center">1st Sem</th>
              <th className="p-3 border text-center">2nd Sem</th>
              <th className="p-3 border text-center">Final Sem</th>
              <th className="p-3 border text-center font-semibold">
                Total Sem
              </th>
              <th className="p-3 border text-center font-semibold">
                Percentage
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((s, index) => {
                const { total, percentage } =
                  calculateSemesterTotalAndPercentage(s);
                const ctTotal = s.monthlyTests.reduce((a, b) => a + b, 0);
                const percentageColor =
                  percentage >= 75
                    ? "text-green-600"
                    : percentage >= 50
                    ? "text-yellow-600"
                    : "text-red-600";

                return (
                  <tr
                    key={s.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3 border">{index + 1}</td>
                    <td className="p-3 border">{s.id}</td>
                    <td className="p-3 border">{s.name}</td>
                    <td className="p-3 border">{s.class}</td>

                    {/* Class Tests */}
                    {s.monthlyTests.map((test, i) => (
                      <td key={i} className="p-3 border text-center">
                        {test}
                      </td>
                    ))}
                    <td className="p-3 border text-center font-semibold">
                      {ctTotal}
                    </td>

                    {/* Mid Terms */}
                    {s.midTerms.map((mid, i) => (
                      <td key={i} className="p-3 border text-center">
                        {mid}
                      </td>
                    ))}

                    {/* Semesters */}
                    {s.semesters.map((sem, i) => (
                      <td key={i} className="p-3 border text-center">
                        {sem}
                      </td>
                    ))}

                    <td className="p-3 border text-center font-semibold">
                      {total}
                    </td>
                    <td
                      className={`p-3 border text-center font-semibold ${percentageColor}`}
                    >
                      {percentage}%
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="16"
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

export default StudentMarks;
