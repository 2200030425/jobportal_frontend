import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("jwtToken"); // Check if JWT token exists

  // If there's no token, redirect to login page with a message
  return token ? (
    children
  ) : (
    <Navigate
      to="/"
      state={{ message: "Please log in to access this page." }}
    />
  );
};

export default PrivateRoute;
