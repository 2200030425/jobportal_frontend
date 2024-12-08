import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS styles
import "./applyjob.css"; // Import your applyjob.css file
import tips from "../images/tips.png";

export default function ApplyJob() {
  const { id } = useParams(); // Get the job id from the URL parameters
  const navigate = useNavigate(); // Initialize useNavigate to redirect after form submission

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    age: "",
    job_id: id, // Initialize jobId with the value from URL parameters
  });

  const [errors, setErrors] = useState({}); // State to store validation errors

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/loginuser"); // Redirect to login if not logged in
    }
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
    });
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    // Validate mobile
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number.";
    }

    // Validate age
    if (!formData.age) {
      newErrors.age = "Age is required.";
    } else if (formData.age < 18 || formData.age > 60) {
      newErrors.age = "Age must be between 18 and 60.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const { firstName, lastName, email, mobile, age, job_id } = formData;
        const applicationData = {
          firstName,
          lastName,
          email,
          mobile,
          age,
          job: {
            id: job_id, // Pass job_id as part of the job object
          },
        };

        // Submit the form data to the backend
        await axios.post("http://localhost:8080/application", applicationData, {
          headers: {
            "Content-Type": "application/json", // Ensure the request is treated as JSON
          },
        });

        alert("Application submitted successfully!");
        navigate("/user"); // Redirect back to the User page after submission
      } catch (error) {
        console.error("Error submitting application:", error);
        alert("Failed to submit application.");
      }
    }
  };

  return (
    <div
      className="applyjob"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        backgroundColor: "#e7e7e5",
        position: "relative",
      }}
    >
      <Navbar />
      <div className="container my-5 d-flex justify-content-between">
        <div
          className="floating-card"
          data-aos="fade-up"
          style={{
            position: "absolute",
            left: "80px",
            top: "20%",
            width: "200px",
            height: "300px",
            backgroundColor: "transparent",
            color: "#fff",
            borderRadius: "10px",
            animation: "float 2s infinite ease-in-out",
          }}
        >
          <div className="card-body" style={{ padding: "20px" }}>
            <img
              src={tips}
              alt="Job Application"
              style={{
                width: "100px",
                height: "auto",
                borderRadius: "8px",
                marginBottom: "15px",
              }}
            />
            <p className="text-black">
              Apply for the job and secure your future. Good skills can lead to
              higher chances of getting a Job.
            </p>
          </div>
        </div>

        <div
          className="card border-0 mx-auto text-black"
          style={{
            width: "650px",
            height: "700px",
            borderRadius: "20px",
          }}
          data-aos="fade-up"
        >
          <div className="card-body d-flex flex-column align-items-center">
            <h2>Apply for job</h2>
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="jobId" value={formData.job_id} />
              {[
                { label: "First Name", name: "firstName" },
                { label: "Last Name", name: "lastName" },
                { label: "Email", name: "email" },
                { label: "Mobile", name: "mobile" },
                { label: "Age", name: "age", type: "number" },
              ].map(({ label, name, type = "text" }) => (
                <div key={name} className="form-group mb-3">
                  <label htmlFor={name}>{label}</label>
                  <input
                    type={type}
                    className="form-control"
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    style={{
                      borderRadius: "10px",
                      borderWidth: "1px",
                      borderColor: "#fff",
                      backgroundColor: "#e7e7e5",
                      color: "black",
                    }}
                  />
                  {errors[name] && (
                    <small className="text-danger">{errors[name]}</small>
                  )}
                </div>
              ))}
              <button
                type="submit"
                style={{ borderRadius: "10px" }}
                className="btn btn-success"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
