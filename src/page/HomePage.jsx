// src/pages/HomePage.jsx
import Carousel from "./Carousel";
import axios from "axios";
import { useState, useEffect } from "react";
import Footer from "./Footer";
import DoctorCard from "../UserComponent/DoctorCard";
import { ILLNESS_DATA } from "../constant/data";
import "../App.css";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedIllness, setSelectedIllness] = useState(null);

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
      <section className="illness-section">
        <h2 className="section-title">Common Mental Health Conditions</h2>
        <div className="illness-chips">
          {Object.keys(ILLNESS_DATA).map((illness) => (
            <button
              key={illness}
              className="illness-chip"
              onClick={() => setSelectedIllness(illness)}
            >
              {illness}
            </button>
          ))}
        </div>
      </section>

      {selectedIllness && (
        <div className="illness-modal-overlay" onClick={() => setSelectedIllness(null)}>
          <div className="illness-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedIllness(null)}>×</button>
            <h2 className="modal-title">{selectedIllness}</h2>
            <div className="modal-content">
              <div className="modal-section">
                <h3 className="modal-section-title">Definition</h3>
                <p>{ILLNESS_DATA[selectedIllness].definition}</p>
              </div>
              <div className="modal-section">
                <h3 className="modal-section-title">Symptoms</h3>
                <p>{ILLNESS_DATA[selectedIllness].symptoms}</p>
              </div>
              <div className="modal-section">
                <h3 className="modal-section-title">Treatment</h3>
                <p>{ILLNESS_DATA[selectedIllness].treatment}</p>
              </div>
            </div>
          </div>
        </div>
      )}

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
