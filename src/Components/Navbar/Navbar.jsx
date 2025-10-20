import { use, useState } from "react";
import { motion } from "framer-motion";

import { NavLink } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const {user,signOutUser}=use(AuthContext)
  


  const handleSingOut=()=>{
    signOutUser()
    .then(()=>{
      console.log("user logout successfully")
    })
  }

  const navLinks = <>
  
  <NavLink to={"/"}>Home</NavLink>
  <NavLink to={"/allservices"}>Services</NavLink>
  {user &&<NavLink to={"/addservice"}>Add Service</NavLink> }
  {user &&  <NavLink to={"/myservices"}>My Service</NavLink> }
  {user &&  <NavLink to={"/myreviews"}>My Reviews</NavLink>}
  


  
  </>

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a
            href="#home"
            className="text-2xl font-bold tracking-tight flex items-center gap-1"
          >
            <motion.span
              className="text-blue-600"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              Trust
            </motion.span>
            <motion.span
              className="text-gray-900"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Zen
            </motion.span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks}

            {/* Login Button */}
            {
              user? (
                <button onClick={handleSingOut} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all">Logout</button>
              ):
               <NavLink
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
            >
              Login
            </NavLink>

            }
           
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-gray-700"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white border-t shadow-sm"
        >
          <div className="flex flex-col px-4 py-3 space-y-2">
            {navLinks}

            {/* Login Button */}
            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="py-2 text-blue-600 font-semibold"
            >
              Login
            </NavLink>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
