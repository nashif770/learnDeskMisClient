import React from "react";
import Link from "next/link";

const SideBar = () => {
  // Sidebar links as an array
  const links = [
    { label: "Home", href: "/dashboard" },
    { label: "Profile", href: "/dashboard/profile" },
    { label: "Settings", href: "/dashboard/settings" },
    { label: "Reports", href: "/dashboard/reports" },
  ];

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen p-6 flex flex-col">
      {/* Sidebar header */}
      <h2 className="text-xl font-bold text-purple-700 mb-6">Dashboard Menu</h2>

      {/* Navigation links */}
      <nav className="flex flex-col space-y-3">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-gray-700 hover:text-purple-700 font-medium"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
