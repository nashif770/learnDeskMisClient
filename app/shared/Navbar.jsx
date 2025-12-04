'use client';
import React from "react";
import Link from "next/link";

const Navbar = () => {
  const user = null; // replace with your auth state (null or user object)

  return (
    <div className="w-full px-6 bg-white shadow h-16 flex items-center justify-between">
      
      {/* Brand */}
      <div className="text-purple-800 font-bold text-xl">
        Learn Desk MIS
      </div>

      {/* Navigation */}
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-gray-700 hover:text-purple-600">
          Home
        </Link>

        <Link href="/dashboard/student" className="text-gray-700 hover:text-purple-600">
          Dashboard
        </Link>

        <Link href="/contact" className="text-gray-700 hover:text-purple-600">
          Contact
        </Link>

        {/* Login / Logout */}
        {user ? (
          <Link href="/logout" className="text-red-600 font-medium hover:text-red-800">
            Logout
          </Link>
        ) : (
          <Link href="/login" className="text-purple-600 font-medium hover:text-purple-800">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
