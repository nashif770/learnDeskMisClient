"use client";
import React, { useState, useMemo } from "react";
import { 
  ArrowLeftIcon, 
  UserGroupIcon, 
  AcademicCapIcon, 
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  ArrowUpRightIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon
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
    attendance: "94%", 
    students: [
      { id: "STU-001", name: "Zayan Ahmed", roll: "101", status: "Present" },
      { id: "STU-002", name: "Safa Karim", roll: "102", status: "Absent" },
    ]
  },
  { 
    id: "2", 
    name: "Class 2", 
    section: "B", 
    teacher: "Ms. Sultana", 
    room: "R-105", 
    attendance: "88%", 
    students: [
      { id: "STU-088", name: "Tanvir Hasan", roll: "201", status: "Present" },
    ]
  }
];

const ClassDetails = ({ params }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // --- FILTER DATA BASED ON PARAMS ---
  // We use useMemo so we don't re-scan the array unless the ID changes
  const initialData = useMemo(() => {
    return ALL_CLASSES.find(c => c.id === params.id) || ALL_CLASSES[0];
  }, [params.id]);

  const [currentClass, setCurrentClass] = useState(initialData);

  // --- ACTIONS ---
  const handleRemoveStudent = (id) => {
    if (confirm("Remove student from this class?")) {
      setCurrentClass(prev => ({
        ...prev,
        students: prev.students.filter(s => s.id !== id)
      }));
    }
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newStudent = {
      id: `STU-${Math.floor(Math.random() * 1000)}`,
      name: formData.get("name"),
      roll: formData.get("roll"),
      status: "Present"
    };
    setCurrentClass(prev => ({
      ...prev,
      students: [...prev.students, newStudent]
    }));
    setIsAddModalOpen(false);
  };

  const filteredStudents = currentClass.students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-6 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* TOP NAV */}
        <div className="flex justify-between items-center">
          <button onClick={() => router.back()} className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-sm transition-all">
            <div className="p-2 bg-white rounded-xl border border-slate-200 group-hover:border-slate-900 transition-colors">
              <ArrowLeftIcon className="w-4 h-4" />
            </div>
            Back to Overview
          </button>
          
          <div className="flex gap-3">
            <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg">
              Save All Changes
            </button>
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-sm flex items-center gap-6">
            <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center text-white text-3xl font-black">
              {currentClass.id}
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter uppercase">{currentClass.name}</h1>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-1">
                Section {currentClass.section} • Room {currentClass.room} • {currentClass.teacher}
              </p>
            </div>
          </div>

          <StatCard icon={<UserGroupIcon />} label="Enrolled" value={currentClass.students.length} color="text-blue-600" />
          <StatCard icon={<CalendarDaysIcon />} label="Attendance" value={currentClass.attendance} color="text-emerald-600" />
        </div>

        {/* MANAGEMENT GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* STUDENT ROSTER */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 overflow-hidden shadow-sm">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                <h3 className="text-xl font-black tracking-tight">Student Roster</h3>
                <div className="flex gap-4">
                    <div className="relative">
                        <MagnifyingGlassIcon className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Find student..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-slate-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm font-bold outline-none focus:ring-2 ring-slate-900 transition-all"
                        />
                    </div>
                    <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-emerald-500 text-white p-2 rounded-xl hover:bg-slate-900 transition-all"
                    >
                        <PlusIcon className="w-6 h-6 stroke-[3]" />
                    </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Student</th>
                      <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Roll</th>
                      <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400 text-xs">
                              {student.name[0]}
                            </div>
                            <div className="font-black text-sm">{student.name}</div>
                          </div>
                        </td>
                        <td className="p-6 font-bold text-slate-500 text-sm">{student.roll}</td>
                        <td className="p-6">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                            <button onClick={() => handleRemoveStudent(student.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <TrashIcon className="w-5 h-5" />
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
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl">
              <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                <AcademicCapIcon className="w-5 h-5 text-emerald-400" />
                Class Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-2xl text-left font-bold text-sm transition-all flex items-center justify-between">
                    Attendance Report <ArrowUpRightIcon className="w-4 h-4" />
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-2xl text-left font-bold text-sm transition-all flex items-center justify-between text-red-400">
                    Disband Class <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ADD STUDENT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-6">
            <div className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative">
                <button onClick={() => setIsAddModalOpen(false)} className="absolute top-8 right-8 p-2 hover:bg-slate-100 rounded-full"><XMarkIcon className="w-6 h-6" /></button>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">Enroll Student</h2>
                <form onSubmit={handleAddStudent} className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                        <input name="name" required className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold outline-none focus:border-slate-900 transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Roll Number</label>
                        <input name="roll" required className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold outline-none focus:border-slate-900 transition-all" placeholder="105" />
                    </div>
                    <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl">
                        Add to Class
                    </button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

// --- SUB COMPONENTS ---
const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-sm">
    <div className={`w-10 h-10 mb-4 rounded-xl flex items-center justify-center bg-slate-50 ${color}`}>
      {React.cloneElement(icon, { className: "w-5 h-5" })}
    </div>
    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-3xl font-black ${color}`}>{value}</p>
  </div>
);

export default ClassDetails;