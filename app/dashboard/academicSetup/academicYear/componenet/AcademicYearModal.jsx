"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { XMarkIcon, CalendarIcon, BanknotesIcon, TagIcon } from "@heroicons/react/24/outline";
import theme from "@/theme";

const AcademicYearModal = ({ isOpen, type, data, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      startDate: "",
      endDate: "",
      revenue: "",
      status: "Upcoming",
    },
  });

  // Sync form with data prop when modal opens or data changes
  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        startDate: data.startDate || "",
        endDate: data.endDate || "",
        revenue: data.stats?.revenue || "",
        status: data.status || "Upcoming",
      });
    } else {
      reset({
        name: "",
        startDate: "",
        endDate: "",
        revenue: "",
        status: "Upcoming",
      });
    }
  }, [data, reset, isOpen]);

  if (!isOpen) return null;

  const isArchive = type === "archive";

  const onSubmit = (formData) => {
    console.log("Form Submitted:", formData);
    // You would typically call an API or parent function here
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity" 
        onClick={onClose} 
      />
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
        style={{ backgroundColor: theme.colors.surface }}
      >
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center" style={{ borderColor: theme.colors.border }}>
          <div>
            <h2 className="text-xl font-bold" style={{ color: theme.colors.textMain }}>
              {type === 'create' && "Initialize New Session"}
              {type === 'edit' && "Modify Session Details"}
              {type === 'archive' && "Archive Academic Session"}
            </h2>
            <p className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: theme.colors.textDisabled }}>
              {isArchive ? "Data Finalization" : "Configuration Terminal"}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg transition-colors hover:bg-slate-100">
            <XMarkIcon className="w-5 h-5" style={{ color: theme.colors.textMuted }} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {isArchive ? (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-red-50 border border-red-100">
                <p className="text-sm font-medium text-red-800 leading-relaxed">
                  Warning: Archiving <span className="font-bold underline">{data?.name}</span> will lock all student records and financial logs. This action moves the session to historical storage.
                </p>
              </div>
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={onClose} 
                  className="flex-1 py-3 rounded-lg font-bold text-xs border"
                  style={{ color: theme.colors.textMuted, borderColor: theme.colors.border }}
                >
                  CANCEL
                </button>
                <button className="flex-1 py-3 rounded-lg font-bold text-xs text-white bg-red-600 hover:bg-red-700 shadow-md">
                  CONFIRM ARCHIVE
                </button>
              </div>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4">
                
                {/* Session Name */}
                <div className="col-span-2">
                  <FormLabel label="Session Name" icon={<TagIcon className="w-3 h-3"/>} />
                  <input 
                    {...register("name", { required: "Session name is required" })}
                    placeholder="e.g. 2025–2026"
                    className={getInputClass(errors.name)}
                    style={getInputStyle(errors.name)}
                  />
                  <ErrorMessage error={errors.name} />
                </div>

                {/* Start Date */}
                <div>
                  <FormLabel label="Start Date" icon={<CalendarIcon className="w-3 h-3"/>} />
                  <input 
                    type="date"
                    {...register("startDate", { required: "Required" })}
                    className={getInputClass(errors.startDate)}
                    style={getInputStyle(errors.startDate)}
                  />
                  <ErrorMessage error={errors.startDate} />
                </div>

                {/* End Date */}
                <div>
                  <FormLabel label="End Date" icon={<CalendarIcon className="w-3 h-3"/>} />
                  <input 
                    type="date"
                    {...register("endDate", { required: "Required" })}
                    className={getInputClass(errors.endDate)}
                    style={getInputStyle(errors.endDate)}
                  />
                  <ErrorMessage error={errors.endDate} />
                </div>

                {/* Revenue */}
                <div>
                  <FormLabel label="Revenue Target" icon={<BanknotesIcon className="w-3 h-3"/>} />
                  <input 
                    placeholder="BDT"
                    {...register("revenue")}
                    className={getInputClass()}
                    style={getInputStyle()}
                  />
                </div>

                {/* Status Select */}
                <div>
                  <FormLabel label="Initial Status" />
                  <div className="relative">
                    <select 
                      {...register("status")}
                      className="w-full border rounded-lg p-2.5 text-xs font-bold outline-none appearance-none"
                      style={{ backgroundColor: theme.colors.background, borderColor: theme.colors.border, color: theme.colors.textMain }}
                    >
                      <option value="Upcoming">Upcoming</option>
                      <option value="Active">Active</option>
                      <option value="Archived">Archived</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 text-[10px]">▼</div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full py-3.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-all shadow-md active:scale-[0.98] text-white"
                  style={{ backgroundColor: theme.colors.primary }}
                >
                  {type === 'create' ? "Confirm Initialization" : "Update Session"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

/* --- MINI HELPERS --- */

const FormLabel = ({ label, icon }) => (
  <label className="text-[9px] font-bold uppercase tracking-widest ml-1 mb-1.5 flex items-center gap-1" style={{ color: theme.colors.textDisabled }}>
    {icon && React.cloneElement(icon, { style: { color: theme.colors.primary } })} {label}
  </label>
);

const ErrorMessage = ({ error }) => 
  error ? <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{error.message}</p> : null;

const getInputClass = (error) => 
  `w-full border rounded-lg p-2.5 text-xs font-bold outline-none transition-all focus:ring-1 ${error ? 'border-red-500' : ''}`;

const getInputStyle = (error) => ({
  backgroundColor: theme.colors.background,
  borderColor: error ? 'rgb(239, 68, 68)' : theme.colors.border,
  color: theme.colors.textMain,
  "--tw-ring-color": theme.colors.primary 
});

export default AcademicYearModal;