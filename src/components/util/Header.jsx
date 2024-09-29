import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/userSlice";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { FaBars, FaUser, FaXmark } from "../../icon/Icon";
import { useSidebar } from "../../context/SidebarContext";
import Loader from "./Loader";
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const auth = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  if (auth.loading) {
    return <Loader />; // Show a loading state while fetching user
  }

  if (!auth.user) {
    navigate("/login"); // Redirect if user is not authenticated
    return null; // Prevent rendering until navigation
  }

  return (
    <div className="w-screen min-w-60 h-[10vh] shadow-md flex px-4 sm:px-10  justify-between items-center">
      <p className="text-lg sm:text-xl capitalize font-bold flex justify-center items-center gap-2">
        <FaUser />
        {auth?.user?.name}
      </p>
      <div className="flex justify-center items-center gap-2">
        <Button onClick={handleLogout}>Logout</Button>
        {isSidebarOpen ? (
          <FaXmark className="sm:hidden text-2xl" onClick={toggleSidebar} />
        ) : (
          <FaBars className="sm:hidden text-2xl" onClick={toggleSidebar} />
        )}
      </div>
    </div>
  );
}
export default Header;
