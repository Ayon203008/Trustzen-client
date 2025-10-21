import {  useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useContext } from "react";
import GoogleSignIn from "../GoogleSignIn/GoogleSignIn";

export default function Register() {
  const navigate = useNavigate();
  const { createUser } = useContext(AuthContext);

  const [imageFile, setImageFile] = useState(null);
  // post the image to the postimages
const uploadImageToImgBB = async (file) => {
  const formData = new FormData();
  formData.append("key",import.meta.env.VITE_IMGBB_API_KEY); 
  formData.append("image", file);

  try {
    const res = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    return data.data.url;
  } catch (error) {
    console.error("Image upload failed", error);
    toast.error("Image upload failed");
  }
};

  const handleRegister = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!imageFile) {
      toast.error("Please upload a profile image");
      return;
    }

    try {
      toast.loading("Uploading image...");
      const imageURL = await uploadImageToImgBB(imageFile);
      toast.dismiss();

      if (!imageURL) return;

      toast.loading("Creating account...");

      // 1️⃣ Create user in Firebase/Auth
      await createUser(email, password);

      // 2️⃣ POST to MongoDB backend
      const newUser = { name, email, password, image: imageURL };
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      toast.dismiss();

      if (res.ok) {
        toast.success("✅ Registration successful!");
        navigate("/login");
      } else {
        toast.error("❌ Failed to save user to database");
      }
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("❌ Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700">
      <form
        onSubmit={handleRegister}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Register
        </h1>

        <input
          type="text"
          required
          name="name"
          placeholder="Full Name"
          className="w-full mb-3 bg-white/20 text-white placeholder-white/70 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <input
          type="email"
          required
          name="email"
          placeholder="Email Address"
          className="w-full mb-3 bg-white/20 text-white placeholder-white/70 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <input
          type="password"
          required
          name="password"
          placeholder="Password"
          className="w-full mb-5 bg-white/20 text-white placeholder-white/70 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <input
          type="file"
          accept="image/*"
          required
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full mb-5 bg-white/20 text-white placeholder-white/70 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          type="submit"
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg transition"
        >
          Create Account
        </button>

        <GoogleSignIn></GoogleSignIn>
      </form>
    </div>
  );
}
