"use client";
import React, { useState } from "react";
import GoogleAuth from "./logComponent/GoogleAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase_init";
import EmailAuth from "./logComponent/emailAuth";
import Link from "next/link";
import { useUser } from "@/userContext";

const Login = () => {
  // const [user, setuser] = useState(null)
  const {user, setUser} = useUser()

  
  console.log(" look at user ",user)
  
  const handleSignOut = () =>{
    setUser(null)
    signOut(auth).then(()=>{
      setUser(null)
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
      {user && (
        <div>
          <img src={user.photoURL} alt="" className="rounded-full m-auto" />
          <p className="text-green-700 font-medium">
            Logged in as: {user.displayName || user.email || "Unknown User"}
          </p>
          <p>{user.email}</p>
        </div>
      )}
      {user ? (
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
          <EmailAuth></EmailAuth>
          <Link href={"./login/signUp"} className="text-xl m-3"> Don't have an account? <span className=" underline font-bold text-green-500 ">Register</span></Link>
          <p className="text-2xl font-bold text-red-400 m-auto">OR</p>
          <GoogleAuth/>
        </div>
      )}
    </div>
  );
};

export default Login;
