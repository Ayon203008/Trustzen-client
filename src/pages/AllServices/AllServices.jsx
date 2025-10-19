import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router";
import {
  FiSearch,
  FiTag,
  FiDollarSign,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("default");

  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const navigate = useNavigate();

  // Fetch services
  useEffect(() => {
    fetch("http://localhost:3000/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setFilteredServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Apply filters
  useEffect(() => {
    let temp = [...services];

    if (search) {
      temp = temp.filter(
        (s) =>
          s.serviceTitle.toLowerCase().includes(search.toLowerCase()) ||
          s.description.toLowerCase().includes(search.toLowerCase()) ||
          s.companyName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") temp = temp.filter((s) => s.category === category);
    if (minPrice !== "") temp = temp.filter((s) => s.price >= parseFloat(minPrice));
    if (maxPrice !== "") temp = temp.filter((s) => s.price <= parseFloat(maxPrice));

    if (sort === "priceAsc") temp.sort((a, b) => a.price - b.price);
    else if (sort === "priceDesc") temp.sort((a, b) => b.price - a.price);
    else if (sort === "alphabetical") temp.sort((a, b) => a.serviceTitle.localeCompare(b.serviceTitle));

    setFilteredServices(temp);
  }, [search, category, minPrice, maxPrice, sort, services]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={60} color={"#2563eb"} loading={loading} />
      </div>
    );
  }

  const categories = ["All", ...new Set(services.map((s) => s.category))];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar container */}
      <div
        className="relative flex"
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
      >
        {/* Collapsed icons bar */}
        <div className="bg-white shadow-lg w-16 flex flex-col items-center py-6 space-y-6 z-50 cursor-pointer">
          <FiSearch size={24} className="text-gray-700" />
          <FiTag size={24} className="text-gray-700" />
          <FiDollarSign size={24} className="text-gray-700" />
          <FiArrowUp size={24} className="text-gray-700" />
          <FiArrowDown size={24} className="text-gray-700" />
        </div>

        {/* Expanded sidebar */}
        <div
          className={`fixed top-0 left-16 h-full bg-white shadow-lg w-64 p-6 flex flex-col gap-4 transform transition-transform duration-300 z-40 ${
            sidebarExpanded ? "translate-x-0" : "-translate-x-64"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">Filters</h2>

          {/* Search */}
          <div className="flex items-center gap-2 mb-2">
            <FiSearch size={20} />
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded-lg border w-full"
            />
          </div>

          {/* Category */}
          <div className="flex items-center gap-2 mb-2">
            <FiTag size={20} />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border w-full"
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price range */}
          <div className="flex items-center gap-2 mb-2">
            <FiDollarSign size={20} />
            <input
              type="number"
              placeholder="Min price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="px-4 py-2 rounded-lg border w-full"
            />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <FiDollarSign size={20} />
            <input
              type="number"
              placeholder="Max price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="px-4 py-2 rounded-lg border w-full"
            />
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-2 mb-2">
            <FiArrowUp size={20} />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 rounded-lg border w-full"
            >
              <option value="default">Sort By</option>
              <option value="priceAsc">Price: Low → High</option>
              <option value="priceDesc">Price: High → Low</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`flex-1 p-8 ml-16 transition-all duration-300`}>
        <h1 className="text-3xl font-bold text-center mb-8">Our Services</h1>

        {filteredServices.length === 0 ? (
          <p className="text-center text-gray-500">No services found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={service.serviceImage}
                  alt={service.serviceTitle}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col justify-between h-full">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{service.serviceTitle}</h2>
                    <p className="text-gray-500 mb-1">
                      <strong>Company:</strong> {service.companyName}
                    </p>
                    <p className="text-gray-500 mb-1">
                      <strong>Category:</strong> {service.category}
                    </p>
                    <p className="text-gray-500 mb-1">
                      <strong>Price:</strong> ${service.price}
                    </p>
                    <p className="text-gray-600 mt-2">{service.description}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/services/${service._id}`)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllServices;
