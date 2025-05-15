import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const ViewAllPatient = () => {
  const [allPatient, setAllPatient] = useState([]);

  useEffect(() => {
    const getAllPatient = async () => {
      const allPatient = await retrieveAllPatient();
      if (allPatient) {
        setAllPatient(allPatient);
      }
    };

    getAllPatient();
  }, []);

  const retrieveAllPatient = async () => {
    const response = await axios.get("http://localhost:8080/api/patient/all");
    console.log(response.data);
    return response.data;
  };

  const deletePatient = (patientId) => {
    fetch("http://localhost:8080/api/user/delete/id?userId=" + patientId, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((result) => {
      result.json().then((res) => {
        alert(res.responseMessage);
      });
    });

    window.location.reload(true);
  };

  return (
    <div className="patients-page-container">
      <div className="patients-card">
        <div className="patients-header">
          <h2>All Patients</h2>
        </div>
        <div className="patients-body">
          <table className="patients-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Id</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Blood Group</th>
                <th>Phone No</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allPatient.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.firstName}</td>
                  <td>{patient.lastName}</td>
                  <td>{patient.emailId}</td>
                  <td>{patient.age}</td>
                  <td>{patient.sex}</td>
                  <td>{patient.bloodGroup}</td>
                  <td>{patient.contact}</td>
                  <td>
                    {patient.street} {patient.city} {patient.pincode}
                  </td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => deletePatient(patient.id)}
                    >
                      Delete
                    </button>
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

export default ViewAllPatient;
