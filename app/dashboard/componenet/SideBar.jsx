import React from "react";
import Link from "next/link";
import { useUser } from "@/app/Auth/userContext";

const SideBar = () => {
  const { user } = useUser();
  // Sidebar links categorized
  const categories = [
    {
      title: "Admin Notifications",
      mvpRating: 2, // High priority for MVP
      links: [
        { label: "User Requests", href: "/dashboard/requests" },
        { label: "System Alerts", href: "/dashboard/notifications" },
        { label: "Approval Requests", href: "/dashboard/approvals" },
      ],
    },
    {
      title: "Reports & Analytics",
      mvpRating: 3,
      links: [
        { label: "Reports", href: "/dashboard/reports" },
        { label: "Graphs & Charts", href: "/dashboard/reports/graphs" },
        {
          label: "Performance Analytics",
          href: "/dashboard/reports/performance",
        },
        {
          label: "Attendance Analytics",
          href: "/dashboard/reports/attendance",
        },
        { label: "Exam Analytics", href: "/dashboard/reports/exams" },
        { label: "Fee Reports", href: "/dashboard/reports/fees" },
      ],
    },
    {
      title: "Students",
      mvpRating: 1,
      links: [
        { label: "Add Student", href: "/dashboard/students/add" },
        { label: "View Students", href: "/dashboard/students" },
        { label: "Student Attendance", href: "/dashboard/students/attendance" },
        { label: "Student Marks", href: "/dashboard/students/marks" },
        {
          label: "Student Performance",
          href: "/dashboard/students/performance",
        },
        { label: "Student Profiles", href: "/dashboard/students/profiles" },
      ],
    },
    {
      title: "Teachers",
      mvpRating: 1,
      links: [
        { label: "Add Teacher", href: "/dashboard/teachers/add" },
        { label: "View Teachers", href: "/dashboard/teachers" },
        { label: "Teacher Attendance", href: "/dashboard/teachers/attendance" },
        {
          label: "Teacher Performance",
          href: "/dashboard/teachers/performance",
        },
        { label: "Teacher Profiles", href: "/dashboard/teachers/profiles" },
      ],
    },
    {
      title: "Classes & Exams",
      mvpRating: 1,
      links: [
        { label: "Add Class", href: "/dashboard/classes/add" },
        { label: "View classes", href: "/dashboard/classes" },
        { label: "Exams", href: "/dashboard/exams" },
        { label: "Exam Results", href: "/dashboard/exams/results" },
        { label: "Class Analytics", href: "/dashboard/classes/analytics" },
      ],
    },
    {
      title: "Fees & Payments",
      mvpRating: 3,
      links: [
        { label: "Fee Management", href: "/dashboard/fees" },
        { label: "Payments History", href: "/dashboard/fees/history" },
        { label: "Pending Payments", href: "/dashboard/fees/pending" },
        {
          label: "Scholarships & Discounts",
          href: "/dashboard/fees/scholarships",
        },
      ],
    },
    {
      title: "Library & Resources",
      mvpRating: 5,
      links: [
        { label: "Add Resource", href: "/dashboard/library/add" },
        { label: "View Resources", href: "/dashboard/library" },
        { label: "Resource Requests", href: "/dashboard/library/requests" },
      ],
    },
    {
      title: "System Settings",
      mvpRating: 1,
      links: [
        { label: "My Profile", href: "/dashboard/profile" },
        { label: "User Management", href: "/dashboard/system/users" },
        { label: "Roles & Permissions", href: "/dashboard/system/roles" },
        { label: "Notifications", href: "/dashboard/system/notifications" },
        { label: "Settings", href: "/dashboard/system/settings" },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-gray-50 shadow-md p-6 flex flex-col">
      <Link href={"/dashboard"}>
        <h2 className="text-xl font-bold text-emerald-700 text-center">
          Dashboard Home
        </h2>
      </Link>
      <hr className="bg-emerald-400 h-[3px] m-3" />
      <div className="overflow-scroll max-h-screen">
        {categories
          .filter((category) => category.mvpRating <= 1)
          .map((category, idx) => (
            <div key={idx} className="mb-4">
              <h3 className="text-emerald-600 font-semibold text-sm px-2 py-1">
                {category.title}
              </h3>
              <nav className="flex flex-col space-y-1 px-2">
                {category.links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-gray-700 hover:text-emerald-700 hover:underline transition-colors duration-200 px-2 py-1 rounded"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
      </div>
    </aside>
  );
};

export default SideBar;
