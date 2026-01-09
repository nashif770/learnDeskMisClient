"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { 
  BuildingLibraryIcon, 
  MapPinIcon, 
  UserCircleIcon,
  CheckBadgeIcon
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
    <div className="min-h-screen bg-[#FDFDFD] py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* EXECUTIVE HEADER */}
        <div className="border-b-4 border-slate-900 pb-8">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">
            Center Registration
          </h1>
          <p className="text-xl text-slate-500 font-bold mt-2 italic">
            Onboard a new institutional branch to the MIS network.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-16">
          
          {/* SECTION 1: CORE DETAILS */}
          <FormSection 
            title="Institutional Profile" 
            icon={<BuildingLibraryIcon className="w-8 h-8 text-emerald-600" />}
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
            icon={<MapPinIcon className="w-8 h-8 text-blue-600" />}
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
            icon={<UserCircleIcon className="w-8 h-8 text-amber-600" />}
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
          <div className="bg-slate-900 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="text-white">
              <p className="text-emerald-400 text-xs font-black uppercase tracking-widest">Finalization</p>
              <h3 className="text-xl font-bold">Review information before submitting</h3>
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-12 py-5 bg-emerald-500 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-emerald-400 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20"
            >
              <CheckBadgeIcon className="w-6 h-6" />
              Authorize & Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ---------------- UI COMPONENTS ---------------- */

const FormSection = ({ title, icon, children }) => (
  <div className="space-y-8">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-white border-2 border-slate-100 rounded-2xl shadow-sm">
        {icon}
      </div>
      <h2 className="text-2xl font-black text-slate-900 tracking-tight">
        {title}
      </h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-10 rounded-[2.5rem] border-2 border-slate-100 shadow-sm">
      {children}
    </div>
  </div>
);

const Input = React.forwardRef(({ label, error, type = "text", ...props }, ref) => (
  <div className="space-y-2">
    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <input
      ref={ref}
      type={type}
      {...props}
      className={`w-full px-5 py-4 text-lg font-bold rounded-2xl border-2 transition-all focus:outline-none ${
        error
          ? "border-red-500 bg-red-50 text-red-900"
          : "border-slate-100 bg-slate-50 focus:border-slate-900 focus:bg-white"
      }`}
    />
    {error && <p className="text-xs font-black text-red-600 uppercase tracking-tighter">{error.message}</p>}
  </div>
));

const Textarea = React.forwardRef(({ label, error, ...props }, ref) => (
  <div className="space-y-2">
    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <textarea
      ref={ref}
      rows={3}
      {...props}
      className={`w-full px-5 py-4 text-lg font-bold rounded-2xl border-2 transition-all focus:outline-none ${
        error
          ? "border-red-500 bg-red-50 text-red-900"
          : "border-slate-100 bg-slate-50 focus:border-slate-900 focus:bg-white"
      }`}
    />
    {error && <p className="text-xs font-black text-red-600 uppercase tracking-tighter">{error.message}</p>}
  </div>
));

const Select = React.forwardRef(({ label, options, error, ...props }, ref) => (
  <div className="space-y-2">
    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <select
      ref={ref}
      {...props}
      className={`w-full px-5 py-4 text-lg font-bold rounded-2xl border-2 transition-all focus:outline-none appearance-none bg-slate-50 focus:border-slate-900 focus:bg-white ${
        error ? "border-red-500" : "border-slate-100"
      }`}
    >
      <option value="">Choose...</option>
      {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
));

export default RegisterCenter;