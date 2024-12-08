import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Navbar";
import Navbar from "../Navbar";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS CSS
import image from "../images/profile.png";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Initialize AOS animations
    AOS.init({
      duration: 1000, // Set duration for animations
      easing: "ease-in-out", // Easing effect for animations
      once: true, // Animation happens only once
    });

    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/user/id/${userId}`
        );
        setUserDetails(response.data);
        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          age: response.data.age,
          linkedinLink: response.data.linkedinLink || "",
          college: response.data.college || "",
          student: response.data.student || "no",
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
      const userId = localStorage.getItem("userId");
      const response = await axios.put(
        `http://localhost:8080/user/update/${userId}`,
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
            <div className="col col-lg-6 mb-4 mb-lg-0">
              <div
                className="card mb-3 text-black"
                style={{ borderRadius: ".5rem" }}
                data-aos="fade-up" // Add AOS fade-up effect to card
              >
                <div className="row g-0">
                  <div
                    className="col-md-4 gradient-custom text-center text-black"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                    // data-aos="zoom-in" // AOS zoom-in effect for avatar image
                  >
                    <img
                      src={image}
                      alt="Avatar"
                      className="img-fluid my-5"
                      style={{ width: "80px" }}
                    />
                    <h5>{userDetails.firstName || "User"}</h5>
                    <p>
                      {userDetails.student === "yes"
                        ? "Student"
                        : "Professional"}
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      {/* Added Profile Heading */}
                      <h6 data-aos="fade-up">Information</h6>{" "}
                      {/* Fade-right effect */}
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
                                backgroundColor: "#e7e7e5",
                                color: "black",
                              }}
                              onChange={handleInputChange}
                              data-aos="fade-up" // Add AOS fade-up effect
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="lastName"
                              value={formData.lastName || ""}
                              style={{
                                backgroundColor: "#e7e7e5",
                                color: "black",
                              }}
                              onChange={handleInputChange}
                              data-aos="fade-up"
                              data-aos-delay="100" // Delay effect
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Age</label>
                            <input
                              type="number"
                              className="form-control"
                              name="age"
                              value={formData.age || ""}
                              style={{
                                backgroundColor: "#e7e7e5",
                                color: "black",
                              }}
                              onChange={handleInputChange}
                              data-aos="fade-up"
                              data-aos-delay="200" // Delay effect
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">LinkedIn</label>
                            <input
                              type="url"
                              className="form-control"
                              name="linkedinLink"
                              value={formData.linkedinLink || ""}
                              style={{
                                backgroundColor: "#e7e7e5",
                                color: "black",
                              }}
                              onChange={handleInputChange}
                              data-aos="fade-up"
                              data-aos-delay="300" // Delay effect
                            />
                          </div>
                          {formData.student === "yes" && (
                            <div className="mb-3">
                              <label className="form-label">College</label>
                              <input
                                type="text"
                                className="form-control"
                                name="college"
                                value={formData.college || ""}
                                style={{
                                  backgroundColor: "#e7e7e5",
                                  color: "black",
                                }}
                                onChange={handleInputChange}
                                data-aos="fade-up"
                                data-aos-delay="400" // Delay effect
                              />
                            </div>
                          )}
                          <button
                            className="btn btn-primary me-2"
                            onClick={handleSave}
                            data-aos="fade-up"
                            data-aos-delay="500" // Delay effect
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={() => setIsEditing(false)}
                            data-aos="fade-up"
                            data-aos-delay="600" // Delay effect
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div className="row pt-1">
                            <div className="col-6 mb-3">
                              <h6>First Name</h6>
                              <p className="text-black">
                                {userDetails.firstName || "Not provided"}
                              </p>
                            </div>
                            <div className="col-6 mb-3">
                              <h6>Last Name</h6>
                              <p className="text-black">
                                {userDetails.lastName || "Not provided"}
                              </p>
                            </div>
                          </div>
                          <div className="row pt-1">
                            <div className="col-6 mb-3">
                              <h6>Email</h6>
                              <p className="text-black">
                                {userDetails.email || "Not provided"}
                              </p>
                            </div>
                            <div className="col-6 mb-3">
                              <h6>Phone</h6>
                              <p className="text-black">
                                {userDetails.mobile || "Not provided"}
                              </p>
                            </div>
                          </div>
                          <div className="row pt-1">
                            <div className="col-6 mb-3">
                              <h6>Age</h6>
                              <p className="text-black">
                                {userDetails.age || "Not provided"}
                              </p>
                            </div>
                            <div className="col-6 mb-3">
                              <h6>LinkedIn</h6>
                              <p className="text-black">
                                {userDetails.linkedinLink || "Not provided"}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
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

export default Profile;
