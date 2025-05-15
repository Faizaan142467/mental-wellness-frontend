import { FaSpa, FaBrain, FaRegSmile } from 'react-icons/fa';
import { useEffect } from 'react';

const slides = [
  {
    id: 1,
    icon: <FaSpa />,
    title: "Breathe & Relax",
    desc: "Find calm with guided breathing exercises.",
  },
  {
    id: 2,
    icon: <FaRegSmile />,
    title: "Mindful Moments",
    desc: "Stay present with short, daily mindfulness tips.",
  },
  {
    id: 3,
    icon: <FaBrain />,
    title: "Boost Your Mood",
    desc: "Track your feelings and discover patterns.",
  },
];

const Carousel = () => {
  // auto-advance every 5s
  useEffect(() => {
    const elems = document.querySelectorAll(".banner-carousel .carousel-item");
    let idx = 0;
    const tick = () => {
      elems[idx].classList.remove("active");
      idx = (idx + 1) % elems.length;
      elems[idx].classList.add("active");
    };
    const handle = setInterval(tick, 5000);
    return () => clearInterval(handle);
  }, []);

  return (
    <div className="banner-carousel carousel slide" data-bs-ride="false">
      <div className="carousel-inner">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={"carousel-item banner-slide" + (i === 0 ? " active" : "")}
          >
            <div className="slide-content">
              <div className="slide-icon">{s.icon}</div>
              <h2 className="slide-title">{s.title}</h2>
              <p className="slide-desc">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
