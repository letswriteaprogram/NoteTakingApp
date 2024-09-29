import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./page/Signup";
import Login from "./page/Login";
import ProtectedRoute from "./components/util/ProtectedRoute";
import DashBoard from "./page/DashBoard";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "./features/userSlice";
import { fetchBoards } from "./features/boardSlice";
import NotFound from "./page/NotFound";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const userId = auth?.user?.$id;

  useEffect(() => {
    if (!auth.user) {
      dispatch(fetchCurrentUser()); // Fetch current user if not authenticated
    }
  }, [auth.user, dispatch]);

  // Fetch boards only when userId is available
  useEffect(() => {
    if (userId) {
      dispatch(fetchBoards(userId));
    }
  }, [userId, dispatch]);

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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
