"use client";
import React from "react";
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  RocketLaunchIcon,
  SparklesIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/solid";

const Pricing = () => {
  const plans = [
    {
      name: "Free Entry",
      price: "0",
      currency: "BDT",
      period: "Forever",
      subtitle: "For small pilots & testing",
      highlight: false,
      features: ["1 Center Only", "Up to 50 Students", "Attendance Tracking", "Notice Board", "Community Support"],
      limitations: ["No Finance Module", "No Priority Support"],
    },
    {
      name: "Standard License",
      price: "2,500",
      currency: "BDT",
      period: "per month",
      subtitle: "Full institutional management",
      highlight: true,
      features: ["Unlimited Students", "Multiple Centers Access", "Full Admission System", "Accounts & Finance", "HR & Payroll Engine", "Advanced Analytics", "Priority 24/7 Support"],
      limitations: [],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6 text-slate-900 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header - Professional & Centered */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Plans & Licensing
          </h1>
          <p className="text-slate-500 font-medium text-base">
            Transparent pricing designed for educational growth.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-xl p-6 md:p-8 flex flex-col transition-all bg-white border ${
                plan.highlight
                  ? "lg:col-span-7 border-indigo-500 shadow-md ring-1 ring-indigo-50"
                  : "lg:col-span-5 border-slate-200 text-slate-900 shadow-sm"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 right-6 bg-indigo-600 text-white px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                  <SparklesIcon className="w-3 h-3 text-indigo-200" />
                  Recommended
                </div>
              )}

              {/* Header Info */}
              <div className="mb-6">
                <h2 className={`text-xs font-bold uppercase tracking-widest mb-3 ${plan.highlight ? "text-indigo-600" : "text-slate-400"}`}>
                  {plan.name}
                </h2>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-bold text-slate-900 tracking-tight">{plan.price}</span>
                  <span className="text-base font-bold text-slate-500">{plan.currency}</span>
                </div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{plan.period}</p>
                <p className="mt-3 text-sm font-medium text-slate-600">
                  {plan.subtitle}
                </p>
              </div>

              <div className="h-px bg-slate-100 w-full mb-6"></div>

              {/* Features List - Using standard text size */}
              <div className="flex-grow space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Plan Capabilities
                </h4>
                <ul className={`grid ${plan.highlight ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"} gap-x-6 gap-y-3`}>
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircleIcon className={`w-5 h-5 flex-shrink-0 ${plan.highlight ? "text-indigo-600" : "text-emerald-500"}`} />
                      <span className="text-sm font-semibold text-slate-700 leading-tight">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, i) => (
                    <li key={i} className="flex items-start gap-2.5 opacity-40">
                      <XCircleIcon className="w-5 h-5 flex-shrink-0 text-slate-300" />
                      <span className="text-sm font-semibold text-slate-500 line-through leading-tight">{limitation}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button - Standard professional height */}
              <button
                className={`mt-8 w-full py-3.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
                  plan.highlight
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
                    : "bg-slate-800 text-white hover:bg-slate-900"
                }`}
              >
                {plan.name === "Free Entry" ? "Start Now" : "Unlock License"}
                <RocketLaunchIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Support Section - Simplified */}
        <div className="bg-slate-900 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-800 shadow-sm">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="bg-slate-800 p-2.5 rounded-lg hidden md:block">
              <ShieldCheckIcon className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white leading-none">Custom Enterprise License</p>
              <p className="text-slate-400 font-medium text-sm mt-1">Multi-campus support for large institutions.</p>
            </div>
          </div>
          <button className="px-6 py-2.5 bg-white text-slate-900 rounded-lg font-bold uppercase tracking-widest text-[11px] hover:bg-slate-100 transition-all">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;