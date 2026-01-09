"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useStudentData from "@/app/Hooks/useStudentData";
import {
  ArrowLeftIcon,
  MapPinIcon,
  HeartIcon,
  IdentificationIcon,
  BookOpenIcon,
  ClipboardDocumentCheckIcon,
  TrophyIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import EditStudentModal from "../componant/EditStudent";

// ... (DataField, Card, StatBox, PledgeBox components remain the same)
const DataField = ({ label, value }) => (
  <div className="py-2 border-b border-slate-100 last:border-0">
    <p className="text-xs font-bold text-slate-500 uppercase mb-1">{label}</p>
    <p className="text-lg font-semibold text-slate-900 leading-tight">
      {value || "Not Provided"}
    </p>
  </div>
);

const Card = ({ title, children, icon: Icon, fullWidth = false }) => (
  <section className={`bg-white rounded-xl border border-slate-300 p-6 shadow-md space-y-4 ${fullWidth ? "lg:col-span-2" : ""}`}>
    <div className="flex items-center gap-3 border-b-2 border-emerald-500 pb-3">
      <div className="text-slate-900">{Icon && <Icon className="w-6 h-6" />}</div>
      <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide">{title}</h2>
    </div>
    <div className="space-y-1">{children}</div>
  </section>
);

const StatBox = ({ label, value, isPrimary = false, icon: Icon }) => (
  <div className={`p-6 rounded-xl border-2 ${isPrimary ? "bg-slate-900 border-slate-900" : "bg-white border-slate-200"} shadow-sm flex flex-col items-center justify-center relative overflow-hidden`}>
    {Icon && <Icon className={`absolute -right-4 -bottom-4 w-24 h-24 opacity-10 ${isPrimary ? "text-emerald-400" : "text-slate-900"}`} />}
    <p className={`text-xs font-black uppercase mb-2 z-10 ${isPrimary ? "text-emerald-400" : "text-slate-500"}`}>{label}</p>
    <p className={`text-5xl font-black z-10 ${isPrimary ? "text-white" : "text-slate-900"}`}>{value}</p>
  </div>
);

const PledgeBox = ({ label, text }) => (
  <div className="p-5 bg-emerald-50 rounded-lg border border-emerald-200">
    <h4 className="text-xs font-black text-emerald-700 uppercase mb-2">{label}</h4>
    <p className="text-base text-slate-800 leading-relaxed font-medium italic">"{text || "No formal statement recorded."}"</p>
  </div>
);

const StudentProfilePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { studentData, loading } = useStudentData(); // Using loading from hook
  const [performance, setPerformance] = useState({ avgGPA: 0, attendance: 0, rank: "N/A" });
  const [classHistory, setClassHistory] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (loading || !studentData) return;

    const studentsWithGrades = studentData
      .map((s) => {
        const avg = s.performance?.math
          ? (Number(s.performance.math) + Number(s.performance.science) + Number(s.performance.english)) / 3
          : 0;
        return { id: s._id, avg };
      })
      .sort((a, b) => b.avg - a.avg);

    const student = studentData.find((s) => s._id === id);
    if (student) {
      const currentRankIndex = studentsWithGrades.findIndex((s) => s.id === id);
      const avgGPA = student.performance?.math
        ? ((Number(student.performance.math) + Number(student.performance.science) + Number(student.performance.english)) / 3).toFixed(1)
        : "0.0";

      setPerformance({
        avgGPA,
        attendance: student.performance?.attendance || 0,
        rank: currentRankIndex !== -1 ? currentRankIndex + 1 : "N/A",
      });

      setClassHistory([
        { year: "2022", grade: "Class 7", attendance: "94%", subjects: { math: 85, science: 78, english: 88 }, status: "Promoted" },
        { year: "2023", grade: "Class 8", attendance: "91%", subjects: { math: 92, science: 84, english: 80 }, status: "Promoted" },
        { year: "2024", grade: "Class 9", attendance: "96%", subjects: { math: "Pending", science: "Pending", english: "Pending" }, status: "Current" },
      ]);
    }
  }, [id, studentData, loading]);

  // 1. IMPROVED LOADING UI
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-10 space-y-6">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-12 h-12 bg-slate-900 rounded-lg animate-pulse"></div>
          </div>
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Syncing Ledger</h2>
          <p className="text-slate-500 font-bold animate-pulse">Decrypting Student Profile Data...</p>
        </div>
      </div>
    );
  }

  const student = studentData?.find((s) => s._id === id);

  // 2. ERROR STATE
  if (!student) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-10">
        <div className="bg-white p-8 rounded-2xl border-2 border-red-200 shadow-xl text-center max-w-md">
           <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <IdentificationIcon className="w-8 h-8" />
           </div>
           <h2 className="text-2xl font-black text-slate-900 mb-2 uppercase">Identity Not Found</h2>
           <p className="text-slate-500 font-medium mb-6">The System ID provided does not match any records in our current ledger.</p>
           <button onClick={() => router.push('/dashboard/students')} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">
              Return to Roster
           </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ACTION BAR */}
        <div className="flex justify-between items-center print:hidden">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-5 py-2 bg-white border border-slate-300 rounded-lg font-bold text-slate-700 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
          >
            <ArrowLeftIcon className="w-5 h-5" /> Back
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2 bg-white border border-slate-300 rounded-lg font-bold text-slate-700 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm"
            >
              <PencilSquareIcon className="w-5 h-5" /> Edit Profile
            </button>

            <button
              onClick={() => window.print()}
              className="px-5 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 shadow-md"
            >
              Print Official Report
            </button>
          </div>
        </div>

        {/* HEADER: IDENTITY CARD */}
        <div className="bg-white p-8 rounded-xl border-2 border-slate-300 shadow-md flex flex-col md:flex-row items-center gap-10">
          <div className="w-40 h-40 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-7xl font-bold border-4 border-emerald-500 shrink-0 relative">
            {student.userNameEn?.charAt(0)}
            <div className="absolute -top-4 -right-4 bg-emerald-500 text-slate-900 w-12 h-12 rounded-full border-4 border-white flex items-center justify-center text-xl font-black">
              #{performance.rank}
            </div>
          </div>

          <div className="text-center md:text-left flex-1">
            <h1 className="text-5xl font-black text-slate-900 mb-1 uppercase tracking-tighter">
              {student.userNameEn}
            </h1>
            <p className="text-3xl font-bold text-emerald-600 mb-6 leading-none">
              {student.userNameBn}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-2 rounded border border-slate-200">
                <p className="text-[10px] font-black text-slate-400 uppercase">System ID</p>
                <p className="font-bold">{student.Id}</p>
              </div>
              <div className="bg-slate-50 p-2 rounded border border-slate-200">
                <p className="text-[10px] font-black text-slate-400 uppercase">Class Rank</p>
                <p className="font-bold text-emerald-600">Position: {performance.rank}</p>
              </div>
              <div className="bg-slate-50 p-2 rounded border border-slate-200">
                <p className="text-[10px] font-black text-slate-400 uppercase">Blood</p>
                <p className="font-bold text-red-600">{student.bloodGroup}</p>
              </div>
              <div className="bg-slate-50 p-2 rounded border border-slate-200">
                <p className="text-[10px] font-black text-slate-400 uppercase">Status</p>
                <p className="font-bold text-blue-600">Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* TOP LEVEL PERFORMANCE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatBox label="Current Rank" value={performance.rank} icon={TrophyIcon} />
          <StatBox label="Aggregate Score" value={performance.avgGPA} isPrimary={true} />
          <StatBox label="Attendance" value={`${performance.attendance}%`} />
        </div>

        {/* MAIN LEDGER DATA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card title="Vital Statistics" icon={IdentificationIcon}>
            <DataField label="Date of Birth" value={student.dobReg} />
            <DataField label="National ID / BNID" value={student.BNID} />
            <DataField label="Place of Birth" value={student.birthPlace} />
            <DataField label="Contact" value={student.mobile} />
            <DataField label="Curricular Interest" value={student.extraCurriculumn} />
          </Card>

          <Card title="Detailed Academic History" icon={BookOpenIcon} fullWidth={true}>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-900 text-emerald-400">
                  <tr>
                    <th className="px-4 py-3 text-xs font-black uppercase">Session</th>
                    <th className="px-4 py-3 text-xs font-black uppercase">Grade</th>
                    <th className="px-4 py-3 text-xs font-black uppercase text-center">Math</th>
                    <th className="px-4 py-3 text-xs font-black uppercase text-center">Sci</th>
                    <th className="px-4 py-3 text-xs font-black uppercase text-center">Eng</th>
                    <th className="px-4 py-3 text-xs font-black uppercase text-center">Attd.</th>
                    <th className="px-4 py-3 text-xs font-black uppercase">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {classHistory.map((item, idx) => (
                    <tr key={idx} className="hover:bg-emerald-50 transition-colors">
                      <td className="px-4 py-4 text-sm font-bold text-slate-700">{item.year}</td>
                      <td className="px-4 py-4 text-sm font-black text-slate-900">{item.grade}</td>
                      <td className="px-4 py-4 text-sm font-bold text-center text-slate-600">{item.subjects.math}</td>
                      <td className="px-4 py-4 text-sm font-bold text-center text-slate-600">{item.subjects.science}</td>
                      <td className="px-4 py-4 text-sm font-bold text-center text-slate-600">{item.subjects.english}</td>
                      <td className="px-4 py-4 text-sm font-bold text-center text-blue-600">{item.attendance}</td>
                      <td className="px-4 py-4">
                        <span className={`text-[10px] font-black px-3 py-1 rounded-md uppercase border ${item.status === "Promoted" ? "border-emerald-500 text-emerald-600 bg-emerald-50" : "border-blue-500 text-blue-600 bg-blue-50"}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card title="Residential Address" icon={MapPinIcon}>
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h4 className="text-xs font-black text-blue-600 uppercase mb-1">Current Residence</h4>
                  <p className="text-lg font-bold">{student.currentAddress}</p>
                  <p className="text-sm font-bold text-slate-500 uppercase">{student.currentThana} • {student.currentDistrict}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h4 className="text-xs font-black text-slate-400 uppercase mb-1">Permanent Root</h4>
                  <p className="text-lg font-bold">{student.permanentAddress}</p>
                  <p className="text-sm font-bold text-slate-500 uppercase">{student.permanentThana} • {student.permanentDistrict}</p>
                </div>
              </div>
            </Card>

            <Card title="Guardian & Lineage" icon={HeartIcon}>
              <div className="space-y-6">
                <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                  <div>
                    <p className="text-xs font-black text-emerald-600 uppercase">Father</p>
                    <p className="text-xl font-black text-slate-900">{student.fatherName}</p>
                    <p className="text-sm font-bold text-slate-500">{student.fatherOccupation}</p>
                  </div>
                  <p className="text-sm font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">{student.fatherMobile}</p>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-black text-emerald-600 uppercase">Mother</p>
                    <p className="text-xl font-black text-slate-900">{student.motherName}</p>
                    <p className="text-sm font-bold text-slate-500">{student.motherOccupation}</p>
                  </div>
                  <p className="text-sm font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">{student.motherMobile || "N/A"}</p>
                </div>
              </div>
            </Card>
          </div>

          <Card title="Institutional Pledges" icon={ClipboardDocumentCheckIcon} fullWidth={true}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <PledgeBox label="Student Declaration" text={student.studentPledge} />
              <PledgeBox label="Guardian Declaration" text={student.guardianPledge} />
            </div>
          </Card>
        </div>

        {/* PRINT FOOTER */}
        <div className="hidden print:flex justify-between items-center pt-20 border-t-2 border-slate-900">
          <div className="text-center">
            <div className="w-40 h-px bg-slate-900 mb-2"></div>
            <p className="text-xs font-bold uppercase">Authorized Signature</p>
          </div>
          <div className="text-center font-black uppercase text-xs">Generated on {new Date().toLocaleDateString()}</div>
        </div>
      </div>
      <EditStudentModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} student={student} />
    </main>
  );
};

export default StudentProfilePage;