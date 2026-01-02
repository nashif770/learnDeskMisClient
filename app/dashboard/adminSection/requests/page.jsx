"use client";

import React from "react";
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  UserIcon, 
  ClockIcon, 
  ShieldCheckIcon 
} from "@heroicons/react/24/outline";

const RequestsPage = () => {
  // Dummy data
  const requests = [
    {
      id: 1,
      name: "Rahim Uddin",
      email: "rahim@example.com",
      roleRequested: "Student",
      date: "Jan 02, 2026",
      status: "pending",
    },
    {
      id: 2,
      name: "Fatema Akter",
      email: "fatema@example.com",
      roleRequested: "Teacher",
      date: "Jan 08, 2026",
      status: "pending",
    },
    {
      id: 3,
      name: "Sajid Hasan",
      email: "sajid@example.com",
      roleRequested: "Admin",
      date: "Jan 12, 2026",
      status: "approved",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-100 ring-amber-500/20";
      case "approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-100 ring-emerald-500/20";
      case "rejected":
        return "bg-rose-50 text-rose-700 border-rose-100 ring-rose-500/20";
      default:
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 md:p-12 space-y-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">Access Requests</h1>
          <p className="text-slate-500 font-medium mt-2 text-xl italic">Review and moderate role upgrade applications.</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
          <ClockIcon className="w-6 h-6 text-amber-500" />
          <span className="text-lg font-black text-slate-700 tracking-tight">
            {requests.filter(r => r.status === "pending").length} Pending
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Applicant</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Requested Role</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Date</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em] text-center">Status</th>
                <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em] text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {requests.map((r) => (
                <tr key={r.id} className="group hover:bg-slate-50/30 transition-colors">
                  
                  {/* Applicant Info */}
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm">
                        <UserIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-lg font-black text-slate-800 tracking-tight">{r.name}</p>
                        <p className="text-sm font-bold text-slate-400">{r.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Requested Role */}
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <ShieldCheckIcon className="w-5 h-5 text-emerald-500" />
                      <span className="text-lg font-bold text-slate-700 capitalize tracking-tight">
                        {r.roleRequested}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-8 py-6">
                    <span className="text-sm font-bold text-slate-500 tracking-wide">{r.date}</span>
                  </td>

                  {/* Status Badge */}
                  <td className="px-8 py-6 text-center">
                    <span className={`inline-flex px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border ring-1 ${getStatusStyle(r.status)}`}>
                      {r.status}
                    </span>
                  </td>

                  {/* Action Area */}
                  <td className="px-10 py-6 text-right">
                    {r.status === "pending" ? (
                      <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                        <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95">
                          <CheckCircleIcon className="h-4 w-4" /> Approve
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-rose-100 text-rose-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-rose-50 transition-all">
                          <XCircleIcon className="h-4 w-4" /> Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs font-black text-slate-300 uppercase tracking-[0.2em] px-6">
                        Processed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Tip */}
      <div className="p-8 bg-slate-900 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-6 text-white">
          <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-xl border border-white/10">
            <ShieldCheckIcon className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <p className="text-xl font-black tracking-tight">Security Best Practice</p>
            <p className="text-sm text-slate-400 font-medium">Verify a user's identity via internal records before granting Admin privileges.</p>
          </div>
        </div>
        <button className="px-6 py-3 text-xs font-black text-emerald-400 uppercase tracking-[0.2em] border border-emerald-400/20 rounded-xl hover:bg-emerald-400 hover:text-slate-900 transition-all">
          View Audit Logs
        </button>
      </div>
    </div>
  );
};

export default RequestsPage;