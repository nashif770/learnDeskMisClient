"use client";

import React from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  UserIcon,
  ClockIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const RequestsPage = () => {
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
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "approved":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "rejected":
        return "bg-rose-100 text-rose-800 border-rose-300";
      default:
        return "bg-slate-100 text-slate-700 border-slate-300";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:p-10 space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Access Requests
          </h1>
          <p className="text-slate-600 mt-1">
            Review and approve role upgrade requests
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl border shadow-sm">
          <ClockIcon className="w-5 h-5 text-amber-600" />
          <span className="font-bold text-slate-800">
            {requests.filter(r => r.status === "pending").length} Pending
          </span>
        </div>
      </div>

      {/* Table (Desktop) */}
      <div className="hidden md:block bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">Applicant</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">Role</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase text-center">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {requests.map(r => (
              <tr key={r.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{r.name}</p>
                      <p className="text-sm text-slate-600">{r.email}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 font-medium text-slate-700">
                  {r.roleRequested}
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {r.date}
                </td>

                <td className="px-6 py-4 text-center">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusStyle(r.status)}`}>
                    {r.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  {r.status === "pending" ? (
                    <div className="flex justify-end gap-2">
                      <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700">
                        Approve
                      </button>
                      <button className="px-4 py-2 border border-rose-300 text-rose-700 rounded-lg text-sm font-semibold hover:bg-rose-50">
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-sm text-slate-400 font-semibold">Processed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {requests.map(r => (
          <div key={r.id} className="bg-white p-5 rounded-xl border shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <UserIcon className="w-10 h-10 text-slate-600" />
              <div>
                <p className="font-bold text-slate-900">{r.name}</p>
                <p className="text-sm text-slate-600">{r.email}</p>
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Role</span>
              <span className="font-medium">{r.roleRequested}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Date</span>
              <span>{r.date}</span>
            </div>

            <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full border ${getStatusStyle(r.status)}`}>
              {r.status}
            </span>

            {r.status === "pending" && (
              <div className="flex gap-2 pt-2">
                <button className="flex-1 py-2 bg-emerald-600 text-white rounded-lg font-semibold">
                  Approve
                </button>
                <button className="flex-1 py-2 border border-rose-300 text-rose-700 rounded-lg font-semibold">
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestsPage;
