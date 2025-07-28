import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("No active session found.", {
          position: "top-right",
          autoClose: 5000,
        });
        navigate("/login");
        return;
      }
      const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      const res = await axios.post(
        `${apiUrl}/api/account/logout/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      localStorage.removeItem("authToken");
      toast.success(res.data.detail, {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      const message =
        err?.response?.data?.detail || "Logout failed. Please try again.";
      toast.error(message, { position: "top-right", autoClose: 5000 });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-2">
      <div className="flex flex-col border text-black space-y-5 items-center p-5 rounded-xl">
        <p className="text-sm md:text-base">
          Welcome to your secure dashboard! Manage your account or log out
          below.
        </p>
        <button
          onClick={handleLogout}
          className="py-4 px-5 cursor-pointer rounded-xl bg-black text-white"
        >
          Log Out
        </button>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Dashboard;
