import React from "react";

function Button({
  type = "button",
  onClick,
  className = "",
  children,
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={` text-white  bg-black  text-xl p-2 rounded-md ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
