import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Adjust the path if necessary

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { isAuthenticated, role } = useAuth(); // Get auth state and role

  if (!isAuthenticated) {
    alert("Please log in to access this page."); // Show alert
    return <Navigate to="/" />;
  }

  return allowedRoles.includes(role) ? (
    element
  ) : (
    <Navigate to={role === "user" ? "/user" : "/recruiter"} />
  );
};

export default ProtectedRoute;
