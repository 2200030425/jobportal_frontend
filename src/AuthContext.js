import React, { createContext, useContext, useState } from "react";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null); // New state for user role

  // Function to log in for users
  const loginUser = () => {
    setIsAuthenticated(true);
    setRole("user"); // Set role to user
  };

  // Function to log in for recruiters
  const loginRecruiter = () => {
    setIsAuthenticated(true);
    setRole("recruiter"); // Set role to recruiter
  };

  // Function to log out
  const logout = () => {
    setIsAuthenticated(false);
    setRole(null); // Clear role on logout
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, role, loginUser, loginRecruiter, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

