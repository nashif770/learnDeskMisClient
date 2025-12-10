"use client";
import useStudents from "@/app/Hooks/useUserData";
import React from "react";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  const { students } = useStudents();

  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border p-2 rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default SearchBar;
