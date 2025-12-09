"use client";

import React from "react";
import { CheckCircleIcon, XCircleIcon, UserIcon } from "@heroicons/react/24/outline";

const RequestsPage = () => {
  // Dummy data — replace with live data (from Firestore or API)
  const requests = [
    {
      id: 1,
      name: "Rahim Uddin",
      email: "rahim@example.com",
      roleRequested: "Student",
      date: "2025-01-02",
      status: "pending",
    },
    {
      id: 2,
      name: "Fatema Akter",
      email: "fatema@example.com",
      roleRequested: "Teacher",
      date: "2025-01-08",
      status: "pending",
    },
    {
      id: 3,
      name: "Sajid Hasan",
      email: "sajid@example.com",
      roleRequested: "Admin",
      date: "2025-01-12",
      status: "approved",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-emerald-700">User Role Requests</h1>
      <p className="text-gray-600">
        Approve or reject role upgrade requests (Student → Teacher → Admin).
      </p>

      {/* Request Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border-b">Applicant</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Requested Role</th>
              <th className="p-3 border-b">Date</th>
              <th className="p-3 border-b text-center">Status</th>
              <th className="p-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50 transition">
                {/* Name */}
                <td className="p-3 border-b flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-sm text-gray-500">ID: {r.id}</p>
                  </div>
                </td>

                {/* Email */}
                <td className="p-3 border-b">{r.email}</td>

                {/* Requested Role */}
                <td className="p-3 border-b font-semibold text-emerald-600">
                  {r.roleRequested}
                </td>

                {/* Date */}
                <td className="p-3 border-b text-gray-600">{r.date}</td>

                {/* Status */}
                <td className="p-3 border-b text-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(r.status)}`}>
                    {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-3 border-b">
                  {r.status === "pending" ? (
                    <div className="flex justify-center gap-3">
                      <button
                        className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        <CheckCircleIcon className="h-5 w-5" /> Approve
                      </button>
                      <button
                        className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        <XCircleIcon className="h-5 w-5" /> Reject
                      </button>
                    </div>
                  ) : (
                    <p className="text-center text-gray-400 italic">No actions</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestsPage;
