import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import recruiterLoginImg from "../images/recruiterLogin.png";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS styles

export default function RecruiterLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegisterClick = () => {
    navigate("/registerRecruiter");
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);

    setError("");
    try {
      const response = await axios.post(
        `http://localhost:8080/recruiterlogin/${encodeURIComponent(
          email
        )}/${encodeURIComponent(password)}`,
        {}, // Send an empty object since we don't need a body
        {
          headers: {
            "Content-Type": "application/json", // Ensure correct content type
          },
        }
      );
      console.log("API Response:", response.data);
      if (response.status === 200) {
        alert("Login successful!");

        // Assuming the response contains the recruiter object
        const recruiterId = response.data.id; // Change according to your API response structure
        localStorage.setItem("recruiterId", recruiterId); // Store recruiter ID in local storage
        console.log(localStorage.getItem("id"));

        // Call your context function to manage auth state

        // Redirect to the recruiter dashboard
        navigate("/recruiter");
      }
    } catch (error) {
      setError("Invalid email or password. Please try again.");

      console.error("Login failed:", error);
      // alert("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initialize AOS animations
    AOS.init({
      duration: 1000, // Set duration for animations
      easing: "ease-in-out", // Easing effect for animations
      once: true, // Animation happens only once
    });
  }, []);

  return (
    <div>
      <section
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          backgroundColor: "#e7e7e5",
        }}
        className="vh-100 d-flex flex-column"
      >
        <div className="container-fluid h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div
              className="col-md-9 col-lg-6 col-xl-5"
              data-aos="fade-right" // AOS fade-right animation
            >
              <img src={recruiterLoginImg} className="img-fluid" alt="Sample" />
            </div>
            <div
              className="col-md-8 col-lg-6 col-xl-4 offset-xl-1"
              data-aos="fade-left" // AOS fade-left animation
            >
              <h1 className="text-center text-black mb-4" data-aos="fade-up">
                Job Portal
              </h1>
              <h5 className="text-center text-black mb-4" data-aos="fade-up">
                Welcome
              </h5>
              <form onSubmit={handleLogin}>
                {/* Email input */}
                <div className="form-outline mb-4">
                  <input
                    style={{
                      border: "2px solid #007bff",

                      color: "black",
                    }}
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    value={email} // Controlled input
                    onChange={(e) => setEmail(e.target.value)} // Handle input change
                    required
                    data-aos="fade-up" // AOS fade-up animation
                  />
                  <label
                    className="form-label text-black"
                    htmlFor="form3Example3"
                  >
                    Email address
                  </label>
                </div>
                {/* Password input */}
                <div className="form-outline mb-3">
                  <input
                    style={{
                      border: "2px solid #007bff",

                      color: "black",
                    }}
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    value={password} // Controlled input
                    onChange={(e) => setPassword(e.target.value)} // Handle input change
                    required
                    data-aos="fade-up" // AOS fade-up animation
                  />
                  <label
                    className="form-label text-black"
                    htmlFor="form3Example4"
                  >
                    Password
                  </label>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    disabled={loading}
                    data-aos="zoom-in" // AOS zoom-in animation
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0 text-black">
                    Don't have an account?{" "}
                    <button
                      className="btn btn-link p-0 link-danger"
                      style={{ textDecoration: "none" }}
                      onClick={handleRegisterClick}
                      data-aos="fade-up" // AOS fade-up animation
                    >
                      Register
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        <footer
          className="text-center py-3 mt-auto shadow-sm"
          style={{
            backgroundColor: "#282828",
          }}
          data-aos="fade-up" // AOS fade-up animation
        >
          <p className="mb-0 text-light">
            &copy; {new Date().getFullYear()} Job Portal. All Rights Reserved.
          </p>
        </footer>
      </section>
    </div>
  );
}
