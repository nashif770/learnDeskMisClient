"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/app/Auth/userContext";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const SideBar = () => {
  // const { user } = useUser();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    // ------------------ Onboarding & Centers ------------------
    {
      title: "Setup",
      active: true,
      roles: ["Super Admin", "Admin", "Guest"],
      links: [
        {
          label: "Setup Guide",
          href: "/dashboard//myCenter/setupGuide",
          roles: ["Guest", "Admin", "Super Admin"],
        },
        {
          label: "Current Center",
          href: "/dashboard/myCenter/thisAcademy",
          roles: ["Admin", "Super Admin"],
        },
        {
          label: "Register New Center",
          href: "/dashboard/myCenter/registerCenter",
          roles: ["Guest", "Admin", "Super Admin"],
        },
        {
          label: "Subscription & Billing",
          href: "/dashboard/myCenter/billing",
          roles: ["Admin", "Super Admin"],
        },
        {
          label: "Pricing & Services",
          href: "/dashboard/myCenter/pricing",
          roles: ["Guest", "Admin", "Super Admin"],
        },

        {
          label: "Academic Year / Terms",
          href: "/dashboard/academicSetup/academicYear",
          roles: ["Admin", "Super Admin"],
        },
        {
          label: "Classes & Sections",
          href: "/dashboard/academicSetup/classAndSections",
          roles: ["Admin", "Super Admin"],
        },
        {
          label: "Subjects",
          href: "/dashboard/academicSetup/subjects",
          roles: ["Admin", "Super Admin", "Head Teacher"],
        },
        {
          label: "Timetable",
          href: "/dashboard/academicSetup/timetable",
          roles: ["Admin", "Super Admin", "Head Teacher", "Teacher"],
        },
      ],
    },

    // ================== STUDENTS ==================
    {
      title: "Student Information",
      active: true,
      roles: ["Super Admin", "Admin", "Head Teacher", "Teacher", "Student"],
      links: [
        {
          label: "Admissions",
          href: "/dashboard/students/addStudents",
          roles: ["Admin", "Super Admin", "Head Teacher"],
        },
        {
          label: "Student List",
          href: "/dashboard/students/studentProfile",
          roles: ["Admin", "Super Admin", "Head Teacher", "Teacher"],
        },
        {
          label: "Attendance",
          href: "/dashboard/students/studentAttendance",
          roles: ["Super Admin", "Head Teacher", "Teacher"],
        },
        {
          label: "Marks & Results",
          href: "/dashboard/students/studentPerformance",
          roles: ["Super Admin", "Head Teacher", "Teacher", "Student"],
        },
        {
          label: "ID Cards",
          href: "/dashboard/students/id-cards",
          roles: ["Admin", "Super Admin"],
        },
      ],
    },

    // ================== STAFF ==================
    {
      title: "Staff",
      active: false,
      roles: ["Super Admin", "Admin"],
      links: [
        {
          label: "Staff List",
          href: "/dashboard/hr/staff",
          roles: ["Admin", "Super Admin", "Teacher"],
        },
        {
          label: "Staff Attendance",
          href: "/dashboard/hr/attendance",
          roles: ["Admin", "Super Admin"],
        },
        {
          label: "Payroll",
          href: "/dashboard/hr/payroll",
          roles: ["Admin", "Super Admin"],
        },
        {
          label: "Leave Requests",
          href: "/dashboard/hr/leaves",
          roles: ["Admin", "Super Admin"],
        },
      ],
    },

    // ================== ACCOUNTS ==================
    {
      title: "Accounts",
      active: false,
      roles: ["Super Admin", "Admin", "Student"],
      links: [
        {
          label: "Fees",
          href: "/dashboard/fees",
          roles: ["Admin", "Super Admin"],
        },
        {
          label: "Payment History",
          href: "/dashboard/fees/history",
          roles: ["Admin", "Super Admin", "Student"],
        },
        {
          label: "Expenses",
          href: "/dashboard/fees/expenses",
          roles: ["Admin", "Super Admin"],
        },
        {
          label: "Scholarships",
          href: "/dashboard/fees/scholarships",
          roles: ["Admin", "Super Admin"],
        },
      ],
    },

    // ================== INVENTORY ==================
    {
      title: "Inventory",
      active: false,
      roles: ["Super Admin", "Admin", "Head Teacher"],
      links: [
        {
          label: "Assets",
          href: "/dashboard/inventory/assets",
          roles: ["Admin", "Super Admin"],
        },
        {
          label: "Library",
          href: "/dashboard/inventory/stock",
          roles: ["Admin", "Super Admin", "Head Teacher", "Teacher", "Student"],
        },
        {
          label: "Requests",
          href: "/dashboard/inventory/requests",
          roles: ["Admin", "Super Admin"],
        },
      ],
    },

    // ================== REPORTS ==================
    {
      title: "Reports",
      active: false,
      roles: ["Super Admin", "Admin", "Head Teacher", "Teacher", "Student"],
      links: [
        {
          label: "Finance Reports",
          href: "/dashboard/reports/finance",
          roles: ["Admin", "Super Admin"],
        },
        {
          label: "Academic Reports",
          href: "/dashboard/reports/academic",
          roles: ["Admin", "Super Admin", "Head Teacher", "Student"],
        },
        {
          label: "Attendance Reports",
          href: "/dashboard/reports/attendance-stats",
          roles: ["Admin", "Super Admin", "Head Teacher", "Teacher"],
        },
        {
          label: "My Grades",
          href: "/dashboard/reports/my-grades",
          roles: ["Student"],
        },
      ],
    },

    // ================== SYSTEM ==================
    {
      title: "System",
      active: false,
      roles: ["Super Admin", "Admin"],
      links: [
        {
          label: "Users & Roles",
          href: "/dashboard/adminSection/usersAndRoles",
          roles: ["Admin", "Super Admin"],
        },
        {
          label: "Notices",
          href: "/dashboard/adminSection/notices",
          roles: ["Admin", "Super Admin", "Head Teacher", "Teacher", "Student"],
        },
        {
          label: "Settings",
          href: "/dashboard/adminSection/config",
          roles: ["Admin", "Super Admin"],
        },
        {
          label: "Audit Logs",
          href: "/dashboard/reports/audit",
          roles: ["Admin", "Super Admin"],
        },
      ],
    },
  ];

  const user = {
    displayName: "John Doe",
    email: "john.doe@example.com",
    role: "Super Admin", // Try: "Super Admin", "Admin", "Head Teacher", "Teacher", "Student", "Guest"
  };

  const filteredCategories = categories
    .filter((cat) => cat.active && cat.roles.includes(user?.role)) // Keep category if user role matches
    .map((cat) => {
      const links = cat.links.filter((link) => link.roles.includes(user?.role)); // Keep only links for this role
      return { ...cat, links };
    })
    .filter((cat) => cat.links.length > 0); // Remove categories with no visible links

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
          {filteredCategories
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
