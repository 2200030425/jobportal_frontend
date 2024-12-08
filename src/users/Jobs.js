import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import { FaSearch } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const [filteredJobs, setFilteredJobs] = useState([]); // State for filtered jobs
  const [hoveredCard, setHoveredCard] = useState(null); // State to track hovered card
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize AOS animations
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });

    // Check if the user is logged in
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/loginuser"); // Redirect to login if not logged in
    }

    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/jobs");
        setJobs(response.data);
        setFilteredJobs(response.data); // Initialize filtered jobs with all jobs
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [navigate]);

  const handleApply = (jobId) => {
    navigate(`/user/job/${jobId}`); // Fixed template literal in the navigate path
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter jobs based on the query
    const filtered = jobs.filter(
      (job) =>
        job.name.toLowerCase().includes(query) ||
        job.description?.toLowerCase().includes(query) ||
        job.company?.toLowerCase().includes(query) ||
        job.location?.toLowerCase().includes(query)
    );
    setFilteredJobs(filtered);
  };

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
        <h2 className="text-center mb-4 text-black" data-aos="fade-up">
          Available Jobs
        </h2>

        {/* Search Bar */}
        <div
          className="mb-4"
          style={{
            position: "relative", // Make the container position relative
          }}
        >
          {/* Input field */}
          <input
            type="text"
            className="form-control"
            placeholder="Search for jobs..." // Added placeholder text
            value={searchQuery}
            onChange={handleSearch}
            style={{
              borderRadius: "10px",
              color: "black",
              paddingLeft: "40px", // Add padding to avoid overlap with the icon
              transition: "all 0.3s ease", // Transition on input field focus
            }}
          />

          {/* Search icon */}
          <FaSearch
            style={{
              position: "absolute",
              top: "50%",
              left: "10px", // Position the icon on the left side
              transform: "translateY(-50%)",
              color: "black",
              pointerEvents: "none", // Prevent the icon from blocking input clicks
            }}
          />
        </div>

        <div className="row">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                className="col-md-4 mb-4"
                key={job.id}
                onMouseEnter={() => setHoveredCard(job.id)} // Set the hovered card
                onMouseLeave={() => setHoveredCard(null)}
                data-aos="fade-up" // Add animation on scroll
                data-aos-delay="300" // Delay for sequential animation
              >
                <div
                  className="card shadow-sm border-0 h-100"
                  style={{
                    transition: "transform 0.3s, box-shadow 0.3s",
                    transform:
                      hoveredCard === job.id ? "scale(1.05)" : "scale(1)",
                    boxShadow:
                      hoveredCard === job.id
                        ? "0 4px 15px rgba(0, 0, 0, 0.2)"
                        : "none",
                  }}
                >
                  <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    <h5
                      className="card-title text-black"
                      style={{
                        transition: "color 0.3s ease", // Transition on hover
                      }}
                    >
                      {job.name}
                    </h5>
                    <p className="card-text flex-grow-1 text-black">
                      {job.description
                        ? `${job.description.substring(0, 60)}...` // Fixed template literal
                        : "No description available."}
                    </p>
                    <button
                      className="btn btn-primary mt-2"
                      style={{
                        width: "150px",
                        transition: "transform 0.3s ease", // Hover effect on button
                      }}
                      onClick={() => handleApply(job.id)}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p className="text-black">
                No jobs found. Try adjusting your search!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}