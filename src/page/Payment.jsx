import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {
  // 1) Always call hooks at the top
  const navigate = useNavigate();
  const location = useLocation();
  const cardRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // 2) Grab appointment from router state (might be undefined)
  const appointment = location.state?.appointment;

  // Destructure safely (won't throw since appointment may be undefined here)
  const patientId = appointment?.patientId;
  const problem = appointment?.problem;
  const appointmentDate = appointment?.appointmentDate;
  const amount = appointment?.amount;

  // 3) Single effect for both redirect & animation
  useEffect(() => {
    if (!appointment) {
      // If no appointment data, send them back
      navigate("/take-appointment");
      return;
    }
    // If we do have data, play the enter animation
    if (cardRef.current) {
      cardRef.current.classList.add("payment-card-enter");
    }
  }, [appointment, navigate]);

  // Helper to load Razorpay SDK
  const loadRazorpay = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    setLoading(true);

    const sdkLoaded = await loadRazorpay();
    if (!sdkLoaded) {
      toast.error("Failed to load payment gateway.", { position: "top-center" });
      setLoading(false);
      return;
    }

    // 1) Create order
    const orderRes = await fetch("http://localhost:8080/api/payments/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, currency: "INR" }),
    }).then((r) => r.json());

    // 2) Configure checkout
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // your env var
      amount: orderRes.amount,
      currency: orderRes.currency,
      order_id: orderRes.orderId || orderRes.id,
      name: "Mental Wellness Clinic",
      description: "Appointment Booking",
      prefill: { name: "" }, // optional
      handler: async (response) => {
        console.log("Creating order for amount (paise):", amount);
        // 3) On success, save appointment
        const saveRes = await fetch(
          "http://localhost:8080/api/appointment/patient/add",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ patientId, problem, appointmentDate }),
          }
        );
        if (!saveRes.ok) {
          toast.error("Booking failed—please try again.", {
            position: "top-center",
          });
          setLoading(false);
          return;
        }
        toast.success("Appointment confirmed!", { position: "top-center" });
        navigate("/patient/appointments");
      },
      theme: { color: "#8A001D" },
    };

    new window.Razorpay(options).open();
    setLoading(false);
  };

  // 4) If redirecting, render nothing
  if (!appointment) {
    return null;
  }

  // 5) Actual UI
  return (
    <div className="payment-page-container">
      <div ref={cardRef} className="payment-card">
        <h2 className="payment-title">Complete Your Payment</h2>
        <p className="payment-subtitle">
          You will be charged ₹{(amount / 100).toFixed(2)} for your appointment.
        </p>
        <button
          className="btn-payment"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing…" : "Pay Now"}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Payment;
