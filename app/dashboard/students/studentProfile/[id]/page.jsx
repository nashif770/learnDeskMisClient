"use client";
import useUserData from "@/app/Hooks/useUserData";
import { useParams } from "next/navigation";
import React from "react";

const StudentProfile = () => {
  const params = useParams();
  const studentId = Number(params.id); // get from URL and convert to number
  const { userData } = useUserData();
  const students = userData;

  const student = students.find((s) => s.id === studentId);
  if (!student)
    return (
      <div className="p-6 text-center text-gray-500">No student found</div>
    );

  const attendancePercentage = (
    (student.present / student.total) *
    100
  ).toFixed(1);
  const avgScore = (arr) =>
    (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-6 bg-white p-6 rounded-lg shadow-md">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-600">
          {student.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{student.name}</h1>
          <p className="text-gray-600 mt-1">{student.class}</p>
          <p className="text-gray-500 mt-1">ID: {student.id}</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center p-4 bg-emerald-50 rounded-lg shadow hover:shadow-lg transition">
          <p className="text-gray-600">Monthly Test Avg</p>
          <p className="text-2xl font-bold text-emerald-700">
            {avgScore(student.monthlyTests)}
          </p>
        </div>
        <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg shadow hover:shadow-lg transition">
          <p className="text-gray-600">Mid-Term Avg</p>
          <p className="text-2xl font-bold text-blue-700">
            {avgScore(student.midTerms)}
          </p>
        </div>
        <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg shadow hover:shadow-lg transition">
          <p className="text-gray-600">Semester Avg</p>
          <p className="text-2xl font-bold text-purple-700">
            {avgScore(student.semesters)}
          </p>
        </div>
      </div>

      {/* Detailed Info Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition space-y-2">
          <h2 className="text-xl font-semibold border-b pb-2">Personal Info</h2>
          <p>
            <strong>Age:</strong> {student.age}
          </p>
          <p>
            <strong>Mobile:</strong> {student.mobile}
          </p>
          <p>
            <strong>Father:</strong> {student.fatherName}
          </p>
          <p>
            <strong>Mother:</strong> {student.motherName}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition space-y-2">
          <h2 className="text-xl font-semibold border-b pb-2">Attendance</h2>
          <p>
            <strong>Total Days:</strong> {student.total}
          </p>
          <p>
            <strong>Days Present:</strong> {student.present}
          </p>
          <p>
            <strong>Attendance %:</strong>{" "}
            <span
              className={`font-bold ${
                attendancePercentage >= 75
                  ? "text-green-600"
                  : attendancePercentage >= 50
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {attendancePercentage}%
            </span>
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition space-y-2">
          <h2 className="text-xl font-semibold border-b pb-2">
            Marks Overview
          </h2>
          <p>
            <strong>CTs Avg:</strong> {avgScore(student.monthlyTests)}
          </p>
          <p>
            <strong>Mid-Term Avg:</strong> {avgScore(student.midTerms)}
          </p>
          <p>
            <strong>Semester Avg:</strong> {avgScore(student.semesters)}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4">
        <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Edit Profile
        </button>
        <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
          View Report
        </button>
        <button className="flex-1 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">
          Print
        </button>
      </div>
    </div>
  );
};

export default StudentProfile;
