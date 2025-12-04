"use client";
import { useUser } from "@/userContext";
import React, { useState } from "react";

const Profile = () => {
  const { user } = useUser();
  const [requestedRole, setRequestedRole] = useState("");
  const [requestStatus, setRequestStatus] = useState("");

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No user info available.</p>
      </div>
    );
  }

  const handleRoleRequest = (e) => {
    e.preventDefault();

    if (!requestedRole) {
      setRequestStatus("Please select a role to request.");
      return;
    }

    console.log(`${user.displayName} requested role: ${requestedRole}`);
    setRequestStatus(
      `Your request to become a ${requestedRole} has been submitted.`
    );
    setRequestedRole("");
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-50 shadow-md rounded-xl p-6 space-y-6">
      <h1 className="text-2xl font-bold text-emerald-700 mb-4">Profile</h1>

      {/* User Info */}
      <div className="flex items-center space-x-4">
        <img
          src={user.photoURL || "/default-avatar.png"}
          alt={user.displayName || "User Avatar"}
          className="w-20 h-20 rounded-full object-cover border-2 border-emerald-500"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {user.displayName || "Unknown User"}
          </h2>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-gray-500">
            Current Role:{" "}
            <span className="font-medium text-emerald-700">
              {user.role || "Guest"}
            </span>
          </p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="space-y-2 text-gray-700 text-sm">
        <p>
          <span className="font-medium text-emerald-700">Email:</span>{" "}
          {user.email}
        </p>
        <p>
          <span className="font-medium text-emerald-700">Name:</span>{" "}
          {user.displayName || "N/A"}
        </p>
        <p>
          <span className="font-medium text-emerald-700">User ID:</span>{" "}
          {user.uid}
        </p>
      </div>

      {/* Role Request Form */}
      <div className="border-t border-gray-300 pt-4 mt-4">
        <h3 className="text-lg font-semibold text-emerald-700 mb-2">
          Request Role Change
        </h3>
        <form onSubmit={handleRoleRequest} className="space-y-4">
          <label className="block text-gray-700">
            Select Role:
            <select
              value={requestedRole}
              onChange={(e) => setRequestedRole(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">-- Choose Role --</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="HT">Head Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow hover:bg-emerald-700 transition"
          >
            Submit Request
          </button>
        </form>
        {requestStatus && (
          <p className="mt-2 text-sm text-green-600">{requestStatus}</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
