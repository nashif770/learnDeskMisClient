"use client";
import React from "react";
import theme from "@/theme"; // Adjust path as needed
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
    <div 
      className="min-h-screen p-6 md:p-12 font-sans"
      style={{ backgroundColor: theme.colors.background, color: theme.colors.textMain }}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* TOP NAVIGATION / HEADER */}
        <div 
          className="flex flex-col md:flex-row justify-between items-end gap-4 border-b pb-6"
          style={{ borderColor: theme.colors.border }}
        >
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight" style={{ color: theme.colors.textMain }}>
              Subscription <span style={{ color: theme.colors.primary }}>&</span> Billing
            </h1>
            <p className="font-medium mt-1" style={{ color: theme.colors.textMuted }}>
              Overview of your institutional license and financial records.
            </p>
          </div>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border font-bold text-sm transition-all shadow-sm hover:opacity-80"
            style={{ 
              backgroundColor: theme.colors.surface, 
              borderColor: theme.colors.border,
              color: theme.colors.textMain 
            }}
          >
            <PrinterIcon className="w-5 h-5" />
            Print Statement
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: PLAN DETAILS */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* CURRENT PLAN CARD */}
            <div 
              className="rounded-2xl border shadow-sm overflow-hidden"
              style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
            >
              <div 
                className="px-8 py-6 border-b flex justify-between items-center"
                style={{ backgroundColor: theme.colors.background, borderColor: theme.colors.border }}
              >
                <div className="flex items-center gap-3">
                  <ShieldCheckIcon className="w-6 h-6 stroke-[2]" style={{ color: theme.colors.primary }} />
                  <h2 className="font-bold">Current License</h2>
                </div>
                <span 
                  className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border"
                  style={{ 
                    backgroundColor: theme.colors.primaryLight, 
                    color: theme.colors.primary,
                    borderColor: theme.colors.primary + '33' // Adding transparency to border
                  }}
                >
                  {subscription.status}
                </span>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <DetailItem label="Current Plan" value={subscription.planName} />
                <DetailItem label="Billing Frequency" value={subscription.billingCycle} />
                <DetailItem label="Subscription Date" value={subscription.subscribedOn} />
                <div 
                  className="p-4 rounded-xl border"
                  style={{ backgroundColor: theme.colors.primaryLight, borderColor: theme.colors.primary + '22' }}
                >
                  <p className="text-xs font-bold uppercase mb-1" style={{ color: theme.colors.primary }}>Next Payment Date</p>
                  <p className="text-xl font-bold" style={{ color: theme.colors.textMain }}>{subscription.nextBillingDate}</p>
                </div>
              </div>
            </div>

            {/* FEATURES INCLUDED */}
            <div 
              className="rounded-2xl p-8 shadow-lg text-white"
              style={{ backgroundColor: theme.colors.accentDeep }}
            >
              <div className="flex items-center gap-3 mb-6">
                <CheckBadgeIcon className="w-6 h-6" style={{ color: theme.colors.primary }} />
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
            <div 
              className="rounded-2xl border shadow-md p-6 space-y-6 sticky top-8"
              style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
            >
              <div className="flex items-center gap-2 border-b pb-4" style={{ borderColor: theme.colors.divider }}>
                <ReceiptPercentIcon className="w-6 h-6" style={{ color: theme.colors.primary }} />
                <h3 className="font-bold">Monthly Breakdown</h3>
              </div>

              <div className="space-y-4">
                {breakdown.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span style={{ color: theme.colors.textMuted }}>{item.label}</span>
                    <span className="font-bold" style={{ color: theme.colors.textMain }}>{item.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t" style={{ borderColor: theme.colors.border }}>
                <p className="text-xs font-bold uppercase mb-1" style={{ color: theme.colors.textDisabled }}>Total Due</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold tracking-tight">
                    {total.toLocaleString()}
                  </span>
                  <span className="text-sm font-bold" style={{ color: theme.colors.primary }}>{subscription.currency}</span>
                </div>
              </div>

              <button 
                className="w-full py-4 text-white rounded-xl font-bold text-sm transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 mt-4 hover:opacity-90"
                style={{ backgroundColor: theme.colors.primary }}
              >
                <CreditCardIcon className="w-5 h-5" />
                Update Payment Method
              </button>
              
              <div className="flex items-center justify-center gap-2 pt-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: theme.colors.primary }}></div>
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: theme.colors.textDisabled }}>
                  Secure Bank Connection Active
                </p>
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
    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.colors.textDisabled }}>{label}</p>
    <p className="text-xl font-bold" style={{ color: theme.colors.textMain }}>{value}</p>
  </div>
);

const FeatureItem = ({ text }) => (
  <li className="flex items-center gap-3">
    <div 
      className="w-5 h-5 rounded-md flex flex-shrink-0 items-center justify-center"
      style={{ backgroundColor: theme.colors.primary + '33' }}
    >
      <svg className="w-3.5 h-3.5" style={{ color: theme.colors.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <span className="font-medium text-slate-300">{text}</span>
  </li>
);

export default Billing;