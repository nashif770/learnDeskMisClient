"use client";
import React, { useState, useEffect } from "react";
import { formCategories } from "../componenets/formFields";
import { useForm } from "react-hook-form";

const AddStudents = () => {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }, // ✅ only errors kept
  } = useForm();

  // ✅ Optional side-effect (logging / analytics / toast hook)
  useEffect(() => {
    if (submitting) {
      console.log(`Submitting student data ${submitting}`);
    }
  }, [submitting]);

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
      alert("🎉 Student successfully added to the database!");
    } catch (error) {
      console.error(error);
      alert("❌ Submission failed. Please check your connection.");
    } finally {
      setSubmitting(false);
      console.log("submitted false");
    }
  };

  const renderField = (field) => {
    const commonClass =
      "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none transition-all duration-200 focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 placeholder:text-gray-400";

    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            placeholder={`Enter ${field.label.toLowerCase()}...`}
            className={commonClass}
            {...register(field.name)}
          />
        );

      case "textarea":
        return (
          <textarea
            rows={3}
            placeholder={`Provide details about ${field.label.toLowerCase()}...`}
            className={commonClass}
            {...register(field.name)}
          />
        );

      case "select":
        return (
          <select className={commonClass} {...register(field.name)}>
            <option value="">Select Option</option>
            {field.options?.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );

      case "file":
        return (
          <input
            type="file"
            className={commonClass}
            {...register(field.name)}
          />
        );

      case "checkbox":
        return (
          <div className="flex items-center pt-2">
            <input
              type="checkbox"
              className="h-5 w-5 text-emerald-600"
              {...register(field.name)}
            />
            <span className="ml-2 text-sm text-gray-500">
              Enable this option
            </span>
          </div>
        );

      case "date":
        return (
          <input
            type="date"
            className={commonClass}
            {...register(field.name)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10">
      <div className="max-w-5xl mx-auto mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
          New Student Registration
        </h2>
        <p className="text-slate-600 text-base md:text-lg">
          Please fill in the information below to create a new student record.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto space-y-8"
      >
        {formCategories.map((section, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <span className="w-8 h-8 md:w-10 md:h-10 rounded-2xl bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center">
                {idx + 1}
              </span>
              <h3 className="text-lg md:text-xl font-bold text-slate-900">
                {section.category}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {section.fields.map((field, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase text-slate-600">
                    {field.label}
                  </label>
                  {renderField(field)}
                  {errors[field.name] && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors[field.name]?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
          <button
            type="button"
            onClick={() => reset()}
            className="px-8 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Reset Form
          </button>

          <button
            type="submit"
            disabled={submitting}
            className={`px-12 py-3 rounded-xl text-white font-bold transition ${
              submitting
                ? "bg-emerald-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {submitting ? "Saving Student..." : "Complete Registration"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudents;
