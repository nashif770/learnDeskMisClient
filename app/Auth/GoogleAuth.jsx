"use client";
import { auth } from "@/firebase/firebase_init";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import React from "react";
import { useUser } from "@/app/Auth/userContext";

const GoogleAuth = () => {
  const { setUser } = useUser();
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const userData = result?.user;
        if (userData) setUser(userData);
      })
      .catch((error) => console.log(error));
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="
        flex items-center justify-center gap-3 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition w-[300px] m-auto
      "
    >
      <FcGoogle size={22} />
      <span className="text-gray-700 font-semibold">Continue in Google</span>
    </button>
  );
};

export default GoogleAuth;
