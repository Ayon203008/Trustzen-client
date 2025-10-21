import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// প্রয়োজনীয় সব আইকন এখানে ইম্পোর্ট করা হয়েছে, রেটিং আইকনগুলি সরানো হয়েছে:
import { 
    FiSearch, 
    FiTag, 
    FiDollarSign, 
    FiArrowUp, 
    FiFilter, 
    FiChevronDown, 
    FiInfo,
    FiList, // Category Title-এর জন্য
    FiZap // Sort By Title-এর জন্য
} from "react-icons/fi"; 
// ClipLoader এখানে আছে
import ClipLoader from "react-spinners/ClipLoader";

// ❌ RatingDisplay কম্পোনেন্টটি সম্পূর্ণভাবে মুছে ফেলা হয়েছে

const AllServices = () => {
  // services স্টেটে এখন rating রাখার প্রয়োজন নেই, কিন্তু ডেটা স্ট্রাকচার একই রাখা হলো
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

  // Fetch services (Mock rating অংশটি সরানো হয়েছে)
  useEffect(() => {
    fetch("http://localhost:3000/services")
      .then((res) => res.json())
      .then((data) => {
        // রেটিং যুক্ত করার কোড সরানো হলো। এখন ডেটা সরাসরি ব্যবহার করা হবে।
        setServices(data);
        setFilteredServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching services:", err);
        setLoading(false);
      });
  }, []);

  // Apply filters & sorting (ratingDesc সর্ট অপশন সরানো হয়েছে)
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
    
    // Price filtering
    const minP = parseFloat(minPrice);
    const maxP = parseFloat(maxPrice);
    if (!isNaN(minP)) temp = temp.filter((s) => s.price >= minP);
    if (!isNaN(maxP)) temp = temp.filter((s) => s.price <= maxP);

    // Sorting (ratingDesc সর্ট অপশন সরানো হলো)
    if (sort === "priceAsc") temp.sort((a, b) => a.price - b.price);
    else if (sort === "priceDesc") temp.sort((a, b) => b.price - a.price);
    else if (sort === "alphabetical") temp.sort((a, b) => a.serviceTitle.localeCompare(b.serviceTitle));
    
    setFilteredServices(temp);
    
    // dependency array থেকে 'rating' সরানো হয়েছে
  }, [search, category, minPrice, maxPrice, sort, services]);

  const categories = ["All", ...new Set(services.map((s) => s.category))];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <ClipLoader size={60} color="#3b82f6" loading={loading} />
      </div>
    );
  }

  return (
    // Main Container
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500 relative">
      
      {/* Sidebar Toggle Button (Mobile/Tablet) */}
      <button
        onClick={() => setSidebarExpanded(!sidebarExpanded)}
        className="lg:hidden fixed top-20 left-4 z-50 p-3 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 transition"
        aria-expanded={sidebarExpanded}
      >
        <FiFilter className="w-5 h-5"/>
      </button>

      {/* Sidebar (Filters) - Full Height & Sticky on Large Screens */}
      <aside 
        className={`fixed lg:sticky top-0 left-0 h-full lg:h-screen 
          bg-white dark:bg-gray-800 shadow-xl dark:shadow-2xl 
          p-6 pt-20 lg:pt-6 w-80 lg:w-72 flex flex-col gap-6 z-40 
          transform transition-transform duration-300 ease-in-out 
          ${sidebarExpanded ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          overflow-y-auto lg:overflow-y-visible`}
      >
        <div className="text-left">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-2">
            <FiFilter className="inline-block mr-2 text-blue-500"/>
            Advanced Filters
          </h2>
        </div>

        {/* Search */}
        <div className="relative">
          <label className="font-semibold text-gray-700 dark:text-gray-300 mb-1 block">Search Title/Company</label>
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 mt-3 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search title, company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition"
          />
        </div>

        {/* Category */}
        <div className="relative">
            <label className="font-semibold text-gray-700 dark:text-gray-300 mb-1 block flex items-center gap-1">
                <FiList className="w-4 h-4 text-purple-500"/> Category
            </label>
            <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-xl focus-within:border-blue-500 transition">
              <FiTag className="text-gray-400 dark:text-gray-500 ml-3" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full py-3 pl-4 pr-10 bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none rounded-xl appearance-none"
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat} className="dark:bg-gray-800">
                    {cat} ({services.filter(s => cat === "All" || s.category === cat).length})
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-3 pointer-events-none text-gray-400 dark:text-gray-500"/>
            </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="font-semibold text-gray-700 dark:text-gray-300 mb-1 block flex items-center gap-1">
            <FiDollarSign className="w-4 h-4 text-green-500"/> Price Range ($)
          </label>
          <div className="flex gap-3 mt-1">
            <div className="relative w-1/2">
                <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full pl-8 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition"
                />
            </div>
            <div className="relative w-1/2">
                <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full pl-8 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition"
                />
            </div>
          </div>
        </div>

        {/* Sorting */}
        <div className="relative">
            <label className="font-semibold text-gray-700 dark:text-gray-300 mb-1 block flex items-center gap-1">
                <FiZap className="w-4 h-4 text-red-500"/> Sort By
            </label>
            <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-xl focus-within:border-blue-500 transition">
              <FiArrowUp className="text-gray-400 dark:text-gray-500 ml-3" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full py-3 pl-4 pr-10 bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none rounded-xl appearance-none"
              >
                <option value="default" className="dark:bg-gray-800">Default (Newest)</option>
                <option value="priceAsc" className="dark:bg-gray-800">Price: Low → High</option>
                <option value="priceDesc" className="dark:bg-gray-800">Price: High → Low</option>
                <option value="alphabetical" className="dark:bg-gray-800">Alphabetical (A-Z)</option>
                {/* ❌ Rating অপশন সরানো হয়েছে */}
              </select>
              <FiChevronDown className="absolute right-3 pointer-events-none text-gray-400 dark:text-gray-500"/>
            </div>
        </div>
        
        {/* Reset Button */}
        <button
            onClick={() => {
                setSearch("");
                setCategory("All");
                setMinPrice("");
                setMaxPrice("");
                setSort("default");
            }}
            className="w-full py-3 mt-4 text-sm font-semibold rounded-xl bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition"
        >
            Reset Filters
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 lg:p-10">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white text-left mb-6">
          Explore {filteredServices.length} Services
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Browse verified services, apply filters, and find the perfect match.
        </p>

        {filteredServices.length === 0 ? (
          <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <FiSearch className="w-12 h-12 mx-auto mb-4 text-blue-500"/>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              No services found matching your criteria.
            </p>
            <button
                onClick={() => {
                    setSearch("");
                    setCategory("All");
                }}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition font-semibold"
            >
                Clear Search & Category
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service._id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition duration-500 group relative border border-gray-100 dark:border-gray-700 hover:shadow-blue-500/20 dark:hover:shadow-blue-500/10"
              >
                {/* Image with overlay and Price Badge */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.serviceImage}
                    alt={service.serviceTitle}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Price Badge */}
                  <div className="absolute top-3 right-3 bg-green-500 text-white text-lg font-bold px-4 py-1 rounded-lg shadow-md">
                    <FiDollarSign className="inline w-4 h-4 mr-1"/>{service.price}
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{service.serviceTitle}</h2>
                    
                    {/* Meta Info */}
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-2">
                        <FiTag className="text-purple-500 w-4 h-4"/> {service.category}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        By <span className="font-medium text-blue-600 dark:text-blue-400">{service.companyName}</span>
                    </p>
                    
                    {/* Description */}
                    <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                        {service.description}
                    </p>
                  </div>
                  
                  {/* View Details Button (কার্ডের একদম নিচে) */}
                  <button
                    onClick={() => navigate(`/services/${service._id.toString()}`)}
                    className="mt-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition w-full font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <FiInfo className="w-5 h-5"/>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      {/* Overlay to close sidebar on mobile */}
      {sidebarExpanded && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden" 
          onClick={() => setSidebarExpanded(false)}
        ></div>
      )}
    </div>
  );
};

export default AllServices;