"use client";
import React, { useState, useMemo } from "react";
import { 
  ArrowLeftIcon, 
  UserGroupIcon, 
  AcademicCapIcon, 
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  ArrowUpRightIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
  PrinterIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

// --- MOCK DATABASE ---
const ALL_CLASSES = [
  { 
    id: "1", 
    name: "Class 1", 
    section: "A", 
    teacher: "Mr. Rahman", 
    room: "R-101", 
    attendance: "94.2%", 
    students: [
      { id: "STU-001", name: "Zayan Ahmed", roll: "101", status: "Active" },
      { id: "STU-002", name: "Safa Karim", roll: "102", status: "Active" },
      { id: "STU-003", name: "Ayaan Malik", roll: "103", status: "Active" },
    ]
  }
];

const ClassDetails = ({ params }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const initialData = useMemo(() => {
    return ALL_CLASSES.find(c => c.id === params.id) || ALL_CLASSES[0];
  }, [params.id]);

  const [currentClass, setCurrentClass] = useState(initialData);

  const handleRemoveStudent = (id) => {
    // Standardizing on a cleaner confirm UI or simple browser confirm for now
    if (confirm("Are you sure you want to remove this student from the section?")) {
      setCurrentClass(prev => ({
        ...prev,
        students: prev.students.filter(s => s.id !== id)
      }));
    }
  };

  const filteredStudents = currentClass.students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.roll.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* EXECUTIVE CONTROL BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <button onClick={() => router.back()} className="group flex items-center gap-3 text-slate-500 hover:text-indigo-600 font-bold text-xs uppercase tracking-widest transition-all">
            <div className="p-2 bg-white rounded-lg border border-slate-200 group-hover:border-indigo-600 transition-colors shadow-sm">
              <ArrowLeftIcon className="w-4 h-4" />
            </div>
            Back to Overview
          </button>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
              <PrinterIcon className="w-4 h-4" /> Print Roster
            </button>
            <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-md active:scale-95">
              Finalize Changes
            </button>
          </div>
        </div>

        {/* SECTION IDENTITY HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex items-center gap-6">
            <div className="w-16 h-16 bg-slate-900 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
              {currentClass.section}
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-800">{currentClass.name} — Section {currentClass.section}</h1>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Room: <span className="text-slate-900">{currentClass.room}</span></p>
                <div className="w-1 h-1 bg-slate-300 rounded-full" />
                <p className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Lead: <span className="text-indigo-600">{currentClass.teacher}</span></p>
              </div>
            </div>
          </div>

          <StatBox icon={<UserGroupIcon />} label="Total Enrollment" value={currentClass.students.length} sub="Verified Students" color="text-indigo-600" />
          <StatBox icon={<CalendarDaysIcon />} label="Avg. Attendance" value={currentClass.attendance} sub="Last 30 Days" color="text-emerald-600" />
        </div>

        {/* WORKSPACE */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          
          {/* STUDENT ROSTER TABLE */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800">Student Roster</h3>
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Filter by name or roll..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-xs font-semibold outline-none focus:ring-1 ring-indigo-500"
                        />
                    </div>
                    <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-slate-900 transition-all shadow-sm"
                    >
                        <PlusIcon className="w-5 h-5 stroke-[2.5]" />
                    </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400 tracking-widest">Roll</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400 tracking-widest">Student Name</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400 tracking-widest text-center">Status</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400 tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-indigo-50/30 transition-colors group">
                        <td className="px-6 py-4 font-bold text-slate-400 text-xs">{student.roll}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-[10px]">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="font-bold text-sm text-slate-800">{student.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                            <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-700 text-[9px] font-bold uppercase tracking-tighter border border-emerald-200">
                                {student.status}
                            </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded transition-all">
                                <ArrowPathIcon className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleRemoveStudent(student.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-white rounded transition-all">
                                <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* SIDEBAR TOOLS */}
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-xl p-6 text-white shadow-lg">
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
                <AcademicCapIcon className="w-4 h-4 text-indigo-400" />
                Administrative Tools
              </h3>
              <div className="space-y-2">
                <SidebarButton label="Daily Attendance" icon={<CalendarDaysIcon />} />
                <SidebarButton label="Examination Result" icon={<ArrowUpRightIcon />} />
                <SidebarButton label="SMS Notification" icon={<UserGroupIcon />} />
                <div className="pt-2">
                    <button className="w-full bg-red-500/10 hover:bg-red-500/20 p-3 rounded-lg text-left font-bold text-[10px] uppercase tracking-widest text-red-400 transition-all flex items-center justify-between border border-red-500/20">
                        Disband Section <TrashIcon className="w-3.5 h-3.5" />
                    </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL - Simplified for brevity */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px] p-6">
            <div className="bg-white w-full max-w-sm rounded-xl p-8 shadow-2xl relative">
                <button onClick={() => setIsAddModalOpen(false)} className="absolute top-6 right-6 p-1 hover:bg-slate-100 rounded transition-all"><XMarkIcon className="w-5 h-5 text-slate-400" /></button>
                <h2 className="text-lg font-bold text-slate-800 mb-6">Enroll New Student</h2>
                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Student Full Name</label>
                        <input className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-semibold outline-none focus:border-indigo-600" placeholder="e.g. Adnan Sami" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Admission/Roll No.</label>
                        <input className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-semibold outline-none focus:border-indigo-600" placeholder="e.g. 104" />
                    </div>
                    <button onClick={() => setIsAddModalOpen(false)} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-md mt-2">
                        Confirm Enrollment
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

// --- SUB COMPONENTS ---
const StatBox = ({ icon, label, value, sub, color }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg bg-slate-50 ${color}`}>
          {React.cloneElement(icon, { className: "w-5 h-5" })}
        </div>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{label}</p>
    </div>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
    <p className="text-slate-400 text-[9px] font-medium mt-1 uppercase tracking-tighter">{sub}</p>
  </div>
);

const SidebarButton = ({ label, icon }) => (
    <button className="w-full bg-white/5 hover:bg-white/10 p-3 rounded-lg text-left font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-between group">
        <span className="flex items-center gap-2">{React.cloneElement(icon, { className: "w-3.5 h-3.5 text-indigo-400" })} {label}</span>
        <ArrowUpRightIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
    </button>
);

export default ClassDetails;