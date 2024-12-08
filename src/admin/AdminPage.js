import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate(); // Hook to handle navigation
  const [users, setUsers] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all data from the backend when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get("http://localhost:8080/users");
        const recruitersResponse = await axios.get(
          "http://localhost:8080/recruiters"
        );
        const jobsResponse = await axios.get("http://localhost:8080/jobs");

        setUsers(usersResponse.data);
        setRecruiters(recruitersResponse.data);
        setJobs(jobsResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Logout function that redirects to the login page
  const handleLogout = () => {
    // You can clear any authentication tokens here if needed
    // localStorage.removeItem("jwtToken");
    navigate("/"); // Navigate to the login page
  };

  return (
    <div
      style={{
        backgroundColor: "#1a1a1a",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="container text-light"
        style={{
          backgroundColor: "#1a1a1a",
        }}
      >
        <h1 className="text-center mb-4">Admin Page</h1>
        {/* Logout button placed at the top-right corner */}
        <button
          onClick={handleLogout}
          className="btn btn-danger position-absolute"
          style={{ top: "10px", right: "10px" }}
        >
          Logout
        </button>
        <section>
          <h2>Users</h2>
          <table
            className="table table-dark table-bordered"
            style={{ borderWidth: "2px", borderColor: "black" }}
          >
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section>
          <h2>Recruiters</h2>
          <table
            className="table table-dark table-bordered"
            style={{ borderWidth: "2px", borderColor: "black" }}
          >
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {recruiters.map((recruiter) => (
                <tr key={recruiter.id}>
                  <td>{recruiter.firstName}</td>
                  <td>{recruiter.lastName}</td>
                  <td>{recruiter.email}</td>
                  <td>{recruiter.mobile}</td>
                  <td>{recruiter.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section>
          <h2>Job Listings</h2>
          <table
            className="table table-dark table-bordered"
            style={{ borderWidth: "2px", borderColor: "black" }}
          >
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.name}</td>
                  <td>{job.company}</td>
                  <td>{job.location}</td>
                  <td>{job.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
