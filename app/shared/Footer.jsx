import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full py-4 text-center text-gray-600 space-y-1">
      <div>&copy; {new Date().getFullYear()} Learn Desk Information Management System (MIS)</div>
      <div className="text-sm text-gray-500">
        Built by <Link href="#" className="hover:text-emerald-600 font-medium">Ahmed Nashif</Link>
      </div>
    </footer>
  );
};

export default Footer;
