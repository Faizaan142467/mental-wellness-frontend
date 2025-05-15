import { useState, useRef, useEffect } from "react";
import { FaEnvelopeOpenText, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const cardRef = useRef();

  // Fade-in on mount
  useEffect(() => {
    cardRef.current.classList.add("contact-card-enter");
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Stub: you can wire up your real API here
    toast.success("Your message has been sent!", {
      position: "top-center",
      autoClose: 1500,
    });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page-container">
      <div ref={cardRef} className="contact-card">
        <h2 className="contact-title">Get in Touch</h2>
        <p className="contact-subtitle">
          We’d love to hear from you. Fill out the form below and we’ll get back to you!
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              placeholder="Type your message here..."
              required
            />
          </div>

          <button type="submit" className="btn-contact">
            Send Message
          </button>
        </form>

        <div className="contact-info">
          <div><FaEnvelopeOpenText /> support@coreglow.com</div>
          <div><FaPhoneAlt /> +1 (555) 123-4567</div>
          <div><FaMapMarkerAlt /> 123 Wellness Blvd, Harmony City</div>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default ContactUs;
