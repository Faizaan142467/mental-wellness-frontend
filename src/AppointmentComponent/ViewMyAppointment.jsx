import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ViewMyAppointment = () => {
  const navigate = useNavigate();
  const patient = JSON.parse(sessionStorage.getItem("active-patient"));
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/appointment/patient/id?patientId=${patient.id}`)
      .then(res => setAppointments(res.data || []))
      .catch(console.error);
  }, [patient.id]);

  const cancelAppointment = (id) => {
    fetch("http://localhost:8080/api/appointment/patient/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ appointmentId: id, status: "Cancel" }),
    })
      .then(r => r.json())
      .then(msg => {
        toast.success(msg, { position: "top-center", autoClose: 1000 });
        navigate("/patient/appointments");
        setTimeout(() => window.location.reload(), 1200);
      });
  };

  return (
    <div className="my-appointments-page-container">
      <div className="my-appointments-card">
        <div className="my-appointments-header">
          <h2>My Appointments</h2>
        </div>
        <div className="my-appointments-body">
          <table className="my-appointments-table">
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
              {appointments.map(a => (
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
                    {a.status === "Not Assigned to Doctor" && (
                      <button
                        onClick={() => cancelAppointment(a.id)}
                        className="btn-cancel"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ViewMyAppointment;
