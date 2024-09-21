import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, logoutUser } from "../features/UserSlice";
import Button from "./util/Button";
import { useNavigate } from "react-router-dom";

function DashBoard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const auth = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  if (auth.loading) {
    return <div>Loading...</div>; // Show a loading state while fetching user
  }

  if (!auth.user) {
    navigate("/login"); // Redirect if user is not authenticated
    return null; // Prevent rendering until navigation
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className="text-2xl">Dashboard</h1>
      <p>Welcome, {auth.user.name}!</p> {/* Display the user's name */}
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}

export default DashBoard;
