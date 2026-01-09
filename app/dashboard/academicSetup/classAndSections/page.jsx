"use client";
import React, { useState, useEffect } from "react";
// Import the router for navigation
import { useRouter } from "next/navigation"; 
import { 
  PlusIcon, 
  UserCircleIcon, 
  PencilSquareIcon,
  AcademicCapIcon,
  ChevronDownIcon,
  InboxIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  ArrowTopRightOnSquareIcon 
} from "@heroicons/react/24/outline";

const ClassAndSections = () => {
  const router = useRouter(); // Initialize the router
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("class");
  const [selectedYearId, setSelectedYearId] = useState("ay1");
  const [currentYearData, setCurrentYearData] = useState(null);
  const [isNavigating, setIsNavigating] = useState(null); // Track which class is being loaded

  // Mock Backend for Students
  const [availableStudents] = useState([
    { id: "STU-001", name: "Zayan Ahmed", roll: "101" },
    { id: "STU-002", name: "Safa Karim", roll: "102" },
    { id: "STU-003", name: "Ayaan Malik", roll: "103" },
    { id: "STU-004", name: "Fatima Noor", roll: "104" },
    { id: "STU-005", name: "Rahat Kabir", roll: "105" },
  ]);

  const [academicSessions] = useState([
    {
      id: "ay1",
      name: "2024–2025",
      status: "Active",
      classes: [
        {
          id: "c1-unique-uuid", // This represents your unique backend ID
          name: "Class 1",
          teacher: "Mr. Rahman",
          sections: [
            { id: "s1", name: "Section A", students: 20, room: "R-101" },
          ],
        },
      ],
    },
  ]);

  useEffect(() => {
    const year = academicSessions.find(y => y.id === selectedYearId);
    setCurrentYearData(year);
  }, [selectedYearId, academicSessions]);

  // FUNCTIONAL NAVIGATION HANDLER
  const handleViewDetails = (classId) => {
    setIsNavigating(classId); // Set loading state for specific button
    
    // Construct the URL using the unique backend ID
    // Standard pattern: /dashboard/classes/[id]
    router.push(`/dashboard/academicSetup/classAndSections/${classId}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-6 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-4 border-slate-900 pb-8">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-[0.2em] mb-1">
                <AcademicCapIcon className="w-4 h-4" />
                Administrative Panel
              </div>
              <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">Management</h1>
            </div>
            <div className="relative group min-w-[240px]">
               <select 
                value={selectedYearId}
                onChange={(e) => setSelectedYearId(e.target.value)}
                className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 font-bold appearance-none outline-none focus:border-slate-900 shadow-sm"
              >
                {academicSessions.map(year => (
                  <option key={year.id} value={year.id}>{year.name}</option>
                ))}
              </select>
              <ChevronDownIcon className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
          
          <button 
            onClick={() => { setModalMode("class"); setIsModalOpen(true); }}
            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-emerald-600 transition-all shadow-xl active:scale-95 text-sm flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5 stroke-[3]" /> NEW CLASS
          </button>
        </div>

        {/* LISTING */}
        <div className="grid grid-cols-1 gap-8">
          {currentYearData?.classes.map((cls) => (
            <div key={cls.id} className="bg-white border-2 border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              
              {/* CLASS HEADER BAR */}
              <div className="p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-50">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-2xl font-black">
                    {cls.name.match(/\d+/) || cls.name[0]}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight">{cls.name}</h2>
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
                      <UserCircleIcon className="w-4 h-4" />
                      Teacher: <span className="text-slate-900">{cls.teacher}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* FUNCTIONAL DETAILS BUTTON */}
                  <button 
                    onClick={() => handleViewDetails(cls.id)}
                    disabled={isNavigating === cls.id}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest border transition-all group ${
                      isNavigating === cls.id 
                      ? "bg-slate-100 text-slate-400 border-slate-100 cursor-not-allowed" 
                      : "bg-slate-50 text-slate-900 border-slate-200 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    {isNavigating === cls.id ? "Loading..." : "View Details"}
                    <ArrowTopRightOnSquareIcon className={`w-4 h-4 ${isNavigating === cls.id ? 'animate-pulse' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform'}`} />
                  </button>
                  
                  <button className="p-3 hover:bg-slate-50 rounded-xl border border-slate-100 transition-colors">
                    <PencilSquareIcon className="w-5 h-5 text-slate-400 hover:text-slate-900" />
                  </button>
                </div>
              </div>

              {/* SECTIONS GRID */}
              <div className="p-8 bg-slate-50/30">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Active Sections</h3>
                    <button 
                      onClick={() => { setModalMode("section"); setIsModalOpen(true); }}
                      className="text-[11px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1 hover:underline"
                    >
                      <PlusIcon className="w-4 h-4 stroke-[3]" /> Add Section
                    </button>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {cls.sections.map(s => (
                        <div key={s.id} className="bg-white p-5 rounded-3xl border-2 border-slate-100 shadow-sm hover:border-slate-900 cursor-pointer transition-all">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-black text-lg">{s.name}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Room {s.room}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-black text-emerald-600">{s.students}</p>
                                <p className="text-[9px] text-slate-400 font-bold uppercase">Students</p>
                              </div>
                            </div>
                        </div>
                    ))}
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL SYSTEM */}
      {isModalOpen && (
        <ModalContent 
          mode={modalMode} 
          year={currentYearData?.name} 
          students={availableStudents} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

// ... ModalContent sub-component remains the same ...
const ModalContent = ({ mode, year, students, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

  const toggleStudent = (id) => {
    setSelectedStudents(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.roll.includes(searchTerm) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-8 pb-4 flex justify-between items-center border-b border-slate-100">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter">New {mode}</h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Session: {year}</p>
          </div>
          <button onClick={onClose} className="bg-slate-100 p-3 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 pt-6 space-y-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">{mode} Name</label>
              <input type="text" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold outline-none focus:border-slate-900" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">{mode === 'class' ? 'Lead Teacher' : 'Room'}</label>
              <input type="text" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold outline-none focus:border-slate-900" />
            </div>
          </div>

          {mode === "section" && (
            <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Enroll Students ({selectedStudents.length})
              </label>
              <div className="relative group">
                <MagnifyingGlassIcon className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-100 border-none rounded-2xl py-3 pl-10 pr-4 text-xs font-bold outline-none focus:ring-2 ring-slate-900" 
                />
              </div>
              
              <div className="border-2 border-slate-100 rounded-[2rem] overflow-hidden">
                <div className="max-h-64 overflow-y-auto divide-y divide-slate-50">
                  {filteredStudents.map((s) => (
                    <div 
                      key={s.id} 
                      onClick={() => toggleStudent(s.id)}
                      className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${selectedStudents.includes(s.id) ? 'bg-emerald-50' : 'hover:bg-slate-50'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${selectedStudents.includes(s.id) ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                           {s.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-black">{s.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">ID: {s.id}</p>
                        </div>
                      </div>
                      {selectedStudents.includes(s.id) ? (
                        <CheckCircleIcon className="w-7 h-7 text-emerald-600" />
                      ) : (
                        <div className="w-7 h-7 rounded-full border-2 border-slate-200" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100">
          <button className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black text-xl hover:bg-emerald-600 transition-all">
            SAVE CONFIGURATION
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassAndSections;