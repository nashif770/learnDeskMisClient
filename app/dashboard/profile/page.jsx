"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  FaSignOutAlt,
  FaEdit,
  FaEnvelope,
  FaIdBadge,
  FaUserTag,
  FaShieldAlt,
  FaCalendarCheck,
} from "react-icons/fa";
import { useUser } from "@/app/Auth/userContext";

const Profile = () => {
  const { user, loading } = useUser();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-bold text-slate-600 uppercase tracking-wider">Verifying Identity...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-base font-bold text-slate-600 uppercase tracking-wide">
            No active session found.
          </p>
          <button 
            className="mt-4 text-emerald-600 font-black underline decoration-2 underline-offset-4" 
            onClick={() => router.push("/login")}
          >
            Re-authenticate
          </button>
        </div>
      </div>
    );
  }

  const signout = () => {
    if (confirm("Confirm security sign-out?")) {
      alert("Session Terminated");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-[1100px] mx-auto">
        
        {/* READABLE HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-slate-200 pb-6 mb-8 gap-4">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="Profile"
                className="w-16 h-16 rounded-xl border-2 border-white shadow-md object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 leading-tight">
                {user.displayName || "Academic User"}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-emerald-100 text-emerald-700 text-[11px] px-2 py-0.5 rounded font-black uppercase tracking-wider">
                  {user.role || "Faculty Member"}
                </span>
                <span className="text-slate-400 text-sm font-medium">•</span>
                <span className="text-slate-500 text-sm font-bold">System Administrator</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/dashboard/profile/editProfile")}
              className="px-5 py-2.5 text-sm font-bold bg-white border-2 border-slate-200 rounded-lg shadow-sm hover:border-emerald-500 hover:text-emerald-600 transition-all flex items-center gap-2"
            >
              <FaEdit className="text-lg" /> Edit Profile
            </button>
            <button
              onClick={signout}
              className="px-5 py-2.5 text-sm font-bold bg-slate-900 text-white rounded-lg shadow-sm hover:bg-rose-600 transition-all active:scale-95 flex items-center gap-2"
            >
              <FaSignOutAlt className="text-lg" /> Sign Out
            </button>
          </div>
        </div>

        {/* HIGH CONTRAST DATA STRIP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StripItem label="User ID" value={user.uid} icon={<FaIdBadge />} />
          <StripItem label="Primary Email" value={user.email} icon={<FaEnvelope />} />
          <StripItem label="Account Status" value={user.status || "Active"} icon={<FaShieldAlt />} isStatus />
          <StripItem label="Last Login" value="11 Jan 2026, 04:47 PM" icon={<FaCalendarCheck />} />
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Form Area */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            <section className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.15em] mb-6 flex items-center gap-3">
                <div className="w-1.5 h-4 bg-emerald-500 rounded-full"></div>
                Primary Identity Records
              </h3>
              
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                <ReadableField label="Full Legal Name" value={user.displayName} />
                <ReadableField label="Contact Email" value={user.email} />
                <ReadableField label="Assigned Role" value={user.role} />
                <ReadableField label="Security Tier" value={user.emailVerified ? "Level 2 (Verified)" : "Level 1 (Basic)"} />
              </div>
            </section>

            <div className="p-5 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-100 flex items-start gap-4">
              <div className="bg-white/20 p-2 rounded-lg text-white">
                <FaShieldAlt className="text-xl" />
              </div>
              <div>
                <p className="text-sm font-black text-white uppercase tracking-widest mb-1">Security Protocol</p>
                <p className="text-sm text-emerald-50 leading-relaxed font-medium">
                  Your session is encrypted. For better accessibility, you can increase your system zoom to 110% without breaking the layout.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">
                Current Session Meta
              </h3>
              <div className="space-y-5">
                <MetaRow label="Platform" value="Chrome v120 (macOS)" />
                <MetaRow label="IP Node" value="103.145.74.22" />
                <MetaRow label="Region" value="Asia / Dhaka" />
                <MetaRow label="ISP" value="Educational Network" />
              </div>
              <button className="w-full mt-8 py-3 text-xs font-black uppercase tracking-widest text-emerald-400 border-2 border-emerald-400/30 rounded-xl hover:bg-emerald-400 hover:text-slate-900 transition-all">
                Access Security Logs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- ACCESSIBLE COMPONENTS --- */

const StripItem = ({ label, value, icon, isStatus }) => (
  <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-sm flex items-center gap-4">
    <div className="bg-slate-50 p-3 rounded-xl text-slate-400 text-xl">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
      <p className={`text-sm font-black truncate ${isStatus ? 'text-emerald-600' : 'text-slate-900'}`}>
        {value || "—"}
      </p>
    </div>
  </div>
);

const ReadableField = ({ label, value }) => (
  <div className="border-b-2 border-slate-50 pb-2">
    <p className="text-xs font-black text-slate-400 uppercase mb-1.5 tracking-wide">{label}</p>
    <p className="text-[15px] font-bold text-slate-800">{value || "Information not provided"}</p>
  </div>
);

const MetaRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-1">
    <span className="text-xs font-bold text-slate-500">{label}</span>
    <span className="text-xs font-black text-slate-200">{value}</span>
  </div>
);

export default Profile;