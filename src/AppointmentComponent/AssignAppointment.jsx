import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AssignAppointment = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const cardRef = useRef();

  const [appointment, setAppointment] = useState({});
  const [doctors, setDoctors]         = useState([]);
  const [doctorId, setDoctorId]       = useState("");

  // fade‑in on mount
  useEffect(() => {
    cardRef.current.classList.add("assign-card-enter");

    // load appointment
    axios
      .get(`http://localhost:8080/api/appointment/id?appointmentId=${appointmentId}`)
      .then(res => setAppointment(res.data || {}))
      .catch(console.error);

    // load doctors
    axios
      .get("http://localhost:8080/api/doctor/all")
      .then(res => setDoctors(res.data || []))
      .catch(console.error);
  }, [appointmentId]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = new FormData();
    form.append("appointmentId", appointmentId);
    form.append("doctorId", doctorId);

    axios
      .post("http://localhost:8080/api/appointment/admin/assign/doctor", form)
      .then(() => {
        alert("Patient Appointment Assigned to Doctor");
        navigate("/admin/appointments/all");
      })
      .catch(err => {
        console.error(err);
        alert("Assignment failed.");
      });
  };

  return (
    <div className="assign-page-container">
      <div ref={cardRef} className="assign-card">
        <div className="assign-header">
          <h2>Assign Doctor</h2>
        </div>
        <form className="assign-body" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Patient Name</label>
            <input type="text" readOnly value={appointment.patientName || ""} />
          </div>

          <div className="form-group">
            <label>Problem Description</label>
            <textarea readOnly rows={3} value={appointment.problem || ""} />
          </div>

          <div className="form-group">
            <label>Appointment Date</label>
            <input type="text" readOnly value={appointment.appointmentDate || ""} />
          </div>

          <div className="form-group">
            <label>Select Doctor</label>
            <select
              required
              value={doctorId}
              onChange={e => setDoctorId(e.target.value)}
            >
              <option value="">— Choose —</option>
              {doctors.map(d => (
                <option key={d.id} value={d.id}>
                  {d.firstName} {d.lastName}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn-assign">
            Assign Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignAppointment;
