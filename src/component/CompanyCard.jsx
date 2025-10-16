import React from "react";
import { CiEdit } from "react-icons/ci";
import { AiFillDelete } from "react-icons/ai";

const CompanyCard = ({ company, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-1">
      <h3 className="text-lg font-bold text-indigo-700">{company.name}</h3>
      <p className="text-gray-600">{company.industry}</p>
      <p className="text-gray-500">{company.location}</p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onEdit(company)}
          className="flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold p-2 rounded-lg shadow-md transition transform hover:-translate-y-0.5"
        >
          <CiEdit size={20} />
        </button>

        <button
          onClick={() => onDelete(company.id)}
          className="flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold p-2 rounded-lg shadow-md transition transform hover:-translate-y-0.5"
        >
          <AiFillDelete size={20} />
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
