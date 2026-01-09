"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { 
  BuildingLibraryIcon, 
  MapPinIcon, 
  UserCircleIcon,
  CheckBadgeIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";

const RegisterCenter = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Center Registration Data:", data);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* EXECUTIVE HEADER */}
        <div className="border-b border-slate-300 pb-6">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Center Registration
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Official onboarding for new institutional branches into the MIS network.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          
          {/* SECTION 1: CORE DETAILS */}
          <FormSection 
            title="Institutional Profile" 
            icon={<BuildingLibraryIcon className="w-6 h-6 text-indigo-600" />}
          >
            <Input
              label="Legal Center Name"
              placeholder="e.g. Dhaka Technical Institute"
              error={errors.centerName}
              {...register("centerName", { required: "Legal name is mandatory" })}
            />

            <Select
              label="Classification"
              error={errors.centerType}
              {...register("centerType", { required: "Select institution type" })}
              options={["School", "College", "TVET Center", "University", "Coaching"]}
            />

            <Input
              label="Establishment Year"
              type="number"
              placeholder="YYYY"
              error={errors.established}
              {...register("established", {
                required: "Required",
                min: 1800,
                max: new Date().getFullYear(),
              })}
            />

            <Input
              label="Student Capacity"
              type="number"
              placeholder="Total Seats"
              error={errors.capacity}
              {...register("capacity", { required: "Seating capacity required" })}
            />
          </FormSection>

          {/* SECTION 2: CONTACT & GEOGRAPHY */}
          <FormSection 
            title="Location & Connectivity" 
            icon={<MapPinIcon className="w-6 h-6 text-indigo-600" />}
          >
            <div className="md:col-span-2">
              <Textarea
                label="Physical Address"
                placeholder="Full street address, building number..."
                error={errors.address}
                {...register("address", { required: "Address is required" })}
              />
            </div>

            <Input
              label="District"
              error={errors.district}
              {...register("district", { required: "Required" })}
            />

            <Input
              label="Division"
              error={errors.division}
              {...register("division", { required: "Required" })}
            />

            <Input
              label="Official Phone"
              error={errors.phone}
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[0-9+ -]{10,15}$/,
                  message: "Invalid format",
                },
              })}
            />

            <Input
              label="Contact Email"
              type="email"
              error={errors.email}
              {...register("email", { required: "Valid email required" })}
            />
          </FormSection>

          {/* SECTION 3: ADMINISTRATION */}
          <FormSection 
            title="Administrative Control" 
            icon={<UserCircleIcon className="w-6 h-6 text-indigo-600" />}
          >
            <Input
              label="Master Admin Name"
              placeholder="Head of Institution"
              error={errors.adminName}
              {...register("adminName", { required: "Admin name required" })}
            />

            <Select
              label="Assigned Licensing Plan"
              error={errors.subscription}
              {...register("subscription", { required: "Select a plan" })}
              options={["Free", "Standard", "Enterprise"]}
            />
          </FormSection>

          {/* SUBMIT ACTIONS */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <p className="text-slate-900 font-bold">Review Data Accuracy</p>
              <p className="text-slate-500 text-sm">Ensure all legal information is correct before authorization.</p>
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-10 py-3 bg-indigo-600 text-white font-bold text-sm uppercase tracking-widest rounded-lg hover:bg-indigo-700 transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-md"
            >
              <CheckBadgeIcon className="w-5 h-5" />
              Register Branch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ---------------- UI COMPONENTS ---------------- */

const FormSection = ({ title, icon, children }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2 px-1">
      {icon}
      <h2 className="text-lg font-bold text-slate-800 tracking-tight">
        {title}
      </h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
      {children}
    </div>
  </div>
);

const Input = React.forwardRef(({ label, error, type = "text", ...props }, ref) => (
  <div className="space-y-1.5">
    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
      {label}
    </label>
    <input
      ref={ref}
      type={type}
      {...props}
      className={`w-full px-4 py-2.5 text-sm font-semibold rounded-lg border transition-all focus:outline-none ${
        error
          ? "border-red-300 bg-red-50 text-red-900"
          : "border-slate-200 bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
      }`}
    />
    {error && <p className="text-[10px] font-bold text-red-600 uppercase mt-1">{error.message}</p>}
  </div>
));

const Textarea = React.forwardRef(({ label, error, ...props }, ref) => (
  <div className="space-y-1.5">
    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
      {label}
    </label>
    <textarea
      ref={ref}
      rows={3}
      {...props}
      className={`w-full px-4 py-2.5 text-sm font-semibold rounded-lg border transition-all focus:outline-none ${
        error
          ? "border-red-300 bg-red-50 text-red-900"
          : "border-slate-200 bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
      }`}
    />
    {error && <p className="text-[10px] font-bold text-red-600 uppercase mt-1">{error.message}</p>}
  </div>
));

const Select = React.forwardRef(({ label, options, error, ...props }, ref) => (
  <div className="space-y-1.5 relative">
    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
      {label}
    </label>
    <div className="relative">
      <select
        ref={ref}
        {...props}
        className={`w-full px-4 py-2.5 text-sm font-semibold rounded-lg border transition-all appearance-none focus:outline-none bg-white ${
          error ? "border-red-300" : "border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
        }`}
      >
        <option value="">Select Option</option>
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <ChevronDownIcon className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
    {error && <p className="text-[10px] font-bold text-red-600 uppercase mt-1">Required</p>}
  </div>
));

export default RegisterCenter;