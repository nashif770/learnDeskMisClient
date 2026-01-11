"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useStudentData from "@/app/Hooks/useStudentData";
import {
  ArrowLeftIcon,
  MapPinIcon,
  HeartIcon,
  IdentificationIcon,
  BookOpenIcon,
  ClipboardDocumentCheckIcon,
  PencilSquareIcon,
  PrinterIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import EditStudentModal from "../componant/EditStudent";

// --- COMPACT DATA ROW ---
const DataRow = ({ label, value, highlight = false }) => (
  <div className="py-2 px-3 hover:bg-slate-50 transition-colors rounded-lg border-b border-slate-50 last:border-0">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
    <p className={`text-sm font-semibold ${highlight ? "text-indigo-600" : "text-slate-900"}`}>
      {value || "—"}
    </p>
  </div>
);

const SectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
    <Icon className="w-4 h-4 text-indigo-500" />
    <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest">{title}</h3>
  </div>
);

const StudentProfilePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { studentData, loading } = useStudentData();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const student = studentData?.find((s) => s._id === id);

  if (loading) return <div className="p-20 text-center animate-pulse font-bold text-slate-400 uppercase tracking-widest">Accessing Ledger...</div>;
  if (!student) return <div className="p-20 text-center text-red-500 font-bold">Record Not Found</div>;

  return (
    <main className="min-h-screen bg-[#f1f5f9] p-4 md:p-10 text-slate-900">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* TOP TOOLBAR */}
        <div className="flex justify-between items-center print:hidden">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900">
            <ArrowLeftIcon className="w-4 h-4" /> Back to Roster
          </button>
          <div className="flex gap-2">
            <button onClick={() => setIsEditModalOpen(true)} className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold hover:shadow-md flex items-center gap-2">
              <PencilSquareIcon className="w-4 h-4" /> Edit Profile
            </button>
            <button onClick={() => window.print()} className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 flex items-center gap-2">
              <PrinterIcon className="w-4 h-4" /> Print Ledger
            </button>
          </div>
        </div>

        {/* PRIMARY IDENTITY HEADER */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="h-2 bg-indigo-600 w-full" />
          <div className="p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200">
               <UserIcon className="w-12 h-12" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-end gap-3 mb-4">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">{student.userNameEn}</h1>
                <p className="text-2xl font-bold text-indigo-600 pb-1">{student.userNameBn}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">System ID</p>
                  <p className="font-mono font-bold text-slate-700">{student.Id || student._id.slice(-8).toUpperCase()}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Blood Group</p>
                  <p className="font-bold text-red-600">{student.bloodGroup || "Not Set"}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Primary Mobile</p>
                  <p className="font-bold text-slate-700">{student.mobile || "None"}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Status</p>
                  <p className="font-bold text-emerald-600">Active Record</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN DATA GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* VITAL INFORMATION */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <SectionHeader icon={IdentificationIcon} title="Vital Information" />
            <div className="grid grid-cols-2 gap-x-6">
              <DataRow label="Date of Birth" value={student.dobReg} />
              <DataRow label="Birth Place" value={student.birthPlace} />
              <DataRow label="BNID Number" value={student.BNID} />
              <DataRow label="Education Lvl" value={student.education === "0" ? "Primary" : student.education} />
              <DataRow label="Curricular Interest" value={student.extraCurriculumn === "0" ? "General" : student.extraCurriculumn} />
            </div>
          </div>

          {/* FAMILY & GUARDIAN */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <SectionHeader icon={HeartIcon} title="Lineage & Guardianship" />
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-indigo-500 uppercase">Father</p>
                  <p className="text-base font-bold text-slate-900">{student.fatherName}</p>
                  <p className="text-xs text-slate-500 font-medium italic">{student.fatherOccupation}</p>
                </div>
                <p className="text-xs font-bold bg-slate-100 px-3 py-1 rounded-full">{student.fatherMobile || "No Mobile"}</p>
              </div>
              <div className="flex justify-between items-start gap-4 pt-3 border-t border-slate-50">
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-indigo-500 uppercase">Mother</p>
                  <p className="text-base font-bold text-slate-900">{student.motherName}</p>
                  <p className="text-xs text-slate-500 font-medium italic">{student.motherOccupation}</p>
                </div>
                <p className="text-xs font-bold bg-slate-100 px-3 py-1 rounded-full">{student.motherMobile || "No Mobile"}</p>
              </div>
            </div>
          </div>

          {/* ADDRESS RECORDS */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
            <SectionHeader icon={MapPinIcon} title="Geographic Records" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-50 pb-1">Current Address</p>
                <div className="grid grid-cols-2 gap-2">
                  <DataRow label="Residence" value={student.currentAddress} />
                  <DataRow label="Post Office" value={student.currentPostOffice} />
                  <DataRow label="Thana" value={student.currentThana} />
                  <DataRow label="District" value={`${student.currentDistrict}, ${student.currentDivision}`} />
                  <DataRow label="Post Code" value={student.currentPostCode} />
                </div>
              </div>
              <div className="space-y-1 border-l border-slate-100 pl-0 md:pl-8">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-50 pb-1">Permanent Address</p>
                <div className="grid grid-cols-2 gap-2">
                  <DataRow label="Residence" value={student.permanentAddress} />
                  <DataRow label="Post Office" value={student.permanentPostOffice} />
                  <DataRow label="Thana" value={student.permanentThana} />
                  <DataRow label="District" value={student.permanentDistrict} />
                  <DataRow label="Post Code" value={student.permanentPostCode} />
                </div>
              </div>
            </div>
          </div>

          {/* LEGAL PLEDGES */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
            <SectionHeader icon={ClipboardDocumentCheckIcon} title="Official Declarations" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 italic text-sm text-slate-600">
                <p className="text-[10px] not-italic font-bold text-slate-400 uppercase mb-2">Student Pledge</p>
                "{student.studentPledge || "No formal declaration recorded by the student for this session."}"
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 italic text-sm text-slate-600">
                <p className="text-[10px] not-italic font-bold text-slate-400 uppercase mb-2">Guardian Pledge</p>
                "{student.guardianPledge || "The guardian has not provided a formal pledge at this time."}"
              </div>
            </div>
          </div>
        </div>

        {/* COMPACT FOOTER */}
        <div className="text-center py-6 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] print:block hidden">
          Official Electronic Transcript • Generated {new Date().toLocaleDateString()}
        </div>
      </div>

      <EditStudentModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} student={student} />
    </main>
  );
};

export default StudentProfilePage;