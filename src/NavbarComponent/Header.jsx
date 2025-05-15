import { Link } from "react-router-dom";
import logo from "../images/coreglowlogo.jpeg";
import RoleNav from "./RoleNav";

const Header = () => {
  return (
    <header className="site-header">
      <nav className="nav-bar">
        <div className="nav-container">
          {/* LEFT GROUP: logo + CoreGlow + About/Contact */}
          <div className="nav-left">
            <Link to="/" className="brand">
              <img src={logo} alt="CoreGlow Logo" className="brand-logo" />
              <span className="brand-name">CoreGlow</span>
            </Link>
            <ul className="nav-links">
              <li>
                <Link to="/about" className="nav-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="nav-link">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* RIGHT GROUP: Register Patient / Login */}
          <div className="role-nav-wrapper">
            <RoleNav />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
