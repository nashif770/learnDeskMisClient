"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@/app/Auth/userContext";
import { 
  FaSave, FaArrowLeft, FaCamera, FaCheckCircle, 
  FaExclamationCircle, FaUserShield, FaKey, 
  FaHistory, FaFingerprint, FaGlobe, FaFileUpload 
} from "react-icons/fa";
import Link from "next/link";

const EditProfile = () => {
  const { user, updateUser } = useUser();

  const [formData, setFormData] = useState({
    displayName: "", email: "", photoURL: "", phoneNumber: "",
    role: "", status: "", transactionId: "", paymentMethod: "",
    billingAddress: "", newsletter: true, notifications: true
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
        phoneNumber: user.phoneNumber || "",
        role: user.role || "student",
        status: user.status || "active",
        transactionId: user.lastTransactionId || "",
        paymentMethod: user.paymentMethod || "bKash",
        billingAddress: user.billingAddress || "",
        newsletter: user.preferences?.newsletter ?? true,
        notifications: user.preferences?.notifications ?? true
      });
    }
  }, [user]);

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUser(formData);
      setStatus({ type: "success", message: "Verification details queued." });
    } catch (error) {
      setStatus({ type: "error", message: "Transmission failed." });
    } finally { setLoading(false); }
  };

  if (!user) return <LoadingState />;

  return (
    <div className="min-h-screen bg-white p-2 md:p-6 font-sans text-slate-900 leading-tight">
      <div className="max-w-[1100px] mx-auto">
        
        {/* HEADER */}
        <div className="flex items-center justify-between border-b-2 border-slate-100 pb-2 mb-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/profile" className="p-1.5 hover:bg-slate-100 rounded-md transition-colors">
              <FaArrowLeft className="text-slate-400 text-sm" />
            </Link>
            <h1 className="text-sm font-black uppercase tracking-tighter">System Configuration</h1>
          </div>
          <div className="flex items-center gap-2 px-2 py-0.5 bg-slate-100 rounded border border-slate-200">
            <FaFingerprint className="text-slate-400 text-[10px]" />
            <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest leading-none">{user.uid}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-2">
          
          {/* LEFT COLUMN: IDENTITY & VERIFICATION */}
          <div className="col-span-12 lg:col-span-7 space-y-2">
            
            {/* 1. IDENTITY BLOCK */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <SectionTitle icon={<FaCheckCircle />} title="Primary Identity" />
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200/60">
                <div className="relative group cursor-pointer h-12 w-12 shrink-0">
                  <img src={formData.photoURL || "/default-avatar.png"} className="h-full w-full rounded border border-slate-300 shadow-sm object-cover bg-white" alt="Avatar" />
                  <div className="absolute inset-0 bg-emerald-600/90 rounded opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity text-xs"><FaCamera /></div>
                </div>
                <div className="grow">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Asset Link (PhotoURL)</p>
                  <input value={formData.photoURL} onChange={(e) => handleChange('photoURL', e.target.value)} className="text-[11px] font-bold text-emerald-600 bg-transparent outline-none w-full border-b border-transparent focus:border-emerald-500 pb-0.5" placeholder="https://..." />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                <DenseInput label="Full Name" value={formData.displayName} onChange={(v) => handleChange('displayName', v)} />
                <DenseInput label="Access Email" value={formData.email} onChange={(v) => handleChange('email', v)} type="email" />
                <DenseInput label="Contact Node" value={formData.phoneNumber} onChange={(v) => handleChange('phoneNumber', v)} />
                <DenseSelect label="Requested Role" value={formData.role} onChange={(v) => handleChange('role', v)} options={[{v:'student', l:'Basic User'}, {v:'teacher', l:'Instructor'}, {v:'admin', l:'Admin Clearance'}]} />
              </div>
            </div>

            {/* 2. ELEVATION REQUEST (The Verification Portal) */}
            <div className="bg-slate-900 rounded-lg p-3 text-white">
              <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <FaKey className="text-emerald-400 text-[10px]" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Admin Elevation Portal</span>
                </div>
                <span className="text-[8px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">Awaiting SuperAdmin</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-full">
                   <p className="text-[9px] text-slate-400 italic leading-tight mb-2 uppercase font-bold tracking-tighter">Enter Transaction ID below. This will be verified by a Super Admin to grant Admin permissions.</p>
                </div>
                <DenseInput label="Transaction ID (Proof)" value={formData.transactionId} onChange={(v) => handleChange('transactionId', v)} dark placeholder="TRX-XXXX-XXXX" />
                <DenseSelect label="Payment Gateway" value={formData.paymentMethod} onChange={(v) => handleChange('paymentMethod', v)} dark options={[{v:'bKash', l:'bKash (Personal)'}, {v:'Nagad', l:'Nagad (Personal)'}, {v:'Bank', l:'Direct Bank Deposit'}]} />
                <div className="col-span-full">
                  <DenseInput label="Verification Note / Address" value={formData.billingAddress} onChange={(v) => handleChange('billingAddress', v)} dark placeholder="e.g. Sent from 017xxxxxxxx" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: PREFS & ACTION */}
          <div className="col-span-12 lg:col-span-5 space-y-2">
            <div className="border border-slate-200 rounded-lg p-3 bg-white">
              <SectionTitle icon={<FaUserShield />} title="Security Status" />
              <p className="text-[10px] font-bold text-slate-700 mb-2">Account current status: <span className="text-emerald-600 underline uppercase">{formData.status}</span></p>
              <DenseSelect label="Current Access Level" value={formData.status} onChange={(v) => handleChange('status', v)} options={[{v:'active', l:'Verified / Normal'}, {v:'pending', l:'Pending Elevation'}, {v:'suspended', l:'Restricted'}]} />
            </div>

            <div className="border border-slate-200 rounded-lg p-3 space-y-1.5 bg-white">
              <SectionTitle icon={<FaGlobe />} title="Preferences" />
              <DenseToggle label="Academic Newsletter" checked={formData.newsletter} onChange={(v) => handleChange('newsletter', v)} />
              <DenseToggle label="System Alerts" checked={formData.notifications} onChange={(v) => handleChange('notifications', v)} />
            </div>

            {/* ACTION BLOCK */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-emerald-600 text-white py-3 rounded-lg font-black text-xs uppercase tracking-[0.2em] shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 border border-slate-700 hover:border-emerald-500"
              >
                {loading ? <div className="h-3 w-3 border-2 border-white/30 border-t-white animate-spin rounded-full" /> : <FaFileUpload className="text-emerald-400" />}
                Submit for Verification
              </button>
              
              {status.message && (
                <div className={`mt-2 flex items-center justify-center gap-2 p-2 rounded border ${status.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'}`}>
                   {status.type === 'success' ? <FaCheckCircle className="text-[10px]" /> : <FaExclamationCircle className="text-[10px]" />}
                   <span className="text-[9px] font-black uppercase tracking-widest leading-none">{status.message}</span>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

/* --- DENSE COMPONENTS --- */

const SectionTitle = ({ icon, title }) => (
  <div className="flex items-center gap-2 mb-3 border-b border-slate-100 pb-1.5">
    <span className="text-emerald-500 text-[10px]">{icon}</span>
    <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{title}</h3>
  </div>
);

const DenseInput = ({ label, value, onChange, type = "text", dark, placeholder }) => (
  <div className="space-y-0.5">
    <label className={`text-[8px] font-black uppercase tracking-tighter ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-2.5 py-1.5 text-[11px] font-bold rounded border outline-none transition-all placeholder:text-slate-600/50 ${
        dark ? 'bg-slate-800 border-slate-700 text-white focus:border-emerald-500' : 'bg-white border-slate-200 text-slate-900 focus:border-emerald-500 shadow-sm'
      }`}
    />
  </div>
);

const DenseSelect = ({ label, value, onChange, options, dark }) => (
  <div className="space-y-0.5">
    <label className={`text-[8px] font-black uppercase tracking-tighter ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-2 py-1.5 text-[11px] font-bold rounded border outline-none appearance-none cursor-pointer ${
        dark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}
    >
      {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  </div>
);

const DenseToggle = ({ label, checked, onChange }) => (
  <label className="flex items-center justify-between p-1.5 hover:bg-slate-50 rounded border border-transparent hover:border-slate-100 cursor-pointer transition-colors">
    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">{label}</span>
    <div className={`w-7 h-3.5 rounded-full relative transition-colors ${checked ? 'bg-emerald-500' : 'bg-slate-300'}`}>
      <div className={`absolute top-0.5 w-2.5 h-2.5 bg-white rounded shadow-sm transition-transform ${checked ? 'left-[16px]' : 'left-[2px]'}`} />
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="hidden" />
    </div>
  </label>
);

const LoadingState = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

export default EditProfile;