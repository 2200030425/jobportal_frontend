import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import AOS from "aos"; // Import AOS for animations
import "aos/dist/aos.css"; // Import the AOS CSS
import image from "../images/home.jpg";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  // Function to handle navigation when buttons are clicked
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        // backgroundColor: "#1a1a1a",
        backgroundImage: `url(${image})`,
      }}
      className="min-vh-100 d-flex flex-column"
    >
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-light shadow-sm"
        style={{
          backgroundColor: "#282828",
        }}
      >
        <div className="container-fluid">
          <a className="navbar-brand fw-bold text-light" href="/">
            Job Portal
          </a>
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
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleNavigation("/loginadmin")}
                >
                  Admin Login
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-success me-2"
                  onClick={() => handleNavigation("/loginuser")}
                >
                  User Login
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-warning"
                  onClick={() => handleNavigation("/loginrecruiter")}
                >
                  Recruiter Login
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-5 flex-grow-1">
        {message && <div className="alert alert-warning">{message}</div>}{" "}
        {/* Display the message */}
        <div className="text-center" data-aos="fade-up">
          <h1 className="display-4 fw-bold text-primary">
            Welcome to the Job Portal
          </h1>
          <p className="lead text-secondary text-black">
            Your one-stop solution for job opportunities.
          </p>
          <p className="text-black">
            Select a login option from the top-right to continue.
          </p>

          {/* New Paragraph About Job Portal */}
          <p className="mt-4 text-secondary text-black" data-aos="fade-up">
            The Online Job Portal is a comprehensive platform designed to bridge
            the gap between job seekers and employers. Whether you're a recent
            graduate searching for your first job or an experienced professional
            looking for new opportunities, our portal provides a seamless
            experience for finding your next career move. Employers can post job
            listings, review applicant profiles, and connect with top talent
            across various industries. Job seekers can explore a wide range of
            opportunities, apply directly through the platform, and keep track
            of their applications. With advanced search filters, personalized
            job recommendations, and an intuitive interface, the Online Job
            Portal simplifies the job search and hiring process for everyone.
          </p>

          {/* Call to Action Section */}
          <div data-aos="zoom-in-up" className="mt-5">
            <h2 className="text-black">Take the Next Step in Your Career!</h2>
            <p className="text-black mb-4">
              Don’t wait—start exploring the job listings and apply now. Your
              dream job is just a click away!
            </p>
            {/* <button
              className="btn btn-danger btn-lg"
              onClick={() => handleNavigation("/browse-jobs")}
            >
              Browse Jobs
            </button> */}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="text-center py-3 mt-auto shadow-sm"
        style={{
          backgroundColor: "#282828",
        }}
      >
        <p className="mb-0 text-light">
          &copy; {new Date().getFullYear()} Job Portal. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;
