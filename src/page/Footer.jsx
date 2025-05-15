// src/components/Footer.js
import { Link } from "react-router-dom";
import "../App.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-branding">
          <h2 className="footer-title">CoreGlow</h2>
          <p className="footer-description">
            The hospital management system helps register complete patient
            information. It captures and stores the medical history,
            treatment required, details of previous visits,
            upcoming appointments, reports, insurance details and more.
            Eliminate redundant paperwork and focus on patient care.
          </p>
        </div>

        <hr className="footer-divider" />

        <div className="footer-signup">
          <span className="footer-signup-text">Register for free</span>
          <Link to="/user/patient/register">
            <button className="btn-signup">Sign up!</button>
          </Link>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <p>© 2025 CoreGlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
