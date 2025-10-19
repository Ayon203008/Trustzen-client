
import { use } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function Login() {
// assuming your AuthContext has LoginUser


    const {SignInUser}=use(AuthContext)
    const navigate=useNavigate()


    const handleLogin =(e)=>{
        e.preventDefault()
        const email=e.target.email.value
        const password=e.target.password.value
        console.log(email,password)
        SignInUser(email,password)
        .then(result=>{
            console.log(result.user)
            toast.success("Login Successfull")
            navigate('/')
            
        })
        .catch(error=>{
            console.log(error)
            toast.error("Incorrent Email or Password");
        })
    }

 

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700">
      <form
        onSubmit={handleLogin}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="w-full mb-3 bg-white/20 text-white placeholder-white/70 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-5 bg-white/20 text-white placeholder-white/70 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          type="submit"
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg transition"
        >
          Login
        </button>

        <p className="text-white/80 text-center mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-green-400 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
