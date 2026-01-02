"use client";

import React from "react";
import { useParams } from "next/navigation";
import useStudentData from "@/app/Hooks/useStudentData";
import { 
  UserIcon, 
  MapIcon, 
  ShieldCheckIcon, 
  UsersIcon, 
  DocumentCheckIcon,
  HeartIcon,
  PhoneIcon
} from "@heroicons/react/24/outline";

// High-Visibility Data Field
const DataField = ({ label, value, fullWidth = false }) => (
  <div className={`py-4 group ${fullWidth ? "col-span-full" : ""}`}>
    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 group-hover:text-blue-500 transition-colors">
      {label}
    </p>
    <p className="text-lg font-bold text-slate-800 tracking-tight leading-tight">
      {value || "—"}
    </p>
  </div>
);

// High-Visibility Card Container
const Card = ({ title, icon, children, className = "", theme = "blue" }) => {
  const themes = {
    blue: "border-blue-100 text-blue-600",
    emerald: "border-emerald-100 text-emerald-600",
    slate: "border-slate-200 text-slate-900"
  };

  return (
    <section className={`bg-white rounded-[2.5rem] border shadow-sm p-8 transition-all hover:shadow-md ${className}`}>
      <h2 className={`text-xs font-black mb-6 flex items-center gap-3 uppercase tracking-[0.2em] ${themes[theme]}`}>
        <span className="p-2 bg-current bg-opacity-10 rounded-xl">{icon}</span>
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">{children}</div>
    </section>
  );
};

const StudentProfilePage = () => {
  const { id } = useParams();
  const { studentData } = useStudentData();

  if (!studentData)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen space-y-4">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xl font-black text-slate-400 uppercase tracking-widest">Fetching Dossier...</p>
      </div>
    );

  const student = studentData.find((s) => s.Id == id);
  if (!student)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-12 bg-rose-50 rounded-[3rem] border-2 border-rose-100">
          <h1 className="text-8xl mb-4">🚫</h1>
          <p className="text-2xl font-black text-rose-600 uppercase tracking-tighter">Record 404: Not Found</p>
        </div>
      </div>
    );

  return (
    <main className="min-h-screen bg-[#FDFDFD] pb-24">
      {/* MASSIVE HEADER BANNER */}
      <div className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-48 h-48 rounded-[3.5rem] bg-slate-900 flex items-center justify-center text-7xl font-black text-white shadow-2xl ring-[12px] ring-slate-50 relative overflow-hidden group">
              {student.userNameEn?.charAt(0)}
              <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-sm font-black uppercase tracking-widest">
                Update Photo
              </div>
            </div>

            <div className="text-center md:text-left flex-1 space-y-4">
              <div>
                <h1 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">
                  {student.userNameEn}
                </h1>
                <p className="text-2xl text-slate-400 font-bold mt-2 italic">{student.userNameBn}</p>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                <Badge label="Unique ID" value={student.Id} color="blue" />
                <Badge label="Blood Type" value={student.bloodGroup} color="rose" icon={<HeartIcon className="w-4 h-4" />} />
                <Badge label="Education" value={student.education} color="emerald" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Core Dossier */}
          <div className="lg:col-span-8 space-y-8">
            <Card title="Personal History" icon={<UserIcon className="w-5 h-5" />} theme="slate">
              <DataField label="Birth Date (Registry)" value={student.dobReg} />
              <DataField label="BNID / Registration" value={student.BNID} />
              <DataField label="Place of Origin" value={student.birthPlace} />
              <DataField label="Primary Contact" value={student.mobile} />
              <DataField label="Extra Curricular Involvement" value={student.extraCurriculumn} fullWidth />
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card title="Current Residence" icon={<MapIcon className="w-5 h-5" />} theme="blue">
                <div className="col-span-full space-y-3 pt-2">
                  <p className="text-xl font-black text-slate-800 leading-tight">{student.currentAddress}</p>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                    PO: {student.currentPostOffice} ({student.currentPostCode})
                  </p>
                  <div className="h-px bg-slate-100 w-full my-2"></div>
                  <p className="text-sm font-black text-blue-600 uppercase tracking-[0.15em]">
                    {student.currentThana} • {student.currentDistrict}
                  </p>
                </div>
              </Card>

              <Card title="Permanent Domicile" icon={<ShieldCheckIcon className="w-5 h-5" />} theme="slate">
                <div className="col-span-full space-y-3 pt-2">
                  <p className="text-xl font-black text-slate-800 leading-tight">{student.permanentAddress}</p>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                    PO: {student.permanentPostOffice} ({student.permanentPostCode})
                  </p>
                  <div className="h-px bg-slate-100 w-full my-2"></div>
                  <p className="text-sm font-black text-slate-500 uppercase tracking-[0.15em]">
                    {student.permanentThana} • {student.permanentDistrict}
                  </p>
                </div>
              </Card>
            </div>

            <Card title="Institutional Pledges" icon={<DocumentCheckIcon className="w-5 h-5" />} theme="emerald">
              <div className="col-span-full space-y-6">
                <PledgeBox label="Student Commitment" text={student.studentPledge} />
                <PledgeBox label="Guardian Commitment" text={student.guardianPledge} />
              </div>
            </Card>
          </div>

          {/* RIGHT COLUMN: Relations & Verification */}
          <div className="lg:col-span-4 space-y-8">
            <Card title="Family Lineage" icon={<UsersIcon className="w-5 h-5" />} theme="slate" className="bg-slate-50 border-slate-200">
              <div className="col-span-full space-y-8">
                <RelationRow name={student.fatherName} role="Father" meta={student.fatherOccupation} phone={student.fatherMobile} />
                <RelationRow name={student.motherName} role="Mother" meta={student.motherOccupation} phone={student.motherMobile} />
                <RelationRow 
                  name={student.guardianName} 
                  role={`Guardian (${student.guardianRelation})`} 
                  phone={student.guardianMobile} 
                  note={student.guardianNote}
                />
              </div>
            </Card>

            <Card title="Verification Status" icon={<ShieldCheckIcon className="w-5 h-5" />} theme="blue">
              <div className="col-span-full space-y-4">
                <DocStatus label="Academic Transcripts" status={Object.keys(student.docEducation || {}).length > 0} />
                <DocStatus label="Identity (NID/Birth)" status={Object.keys(student.docNIDBirth || {}).length > 0} />
                <DocStatus label="Guardian Identity" status={Object.keys(student.docGuardianNID || {}).length > 0} />
              </div>
            </Card>
          </div>

        </div>
      </div>
    </main>
  );
};

// UI Components
const Badge = ({ label, value, color, icon }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    rose: "bg-rose-50 text-rose-700 border-rose-100",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
  };
  return (
    <div className={`px-6 py-3 rounded-2xl border-2 flex items-center gap-3 shadow-sm ${colors[color]}`}>
      <div className="flex flex-col">
        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{label}</span>
        <span className="text-base font-black flex items-center gap-2">{icon} {value}</span>
      </div>
    </div>
  );
};

const PledgeBox = ({ label, text }) => (
  <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 relative group overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-5 text-4xl font-black italic select-none">PLEDGE</div>
    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{label}</h4>
    <p className="text-lg text-slate-700 leading-relaxed font-medium italic">"{text || "No pledge on record."}"</p>
  </div>
);

const RelationRow = ({ name, role, meta, phone, note }) => (
  <div className="group">
    <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">{role}</p>
    <p className="text-xl font-black text-slate-900 tracking-tight">{name}</p>
    {meta && <p className="text-sm font-bold text-slate-400 mb-2">{meta}</p>}
    <div className="flex items-center gap-2 text-blue-600 font-black text-sm bg-white w-fit px-3 py-1 rounded-lg border border-blue-50 mt-1">
      <PhoneIcon className="w-3 h-3" /> {phone}
    </div>
    {note && (
      <div className="mt-4 p-4 bg-amber-50 rounded-2xl border border-amber-100 text-xs font-bold text-amber-700">
        Note: {note}
      </div>
    )}
  </div>
);

const DocStatus = ({ label, status }) => (
  <div className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] group hover:bg-white hover:shadow-md transition-all">
    <span className="text-sm font-black text-slate-600 uppercase tracking-tight">{label}</span>
    {status ? (
      <span className="flex items-center gap-1.5 text-[10px] bg-emerald-500 text-white px-3 py-1.5 rounded-full font-black uppercase tracking-widest shadow-lg shadow-emerald-100">
        Verified
      </span>
    ) : (
      <span className="text-[10px] bg-slate-200 text-slate-500 px-3 py-1.5 rounded-full font-black uppercase tracking-widest">
        Pending
      </span>
    )}
  </div>
);

export default StudentProfilePage;