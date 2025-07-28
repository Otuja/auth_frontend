import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${apiUrl}/api/account/login/`, formData);
      localStorage.setItem("authToken", res.data.token);
      toast.success("Logged in successfully");
      navigate("/dashboard");
    } catch (err) {
      const message = err?.response?.data?.detail || "Login failed. Please try again.";
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
      });
      // console.error(err.response.data);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-yellow-500 md:bg-gradient-to-r md:from-yellow-500 md:to-white">
      <div className="flex flex-col md:flex-row md:max-w-4xl md:bg-white md:rounded-3xl md:shadow-2xl md:overflow-hidden">
        {/* Left Section (Header + Description) for Desktop */}
        <div className="md:w-1/2 md:bg-yellow-500 md:p-10 md:flex md:flex-col md:justify-between">
          <div className="p-8 md:p-0 flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="text-2xl text-black md:text-white"
            >
              <GoArrowLeft />
            </button>
            <button
              onClick={() => navigate("/register")}
              className="font-semibold text-black md:text-white hover:underline"
            >
              Register
            </button>
          </div>
          <div className="space-y-4 p-8 md:mt-10 md:p-0">
            <h1 className="text-3xl md:text-4xl font-semibold text-black md:text-white">
              Sign In
            </h1>
            <p className="text-sm md:text-base text-black md:text-white">
              Securely sign in to access your dashboard, manage your account,
              and explore all features. Your information is protected with
              industry-standard encryption and authentication methods.
            </p>
          </div>
        </div>

        {/* Right Section (Form + OAuth) */}
        <div className="flex-1 bg-white p-8 rounded-t-4xl md:rounded-t-none  md:p-10 md:w-1/2">
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="text"
              placeholder="Username"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="py-4 px-5 bg-gray-100 w-full rounded-full md:rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="py-4 px-5 bg-gray-100 w-full rounded-full md:rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <div className="flex justify-end">
              <a href="#" className="text-sm text-gray-600 hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="py-4 px-5 bg-black text-white w-full rounded-full md:rounded-lg md:hover:bg-gray-800 transition-colors"
            >
              Sign In
            </button>
          </form>

          {/* OAuth Section */}
          <div className="mt-6 bg-gray-100 p-6 rounded-3xl md:rounded-lg">
            <button className="flex items-center justify-between w-full py-4 px-5 bg-white shadow-md rounded-full md:rounded-lg hover:shadow-lg transition-shadow">
              <FcGoogle className="text-2xl" />
              <span className="text-gray-700">Continue with Google</span>
              <GoArrowRight className="text-2xl text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* react toastify to handle messages */}
      <ToastContainer />
    </section>
  );
};

export default Login;
