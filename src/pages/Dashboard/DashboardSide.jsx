import React, { useState, useEffect } from "react";
import { NavLink } from "react-router"; 
import { Plus, List, Star, Home, Menu, X, ChevronLeft, ChevronRight, Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const useTheme = () => {

    const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
    
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });
        
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        
        return () => observer.disconnect();
    }, []);
    
  
    return { isDark }; 
};


const links = [
    { to: "/dashboard/add-service", icon: Plus, label: "Add Service" },
    { to: "/dashboard/my-services", icon: List, label: "My Services" },
    { to: "/dashboard/my-reviews", icon: Star, label: "My Reviews" },
    { to: "/dashboard/book-mark", icon: Bookmark, label: "Book Marks" },
    { to: "/", icon: Home, label: "Home" },
];

const DashboardSidebar = () => {

    const { isDark } = useTheme(); 
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

   
    const handleLinkClick = () => {
        if (window.innerWidth < 768) {
            setMobileOpen(false);
        }
    };
    
    
    useEffect(() => {
        const handleResize = () => {
           
            if (window.innerWidth >= 768 && collapsed === null) {
                setCollapsed(false); 
            }
        };
        if (window.innerWidth < 768) {
             setCollapsed(false);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.05, type: "spring", stiffness: 120 },
        }),
        hover: {
            scale: 1.01,
       
            backgroundColor: isDark ? "#1f2937" : "#eef2ff", 
            boxShadow: isDark ? "0 4px 6px rgba(0, 0, 0, 0.4)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: { duration: 0.2 },
        },
    };
    
    const sidebarVariants = {
        open: { 
            x: 0, 
            opacity: 1, 
            width: collapsed ? 80 : 256,
            transition: { type: "spring", stiffness: 120, damping: 20 }
        },
        closed: { x: -300, opacity: 0, width: 256 },
    };


    return (
        <>
            {/* Mobile toggle button */}
            <div className="md:hidden fixed top-4 left-4 z-50 transition-all duration-300">
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="p-3 rounded-full bg-indigo-600 text-white shadow-xl hover:bg-indigo-700 transition-colors duration-300"
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMobileOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <AnimatePresence>
                {(mobileOpen || window.innerWidth >= 768) && (
                    <motion.div
                        variants={sidebarVariants}
                        initial={window.innerWidth < 768 ? "closed" : "open"}
                        animate="open"
                        exit="closed"
               
                        className={`fixed md:sticky top-0 left-0 z-50 ${isDark ? 'bg-gray-800 border-r border-gray-700' : 'bg-white border-r border-gray-200'} shadow-2xl transition-all duration-300 flex flex-col justify-between h-screen`}
                        style={{ width: collapsed ? 80 : 256 }}
                    >
                        {/* Top section */}
                        <div className="flex flex-col gap-6 p-4 flex-1 overflow-y-auto">
                            <div className="flex items-center justify-center h-16">
                                <h2
                                    className={`text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 overflow-hidden whitespace-nowrap transition-all duration-300 ${
                                        collapsed ? "w-0 opacity-0" : "opacity-100"
                                    }`}
                                >
                                    App Dashboard
                                </h2>
                            </div>
                            
                            {/* Links */}
                            <nav className="flex flex-col gap-2 mt-4">
                                {links.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        custom={idx}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover="hover"
                                        variants={itemVariants}
                                        className="relative group"
                                    >
                                        <NavLink
                                            to={item.to}
                                            onClick={handleLinkClick}
                                            className={({ isActive }) =>
                                                `flex items-center ${collapsed ? 'justify-center' : 'gap-3'} p-3 rounded-xl font-semibold transition-all duration-200 ${
                                                    isActive
                                                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/50 dark:bg-indigo-700 dark:shadow-indigo-700/50"
                                                        : `${isDark ? 'text-gray-300 hover:bg-gray-700 hover:text-indigo-400' : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'}`
                                                }`
                                            }
                                        >
                                            <item.icon size={20} className="flex-shrink-0" />
                                            {!collapsed && <motion.span 
                                                className="whitespace-nowrap overflow-hidden"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.1 }}
                                                >{item.label}</motion.span>}
                                        </NavLink>

                                        {/* Tooltip for collapsed state */}
                                        {collapsed && (
                                            <span 
                                                className="absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 px-3 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 whitespace-nowrap z-50"
                                            >
                                                {item.label}
                                            </span>
                                        )}
                                    </motion.div>
                                ))}
                            </nav>
                        </div>

                        {/* Bottom section - Collapse Button (Theme Toggle removed) */}
                        <div className={`flex flex-col gap-3 p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                            
                            {/* Collapse Button */}
                            <button
                                onClick={() => setCollapsed(!collapsed)}
                                className="flex items-center justify-center p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300"
                                title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                            >
                                {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                                {!collapsed && <span className="ml-2">Collapse</span>}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default DashboardSidebar;