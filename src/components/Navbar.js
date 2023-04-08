import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          My Hotels
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/rooms" className="nav-link">
                Rooms
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Log In
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/SignUp" className="nav-link">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
