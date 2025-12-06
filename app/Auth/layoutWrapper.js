"use client";
import { usePathname } from "next/navigation";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith("/dashboard");
  const isLogin = pathname.startsWith("/loginAndRegister");

  const hideLayout = isDashboard || isLogin;

  return (
    <>
      {!hideLayout && <Navbar />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}
