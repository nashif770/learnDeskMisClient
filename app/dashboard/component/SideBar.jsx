import React from "react";
import Link from "next/link";
import { useUser } from "@/app/Auth/userContext";

const SideBar = () => {
  const { user } = useUser();

  // Sidebar links categorized with active/inactive status
  const categories = [
    {
      title: "Admin Notifications",
      mvpRating: 2,
      active: false, // <-- new
      links: [
        { label: "User Requests", href: "/dashboard/requests" },
        { label: "System Alerts", href: "/dashboard/notifications" },
        { label: "Approval Requests", href: "/dashboard/approvals" },
      ],
    },
    {
      title: "Reports & Analytics",
      mvpRating: 3,
      active: false,
      links: [
        { label: "Reports", href: "/dashboard/reports" },
        { label: "Graphs & Charts", href: "/dashboard/reports/graphs" },
        { label: "Performance Analytics", href: "/dashboard/reports/performance" },
        { label: "Attendance Analytics", href: "/dashboard/reports/attendance" },
        { label: "Exam Analytics", href: "/dashboard/reports/exams" },
        { label: "Fee Reports", href: "/dashboard/reports/fees" },
      ],
    },
    {
      title: "Students",
      mvpRating: 1,
      active: true,
      links: [
        { label: "Add Student", href: "/dashboard/students/addStudents" },
        { label: "Manage Students", href: "/dashboard/students/manageStudents" },
        { label: "Student Attendance", href: "/dashboard/students/studentAttendance/" },
        { label: "Student Marks", href: "/dashboard/students/studentMarks" },
        { label: "Student Performance", href: "/dashboard/students/studentPerformance" },
        { label: "Student Profiles", href: "/dashboard/students/studentProfile" },
      ],
    },
    {
      title: "Teachers",
      mvpRating: 1,
      active: false,
      links: [
        { label: "Add Teacher", href: "/dashboard/teachers/add" },
        { label: "View Teachers", href: "/dashboard/teachers" },
        { label: "Teacher Attendance", href: "/dashboard/teachers/attendance" },
        { label: "Teacher Performance", href: "/dashboard/teachers/performance" },
        { label: "Teacher Profiles", href: "/dashboard/teachers/profiles" },
      ],
    },
    // Add the rest similarly...
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
          .filter((category) => category.active) // <-- only show active
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
