"use client";
import React from "react";
import { useUser } from "../Auth/userContext";
import UserInfo from "./components/UserInfo";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import GoogleAuth from "../Auth/GoogleAuth";

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
      className="h-screen flex flex-col gap-3 items-center justify-center 
        bg-gradient-to-b from-emerald-100 to-emerald-100 p-10"
    >
      <UserInfo></UserInfo>
      <div className="flex flex-row justify-center items-center gap-10">
        <LoginPage></LoginPage>
      <p className="text-center my-3">OR</p>
        <SignUpPage></SignUpPage>
      </div>
      <hr className="my-3 border-2 w-1/3 border-emerald-500"></hr>
      <GoogleAuth></GoogleAuth>
    </div>
  );
};
export default loginAndRegister;
