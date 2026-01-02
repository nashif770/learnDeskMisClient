"use client";
import React from "react";
import { formCategories } from "../componenets/formFields";
import { useForm } from "react-hook-form";

const AddStudents = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/studentData/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to submit");

      reset();
      alert("🎉 Student successfully added to the database!");
    } catch (error) {
      console.error(error);
      alert("❌ Submission failed. Please check your connection.");
    }
  };

  const renderField = (field) => {
    const commonClass =
      "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none transition-all duration-200 focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 placeholder:text-gray-400";

    switch (field.type) {
      case "text":
        return <input type="text" placeholder={`Enter ${field.label.toLowerCase()}...`} className={commonClass} {...register(field.name)} />;

      case "textarea":
        return <textarea rows={3} placeholder={`Provide details about ${field.label.toLowerCase()}...`} className={commonClass} {...register(field.name)} />;

      case "select":
        return (
          <select className={commonClass} {...register(field.name)}>
            <option value="" className="text-gray-400">Select Option</option>
            {field.options?.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
        );

      case "file":
        return (
          <div className="relative group">
            <input type="file" className={`${commonClass} file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100`} {...register(field.name)} />
          </div>
        );

      case "checkbox":
        return (
          <div className="flex items-center h-full pt-2">
            <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 transition-all cursor-pointer" {...register(field.name)} />
            <span className="ml-2 text-sm text-gray-500">Enable this option</span>
          </div>
        );

      case "date":
        return <input type="date" className={commonClass} {...register(field.name)} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-10 text-center">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
          New Student Registration
        </h2>
        <p className="text-slate-500 font-medium text-lg">
          Please fill in the information below to create a new student record.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto space-y-8"
      >
        {formCategories?.map((section, idx) => (
          <div key={idx} className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 transition-all hover:shadow-md">
            {/* Category Title */}
            <div className="flex items-center gap-4 mb-8">
              <span className="flex items-center justify-center w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 font-bold text-lg">
                {idx + 1}
              </span>
              <h3 className="text-xl font-bold text-slate-800">
                {section.category}
              </h3>
              <div className="flex-1 h-px bg-slate-100"></div>
            </div>

            {/* Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
              {section.fields.map((field, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                    {field.label}
                  </label>
                  {renderField(field)}
                  {errors[field.name] && (
                    <span className="text-rose-500 text-[11px] font-bold mt-1 flex items-center gap-1">
                      <span className="w-1 h-1 bg-rose-500 rounded-full"></span>
                      {errors[field.name]?.message}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 pt-6">
          <button
            type="button"
            onClick={() => reset()}
            className="px-8 py-3.5 rounded-2xl text-slate-500 font-bold hover:bg-slate-100 transition-all"
          >
            Reset Form
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-12 py-3.5 rounded-2xl bg-emerald-600 text-white font-black shadow-lg shadow-emerald-200 transition-all active:scale-95 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-emerald-700 hover:-translate-y-1"
            }`}
          >
            {isSubmitting ? "Saving Student..." : "Complete Registration"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudents;