"use client";
import React from "react";
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  EnvelopeIcon, 
  RocketLaunchIcon,
  SparklesIcon
} from "@heroicons/react/24/solid";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "0",
      currency: "BDT",
      period: "Forever",
      subtitle: "For testing & small pilots",
      highlight: false,
      features: ["1 Center Only", "Up to 50 Students", "Attendance Tracking", "Notice Board", "Community Support"],
      limitations: ["No Finance Module", "No Priority Support"],
    },
    {
      name: "Standard",
      price: "2,500",
      currency: "BDT",
      period: "per month",
      subtitle: "Best for schools & training centers",
      highlight: true,
      features: ["Unlimited Students", "Multiple Centers Access", "Full Admission System", "Accounts & Finance", "HR & Payroll Engine", "Advanced Analytics", "Priority 24/7 Support"],
      limitations: [],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Compact Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
            Pricing Plans
          </h1>
          <p className="text-lg text-slate-500 font-bold italic">
            Institutional scale, simplified pricing.
          </p>
        </div>

        {/* Compact Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-[2.5rem] p-8 md:p-10 flex flex-col transition-all ${
                plan.highlight
                  ? "lg:col-span-7 bg-slate-900 text-white shadow-2xl"
                  : "lg:col-span-5 bg-white border-2 border-slate-100 text-slate-900"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-10 bg-emerald-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2">
                  <SparklesIcon className="w-3 h-3" />
                  Recommended
                </div>
              )}

              {/* Price & Name Row */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <h2 className={`text-xl font-black uppercase tracking-widest ${plan.highlight ? "text-emerald-400" : "text-slate-400"}`}>
                    {plan.name}
                  </h2>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-5xl font-black tracking-tighter italic">{plan.price}</span>
                    <span className="text-sm font-black uppercase tracking-tighter">{plan.currency}</span>
                  </div>
                  <p className="text-xs font-bold opacity-60 uppercase tracking-widest mt-1">{plan.period}</p>
                </div>
                <div className="md:text-right">
                   <p className={`text-sm font-bold ${plan.highlight ? "text-slate-400" : "text-slate-500"}`}>
                    {plan.subtitle}
                  </p>
                </div>
              </div>

              {/* Features - Compact Grid */}
              <div className="flex-grow">
                <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-50`}>
                  Key Capabilities
                </h4>
                <ul className={`grid ${plan.highlight ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"} gap-x-6 gap-y-3`}>
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircleIcon className={`w-5 h-5 flex-shrink-0 ${plan.highlight ? "text-emerald-400" : "text-emerald-500"}`} />
                      <span className="text-base font-bold tracking-tight leading-tight">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, i) => (
                    <li key={i} className="flex items-center gap-3 opacity-30">
                      <XCircleIcon className="w-5 h-5 flex-shrink-0" />
                      <span className="text-base font-bold tracking-tight line-through leading-tight">{limitation}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                className={`mt-10 w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-[0.98] flex items-center justify-center gap-3 ${
                  plan.highlight
                    ? "bg-emerald-500 text-white hover:bg-emerald-400"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {plan.name === "Free" ? "Deploy Now" : "Get Standard Access"}
                <RocketLaunchIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Slim Footer */}
        <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
          <p className="text-sm font-bold text-slate-500">
            Need an <span className="text-slate-900 font-black">Enterprise License</span> for 10,000+ students?
          </p>
          <button className="px-6 py-3 bg-blue-50 text-blue-600 rounded-xl font-black uppercase tracking-widest text-[10px] border-2 border-blue-100 hover:bg-blue-600 hover:text-white transition-all">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;