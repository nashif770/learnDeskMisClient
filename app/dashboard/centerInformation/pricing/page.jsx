"use client";
import React from "react";
import theme from "@/theme"; // Adjust path as needed
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
    <div 
      className="min-h-screen py-10 px-6 font-sans"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header - Professional & Centered */}
        <div className="text-center space-y-2">
          <h1 
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
            style={{ color: theme.colors.textMain }}
          >
            Plans <span style={{ color: theme.colors.primary }}>&</span> Licensing
          </h1>
          <p className="font-medium text-base" style={{ color: theme.colors.textMuted }}>
            Transparent pricing designed for educational growth.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-6 md:p-8 flex flex-col transition-all border ${
                plan.highlight
                  ? "lg:col-span-7 shadow-md ring-1 ring-emerald-50"
                  : "lg:col-span-5 shadow-sm"
              }`}
              style={{ 
                backgroundColor: theme.colors.surface,
                borderColor: plan.highlight ? theme.colors.primary : theme.colors.border 
              }}
            >
              {plan.highlight && (
                <div 
                  className="absolute -top-3 right-6 text-white px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-sm"
                  style={{ backgroundColor: theme.colors.primary }}
                >
                  <SparklesIcon className="w-3 h-3 text-emerald-100" />
                  Recommended
                </div>
              )}

              {/* Header Info */}
              <div className="mb-6">
                <h2 
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: plan.highlight ? theme.colors.primary : theme.colors.textDisabled }}
                >
                  {plan.name}
                </h2>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold tracking-tight" style={{ color: theme.colors.textMain }}>
                    {plan.price}
                  </span>
                  <span className="text-base font-bold" style={{ color: theme.colors.textMuted }}>
                    {plan.currency}
                  </span>
                </div>
                <p 
                    className="text-[11px] font-bold uppercase tracking-wider"
                    style={{ color: theme.colors.textDisabled }}
                >
                    {plan.period}
                </p>
                <p className="mt-3 text-sm font-medium" style={{ color: theme.colors.textMuted }}>
                  {plan.subtitle}
                </p>
              </div>

              <div className="h-px w-full mb-6" style={{ backgroundColor: theme.colors.divider }}></div>

              {/* Features List */}
              <div className="flex-grow space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest" style={{ color: theme.colors.textDisabled }}>
                  Plan Capabilities
                </h4>
                <ul className={`grid ${plan.highlight ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"} gap-x-6 gap-y-3`}>
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircleIcon className="w-5 h-5 flex-shrink-0" style={{ color: theme.colors.primary }} />
                      <span className="text-sm font-semibold leading-tight" style={{ color: theme.colors.textMain }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, i) => (
                    <li key={i} className="flex items-start gap-2.5 opacity-40">
                      <XCircleIcon className="w-5 h-5 flex-shrink-0" style={{ color: theme.colors.textDisabled }} />
                      <span className="text-sm font-semibold line-through leading-tight" style={{ color: theme.colors.textMuted }}>
                        {limitation}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                className="mt-8 w-full py-3.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-white hover:opacity-90 shadow-sm"
                style={{ 
                    backgroundColor: plan.highlight ? theme.colors.primary : theme.colors.accentDeep 
                }}
              >
                {plan.name === "Free Entry" ? "Start Now" : "Unlock License"}
                <RocketLaunchIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Support Section - Simplified */}
        <div 
            className="rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 border shadow-sm"
            style={{ backgroundColor: theme.colors.accentDeep, borderColor: theme.colors.border + '22' }}
        >
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="p-2.5 rounded-lg hidden md:block" style={{ backgroundColor: '#1e293b' }}>
              <ShieldCheckIcon className="w-6 h-6" style={{ color: theme.colors.primary }} />
            </div>
            <div>
              <p className="text-lg font-bold text-white leading-none">Custom Enterprise License</p>
              <p className="font-medium text-sm mt-1" style={{ color: theme.colors.textDisabled }}>
                Multi-campus support for large institutions.
              </p>
            </div>
          </div>
          <button 
            className="px-6 py-2.5 rounded-lg font-bold uppercase tracking-widest text-[11px] hover:opacity-90 transition-all"
            style={{ backgroundColor: theme.colors.surface, color: theme.colors.accentDeep }}
          >
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;