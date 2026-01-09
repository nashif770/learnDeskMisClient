"use client";
import React from "react";
import { 
  CreditCardIcon, 
  CheckBadgeIcon, 
  ClockIcon, 
  ReceiptPercentIcon,
  ShieldCheckIcon,
  ArrowDownTrayIcon,
  PrinterIcon
} from "@heroicons/react/24/outline";

const Billing = () => {
  const subscription = {
    planName: "LearnDesk Standard Plan",
    price: 2500,
    billingCycle: "Monthly",
    currency: "BDT",
    status: "Active",
    nextBillingDate: "Feb 15, 2026",
    subscribedOn: "Jan 15, 2026",
  };

  const breakdown = [
    { label: "Platform Access Fee", amount: 1500 },
    { label: "Student Management", amount: 500 },
    { label: "Analytics Suite", amount: 300 },
    { label: "System Maintenance", amount: 200 },
  ];

  const total = breakdown.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 text-slate-900 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* TOP NAVIGATION / HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-slate-300 pb-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
              Subscription & Billing
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Overview of your institutional license and financial records.
            </p>
          </div>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-lg border border-slate-300 font-bold text-sm text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
          >
            <PrinterIcon className="w-5 h-5" />
            Print Statement
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: PLAN DETAILS */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* CURRENT PLAN CARD */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <ShieldCheckIcon className="w-6 h-6 text-indigo-600 stroke-[2]" />
                  <h2 className="font-bold text-slate-800">Current License</h2>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-bold uppercase tracking-wider border border-emerald-200">
                  {subscription.status}
                </span>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <DetailItem label="Current Plan" value={subscription.planName} />
                <DetailItem label="Billing Frequency" value={subscription.billingCycle} />
                <DetailItem label="Subscription Date" value={subscription.subscribedOn} />
                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                  <p className="text-xs font-bold text-indigo-600 uppercase mb-1">Next Payment Date</p>
                  <p className="text-xl font-bold text-indigo-900">{subscription.nextBillingDate}</p>
                </div>
              </div>
            </div>

            {/* FEATURES INCLUDED */}
            <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <CheckBadgeIcon className="w-6 h-6 text-indigo-400" />
                <h3 className="text-lg font-bold">Plan Inclusions</h3>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FeatureItem text="Unlimited Database Entry" />
                <FeatureItem text="Full Financial Reporting" />
                <FeatureItem text="Priority Tech Support" />
                <FeatureItem text="SMS/Email Gateway" />
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN: COST BREAKDOWN */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-6 sticky top-8">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                <ReceiptPercentIcon className="w-6 h-6 text-indigo-600" />
                <h3 className="font-bold text-slate-800">Monthly Breakdown</h3>
              </div>

              <div className="space-y-4">
                {breakdown.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">{item.label}</span>
                    <span className="text-slate-900 font-bold">{item.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total Due</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-slate-900 tracking-tight">
                    {total.toLocaleString()}
                  </span>
                  <span className="text-sm font-bold text-indigo-600">{subscription.currency}</span>
                </div>
              </div>

              <button className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 mt-4">
                <CreditCardIcon className="w-5 h-5" />
                Update Payment Method
              </button>
              
              <div className="flex items-center justify-center gap-2 pt-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Secure Bank Connection Active</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

/* ---------- REUSABLE REFINED COMPONENTS ---------- */

const DetailItem = ({ label, value }) => (
  <div className="space-y-1">
    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
    <p className="text-xl font-bold text-slate-800">{value}</p>
  </div>
);

const FeatureItem = ({ text }) => (
  <li className="flex items-center gap-3">
    <div className="w-5 h-5 rounded-md bg-indigo-500/20 flex flex-shrink-0 items-center justify-center">
      <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <span className="text-slate-300 font-medium">{text}</span>
  </li>
);

export default Billing;