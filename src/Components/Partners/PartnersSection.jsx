"use client";
import React from "react";

// Partner logos + tagline info
const partnerLogos = [
  { id: 1, name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", tagline: "Search and Cloud Solutions" },
  { id: 2, name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", tagline: "Productivity & Cloud Software" },
  { id: 3, name: "Apple", url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", tagline: "Innovation in Hardware & Software" },
  { id: 4, name: "Amazon", url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", tagline: "E-commerce & Cloud Computing" },
  { id: 5, name: "Facebook", url: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png", tagline: "Social Media & Connectivity" },
  { id: 6, name: "Netflix", url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", tagline: "Streaming Entertainment" },
  { id: 7, name: "Tesla", url: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg", tagline: "Electric Vehicles & Energy" },
  { id: 8, name: "Slack", url: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg", tagline: "Team Collaboration Platform" },
];

const PartnersSection = () => {
  return (
    <section className="relative py-20 sm:py-24 bg-white overflow-hidden dark:bg-gray-950 transition-colors duration-500">
      {/* Gradient floating blobs */}
      <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-0 dark:bg-purple-600/30 dark:mix-blend-lighten"></div>
      <div className="absolute bottom-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 dark:bg-emerald-600/30 dark:mix-blend-lighten"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 space-y-16 sm:space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-xs sm:text-sm font-bold text-purple-600 uppercase tracking-widest dark:text-purple-400">
            Trusted by Industry Leaders
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Meet Our Esteemed Partners
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400">
            These businesses use our platform to build transparency, gather genuine feedback, and connect directly with their customers.
          </p>
        </div>

        {/* Infinite Scroll Logos */}
        <div className="overflow-hidden relative">
          <div className="flex animate-scroll space-x-8 sm:space-x-12">
            {partnerLogos.concat(partnerLogos).map((partner, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col items-center justify-center p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-gray-200 transform transition duration-500 ease-in-out hover:scale-110 hover:rotate-3 hover:shadow-2xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl dark:hover:shadow-3xl"
              >
                <img
                  src={partner.url}
                  alt={`${partner.name} Logo`}
                  className="h-10 sm:h-14 w-auto object-contain filter grayscale hover:filter-none transition-all duration-500 dark:invert dark:grayscale-0 dark:opacity-80 dark:hover:opacity-100"
                />
                {/* Tooltip for tagline */}
                <div className="absolute bottom-full mb-2 sm:mb-3 px-2 sm:px-3 py-1 rounded-md bg-gray-900 text-white text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20 text-center">
                  {partner.tagline}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-6 dark:text-gray-200 animate-pulse">
            Want to join the network of trusted brands?
          </p>
          <a
            href="/business-signup"
            className="inline-flex items-center px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-full shadow-md hover:shadow-xl hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-blue-500"
          >
            Get Started as a Partner
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 w-5 h-5 sm:ml-3 sm:w-6 sm:h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll & blob animations */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 40s linear infinite;
        }
        @keyframes blob {
          0%, 100% { transform: translateY(0px) scale(1) }
          50% { transform: translateY(-20px) scale(1.05) }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-0 { animation-delay: 0s; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </section>
  );
};

export default PartnersSection;
