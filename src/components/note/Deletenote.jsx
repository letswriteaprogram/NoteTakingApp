import React, { useState } from "react";
import Modal from "../util/Modal";
import Button from "../util/Button";
import { useDispatch } from "react-redux";
import { removeNote } from "../../features/notesSlice";
import { FaTrash } from "../../icon/Icon";

function Deletenote({ id, name }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function handleDelete() {
    setLoading(true);
    try {
      await dispatch(removeNote(id)); // Assuming removeNote is an async action
      setIsOpen(false); // Close modal after delete
    } catch (error) {
      console.error("Failed to delete note:", error);
      // Optionally, show a notification here (consider using a toast notification)
    } finally {
      setLoading(false); // Reset loading state
    }
  }

  return (
    <>
      <FaTrash
        onClick={() => setIsOpen(true)}
        className="text-2xl cursor-pointer"
        aria-label={`Delete note: ${name}`} // Accessibility improvement
      />
      <Modal isOpen={isOpen} onClose={() => {
        setIsOpen(false);
        setLoading(false); // Reset loading state when modal closes
      }}>
        <p className="p-4 text-xl text-center">
          Are you sure you want to delete the note: <span className="font-bold">{name}</span>?
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={handleDelete} disabled={loading} aria-label="Confirm delete">
            {loading ? "Deleting..." : "Confirm"}
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default Deletenote;
