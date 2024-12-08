import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "../images/register.png";

export default function RecruiterRegister() {
  const [recruiter, setRecruiter] = useState({
    mobile: "",
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    linkedin: "",
    college: "",
    student: "no",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const {
    mobile,
    firstName,
    lastName,
    email,
    age,
    linkedin,
    college,
    student,
    password,
    confirmPassword,
  } = recruiter;

  const handleChange = (e) => {
    setRecruiter({ ...recruiter, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    const nameRegex = /^[a-zA-Z]+$/;
    const mobileRegex = /^[0-9]{10}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/.+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/;

    if (firstName === lastName || firstName.length <= 2 || !nameRegex.test(firstName)) {
      alert("First name and last name cannot be the same, must be > 2 characters, and only letters are allowed.");
      return false;
    }

    if (!nameRegex.test(lastName) || lastName.length <= 2) {
      alert("Last name must be > 2 characters and only contain letters.");
      return false;
    }

    if (!mobileRegex.test(mobile)) {
      alert("Mobile number must be exactly 10 digits.");
      return false;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (age < 18 || age > 90) {
      alert("Age must be between 18 and 90.");
      return false;
    }

    if (!linkedinRegex.test(linkedin)) {
      alert("Please enter a valid LinkedIn profile URL.");
      return false;
    }

    if (student === "yes" && college.length <= 5) {
      alert("College name must be longer than 5 characters.");
      return false;
    }

    if (!passwordRegex.test(password)) {
      alert("Password must be at least 7 characters long and contain both letters and numbers.");
      return false;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const response = await axios.post("http://localhost:8080/recruiter", recruiter);
      if (response.status === 201) {
        alert("Recruiter registered successfully!");
        navigate("/loginrecruiter");
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
                      <div className="mb-3">
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
                      {/* First Name */}
                      <div className="mb-3">
                        <label className="form-label text-black">First Name</label>
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
                      {/* Last Name */}
                      <div className="mb-3">
                        <label className="form-label text-black">Last Name</label>
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
                      {/* Email */}
                      <div className="mb-3">
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
                      {/* Age */}
                      <div className="mb-3">
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
                      {/* LinkedIn */}
                      <div className="mb-3">
                        <label className="form-label text-black">
                          LinkedIn Profile
                        </label>
                        <input
                          type="url"
                          name="linkedin"
                          className="form-control"
                          placeholder="LinkedIn Profile"
                          value={linkedin}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      {/* Are you a Student */}
                      <div className="mb-3">
                        <label className="form-label text-black">Are you a student?</label>
                        <select
                          name="student"
                          className="form-control"
                          value={student}
                          onChange={handleChange}
                        >
                          <option value="no">No</option>
                          <option value="yes">Yes</option>
                        </select>
                      </div>
                      {student === "yes" && (
                        <div className="mb-3">
                          <label className="form-label text-black">College</label>
                          <input
                            type="text"
                            name="college"
                            className="form-control"
                            placeholder="College"
                            value={college}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      )}
                      {/* Password */}
                      <div className="mb-3">
                        <label className="form-label text-black">Password</label>
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
                      {/* Confirm Password */}
                      <div className="mb-3">
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
                      <button type="submit" className="btn btn-primary btn-lg">
                        Register
                      </button>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img src={image} className="img-fluid" alt="" />
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
