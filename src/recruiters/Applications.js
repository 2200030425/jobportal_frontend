import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarRec from "../NavbarRec";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS styles

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize AOS for animations
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });

    const fetchApplications = async () => {
      const recruiterId = localStorage.getItem("recruiterId");

      if (!recruiterId) {
        setError("Recruiter not logged in");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/applications/${recruiterId}`
        );
        // Filter out applications that are already accepted or rejected
        const pendingApplications = response.data.filter(
          (app) => app.status !== "accepted" && app.status !== "rejected"
        );
        setApplications(pendingApplications);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch applications");
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleStatusChange = async (applicationId, status) => {
    try {
      await axios.put(
        `http://localhost:8080/application/${applicationId}/status`,
        { status }
      );
      // Remove the application from the list after updating the status
      setApplications((prevApplications) =>
        prevApplications.filter((app) => app.id !== applicationId)
      );
    } catch (error) {
      console.error("Failed to update application status:", error);
    }
  };

  if (loading) {
    return <div>Loading applications...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div
      style={{
        backgroundColor: "#e7e7e5",
        minHeight: "100vh",
      }}
    >
      <NavbarRec />
      <div className="container mt-5">
        <h2 className="text-center text-black mb-4" data-aos="fade-up">
          Applications for Your Jobs
        </h2>
        {applications.length === 0 ? (
          <div className="alert alert-info text-black" data-aos="fade-up">
            No applications found for your jobs.
          </div>
        ) : (
          <div className="card bg-dark" data-aos="fade-up">
            <div className="card-body">
              <table className="table table-dark table-striped">
                <thead>
                  <tr>
                    <th>Applicant Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Age</th>
                    <th>Job Title</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((application) => (
                    <tr key={application.id} data-aos="fade-up">
                      <td>
                        {application.firstName} {application.lastName}
                      </td>
                      <td>{application.email}</td>
                      <td>{application.mobile}</td>
                      <td>{application.age}</td>
                      <td>{application.jobName}</td>
                      <td>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() =>
                            handleStatusChange(application.id, "accepted")
                          }
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleStatusChange(application.id, "rejected")
                          }
                        >
                          Reject
                        </button>
                      </td>
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
