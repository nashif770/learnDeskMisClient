"use client";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase_init";
import GoogleAuth from "../logComponent/GoogleAuth";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
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

      console.log("User created:", userCredential.user);

      alert("Signup successful!");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-200 via-pink-100 to-pink-200 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-purple-900 text-center mb-6">
          Create Account
        </h2>

        {error && (
          <p className="text-red-600 text-center text-sm mb-3">{error}</p>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-purple-700">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="mt-1 w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-purple-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              className="mt-1 w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-purple-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-purple-700">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPass}
              required
              onChange={(e) => setConfirmPass(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-2xl font-bold text-red-400 m-auto">OR</p>
        <p className="mt-6 text-center text-sm text-purple-700">
          Already have an account? <GoogleAuth/>
          <a
            href="/login"
            className="text-pink-600 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
