"use client";
import React from "react";
import { motion } from "framer-motion";

// NOTE: Please ensure these image paths are correct relative to your public directory
const IMAGE_URL_1 = "/images/In the office-pana.png";
const IMAGE_URL_2 = "/images/Prototyping process-bro.png";

const AdvancedAboutSection = () => {
  const features = [
    {
      title: "Authenticity Verification (Anti-Fraud)",
      description:
        "Leveraging AI and behavioral analysis to ensure every review is genuine and reliable.",
      icon: (
        <svg
          className="w-6 h-6 text-purple-600 dark:text-purple-400"
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
          className="w-6 h-6 text-purple-600 dark:text-purple-400"
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
          className="w-6 h-6 text-purple-600 dark:text-purple-400"
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };
  
  const featureItemVariants = { 
    hidden: { y: 25, opacity: 0 }, 
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    } 
  };

  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-br from-white via-purple-50/70 to-pink-50/70 overflow-hidden dark:from-gray-900 dark:via-gray-950 dark:to-black transition-colors duration-500">
      {/* Enhanced background elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300/20 blur-[120px] rounded-full dark:bg-purple-600/15 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-pink-300/20 blur-[110px] rounded-full dark:bg-pink-600/15 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300/10 blur-[140px] rounded-full dark:bg-blue-600/10"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/30 rounded-full dark:bg-purple-500/40"
            initial={{ y: 0, x: 0 }}
            animate={{ 
              y: [0, -100, 0],
              x: [0, 50, 0],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              delay: i * 2,
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">

          {/* Left: Enhanced Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, type: "spring", stiffness: 50 }}
            viewport={{ once: true, amount: 0.3 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* Main Image with enhanced styling */}
              <motion.div 
                className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 p-6 rounded-3xl shadow-2xl shadow-purple-500/10 border border-purple-200/50 dark:border-purple-800/30"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.img
                  src={IMAGE_URL_1}
                  alt="Building Trust"
                  className="w-full h-100 object-cover rounded-2xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Floating secondary image */}
              <motion.div 
                className="absolute -bottom-8 -right-8 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/40 dark:to-purple-900/40 p-5 rounded-2xl shadow-xl shadow-pink-500/20 border-8 border-white dark:border-gray-800"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.08, rotate: 2 }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                <img
                  src={IMAGE_URL_2}
                  alt="Transparency Process"
                  className="w-70 h-64 object-cover rounded-xl"
                />
              </motion.div>

              {/* Enhanced decorative ring */}
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-2 border-dashed border-purple-300/40 dark:border-purple-700/40 rounded-full z-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>

          {/* Right: Enhanced Content */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, type: "spring", stiffness: 50 }}
            viewport={{ once: true, amount: 0.3 }}
            className="lg:w-1/2"
          >
            <motion.p 
              className="text-sm font-bold text-purple-600 uppercase tracking-widest mb-3 dark:text-purple-400 inline-flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="w-2 h-2 bg-purple-600 rounded-full dark:bg-purple-400"></span>
              OUR CORE MISSION
            </motion.p>
            
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight dark:text-white"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Building{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
                Trust
              </span>{" "}
              <br />
              and Driving{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
                Transparency
              </span>
              .
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 mb-12 max-w-2xl leading-relaxed dark:text-gray-300"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              We're the largest open review community — fostering authenticity,
              empowering smarter decisions, and promoting growth through honest
              feedback.
            </motion.p>

            {/* Enhanced Feature Cards */}
            <motion.div
              className="grid gap-6 mb-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  variants={featureItemVariants}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(147, 51, 234, 0.15)" 
                  }}
                  className="flex items-start bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100/80 transition-all duration-300 dark:bg-gray-800/80 dark:border-gray-700/50 group hover:border-purple-200/80 dark:hover:border-purple-700/50"
                >
                  <motion.div 
                    className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl mr-4 flex-shrink-0 relative dark:from-purple-900/50 dark:to-pink-900/50 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    <span className="absolute inset-0 border-2 border-purple-300/50 dark:border-purple-600/50 rounded-xl animate-pulse"></span>
                    {feature.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 40px rgba(147, 51, 234, 0.4)" 
              }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-purple-500/30 hover:shadow-purple-600/40 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Our Commitment to Trust
                <motion.svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </span>
              
              {/* Button shine effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%]"
                whileHover={{ translateX: "200%" }}
                transition={{ duration: 0.8 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedAboutSection;