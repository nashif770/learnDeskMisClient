"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@/app/Auth/userContext";
import { FaSave } from "react-icons/fa";

const EditProfile = () => {
  const { user, updateUser } = useUser(); // assume updateUser is available from context
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateUser) {
      updateUser({ displayName: name, email })
        .then(() => setStatus("Profile updated successfully!"))
        .catch(() => setStatus("Failed to update profile."));
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">No user info available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-emerald-700">Edit Profile</h1>

      <div className="bg-white shadow-md rounded-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-300 transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-300 transition"
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-lg shadow hover:bg-emerald-700 transition"
          >
            <FaSave /> Save Changes
          </button>
        </form>

        {status && (
          <p className="text-green-600 mt-4 font-medium text-center">{status}</p>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
