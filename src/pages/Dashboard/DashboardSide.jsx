import React from "react";
import { Link, NavLink } from "react-router";
import { FaPlus, FaList, FaStar } from "react-icons/fa";

const DashboardSidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg ${
      isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-100"
    }`;

  return (
    <div className="w-64 bg-gray-100 min-h-screen p-5 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <nav className="flex flex-col gap-2">
        <NavLink to="/dashboard/add-service" className={linkClass}>
          <FaPlus /> Add Service
        </NavLink>
        <NavLink to="/dashboard/my-services" className={linkClass}>
          <FaList /> My Services
        </NavLink>
        <NavLink to="/dashboard/my-reviews" className={linkClass}>
          <FaStar /> My Reviews
        </NavLink>
        <NavLink to="/dashboard/book-mark" className={linkClass}>
          <FaStar />Book Mark
        </NavLink>
        <NavLink to="/" className={linkClass}>
          <FaStar /> Home
        </NavLink>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
