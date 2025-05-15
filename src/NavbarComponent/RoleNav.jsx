import AdminHeader   from "./AdminHeader";
import DoctorHeader  from "./DoctorHeader";
import PatientHeader from "./PatientHeader";
import NormalHeader  from "./NormalHeader";

const RoleNav = () => {
  const admin   = sessionStorage.getItem("active-admin");
  const doctor  = sessionStorage.getItem("active-doctor");
  const patient = sessionStorage.getItem("active-patient");

  if (admin)   return <AdminHeader />;
  if (doctor)  return <DoctorHeader />;
  if (patient) return <PatientHeader />;
  return <NormalHeader />;
};

export default RoleNav;
