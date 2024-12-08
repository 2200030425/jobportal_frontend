import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBill,
  FaClock,
} from "react-icons/fa";
import Navbar from "../Navbar";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ViewJob() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [otherJobs, setOtherJobs] = useState([]);
  const [loadingJob, setLoadingJob] = useState(true);
  const [loadingOtherJobs, setLoadingOtherJobs] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize AOS animations
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });

    const fetchJobDetails = async () => {
      try {
        // Fetch job details
        const response = await axios.get(`http://localhost:8080/job/${id}`);
        setJob(response.data);

        // Fetch other jobs from the same recruiter
        const otherJobsResponse = await axios.get(
          `http://localhost:8080/jobsByRec/${response.data.recruiter.id}`
        );
        const filteredJobs = otherJobsResponse.data.filter(
          (otherJob) => otherJob.id !== parseInt(id)
        );
        setOtherJobs(filteredJobs);

        setLoadingJob(false);
        setLoadingOtherJobs(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError("Failed to load job details or other jobs.");
        setLoadingJob(false);
        setLoadingOtherJobs(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleApply = () => {
    navigate(`/user/applyjob/${id}`);
  };

  if (loadingJob || loadingOtherJobs) {
    return (
      <div className="text-center text-black my-5">
        <h2>Loading job details...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center my-5">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#e7e7e5",
      }}
    >
      <Navbar />

      <div className="container my-5">
        <div className="d-flex align-items-start">
          {/* Left Section - Other Jobs */}
          <div
            className="other-jobs-section me-4 text-black"
            style={{ width: "30%" }}
          >
            <h4 className="text-center text-black mb-4">
              Other Jobs by {job.company}
            </h4>
            {otherJobs.length > 0 ? (
              <div>
                {otherJobs.map((otherJob) => (
                  <div
                    style={{
                      borderRadius: "20px",

                      minHeight: "150px",
                    }}
                    className="card border-0 mb-3 text-black"
                    key={otherJob.id}
                    data-aos="fade-up" // Animation on scroll
                  >
                    <div className="card-body text-center">
                      <h5 className="card-title">{otherJob.name}</h5>
                      <p className="card-text">
                        <FaMoneyBill className="me-2" />
                        <strong>Salary:</strong> ${otherJob.salary}
                      </p>
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/user/job/${otherJob.id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  borderRadius: "20px",
                  backgroundColor: "#fff",
                  minHeight: "50px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="card border-0 mb-3 d-flex"
              >
                <p className="card-text text-black m-0">
                  No jobs available from this recruiter.
                </p>
              </div>
            )}
          </div>

          {/* Right Section - Job Details */}
          <div className="job-details-section" style={{ width: "70%" }}>
            <h4 className="mb-4 text-black text-center">
              Apply for {job.name}
            </h4>

            <div
              className="card border-0 mx-auto static-card "
              style={{
                minHeight: "400px",
                borderRadius: "20px",
              }}
              data-aos="fade-up" // Animation on scroll
            >
              <div className="card-body mt-5 bg-opacity-10 text-black">
                <h5 className="card-title text-center text-black">
                  {job.name}
                </h5>
                <div className="row pt-1">
                  <div className="col-6 mb-3">
                    <p className="card-text text-start text-black">
                      <FaBriefcase className="me-2 text-black" />
                      <strong className="text-black">Recruiter:</strong>{" "}
                      {job.company}
                    </p>
                  </div>
                  <div className="col-6 mb-3">
                    <p className="card-text text-start text-black">
                      <FaMoneyBill className="me-2 text-black" />
                      <strong className="text-black">Salary:</strong> ${" "}
                      {job.salary}
                    </p>
                  </div>
                </div>
                <div className="row pt-1">
                  <div className="col-6 mb-3">
                    <p className="card-text text-start text-black">
                      <FaMapMarkerAlt className="me-2" />
                      <strong>Location:</strong> {job.location}
                    </p>
                  </div>
                  <div className="col-6 mb-3">
                    <p className="card-text text-start">
                      <FaClock className="me-2" />
                      <strong>Shift:</strong> {job.shift}
                    </p>
                  </div>
                </div>
                <p className="card-text text-start">
                  <strong>Description:</strong> <br /> {job.description}
                </p>

                <div className="text-center mt-3">
                  <button className="btn btn-success" onClick={handleApply}>
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
