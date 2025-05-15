import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UserLoginForm = () => {
  const navigate = useNavigate();
  const [loginRequest, setLoginRequest] = useState({
    emailId: "",
    password: "",
    role: "",
  });

  const handleUserInput = (e) =>
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });

  const loginAction = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(loginRequest),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.role === "admin") {
          sessionStorage.setItem("active-admin", JSON.stringify(res));
          sessionStorage.removeItem("active-doctor");
          sessionStorage.removeItem("active-patient");
        } else if (res.role === "doctor") {
          sessionStorage.setItem("active-doctor", JSON.stringify(res));
          sessionStorage.removeItem("active-admin");
          sessionStorage.removeItem("active-patient");
        } else if (res.role === "patient") {
          sessionStorage.setItem("active-patient", JSON.stringify(res));
          sessionStorage.removeItem("active-admin");
          sessionStorage.removeItem("active-doctor");
        }

        toast.success("Logged in successfully!", {
          position: "top-center",
          autoClose: 1000,
        });

        navigate("/home");
        window.location.reload();
      })
      .catch(() => {
        toast.error("Login failed. Check credentials.", {
          position: "top-center",
          autoClose: 1500,
        });
      });
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h3 className="login-title">Welcome Back</h3>
        <form onSubmit={loginAction} className="login-form">
          <label className="form-label">
            <span>User Role</span>
            <select
              name="role"
              value={loginRequest.role}
              onChange={handleUserInput}
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>
          </label>

          <label className="form-label">
            <span>Email Address</span>
            <input
              type="email"
              name="emailId"
              value={loginRequest.emailId}
              onChange={handleUserInput}
              required
            />
          </label>

          <label className="form-label">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={loginRequest.password}
              onChange={handleUserInput}
              autoComplete="on"
              required
            />
          </label>

          <button type="submit" className="btn-login">
            Login
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default UserLoginForm;
