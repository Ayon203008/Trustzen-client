import React from "react";

// Realistic partner logos (you can replace URLs with your own high-res logos)
const partnerLogos = [
  { id: 1, name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { id: 2, name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { id: 3, name: "Apple", url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { id: 4, name: "Amazon", url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { id: 5, name: "Facebook", url: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" },
  { id: 6, name: "Netflix", url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { id: 7, name: "Tesla", url: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
  { id: 8, name: "Slack", url: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" },
];

const PartnersSection = () => {
  return (
    // ১. সেকশন ব্যাকগ্রাউন্ড ও ট্রানজিশন যোগ করা
    <section className="relative py-24 bg-white overflow-hidden 
      dark:bg-gray-950 transition-colors duration-500">
      
      {/* Gradient blobs for modern look */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-0 
        dark:bg-purple-600/30 dark:mix-blend-lighten"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 
        dark:bg-emerald-600/30 dark:mix-blend-lighten"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          {/* ২. ট্যাগলাইন কালার */}
          <p className="text-sm font-bold text-purple-600 uppercase tracking-widest mb-2 
            dark:text-purple-400">
            Trusted by Industry Leaders
          </p>
          {/* ৩. হেডিং কালার */}
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 
            dark:text-white">
            Meet Our Esteemed Partners
          </h2>
          {/* ৪. সাব-হেডিং কালার */}
          <p className="text-lg text-gray-600 
            dark:text-gray-400">
            These businesses use our platform to build transparency, gather genuine feedback, and connect directly with their customers.
          </p>
        </div>

        {/* Infinite Scroll Logos */}
        <div className="overflow-hidden">
          <div className="flex animate-scroll space-x-12">
            {partnerLogos.concat(partnerLogos).map((partner, idx) => (
              <div
                key={idx}
                // ৫. লোগো কার্ডের স্টাইল: ব্যাকগ্রাউন্ড, শ্যাডো এবং বর্ডার পরিবর্তন
                className="flex items-center justify-center p-4 bg-white rounded-xl shadow-lg border border-gray-200 transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-xl
                  dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl dark:hover:shadow-3xl"
              >
                <img
                  src={partner.url}
                  alt={`${partner.name} Logo`}
                  // ৬. লোগো ইমেজ স্টাইল: ডার্ক মোডে লোগোকে সাদা রাখতে `invert` ক্লাস ব্যবহার এবং হোভারে গ্রে-স্কেল রিমুভ করা
                  className="h-10 w-auto object-contain filter grayscale hover:filter-none transition-all duration-500
                    dark:invert dark:grayscale-0 dark:opacity-80 dark:hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          {/* ৭. CTA টেক্সট কালার */}
          <p className="text-xl font-semibold text-gray-800 mb-4 
            dark:text-gray-200">
            Want to join the network of trusted brands?
          </p>
          <a
            href="/business-signup"
            // ৮. CTA বাটন স্টাইল: ডার্ক মোডেও একই এমারাল্ড রঙ রাখা হয়েছে
            className="inline-flex items-center px-8 py-3 bg-emerald-600 text-white font-semibold rounded-full shadow-lg hover:bg-emerald-700 transition duration-300 transform hover:scale-105"
          >
            Get Started as a Partner
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 w-5 h-5"
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

      {/* Scroll animation keyframes (এতে কোনো পরিবর্তনের দরকার নেই) */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            display: flex;
            width: max-content;
            animation: scroll 40s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default PartnersSection;