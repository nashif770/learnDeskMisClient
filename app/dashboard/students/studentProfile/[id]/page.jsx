"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useStudentData from "@/app/Hooks/useStudentData";

// ===== Reusable Components =====
const DataField = ({ label, value }) => (
  <div className="mb-1">
    <p className="text-sm font-semibold text-black uppercase">{label}</p>
    <p className="text-base font-medium text-gray-900">{value || "—"}</p>
  </div>
);

const Card = ({ title, children }) => (
  <section className="bg-white rounded-md border border-emerald-500 p-3 shadow-sm space-y-2">
    <h2 className="text-sm font-semibold text-black uppercase border-b border-emerald-500 pb-1 mb-2">
      {title}
    </h2>
    <div className="grid grid-cols-1 gap-2">{children}</div>
  </section>
);

const Badge = ({ label, value }) => (
  <div className="px-3 py-2 bg-emerald-600 text-white rounded-md flex flex-col items-center shadow w-32">
    <span className="text-xs font-semibold uppercase">{label}</span>
    <span className="text-sm font-bold">{value}</span>
  </div>
);

const PledgeBox = ({ label, text }) => (
  <div className="p-2 bg-emerald-50 rounded border border-emerald-400 text-sm">
    <h4 className="font-semibold uppercase mb-1 text-black">{label}</h4>
    <p className="italic text-gray-800">{text || "No pledge on record."}</p>
  </div>
);

const RelationRow = ({ name, role, meta, phone, note }) => (
  <div className="mb-1">
    <p className="text-sm font-semibold uppercase text-black">{role}</p>
    <p className="text-base font-medium text-gray-900">{name}</p>
    {meta && <p className="text-sm text-gray-700">{meta}</p>}
    {phone && <p className="text-sm text-gray-700">Phone: {phone}</p>}
    {note && (
      <div className="p-1 bg-emerald-50 border border-emerald-300 text-xs rounded text-gray-800">
        Note: {note}
      </div>
    )}
  </div>
);

const StatCard = ({ title, value }) => (
  <div className="p-2 bg-emerald-600 text-white rounded-md flex flex-col items-center shadow w-36">
    <span className="text-xs font-semibold uppercase">{title}</span>
    <span className="text-sm font-bold">{value}</span>
  </div>
);

// ===== Main Page =====
const StudentProfilePage = () => {
  const { id } = useParams();
  const { studentData } = useStudentData();
  const [performance, setPerformance] = useState({
    avgGPA: 0,
    attendance: 0,
    excellenceRate: 0,
  });

  useEffect(() => {
    if (!studentData) return;
    const student = studentData.find((s) => s._id === id);
    if (student) {
      const avgGPA =
        student.performance?.math && student.performance?.science && student.performance?.english
          ? ((Number(student.performance.math) +
              Number(student.performance.science) +
              Number(student.performance.english)) / 3
          ).toFixed(1)
          : 0;
      const attendance = student.performance?.attendance || 0;
      const excellenceRate = avgGPA >= 80 ? 100 : 0;
      setPerformance({ avgGPA, attendance, excellenceRate });
    }
  }, [id, studentData]);

  if (!studentData)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-black uppercase">Fetching Dossier...</p>
      </div>
    );

  const student = studentData.find((s) => s._id === id);
  if (!student)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-emerald-100 rounded-md border-2 border-emerald-400">
          <h1 className="text-4xl mb-2 text-black">🚫</h1>
          <p className="text-lg font-semibold text-black uppercase">Record Not Found</p>
        </div>
      </div>
    );

  return (
    <main className="min-h-screen bg-emerald-50 pb-4 px-2">
      {/* Top Stats and Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-2 p-3">
        <div className="col-span-1 flex justify-center items-center">
          <div className="w-20 h-20 bg-emerald-700 text-white rounded-full flex items-center justify-center text-xl font-bold shadow">
            {student.userNameEn?.charAt(0)}
          </div>
        </div>
        <div className="col-span-2 flex flex-col justify-center text-black">
          <h1 className="text-lg font-semibold">{student.userNameEn}</h1>
          <h2 className="text-sm font-medium">{student.userNameBn}</h2>
        </div>
        <Badge label="Unique ID" value={student.Id} />
        <Badge label="Blood Type" value={student.bloodGroup} />
        <Badge label="Education" value={student.education} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-2">
        <StatCard title="Avg GPA" value={performance.avgGPA} />
        <StatCard title="Attendance %" value={`${performance.attendance}%`} />
        <StatCard title="Excellence Rate" value={`${performance.excellenceRate}%`} />
        {/* Empty slots for symmetry */}
        <div></div><div></div><div></div>
      </div>

      {/* Main content: dense 3-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <Card title="Personal History">
          <DataField label="Birth Date" value={student.dobReg} />
          <DataField label="BNID / Registration" value={student.BNID} />
          <DataField label="Place of Origin" value={student.birthPlace} />
          <DataField label="Primary Contact" value={student.mobile} />
          <DataField label="Extra Curricular" value={student.extraCurriculumn} />
        </Card>

        <Card title="Residence">
          <DataField label="Current Address" value={student.currentAddress} />
          <DataField label="Current PO / Postcode" value={`${student.currentPostOffice} (${student.currentPostCode})`} />
          <DataField label="Current District / Thana" value={`${student.currentThana} • ${student.currentDistrict}`} />
          <DataField label="Permanent Address" value={student.permanentAddress} />
          <DataField label="Permanent PO / Postcode" value={`${student.permanentPostOffice} (${student.permanentPostCode})`} />
          <DataField label="Permanent District / Thana" value={`${student.permanentThana} • ${student.permanentDistrict}`} />
        </Card>

        <div className="space-y-2">
          <Card title="Institutional Pledges">
            <PledgeBox label="Student Commitment" text={student.studentPledge} />
            <PledgeBox label="Guardian Commitment" text={student.guardianPledge} />
          </Card>

          <Card title="Family Lineage">
            <RelationRow name={student.fatherName} role="Father" meta={student.fatherOccupation} phone={student.fatherMobile} />
            <RelationRow name={student.motherName} role="Mother" meta={student.motherOccupation} phone={student.motherMobile} />
            <RelationRow name={student.guardianName} role={`Guardian (${student.guardianRelation})`} phone={student.guardianMobile} note={student.guardianNote} />
          </Card>
        </div>
      </div>
    </main>
  );
};

export default StudentProfilePage;
