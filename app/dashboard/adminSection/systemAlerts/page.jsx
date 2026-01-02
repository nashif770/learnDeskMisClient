"use client";

import React from "react";
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  BellAlertIcon,
  ClockIcon,
  TrashIcon
} from "@heroicons/react/24/outline";

const SystemAlerts = () => {
  const alerts = [
    {
      id: 1,
      type: "warning",
      title: "Pending Teacher Role Request",
      message: "User 'rahim@example.com' requested to become a Teacher.",
      time: "5 minutes ago",
    },
    {
      id: 2,
      type: "info",
      title: "New Student Registration",
      message: "A new student joined your education center.",
      time: "10 minutes ago",
    },
    {
      id: 3,
      type: "success",
      title: "Backup Completed Successfully",
      message: "System automatically backed up database.",
      time: "1 hour ago",
    },
    {
      id: 4,
      type: "error",
      title: "Subscription Expired",
      message: "Admin of Greenhill School has an expired subscription.",
      time: "2 hours ago",
    },
  ];

  const typeConfig = {
    warning: {
      icon: <ExclamationTriangleIcon className="w-5 h-5" />,
      theme: "bg-amber-50 text-amber-600 border-amber-100",
      indicator: "bg-amber-500"
    },
    info: {
      icon: <InformationCircleIcon className="w-5 h-5" />,
      theme: "bg-blue-50 text-blue-600 border-blue-100",
      indicator: "bg-blue-500"
    },
    success: {
      icon: <CheckCircleIcon className="w-5 h-5" />,
      theme: "bg-emerald-50 text-emerald-600 border-emerald-100",
      indicator: "bg-emerald-500"
    },
    error: {
      icon: <BellAlertIcon className="w-5 h-5" />,
      theme: "bg-rose-50 text-rose-600 border-rose-100",
      indicator: "bg-rose-500"
    },
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-4 md:p-10 space-y-8">
      
      {/* Header with Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Alerts</h1>
          <p className="text-slate-500 font-medium">Monitor critical system events and logs.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm">
          <TrashIcon className="w-4 h-4" />
          Clear All Logs
        </button>
      </div>

      {/* Alerts Feed */}
      <div className="max-w-4xl space-y-4 relative">
        {/* The Timeline Line */}
        <div className="absolute left-[26px] top-2 bottom-2 w-0.5 bg-slate-100 hidden md:block" />

        {alerts.map((alert) => {
          const config = typeConfig[alert.type];

          return (
            <div
              key={alert.id}
              className={`group relative bg-white border border-slate-100 p-5 rounded-[2rem] shadow-sm hover:shadow-md transition-all flex gap-5 items-start md:ml-2`}
            >
              {/* Type Icon Container */}
              <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center border-4 border-white shadow-sm ${config.theme}`}>
                {config.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
                  <h3 className="font-black text-slate-800 tracking-tight">
                    {alert.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <ClockIcon className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{alert.time}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  {alert.message}
                </p>
              </div>

              {/* Quick Action (Visible on Hover) */}
              <button className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-rose-500 transition-all">
                <TrashIcon className="w-4 h-4" />
              </button>

              {/* Status Indicator Dot */}
              <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full ${config.indicator}`} />
            </div>
          );
        })}
      </div>

      {/* Empty State Logic (If needed) */}
      {alerts.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
          <CheckCircleIcon className="w-12 h-12 text-emerald-200 mx-auto mb-4" />
          <p className="text-slate-400 font-black uppercase tracking-widest text-xs">All Systems Nominal</p>
        </div>
      )}
    </div>
  );
};

export default SystemAlerts;