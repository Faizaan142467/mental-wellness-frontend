import { useState, useEffect, useRef } from "react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const ViewDoctorAppointment = () => {
  const doctor = JSON.parse(sessionStorage.getItem("active-doctor"));
  const [appointments, setAppointments] = useState([]);
  const cardRef = useRef();

  useEffect(() => {
    // fade-in
    cardRef.current.classList.add("appointments-card-enter");

    axios
      .get(`http://localhost:8080/api/appointment/doctor/id?doctorId=${doctor.id}`)
      .then((res) => setAppointments(res.data || []))
      .catch(console.error);
  }, [doctor.id]);

  return (
    <div className="doctor-appointments-page-container">
      <div ref={cardRef} className="doctor-appointments-card">
        <div className="appointments-header">
          <h2>My Appointments</h2>
        </div>
        <div className="appointments-body">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Contact</th>
                <th>Problem</th>
                <th>Doctor</th>
                <th>Prescription</th>
                <th>Requested On</th>
                <th>App’t Date</th>
                <th>Status</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id}>
                  <td>{a.patientName}</td>
                  <td>{a.patientContact}</td>
                  <td>{a.problem}</td>
                  <td>{a.doctorName}</td>
                  <td>{a.prescription}</td>
                  <td>{a.date}</td>
                  <td>{a.appointmentDate}</td>
                  <td>{a.status}</td>
                  <td>{a.price}</td>
                  <td>
                    <Link
                      to={`/doctor/appointment/${a.id}/update`}
                      className="btn-update"
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewDoctorAppointment;
