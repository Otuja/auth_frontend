import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordRequest = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleResetRequest = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      const res = await axios.post(
        `${apiUrl}/api/account/password-reset/request/`,
        { username }
      );
      toast.success(res.data.detail, {
        position: "top-right",
        autoClose: 5000,
      });
      setTimeout(
        () => navigate("/password-reset/verify", { state: { username } }),
        2000
      );
    } catch (err) {
      const message =
        err?.response?.data?.detail ||
        "Failed to send password reset OTP. Please try again.";
      toast.error(message, { position: "top-right", autoClose: 5000 });
    }
  };

  return (
    <section className="min-h-screen flex  bg-yellow-500 md:justify-center md:items-center md:bg-gradient-to-r md:from-yellow-500 md:to-white">
      <div className="flex flex-col justify-between  md:flex-row md:max-w-4xl md:bg-white md:rounded-3xl md:shadow-2xl md:overflow-hidden">
        <div className="md:w-1/2 md:bg-yellow-500 md:p-10 md:flex md:flex-col md:justify-between h-1/2 md:h-auto">
          <div className="p-8 md:p-0 flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="text-2xl text-black md:text-white"
            >
              <GoArrowLeft />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="font-semibold text-black md:text-white hover:underline"
            >
              Sign In
            </button>
          </div>
          <div className="space-y-4 p-8 md:mt-10 md:p-0">
            <h1 className="text-3xl md:text-4xl font-semibold text-black md:text-white">
              Reset Password
            </h1>
            <p className="text-sm md:text-base text-black md:text-white">
              Enter your username to receive a password reset OTP via email.
            </p>
          </div>
        </div>
        <div className="flex  bg-white p-8 rounded-t-4xl md:rounded-t-none md:p-10 md:w-1/2 h-1/2 md:h-auto">
          <form onSubmit={handleResetRequest} className="space-y-6">
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className="py-4 px-5 bg-gray-100 w-full rounded-full md:rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="py-4 px-5 bg-black text-white w-full rounded-full md:rounded-lg md:hover:bg-gray-800 transition-colors"
            >
              Send OTP
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default ResetPasswordRequest;
