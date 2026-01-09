"use client";
import React, { useState, useEffect } from "react";
import { formCategories } from "../componenets/formFields";
import { useForm } from "react-hook-form";
import { 
  CheckCircleIcon, 
  ArrowPathIcon, 
  TrashIcon, 
  CloudArrowUpIcon,
  UserPlusIcon
} from "@heroicons/react/24/outline";

const AddStudents = () => {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const res = await fetch(
        "https://learndeskmisserver.onrender.com/studentData/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Failed to submit");
      reset();
      alert("✅ Registration Successful: The student has been added to the system.");
    } catch (error) {
      console.error(error);
      alert("❌ Error: Could not reach the server. Please check your internet.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderField = (field) => {
    const commonClass = `w-full bg-slate-50 border ${
      errors[field.name] ? "border-red-300 ring-1 ring-red-100" : "border-slate-200"
    } rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 placeholder:text-slate-400 shadow-sm`;

    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            placeholder={`e.g. ${field.label}`}
            className={commonClass}
            {...register(field.name, { required: `${field.label} is required` })}
          />
        );

      case "textarea":
        return (
          <textarea
            rows={3}
            placeholder={`Enter details...`}
            className={commonClass}
            {...register(field.name)}
          />
        );

      case "select":
        return (
          <select className={commonClass} {...register(field.name, { required: true })}>
            <option value="">Choose Option</option>
            {field.options?.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
        );

      case "file":
        return (
          <div className="relative group">
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              {...register(field.name)}
            />
            <div className="w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-500 flex items-center gap-2 group-hover:border-indigo-400 group-hover:text-indigo-600 transition-all">
              <CloudArrowUpIcon className="w-5 h-5" /> Upload Document
            </div>
          </div>
        );

      case "date":
        return (
          <input
            type="date"
            className={commonClass}
            {...register(field.name, { required: true })}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-6">
      <div className="max-w-5xl mx-auto mb-12">
        <div className="flex items-center gap-3 text-indigo-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-3">
          <UserPlusIcon className="w-4 h-4" />
          Student Admissions
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">
          Enroll New Student
        </h2>
        <p className="text-slate-500 font-medium mt-2">
          Complete all mandatory fields to generate a new unique Student ID and Profile.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto space-y-10">
        {formCategories.map((section, idx) => (
          <div
            key={idx}
            className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4 mb-10 border-b border-slate-50 pb-6">
              <span className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-sm">
                0{idx + 1}
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight">
                  {section.category}
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Section Details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.fields.map((field, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 flex justify-between">
                    {field.label}
                    {errors[field.name] && <span className="text-red-500 italic">!</span>}
                  </label>
                  {renderField(field)}
                  {errors[field.name] && (
                    <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-tighter">
                      {errors[field.name]?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* SUBMIT ACTIONS */}
        <div className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-10 border-t border-slate-200">
          <button
            type="button"
            onClick={() => reset()}
            className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all"
          >
            <TrashIcon className="w-4 h-4" /> Discard Draft
          </button>

          <button
            type="submit"
            disabled={submitting}
            className={`min-w-[240px] flex items-center justify-center gap-3 px-12 py-5 rounded-2xl text-white font-black text-xs uppercase tracking-[0.15em] transition-all shadow-xl active:scale-95 ${
              submitting
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-slate-900 shadow-indigo-200"
            }`}
          >
            {submitting ? (
              <>
                <ArrowPathIcon className="w-5 h-5 animate-spin" />
                Encrypting & Saving...
              </>
            ) : (
              <>
                <CheckCircleIcon className="w-5 h-5" />
                Finalize Enrollment
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudents;