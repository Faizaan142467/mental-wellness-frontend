// src/pages/HomePage.jsx
import Carousel from "./Carousel";
import axios from "axios";
import { useState, useEffect } from "react";
import Footer from "./Footer";
import DoctorCard from "../UserComponent/DoctorCard";
import "../App.css";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    const res = await axios.get("http://localhost:8080/api/doctor/all");
    return res.data;
  };

  useEffect(() => {
    (async () => {
      const list = await fetchDoctors();
      if (list) setDoctors(list);
    })();
  }, []);

  return (
    <div className="homepage-container">
      <Carousel />

      <section className="doctors-section">
        <h3 className="section-title">Our Expert Doctors</h3>
        <div className="doctor-grid">
          {doctors.map((doc) => (
            <DoctorCard key={doc.id} item={doc} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
