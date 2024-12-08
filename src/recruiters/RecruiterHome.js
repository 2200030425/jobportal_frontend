import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import recruiterhome from "../images/recruiterhome.jpg";
import NavbarRec from "../NavbarRec";
// Import AOS CSS and JS
import AOS from "aos";
import "aos/dist/aos.css";

export default function RecruiterHome() {
  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 1000, // Set the duration for the animations
      easing: "ease-in-out", // Set easing for smooth transitions
      once: true, // Make sure the animation happens only once when the element is scrolled into view
    });
  }, []);

  return (
    <>
      <style>
        {`
          .custom-navbar {
            background-color: #5f84de !important; /* Ensure the background color is applied */
          }
          .custom-navbar .nav-link, 
          .custom-navbar .navbar-brand {
            color: #fff !important; /* Ensure the text color is white */
          }
        `}
      </style>
      {/* Navbar */}
      <div
        style={{
          // backgroundImage: url(${recruiterhome}),
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          backgroundColor: "#e7e7e5",
        }}
      >
        <NavbarRec />
        {/* Main content */}
        <div className="container my-5">
          <h2 className="text-center text-black mb-4" data-aos="fade-up">
            Recruiter Dashboard
          </h2>
          <div className="text-center">
            {/* <button
              className="btn btn-primary mx-3"
              onClick={() => navigate("/recruiter/applications")}
            >
              Applications
            </button>
            <button
              className="btn btn-secondary mx-3"
              onClick={() => navigate("/recruiter/addjob")}
            >
              Add Job
            </button> */}
          </div>

          {/* About Section */}
          <div className="mt-5" data-aos="fade-up">
            <h3 className="text-center text-black">About This Dashboard</h3>
            <p className="text-center">
              Welcome to the Recruiter Dashboard! Here, you can manage all
              aspects of your recruitment process. This platform helps you
              streamline your job postings, review applications, and track
              progress in one central location.
            </p>
          </div>

          {/* Features Section */}
          <div className="mt-5" data-aos="fade-up">
            <h3 className="text-center text-black">Features</h3>
            <div className="row">
              <div className="col-md-4" data-aos="flip-left">
                <div className="card" style={{ borderRadius: "10px" }}>
                  <div className="card-body">
                    <h5 className="card-title">Manage Applications</h5>
                    <p className="card-text">
                      Review and manage all job applications from candidates in
                      real-time.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-md-4"
                data-aos="flip-left"
                data-aos-delay="200"
              >
                <div className="card" style={{ borderRadius: "10px" }}>
                  <div className="card-body">
                    <h5 className="card-title">Post Jobs</h5>
                    <p className="card-text">
                      Quickly post new job listings and track their progress
                      with ease.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-md-4"
                data-aos="flip-left"
                data-aos-delay="400"
              >
                <div className="card" style={{ borderRadius: "10px" }}>
                  <div className="card-body">
                    <h5 className="card-title">Track Applicants</h5>
                    <p className="card-text">
                      Easily track applicant status, interviews, and hiring
                      decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-5 text-center" data-aos="fade-up">
            <h3 className="text-black">
              Start Managing Your Hiring Process Today
            </h3>
            <p>
              Post your job openings and start reviewing applications with just
              a few clicks.
            </p>
            {/* <button
              className="btn btn-primary"
              onClick={() => alert("Redirecting to Post Job Page")}
            >
              Post a Job Now
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}