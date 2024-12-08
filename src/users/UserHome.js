import React, { useEffect } from "react";
import Navbar from "../Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import aboutImage from "../images/image1.png"; // Import your image
import image2 from "../images/image3.png";
import image3 from "../images/image2.png";

export default function UserHome() {
  const id = localStorage.getItem("userId");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        backgroundColor: "#e7e7e5",
      }}
    >
      <Navbar />
      <div className="container mt-4">
        {/* Welcome Section */}
        <div className="text-center mb-4 text-black" data-aos="fade-up">
          <h1>
            Welcome to <span style={{ color: "#0d6efd" }}>Job Portal</span>
          </h1>

          <p>
            Empowering your career journey with thousands of job opportunities.
          </p>
          <h4>Your User ID: {id}</h4>
        </div>

        {/* About the Portal */}
        <div
          className="text-black mb-4 d-flex align-items-center"
          data-aos="fade-up"
          data-aos-delay="100"
          style={{ display: "flex", gap: "20px" }}
        >
          <img
            src={aboutImage}
            alt="About the portal"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />
          <div>
            <h2>About Our Portal</h2>
            <p>
              Our job portal connects job seekers with top companies around the
              world. Whether you are a fresher looking to kickstart your career
              or an experienced professional seeking new challenges, we provide
              a platform tailored to your needs.
            </p>
            <p>
              With an intuitive interface and powerful search features, finding
              your dream job has never been easier. From full-time opportunities
              to remote gigs, explore thousands of listings and apply in just a
              few clicks!
            </p>
          </div>
        </div>

        {/* Tips for Job Seekers */}
        <div
          className="text-black mb-4 d-flex"
          data-aos="fade-up"
          data-aos-delay="200"
          style={{ alignItems: "center" }}
        >
          <div style={{ marginRight: "15px" }}>
            <img
              src={image2}
              alt="About the portal"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <h2>Tips for Job Seekers</h2>
            <ul>
              <li>
                <strong>Build a Strong Resume:</strong> Highlight your skills
                and achievements to stand out from the competition.
              </li>
              <li>
                <strong>Customize Applications:</strong> Tailor your application
                to each job to demonstrate your interest and fit.
              </li>
              <li>
                <strong>Stay Professional:</strong> Always maintain a
                professional tone in your communication.
              </li>
              <li>
                <strong>Follow Up:</strong> Don’t hesitate to follow up on your
                applications to express your interest.
              </li>
            </ul>
          </div>
        </div>

        {/* Why Choose Us */}
        <div
          className="text-black mb-4"
          data-aos="fade-up"
          data-aos-delay="300"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div style={{ marginRight: "15px" }}>
            <img
              src={image3}
              alt="About the portal"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
          </div>
          <div>
            <h2>Why Choose Us?</h2>
            <p>Our platform offers a seamless experience for job seekers:</p>
            <ul>
              <li>
                Advanced search filters to find jobs that match your
                preferences.
              </li>
              <li>Regularly updated job listings from reputed companies.</li>
              <li>
                Personalized dashboard to manage your applications efficiently.
              </li>
              <li>Secure and reliable platform for all your career needs.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
