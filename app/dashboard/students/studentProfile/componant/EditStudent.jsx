"use client";

import React, { useState, useEffect } from "react";
import { 
  XMarkIcon, 
  UserIcon, 
  MapPinIcon, 
  HeartIcon, 
  AcademicCapIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

const EditStudentModal = ({ isOpen, onClose, student, onSave }) => {
  const [formData, setFormData] = useState({});

  // Sync state with the student prop when it opens
  useEffect(() => {
    if (student) {
      setFormData(student);
    }
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
      <label className="text-xs font-black text-slate-500 uppercase tracking-wider">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        placeholder={placeholder}
        className="px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-emerald-500 focus:outline-none font-semibold text-slate-800 transition-all"
      />
    </div>
  );

  const SectionHeader = ({ title, icon: Icon }) => (
    <div className="flex items-center gap-2 border-b-2 border-slate-100 pb-2 mb-4 mt-6">
      <Icon className="w-5 h-5 text-emerald-600" />
      <h3 className="font-black text-slate-900 uppercase text-sm tracking-widest">{title}</h3>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* MODAL HEADER */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="text-2xl font-black text-slate-900 uppercase">Edit Student Profile</h2>
            <p className="text-sm text-slate-500 font-bold">Modifying Records for: <span className="text-emerald-600">{student?.userNameEn}</span></p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <XMarkIcon className="w-8 h-8 text-slate-400" />
          </button>
        </div>

        {/* MODAL BODY (Scrollable) */}
        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-2">
          
          {/* PERSONAL INFORMATION */}
          <SectionHeader title="Basic Identification" icon={UserIcon} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InputField label="Name (English)" name="userNameEn" />
            <InputField label="Name (Bangla)" name="userNameBn" />
            <InputField label="System ID" name="Id" />
            <InputField label="Blood Group" name="bloodGroup" />
            <InputField label="Religion" name="religion" />
            <InputField label="Date of Birth" name="dobReg" type="date" />
            <InputField label="BNID / Registration" name="BNID" />
            <InputField label="Place of Birth" name="birthPlace" />
            <InputField label="Mobile Number" name="mobile" />
          </div>

          {/* FAMILY DETAILS */}
          <SectionHeader title="Family & Guardians" icon={HeartIcon} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-[10px] font-black text-emerald-600 uppercase">Father's Details</p>
                <InputField label="Father's Name" name="fatherName" />
                <InputField label="Occupation" name="fatherOccupation" />
                <InputField label="Mobile" name="fatherMobile" />
            </div>
            <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-[10px] font-black text-emerald-600 uppercase">Mother's Details</p>
                <InputField label="Mother's Name" name="motherName" />
                <InputField label="Occupation" name="motherOccupation" />
                <InputField label="Mobile" name="motherMobile" />
            </div>
          </div>

          {/* ADDRESS DETAILS */}
          <SectionHeader title="Residential Information" icon={MapPinIcon} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <p className="text-[10px] font-black text-blue-600 uppercase">Current Address</p>
                <InputField label="Street Address" name="currentAddress" />
                <div className="grid grid-cols-2 gap-2">
                    <InputField label="Thana" name="currentThana" />
                    <InputField label="District" name="currentDistrict" />
                </div>
            </div>
            <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase">Permanent Address</p>
                <InputField label="Street Address" name="permanentAddress" />
                <div className="grid grid-cols-2 gap-2">
                    <InputField label="Thana" name="permanentThana" />
                    <InputField label="District" name="permanentDistrict" />
                </div>
            </div>
          </div>

          {/* ACADEMICS & PLEDGES */}
          <SectionHeader title="Commitments & Extra" icon={AcademicCapIcon} />
          <div className="space-y-4">
            <InputField label="Education Level" name="education" />
            <InputField label="Extra Curricular Activities" name="extraCurriculumn" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-black text-slate-500 uppercase">Student Pledge</label>
                    <textarea 
                        name="studentPledge" 
                        value={formData.studentPledge || ""} 
                        onChange={handleChange}
                        className="p-4 border-2 border-slate-200 rounded-lg h-24 font-medium"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-black text-slate-500 uppercase">Guardian Pledge</label>
                    <textarea 
                        name="guardianPledge" 
                        value={formData.guardianPledge || ""} 
                        onChange={handleChange}
                        className="p-4 border-2 border-slate-200 rounded-lg h-24 font-medium"
                    />
                </div>
            </div>
          </div>

        </form>

        {/* MODAL FOOTER */}
        <div className="p-6 border-t border-slate-100 flex justify-end gap-4 bg-slate-50">
          <button 
            onClick={onClose}
            className="px-6 py-2 border-2 border-slate-300 rounded-lg font-bold text-slate-600 hover:bg-slate-200 transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="flex items-center gap-2 px-8 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all"
          >
            <CheckCircleIcon className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStudentModal;