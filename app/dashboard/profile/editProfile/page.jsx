"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@/app/Auth/userContext";
import { FaSave, FaArrowLeft, FaUserEdit } from "react-icons/fa";
import Link from "next/link";

const EditProfile = () => {
  const { user, updateUser } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    if (updateUser) {
      try {
        await updateUser({ displayName: name, email });
        setStatus({ type: "success", message: "✨ Profile updated successfully!" });
      } catch (error) {
        setStatus({ type: "error", message: "❌ Failed to update profile. Please try again." });
      } finally {
        setLoading(false);
      }
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        <p className="text-slate-500 font-medium">Fetching user credentials...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10">
      <div className="max-w-2xl mx-auto">
        
        {/* Navigation & Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link 
            href="/dashboard/profile" 
            className="group flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors font-bold text-sm"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Profile
          </Link>
          <div className="text-right">
             <h1 className="text-2xl font-black text-slate-900 tracking-tight">Edit Profile</h1>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Settings</p>
          </div>
        </div>

        {/* Edit Card */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-emerald-600 h-24 w-full relative">
            <div className="absolute -bottom-12 left-10">
                <div className="relative">
                  <img 
                    src={user.photoURL || "/default-avatar.png"} 
                    className="w-24 h-24 rounded-3xl border-4 border-white shadow-lg object-cover bg-white"
                    alt="Current Avatar"
                  />
                  <div className="absolute -right-2 -bottom-2 p-2 bg-white rounded-xl shadow-md text-emerald-600 text-xs">
                    <FaUserEdit />
                  </div>
                </div>
            </div>
          </div>

          <div className="p-10 pt-16">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                
                {/* Name Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                    Full Display Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    placeholder="e.g. John Doe"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-700 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 font-medium"
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    placeholder="johndoe@school.com"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-700 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 font-medium"
                    required
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex items-center justify-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-emerald-100 transition-all active:scale-[0.98] ${
                    loading ? "opacity-70 cursor-not-allowed" : "hover:bg-emerald-700 hover:-translate-y-0.5"
                  }`}
                >
                  <FaSave />
                  {loading ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>

            {/* Status Messages */}
            {status.message && (
              <div className={`mt-6 p-4 rounded-2xl text-sm font-bold text-center animate-in fade-in slide-in-from-top-2 ${
                status.type === "success" 
                ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                : "bg-rose-50 text-rose-700 border border-rose-100"
              }`}>
                {status.message}
              </div>
            )}
          </div>
        </div>
        
        {/* Security Note */}
        <p className="text-center mt-8 text-slate-400 text-xs font-medium px-10">
          Your email address is used for authentication. Changing it may require you to re-verify your identity on your next login.
        </p>
      </div>
    </div>
  );
};

export default EditProfile;