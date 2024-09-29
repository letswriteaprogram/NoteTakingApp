import React, { useState } from "react";
import Modal from "../util/Modal";
import Input from "../util/Input";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../../features/notesSlice";
import Button from "../util/Button";
import ReactQuillEditor from "../util/ReactQuillEditor"; // Importing the new component

function Addnote({ className = "", noteToEdit = null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [noteName, setNoteName] = useState(noteToEdit ? noteToEdit.Name : "");
  const [noteText, setNoteText] = useState(noteToEdit ? noteToEdit.Text : "");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const board = useSelector((state) => state.boards.activeBoard); // Get activeBoard from state

  const validate = () => {
    const newErrors = {};
    if (!noteName) newErrors.noteName = "Note Name is required";
    else if (noteName.length < 4)
      newErrors.noteName = "Note Name must be at least 4 characters";
    if (!noteText) newErrors.noteText = "Note Text is required";
    else if (noteText.length < 4)
      newErrors.noteText = "Note Text must be at least 4 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors on new submission
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const boardId = board?.$id; // Get the active board ID
    setLoading(true); // Set loading state

    try {
      if (noteToEdit) {
        // Update existing note
        await dispatch(modifyNote({ noteId: noteToEdit.id, data: { noteName, noteText } }));
      } else {
        // Create new note
        await dispatch(createNote({ boardId, noteName, noteText }));
      }
      setNoteName(""); // Clear the input field
      setNoteText(""); // Clear the input field
      setIsOpen(false);
    } catch (error) {
      setErrors({ note: "Failed to save note. Please try again." });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const isBoardActive = Boolean(board); // Check if there is an active board

  return (
    <section>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setErrors({}); // Reset errors when modal closes
          setNoteName(""); // Clear note name
          setNoteText(""); // Clear note text
        }}
      >
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            className="w-full"
            value={noteName}
            onChange={(e) => setNoteName(e.target.value)}
            placeholder="Enter Note Name"
            required
            message={errors.noteName}
          />
          <ReactQuillEditor
            value={noteText}
            onChange={setNoteText} // Directly set note text
            placeholder="Enter Note Text"
            message={errors.noteText}
          />
          <div className="flex justify-center p-2">
            <Button type="submit" disabled={!isBoardActive || loading}>
              {loading ? "Saving..." : noteToEdit ? "Update Note" : "Save"}
            </Button>
          </div>
        </form>
      </Modal>
      <Button
        className={className}
        onClick={() => {
          setIsOpen(true);
          setErrors({}); // Clear errors when opening modal
          if (noteToEdit) {
            setNoteName(noteToEdit.Name); // Set note name for editing
            setNoteText(noteToEdit.Text); // Set note text for editing
          }
        }}
        disabled={!isBoardActive}
      >
        {noteToEdit ? "Edit Note" : "Add New Note"}
      </Button>
    </section>
  );
}

export default Addnote;
