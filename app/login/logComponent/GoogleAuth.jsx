"use client";

import { useState } from "react";
import { auth } from "@/firebase/firebase_init";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import React from "react";

const GoogleAuth = ({ getUserInfo }) => {
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    console.log("Google sign in click");

    signInWithPopup(auth, provider)
      .then((result) => {
        const userData = result.user;

        console.log("Google User:", userData);
        // send data to parent (Login.jsx)
        if (getUserInfo) {
          getUserInfo(userData);
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
