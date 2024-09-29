import React from "react";
import "./scrollbar.css";
import BoardList from "./board/BoardList";
import Addboard from "./board/Addboard";
import { useSelector } from "react-redux";
import { useSidebar } from "../context/SidebarContext";
import { FaGithub } from "../icon/Icon";
function Sidebar() {
  const { isSidebarOpen } = useSidebar();
  const boards = useSelector((state) => state.boards.boards);
  return (
    <section
      className={`absolute p-2 ${
        isSidebarOpen
          ? "translate-x-0"
          : " -translate-x-[100%] sm:translate-x-0 "
      } -translate-x-10 sm:relative w-full h-[90vh] min-w-60  sm:w-[30vw] border-2 bg-gray-300  flex flex-col items-center transition-all duration-1000 z-10`}
    >
      <h1 className="text-center text-xl p-1">
        Boards List{boards.length ? ` : ${boards.length}` : ""}{" "}
      </h1>
      <div className="w-full bords_list max-h-[78vh] overflow-auto custom-scrollbar p-1 m-2 border-2 border-black rounded-lg ">
        <BoardList />
      </div>
      <Addboard />
      <a className="text-black absolute bottom-5 left-2 z-20" href="https://github.com/letswriteaprogram/NoteTakingApp">
        <FaGithub className="text-4xl " />
      </a>
    </section>
  );
}

export default Sidebar;
