"use client";

import React from "react";
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  BellAlertIcon,
} from "@heroicons/react/24/outline";

const SystemAlerts = () => {
  // Example alerts (replace with your actual data later)
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

  // Icon + color mapping based on type
  const typeConfig = {
    warning: {
      icon: <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" />,
      border: "border-yellow-400",
    },
    info: {
      icon: <InformationCircleIcon className="w-6 h-6 text-blue-600" />,
      border: "border-blue-400",
    },
    success: {
      icon: <CheckCircleIcon className="w-6 h-6 text-green-600" />,
      border: "border-green-400",
    },
    error: {
      icon: <BellAlertIcon className="w-6 h-6 text-red-600" />,
      border: "border-red-400",
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-emerald-700">System Alerts</h1>

      <div className="space-y-4">
        {alerts.map((alert) => {
          const config = typeConfig[alert.type];

          return (
            <div
              key={alert.id}
              className={`bg-white shadow-sm p-4 rounded-lg border-l-4 ${config.border} flex gap-4`}
            >
              <div>{config.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-800">{alert.title}</h3>
                <p className="text-gray-600 text-sm">{alert.message}</p>
                <span className="text-gray-400 text-xs">{alert.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SystemAlerts;
