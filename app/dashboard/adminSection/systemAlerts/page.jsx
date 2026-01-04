"use client";

import React from "react";
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  BellAlertIcon,
  ClockIcon,
  TrashIcon,
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
      bg: "bg-amber-100",
      text: "text-amber-800",
      indicator: "bg-amber-500",
    },
    info: {
      icon: <InformationCircleIcon className="w-5 h-5" />,
      bg: "bg-blue-100",
      text: "text-blue-800",
      indicator: "bg-blue-500",
    },
    success: {
      icon: <CheckCircleIcon className="w-5 h-5" />,
      bg: "bg-emerald-100",
      text: "text-emerald-800",
      indicator: "bg-emerald-500",
    },
    error: {
      icon: <BellAlertIcon className="w-5 h-5" />,
      bg: "bg-rose-100",
      text: "text-rose-800",
      indicator: "bg-rose-500",
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:p-10 space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            System Alerts
          </h1>
          <p className="text-slate-600">
            Monitor important system events and logs
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-900 hover:text-white transition">
          <TrashIcon className="w-4 h-4" />
          Clear Logs
        </button>
      </div>

      {/* Alerts */}
      <div className="max-w-4xl space-y-4 relative">

        {/* Timeline (Desktop Only) */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200 hidden md:block" />

        {alerts.map(alert => {
          const config = typeConfig[alert.type];

          return (
            <div
              key={alert.id}
              className="relative bg-white border border-slate-200 rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition flex gap-4"
            >
              {/* Indicator */}
              <div className={`absolute left-0 top-6 w-1 h-10 rounded-r ${config.indicator}`} />

              {/* Icon */}
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${config.bg} ${config.text}`}>
                {config.icon}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <h3 className="font-bold text-slate-900">
                    {alert.title}
                  </h3>
                  <div className="flex items-center gap-1 text-slate-500 text-xs font-semibold">
                    <ClockIcon className="w-4 h-4" />
                    {alert.time}
                  </div>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  {alert.message}
                </p>
              </div>

              {/* Action */}
              <button className="md:opacity-0 md:group-hover:opacity-100 p-2 text-slate-400 hover:text-rose-600 transition">
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {alerts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed">
          <CheckCircleIcon className="w-12 h-12 text-emerald-300 mx-auto mb-3" />
          <p className="text-slate-500 font-semibold">
            All systems are running normally
          </p>
        </div>
      )}
    </div>
  );
};

export default SystemAlerts;
