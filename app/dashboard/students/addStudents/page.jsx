'use client';
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

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    reset()
  };

  const renderField = (field) => {
    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            className="w-full border rounded p-2"
            {...register(field.name)}
          />
        );

      case "textarea":
        return (
          <textarea
            rows={3}
            className="w-full border rounded p-2"
            {...register(field.name)}
          />
        );

      case "select":
        return (
          <select
            className="w-full border rounded p-2"
            {...register(field.name)}
          >
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
            className="w-full border rounded p-2"
            {...register(field.name)}
          />
        );

      case "checkbox":
        return (
          <input type="checkbox" className="h-4 w-4" {...register(field.name)} />
        );

      case "date":
        return (
          <input
            type="date"
            className="w-full border rounded p-2"
            {...register(field.name)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add Students</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

        {formCategories?.map((section, idx) => (
          <div key={idx} className="space-y-4">

            {/* Category Title */}
            <h3 className="text-xl font-semibold border-b pb-2">
              {section.category}
            </h3>

            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              {section.fields.map((field, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <label className="font-medium">{field.label}</label>
                  {renderField(field)}
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddStudents;
