"use client";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase_init";
import SignUpForm from "../logComponent/signUpForm";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 via-gray-50 to-emerald-50 px-4">
      <div className=" grid grid-col-1 items-center max-w-md w-full bg-gray-50 shadow-md rounded-xl p-10 sm:p-12 my-3">
        <h2 className="text-4xl sm:text-3xl font-bold text-emerald-700 text-center mb-8">
          Create Account
        </h2>
        {error && (
          <p className="text-red-600 text-center text-base mb-4">{error}</p>
        )}
        <SignUpForm></SignUpForm>
        <p className="text-center text-gray-500 font-bold my-4 text-lg">OR</p>
        {/* Google Signup */}
        <GoogleAuth />
        <p className="mt-6 text-center text-gray-700 text-base">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-emerald-600 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
