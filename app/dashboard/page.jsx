"use client";
import React from "react";
import { useUser } from "../Auth/userContext";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { auth } from "@/firebase/firebase_init";
import { useRouter } from "next/navigation";
import {
  UserGroupIcon,
  AcademicCapIcon,
  ChartBarIcon,
  ArrowLeftOnRectangleIcon,
  HomeIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const DashboardPage = () => {
  const { user, setUser, setLoading } = useUser();
  const router = useRouter();

  const handleSignOut = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUser(null);
        router.push("/login");
      })
      .catch((error) => console.error("Logout error:", error))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* NAVBAR */}
      <nav className="sticky z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <ChartBarIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-slate-900">
              LearnDesk MIS
            </h1>
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden md:block text-right">
              <p className="text-xs text-slate-500">Logged in as</p>
              <p className="text-sm font-medium text-slate-800">
                {user?.displayName || "Administrator"}
              </p>
            </div>

            <div className="h-6 w-px bg-slate-200 hidden md:block" />

            <Link href="/">
              <button className="p-2 rounded-lg text-slate-600 hover:bg-slate-100">
                <HomeIcon className="w-5 h-5" />
              </button>
            </Link>

            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-rose-600 border border-rose-200 hover:bg-rose-50 transition"
            >
              <ArrowLeftOnRectangleIcon className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* HEADER */}
        <header>
          <h2 className="text-3xl font-semibold text-slate-900">
            System Overview
          </h2>
          <p className="mt-2 text-base text-slate-600 max-w-2xl">
            Welcome back. Select a department below to manage institutional
            records, academic data, and system settings.
          </p>
        </header>

        {/* DASHBOARD GRID */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <NavCard
            title="Student Management"
            desc="Add, update, and manage student profiles and enrollment data."
            href="/dashboard/students"
            icon={<UserGroupIcon className="w-6 h-6" />}
          />
          <NavCard
            title="Attendance"
            desc="Track daily attendance and monitor participation trends."
            href="/dashboard/students/studentAttendance"
            icon={<ChartBarIcon className="w-6 h-6" />}
          />
          <NavCard
            title="Academic Performance"
            desc="Review results, grades, and performance indicators."
            href="/dashboard/students/studentPerformance"
            icon={<AcademicCapIcon className="w-6 h-6" />}
          />
          <NavCard
            title="Fees & Payments"
            desc="Manage fee structures, payments, and outstanding dues."
            href="/dashboard/fees"
            icon={<ChartBarIcon className="w-6 h-6" />}
          />
          <NavCard
            title="Users & Roles"
            desc="Control staff access, permissions, and user roles."
            href="/dashboard/adminSection/usersAndRoles"
            icon={<UserGroupIcon className="w-6 h-6" />}
          />
          <NavCard
            title="System Settings"
            desc="Configure system preferences and institutional parameters."
            href="/dashboard/adminSection"
            icon={<Cog6ToothIcon className="w-6 h-6" />}
          />
        </section>

        {/* SYSTEM STATUS */}
        <section className="bg-slate-900 rounded-2xl p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-emerald-400 mb-1">
              System Status
            </p>
            <h3 className="text-2xl font-semibold">
              All Modules Operational
            </h3>
          </div>

          <div className="flex gap-10">
            <div>
              <p className="text-xs text-slate-400">Last Update</p>
              <p className="text-base font-medium">January 2026</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Server Latency</p>
              <p className="text-base font-medium text-emerald-400">24 ms</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

/* ---------------- NAV CARD ---------------- */

const NavCard = ({ title, desc, href, icon }) => {
  return (
    <Link href={href} className="group">
      <div className="h-full rounded-xl border border-slate-200 bg-white p-6 transition hover:shadow-lg hover:border-emerald-500">
        <div className="flex items-center gap-4 mb-3">
          <div className="p-2 rounded-lg bg-slate-100 text-slate-700 group-hover:text-emerald-600">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-slate-900">
            {title}
          </h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          {desc}
        </p>
      </div>
    </Link>
  );
};

export default DashboardPage;
