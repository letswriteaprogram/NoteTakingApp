import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const auth = useSelector((state) => state.auth);

  if (auth.user) {
    return children; // Return the protected content if authenticated
  }

  return <Navigate to="/login" />; // Redirect to login if not authenticated
}

export default ProtectedRoute;
