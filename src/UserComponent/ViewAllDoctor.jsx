import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const ViewAllDoctor = () => {
  const [allDoctor, setAllDoctor] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await axios.get("http://localhost:8080/api/doctor/all");
      setAllDoctor(res.data || []);
    };
    load();
  }, []);

  const deleteDoctor = (id) => {
    fetch(`http://localhost:8080/api/user/delete/id?userId=${id}`, { method: "GET" })
      .then((r) => r.json())
      .then((d) => alert(d.responseMessage))
      .finally(() => window.location.reload());
  };

  return (
    <div className="doctors-page-container">
      <div className="doctors-card">
        <div className="doctors-header">
          <h2>All Doctors</h2>
        </div>
        <div className="doctors-body">
          <table className="doctors-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Id</th>
                <th>Specialist</th>
                <th>Experience</th>
                <th>Age</th>
                <th>Phone No</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allDoctor.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    <img
                      src={`http://localhost:8080/api/doctor/${doc.doctorImage}`}
                      alt={`${doc.firstName} ${doc.lastName}`}
                      className="doc-thumb"
                    />
                  </td>
                  <td>{doc.firstName}</td>
                  <td>{doc.lastName}</td>
                  <td>{doc.emailId}</td>
                  <td>{doc.specialist}</td>
                  <td>{doc.experience}</td>
                  <td>{doc.age}</td>
                  <td>{doc.contact}</td>
                  <td>
                    {doc.street} {doc.city} {doc.pincode}
                  </td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => deleteDoctor(doc.id)}
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

export default ViewAllDoctor;
