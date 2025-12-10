"use client";
import React from "react";
import {
  UsersIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ChartBarIcon,
  BellAlertIcon,
  CurrencyBangladeshiIcon,
} from "@heroicons/react/24/outline";
import useUserData from "@/app/Hooks/useUserData";

const AdminOverview = () => {
  const { userData } = useUserData();
  const allUsers = userData || [];

  // User counts by role
  const totalStudents = allUsers.filter(u => u.role === "student").length;
  const totalTeachers = allUsers.filter(u => u.role === "teacher").length;
  const totalStaff = allUsers.filter(u => u.role === "staff").length;
  const totalHeadTeachers = allUsers.filter(u => u.role === "headteacher").length;
  const totalAdmins = allUsers.filter(u => u.role === "admin").length;
  const totalGuests = allUsers.filter(u => u.role === "guest").length;
  const pendingRequests = allUsers.filter(u => u.status === "pending").length;

  // Mock Payment info (replace with real data when available)
  const paymentInfo = {
    totalPaid: 185000,
    totalDue: 42000,
    target: 250000,
  };
  const paymentAchievement = ((paymentInfo.totalPaid / paymentInfo.target) * 100).toFixed(1);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-emerald-700">Admin Overview</h1>
      <p className="text-gray-600">Summary of all user categories</p>

      {/* User Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Students */}
        <div className="p-5 rounded-xl shadow bg-white flex items-center gap-4">
          <div className="p-4 rounded-lg bg-emerald-600 text-white">
            <UsersIcon className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Students</p>
            <h2 className="text-3xl font-bold">{totalStudents}</h2>
          </div>
        </div>

        {/* Teachers */}
        <div className="p-5 rounded-xl shadow bg-white flex items-center gap-4">
          <div className="p-4 rounded-lg bg-blue-600 text-white">
            <AcademicCapIcon className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Teachers</p>
            <h2 className="text-3xl font-bold">{totalTeachers}</h2>
          </div>
        </div>

        {/* Staff */}
        <div className="p-5 rounded-xl shadow bg-white flex items-center gap-4">
          <div className="p-4 rounded-lg bg-purple-600 text-white">
            <UserGroupIcon className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Staff</p>
            <h2 className="text-3xl font-bold">{totalStaff}</h2>
          </div>
        </div>

        {/* Head Teachers */}
        <div className="p-5 rounded-xl shadow bg-white flex items-center gap-4">
          <div className="p-4 rounded-lg bg-orange-600 text-white">
            <ChartBarIcon className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Head Teachers</p>
            <h2 className="text-3xl font-bold">{totalHeadTeachers}</h2>
          </div>
        </div>

        {/* Admins */}
        <div className="p-5 rounded-xl shadow bg-white flex items-center gap-4">
          <div className="p-4 rounded-lg bg-red-600 text-white">
            <BellAlertIcon className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Admins</p>
            <h2 className="text-3xl font-bold">{totalAdmins}</h2>
          </div>
        </div>

        {/* Guests */}
        <div className="p-5 rounded-xl shadow bg-white flex items-center gap-4">
          <div className="p-4 rounded-lg bg-gray-600 text-white">
            <UsersIcon className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Guests</p>
            <h2 className="text-3xl font-bold">{totalGuests}</h2>
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="p-6 bg-white shadow rounded-xl space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <CurrencyBangladeshiIcon className="w-7 h-7 text-emerald-600" />
          Payment Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 border rounded-lg bg-emerald-50 flex flex-col">
            <h3 className="text-lg text-gray-600">Total Paid</h3>
            <div className="text-4xl font-bold text-emerald-700">৳{paymentInfo.totalPaid.toLocaleString()}</div>
          </div>
          <div className="p-5 border rounded-lg bg-red-50 flex flex-col">
            <h3 className="text-lg text-gray-600">Total Due</h3>
            <div className="text-4xl font-bold text-red-600">৳{paymentInfo.totalDue.toLocaleString()}</div>
          </div>
          <div className="p-5 border rounded-lg bg-blue-50 flex flex-col">
            <h3 className="text-lg text-gray-600">Collection Target</h3>
            <div className="text-4xl font-bold text-blue-600">৳{paymentInfo.target.toLocaleString()}</div>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Target Achievement: {paymentAchievement}%</h3>
          <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">
            <div className="h-full bg-emerald-600 rounded-full transition-all" style={{ width: `${paymentAchievement}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
