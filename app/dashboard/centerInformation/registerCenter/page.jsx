"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { 
  BuildingLibraryIcon, 
  MapPinIcon, 
  UserCircleIcon,
  CheckBadgeIcon,
  ChevronDownIcon,
  ArrowPathIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/outline";
import theme from "@/theme";

const RegisterCenter = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulated API Latency
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Center Registration Data:", data);
      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS STATE VIEW
  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: theme.colors.background }}>
        <div className="max-w-md w-full text-center space-y-6 p-10 rounded-2xl bg-white border shadow-xl" style={{ borderColor: theme.colors.border }}>
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <CheckBadgeIcon className="w-12 h-12 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: theme.colors.textMain }}>Center Registered</h2>
            <p className="mt-2 text-sm" style={{ color: theme.colors.textMuted }}>
              The institutional branch has been successfully added to the MIS network. Verification credentials have been sent to the admin email.
            </p>
          </div>
          <button 
            onClick={() => setIsSuccess(false)}
            className="w-full py-3 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
            style={{ backgroundColor: theme.colors.primary }}
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Register Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen py-10 px-6 font-sans"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* EXECUTIVE HEADER */}
        <div className="border-b pb-6" style={{ borderColor: theme.colors.border }}>
          <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: theme.colors.textMain }}>
            Center Registration
          </h1>
          <p className="font-medium mt-1" style={{ color: theme.colors.textMuted }}>
            Official onboarding for new institutional branches into the MIS network.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          
          {/* SECTION 1: CORE DETAILS */}
          <FormSection 
            title="Institutional Profile" 
            icon={<BuildingLibraryIcon className="w-6 h-6" style={{ color: theme.colors.primary }} />}
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
            icon={<MapPinIcon className="w-6 h-6" style={{ color: theme.colors.primary }} />}
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
            icon={<UserCircleIcon className="w-6 h-6" style={{ color: theme.colors.primary }} />}
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
          <div 
            className="border rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm"
            style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
          >
            <div>
              <p className="font-bold" style={{ color: theme.colors.textMain }}>Review Data Accuracy</p>
              <p className="text-sm" style={{ color: theme.colors.textMuted }}>Ensure all legal information is correct before authorization.</p>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-10 py-3 text-white font-bold text-sm uppercase tracking-widest rounded-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: theme.colors.primary }}
            >
              {isSubmitting ? (
                <ArrowPathIcon className="w-5 h-5 animate-spin" />
              ) : (
                <CheckBadgeIcon className="w-5 h-5" />
              )}
              {isSubmitting ? "Processing..." : "Register Branch"}
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
      <h2 className="text-lg font-bold tracking-tight" style={{ color: theme.colors.textMain }}>
        {title}
      </h2>
    </div>
    <div 
      className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 p-8 rounded-xl border shadow-sm"
      style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
    >
      {children}
    </div>
  </div>
);

const Input = React.forwardRef(({ label, error, type = "text", ...props }, ref) => (
  <div className="space-y-1.5">
    <label className="text-[11px] font-bold uppercase tracking-wider" style={{ color: theme.colors.textDisabled }}>
      {label}
    </label>
    <input
      ref={ref}
      type={type}
      {...props}
      style={{ 
        borderColor: error ? "#fca5a5" : theme.colors.border,
        backgroundColor: error ? "#fef2f2" : theme.colors.surface,
        color: error ? "#7f1d1d" : theme.colors.textMain
      }}
      className={`w-full px-4 py-2.5 text-sm font-semibold rounded-lg border transition-all focus:outline-none focus:ring-1 focus:ring-emerald-500`}
    />
    {error && <p className="text-[10px] font-bold text-red-600 uppercase mt-1">{error.message}</p>}
  </div>
));

const Textarea = React.forwardRef(({ label, error, ...props }, ref) => (
  <div className="space-y-1.5">
    <label className="text-[11px] font-bold uppercase tracking-wider" style={{ color: theme.colors.textDisabled }}>
      {label}
    </label>
    <textarea
      ref={ref}
      rows={3}
      {...props}
      style={{ 
        borderColor: error ? "#fca5a5" : theme.colors.border,
        backgroundColor: error ? "#fef2f2" : theme.colors.surface,
        color: error ? "#7f1d1d" : theme.colors.textMain
      }}
      className={`w-full px-4 py-2.5 text-sm font-semibold rounded-lg border transition-all focus:outline-none focus:ring-1 focus:ring-emerald-500`}
    />
    {error && <p className="text-[10px] font-bold text-red-600 uppercase mt-1">{error.message}</p>}
  </div>
));

const Select = React.forwardRef(({ label, options, error, ...props }, ref) => (
  <div className="space-y-1.5 relative">
    <label className="text-[11px] font-bold uppercase tracking-wider" style={{ color: theme.colors.textDisabled }}>
      {label}
    </label>
    <div className="relative">
      <select
        ref={ref}
        {...props}
        style={{ 
            borderColor: error ? "#fca5a5" : theme.colors.border,
            color: theme.colors.textMain
        }}
        className={`w-full px-4 py-2.5 text-sm font-semibold rounded-lg border transition-all appearance-none focus:outline-none bg-white focus:ring-1 focus:ring-emerald-500`}
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