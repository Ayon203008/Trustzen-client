"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEye,
  FaUsers,
  FaSearch,
  FaHandshake,
  FaBullseye,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import CountUp from "react-countup";

const AboutUs = () => {
  // --- Theme toggle (persisted) ---
  const [theme, setTheme] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("theme") || "light" : "light"
  );
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // --- Stats animation ---
  const [startCount, setStartCount] = useState(false);
  const statsRef = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setStartCount(true),
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  // --- FAQ accordion ---
  const [openFAQ, setOpenFAQ] = useState(null);
  const faqs = [
    { q: "How does TrustZen verify reviews?", a: "We use both automated AI detection and manual moderation to ensure reviews are authentic." },
    { q: "Can I edit or delete my review?", a: "Yes. You can update or remove your review anytime from your profile dashboard." },
    { q: "Is TrustZen free to use?", a: "Absolutely! All reviews, comparisons, and ratings are 100% free for our users." },
  ];

  // --- Testimonials carousel ---
  const testimonials = [
    { name: "Rafi Ahmed", text: "TrustZen made my buying decisions easier. I love the clean and trustworthy experience." },
    { name: "Mitu Rahman", text: "Finally, a review platform that actually focuses on honesty and clarity. Impressive!" },
    { name: "Sakib Hasan", text: "The compare feature is brilliant — it saved me hours before choosing a service!" },
  ];
  const [tIndex, setTIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-12 px-6"
    >
      {/* --- Header Section with Theme Toggle --- */}
      <div className="max-w-7xl mx-auto text-center relative">
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="absolute right-0 top-0 p-2 rounded-full border text-xl"
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold"
        >
          TrustZen: Know Our Story
        </motion.h1>
        <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
          Welcome to TrustZen! Our goal is to make reviews authentic, transparent, and helpful
          so you can make smarter choices.
        </p>
      </div>

      {/* --- Mission Section --- */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto mt-20 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <FaEye className="text-3xl text-indigo-600" />
          <h2 className="text-3xl font-bold">Our Mission & Vision</h2>
        </div>
        <p className="text-lg">
          TrustZen aims to create a digital world filled with honesty and transparency.
        </p>
        <ul className="mt-4 space-y-2 list-disc ml-6">
          <li><strong>Mission:</strong> Deliver unbiased, user-driven reviews.</li>
          <li><strong>Vision:</strong> Build global trust through transparency.</li>
        </ul>
      </motion.section>

      {/* --- Animated Stats --- */}
      <div ref={statsRef} className="max-w-5xl mx-auto mt-16 grid grid-cols-3 gap-8 text-center">
        {[
          { label: "Users", end: 5000 },
          { label: "Reviews", end: 12000 },
          { label: "Partners", end: 180 },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="p-6 bg-indigo-50 dark:bg-gray-700 rounded-lg shadow"
          >
            <p className="text-4xl font-extrabold text-indigo-600">
              {startCount && <CountUp end={s.end} duration={2.5} />}+
            </p>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* --- FAQ Section --- */}
      <div className="max-w-5xl mx-auto mt-20">
        <h2 className="text-3xl font-bold mb-6 text-center">FAQs</h2>
        {faqs.map((faq, i) => (
          <div key={i} className="border-b py-4">
            <button
              onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              className="flex justify-between w-full text-left text-lg font-medium"
            >
              {faq.q}
              <span>{openFAQ === i ? "−" : "+"}</span>
            </button>
            <AnimatePresence>
              {openFAQ === i && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 text-gray-600 dark:text-gray-400"
                >
                  {faq.a}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* --- Testimonials Carousel --- */}
      <div className="max-w-4xl mx-auto mt-24 text-center">
        <h2 className="text-3xl font-bold mb-8">What Users Say</h2>
        <motion.div
          key={tIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="p-6 bg-indigo-50 dark:bg-gray-700 rounded-xl shadow-lg"
        >
          <p className="text-lg italic text-gray-700 dark:text-gray-300">
            “{testimonials[tIndex].text}”
          </p>
          <p className="mt-4 font-semibold text-indigo-600">{testimonials[tIndex].name}</p>
        </motion.div>
      </div>

      {/* --- Join Section --- */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto mt-24 text-center bg-white dark:bg-gray-800 shadow-lg p-10 rounded-xl border-t-4 border-indigo-600"
      >
        <FaHandshake className="mx-auto text-5xl text-indigo-600 mb-4" />
        <h2 className="text-3xl font-bold mb-3">Join Our Community!</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Share your service experiences and help others make better decisions.
        </p>
        <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          Start Exploring
        </button>
      </motion.section>
    </motion.div>
  );
};

export default AboutUs;
