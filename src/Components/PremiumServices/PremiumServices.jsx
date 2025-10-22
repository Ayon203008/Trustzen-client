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
    // সাধারণত, ডার্ক মোড ইমপ্লিমেন্টেশনের জন্য ডেটা ফেচিং লজিক পরিবর্তন করার প্রয়োজন নেই।
    fetch("https://trust-zen.vercel.app/premiumServices")
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
      // ১. লোডিং স্পিনারের রঙ ডার্ক মোডেও দৃশ্যমান রাখতে সামান্য পরিবর্তন
      <div className="flex justify-center items-center h-64 
        bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
        <ClipLoader size={50} color="#3b82f6" loading={loading} />
      </div>
    );
  }

  return (
    // ২. সেকশনের ব্যাকগ্রাউন্ড: লাইট মোডে হালকা নীল/ধূসর, ডার্ক মোডে গাঢ় ধূসর
    // inline style পরিবর্তন করে Tailwind class ব্যবহার করা হলো
    <div className="py-16 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <div className="w-11/12 mx-auto">
        {/* ৩. হেডিং টেক্সট কালার */}
        <div className="text-center">

         <h1 className="text-5xl mb-20 sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 leading-tight">
            
            <span className="text-blue-600 dark:text-blue-400">Premium </span> Services
          </h1>
              </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service) => (
            <motion.div
              key={service._id}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              // ৪. কার্ড ব্যাকগ্রাউন্ড, বর্ডার ও শ্যাডো: লাইট মোডে সাদা, ডার্ক মোডে গাঢ় ধূসর
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden group transition-all duration-500 border border-gray-100 hover:shadow-2xl 
                dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-indigo-500/20"
            >
              {/* Image & Badges (Image and Price/Category Badges এর রঙ অপরিবর্তিত রাখা হয়েছে, কারণ এগুলো সার্ভিস হাইলাইট) */}
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
                {/* ৫. সার্ভিস টাইটেল টেক্সট কালার */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2 
                  dark:text-white">
                  {service.serviceTitle}
                </h3>
                {/* Underline (এটি ডার্ক মোডেও একই গ্রেডিয়েন্ট রাখতে পারে) */}
                <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mb-3 rounded-full"></div>

                {/* ৬. কোম্পানি টেক্সট কালার */}
                <p className="text-gray-500 text-sm mb-2 
                  dark:text-gray-400">
                  <strong className="text-gray-700 dark:text-gray-300">Company:</strong>{" "}
                  {service.companyName}
                </p>
                {/* ৭. ডেসক্রিপশন টেক্সট কালার */}
                <p className="text-gray-600 text-sm line-clamp-2 mb-3 
                  dark:text-gray-400">
                  {service.description}
                </p>

                {/* Info row */}
                {/* ৮. লোকেশন/রেটিং টেক্সট কালার */}
                <div className="flex justify-between items-center text-sm text-gray-500 mb-3 
                  dark:text-gray-400">
                  {/* লোকেশন আইকন কালার অপরিবর্তিত */}
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-blue-500" /> {service.location}
                  </span>
                  {/* স্টার আইকন/রেটিং কালার অপরিবর্তিত */}
                  <span className="flex items-center gap-1 text-yellow-500 font-medium">
                    <FaStar className="text-sm" /> {service.rating}
                  </span>
                </div>

                {/* Tags */}
                {/* ৯. ট্যাগ স্টাইল: ডার্ক মোডেও ট্যাগ ভিজ্যুয়ালি হাইলাইট করা */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs font-medium 
                        dark:bg-blue-900/50 dark:text-blue-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Visit & Details */}
                <div className="flex justify-between items-center">
                  {/* ১০. ভিজিট সাইট লিংক কালার */}
                  <a
                    href={service.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm flex items-center gap-1 text-blue-600 hover:text-indigo-700 transition font-medium 
                      dark:text-blue-400 dark:hover:text-indigo-500"
                  >
                    <FaGlobe /> Visit Site
                  </a>
                  {/* ডিটেইলস বাটন কালার অপরিবর্তিত (গ্রেডিয়েন্ট) */}
                  <button
                    onClick={() => navigate(`/services/${service._id}`)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md"
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Border glow on hover */}
              {/* ১১. হোভার গ্লো বর্ডার কালার (ডার্ক মোডের সাথে মানানসই) */}
              <div className="absolute inset-0 border border-transparent group-hover:border-blue-400/50 rounded-2xl transition-all duration-300 pointer-events-none 
                dark:group-hover:border-indigo-500/50"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumServices;