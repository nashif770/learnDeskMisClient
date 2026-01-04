"use client";
import React, { useState } from "react";
import {
  UserPlusIcon,
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import useUserData from "@/app/Hooks/useUserData";

const UsersAndRoles = () => {
  const { userData } = useUserData();
  const allUsers = userData || [];
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const users = allUsers.map((u) => ({
    id: u.id,
    name: u.userdata?.name || "N/A",
    email: u.userdata?.email || "N/A",
    role: u.role || "guest",
    status: u.status || "active",
    initials: (u.userdata?.name || "U")
      .split(" ")
      .map(n => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
  }));

  const filteredUsers = users.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = activeFilter === "all" || u.role === activeFilter;
    return matchesSearch && matchesRole;
  });

  const badgeStyles = {
    guest: "bg-slate-100 text-slate-700 border-slate-300",
    student: "bg-emerald-100 text-emerald-800 border-emerald-300",
    teacher: "bg-blue-100 text-blue-800 border-blue-300",
    staff: "bg-purple-100 text-purple-800 border-purple-300",
    headteacher: "bg-amber-100 text-amber-800 border-amber-300",
    admin: "bg-rose-100 text-rose-800 border-rose-300",
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:p-10 space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            User Directory
          </h1>
          <p className="text-slate-600">
            Manage permissions and account status
          </p>
        </div>

        <div className="flex bg-white border rounded-lg p-1 shadow-sm">
          {["all", "admin", "teacher", "student"].map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 text-xs font-bold uppercase rounded-md transition ${
                activeFilter === f
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-xl">
        <MagnifyingGlassIcon className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 text-slate-800 font-medium focus:ring-2 focus:ring-emerald-200 outline-none"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100 text-xs font-bold uppercase text-slate-600">
            <tr>
              <th className="px-6 py-4 text-left">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredUsers.map(u => (
              <tr key={u.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center font-bold text-slate-700">
                    {u.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{u.name}</p>
                    <p className="text-sm text-slate-600">{u.email}</p>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full border ${badgeStyles[u.role]}`}>
                    {u.role}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-slate-700 capitalize">
                    {u.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  {u.status === "pending" ? (
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700">
                      Approve
                    </button>
                  ) : (
                    <button className="px-4 py-2 border rounded-lg text-slate-700 hover:bg-slate-900 hover:text-white">
                      Manage
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredUsers.map(u => (
          <div key={u.id} className="bg-white border rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center font-bold">
                {u.initials}
              </div>
              <div>
                <p className="font-bold text-slate-900">{u.name}</p>
                <p className="text-sm text-slate-600">{u.email}</p>
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Role</span>
              <span className={`px-2 py-0.5 rounded border text-xs font-bold ${badgeStyles[u.role]}`}>
                {u.role}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Status</span>
              <span className="font-semibold">{u.status}</span>
            </div>

            <button className="w-full py-2 rounded-lg bg-slate-900 text-white font-semibold">
              Manage User
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed">
          <FunnelIcon className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-semibold">No users found</p>
        </div>
      )}
    </div>
  );
};

export default UsersAndRoles;
