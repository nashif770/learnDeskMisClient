"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "../Auth/userContext";
import GoogleAuth from "../Auth/GoogleAuth";
import LoginPage from "./components/LoginPage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SignUpForm from "./components/signUpForm";

const LoginAndRegister = () => {
  const { user } = useUser();
  const [mode, setMode] = useState("login"); // login or register
  const router = useRouter();

  // Redirect if user is logged in
  useEffect(() => {
    if (user) {
      router.push("/dashboard/profile");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-emerald-50 to-emerald-100 px-4">
      {/* Back Home */}
      <div className="absolute top-6 left-6">
        <Link href="/">
          <p className="font-bold text-xl text-emerald-800 hover:underline">
            ← Back Home
          </p>
        </Link>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        {/* Tabs */}
        <div className="flex w-full mb-6">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 text-center font-semibold rounded-l-xl transition
              ${
                mode === "login"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
          >
            Login
          </button>

          <button
            onClick={() => setMode("register")}
            className={`flex-1 py-2 text-center font-semibold rounded-r-xl transition
              ${
                mode === "register"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
          >
            Register
          </button>
        </div>

        {/* Google Auth */}
        <div className="flex flex-col items-center mb-4">
          <GoogleAuth />
          <p className="text-sm text-gray-500 mt-2">or continue with email</p>
        </div>

        {/* Forms */}
        <div className="mt-2">
          {mode === "login" ? <LoginPage /> : <SignUpForm />}
        </div>
      </div>
    </div>
  );
};

export default LoginAndRegister;
