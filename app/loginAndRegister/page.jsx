"use client";
import React from "react";
import { useUser } from "../Auth/userContext";
import UserInfo from "./components/UserInfo";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import GoogleAuth from "../Auth/GoogleAuth";
import Link from "next/link";

const loginAndRegister = () => {
  const { user } = useUser();
  // const user = "null";
  // const router = useRouter();

  // Redirect to profile if user exists
  // useEffect(() => {
  //   if (user) {
  //     router.push("/dashboard/profile");
  //   }
  // }, [user, router]);

  return (
    <div
      className="h-dvh flex flex-col gap-2 items-center justify-center 
        bg-gradient-to-b from-emerald-100 to-emerald-100 p-10 "
    >
      <Link href={"/"}>
        <p className="font-bold text-2xl text-black">Go Back Home</p>
      </Link>
      <div className="text-center items-center p-3">
        {user ? (
          <p className="text-black p-3">
            Welcome <span className="font-bold">{user.displayName}</span>
          </p>
        ) : (
          <p className="text-black">Log In Bellow</p>
        )}
      </div>
      <div className="flex flex-row justify-center items-center gap-3 bg-gray-400 p-2 rounded-2xl">
        <LoginPage></LoginPage>
        <SignUpPage></SignUpPage>
      </div>
      {/* <hr className="border-2 w-1/3 border-emerald-500"></hr> */}
      <GoogleAuth></GoogleAuth>
    </div>
  );
};
export default loginAndRegister;
