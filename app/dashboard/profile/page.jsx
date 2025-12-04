"use client";
import { useUser } from "@/userContext";
import React, { useState } from "react";

const Profile = () => {
  const { user } = useUser(); // global user info
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

    // Placeholder: Here you can send this request to Firestore or your backend
    console.log(`${user.displayName} requested role: ${requestedRole}`);
    setRequestStatus(`Your request to become a ${requestedRole} has been submitted.`);
    setRequestedRole(""); // reset selection
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-700 mb-4">Profile</h1>

      {/* User Info */}
      <div className="flex items-center space-x-4">
        <img
          src={user.photoURL || "/default-avatar.png"}
          alt={user.displayName || "User Avatar"}
          className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
        />
        <div>
          <h2 className="text-xl font-semibold">{user.displayName || "Unknown User"}</h2>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-gray-500">Current Role: <span className="font-medium text-purple-700">{user.role || "Student"}</span></p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="space-y-2">
        <p>
          <span className="font-medium text-purple-700">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-medium text-purple-700">Name:</span> {user.displayName || "N/A"}
        </p>
        <p>
          <span className="font-medium text-purple-700">User ID:</span> {user.uid}
        </p>
        {/* You can add more fields like joined date, etc. */}
      </div>

      {/* Role Request Form */}
      <div className="border-t pt-4 mt-4">
        <h3 className="text-lg font-semibold text-purple-700 mb-2">Request Role Change</h3>
        <form onSubmit={handleRoleRequest} className="space-y-4">
          <label className="block text-gray-700">
            Select Role:
            <select
              value={requestedRole}
              onChange={(e) => setRequestedRole(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
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
            className="w-full py-3 px-4 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition"
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
