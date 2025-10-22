import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaArrowRight,
  FaHeart,
  FaShieldAlt,
  FaStar,
  FaRocket,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/allservices" },
    { name: "About Us", path: "/aboutus" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ];

  const dashboardLinks = [
    { name: "Add Service", path: "/dashboard/add-service" },
    { name: "My Services", path: "/dashboard/my-services" },
    { name: "My Reviews", path: "/dashboard/my-reviews" },
    { name: "Bookmarks", path: "/dashboard/book-mark" },
  ];

  const supportLinks = [
    { name: "FAQ", path: "/faq" },
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Contact Us", path: "/contact" },
  ];

  const socialLinks = [
    { Icon: FaFacebookF, color: "hover:bg-blue-600", label: "Facebook" },
    { Icon: FaTwitter, color: "hover:bg-sky-500", label: "Twitter" },
    { Icon: FaInstagram, color: "hover:bg-pink-500", label: "Instagram" },
    { Icon: FaLinkedinIn, color: "hover:bg-blue-700", label: "LinkedIn" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-black text-gray-300 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Top Border Glow */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-sm" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Brand Section */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4"
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25">
                    <span className="text-white font-bold text-2xl">T</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-4 border-gray-900"></div>
                </div>
                <div>
                  <h2 className="text-5xl font-black text-white tracking-tight">
                    Trust<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Zen</span>
                  </h2>
                  <p className="text-blue-300 font-semibold text-sm mt-1">Premium Service Platform</p>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg leading-relaxed text-gray-400 max-w-xl"
              >
                Your trusted platform to share, explore, and review services that make life easier. 
                Empowering users with honest feedback and transparency in every interaction.
              </motion.p>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4"
              >
                {socialLinks.map(({ Icon, color, label }, index) => (
                  <motion.a
                    key={label}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 transition-all duration-300 ${color} group`}
                    aria-label={label}
                  >
                    <Icon className="text-white text-lg group-hover:scale-110 transition-transform" />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
                  <FaRocket className="text-blue-400" />
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <motion.a
                        href={link.path}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-all duration-300 group text-sm font-medium"
                      >
                        <FaArrowRight className="text-blue-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Dashboard */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  Dashboard
                </h3>
                <ul className="space-y-3">
                  {dashboardLinks.map((link) => (
                    <li key={link.name}>
                      <motion.a
                        href={link.path}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-all duration-300 group text-sm font-medium"
                      >
                        <FaArrowRight className="text-yellow-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Support */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
                  <FaShieldAlt className="text-green-400" />
                  Support
                </h3>
                <ul className="space-y-3">
                  {supportLinks.map((link) => (
                    <li key={link.name}>
                      <motion.a
                        href={link.path}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-all duration-300 group text-sm font-medium"
                      >
                        <FaArrowRight className="text-green-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-700/50"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-2xl">
                <FaMapMarkerAlt className="text-blue-400 text-xl" />
              </div>
              <div>
                <p className="text-white font-semibold">Location</p>
                <p className="text-gray-400 text-sm">Dhaka, Bangladesh</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-2xl">
                <FaEnvelope className="text-green-400 text-xl" />
              </div>
              <div>
                <p className="text-white font-semibold">Email Us</p>
                <p className="text-gray-400 text-sm">support@trustzen.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-2xl">
                <FaPhoneAlt className="text-purple-400 text-xl" />
              </div>
              <div>
                <p className="text-white font-semibold">Call Us</p>
                <p className="text-gray-400 text-sm">+880 1234-567890</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gray-500 text-sm flex items-center gap-2"
            >
              © {currentYear} 
              <span className="font-bold text-white">TrustZen</span>. 
              All rights reserved.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 text-gray-500 text-sm"
            >
              Crafted with <FaHeart className="text-red-500 animate-pulse" /> by
              <span className="font-semibold text-blue-400">Team TrustZen</span>
            </motion.p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 right-10 w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
      <div className="absolute top-20 left-10 w-3 h-3 bg-purple-400 rounded-full animate-bounce animation-delay-1000"></div>
    </footer>
  );
}