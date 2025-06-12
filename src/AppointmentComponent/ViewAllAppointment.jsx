import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const ViewAllAppointment = () => {
  const [allAppointments, setAllAppointments] = useState([]);
  console.log("🏹 ViewAllAppointment rendered");

  useEffect(() => {
  axios
    .get("http://localhost:8080/api/appointment/all")
    .then((res) => {
      console.log("API Response", res.data);
      setAllAppointments(res.data || []);
    })
    .catch((err) => {
      console.error("API Error:", err);
    });
}, []);

  return (
    <div className="appointments-page-container">
      <div className="appointments-card">
        <div className="appointments-header">
          <h2>All Appointments</h2>
        </div>
        <div className="appointments-body">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Contact</th>
                <th>Problem</th>
                <th>Doctor</th>
                <th>Prescription</th>
                <th>Requested On</th>
                <th>App’t Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allAppointments.map((a) => (
                <tr key={a.id}>
                  <td>{a.patientName}</td>
                  <td>{a.patientContact}</td>
                  <td>{a.problem}</td>
                  <td>{a.doctorName}</td>
                  <td>{a.prescription}</td>
                  <td>{a.date}</td>
                  <td>{a.appointmentDate}</td>
                  <td>{a.status}</td>
                  <td>
                    {a.status !== "Cancel" ? (
                      a.doctorId === 0 ? (
                        <Link
                          to={`/admin/appointment/${a.id}/assign`}
                          className="btn-assign"
                        >
                          Assign to Doctor
                        </Link>
                      ) : (
                        <span className="assigned-label">Assigned</span>
                      )
                    ) : (
                      <span className="cancelled-label">Cancelled</span>
                    )}
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

export default ViewAllAppointment;
