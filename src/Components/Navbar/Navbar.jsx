import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { 
  HiOutlineMenu, 
  HiOutlineX, 
  HiOutlineUser, 
  HiOutlineLogout,
  HiOutlineHome,
  HiOutlineBriefcase,
  HiOutlineInformationCircle,
  HiOutlineViewGrid
} from "react-icons/hi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => console.log("User logged out successfully"))
      .catch((error) => console.error("Logout failed:", error));
    setMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-xl font-medium transition-all duration-300 ${
      isActive
        ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25"
        : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800/50"
    }`;

  const navLinks = (
    <>
      <NavLink to="/" className={navLinkClass} onClick={() => setMenuOpen(false)}>
        <HiOutlineHome className="w-5 h-5" />
        <span>Home</span>
      </NavLink>
      <NavLink to="/allservices" className={navLinkClass} onClick={() => setMenuOpen(false)}>
        <HiOutlineBriefcase className="w-5 h-5" />
        <span>Services</span>
      </NavLink>
      <NavLink to="/aboutus" className={navLinkClass} onClick={() => setMenuOpen(false)}>
        <HiOutlineInformationCircle className="w-5 h-5" />
        <span>About Us</span>
      </NavLink>
      {user && (
        <NavLink to="/dashboard" className={navLinkClass} onClick={() => setMenuOpen(false)}>
          <HiOutlineViewGrid className="w-5 h-5" />
          <span>Dashboard</span>
        </NavLink>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl shadow-sm dark:bg-gray-900/90 border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-900"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TrustZen
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                Premium Services
              </span>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks}

            {/* Right Side Actions */}
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
              <ThemeToggle />
              
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="relative group">
                    <img
                      src={user.photoURL || "/default-avatar.png"}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-xl object-cover border-2 border-white dark:border-gray-800 shadow-lg group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "/default-avatar.png";
                        e.target.onerror = null;
                      }}
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-900"></div>
                  </div>
                  
                  <motion.button
                    onClick={handleSignOut}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-xl shadow-lg shadow-red-500/25 transition-all duration-300"
                  >
                    <HiOutlineLogout className="w-4 h-4" />
                    <span className="font-semibold">Logout</span>
                  </motion.button>
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink
                    to="/login"
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 font-semibold"
                  >
                    <HiOutlineUser className="w-4 h-4" />
                    <span>Login</span>
                  </NavLink>
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            {menuOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/95 backdrop-blur-xl dark:bg-gray-900/95 border-t border-gray-200/50 dark:border-gray-700/50 shadow-xl"
          >
            <div className="px-4 py-6 space-y-3">
              <div className="grid gap-2">
                {navLinks}
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Theme</span>
                  </div>
                  
                  {user ? (
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={user.photoURL || "/default-avatar.png"}
                          alt="User Avatar"
                          className="w-10 h-10 rounded-xl object-cover border-2 border-white dark:border-gray-800 shadow-lg"
                          onError={(e) => {
                            e.target.src = "/default-avatar.png";
                            e.target.onerror = null;
                          }}
                        />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-900"></div>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-all duration-300 text-sm font-semibold"
                      >
                        <HiOutlineLogout className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <NavLink
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all duration-300 text-sm font-semibold"
                    >
                      <HiOutlineUser className="w-4 h-4" />
                      Login
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}