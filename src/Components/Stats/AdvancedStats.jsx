import React from "react";
import CountUp from "react-countup";
import { FaUsers, FaServicestack, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const AdvancedStats = () => {
  const stats = [
    { icon: <FaUsers />, title: "Users", value: 1250 },
    { icon: <FaServicestack />, title: "Services", value: 320 },
    { icon: <FaStar />, title: "Reviews", value: 780 },
  ];

  return (
    // ১. সেকশন ব্যাকগ্রাউন্ড: হালকা ধূসর থেকে গাঢ় ধূসর
    <div className="relative py-12 bg-gray-50 overflow-hidden 
      dark:bg-gray-900 transition-colors duration-500"> 
      
      {/* Floating pastel circles (ডার্ক মোডেও দৃশ্যমান করার জন্য রঙ ও অপাসিটি সামঞ্জস্য করা হয়েছে) */}
      <div className="absolute top-0 left-0 w-full h-full">
        <motion.div
          className="absolute w-36 h-36 bg-pink-200 opacity-25 rounded-full blur-3xl 
            dark:bg-pink-700/20"
          animate={{ y: [0, 30, 0], x: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-52 h-52 bg-blue-200 opacity-25 rounded-full blur-3xl top-20 left-16 
            dark:bg-blue-700/20"
          animate={{ y: [0, -30, 0], x: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.h1
        // ২. হেডিং টেক্সট কালার: গাঢ় ধূসর থেকে সাদা
        className="text-5xl md:text-4xl font-bold text-gray-800 mb-10 text-center z-10 
          dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Our Platform in Numbers
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-8 z-10">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            // ৩. স্ট্যাট কার্ড ব্যাকগ্রাউন্ড, শ্যাডো এবং বর্ডার: সাদা থেকে গাঢ় ধূসর
            className="flex flex-col items-center bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer w-44 
              dark:bg-gray-800 dark:shadow-xl dark:hover:shadow-2xl dark:border dark:border-gray-700"
            whileHover={{ scale: 1.05, y: -6 }}
          >
            <motion.div
              // ৪. আইকন কালার: ইন্ডিগো (Indigo)
              className="text-indigo-500 text-5xl mb-2 
                dark:text-indigo-400"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              {stat.icon}
            </motion.div>
            {/* ৫. টাইটেল টেক্সট কালার: গাঢ় ধূসর থেকে হালকা ধূসর */}
            <div className="text-gray-800 text-lg font-semibold mb-1 
              dark:text-gray-300">
              {stat.title}
            </div>
            {/* ৬. CountUp ভ্যালু (গ্রেডিয়েন্ট টেক্সট): গ্রেডিয়েন্ট অপরিবর্তিত রাখা হয়েছে, তবে ডার্ক মোডে এটি দৃশ্যমান হবে। */}
            <div className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-yellow-400 to-green-400">
              <CountUp end={stat.value} duration={3} separator="," />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdvancedStats;