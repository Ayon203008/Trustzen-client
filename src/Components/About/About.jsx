import React from "react";
import { motion } from "framer-motion";

const IMAGE_URL_1 = "https://picsum.photos/id/1015/600/400";
const IMAGE_URL_2 = "https://picsum.photos/id/163/400/300";

const AdvancedAboutSection = () => {
  const features = [
    {
      title: "Authenticity Verification (Anti-Fraud)",
      description:
        "Leveraging AI and behavioral analysis to ensure every review is genuine and reliable.",
      icon: (
        <svg
          // ১. আইকন কালার: ডার্ক মোডেও হাইলাইট রাখতে
          className="w-5 h-5 text-purple-600 dark:text-purple-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m5.617-4.212a7.957 7.957 0 01-1.285.495m-4.212 5.617a7.957 7.957 0 00-.495 1.285m-5.617-4.212a7.957 7.957 0 011.285-.495m4.212-5.617a7.957 7.957 0 00-.495 1.285M12 21.75c-3.149 0-5.877-2.34-6.398-5.556C5.06 14.28 4.5 12.147 4.5 10c0-1.892.29-3.754.858-5.464M12 21.75c3.149 0 5.877-2.34 6.398-5.556C18.94 14.28 19.5 12.147 19.5 10c0-1.892-.29-3.754-.858-5.464M12 21.75V12"
          ></path>
        </svg>
      ),
    },
    {
      title: "Open & Collaborative Platform",
      description:
        "Providing a space where both consumers and businesses can engage transparently.",
      icon: (
        <svg
          className="w-5 h-5 text-purple-600 dark:text-purple-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
      ),
    },
    {
      title: "Global Insight & Reach",
      description:
        "Serving as a vital tool for informed decisions across various industries worldwide.",
      icon: (
        <svg
          className="w-5 h-5 text-purple-600 dark:text-purple-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h6a2 2 0 002-2v-1a2 2 0 012-2h1.945M18.835 7A9.954 9.954 0 0012 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10A9.954 9.954 0 0018.835 7z"
          ></path>
        </svg>
      ),
    },
  ];

  return (
    // ২. সেকশনের ব্যাকগ্রাউন্ড: লাইট মোডে সাদা থেকে হালকা পার্পল, ডার্ক মোডে গাঢ় ধূসর
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-white to-purple-50 overflow-hidden 
      dark:from-gray-900 dark:to-gray-950 transition-colors duration-500">
      
      {/* Glowing background elements (ডার্ক মোডে রঙ এবং অপাসিটি সামঞ্জস্য করা হয়েছে) */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-purple-300/30 blur-[120px] rounded-full 
        dark:bg-purple-600/20"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-pink-300/20 blur-[100px] rounded-full 
        dark:bg-pink-600/15"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-20">
          
          {/* Left: Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-5/12 relative"
          >
            <div className="relative w-full max-w-lg mx-auto">
              <img
                src={IMAGE_URL_1}
                alt="Building Trust"
                // ৩. ইমেজের বর্ডার: লাইট মোডে সাদা বর্ডার, ডার্ক মোডে গাঢ় বর্ডার
                className="w-full h-80 object-cover shadow-2xl rounded-tl-[4rem] rounded-br-3xl transform rotate-1 transition-all duration-500 hover:rotate-0 z-20 relative 
                  dark:border-gray-700"
              />
              <img
                src={IMAGE_URL_2}
                alt="Transparency Process"
                // ৪. ছোট ইমেজের বর্ডার: লাইট মোডে সাদা, ডার্ক মোডে গাঢ় বর্ডার
                className="w-64 h-64 object-cover rounded-3xl shadow-xl absolute -bottom-14 -right-8 transform -rotate-2 border-4 border-white transition-all duration-500 hover:rotate-0 z-30 
                  dark:border-gray-800"
              />
              {/* ৫. ইমেজের গ্রেডিয়েন্ট ওভারলে: এটি ডার্ক মোডে না থাকলেও চলে, তবে হালকা ইফেক্ট রাখা যেতে পারে */}
              <div className="absolute top-0 left-0 w-full h-full rounded-3xl bg-gradient-to-tr from-purple-300/10 to-transparent dark:from-purple-900/10"></div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-6/12"
          >
            {/* ৬. ট্যাগলাইন কালার */}
            <p className="text-sm font-semibold text-purple-600 uppercase tracking-[0.25em] mb-3 
              dark:text-purple-400">
              OUR CORE MISSION
            </p>
            {/* ৭. হেডিং কালার */}
            <h2 className="text-5xl font-extrabold text-gray-900 mb-6 leading-snug 
              dark:text-white">
              Building{" "}
              {/* গ্রেডিয়েন্ট টেক্সট কালার (ডার্ক মোডেও হাইলাইট রাখতে) */}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent 
                dark:from-purple-400 dark:to-pink-400">
                Trust
              </span>{" "}
              and Driving{" "}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent 
                dark:from-purple-400 dark:to-pink-400">
                Transparency
              </span>
              .
            </h2>
            {/* ৮. বডি টেক্সট কালার */}
            <p className="text-lg text-gray-600 mb-10 max-w-2xl 
              dark:text-gray-400">
              We’re the largest open review community — fostering authenticity,
              empowering smarter decisions, and promoting growth through honest
              feedback.
            </p>

            {/* Feature Cards */}
            <div className="grid gap-6 mb-12">
              {features.map((feature, i) => (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  key={i}
                  // ৯. ফিচার কার্ড স্টাইল: লাইট মোডে সাদা/স্বচ্ছ, ডার্ক মোডে গাঢ় ধূসর/স্বচ্ছ
                  className="flex items-start bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-purple-100 hover:shadow-lg transition 
                    dark:bg-gray-800/70 dark:border-purple-900 dark:hover:shadow-purple-500/10"
                >
                  {/* ১০. আইকন কন্টেইনার ব্যাকগ্রাউন্ড */}
                  <div className="p-3 bg-purple-100 rounded-full mr-4 flex-shrink-0 
                    dark:bg-purple-900/50">
                    {feature.icon}
                  </div>
                  <div>
                    {/* ১১. টাইটেল টেক্সট কালার */}
                    <h3 className="text-lg font-semibold text-gray-800 
                      dark:text-gray-200">
                      {feature.title}
                    </h3>
                    {/* ১২. ডেসক্রিপশন টেক্সট কালার */}
                    <p className="text-sm text-gray-600 
                      dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button (গ্রেডিয়েন্ট বাটন অপরিবর্তিত রাখা হয়েছে) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Explore Our Commitment to Trust
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedAboutSection;