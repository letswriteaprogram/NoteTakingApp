import { removeNotesByBoardId } from "../../features/notesSlice";
import { removeBoard, setActiveBoard } from "../../features/boardSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Button from "../util/Button";
import Modal from "../util/Modal";
import { FaTrash } from "react-icons/fa6";

function Deleteboard({ id, name }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Error state for any issues during deletion
  const dispatch = useDispatch();
  const activeBoardId = useSelector((state) => state.boards.activeBoardId);

  // Handle the deletion of the board and its notes
  async function handleDelete() {
    try {
      setLoading(true); // Set loading state
      setError(null); // Reset previous errors

      // Delete all notes associated with this board
      await dispatch(removeNotesByBoardId(id)).unwrap();

      // Remove the board itself
      await dispatch(removeBoard(id)).unwrap();

      setIsOpen(false); // Close the modal if successful
    } catch (err) {
      setError("Failed to delete the board. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  }

  return (
    <>
      {/* Trash Icon to Open Modal */}
      <FaTrash
        onClick={() => setIsOpen(true)}
        className="text-2xl cursor-pointer"
      />

      {/* Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-6 text-center">
          <p className="text-xl mb-4">
            Are you sure you want to delete the board:{" "}
            <span className="font-bold"> {name}</span>?
          </p>
          {/* Error Message Display */}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Confirm"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Deleteboard;
