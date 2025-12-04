import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full py-4 text-center text-gray-600 space-y-1 bg-white shadow-2xl shadow-black">
      <div>
        &copy; {new Date().getFullYear()} Learn Desk — Information Management
        System
      </div>

      <div className="text-sm text-gray-500">
        Developed by{" "}
        <Link href="#" className="font-medium hover:text-emerald-600">
          Ahmed Nashif
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
