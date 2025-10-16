import React, { useState, useEffect } from "react";
import axios from "axios";

const AddCompany = ({ onAdd, editingCompany, onUpdate, onCancel }) => {
  const [name, setName] = useState(editingCompany?.name || "");
  const [industry, setIndustry] = useState(editingCompany?.industry || "");
  const [location, setLocation] = useState(editingCompany?.location || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(editingCompany?.name || "");
    setIndustry(editingCompany?.industry || "");
    setLocation(editingCompany?.location || "");
  }, [editingCompany]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !industry || !location) return alert("Please fill all fields!");

    const companyData = { name, industry, location };

    try {
      setLoading(true);
      if (editingCompany) {
        const res = await axios.put(
          `http://localhost:5000/companies/${editingCompany.id}`,
          companyData
        );
        onUpdate(res.data);
      } else {
        const res = await axios.post("http://localhost:5000/companies", companyData);
        onAdd(res.data);
      }
      setName("");
      setIndustry("");
      setLocation("");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-2xl rounded-xl p-6 sm:p-8 max-w-2xl mb-10 mx-auto mt-15 "
    >
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">
        {editingCompany ? "Edit Company" : "Add New Company"} 
      </h2>

      <input
        type="text"
        placeholder="Company Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="text"
        placeholder="Industry"
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-blue-500 hover:to-indigo-600 text-gray-50 font-semibold py-2 px-4 rounded w-full transition"
        >
          {loading ? "Saving..." : editingCompany ? "Update Company" : "Add Company"}
          
        </button>

        {editingCompany && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-blue-500 hover:to-indigo-600 text-gray-50 font-semibold py-2 px-2 rounded w-full transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default AddCompany;
