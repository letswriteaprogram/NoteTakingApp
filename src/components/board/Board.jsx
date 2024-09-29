import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Deleteboard from "./Deleteboard";
import Updateboard from "./Updateboard";
import { setActiveBoard } from "../../features/boardSlice"; // Import your setActiveBoard thunk
import { useSidebar } from "../../context/SidebarContext";

function Board({ board }) {
  const dispatch = useDispatch(); // Use dispatch to trigger the action
  const { toggleSidebar } = useSidebar();
  const activeBoard = useSelector((state) => state.boards.activeBoard); // Get activeBoard from state

  // Handle setting active board
  const handleSetActiveBoard = (boardId) => {
    toggleSidebar()
    dispatch(setActiveBoard(boardId)); // Dispatch the thunk
  };

  return (
    <div
      key={board.$id}
      className={`w-full flex justify-between px-4 p-2 my-4  rounded-lg gap-2  ${
        board.$id === activeBoard?.$id ? "bg-black/100 text-white/100" : "bg-white"
      }`} // Highlight active board with a different background
    >
      <p
        className="cursor-pointer w-full overflow-hidden text-ellipsis whitespace-nowrap font-semibold capitalize"
        onClick={() => handleSetActiveBoard(board.$id)}
      >
        {board.boardName}
      </p>

      <div className="flex gap-2">
        <Updateboard boardId={board.$id} name={board.boardName} />
        <Deleteboard id={board.$id} name={board.boardName} />
      </div>
    </div>
  );
}

export default Board;
