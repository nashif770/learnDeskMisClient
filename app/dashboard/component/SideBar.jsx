"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/app/Auth/userContext";

const SideBar = () => {
  const { user } = useUser();
  const pathname = usePathname();

  const categories = [
    {
      title: "Admin",
      active: true,
      links: [
        { label: "Profile", href: "/dashboard/profile" },
        { label: "Admin Overview", href: "/dashboard/adminSection" },
        { label: "Users & Roles", href: "/dashboard/adminSection/usersAndRoles" },
        { label: "Requests & Approvals", href: "/dashboard/adminSection/requests" },
        { label: "System Alerts", href: "/dashboard/adminSection/systemAlerts" },
      ],
    },
    {
      title: "Students",
      active: true,
      links: [
        { label: "Add Student", href: "/dashboard/students/addStudents" },
        { label: "Manage Students", href: "/dashboard/students/manageStudents" },
        { label: "Attendance", href: "/dashboard/students/studentAttendance" },
        { label: "Performance", href: "/dashboard/students/studentPerformance" },
        { label: "Profiles", href: "/dashboard/students/studentProfile" },
      ],
    },
    {
      title: "Fees & Payments",
      active: true,
      links: [
        { label: "Fee Management", href: "/dashboard/fees" },
        { label: "Payments History", href: "/dashboard/fees/history" },
        { label: "Pending Payments", href: "/dashboard/fees/pending" },
        { label: "Scholarships", href: "/dashboard/fees/scholarships" },
      ],
    },
    { title: "Analytics", active: false, links: [] },
    { title: "Teachers", active: false, links: [] },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-100 flex flex-col sticky top-0">
      
      {/* Brand Logo Section */}
      <div className="p-8 pb-10">
        <Link href="/dashboard" className="block group">
          <h2 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">
            Edu<span className="text-emerald-600">Control</span>
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1.5">
            Management System
          </p>
        </Link>
      </div>

      {/* Navigation Scroll Area */}
      <div className="flex-1 overflow-y-auto px-6 space-y-9 pb-10 scrollbar-hide">
        {categories
          .filter((cat) => cat.active)
          .map((category, idx) => (
            <div key={idx} className="space-y-3">
              {/* Category Header */}
              <h3 className="text-[10px] font-black text-emerald-600/80 uppercase tracking-[0.25em] px-2">
                {category.title}
              </h3>

              {/* Link List */}
              <nav className="flex flex-col gap-1">
                {category.links.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={index}
                      href={link.href}
                      className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                        isActive 
                        ? "text-emerald-700 bg-emerald-50/50" 
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <span>{link.label}</span>
                      
                      {/* Minimalism indicator: Only shows for active or on hover */}
                      <div className={`w-1 h-4 rounded-full transition-all duration-300 ${
                        isActive 
                        ? "bg-emerald-500 opacity-100" 
                        : "bg-slate-200 opacity-0 group-hover:opacity-100"
                      }`} />
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
      </div>

      {/* User Brief Footer */}
      <div className="p-6 border-t border-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-black ring-4 ring-slate-50">
            {user?.displayName?.charAt(0) || "A"}
          </div>
          <div className="overflow-hidden">
            <p className="text-[13px] font-bold text-slate-800 truncate leading-none mb-1">
              {user?.displayName || "Admin User"}
            </p>
            <p className="text-[10px] font-semibold text-slate-400 truncate tracking-tight">
              {user?.email || "admin@educontrol.com"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;