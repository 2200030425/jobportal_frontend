import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Remove all user data
    navigate("/"); // Redirect to login
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "#282828",
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/">
          Job Portal
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
          {/* Centering the Links with flexbox */}
          <ul className="navbar-nav d-flex justify-content-center w-100">
            <li className="nav-item">
              <Link
                className="nav-link fw-bold text-light" // Bold and darker text
                to="/user"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link fw-bold text-light" // Bold and lighter text
                to="/user/jobs"
              >
                Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link fw-bold text-light" // Bold and darker text
                to="/user/applications"
              >
                Applications
              </Link>
            </li>
          </ul>
          {/* Profile Dropdown */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <button
                className="btn btn-light dropdown-toggle"
                id="profileDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle"></i>{" "}
                {/* Bootstrap Profile Icon */}
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end text-light"
                style={{
                  backgroundColor: "#282828",
                }}
                aria-labelledby="profileDropdown"
              >
                <li>
                  <Link className="dropdown-item text-light" to="/user/profile">
                    View Profile
                  </Link>
                </li>
                <li>
                  <button
                    className="dropdown-item text-light"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
