"use client";
import React from "react";
import {
  UsersIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ChartBarIcon,
  BellAlertIcon,
  ClipboardDocumentCheckIcon,
  BanknotesIcon,
  CurrencyBangladeshiIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";

const AdminOverview = () => {
  // Mock Data - Replace with real API/context later
  const stats = {
    totalStudents: 420,
    totalTeachers: 36,
    totalStaff: 12,
    pendingRequests: 18,
    systemAlerts: 3,
    avgAttendance: 87,
    avgMarks: 74,
    maleStudents: 260,
    femaleStudents: 160,
    centers: 8,

    // Payment Data
    totalReceived: 185000, // tk
    totalDue: 42000,       // tk
    target: 250000,        // tk
  };

  const paymentAchievement =
    ((stats.totalReceived / stats.target) * 100).toFixed(1);

  const summaryCards = [
    {
      label: "Total Students",
      value: stats.totalStudents,
      icon: UsersIcon,
      color: "bg-emerald-600",
    },
    {
      label: "Total Teachers",
      value: stats.totalTeachers,
      icon: AcademicCapIcon,
      color: "bg-blue-600",
    },
    {
      label: "Staff Members",
      value: stats.totalStaff,
      icon: UserGroupIcon,
      color: "bg-purple-600",
    },
    {
      label: "Pending Requests",
      value: stats.pendingRequests,
      icon: ClipboardDocumentCheckIcon,
      color: "bg-orange-600",
    },
    {
      label: "System Alerts",
      value: stats.systemAlerts,
      icon: BellAlertIcon,
      color: "bg-red-600",
    },
    {
      label: "Training Centers",
      value: stats.centers,
      icon: ChartBarIcon,
      color: "bg-indigo-600",
    },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-emerald-700">Admin Overview</h1>
      <p className="text-gray-600">A complete summary of your MIS system at a glance.</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="p-5 rounded-xl shadow bg-white flex items-center gap-4 hover:shadow-lg transition"
          >
            <div className={`p-4 rounded-lg text-white ${card.color}`}>
              <card.icon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <h2 className="text-3xl font-bold">{card.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Summary */}
      <div className="p-6 bg-white shadow rounded-xl space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <CurrencyBangladeshiIcon className="w-7 h-7 text-emerald-600" />
          Payment Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Total Received */}
          <div className="p-5 border rounded-lg bg-emerald-50 flex flex-col">
            <h3 className="text-lg text-gray-600">Total Received</h3>
            <div className="text-4xl font-bold text-emerald-700">
              ৳{stats.totalReceived.toLocaleString()}
            </div>
          </div>

          {/* Total Due */}
          <div className="p-5 border rounded-lg bg-red-50 flex flex-col">
            <h3 className="text-lg text-gray-600">Total Due</h3>
            <div className="text-4xl font-bold text-red-600">
              ৳{stats.totalDue.toLocaleString()}
            </div>
          </div>

          {/* Target */}
          <div className="p-5 border rounded-lg bg-blue-50 flex flex-col">
            <h3 className="text-lg text-gray-600">Collection Target</h3>
            <div className="text-4xl font-bold text-blue-600">
              ৳{stats.target.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Achievement Bar */}
        <div className="mt-4">
          <h3 className="text-md font-semibold text-gray-700 mb-2">
            Target Achievement: {paymentAchievement}%
          </h3>

          <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all"
              style={{ width: `${paymentAchievement}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Gender Distribution */}
      <div className="p-6 bg-white shadow rounded-xl">
        <h2 className="text-xl font-bold mb-4">Gender Distribution</h2>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500">Male Students</p>
            <h3 className="text-3xl font-bold">{stats.maleStudents}</h3>
          </div>
          <div>
            <p className="text-gray-500">Female Students</p>
            <h3 className="text-3xl font-bold">{stats.femaleStudents}</h3>
          </div>
          <div className="text-right">
            <p className="text-gray-500">Total</p>
            <h3 className="text-3xl font-bold text-emerald-600">
              {stats.maleStudents + stats.femaleStudents}
            </h3>
          </div>
        </div>
      </div>

      {/* Placeholder for Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-10 bg-white border-dashed border-2 border-gray-300 rounded-xl text-center text-gray-500">
          📈 Monthly Revenue Trend  
          <br /> *(Chart.js / Recharts goes here)*
        </div>

        <div className="p-10 bg-white border-dashed border-2 border-gray-300 rounded-xl text-center text-gray-500">
          📊 Attendance Trend  
          <br /> *(Line graph placeholder)*
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
