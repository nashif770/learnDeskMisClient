'use client';
import useStudentData from "@/app/Hooks/useStudentData";
import React, { useState, useEffect } from "react";

const StudentPerformance = () => {
  const { studentData } = useStudentData();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (studentData?.length > 0) {
      setStudents(studentData);
    }
  }, [studentData]);

  // Calculate average marks for a student
  const calculateAverage = (performance) => {
    if (!performance) return "-";
    const subjects = ["math", "science", "english"];
    let total = 0;
    let count = 0;

    subjects.forEach((sub) => {
      if (performance[sub] !== undefined && performance[sub] !== null) {
        total += Number(performance[sub]);
        count++;
      }
    });

    return count > 0 ? (total / count).toFixed(2) : "-";
  };

  // Optional: Convert average to grade
  const getGrade = (avg) => {
    if (avg === "-" || isNaN(avg)) return "-";
    if (avg >= 90) return "A+";
    if (avg >= 80) return "A";
    if (avg >= 70) return "B";
    if (avg >= 60) return "C";
    return "D";
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-emerald-700 mb-4">Student Performance</h2>

      <div className="overflow-x-auto shadow rounded-lg bg-white">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Class</th>
              <th className="p-3 border-b">Average Marks</th>
              <th className="p-3 border-b">Grade</th>
              <th className="p-3 border-b">Attendance (%)</th>
            </tr>
          </thead>

          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => {
                const avg = calculateAverage(student.performance);
                return (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 border-b">{index + 1}</td>
                    <td className="p-3 border-b">{student.userdata?.name}</td>
                    <td className="p-3 border-b">{student.class || "N/A"}</td>
                    <td className="p-3 border-b">{avg}</td>
                    <td className="p-3 border-b">{getGrade(avg)}</td>
                    <td className="p-3 border-b">{student.performance?.attendance || "-"}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500 italic">
                  No student performance data found.
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
