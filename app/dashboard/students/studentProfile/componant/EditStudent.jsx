"use client";

import React, { useState, useEffect } from "react";
import { 
  XMarkIcon, 
  UserIcon, 
  MapPinIcon, 
  HeartIcon, 
  AcademicCapIcon,
  CheckBadgeIcon
} from "@heroicons/react/20/solid"; 

const EditStudentModal = ({ isOpen, onClose, student, onSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (student) setFormData(student);
  }, [student]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const InputField = ({ label, name, type = "text", placeholder }) => (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        placeholder={placeholder}
        className="px-3 py-2 bg-white border border-slate-200 rounded-md focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none text-sm font-medium text-slate-700 transition-all placeholder:text-slate-300"
      />
    </div>
  );

  const SectionHeader = ({ title, icon: Icon }) => (
    <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-4 mt-8 first:mt-0">
      <Icon className="w-4 h-4 text-emerald-500" />
      <h3 className="font-bold text-slate-800 uppercase text-[10px] tracking-widest">{title}</h3>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px] p-4">
      <div className="bg-white w-full max-w-4xl max-h-[85vh] rounded-xl shadow-2xl overflow-hidden flex flex-col border border-slate-200">
        
        {/* MODAL HEADER */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-emerald-50/30">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Edit Student Profile</h2>
            <p className="text-[11px] text-slate-500 font-medium">Record ID: <span className="text-emerald-600 font-bold">{student?.Id || student?._id}</span></p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-200 rounded-md transition-colors text-slate-400">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto overflow-x-hidden">
          
          {/* PERSONAL INFORMATION */}
          <SectionHeader title="Core Identity" icon={UserIcon} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4">
            <InputField label="Full Name (EN)" name="userNameEn" />
            <InputField label="Full Name (BN)" name="userNameBn" />
            <InputField label="Blood Group" name="bloodGroup" />
            <InputField label="Date of Birth" name="dobReg" type="date" />
            <InputField label="BNID / NID" name="BNID" />
            <InputField label="Primary Mobile" name="mobile" />
          </div>

          {/* FAMILY DETAILS */}
          <SectionHeader title="Guardianship" icon={HeartIcon} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3 p-4 bg-emerald-50/20 rounded-lg border border-emerald-100/50">
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">Father's Information</p>
              <InputField label="Name" name="fatherName" />
              <div className="grid grid-cols-2 gap-2">
                <InputField label="Occupation" name="fatherOccupation" />
                <InputField label="Contact" name="fatherMobile" />
              </div>
            </div>
            <div className="space-y-3 p-4 bg-emerald-50/20 rounded-lg border border-emerald-100/50">
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">Mother's Information</p>
              <InputField label="Name" name="motherName" />
              <div className="grid grid-cols-2 gap-2">
                <InputField label="Occupation" name="motherOccupation" />
                <InputField label="Contact" name="motherMobile" />
              </div>
            </div>
          </div>

          {/* ADDRESS DETAILS */}
          <SectionHeader title="Residential Records" icon={MapPinIcon} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight border-l-2 border-emerald-500 pl-2">Current Residence</p>
              <InputField label="Street Address" name="currentAddress" />
              <div className="grid grid-cols-2 gap-3">
                <InputField label="Thana" name="currentThana" />
                <InputField label="District" name="currentDistrict" />
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight border-l-2 border-slate-200 pl-2">Permanent Root</p>
              <InputField label="Street Address" name="permanentAddress" />
              <div className="grid grid-cols-2 gap-3">
                <InputField label="Thana" name="permanentThana" />
                <InputField label="District" name="permanentDistrict" />
              </div>
            </div>
          </div>

          {/* ACADEMICS & PLEDGES */}
          <SectionHeader title="Academics & Declarations" icon={AcademicCapIcon} />
          <div className="space-y-5 mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Education Level" name="education" />
              <InputField label="Extra Curricular" name="extraCurriculumn" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Student Pledge</label>
                <textarea 
                  name="studentPledge" 
                  value={formData.studentPledge || ""} 
                  onChange={handleChange}
                  className="p-3 bg-white border border-slate-200 rounded-md h-20 text-sm font-medium focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Guardian Pledge</label>
                <textarea 
                  name="guardianPledge" 
                  value={formData.guardianPledge || ""} 
                  onChange={handleChange}
                  className="p-3 bg-white border border-slate-200 rounded-md h-20 text-sm font-medium focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
                />
              </div>
            </div>
          </div>
        </form>

        {/* MODAL FOOTER */}
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end items-center gap-3 bg-slate-50/50">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-all"
          >
            Discard Changes
          </button>
          <button 
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-md text-xs font-bold hover:bg-emerald-700 shadow-sm shadow-emerald-200 transition-all active:scale-95"
          >
            <CheckBadgeIcon className="w-4 h-4" />
            Update Record
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStudentModal;