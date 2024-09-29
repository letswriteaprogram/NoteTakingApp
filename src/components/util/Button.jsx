import React from "react";

function Button({
  type = "button",
  onClick,
  className = "",
  children,
  disabled = false,
  icon = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`min-w-24 text-white  bg-black  sm:text-lg lg:text-xl p-2 m-2 rounded-md ${className} 
      flex justify-center items-center gap-2 hover:scale-105 transition-all duration-100
      ${disabled ? "bg-black/80" : ""}`}
    >
      {children}
    </button>
  );
}

export default Button;
