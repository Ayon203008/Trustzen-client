import React, { useState, useEffect } from "react";
import { Search, MapPin } from "lucide-react";

// ✅ Use public image paths (not relative ../../../)
const IMAGE_URLS = [
  "/images/Code review-bro.png",
  "/images/Growth curve-bro.png",
  "/images/Verified-rafiki.png",
];

// ✅ Dynamic image carousel component
const DynamicImageDisplay = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % IMAGE_URLS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl shadow-2xl overflow-hidden border-8 border-white dark:border-gray-800 transform rotate-3 transition-transform duration-500 hover:rotate-0 hover:scale-[1.05]">
      {IMAGE_URLS.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Hero Image ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent pointer-events-none"></div>

      <div className="absolute bottom-4 left-4 flex space-x-2">
        {IMAGE_URLS.map((_, index) => (
          <span
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
              index === currentImageIndex ? "bg-red-600" : "bg-white/50 dark:bg-gray-500"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

// ✅ Main Hero Section
const HeroSection = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 sm:py-24 lg:py-32 overflow-hidden relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="lg:w-1/2 w-full text-center lg:text-left relative z-10">
          <button className="inline-flex items-center justify-center rounded-full bg-slate-700 dark:bg-slate-600 px-6 py-2 mb-4 text-sm font-semibold text-white shadow-md transition duration-150 hover:bg-slate-800 dark:hover:bg-slate-500">
            Verified Reviews from a Global Community
          </button>

          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 leading-tight">
            Find Trustworthy <br />
            <span className="text-blue-600 dark:text-blue-400">Businesses.</span> Share Your Voice.
          </h1>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto lg:mx-0">
            The most transparent platform to read genuine customer experiences
            and rate services worldwide. Make smarter choices today.
          </p>

          {/* Search Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-2xl border border-red-200 dark:border-gray-700 w-full max-w-xl mx-auto lg:mx-0">
            <div className="relative w-full sm:w-2/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-300" />
              <input
                type="text"
                placeholder="Search for a company or service..."
                className="w-full py-3 pl-10 pr-4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <button
              type="button"
              className="w-full sm:w-1/3 bg-blue-600 hover:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition duration-150 shadow-red-500/50 shadow-lg"
            >
              <MapPin className="w-5 h-5 mr-2 hidden sm:block" />
              Find Reviews
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="lg:w-1/2 w-full flex justify-center lg:justify-end mt-10 lg:mt-0 relative z-10">
          <DynamicImageDisplay />
        </div>
      </div>

      {/* Decorative Shape */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-red-100 dark:bg-red-900 opacity-50 rounded-bl-[150px] hidden lg:block z-0"></div>
    </section>
  );
};

export default HeroSection;
