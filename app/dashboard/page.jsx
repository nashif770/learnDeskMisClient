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
  Cog6ToothIcon
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
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* HIGH-VISIBILITY NAVBAR */}
      <nav className="w-full bg-white border-b border-slate-100 px-8 py-6 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-emerald-600 p-2 rounded-xl">
            <ChartBarIcon className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">MIS Central</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right hidden md:block">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Logged in as</p>
            <p className="text-sm font-bold text-slate-700">{user?.displayName || "Administrator"}</p>
          </div>
          
          <div className="h-8 w-px bg-slate-100"></div>

          <Link href="/">
            <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all">
              <HomeIcon className="w-6 h-6" />
            </button>
          </Link>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-5 py-2.5 bg-rose-50 text-rose-600 rounded-2xl text-xs font-black uppercase tracking-widest border-2 border-rose-100 hover:bg-rose-600 hover:text-white transition-all active:scale-95"
          >
            <ArrowLeftOnRectangleIcon className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8 md:p-12 space-y-12">
        {/* WELCOME SECTION */}
        <header>
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter">
            System Overview
          </h2>
          <p className="text-xl text-slate-500 font-medium mt-4 italic">
            Welcome back. Select a department to manage your institution's data.
          </p>
        </header>

        {/* COMMAND GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NavCard 
            title="Student Directory" 
            desc="Manage profiles, records, and contact information." 
            href="/dashboard/students" 
            icon={<UserGroupIcon className="w-8 h-8" />}
            color="blue"
          />
          <NavCard 
            title="Attendance Hub" 
            desc="Monitor daily presence and analyze engagement." 
            href="/dashboard/attendance" 
            icon={<ChartBarIcon className="w-8 h-8" />}
            color="emerald"
          />
          <NavCard 
            title="Academic Performance" 
            desc="Track grades, benchmarks, and GPA trends." 
            href="/dashboard/performance" 
            icon={<AcademicCapIcon className="w-8 h-8" />}
            color="amber"
          />
          <NavCard 
            title="System Settings" 
            desc="Configure institution parameters and users." 
            href="/dashboard/settings" 
            icon={<Cog6ToothIcon className="w-8 h-8" />}
            color="slate"
          />
        </div>

        {/* SYSTEM STATUS FOOTER */}
        <div className="bg-slate-900 rounded-[3rem] p-10 text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl shadow-slate-200">
          <div className="space-y-2">
            <p className="text-emerald-400 text-xs font-black uppercase tracking-[0.3em]">System Health</p>
            <h3 className="text-3xl font-black">All Modules Operational</h3>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <p className="text-slate-500 text-[10px] font-black uppercase mb-1">Last Update</p>
              <p className="text-lg font-bold">Jan 2026</p>
            </div>
            <div className="text-center">
              <p className="text-slate-500 text-[10px] font-black uppercase mb-1">Server Latency</p>
              <p className="text-lg font-bold text-emerald-400">24ms</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal Navigation Component
const NavCard = ({ title, desc, href, icon, color }) => {
  const themes = {
    blue: "hover:border-blue-500 text-blue-600 bg-blue-50/30 shadow-blue-50",
    emerald: "hover:border-emerald-500 text-emerald-600 bg-emerald-50/30 shadow-emerald-50",
    amber: "hover:border-amber-500 text-amber-600 bg-amber-50/30 shadow-amber-50",
    slate: "hover:border-slate-900 text-slate-900 bg-slate-50/30 shadow-slate-50",
  };

  return (
    <Link href={href}>
      <div className={`p-10 rounded-[2.5rem] border-2 border-transparent bg-white shadow-xl transition-all hover:-translate-y-2 group cursor-pointer ${themes[color]}`}>
        <div className="mb-6 p-4 bg-white rounded-2xl w-fit shadow-sm group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-3 group-hover:text-inherit">
          {title}
        </h3>
        <p className="text-slate-500 font-medium leading-relaxed">
          {desc}
        </p>
      </div>
    </Link>
  );
};

export default DashboardPage;