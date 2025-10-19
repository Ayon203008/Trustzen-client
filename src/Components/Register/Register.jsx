import { use } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useContext } from "react";

export default function Register() {
  const navigate = useNavigate();
  const { createUser } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const image = e.target.image.value;

    const newUser = { name, email, password, image };

    try {
      // 1️⃣ Create user in Firebase/Auth (if you still want this)
      await createUser(email, password);

      // 2️⃣ POST to backend MongoDB
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        toast.success("✅ Registration successful!");
        navigate("/login");
      } else {
        toast.error("❌ Failed to save user to database");
      }
    } catch (error) {
      console.error(error);
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
          type="url"
          required
          name="image"
          placeholder="Image Link"
          className="w-full mb-5 bg-white/20 text-white placeholder-white/70 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          type="submit"
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg transition"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
