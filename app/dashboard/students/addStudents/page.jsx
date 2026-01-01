"use client";
import React from "react";
import { formCategories } from "../componenets/formFields";
import { useForm } from "react-hook-form";

const AddStudents = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/studentData/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to submit");
      }

      console.log("Saved:", result);
      reset();
      alert("Student added successfully");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const renderField = (field) => {
    const commonClass =
      "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-300 transition";

    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            className={commonClass}
            {...register(field.name)}
          />
        );

      case "textarea":
        return (
          <textarea
            rows={3}
            className={commonClass}
            {...register(field.name)}
          />
        );

      case "select":
        return (
          <select className={commonClass} {...register(field.name)}>
            <option value="">Select</option>
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
          <input
            type="checkbox"
            className="h-4 w-4"
            {...register(field.name)}
          />
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
    <div className="max-w-5xl mx-auto p-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-emerald-700 mb-8 text-center">
        Add Students
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-12 bg-white p-6 rounded-2xl shadow-md"
      >
        {formCategories?.map((section, idx) => (
          <div key={idx} className="space-y-6">
            {/* Category Title */}
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              {section.category}
            </h3>

            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {section.fields.map((field, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <label className="font-medium text-gray-600">
                    {field.label}
                  </label>
                  {renderField(field)}
                  {errors[field.name] && (
                    <span className="text-red-500 text-sm">
                      {errors[field.name]?.message}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg shadow hover:bg-emerald-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudents;
