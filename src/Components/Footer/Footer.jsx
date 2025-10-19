import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-8">
          {/* Logo and About */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-3">
              Trust<span className="text-blue-500">Zen</span>
            </h2>
            <p className="text-sm leading-relaxed text-gray-400 mb-4">
              Your trusted platform to share, explore, and review services that
              make life easier. Empowering users with honest feedback.
            </p>
            <div className="flex items-center space-x-3">
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-full hover:bg-sky-500 transition-colors"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-full hover:bg-pink-500 transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-full hover:bg-blue-700 transition-colors"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#home"
                  className="hover:text-blue-400 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-blue-400 transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  className="hover:text-blue-400 transition-colors"
                >
                  My Reviews
                </a>
              </li>
              <li>
                <a
                  href="#add-service"
                  className="hover:text-blue-400 transition-colors"
                >
                  Add Service
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#faq"
                  className="hover:text-blue-400 transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="hover:text-blue-400 transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-blue-400 transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-3">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-500" /> Dhaka, Bangladesh
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-blue-500" /> support@trustzen.com
              </li>
              <li className="flex items-center gap-2">
                <FaPhoneAlt className="text-blue-500" /> +880 1234-567890
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400 pt-6">
          <p>© {new Date().getFullYear()} TrustZen. All rights reserved.</p>
          <p>
            Crafted with ❤️ by{" "}
            <span className="text-blue-500 font-semibold">Team TrustZen</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
