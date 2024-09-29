import React, { useState } from "react";
import Modal from "../util/Modal";
import { FaBook } from "../../icon/Icon";
import "./Readnote.css";
import "../scrollbar.css";

function Readnote({ Name, Text }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FaBook
        className="text-2xl cursor-pointer"
        onClick={() => setIsOpen(true)}
      ></FaBook>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-2xl mb-4 capitalize border-b-2 border-black font-bold">
          {Name}
        </h2>
        <p
          className="text-xl max-h-[60vh] min-w-[50vw] max-w-[90vw] overflow-y-auto max-h- custom-scrollbar break-words border border-black p-4 Note rounded-lg"
          dangerouslySetInnerHTML={{ __html: Text }}
        ></p>
      </Modal>
    </>
  );
}

export default Readnote;
