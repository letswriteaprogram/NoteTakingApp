import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill editor styles
import './ReactQuillEditor.css'
const ReactQuillEditor = ({ value, onChange, placeholder, message }) => {
  // Quill Editor configurations
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ["clean"], // 'clean' button will remove formatting
      ["code-block"], // Add code block option
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list", // Include list formats
    "code-block", // Include code block format
  ];

  return (
    <>
      <ReactQuill
        value={value}
        onChange={onChange} // Directly set note text
        placeholder={placeholder}
        modules={modules}
        formats={formats}
        className="quill-editor" // Optional: Add your custom styles here
      />
      {message && (
        <p id="input-error" className="p-2 text-red-500">
          {message}
        </p>
      )}
    </>
  );
};

export default ReactQuillEditor;
