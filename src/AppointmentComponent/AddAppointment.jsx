import { useState, useRef, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const AddAppointment = () => {
  const patient = JSON.parse(sessionStorage.getItem("active-patient"));
  const [appointment, setAppointment] = useState({
    patientId: patient.id,
    problem: "",
    appointmentDate: "",
  });
  const cardRef = useRef();

  useEffect(() => {
    // fade-in entrance
    cardRef.current.classList.add("book-card-enter");
  }, []);

  const handleInput = (e) =>
    setAppointment({ ...appointment, [e.target.name]: e.target.value });

  const saveAppointment = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/appointment/patient/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointment),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to book");
        return res.json();
      })
      .then(() => {
        toast.success("Appointment added successfully!", {
          position: "top-center",
          autoClose: 1000,
        });
      })
      .catch(() =>
        toast.error("Could not book appointment.", {
          position: "top-center",
          autoClose: 1500,
        })
      );
  };

  return (
    <div className="book-page-container">
      <div ref={cardRef} className="book-card">
        <h2 className="book-title">Book Appointment</h2>
        <form className="book-form" onSubmit={saveAppointment}>
          <div className="form-group">
            <label>Describe Your Problem</label>
            <textarea
              name="problem"
              rows="3"
              value={appointment.problem}
              onChange={handleInput}
              placeholder="I’m experiencing…"
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
            Book Appointment
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddAppointment;
