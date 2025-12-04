"use client";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase_init";

const EmailRegister = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPass) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      onRegister(userCredential.user); // Send newly registered user to parent
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Create an Account
      </h2>

      {error && (
        <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-emerald-200 outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-emerald-200 outline-none"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            required
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-emerald-200 outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default EmailRegister;
