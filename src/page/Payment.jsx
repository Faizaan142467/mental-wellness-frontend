import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const cardRef = useRef();
    const [loading, setLoading] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState({
        amount: location.state?.amount || 100,
        appointmentId: location.state?.appointmentId || "",
        patientName: location.state?.patientName || "",
        doctorName: location.state?.doctorName || "",
    });

    useEffect(() => {
        // Fade-in animation
        cardRef.current.classList.add("payment-card-enter");
    }, []);

    const initializeRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        try {
            setLoading(true);

            // Initialize Razorpay
            const res = await initializeRazorpay();
            if (!res) {
                toast.error("Razorpay SDK failed to load", {
                    position: "top-center",
                    autoClose: 2000,
                });
                return;
            }

            // Create order using the provided API endpoint
            const orderData = await axios.post(
                "http://localhost:8080/api/payments/create",
                {
                    amount: 10000,
                    currency: "INR",
                    receipt: "receipt_123",
                    notes: "Payment for appointment",
                }
            );

            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: orderData.data.amount,
                currency: orderData.data.currency,
                name: "Mental Wellness Clinic",
                description: `Payment for appointment with Dr. ${paymentDetails.doctorName}`,
                order_id: orderData.data.id,
                handler: async function (response) {
                    try {
                        console.log("options", options);
                        // Verify payment on backend
                        const verificationData = await axios.post(
                            "http://localhost:8080/api/payments/verify",
                            {
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                appointmentId: paymentDetails.appointmentId,
                            }
                        );

                        if (verificationData.data.success) {
                            toast.success("Payment successful!", {
                                position: "top-center",
                                autoClose: 2000,
                            });
                            navigate("/patient/appointments");
                        }
                    } catch (error) {
                        toast.error("Payment verification failed", {
                            position: "top-center",
                            autoClose: 2000,
                        });
                    }
                },
                prefill: {
                    name: paymentDetails.patientName,
                },
                theme: {
                    color: "#8A001D",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error("Payment error:", error);
            toast.error(
                error.response?.data?.message || "Payment initialization failed",
                {
                    position: "top-center",
                    autoClose: 2000,
                }
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payment-page-container">
            <div ref={cardRef} className="payment-card">
                <div className="card-header">
                    <div className="header-content">
                        {/* <div className="payment-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                                <line x1="1" y1="10" x2="23" y2="10"></line>
                            </svg>
                        </div> */}
                        <h2 className="payment-title">Complete Your Payment</h2>
                    </div>
                    <p className="payment-subtitle">Please review your payment details before proceeding</p>
                </div>

                <div className="card-body">
                    <div className="payment-details">
                        <div className="detail-row">
                            <div className="detail-item">
                                <span className="label">Patient Name</span>
                                <span className="value">{paymentDetails.patientName}</span>
                            </div>
                        </div>
                        <div className="detail-row">
                            <div className="detail-item">
                                <span className="label">Doctor Name</span>
                                <span className="value">Dr. {paymentDetails.doctorName}</span>
                            </div>
                        </div>
                        <div className="amount-section">
                            <div className="amount-label">Total Amount</div>
                            <div className="amount-value">₹{paymentDetails.amount}</div>
                        </div>
                    </div>

                    <button
                        className="btn-payment"
                        onClick={handlePayment}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="spinner"></span>
                        ) : (
                            <>
                                <span>Pay Now</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </>
                        )}
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Payment;
