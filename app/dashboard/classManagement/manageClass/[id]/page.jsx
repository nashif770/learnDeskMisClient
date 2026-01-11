"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeftIcon, UserGroupIcon, CalendarDaysIcon, BookOpenIcon, 
  ClipboardDocumentCheckIcon, AcademicCapIcon, IdentificationIcon, 
  ClockIcon, BanknotesIcon, DocumentIcon, ChartBarIcon
} from "@heroicons/react/20/solid";



const ClassDetails = () => {
  const params = useParams();
  const router = useRouter();
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    
    
    // (Use the JSON generated above here in your setClassData)
    // For now, assume classData is loaded with the new JSON.
  }, [params.id]);

  if (!classData) return <div className="p-10 text-xs font-bold text-slate-400">LOADING DATA...</div>;

  return (
    <div className="min-h-screen bg-white p-4 font-sans text-slate-900">
      <div className="max-w-[1500px] mx-auto">
        
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-1.5 hover:bg-slate-100 rounded-md transition-colors border border-slate-200">
              <ArrowLeftIcon className="w-4 h-4 text-slate-500" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-tight uppercase">{classData.name} — {classData.section}</h1>
                <span className="bg-emerald-600 text-white text-[9px] px-1.5 py-0.5 rounded font-black tracking-widest">ACTIVE</span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">{classData.curriculum} • ROOM {classData.room}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-[10px] font-black border border-slate-200 rounded uppercase tracking-widest hover:bg-slate-50">Bulk Attend</button>
            <button className="px-3 py-1.5 text-[10px] font-black bg-slate-900 text-white rounded uppercase tracking-widest hover:bg-black">Class Settings</button>
          </div>
        </div>

        {/* DENSE GRID STRIPS */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-px bg-slate-200 border border-slate-200 rounded-lg overflow-hidden mb-6">
          <InfoItem label="Lead Teacher" value={classData.classTeacher} icon={AcademicCapIcon} />
          <InfoItem label="Enrollment" value={classData.students.length} icon={UserGroupIcon} />
          <InfoItem label="Credit Hours" value={classData.totalCreditHours} icon={ClockIcon} />
          <InfoItem label="Monthly Fee" value={classData.monthlyFee} icon={BanknotesIcon} />
          <InfoItem label="Pass Mark" value={classData.passMark} icon={ChartBarIcon} />
          <InfoItem label="Language" value={classData.language} />
          <InfoItem label="Start Date" value={classData.startDate} icon={CalendarDaysIcon} />
          <InfoItem label="ID" value={classData.id} />
        </div>

        <div className="grid grid-cols-12 gap-6">
          
          {/* MAIN CONTENT */}
          <div className="col-span-12 lg:col-span-9 space-y-6">
            
            {/* SUBJECTS */}
            <section>
              <SectionHeader title="Subject Allocation" icon={BookOpenIcon} />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {classData.subjects.map((sub, i) => (
                  <div key={i} className="p-3 border border-slate-100 bg-slate-50/50 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-[9px] font-black text-emerald-600 uppercase">{sub.type}</span>
                        <span className="text-[9px] font-bold text-slate-300">{sub.code}</span>
                    </div>
                    <p className="text-xs font-black text-slate-800 leading-tight">{sub.name}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{sub.teacher}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* STUDENT REGISTRY */}
            <section>
              <SectionHeader title="Student Registry" icon={UserGroupIcon} />
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-50 border-b border-slate-200 font-black text-slate-400 uppercase tracking-widest">
                    <tr>
                      <th className="px-4 py-2 w-16 text-center">Roll</th>
                      <th className="px-4 py-2">Student Name</th>
                      <th className="px-4 py-2 text-center">Avg GPA</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2 text-right">Records</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {classData.students.map(s => (
                      <tr key={s.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-4 py-2 text-center font-bold text-slate-400">{s.roll}</td>
                        <td className="px-4 py-2 font-bold text-slate-800">{s.name}</td>
                        <td className="px-4 py-2 text-center font-mono font-bold text-emerald-600 bg-emerald-50/30">{s.gpa}</td>
                        <td className="px-4 py-2">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${s.status === 'Present' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                {s.status}
                            </span>
                        </td>
                        <td className="px-4 py-2 text-right">
                          <button className="text-[10px] font-black text-slate-300 group-hover:text-emerald-600 uppercase transition-colors">Profile →</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* SIDEBAR */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            
            {/* TIMETABLE DENSE */}
            <section className="bg-slate-900 rounded-xl p-4 text-white">
              <SectionHeader title="Today's Schedule" icon={ClockIcon} light />
              <div className="space-y-3 mt-4">
                {classData.schedule.map((slot, i) => (
                  <div key={i} className="flex gap-3 items-center border-l border-slate-700 pl-3 py-0.5">
                    <span className="text-[10px] font-bold text-slate-400 w-14">{slot.period}</span>
                    <span className="text-xs font-bold text-emerald-400">{slot.subject}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* RESOURCES */}
            <section className="border border-slate-200 rounded-xl p-4">
              <SectionHeader title="Digital Resources" icon={DocumentIcon} />
              <div className="space-y-2 mt-3">
                {classData.resources.map((res, i) => (
                  <div key={i} className="flex justify-between items-center p-2 hover:bg-slate-50 rounded border border-transparent hover:border-slate-100 cursor-pointer transition-all">
                    <div className="flex items-center gap-2">
                        <DocumentIcon className="w-3 h-3 text-slate-300" />
                        <span className="text-xs font-semibold text-slate-600">{res.name}</span>
                    </div>
                    <span className="text-[9px] font-bold text-slate-300 uppercase">{res.size}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

// HELPER COMPONENTS
const SectionHeader = ({ title, icon: Icon, light = false }) => (
  <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2 ${light ? 'text-slate-400' : 'text-slate-400'}`}>
    <Icon className={`w-3 h-3 ${light ? 'text-emerald-400' : 'text-slate-300'}`} /> {title}
  </h3>
);

const InfoItem = ({ label, value, icon: Icon }) => (
  <div className="bg-white p-3 flex flex-col gap-0.5 border-r border-slate-100 last:border-0">
    <div className="flex items-center gap-1">
      {Icon && <Icon className="w-2.5 h-2.5 text-slate-300" />}
      <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">{label}</span>
    </div>
    <span className="text-[11px] font-black text-slate-800 truncate">{value}</span>
  </div>
);

export default ClassDetails;