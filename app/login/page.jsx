"use client";
import React, { useState } from "react";
import GoogleAuth from "./logComponent/GoogleAuth";
import PhoneAuth from "./logComponent/PhoneAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase_init";

const Login = () => {
  const [userInfo, setUserInfo] = useState(null);

  const handleSignOut = () =>{
    signOut(auth).then(()=>{
      setUserInfo(null)
      console.log("signed Out")
    }).catch(error=>{console.log(error)})
  }
  return (
    <div  
      className="min-h-screen flex flex-col items-center justify-center 
      bg-gradient-to-b from-emerald-50 via-white to-amber-50 
      px-4 sm:px-6 lg:px-8 space-y-6"
    >
      {/* Show logged-in user's name */}
      {userInfo && (
        <div>
          <img src={userInfo.photoURL} alt="" className="rounded-full m-auto" />
          <p className="text-green-700 font-medium">
            Logged in as: {userInfo.displayName || userInfo.email || "Unknown User"}
          </p>
        </div>
      )}
      {userInfo ? (
        <div>
          <button
            onClick={handleSignOut}
            className="my-3 flex items-center justify-center gap-3 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition w-[300px]"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-center">
          <PhoneAuth />
          <GoogleAuth getUserInfo={setUserInfo} />
        </div>
      )}
    </div>
  );
};

export default Login;
