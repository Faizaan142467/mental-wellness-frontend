import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const TreatAppointment = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const cardRef = useRef();

  const [appointment, setAppointment] = useState({});
  const [prescription, setPrescription] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    // fade-in effect
    cardRef.current.classList.add("treat-card-enter");

    // load appointment details
    axios
      .get(`http://localhost:8080/api/appointment/id?appointmentId=${appointmentId}`)
      .then((res) => setAppointment(res.data))
      .catch(console.error);
  }, [appointmentId]);

  const saveAppointment = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("appointmentId", appointmentId);
    form.append("prescription", prescription);
    form.append("status", status);

    axios
      .post("http://localhost:8080/api/appointment/doctor/update", form)
      .then(() => {
        alert("Appointment updated successfully!");
        navigate("/home");
      })
      .catch(() => alert("Failed to update appointment."));
  };

  return (
    <div className="treat-page-container">
      <div ref={cardRef} className="treat-card">
        <h2 className="treat-title">Treat Appointment</h2>
        <form className="treat-form" onSubmit={saveAppointment}>
          <div className="form-group">
            <label>Patient Name</label>
            <input type="text" readOnly value={appointment.patientName || ""} />
          </div>
          <div className="form-group">
            <label>Problem Description</label>
            <textarea readOnly rows="2" value={appointment.problem || ""} />
          </div>
          <div className="form-group">
            <label>Appointment Date</label>
            <input type="text" readOnly value={appointment.appointmentDate || ""} />
          </div>
          <div className="form-group">
            <label>Prescription</label>
            <textarea
              rows="3"
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Appointment Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Select Status</option>
              <option value="Treatment Done">Treatment Done</option>
              <option value="Cancel">Cancel</option>
            </select>
          </div>
          <button type="submit" className="btn-treat">
            Update Status
          </button>
        </form>
      </div>
    </div>
  );
};

export default TreatAppointment;
