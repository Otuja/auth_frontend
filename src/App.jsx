import { Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import OtpVerify from "./pages/OtpVerify.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";

import ResetPasswordRequest from "./pages/ResetPasswordRequest";
import ResetPasswordVerify from "./pages/ResetPasswordVerify";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<OtpVerify />} />
        <Route
          path="/password-reset/request"
          element={<ResetPasswordRequest />}
        />
        <Route
          path="/password-reset/verify"
          element={<ResetPasswordVerify />}
        />
        <Route
          path="/password-reset/confirm"
          element={<ResetPasswordConfirm />}
        />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;
