import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Navbar";
import Navbar from "../Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import image from "../images/profile.png";

const RecProfile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });

    const fetchUserDetails = async () => {
      const recruiterId = localStorage.getItem("recruiterId");

      if (!recruiterId) {
        setError("Recruiter not logged in");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/recruiter/id/${recruiterId}`
        );
        setUserDetails(response.data);
        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          age: response.data.age,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Failed to fetch profile details. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const recruiterId = localStorage.getItem("recruiterId");
      const response = await axios.put(
        `http://localhost:8080/recruiter/update/${recruiterId}`,
        formData
      );
      setUserDetails({ ...userDetails, ...response.data });
      setIsEditing(false);
      setSuccessMessage("Profile updated!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      console.error("Error updating user details:", err);
      setError("Failed to save profile details. Please try again later.");
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div
      style={{
        backgroundColor: "#e7e7e5",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <section>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div
              className="col col-lg-6 mb-4 mb-lg-0"
              // Add AOS attribute
            >
              <div
                className="card mb-3 text-light"
                style={{ borderRadius: ".5rem", backgroundColor: "#363636" }}
                data-aos="fade-up" // Add AOS attribute
              >
                <div className="row g-0">
                  <div
                    className="col-md-4 gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                    // data-aos="flip-left" // Add AOS attribute
                  >
                    <img
                      src={image}
                      alt="Avatar"
                      className="img-fluid my-5"
                      style={{ width: "80px" }}
                    />
                    <h5>{userDetails.firstName || "Recruiter"}</h5>
                    <p>Recruiter</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4" data-aos="fade-up">
                      <h6>Information</h6>
                      <hr className="mt-0 mb-4" />
                      {successMessage && (
                        <div
                          className="alert alert-success"
                          role="alert"
                          data-aos="fade-down"
                        >
                          {successMessage}
                        </div>
                      )}
                      {isEditing ? (
                        <div>
                          <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="firstName"
                              value={formData.firstName || ""}
                              style={{
                                backgroundColor: "#282828",
                                color: "white",
                              }}
                              onChange={handleInputChange}
                              data-aos="fade-up"
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="lastName"
                              value={formData.lastName || ""}
                              onChange={handleInputChange}
                              style={{
                                backgroundColor: "#282828",
                                color: "white",
                              }}
                              data-aos="fade-up"
                              data-aos-delay="100"
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Age</label>
                            <input
                              type="number"
                              className="form-control"
                              name="age"
                              value={formData.age || ""}
                              onChange={handleInputChange}
                              style={{
                                backgroundColor: "#282828",
                                color: "white",
                              }}
                              data-aos="fade-up"
                              data-aos-delay="200"
                            />
                          </div>
                          <button
                            className="btn btn-primary me-2"
                            onClick={handleSave}
                            data-aos="fade-up"
                            data-aos-delay="300"
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={() => setIsEditing(false)}
                            data-aos="fade-up"
                            data-aos-delay="300"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div className="row pt-1">
                            <div className="col-6 mb-3">
                              <h6>First Name</h6>
                              <p className="text-light">
                                {userDetails.firstName || "Not provided"}
                              </p>
                            </div>
                            <div className="col-6 mb-3">
                              <h6>Last Name</h6>
                              <p className="text-light">
                                {userDetails.lastName || "Not provided"}
                              </p>
                            </div>
                          </div>
                          <div className="row pt-1">
                            <div className="col-6 mb-3">
                              <h6>Email</h6>
                              <p className="text-light">
                                {userDetails.email || "Not provided"}
                              </p>
                            </div>
                            <div className="col-6 mb-3">
                              <h6>Phone</h6>
                              <p className="text-light">
                                {userDetails.mobile || "Not provided"}
                              </p>
                            </div>
                          </div>
                          <div className="row pt-1">
                            <div className="col-6 mb-3">
                              <h6>Age</h6>
                              <p className="text-light">
                                {userDetails.age || "Not provided"}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="d-flex justify-content-start">
                        <a href="#!">
                          <i className="fab fa-facebook-f fa-lg me-3"></i>
                        </a>
                        <a href="#!">
                          <i className="fab fa-twitter fa-lg me-3"></i>
                        </a>
                        <a href="#!">
                          <i className="fab fa-instagram fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecProfile;
