"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  FaUserCircle, 
  FaSignOutAlt, 
  FaEdit, 
  FaEnvelope, 
  FaPhone, 
  FaIdBadge, 
  FaSchool, 
  FaLayerGroup,
  FaShieldAlt
} from "react-icons/fa";

const Profile = () => {
  const router = useRouter();
  const [requestedRole, setRequestedRole] = useState("");
  const [requestStatus, setRequestStatus] = useState("");

  const user = {
    displayName: "John Doe",
    email: "johndoe@example.com",
    role: "Admin",
    uid: "123456",
    photoURL: "/default-avatar.png",
    center: "Sunrise High School",
    batch: "2025-2026",
    phone: "+1-555-1234",
  };

  const signout = () => {
    if(confirm("Are you sure you want to sign out?")) {
        alert("Signed out");
    }
  };

  const handleRoleRequest = (e) => {
    e.preventDefault();
    if (!requestedRole) {
      setRequestStatus("Please select a role to request.");
      return;
    }
    setRequestStatus(`✅ Your request for "${requestedRole.toUpperCase()}" role has been submitted for approval.`);
    setRequestedRole("");
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 md:p-12 space-y-12">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Top Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">Account Settings</h1>
            <p className="text-slate-500 font-medium mt-2 text-xl italic">Manage your personal information and security.</p>
          </div>
          <button
            onClick={() => router.push("profile/editProfile")}
            className="flex items-center gap-3 bg-white border border-slate-200 text-slate-700 px-6 py-3.5 rounded-2xl shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all font-black text-base uppercase tracking-wider"
          >
            <FaEdit className="text-blue-500 text-lg" /> Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Avatar & Quick Actions */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 flex flex-col items-center text-center transition-transform hover:scale-[1.01]">
              <div className="relative p-2 rounded-full bg-gradient-to-tr from-emerald-400 to-blue-500 shadow-2xl mb-8">
                <img
                  src={user.photoURL}
                  alt="avatar"
                  className="w-40 h-40 rounded-full object-cover border-4 border-white bg-white"
                />
              </div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">{user.displayName}</h2>
              <p className="text-emerald-600 font-black text-base tracking-[0.2em] uppercase mt-2 mb-8">{user.role}</p>
              
              <div className="w-full space-y-4">
                <div className="flex items-center justify-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <FaIdBadge className="text-slate-400 text-lg" />
                  <span className="text-sm font-mono font-bold text-slate-500 uppercase tracking-widest">ID: {user.uid}</span>
                </div>
                <button
                  onClick={signout}
                  className="w-full flex items-center justify-center gap-3 bg-rose-50 text-rose-600 px-6 py-4 rounded-2xl font-black text-base uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all duration-300 shadow-lg shadow-rose-100"
                >
                  <FaSignOutAlt className="text-lg" /> Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Info & Role Request */}
          <div className="lg:col-span-8 space-y-8">
            {/* Info Grid */}
            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
              <h3 className="text-2xl font-black text-slate-800 mb-10 flex items-center gap-4">
                <span className="w-2.5 h-8 bg-emerald-500 rounded-full"></span>
                Profile Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
                <InfoItem icon={<FaEnvelope />} label="Email Address" value={user.email} />
                <InfoItem icon={<FaPhone />} label="Phone Number" value={user.phone} />
                <InfoItem icon={<FaSchool />} label="Institution" value={user.center} />
                <InfoItem icon={<FaLayerGroup />} label="Current Batch" value={user.batch} />
              </div>
            </div>

            {/* Role Change Request Card */}
            <div className="bg-slate-900 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden text-white">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-xl border border-white/10">
                      <FaShieldAlt className="text-2xl text-emerald-400" />
                    </div>
                    <h3 className="text-3xl font-black tracking-tight">Permissions Upgrade</h3>
                  </div>
                  <p className="text-slate-400 text-lg font-medium max-w-md">Need higher access? Submit a request to the system administrators.</p>
                </div>

                <form onSubmit={handleRoleRequest} className="w-full md:w-auto flex flex-col gap-4">
                  <div className="relative">
                    <select
                      value={requestedRole}
                      onChange={(e) => setRequestedRole(e.target.value)}
                      className="w-full md:w-64 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold text-base focus:ring-4 focus:ring-emerald-500/20 outline-none backdrop-blur-xl appearance-none pr-12 cursor-pointer transition-all hover:bg-white/10"
                    >
                      <option value="" className="text-slate-900">Select Target Role</option>
                      <option value="student" className="text-slate-900">Student</option>
                      <option value="teacher" className="text-slate-900">Teacher</option>
                      <option value="HT" className="text-slate-900">Head Teacher</option>
                      <option value="admin" className="text-slate-900">Admin</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">▼</div>
                  </div>
                  <button
                    type="submit"
                    className="bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black text-base uppercase tracking-widest shadow-xl shadow-emerald-900/20 hover:bg-emerald-400 transition-all active:scale-95"
                  >
                    Submit Request
                  </button>
                </form>
              </div>
              
              {requestStatus && (
                <div className="mt-8 p-5 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-400 text-sm font-black uppercase tracking-widest text-center animate-pulse">
                  {requestStatus}
                </div>
              )}
              {/* Abstract decoration */}
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-6 p-6 rounded-[2rem] hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100">
    <div className="p-5 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
      <span className="text-xl">{icon}</span>
    </div>
    <div>
      <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">{label}</p>
      <p className="text-xl font-bold text-slate-700 tracking-tight">{value}</p>
    </div>
  </div>
);

export default Profile;