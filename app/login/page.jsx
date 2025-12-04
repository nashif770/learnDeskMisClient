"use client";
import React, { useEffect } from "react";
import GoogleAuth from "./logComponent/GoogleAuth";
import EmailAuth from "./logComponent/emailAuth";
import Link from "next/link";
import { useUser } from "@/userContext";
import { useRouter } from "next/navigation";

const Login = () => {
  const { user } = useUser();
  const router = useRouter();

  // Redirect to profile if user exists
  useEffect(() => {
    if (user) {
      router.push("/dashboard/profile");
    }
  }, [user, router]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center 
        bg-gradient-to-b from-emerald-100 to-emerald-100 px-2"
    >
      {!user && (
        <div className="flex flex-col items-center space-y-4">
          <EmailAuth />
          <Link href="./login/signUp" className="text-lg text-gray-700">
            Don't have an account?{" "}
            <span className="underline font-bold text-emerald-600">
              Register
            </span>
          </Link>
          <p className="text-lg font-bold text-gray-500">OR</p>
          <GoogleAuth />
        </div>
      )}
    </div>
  );
};

export default Login;
