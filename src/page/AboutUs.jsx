import { FaLeaf, FaSmileBeam, FaBrain } from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';   // ← import useNavigate

const AboutUs = () => {
  const cardRef = useRef();
  const navigate = useNavigate();                  // ← get the nav hook

  useEffect(() => {
    cardRef.current.classList.add('about-card-enter');
  }, []);

  const handleGetStarted = () => {
    // Redirect straight to your patient registration route:
    navigate('/user/patient/register');
  };

  return (
    <div className="about-page-container">
      <div ref={cardRef} className="about-card">
        <h2 className="about-title">Welcome to CoreGlow</h2>
        <p className="about-subtitle">
          Your partner in mental wellness, one mindful step at a time.
        </p>

        <div className="about-features">
          <div className="feature-item">
            <FaLeaf className="feature-icon" />
            <h4 className="feature-title">Natural Calm</h4>
            <p className="feature-desc">
              Guided breathing and relaxation exercises to soothe your mind.
            </p>
          </div>

          <div className="feature-item">
            <FaSmileBeam className="feature-icon" />
            <h4 className="feature-title">Daily Uplifts</h4>
            <p className="feature-desc">
              Positive affirmations and tips delivered every morning.
            </p>
          </div>

          <div className="feature-item">
            <FaBrain className="feature-icon" />
            <h4 className="feature-title">Insightful Tracking</h4>
            <p className="feature-desc">
              Mood and habit tracking to help you discover healthy patterns.
            </p>
          </div>
        </div>

        {/* ← wire up the button to navigate */}
        <button className="btn-about" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
