import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import GoogleSignIn from "../GoogleSignIn/GoogleSignIn";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
    const { SignInUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        const email = e.target.email.value;
        const password = e.target.password.value;
        
        try {
            await SignInUser(email, password);
            toast.success("Login Successful!");
            navigate(from, { replace: true });
        } catch (error) {
            console.log(error);
            toast.error("Incorrect Email or Password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Glass Morphism Card */}
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                    <div className="p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                                Welcome Back
                            </h1>
                            <p className="text-white/70 text-sm">
                                Sign in to your account to continue
                            </p>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleLogin} className="space-y-6">
                            {/* Email Input */}
                            <div className="group">
                                <div className="relative">
                                    <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 group-focus-within:text-purple-400 transition-colors" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="group">
                                <div className="relative">
                                    <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 group-focus-within:text-purple-400 transition-colors" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                        required
                                        className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-purple-400 transition-colors"
                                    >
                                        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center text-white/70 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 text-purple-500 bg-white/10 border-white/20 rounded focus:ring-purple-400" />
                                    <span className="ml-2">Remember me</span>
                                </label>
                                <a href="/forgot-password" className="text-purple-300 hover:text-purple-400 transition-colors hover:underline">
                                    Forgot password?
                                </a>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                        Signing in...
                                    </div>
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/20"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-transparent text-white/50">Or continue with</span>
                            </div>
                        </div>

                        {/* Google Sign In */}
                        <div className="mb-6">
                            <GoogleSignIn />
                        </div>

                        {/* Sign Up Link */}
                        <div className="text-center">
                            <p className="text-white/70">
                                Don't have an account?{" "}
                                <a 
                                    href="/register" 
                                    className="text-purple-300 hover:text-purple-400 font-semibold transition-colors hover:underline"
                                >
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </div>
                    
                    {/* Decorative Bottom Bar */}
                    <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -z-10 -top-4 -left-4 w-20 h-20 bg-purple-400/20 rounded-full blur-lg"></div>
                <div className="absolute -z-10 -bottom-4 -right-4 w-20 h-20 bg-pink-400/20 rounded-full blur-lg"></div>
            </div>
        </div>
    );
}