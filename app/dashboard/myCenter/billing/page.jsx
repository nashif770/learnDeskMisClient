"use client";
import React from "react";
import { 
  CreditCardIcon, 
  CheckBadgeIcon, 
  ClockIcon, 
  ReceiptPercentIcon,
  ShieldCheckIcon,
  ArrowDownTrayIcon
} from "@heroicons/react/24/outline";

const Billing = () => {
  const subscription = {
    planName: "LearnDesk Standard",
    price: 2500,
    billingCycle: "Monthly",
    currency: "BDT",
    status: "Active",
    nextBillingDate: "15 February 2026",
    subscribedOn: "15 January 2026",
  };

  const breakdown = [
    { label: "MIS Platform Access", amount: 1500 },
    { label: "Student Management System", amount: 500 },
    { label: "Reports & Analytics", amount: 300 },
    { label: "System Maintenance & Support", amount: 200 },
  ];

  const total = breakdown.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 md:p-12 text-slate-900">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-2 border-slate-100 pb-10">
          <div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900">
              Billing
            </h1>
            <p className="text-xl text-slate-500 font-semibold mt-2">
              Subscription details and financial history.
            </p>
          </div>
          <div className="bg-emerald-600 px-8 py-5 rounded-2xl shadow-xl shadow-emerald-100 text-white flex flex-col items-end">
            <p className="text-xs font-black uppercase tracking-widest opacity-80">Current Balance</p>
            <p className="text-3xl font-black tracking-tight mt-1">0.00 {subscription.currency}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Main Plan Card */}
            <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm p-8 md:p-12 relative overflow-hidden">
              <div className="flex items-center gap-3 text-emerald-600 mb-10">
                <ShieldCheckIcon className="w-7 h-7 stroke-[2.5]" />
                <h2 className="text-sm font-black uppercase tracking-[0.2em]">Active Institutional License</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16">
                <Info label="Subscription Plan" value={subscription.planName} />
                <div className="space-y-2">
                   <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Account Status</p>
                   <span className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-100 inline-block">
                    {subscription.status}
                  </span>
                </div>
                <Info label="Billing Frequency" value={subscription.billingCycle} icon={<ClockIcon className="w-5 h-5 text-slate-400 stroke-[2.5]" />} />
                <Info label="Next Renewal Date" value={subscription.nextBillingDate} />
                
                <div className="col-span-full bg-slate-50 p-8 rounded-3xl border-2 border-slate-100 flex justify-between items-center">
                   <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Total Monthly Liability</p>
                    <p className="text-4xl font-black text-slate-900 tracking-tight">
                      {subscription.currency} {subscription.price.toLocaleString()}
                    </p>
                   </div>
                   <button className="p-4 bg-white border-2 border-slate-200 rounded-2xl hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm">
                      <ArrowDownTrayIcon className="w-6 h-6 stroke-[2.5]" />
                   </button>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-12 text-white shadow-2xl shadow-slate-200">
              <h2 className="text-2xl font-black mb-10 flex items-center gap-4">
                <CheckBadgeIcon className="w-8 h-8 text-emerald-400 stroke-[2]" />
                License Inclusions
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FeatureItem text="Unlimited Student & Staff Records" />
                <FeatureItem text="Advanced Financial Reporting" />
                <FeatureItem text="Parent-Teacher Gateway Access" />
                <FeatureItem text="Automated SMS & Email Alerts" />
                <FeatureItem text="Role-Based Security Modules" />
                <FeatureItem text="Priority Technical Support" />
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-xl p-8 space-y-10 sticky top-10">
              <div className="flex items-center gap-3 text-blue-600">
                <ReceiptPercentIcon className="w-7 h-7 stroke-[2.5]" />
                <h2 className="text-sm font-black uppercase tracking-[0.2em]">Fee Breakdown</h2>
              </div>

              <div className="space-y-6">
                {breakdown.map((item, index) => (
                  <div key={index} className="flex justify-between items-start group">
                    <span className="text-base font-bold text-slate-600 leading-tight pr-4">{item.label}</span>
                    <span className="text-base font-black text-slate-900">{item.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="h-1 bg-slate-50 w-full"></div>

              <div className="pt-2">
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Grand Total</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-slate-900 tracking-tighter">{total.toLocaleString()}</span>
                  <span className="text-lg font-black text-blue-600 uppercase">{subscription.currency}</span>
                </div>
              </div>

              <button className="w-full py-6 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.15em] text-sm hover:bg-slate-900 transition-all shadow-xl shadow-blue-100 active:scale-95 flex items-center justify-center gap-3">
                <CreditCardIcon className="w-6 h-6 stroke-[2.5]" />
                Modify Payment
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

/* ---------- Reusable Sub-Components ---------- */

const Info = ({ label, value, icon }) => (
  <div className="space-y-1">
    <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-loose">
      {label}
    </p>
    <div className="flex items-center gap-3">
      {icon && icon}
      <p className="text-2xl font-black text-slate-900 tracking-tight">
        {value}
      </p>
    </div>
  </div>
);

const FeatureItem = ({ text }) => (
  <li className="flex items-start gap-4 group">
    <div className="mt-1 w-6 h-6 rounded-lg bg-emerald-500 flex flex-shrink-0 items-center justify-center shadow-lg shadow-emerald-500/20">
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <span className="text-lg font-bold text-slate-200 leading-tight group-hover:text-white transition-colors">
      {text}
    </span>
  </li>
);

export default Billing;