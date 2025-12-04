"use client";
import { auth } from "@/firebase/firebase_init";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import React, { useState } from "react";
import { useUser } from "@/userContext";

const GoogleAuth = () => {
  const { setUser } = useUser();
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const userData = result?.user;
        // send data to parent (Login.jsx)
        if (userData) {
          setUser(userData);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="
        my-3 flex items-center justify-center gap-3 py-3 bg-white border border-gray-300
        rounded-lg shadow-sm hover:bg-gray-50 transition w-full
      "
    >
      <FcGoogle size={24} />
      <span className="text-gray-700 font-medium">Continue with Google</span>
    </button>
  );
};

export default GoogleAuth;
