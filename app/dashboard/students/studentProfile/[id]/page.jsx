'use client';
import useStudents from "@/app/Hooks/useStudents";
import { useParams } from "next/navigation";
import React from "react";

const StudentProfile = () => {
  const params = useParams();
  const studentId = Number(params.id); // <-- get from URL and convert to number

  const{students} = useStudents();

  console.log(params)

  const student = students.find(s => s.id === studentId);

  if (!student) return <div className="p-6 text-center">No student found</div>;

  const attendancePercentage = ((student.present / student.total) * 100).toFixed(1);
  const avgScore = arr => (arr.reduce((a,b)=>a+b,0)/arr.length).toFixed(1);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="flex items-center gap-4 border-b pb-4 mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600">
          {student.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{student.name}</h1>
          <p className="text-gray-600">{student.class}</p>
          <p className="text-gray-500">ID: {student.id}</p>
        </div>
      </div>

      {/* Info Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 border rounded shadow-sm bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Personal Info</h2>
          <p><strong>Age:</strong> {student.age}</p>
          <p><strong>Mobile:</strong> {student.mobile}</p>
          <p><strong>Parent:</strong> {student.fatherName}</p>
          <p><strong>Parent:</strong> {student.motherName}</p>
        </div>
        <div className="p-4 border rounded shadow-sm bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Attendance</h2>
          <p><strong>Total Days:</strong> {student.total}</p>
          <p><strong>Days Present:</strong> {student.present}</p>
          <p><strong>Attendance %:</strong> {attendancePercentage}%</p>
        </div>
        <div className="p-4 border rounded shadow-sm bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Marks Overview</h2>
          <p><strong>Monthly Tests Avg:</strong> {avgScore(student.monthlyTests)}</p>
          <p><strong>Mid-Term Avg:</strong> {avgScore(student.midTerms)}</p>
          <p><strong>Semester Avg:</strong> {avgScore(student.semesters)}</p>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Edit Profile</button>
        <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">View Report</button>
        <button className="flex-1 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Print</button>
      </div>
    </div>
  );
};

export default StudentProfile;
