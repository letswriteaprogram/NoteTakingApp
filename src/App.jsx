import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProtectedRoute from "./components/util/ProtectedRoute";
import DashBoard from "./components/DashBoard";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "./features/UserSlice";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.user) {
      dispatch(fetchCurrentUser()); // Fetch current user if not authenticated
    }
  }, [auth.user, dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
export default App;
