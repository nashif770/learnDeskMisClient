"use client";
import React from "react";
import { useUser } from "../Auth/userContext";
import { signOut } from "firebase/auth";

const DashboardPage = () => {
  const { user, setUser } = useUser();

  const handleSignOut = () => {
    setUser(null);
    // signOut(auth)
    //   .then(() => {
    //     console.log("Signed out");
    //   })
    //   .catch((error) => console.log(error));
    signOut(auth)
      .then(() => {
        setUser(null); // optional, for instant UI update
        toast.success("Logged out successfully!");
        // router.push("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
        toast.error("Failed to logout!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">MIS Dashboard</h1>

        <div className="flex items-center gap-4">
          <span className="text-gray-700">Welcome, {user.displayName}</span>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Content / Info Section */}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-3">Dashboard Overview</h2>
          <p className="text-gray-700">
            This is your MIS system dashboard. From here you can manage
            students, teachers, courses, subscriptions, and more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
