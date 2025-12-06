"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/Auth/userContext"; // your global user context
import SideBar from "./component/SideBar";

export default function DashboardLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      // Redirect to login if no user is logged in
      router.push("/loginAndRegister");
    }
  }, [user, router]);

  // Optionally, show a loading state until user is checked
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="flex max-h-screen overflow-hidden">
      <SideBar />
      <main className="flex-1 text-black p-6 overflow-scroll">{children}</main>
    </div>
  );
}
