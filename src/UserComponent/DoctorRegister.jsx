import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DoctorRegister = () => {
  const navigate = useNavigate();
  const cardRef = useRef();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    contact: "",
    street: "",
    city: "",
    pincode: "",
    role: "doctor",
    age: "",
    sex: "",
    specialist: "",
    experience: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [genders, setGenders] = useState([]);
  const [specialists, setSpecialists] = useState([]);

  useEffect(() => {
    // fade-in
    cardRef.current.classList.add("register-card-enter");

    // fetch dropdown data
    axios.get("http://localhost:8080/api/user/gender")
      .then((res) => setGenders(res.data.genders || []))
      .catch(() => {});
    axios.get("http://localhost:8080/api/doctor/specialist/all")
      .then((res) => setSpecialists(res.data || []))
      .catch(() => {});
  }, []);

  const handleChange = (e) =>
    setUser((u) => ({ ...u, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("image", imageFile);
    Object.entries(user).forEach(([k, v]) => form.append(k, v));

    axios.post("http://localhost:8080/api/doctor/register", form)
      .then(() => {
        toast.success("Doctor Registered Successfully!", {
          position: "top-center",
          autoClose: 1200,
        });
        setTimeout(() => navigate("/home"), 1400);
      })
      .catch(() => {
        toast.error("Registration failed.", { position: "top-center" });
      });
  };

  return (
    <div className="register-page-container">
      <div ref={cardRef} className="register-card">
        <h2 className="register-title">Register Doctor</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="form-group">
              <span>First Name</span>
              <input
                name="firstName"
                type="text"
                value={user.firstName}
                onChange={handleChange}
                required
              />
            </label>
            <label className="form-group">
              <span>Last Name</span>
              <input
                name="lastName"
                type="text"
                value={user.lastName}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label className="form-group">
              <span>Email Id</span>
              <input
                name="emailId"
                type="email"
                value={user.emailId}
                onChange={handleChange}
                required
              />
            </label>
            <label className="form-group">
              <span>Password</span>
              <input
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label className="form-group">
              <span>Gender</span>
              <select
                name="sex"
                value={user.sex}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                {genders.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </label>
            <label className="form-group">
              <span>Specialist</span>
              <select
                name="specialist"
                value={user.specialist}
                onChange={handleChange}
                required
              >
                <option value="">Select Specialist</option>
                {specialists.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="form-row">
            <label className="form-group">
              <span>Experience (years)</span>
              <input
                name="experience"
                type="number"
                value={user.experience}
                onChange={handleChange}
                required
              />
            </label>
            <label className="form-group">
              <span>Age</span>
              <input
                name="age"
                type="number"
                value={user.age}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label className="form-group wide">
              <span>Street Address</span>
              <textarea
                name="street"
                rows="2"
                value={user.street}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="form-row">
            <label className="form-group">
              <span>City</span>
              <input
                name="city"
                type="text"
                value={user.city}
                onChange={handleChange}
                required
              />
            </label>
            <label className="form-group">
              <span>Pincode</span>
              <input
                name="pincode"
                type="text"
                value={user.pincode}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label className="form-group wide">
              <span>Doctor Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                required
              />
            </label>
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

export default DoctorRegister;
