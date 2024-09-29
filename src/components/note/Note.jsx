import React from "react";
import Updatenote from "./Updatenote";
import Deletenote from "./Deletenote";
import Readnote from "./Readnote";
import './Readnote.css'
function Note({ note }) {
  return (
    <div
      key={note.$id}
      className="w-full max-w-80 min-w-60 max-h-64 border-2 border-black bg-gray-100 mb-3 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg"
    >
      <h3 className="font-bold border-b-2 border-black p-2 mb-2">
        {note.noteName}
      </h3>
      <p
        className="line-clamp-4 h-28 overflow-hidden   m-3 break-words Note"
        dangerouslySetInnerHTML={{ __html: note.noteText }}
      ></p>
      <div className="w-full h-10 flex justify-evenly items-center p-2 border-t-2 border-black text-xl">
        <Readnote Name={note.noteName} Text={note.noteText} />
        <Updatenote
          noteId={note.$id}
          Name={note.noteName}
          Text={note.noteText}
        />
        <Deletenote id={note.$id} name={note.noteName} />
      </div>
    </div>
  );
}

export default Note;
