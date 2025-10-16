import React from "react";

const CompanyFilter = ({ search, setSearch, industry, setIndustry }) => {
  return (
    <div className="flex gap-4 mb-4">
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <select
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">All Industries</option>
        <option value="IT">IT</option>
        <option value="Finance">Finance</option>
        <option value="Healthcare">Healthcare</option>
        <option value="Education">Education</option>
      </select>
    </div>
  );
};

export default CompanyFilter;
