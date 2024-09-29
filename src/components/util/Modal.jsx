import React from "react";
import ReactDOM from "react-dom";
import Button from "./Button";
import { FaXmark } from "../../icon/Icon";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <section className="fixed inset-0 w-full p-2 bg-gray-500 flex justify-center items-center z-50">
      
      <div className="relative bg-white border border-black rounded-lg  py-8 px-4 flex justify-center items-center flex-col">
      <FaXmark onClick={onClose} className="absolute offset-0 top-2 right-2 text-2xl "/>
        {children}
      </div>
    </section>,
    document.body
  );
}

export default Modal;
