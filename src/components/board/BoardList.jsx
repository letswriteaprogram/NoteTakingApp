import React from "react";
import { useSelector } from "react-redux";
import Board from "./Board"; // Import the Board component

function BoardList() {
  const boardsdata = useSelector((state) => state.boards); // Access the list of boards from the store
  if (boardsdata.boards.length <= 0)
    return (
      <p className="text-center p-2 text-lg">
        It looks like you haven't added any board yet. Start creating some to
        get organized!
      </p>
    );

  return (
    <section className="w-full  px-2 ">
      {boardsdata.boards.map((board) => (
        <Board key={board.$id} board={board} /> // Render each board using the Board component
      ))}
    </section>
  );
}

export default BoardList;
