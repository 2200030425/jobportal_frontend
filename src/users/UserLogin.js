import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

export default function UserLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegisterClick = () => {
    navigate("/registeruser");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `http://localhost:8080/userlogin/${email}/${password}`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const token = response.data.token;
        const userId = response.data.userId;
        const userEmail = response.data.email;

        localStorage.setItem("jwtToken", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userEmail", userEmail);

        alert("Login successful!");
        navigate("/user");
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div>
      <section
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          backgroundColor: "#e7e7e5",
        }}
        className="vh-100 d-flex flex-column"
      >
        <div className="container-fluid h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5" data-aos="fade-up">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample"
                data-aos="zoom-in"
              />
            </div>
            <div
              className="col-md-8 col-lg-6 col-xl-4 offset-xl-1"
              data-aos="fade-left"
            >
              <h1 className="text-center text-black mb-4" data-aos="fade-up">
                Job Portal
              </h1>
              <h5 className="text-center text-black mb-4" data-aos="fade-up">
                Welcome
              </h5>

              <form onSubmit={handleLogin} data-aos="fade-up">
                <div className="form-outline mb-4">
                  <input
                    style={{
                      border: "2px solid #007bff",
                      backgroundColor: "",
                      // color: "white",
                    }}
                    type="email"
                    className="form-control form-control-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    data-aos="fade-up"
                  />
                  <label className="form-label text-black">Email address</label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    style={{
                      border: "2px solid #007bff",
                      backgroundColor: "#",
                      // color: "white",
                    }}
                    type="password"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    data-aos="fade-up"
                  />
                  <label className="form-label text-black">Password</label>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    disabled={loading}
                    data-aos="zoom-in"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0 text-black">
                    Don't have an account?{" "}
                    <button
                      className="btn btn-link p-0 link-danger"
                      style={{ textDecoration: "none" }}
                      onClick={handleRegisterClick}
                      data-aos="fade-up"
                    >
                      Register
                    </button>
                  </p>
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
          // data-aos="fade-up"
        >
          <p className="mb-0 text-light">
            &copy; {new Date().getFullYear()} Job Portal. All Rights Reserved.
          </p>
        </footer>
      </section>
    </div>
  );
}
