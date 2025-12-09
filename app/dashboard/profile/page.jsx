"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaSignOutAlt, FaEdit } from "react-icons/fa";

const Profile = () => {
  const router = useRouter();
  const [requestedRole, setRequestedRole] = useState("");
  const [requestStatus, setRequestStatus] = useState("");

  // Placeholder user data
  const user = {
    displayName: "John Doe",
    email: "johndoe@example.com",
    role: "Admin",
    uid: "123456",
    photoURL: "/default-avatar.png",
    center: "Sunrise High School",
    batch: "2025-2026",
    phone: "+1-555-1234",
  };

  const signout = () => {
    alert("Signed out");
  };

  const handleRoleRequest = (e) => {
    e.preventDefault();
    if (!requestedRole) {
      setRequestStatus("Please select a role to request.");
      return;
    }
    setRequestStatus(`Your request to become a ${requestedRole} has been submitted.`);
    setRequestedRole("");
  };

  const handleEdit = () => {
    router.push("profile/editProfile");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-emerald-700">Profile</h1>
        <button
          onClick={handleEdit}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <FaEdit /> Edit
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="flex flex-col items-center">
          <img
            src={user.photoURL}
            alt="avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-emerald-200"
          />
          <button
            onClick={signout}
            className="mt-4 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-gray-500 font-medium">Name</span>
            <span className="text-lg font-semibold">{user.displayName}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 font-medium">Email</span>
            <span className="text-lg font-semibold">{user.email}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 font-medium">Phone</span>
            <span className="text-lg font-semibold">{user.phone}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 font-medium">Role</span>
            <span className="text-lg font-semibold">{user.role}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 font-medium">School</span>
            <span className="text-lg font-semibold">{user.center}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 font-medium">Batch</span>
            <span className="text-lg font-semibold">{user.batch}</span>
          </div>
        </div>
      </div>

      {/* Role Request */}
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-bold text-purple-700 mb-4">Request Role Change</h2>
        <form onSubmit={handleRoleRequest} className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <select
            value={requestedRole}
            onChange={(e) => setRequestedRole(e.target.value)}
            className="w-full sm:w-1/3 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-300 focus:outline-none"
          >
            <option value="">-- Choose Role --</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="HT">Head Teacher</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg shadow hover:bg-emerald-700 transition"
          >
            Submit Request
          </button>
        </form>
        {requestStatus && <p className="text-green-600 mt-3 font-medium">{requestStatus}</p>}
      </div>
    </div>
  );
};

export default Profile;
