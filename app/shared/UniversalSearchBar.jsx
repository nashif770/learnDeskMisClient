"use client";
import React, { useState, useEffect } from "react";

const UniversalSearchBar = ({
  data = [],
  filterKeys = [],
  sortKeys = [],
  onFilter,
}) => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // asc | desc

  const toFlatString = (obj) => JSON.stringify(obj).toLowerCase();

  useEffect(() => {
    let results = data.filter((item) =>
      toFlatString(item).includes(search.toLowerCase())
    );

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        results = results.filter(
          (item) =>
            String(item[key]).toLowerCase() === filters[key].toLowerCase()
        );
      }
    });

    // Sorting
    if (sortKey) {
      results = [...results].sort((a, b) => {
        let x = a[sortKey];
        let y = b[sortKey];

        // Convert to lowercase if string
        if (typeof x === "string") x = x.toLowerCase();
        if (typeof y === "string") y = y.toLowerCase();

        if (sortOrder === "asc") return x > y ? 1 : -1;
        return x < y ? 1 : -1;
      });
    }

    onFilter(results);
  }, [search, filters, sortKey, sortOrder]);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search anything..."
        className="border p-2 rounded w-full md:w-1/3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Dynamic Dropdown Filters */}
      {filterKeys.map((key, index) => (
        <select
          key={index}
          className="border p-2 rounded w-full md:w-1/4"
          value={filters[key] || ""}
          onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
        >
          <option value="">{`Filter by ${key}`}</option>

          {[...new Set(data.map((item) => item[key]))].map((val, index) => (
            <option key={index} value={val}>
              {val}
            </option>
          ))}
        </select>
      ))}

      {/* Sort Key Select */}
      <select
        className="border p-2 rounded w-full md:w-1/4"
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value)}
      >
        <option value="">Sort by</option>
        {sortKeys.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>

      {/* Sort Order */}
      <select
        className="border p-2 rounded w-full md:w-1/4"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      {/* Reset */}
      <button
        onClick={() => {
          setSearch("");
          setFilters({});
          setSortKey("");
          setSortOrder("asc");
        }}
        className="border px-3 py-2 rounded hover:bg-gray-100"
      >
        Reset
      </button>
    </div>
  );
};

export default UniversalSearchBar;
