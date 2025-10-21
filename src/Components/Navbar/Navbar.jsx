import { use, useState } from "react";
import { motion } from "framer-motion";

import { NavLink } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOutUser } = use(AuthContext); // এখানে use() এর বদলে useContext() ব্যবহার করা ভালো, তবে আপনার কোড অনুযায়ী ব্যবহার করা হয়েছে।

  const handleSingOut = () => {
    signOutUser()
      .then(() => {
        console.log("user logout successfully");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  // NavLink-এ ডার্ক মোড স্টাইল যোগ করা হয়েছে
  const navLinkClass = ({ isActive }) =>
    `font-medium transition-colors duration-300 
     ${
       isActive
         ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
         : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
     }`;

  const navLinks = (
    <>
      <NavLink to={"/"} className={navLinkClass}>
        Home
      </NavLink>
      <NavLink to={"/allservices"} className={navLinkClass}>
        Services
      </NavLink>
      <NavLink to={"/aboutus"} className={navLinkClass}>
        About Us
      </NavLink>
      {user && (
        <NavLink to={"/dashboard"} className={navLinkClass}>
          Dashboard
        </NavLink>
      )}
    </>
  );

  return (
    // ১. ন্যাভবারের ব্যাকগ্রাউন্ড: সাদা/স্বচ্ছ থেকে গাঢ় ধূসর/স্বচ্ছ
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm 
      dark:bg-gray-900/80 dark:shadow-lg dark:border-b dark:border-gray-800/50 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a
            href="#home"
            className="text-2xl font-bold tracking-tight flex items-center gap-1"
          >
            {/* ২. লোগো টেক্সট কালার: Trust অংশ */}
            <motion.span
              className="text-blue-600 dark:text-blue-400"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              Trust
            </motion.span>
            {/* ৩. লোগো টেক্সট কালার: Zen অংশ */}
            <motion.span
              className="text-gray-900 dark:text-white"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Zen
            </motion.span>
            <ThemeToggle />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks}

            {/* Login/Logout Button (বাটনের রঙ পরিবর্তন করার প্রয়োজন নেই, তবে ডার্ক মোডেও যেন এটি হাইলাইট হয়) */}
            {user ? (
              <button
                onClick={handleSingOut}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all shadow-md"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all shadow-md"
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          {/* ৪. মোবাইল মেনু আইকন কালার */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-gray-700 dark:text-gray-300"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        // ৫. মোবাইল মেনু ব্যাকগ্রাউন্ড ও বর্ডার: সাদা থেকে গাঢ় ধূসর
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white border-t shadow-sm 
            dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="flex flex-col px-4 py-3 space-y-2">
            {navLinks}

            {/* Login Button (মোবাইল মেনুতে যদি লগইন না থাকে) */}
            {!user && (
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                // ৬. মোবাইল মেনু লগইন লিংক কালার
                className="py-2 text-blue-600 font-semibold dark:text-blue-400"
              >
                Login
              </NavLink>
            )}
            {/* মোবাইল মেনুতে লগআউট বাটন যোগ করা হয়েছে */}
            {user && (
              <button
                onClick={() => {
                  handleSingOut();
                  setMenuOpen(false);
                }}
                className="py-2 text-left text-red-500 font-semibold dark:text-red-400"
              >
                Logout
              </button>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}