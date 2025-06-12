import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddAppointment = () => {
  const navigate = useNavigate();
  const patient = JSON.parse(sessionStorage.getItem("active-patient"));
  const [appointment, setAppointment] = useState({
    patientId: patient.id,
    problem: "",
    appointmentDate: "",
    amount: 50000, // ₹500 in paise
  });
  const cardRef = useRef();

  useEffect(() => {
    cardRef.current.classList.add("book-card-enter");
  }, []);

  const handleInput = (e) =>
    setAppointment({ ...appointment, [e.target.name]: e.target.value });

  const proceedToPayment = (e) => {
    e.preventDefault();
    // validate
    if (!appointment.problem || !appointment.appointmentDate) {
      toast.error("Fill all fields.", { position: "top-center" });
      return;
    }
    // go to Payment.jsx, passing appointment
    navigate("/payment", { state: { appointment } });
  };

  return (
    <div className="book-page-container">
      <div ref={cardRef} className="book-card">
        <h2 className="book-title">Book Appointment</h2>
        <form className="book-form" onSubmit={proceedToPayment}>
          <div className="form-group">
            <label>Describe Your Problem</label>
            <textarea
              name="problem"
              rows="3"
              value={appointment.problem}
              onChange={handleInput}
              required
            />
          </div>
          <div className="form-group">
            <label>Select Appointment Date</label>
            <input
              type="date"
              name="appointmentDate"
              value={appointment.appointmentDate}
              onChange={handleInput}
              required
            />
          </div>
          <button type="submit" className="btn-book">
            Proceed to Payment
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddAppointment;
