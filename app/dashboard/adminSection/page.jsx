"use client";
import React from "react";
import {
  UsersIcon,
  AcademicCapIcon,
  UserGroupIcon,
  PresentationChartLineIcon,
  ShieldCheckIcon,
  BriefcaseIcon
} from "@heroicons/react/24/outline";
import useUserData from "@/app/Hooks/useUserData";

const AdminOverview = () => {
  const { userData } = useUserData();
  const allUsers = userData || [];

  const stats = [
    { label: "Students", count: allUsers.filter(u => u.role === "student").length, color: "bg-emerald-500", icon: <UsersIcon className="w-7 h-7" aria-hidden="true" /> },
    { label: "Teachers", count: allUsers.filter(u => u.role === "teacher").length, color: "bg-blue-500", icon: <AcademicCapIcon className="w-7 h-7" aria-hidden="true" /> },
    { label: "Staff", count: allUsers.filter(u => u.role === "staff").length, color: "bg-indigo-500", icon: <BriefcaseIcon className="w-7 h-7" aria-hidden="true" /> },
    { label: "Head Teachers", count: allUsers.filter(u => u.role === "headteacher").length, color: "bg-amber-500", icon: <PresentationChartLineIcon className="w-7 h-7" aria-hidden="true" /> },
    { label: "Admins", count: allUsers.filter(u => u.role === "admin").length, color: "bg-rose-500", icon: <ShieldCheckIcon className="w-7 h-7" aria-hidden="true" /> },
    { label: "Guests", count: allUsers.filter(u => u.role === "guest").length, color: "bg-slate-500", icon: <UserGroupIcon className="w-7 h-7" aria-hidden="true" /> },
  ];

  const paymentInfo = { totalPaid: 185000, totalDue: 42000, target: 250000 };
  const paymentAchievement = ((paymentInfo.totalPaid / paymentInfo.target) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 space-y-12">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Admin Overview</h1>
          <p className="text-slate-600 font-medium mt-2 text-lg md:text-xl italic">Real-time ecosystem summary</p>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 bg-emerald-50 rounded-2xl border border-emerald-100 shadow-sm">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-bold text-emerald-700 uppercase tracking-widest">System Live</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className={`w-14 h-14 ${stat.color} text-white rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg transition-transform md:group-hover:-rotate-6`}>
              {stat.icon}
            </div>
            <p className="text-xs md:text-sm font-bold text-slate-700 uppercase tracking-widest">{stat.label}</p>
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mt-1 md:mt-2">{stat.count}</h2>
          </div>
        ))}
      </div>

      {/* Payment Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

        {/* Financial Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <FinancialCard label="Total Revenue Collected" amount={paymentInfo.totalPaid} type="success" sub="Received this session" />
          <FinancialCard label="Outstanding Dues" amount={paymentInfo.totalDue} type="danger" sub="Requires immediate attention" />
        </div>

        {/* Achievement Progress Card */}
        <div className="bg-slate-900 rounded-2xl p-8 md:p-10 text-white relative overflow-hidden shadow-2xl flex flex-col justify-center min-h-[280px]">
          <div className="relative z-10">
            <h3 className="text-base font-bold text-slate-400 uppercase tracking-widest mb-6">Target Progress</h3>
            <div className="flex items-end gap-3 mb-3">
              <span className="text-5xl md:text-6xl font-extrabold tracking-tight">{paymentAchievement}%</span>
              <span className="text-emerald-400 font-bold text-lg mb-1 uppercase tracking-widest">Reached</span>
            </div>
            <div className="w-full h-3 md:h-4 bg-white/10 rounded-full overflow-hidden border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000"
                style={{ width: `${paymentAchievement}%` }}
              />
            </div>
            <p className="mt-6 text-sm md:text-base text-slate-400 font-semibold tracking-wide">
              Goal: ৳{paymentInfo.target.toLocaleString()} • ৳{(paymentInfo.target - paymentInfo.totalPaid).toLocaleString()} left
            </p>
          </div>
          <div className="absolute -right-10 -bottom-10 w-52 h-52 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>

      </div>

    </div>
  );
};

const FinancialCard = ({ label, amount, type, sub }) => {
  const isSuccess = type === "success";
  return (
    <div className="bg-white border border-slate-100 p-6 md:p-10 rounded-2xl shadow-sm relative overflow-hidden transition-transform hover:scale-[1.01]">
      <div className={`absolute top-0 right-0 w-28 h-28 translate-x-10 -translate-y-10 rounded-full ${isSuccess ? 'bg-emerald-50' : 'bg-rose-50'}`} />
      <p className="text-xs md:text-sm font-bold text-slate-600 uppercase tracking-widest mb-2 relative z-10">{label}</p>
      <div className={`text-2xl md:text-5xl font-extrabold mb-2 relative z-10 ${isSuccess ? 'text-emerald-600' : 'text-rose-600'}`}>
        ৳{amount.toLocaleString()}
      </div>
      <p className="text-sm md:text-base font-semibold text-slate-600 relative z-10 tracking-tight">{sub}</p>
    </div>
  );
};

export default AdminOverview;
