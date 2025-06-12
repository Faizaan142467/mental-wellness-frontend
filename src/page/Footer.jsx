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
            CoreGlow is a mental wellness app designed to support your emotional health through real conversations and professional care. Chat privately with our AI-powered mental health assistant for immediate support, or easily book appointments with certified psychiatrists and psychologists. CoreGlow is your safe, judgment-free space to express, connect, and begin your journey to better mental well-being.
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
