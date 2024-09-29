import React, { useState, useEffect } from "react";
import Modal from "../util/Modal";
import Input from "../util/Input";
import Button from "../util/Button"; 
import { useDispatch } from "react-redux";
import { modifyNote } from "../../features/notesSlice";
import { FaPenToSquare } from "../../icon/Icon";
import ReactQuillEditor from "../util/ReactQuillEditor"; // Importing the new component

function Updatenote({ noteId = "", Name = "", Text = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [noteName, setNoteName] = useState(Name);
  const [noteText, setNoteText] = useState(Text);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const dispatch = useDispatch();

  useEffect(() => {
    setNoteName(Name);
    setNoteText(Text);
  }, [Name, Text]); // Update local state when props change
  const validate = () => {
    const newErrors = {};
    if (!noteName) newErrors.noteName = "Note Name is required";
    else if (noteName.length < 4)
      newErrors.noteName = "Note Name must be at least 4 characters";
    // Check if noteText is empty or only contains whitespace
    if (
      !noteText ||
      noteText.trim() === "<p><br></p>" ||
      noteText.trim() === ""
    ) {
      newErrors.noteText = "Note Text is required";
    } else if (noteText.length < 4) {
      newErrors.noteText = "Note Text must be at least 4 characters";
    }
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
    const data = { noteName, noteText };
    setLoading(true); // Set loading state
    await dispatch(modifyNote({ noteId, data })); // Assuming this returns a promise
    setIsOpen(false);
    setLoading(false); // Reset loading state
  };

  return (
    <section>
      <Modal isOpen={isOpen} onClose={() => {
        setIsOpen(false);
        setErrors({}); // Reset errors when modal closes
      }}>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            className="w-full"
            value={noteName}
            onChange={(e) => setNoteName(e.target.value)}
            placeholder="Update Note Name"
            required
            message={errors.noteName}
          />
          <ReactQuillEditor
            value={noteText}
            onChange={setNoteText} // Directly set note text
            placeholder="Update Note Text"
            message={errors.noteText}
          />
          <div className="flex justify-center">
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Note"}
            </Button>
          </div>
        </form>
      </Modal>
      <FaPenToSquare
        onClick={() => {
          setIsOpen(true);
          setErrors({}); // Clear errors when opening modal
        }}
        className="text-2xl cursor-pointer"
      />
    </section>
  );
}

export default Updatenote;
