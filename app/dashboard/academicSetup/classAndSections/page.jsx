"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { 
  PlusIcon, 
  UserCircleIcon, 
  PencilSquareIcon,
  AcademicCapIcon,
  ChevronDownIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  ArrowTopRightOnSquareIcon,
  HomeModernIcon,
  UsersIcon
} from "@heroicons/react/24/outline";

const ClassAndSections = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("class");
  const [selectedYearId, setSelectedYearId] = useState("ay1");
  const [currentYearData, setCurrentYearData] = useState(null);
  const [isNavigating, setIsNavigating] = useState(null);

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
          id: "c1-unique-uuid",
          name: "Class 1",
          teacher: "Mr. Rahman",
          sections: [
            { id: "s1", name: "Section A", students: 20, room: "R-101" },
            { id: "s2", name: "Section B", students: 18, room: "R-102" },
          ],
        },
      ],
    },
  ]);

  useEffect(() => {
    const year = academicSessions.find(y => y.id === selectedYearId);
    setCurrentYearData(year);
  }, [selectedYearId, academicSessions]);

  const handleViewDetails = (classId) => {
    setIsNavigating(classId);
    router.push(`/dashboard/academicSetup/classAndSections/${classId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* EXECUTIVE HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-300 pb-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-[10px] uppercase tracking-widest">
              <AcademicCapIcon className="w-4 h-4" />
              Institutional Structure
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Academic Classes</h1>
            <div className="relative inline-block group">
               <select 
                value={selectedYearId}
                onChange={(e) => setSelectedYearId(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold appearance-none outline-none focus:ring-2 ring-indigo-500 shadow-sm pr-8"
              >
                {academicSessions.map(year => (
                  <option key={year.id} value={year.id}>Session: {year.name}</option>
                ))}
              </select>
              <ChevronDownIcon className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          
          <button 
            onClick={() => { setModalMode("class"); setIsModalOpen(true); }}
            className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-600 transition-all shadow-md active:scale-95 text-xs flex items-center gap-2 uppercase tracking-widest"
          >
            <PlusIcon className="w-4 h-4 stroke-[3]" /> Add New Class
          </button>
        </div>

        {/* CLASS LISTING */}
        <div className="space-y-6">
          {currentYearData?.classes.map((cls) => (
            <div key={cls.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              
              {/* PRIMARY CLASS ROW */}
              <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xl font-bold shadow-inner">
                    {cls.name.match(/\d+/) || cls.name[0]}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">{cls.name}</h2>
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-[11px] uppercase tracking-wider mt-0.5">
                      <UserCircleIcon className="w-4 h-4 text-slate-300" />
                      Class Lead: <span className="text-indigo-600">{cls.teacher}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleViewDetails(cls.id)}
                    disabled={isNavigating === cls.id}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest border transition-all ${
                      isNavigating === cls.id 
                      ? "bg-slate-50 text-slate-400 border-slate-100 cursor-not-allowed" 
                      : "bg-white text-slate-700 border-slate-200 hover:border-indigo-600 hover:text-indigo-600"
                    }`}
                  >
                    {isNavigating === cls.id ? "Syncing..." : "Manage Syllabus"}
                    <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-2 hover:bg-slate-50 rounded-lg border border-slate-100">
                    <PencilSquareIcon className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>

              {/* SECTION SUB-DRAWER */}
              <div className="px-6 py-5 bg-slate-50 border-t border-slate-100">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enrollment Sub-groups</h3>
                    <button 
                      onClick={() => { setModalMode("section"); setIsModalOpen(true); }}
                      className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-1 hover:underline"
                    >
                      <PlusIcon className="w-3.5 h-3.5 stroke-[3]" /> Create Section
                    </button>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {cls.sections.map(s => (
                        <div key={s.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:ring-1 ring-indigo-500 transition-all group">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">{s.name}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1 mt-1">
                                  <HomeModernIcon className="w-3 h-3" /> {s.room}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-bold text-slate-900">{s.students}</p>
                                <p className="text-[9px] text-slate-400 font-bold uppercase flex items-center gap-1 justify-end">
                                  <UsersIcon className="w-3 h-3" /> Students
                                </p>
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
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-xl rounded-xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Configure New {mode}</h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Academic Year: {year}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200">
            <XMarkIcon className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{mode} Label</label>
              <input type="text" placeholder={`e.g. ${mode === 'class' ? 'Class 10' : 'Section C'}`} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm font-semibold outline-none focus:border-indigo-600" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{mode === 'class' ? 'Lead Teacher' : 'Room Assignment'}</label>
              <input type="text" className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm font-semibold outline-none focus:border-indigo-600" />
            </div>
          </div>

          {mode === "section" && (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex justify-between">
                Roster Assignment <span>Selected: {selectedStudents.length}</span>
              </label>
              <div className="relative group">
                <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search students by name or roll..." 
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-xs font-semibold outline-none focus:ring-1 ring-indigo-500" 
                />
              </div>
              
              <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 max-h-48 overflow-y-auto">
                {filteredStudents.map((s) => (
                  <div 
                    key={s.id} 
                    onClick={() => toggleStudent(s.id)}
                    className={`flex items-center justify-between p-3 cursor-pointer transition-colors ${selectedStudents.includes(s.id) ? 'bg-indigo-50/50' : 'hover:bg-slate-50'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-[10px] ${selectedStudents.includes(s.id) ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                         {s.name[0]}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">{s.name}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Roll: {s.roll}</p>
                      </div>
                    </div>
                    {selectedStudents.includes(s.id) && <CheckCircleIcon className="w-5 h-5 text-indigo-600" />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100">
          <button className="w-full bg-slate-900 text-white py-4 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-md">
            Finalize {mode} Registration
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassAndSections;