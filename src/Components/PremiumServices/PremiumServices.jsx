import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FaStar, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";

const PremiumServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/premiumServices")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ClipLoader size={50} color="#2563eb" loading={loading} />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#F8F7FB" }} className="py-16 min-h-screen">
      <div className="w-11/12 mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          🌟 Premium Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service) => (
            <motion.div
              key={service._id}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden group transition-all duration-500 border border-gray-100 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={service.serviceImage}
                  alt={service.serviceTitle}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  ${service.price}
                </span>
                <span className="absolute top-3 left-3 bg-white/80 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full shadow">
                  {service.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.serviceTitle}
                </h3>
                <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mb-3 rounded-full"></div>

                <p className="text-gray-500 text-sm mb-2">
                  <strong className="text-gray-700">Company:</strong>{" "}
                  {service.companyName}
                </p>
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                  {service.description}
                </p>

                {/* Info row */}
                <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-blue-500" /> {service.location}
                  </span>
                  <span className="flex items-center gap-1 text-yellow-500 font-medium">
                    <FaStar className="text-sm" /> {service.rating}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Visit & Details */}
                <div className="flex justify-between items-center">
                  <a
                    href={service.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm flex items-center gap-1 text-blue-600 hover:text-indigo-700 transition font-medium"
                  >
                    <FaGlobe /> Visit Site
                  </a>
                  <button
                    onClick={() => navigate(`/services/${service._id}`)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md"
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Border glow on hover */}
              <div className="absolute inset-0 border border-transparent group-hover:border-blue-400/50 rounded-2xl transition-all duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumServices;
