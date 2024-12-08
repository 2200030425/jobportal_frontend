import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavbarRec = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault(); // Prevent default behavior
    localStorage.clear(); // Remove all user data
    navigate("/"); // Redirect to the login page
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{
        backgroundColor: "#282828",
      }}
    >
      <div className="container-fluid">
        {/* Brand Name */}
        <Link className="navbar-brand text-light" to="/recruiter">
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
          {/* Centered Links */}
          <ul className="navbar-nav mx-auto justify-content-center">
            <li className="nav-item">
              <Link className="nav-link fw-bold text-light" to="/recruiter">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link fw-bold text-light"
                to="/recruiter/applications"
              >
                Applications
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link fw-bold text-light"
                to="/recruiter/addjob"
              >
                Add Job
              </Link>
            </li>
          </ul>

          {/* Profile Dropdown */}
          <ul className="navbar-nav">
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
                  <Link
                    className="dropdown-item text-light"
                    to="/recruiter/profile"
                  >
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

export default NavbarRec;
