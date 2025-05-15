import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const UserRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cardRef = useRef();

  // Determine role from URL
  const role = location.pathname.includes("/admin")
    ? "admin"
    : location.pathname.includes("/doctor")
    ? "doctor"
    : "patient";

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    contact: "",
    street: "",
    city: "",
    pincode: "",
    role,
    age: "",
    sex: "",
    bloodGroup: "",
    specialist: "",
  });

  const [genders, setGenders] = useState([]);
  const [bloodGroups, setBloodGroups] = useState([]);
  const [specialists, setSpecialists] = useState([]);

  useEffect(() => {
    // fade-in
    cardRef.current.classList.add("register-card-enter");

    // fetch dropdown data
    axios.get("http://localhost:8080/api/user/gender")
      .then((res) => setGenders(res.data.genders || []))
      .catch(() => {});

    axios.get("http://localhost:8080/api/patient/bloodgroup/all")
      .then((res) => setBloodGroups(res.data || []))
      .catch(() => {});

    axios.get("http://localhost:8080/api/doctor/specialist/all")
      .then((res) => setSpecialists(res.data || []))
      .catch(() => {});
  }, []);

  const handleInput = (e) =>
    setUser((u) => ({ ...u, [e.target.name]: e.target.value }));

  const saveUser = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/user/register", user)
      .then(() => {
        toast.success(`${role} registered successfully!`, {
          position: "top-center",
          autoClose: 1500,
        });
        setTimeout(() => navigate("/home"), 1600);
      })
      .catch(() => {
        toast.error("Registration failed", { position: "top-center" });
      });
  };

  return (
    <div className="register-page-container">
      <div ref={cardRef} className="register-card">
        <h2 className="register-title">Register as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
        <form className="register-form" onSubmit={saveUser}>
          <div className="row">
            {[
              { name: "firstName", label: "First Name", type: "text" },
              { name: "lastName", label: "Last Name", type: "text" },
              { name: "emailId", label: "Email Id", type: "email" },
              { name: "password", label: "Password", type: "password" },
              { name: "contact", label: "Contact No.", type: "tel" },
              { name: "age", label: "Age", type: "number" },
            ].map((fld) => (
              <div key={fld.name} className="form-group">
                <label>{fld.label}</label>
                <input
                  name={fld.name}
                  type={fld.type}
                  value={user[fld.name]}
                  onChange={handleInput}
                  required
                />
              </div>
            ))}

            <div className="form-group">
              <label>Gender</label>
              <select name="sex" value={user.sex} onChange={handleInput} required>
                <option value="">Select Gender</option>
                {genders.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Blood Group</label>
              <select name="bloodGroup" value={user.bloodGroup} onChange={handleInput} required>
                <option value="">Select Blood Group</option>
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            {role === "doctor" && (
              <div className="form-group">
                <label>Specialist</label>
                <select name="specialist" value={user.specialist} onChange={handleInput} required>
                  <option value="">Select Specialist</option>
                  {specialists.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="form-group wide">
              <label>Street Address</label>
              <textarea
                name="street"
                rows="2"
                value={user.street}
                onChange={handleInput}
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                name="city"
                type="text"
                value={user.city}
                onChange={handleInput}
                required
              />
            </div>
            <div className="form-group">
              <label>Pincode</label>
              <input
                name="pincode"
                type="text"
                value={user.pincode}
                onChange={handleInput}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-register">
            Submit
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default UserRegister;
