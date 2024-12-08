import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // const handleRegisterClick = () => {
  //   navigate("/registeruser");
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `http://localhost:8080/adminLogin/${username}/${password}`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Assuming the backend sends a JWT token in the response
        // const token = response.data.token; // Get JWT token from response
        // const userId = response.data.userId;
        // const userEmail = response.data.email;
        console.log(response.data);

        // Store JWT token and other user info in localStorage
        // localStorage.setItem("jwtToken", token);
        // localStorage.setItem("userId", userId);
        // localStorage.setItem("userEmail", userEmail);

        alert("Login successful!");
        // console.log(localStorage.getItem("userEmail"));
        // console.log(localStorage.getItem("userId"));
        navigate("/admin"); // Redirect after login
      }
    } catch (err) {
      console.error("Login failed:", err);
      if (err.response) {
        console.error("Error response:", err.response);
        setError(
          `Error: ${err.response.data ? err.response.data : "Unknown error"}`
        );
      } else if (err.request) {
        console.error("Error request:", err.request);
        setError("Network error: No response from server.");
      } else {
        console.error("Error message:", err.message);
        setError("An unknown error occurred.");
      }
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          backgroundColor: "#1a1a1a",
        }}
        className="vh-100 d-flex flex-column"
      >
        <div className="container-fluid h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <h1 className="text-center text-light mb-4">Job Portal</h1>
              <h5 className="text-center text-light mb-4">Welcome</h5>

              <form onSubmit={handleLogin}>
                <div className="form-outline mb-4">
                  <input
                    style={{
                      border: "2px solid #007bff",
                      backgroundColor: "#282828",
                      color: "white",
                    }}
                    type="text"
                    className="form-control form-control-lg"
                    // placeholder="Enter a valid username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <label className="form-label text-light">Username</label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    style={{
                      border: "2px solid #007bff",
                      backgroundColor: "#282828",
                      color: "white",
                    }}
                    type="password"
                    className="form-control form-control-lg"
                    // placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label className="form-label text-light">Password</label>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                  {/* <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <button
                      className="btn btn-link p-0 link-danger"
                      style={{ textDecoration: "none" }}
                      onClick={handleRegisterClick}
                    >
                      Register
                    </button>
                  </p> */}
                </div>
              </form>
            </div>
          </div>
        </div>

        <footer
          className="text-center py-3 mt-auto shadow-sm"
          style={{
            backgroundColor: "#282828",
          }}
        >
          <p className="mb-0 text-light">
            &copy; {new Date().getFullYear()} Job Portal. All Rights Reserved.
          </p>
        </footer>
      </section>
    </div>
  );
}
