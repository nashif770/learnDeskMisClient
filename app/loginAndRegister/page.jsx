'use client'
import React from "react";
import { useUser } from "../Auth/userContext";
import UserInfo from "./components/UserInfo";
import LoginPage from "./components/LoginPage";

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
      className="h-screen flex flex-col items-center justify-center 
        bg-gradient-to-b from-emerald-100 to-emerald-100 px-2"
    >
      <UserInfo></UserInfo>
      <LoginPage></LoginPage>

    </div>
  );
};
export default loginAndRegister;
