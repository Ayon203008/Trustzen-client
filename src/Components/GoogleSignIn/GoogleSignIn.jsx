import React, { use } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";

const GoogleSignIn = () => {

    const {GoogleSignIn}=use(AuthContext)
    const navigate =useNavigate()

  const handleGoogleSignIn = () => {
    // Your Google sign-in logic here
    GoogleSignIn()
    .then((result)=>{
        console.log(result)
        alert("success")
        navigate("/")
    })
    .catch((error)=>{
        console.log(error)
    })
  };

  return (
    <div className="flex mt-5 items-center justify-center">
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center gap-3 bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03] focus:ring-2 focus:ring-blue-400 active:scale-95"
      >
        <FcGoogle className="text-2xl" />
        <span className="font-medium text-base">Sign in with Google</span>
      </button>
    </div>
  );
};

export default GoogleSignIn;
