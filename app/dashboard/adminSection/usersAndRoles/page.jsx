"use client";
import React, { useState } from "react";
import {
  UsersIcon,
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

  const flattenedUsers = allUsers.map((u) => ({
    id: u.id,
    name: u.userdata?.name || "N/A",
    email: u.userdata?.email || "N/A",
    role: u.role || "guest",
    status: u.status || "active",
    initials: (u.userdata?.name || "U").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
  }));

  const filteredUsers = flattenedUsers.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || 
                          u.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "all" || u.role === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const badgeStyles = {
    guest: "bg-slate-100 text-slate-600 border-slate-200",
    student: "bg-emerald-50 text-emerald-700 border-emerald-100",
    teacher: "bg-blue-50 text-blue-700 border-blue-100",
    staff: "bg-purple-50 text-purple-700 border-purple-100",
    headteacher: "bg-amber-50 text-amber-700 border-amber-100",
    admin: "bg-rose-50 text-rose-700 border-rose-100",
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 md:p-12 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight flex items-center gap-4">
            User Directory
          </h1>
          <p className="text-slate-500 font-medium text-xl italic mt-2">Manage permissions and account statuses</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
          {["all", "admin", "teacher", "student"].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] transition-all ${
                activeFilter === f ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative flex-1 group">
          <MagnifyingGlassIcon className="w-6 h-6 text-slate-400 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-emerald-500 transition-colors" />
          <input
            type="text"
            placeholder="Search users by name, email, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-emerald-50 transition-all font-semibold text-lg text-slate-600 shadow-sm placeholder:text-slate-300"
          />
        </div>
      </div>

      {/* Modern Table Container */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">User Details</th>
              <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">System Role</th>
              <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
              <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em] text-right">Access</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredUsers.map((u) => (
              <tr key={u.id} className="group hover:bg-slate-50/30 transition-colors">
                {/* User Identity */}
                <td className="px-10 py-6">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 font-black text-sm border border-slate-200 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-400 transition-all shadow-sm">
                      {u.initials}
                    </div>
                    <div>
                      <div className="text-lg font-black text-slate-800 tracking-tight">{u.name}</div>
                      <div className="text-sm font-bold text-slate-400">{u.email}</div>
                    </div>
                  </div>
                </td>

                {/* Role Chip */}
                <td className="px-8 py-6">
                  <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-[0.1em] border ${badgeStyles[u.role] || badgeStyles.guest}`}>
                    {u.role}
                  </span>
                </td>

                {/* Status Dot */}
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${u.status === 'active' ? 'bg-emerald-500' : u.status === 'pending' ? 'bg-amber-500' : 'bg-rose-500'} shadow-sm`} />
                    <span className="text-sm font-black text-slate-600 capitalize tracking-tight">{u.status}</span>
                  </div>
                </td>

                {/* Action Buttons */}
                <td className="px-10 py-6 text-right">
                  <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                    {u.status === "pending" ? (
                      <button className="p-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 shadow-xl shadow-emerald-100 transition-all hover:-translate-y-1">
                        <UserPlusIcon className="w-5 h-5" />
                      </button>
                    ) : (
                      <button className="p-3 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                        <ShieldCheckIcon className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
               <FunnelIcon className="w-10 h-10 text-slate-200" />
            </div>
            <p className="text-slate-400 font-black text-lg tracking-tight">No results found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersAndRoles;