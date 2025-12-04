'use client';
import React, { useState } from 'react';

const PhoneAuth = ({ onLoginSuccess }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);

  // Placeholder handlers (replace with Firebase logic later)
  const sendOtp = (e) => {
    e.preventDefault();
    setVerificationSent(true);
    alert('OTP sent! (UI only)');
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    alert('OTP verified! (UI only)');
    if (onLoginSuccess) onLoginSuccess(); // optional callback after login
  };

  return (
    <div className="max-w-md w-full bg-white shadow-md rounded-xl p-8">
      <h2 className="text-3xl font-bold text-emerald-900 text-center mb-6">Phone Login</h2>

      {!verificationSent ? (
        <form onSubmit={sendOtp} className="space-y-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-emerald-700">
              Phone Number
            </label>
            <div className="mt-1 flex rounded-lg overflow-hidden border border-emerald-300 focus-within:ring-emerald-500 focus-within:border-emerald-500">
              <span className="px-3 py-2 bg-emerald-100 text-emerald-700 font-medium select-none">
                +88
              </span>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                required
                className="w-full px-4 py-2 focus:outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow hover:bg-emerald-700 transition"
          >
            Send OTP
          </button>
        </form>
      ) : (
        <form onSubmit={verifyOtp} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-emerald-700">
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-emerald-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow hover:bg-emerald-700 transition"
          >
            Verify OTP
          </button>
        </form>
      )}
    </div>
  );
};

export default PhoneAuth;
