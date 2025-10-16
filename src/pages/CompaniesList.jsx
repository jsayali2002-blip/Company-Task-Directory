import React, { useState, useEffect } from "react";
import axios from "axios";
import AddCompany from "../component/AddCompany";
import CompanyFilter from "../Component/CompanyFilter";
import CompanyCard from "../Component/CompanyCard";

const CompaniesList = () => {
  const [companies, setCompanies] = useState([]);
  const [editingCompany, setEditingCompany] = useState(null);
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/companies");
      setCompanies(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch companies");
      setLoading(false);
    }
  };

  const handleAddCompany = (newCompany) => {
    setCompanies([...companies, newCompany]);
  };

  const handleUpdateCompany = (updatedCompany) => {
    setCompanies(
      companies.map((c) => (c.id === updatedCompany.id ? updatedCompany : c))
    );
    setEditingCompany(null);
  };

  const handleDeleteCompany = async (id) => {
    if (!window.confirm("Are you sure you want to delete this company?"))
      return;

    try {
      await axios.delete(`http://localhost:5000/companies/${id}`);
      setCompanies(companies.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (company) => setEditingCompany(company);
  const handleCancelEdit = () => setEditingCompany(null);

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(search.toLowerCase()) &&
      (industry ? company.industry === industry : true)
  );

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="flex flex-col md:flex-row w-full max-w-full gap-6 p-4">
      <div className="flex-1 flex flex-col">
        <AddCompany
          onAdd={handleAddCompany}
          editingCompany={editingCompany}
          onUpdate={handleUpdateCompany}
          onCancel={handleCancelEdit}
        />
      </div>

      <div className="w-full md:w-2/3">
        <CompanyFilter
          search={search}
          setSearch={setSearch}
          industry={industry}
          setIndustry={setIndustry}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                onEdit={handleEditClick}
                onDelete={handleDeleteCompany}
              />
            ))
          ) : (
            <p className="text-center w-full mt-10">No companies found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompaniesList;
