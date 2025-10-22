import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const GoogleSignIn = () => {
  const { GoogleSignIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      // 🔹 Sign in using Firebase Google Provider
      const result = await GoogleSignIn();
      const user = result.user;

      // 🔥 FIX: Use the actual Firebase user object directly
      setUser(user); // This maintains the proper Firebase user structure

      // 🔹 Send user info to backend
      const newUser = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      };

      await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      // 🔹 Success message
      toast.success(`Welcome, ${user.displayName || "User"}!`);
      
      // 🔥 Small delay for better UX
      setTimeout(() => {
        navigate("/");
      }, 500);

    } catch (error) {
      console.error("❌ Google Sign-In Error:", error);
      toast.error("Failed to sign in with Google. Try again!");
    }
  };

  return (
    <div className="flex mt-5 items-center justify-center">
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center gap-3 bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] focus:ring-2 focus:ring-blue-400 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FcGoogle className="text-2xl" />
        <span className="font-medium text-base">Sign in with Google</span>
      </button>
    </div>
  );
};

export default GoogleSignIn;