import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

export default function JobApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      const userEmail = localStorage.getItem("userEmail");

      if (!userEmail) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/userApplications/${userEmail}` // API endpoint for user applications
        );
        setApplications(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching applications:", err); // Log the error for debugging
        setError("Failed to fetch applications. Please try again later.");
        setLoading(false);
      }
    };

    fetchApplications();
    AOS.init(); // Initialize AOS
  }, []);

  if (loading) {
    return <div>Loading applications...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div
      style={{
        backgroundColor: "#e7e7e5",
        minHeight: "100vh",
        // padding: "20px",
      }}
    >
      <Navbar />
      <div className="container mt-5">
        <h2
          className="text-center text-black mb-4"
          data-aos="fade-up" // AOS animation
        >
          Your Job Applications
        </h2>
        {applications.length === 0 ? (
          <div className="alert alert-info" data-aos="fade-up">
            You haven't applied for any jobs yet.
          </div>
        ) : (
          <div className="card bg-white" data-aos="fade-up">
            <div className="card-body">
              <table className="table  table-borderless">
                <thead>
                  <tr>
                    <th>Recruiter</th>
                    <th>Job Title</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((application) => (
                    <tr key={application.id}>
                      <td>{application.job.company}</td>
                      <td>{application.jobName}</td>
                      <td>{application.email}</td>
                      <td>{application.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
