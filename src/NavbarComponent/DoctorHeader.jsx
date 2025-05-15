import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const DoctorHeader = () => {
  const navigate = useNavigate();

  const userLogout = () => {
    toast.success("Logged out!", {
      position: "top-center",
      autoClose: 2000,
    });
    sessionStorage.removeItem("active-doctor");
    navigate("/home");
    window.location.reload();
  };

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li className="nav-item">
        <Link
          to="/doctor/appointment/all"
          className="nav-link active text-color"
          aria-current="page"
        >
          <b>View My Appointments</b>
        </Link>
      </li>

      <li className="nav-item">
        <button
          onClick={userLogout}
          className="btn nav-link p-0 active text-color"
          style={{ background: "none", border: "none" }}
        >
          <b>Logout</b>
        </button>
      </li>
      <ToastContainer />
    </ul>
  );
};

export default DoctorHeader;

