"use client";
import { useUser } from "@/userContext";
import React from "react";

const Profile = () => {
  const { user } = useUser(); // get user info globally

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No user info available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-6">
      <h1 className="text-2xl font-bold text-purple-700 mb-4">Profile</h1>

      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user.photoURL || "/default-avatar.png"}
          alt={user.displayName || "User Avatar"}
          className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
        />
        <div>
          <h2 className="text-xl font-semibold">{user.displayName || "Unknown User"}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="space-y-4">
        <p>
          <span className="font-medium text-purple-700">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-medium text-purple-700">Name:</span> {user.displayName || "N/A"}
        </p>
        {/* Add more profile fields here */}
      </div>
    </div>
  );
};

export default Profile;
