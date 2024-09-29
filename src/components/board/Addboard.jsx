import React, { useState } from "react";
import Modal from "../util/Modal";
import Input from "../util/Input";
import Button from "../util/Button";
import { addBoard, setActiveBoard } from "../../features/boardSlice";
import { useSelector, useDispatch } from "react-redux";

function Addboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  // Get the loading and user data from Redux state
  const loading = useSelector((state) => state.boards.loading);
  const user = useSelector((state) => state.auth.user);
  const userId = user?.$id;

  // Validate the input board name
  function validate() {
    if (!boardName) {
      setError("Board Name is required");
      return false;
    }
    if (boardName.length <= 4) {
      setError("Board Name must be at least 5 characters long");
      return false;
    }
    setError("");
    return true;
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    if (validate() && !loading) {
      try {
        // Dispatch the action to add a new board and wait for the result
        const newBoard = await dispatch(addBoard({ userId, boardName })).unwrap();

        // Set the newly created board as the active board
        dispatch(setActiveBoard(newBoard.$id));

        setBoardName(""); // Clear the input field
        setIsOpen(false); // Close the modal
      } catch (error) {
        setError("Failed to create board. Please try again.");
      }
    }
  }

  return (
    <section>
      {/* Modal to handle board creation */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setBoardName(""); // Reset state on close
        }}
      >
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            className="w-full"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            placeholder="Enter Board Name"
            required
            message={error}
          />
          <div className="flex justify-center p-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Button to trigger modal opening */}
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Add New Board
      </Button>
    </section>
  );
}

export default Addboard;
