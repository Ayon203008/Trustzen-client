import React from "react";
import { FaMoon, FaSun } from "react-icons/fa"; // ✅ Import icons
import { useTheme } from "../../Context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-xl transition-colors">
      {theme === "light" ? <FaMoon /> : <FaSun className="text-yellow-300" />}
    </button>
  );
};
export default ThemeToggle;
