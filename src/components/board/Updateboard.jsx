import React, { useState, useEffect } from "react";
import Modal from "../util/Modal";
import Input from "../util/Input";
import Button from "../util/Button";
import { modifyBoard } from "../../features/boardSlice";
import { useDispatch } from "react-redux";
import { FaPenToSquare } from "../../icon/Icon";

function UpdateBoard({ boardId, name }) {
  const [isOpen, setIsOpen] = useState(false);
  const [boardName, setBoardName] = useState(name);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state to prevent multiple submissions
  const dispatch = useDispatch();

  // Input validation function
  function validate() {
    const trimmedName = boardName.trim(); // Trim whitespace for accurate validation
    if (!trimmedName) {
      setError("Board Name is required");
      return false;
    }
    if (trimmedName.length < 5) {
      setError("Board Name must be at least 5 characters long");
      return false;
    }
    setError("");
    return true;
  }

  // Handle the submission of the updated board name
  async function handleSubmit(e) {
    e.preventDefault();
    if (validate() && !loading) { // Prevent multiple submissions if already loading
      try {
        setLoading(true);
        await dispatch(modifyBoard({ boardId, boardName: boardName.trim() })).unwrap(); // Modify the board name
        setIsOpen(false); // Close modal if successful
      } catch (error) {
        setError("Failed to update board. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  }

  // Open the modal for board updates
  function handleOpenModal() {
    if (boardId) setIsOpen(true); // Open modal only if boardId is present
  }

  return (
    <section>
      {/* Icon Button to Open Modal */}
      <FaPenToSquare onClick={handleOpenModal} className="text-2xl cursor-pointer" />

      {/* Update Board Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
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
          <div className="flex justify-center gap-4 p-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
}

export default UpdateBoard;
