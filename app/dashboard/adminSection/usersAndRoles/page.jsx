"use client";
import React, { useState } from "react";
import {
  UsersIcon,
  UserPlusIcon,
  ShieldCheckIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import useUserData from "@/app/Hooks/useUserData";

const UsersAndRoles = () => {
  const { userData } = useUserData();
  const allUsers = userData || [];

  console.log("checking the data", userData)

  const [search, setSearch] = useState("");

  // Flatten nested user data for display
  const flattenedUsers = allUsers.map((u) => ({
    id: u.id,
    name: u.userdata?.name || "N/A",
    email: u.userdata?.email || "N/A",
    role: u.role || "guest",
    status: u.status || "active",
  }));

  const filteredUsers = flattenedUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const badgeColor = {
    guest: "bg-gray-200 text-gray-700",
    student: "bg-emerald-100 text-emerald-700",
    teacher: "bg-blue-100 text-blue-700",
    staff: "bg-purple-100 text-purple-700",
    headteacher: "bg-orange-100 text-orange-700",
    admin: "bg-red-100 text-red-700",
  };

  const statusColor = {
    pending: "text-orange-600",
    active: "text-emerald-700",
    blocked: "text-red-600",
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-emerald-700 flex items-center gap-2">
          <UsersIcon className="w-8 h-8" />
          Users
        </h1>
        <p className="text-gray-600">All users in the system.</p>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 w-full max-w-md px-3 py-2 border bg-white rounded-lg shadow-sm">
        <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none"
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-xl shadow bg-white">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u) => (
              <tr
                key={u.id}
                className="border-t hover:bg-gray-50 transition cursor-pointer"
              >
                <td className="p-3 border font-medium">{u.name}</td>
                <td className="p-3 border text-gray-600">{u.email}</td>

                {/* Role Badge */}
                <td className="p-3 border">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      badgeColor[u.role] || "bg-gray-200"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>

                {/* Status */}
                <td className={`p-3 border font-semibold ${statusColor[u.status]}`}>
                  {u.status}
                </td>

                {/* Actions */}
                <td className="p-3 border text-center">
                  {u.status === "pending" ? (
                    <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1 mx-auto">
                      <UserPlusIcon className="w-4 h-4" /> Approve
                    </button>
                  ) : (
                    <button className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 flex items-center gap-1 mx-auto">
                      <ShieldCheckIcon className="w-4 h-4" /> Manage
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500 italic">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersAndRoles;
