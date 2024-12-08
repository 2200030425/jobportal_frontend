import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "../images/register2.png";

export default function UserRegister() {
  const [user, setUser] = useState({
    mobile: "",
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
    student: "no", // Default to 'no' for student status
    college: "",
    linkedinLink: "",
  });

  const navigate = useNavigate();

  const {
    mobile,
    firstName,
    lastName,
    email,
    age,
    password,
    confirmPassword,
    student,
    college,
    linkedinLink,
  } = user;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (firstName === lastName || firstName.length <= 2 || lastName.length <= 2) {
      alert("First and last names must be different and longer than 2 characters.");
      return;
    }

    if (!/^[a-zA-Z]+$/.test(firstName) || !/^[a-zA-Z]+$/.test(lastName)) {
      alert("First and last names should only contain letters.");
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      alert("Mobile number must be exactly 10 digits.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (age < 18 || age > 90) {
      alert("Age must be between 18 and 90.");
      return;
    }

    if (student === "yes" && college.length <= 5) {
      alert("College name must be longer than 5 characters.");
      return;
    }

    if (!/^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(linkedinLink)) {
      alert("Please enter a valid LinkedIn profile link.");
      return;
    }

    if (password.length <= 6 || !/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
      alert("Password must be longer than 6 characters and contain both letters and numbers.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/user", user);
      if (response.status === 201) {
        alert("User registered successfully!");
        navigate("/loginuser");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#e7e7e5" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-3 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      {/* Mobile */}
                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label text-black">Mobile</label>
                          <input
                            type="tel"
                            name="mobile"
                            className="form-control"
                            placeholder="Mobile"
                            value={mobile}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      {/* First Name */}
                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label text-black">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            className="form-control"
                            placeholder="First Name"
                            value={firstName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Last Name */}
                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label text-black">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label text-black">Email</label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Age */}
                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fas fa-calendar fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label text-black">Age</label>
                          <input
                            type="number"
                            name="age"
                            className="form-control"
                            placeholder="Age"
                            value={age}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      {/* LinkedIn */}
                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fas fa-linkedin fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label text-black">
                            LinkedIn URL
                          </label>
                          <input
                            type="url"
                            name="linkedinLink"
                            className="form-control"
                            placeholder="LinkedIn Profile Link"
                            value={linkedinLink}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Student */}
                      <div className="d-flex flex-row align-items-center mb-2">
                        <label className="form-check-label me-3">
                          Are you a student?
                        </label>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="student"
                            value="yes"
                            checked={student === "yes"}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="student"
                            value="no"
                            checked={student === "no"}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-check-label">No</label>
                        </div>
                      </div>

                      {/* College */}
                      {student === "yes" && (
                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fas fa-university fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label text-black">
                              College
                            </label>
                            <input
                              type="text"
                              name="college"
                              className="form-control"
                              placeholder="College Name"
                              value={college}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      )}

                      {/* Password */}
                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label text-black">
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label text-black">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg">
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src={image}
                      className="img-fluid"
                      alt="Registration"
                      style={{ borderRadius: "10px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
