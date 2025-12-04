'use client';
import React, { useState } from 'react';
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import app from '../firebase'; // Your Firebase config file

const Signup = () => {
  // const auth = getAuth(app);

  const auth = "admin"

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);

  // Send OTP
  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      // Initialize Recaptcha
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: () => {
            console.log('Recaptcha verified');
          },
        },
        auth
      );

      const fullPhone = '+88' + phone; // Add Bangladesh prefix
      const confirmation = await signInWithPhoneNumber(auth, fullPhone, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      setVerificationSent(true);
      alert('OTP sent to ' + fullPhone);
    } catch (error) {
      console.error(error);
      alert('Failed to send OTP: ' + error.message);
    }
  };

  // Verify OTP
  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const result = await confirmationResult.confirm(otp);
      console.log('User signed in:', result.user);

      // Optional: Save user info in Firestore
      // await setDoc(doc(db, 'users', result.user.uid), { name, phone: '+88'+phone });

      alert('OTP verified! Signup complete.');
    } catch (error) {
      console.error(error);
      alert('Invalid OTP. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-200 via-pink-100 to-pink-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-purple-900 text-center mb-6">Sign Up</h2>

        {!verificationSent ? (
          <form onSubmit={sendOtp} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-purple-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                className="mt-1 block w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-purple-700">
                Phone Number
              </label>
              <div className="mt-1 flex rounded-lg overflow-hidden border border-purple-300 focus-within:ring-purple-500 focus-within:border-purple-500">
                <span className="px-3 py-2 bg-purple-100 text-purple-700 font-medium select-none">+88</span>
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

            <div id="recaptcha-container"></div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="space-y-6">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-purple-700">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition"
            >
              Verify OTP
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-purple-700">
          Already have an account?{' '}
          <a href="/login" className="text-pink-600 hover:underline font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
