"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/app/Auth/userContext";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const SideBar = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
  {
    title: "Onboarding & Centers", // For the Guest who just registered a school
    active: true,
    links: [
      { label: "Onboarding Checklist", href: "/dashboard/setup-guide" }, 
      { label: "Register New Center", href: "/dashboard/adminSection" },
      { label: "My Centers List", href: "/dashboard/adminSection/all-centers" },
      { label: "Subscription & Billing", href: "/dashboard/adminSection/billing" },
    ],
  },
  {
    title: "Academic Setup", // The "Brain" - must be done before adding students
    active: true,
    links: [
      { label: "Academic Year/Terms", href: "/dashboard/academic/terms" },
      { label: "Classes & Sections", href: "/dashboard/academic/classes" },
      { label: "Subject Mapping", href: "/dashboard/academic/subjects" },
      { label: "Class Timetable", href: "/dashboard/academic/timetable" },
    ],
  },
  {
    title: "Students & Admission",
    active: true,
    links: [
      { label: "Admission Portal", href: "/dashboard/students/addStudents" },
      { label: "Student Directory", href: "/dashboard/students/manageStudents" },
      { label: "Daily Attendance", href: "/dashboard/students/studentAttendance" },
      { label: "Exam & Grading", href: "/dashboard/students/studentPerformance" },
      { label: "ID Card Generator", href: "/dashboard/students/id-cards" },
    ],
  },
  {
    title: "Accounts & Finance",
    active: true,
    links: [
      { label: "Fee Collection", href: "/dashboard/fees" },
      { label: "Payment History", href: "/dashboard/fees/history" },
      { label: "Expense Tracker", href: "/dashboard/fees/expenses" }, // New for MIS
      { label: "Scholarships/Waivers", href: "/dashboard/fees/scholarships" },
    ],
  },
  {
    title: "Human Resources",
    active: true,
    links: [
      { label: "Staff Directory", href: "/dashboard/hr/staff" },
      { label: "Staff Attendance", href: "/dashboard/hr/attendance" },
      { label: "Payroll Processing", href: "/dashboard/hr/payroll" },
      { label: "Leave Management", href: "/dashboard/hr/leaves" },
    ],
  },
  {
    title: "Inventory & Assets",
    active: true,
    links: [
      { label: "Asset Registry", href: "/dashboard/inventory/assets" },
      { label: "Library/Book Stock", href: "/dashboard/inventory/stock" },
      { label: "Procurement", href: "/dashboard/inventory/requests" },
    ],
  },
  {
    title: "Administration", // High-level control for the School Admin
    active: true,
    links: [
      { label: "User Roles & Permissions", href: "/dashboard/adminSection/usersAndRoles" },
      { label: "Notice Board", href: "/dashboard/adminSection/notices" },
      { label: "System Config", href: "/dashboard/adminSection/config" },
      { label: "Audit Logs", href: "/dashboard/reports/audit" },
    ],
  },
  {
    title: "Reports & Insights",
    active: true,
    links: [
      { label: "Financial Reports", href: "/dashboard/reports/finance" },
      { label: "Academic Result Sheets", href: "/dashboard/reports/academic" },
      { label: "Attendance Analytics", href: "/dashboard/reports/attendance-stats" },
    ],
  },
];

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-white rounded-lg shadow-md"
        >
          {isOpen ? (
            <XMarkIcon className="w-6 h-6 text-black" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-black" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-emerald-100 flex flex-col transition-transform duration-300
          md:static md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand Logo */}
        <div className="p-8 pb-6">
          <Link href="/dashboard" className="block group">
            <h2 className="text-2xl font-extrabold text-black tracking-tight leading-none">
              Learn<span className="text-emerald-600">Desk</span>
            </h2>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-1.5">
              MIS Software
            </p>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-6 space-y-8 scrollbar-hide">
          {categories
            .filter((cat) => cat.active)
            .map((cat, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wide px-2">
                  {cat.title}
                </h3>
                <div className="flex flex-col gap-1">
                  {cat.links.map((link, index) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={index}
                        href={link.href}
                        className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-base font-medium transition-all duration-200 ${
                          isActive
                            ? "text-emerald-700 font-semibold bg-emerald-50"
                            : "text-gray-800 hover:text-emerald-700 hover:bg-emerald-50/20"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <span>{link.label}</span>
                        <div
                          className={`w-1 h-5 rounded-full transition-all duration-300 ${
                            isActive
                              ? "bg-emerald-600 opacity-100"
                              : "bg-emerald-300 opacity-0 group-hover:opacity-100"
                          }`}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
        </nav>

        {/* User Footer */}
        <div className="p-6 border-t border-emerald-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-bold ring-2 ring-white">
            {user?.displayName?.charAt(0).toUpperCase() || "A"}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-black truncate leading-none mb-1">
              {user?.displayName || "Admin User"}
            </p>
            <p className="text-xs text-gray-600 truncate tracking-tight">
              {user?.email || "admin@educontrol.com"}
            </p>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SideBar;
