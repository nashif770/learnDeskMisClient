"use client";
import React from "react";
import Link from "next/link";
import { auth } from "@/firebase/firebase_init";
import { useUser } from "../Auth/userContext";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const { user, setUser } = useUser();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out");
      })
      .catch((error) => console.log(error));
    setUser(null);
  };

  // Navigation items
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard/" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="w-full px-6 bg-white shadow h-16 flex items-center justify-between">
      {/* Brand */}
      <Link href="/">
        <div className="text-emerald-700 font-bold text-xl cursor-pointer">
          Learn Desk MIS
        </div>
      </Link>

      {/* Navigation */}
      <div className="flex items-center space-x-6">
        {/* Static Nav Items */}
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-gray-700 hover:text-emerald-600 transition"
          >
            {item.label}
          </Link>
        ))}

        {/* User Profile (only if logged in) */}
        {user && (
          <Link
            href="/dashboard/profile"
            className="text-emerald-700 font-medium hover:text-emerald-800 transition"
          >
            {user.displayName || "Profile"}
          </Link>
        )}

        {/* Login / Logout */}
        {user ? (
          <button
            href="/loginAndRegister"
            className="text-red-600 font-medium hover:text-red-800 transition"
            onClick={handleSignOut}
          >
            Logout
          </button>
        ) : (
          <Link
            href="/loginAndRegister"
            className="text-emerald-700 font-medium hover:text-emerald-900 transition"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
