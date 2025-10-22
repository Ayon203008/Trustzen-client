import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useContext } from "react";
import GoogleSignIn from "../GoogleSignIn/GoogleSignIn";

export default function Register() {
  const navigate = useNavigate();
  const { createUser, setUser } = useContext(AuthContext);

  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image to ImgBB
  const uploadImageToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("key", import.meta.env.VITE_IMGBB_API_KEY);
    formData.append("image", file);

    try {
      const res = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      return data.data.url;
    } catch (error) {
      console.error("Image upload failed", error);
      toast.error("Image upload failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!imageFile) {
      toast.error("Please upload a profile image");
      setIsLoading(false);
      return;
    }

    try {
      toast.loading("Uploading image...");
      const imageURL = await uploadImageToImgBB(imageFile);
      toast.dismiss();

      if (!imageURL) {
        setIsLoading(false);
        return;
      }

      toast.loading("Creating account...");

      // ✅ Firebase user creation
      const userCredential = await createUser(email, password);
      const user = userCredential.user;

      // ✅ Firebase profile update
      await updateProfile(user, {
        displayName: name,
        photoURL: imageURL,
      });
     
      setUser({
  ...user,
  displayName: name,
  photoURL: imageURL
});
      // ✅ Send data to your MongoDB backend
      const newUser = { name, email, password, image: imageURL };
      const res = await fetch("https://trust-zen.vercel.app/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      toast.dismiss();
      setIsLoading(false);

      if (res.ok) {
        toast.success("🎉 Registration successful!");
        navigate("/login");
      } else {
        toast.error("❌ Failed to save user to database");
      }
    } catch (error) {
      console.error(error);
      toast.dismiss();
      setIsLoading(false);
      toast.error("❌ Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        <form
          onSubmit={handleRegister}
          className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 space-y-6 transform transition-all duration-300 hover:shadow-3xl"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Join Us
            </h1>
            <p className="text-white/70 text-sm">
              Create your account and start your journey
            </p>
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <label className="text-white/80 text-sm font-medium">Full Name</label>
            <input
              type="text"
              required
              name="name"
              placeholder="Enter your full name"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-white/80 text-sm font-medium">Email</label>
            <input
              type="email"
              required
              name="email"
              placeholder="Enter your email"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-white/80 text-sm font-medium">Password</label>
            <input
              type="password"
              required
              name="password"
              placeholder="Create a password"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Profile Picture Upload */}
          <div className="space-y-2">
            <label className="text-white/80 text-sm font-medium">
              Profile Picture
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={handleImageChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-400 transition-all duration-300"
                />
              </div>
              {previewImage && (
                <div className="w-12 h-12 rounded-full border-2 border-cyan-400 overflow-hidden">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          {/* Divider */}
          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-white/20"></div>
            <span className="flex-shrink mx-4 text-white/50 text-sm">or</span>
            <div className="flex-grow border-t border-white/20"></div>
          </div>

          {/* Google Sign In */}
          <GoogleSignIn />

          {/* Login Link */}
          <div className="text-center">
            <p className="text-white/70 text-sm">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-300"
              >
                Sign In
              </button>
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white/40 text-xs">
            By registering, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}