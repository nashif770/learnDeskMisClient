"use client";

import React, { useState, useEffect } from "react";
import theme from "@/theme";
import { 
  XMarkIcon, AcademicCapIcon, ClockIcon, CheckBadgeIcon,
  Squares2X2Icon, HashtagIcon, UserIcon, UserPlusIcon,
  UserGroupIcon, MagnifyingGlassIcon
} from "@heroicons/react/20/solid"; 

const EditClassModal = ({ isOpen, onClose, classData, onSave }) => {
  const [formData, setFormData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock master list of all students in the school
  const [masterStudentList] = useState([
    { id: 101, name: "Alice Thompson", currentClass: "None" },
    { id: 102, name: "Benjamin White", currentClass: "Grade 9" },
    { id: 103, name: "Catherine Grace", currentClass: "None" },
    { id: 104, name: "David Miller", currentClass: "Grade 10" },
  ]);

  // Students currently selected for THIS class
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    if (classData) {
      setFormData(classData);
      setSelectedStudents(classData.students || []); // Load existing students if any
    } else {
      setFormData({ shift: "Morning", year: "2026", isOpen: true });
      setSelectedStudents([]);
    }
  }, [classData, isOpen]);

  if (!isOpen) return null;

  const toggleStudent = (student) => {
    const isSelected = selectedStudents.find(s => s.id === student.id);
    if (isSelected) {
      setSelectedStudents(selectedStudents.filter(s => s.id !== student.id));
    } else {
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      capacity: parseInt(formData.capacity, 10) || 0,
      students: selectedStudents // Saving the list of attached students
    });
  };

  // Field Components
  const InputField = ({ label, name, type = "text", placeholder, icon: Icon }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 ml-1">
        {Icon && <Icon className="w-3 h-3" />} {label}
      </label>
      <input type={type} name={name} value={formData[name] || ""} onChange={handleChange} placeholder={placeholder}
        className="px-3 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none text-sm font-semibold text-slate-700 transition-all placeholder:text-slate-300" />
    </div>
  );

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 animate-in fade-in zoom-in duration-200">
        
        {/* HEADER */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><Squares2X2Icon className="w-5 h-5" /></div>
            <div>
              <h2 className="text-md font-bold text-slate-900">{classData?.id ? "Update Class" : "New Class"}</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Enrolled: {selectedStudents.length} Students</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><XMarkIcon className="w-5 h-5" /></button>
        </div>

        {/* BODY */}
        <form id="classForm" onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          
          {/* Section 1: Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Class Name" name="className" placeholder="Grade 10" />
            <InputField label="Section" name="section" placeholder="Emerald" />
          </div>

          {/* Section 2: Student Selection List */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <UserGroupIcon className="w-4 h-4 text-emerald-600" />
              <span className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Enroll Students</span>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search students by name..." 
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-emerald-500"
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              />
            </div>

            {/* Student Picker Scroll Area */}
            <div className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50/50">
              <div className="max-h-40 overflow-y-auto divide-y divide-slate-100">
                {masterStudentList
                  .filter(s => s.name.toLowerCase().includes(searchTerm))
                  .map((student) => {
                    const isAdded = selectedStudents.some(s => s.id === student.id);
                    return (
                      <div key={student.id} className="px-4 py-2.5 flex items-center justify-between hover:bg-white transition-colors">
                        <div>
                          <p className="text-sm font-bold text-slate-700">{student.name}</p>
                          <p className="text-[10px] text-slate-400 uppercase font-medium">Currently: {student.currentClass}</p>
                        </div>
                        <button 
                          type="button"
                          onClick={() => toggleStudent(student)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-bold transition-all ${
                            isAdded 
                            ? "bg-red-50 text-red-600 hover:bg-red-100" 
                            : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                          }`}
                        >
                          {isAdded ? "Remove" : <><UserPlusIcon className="w-3 h-3"/> Add</>}
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Section 3: Visibility & Shift */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl">
             <div className="flex flex-col gap-1">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Shift</span>
               <span className="text-sm font-bold text-slate-700">{formData.shift}</span>
             </div>
             <div className="flex flex-col items-end gap-1">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Admission</span>
               <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${formData.isOpen ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"}`}>
                 {formData.isOpen ? "ACTIVE" : "CLOSED"}
               </span>
             </div>
          </div>
        </form>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end items-center gap-4 bg-white">
          <button type="button" onClick={onClose} className="text-xs font-bold text-slate-400 hover:text-slate-600">Cancel</button>
          <button type="submit" form="classForm" className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all active:scale-95 uppercase tracking-widest">
            <CheckBadgeIcon className="w-4 h-4" /> Save Class & Students
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditClassModal;