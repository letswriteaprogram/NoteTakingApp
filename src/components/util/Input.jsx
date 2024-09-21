import React from "react";

function Input({
  type = "text",
  value,
  onChange,
  placeholder = "",
  className = "",
  message = "",
}) {
  return (
    <div className="py-2">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border-2 ${message ? "border-red-500" : "border-black"} 
           text-black placeholder:text-black text-xl p-2 rounded-md ${className}`}
      />
      {message && (
        <p id="input-error" className="p-2 text-red-500">
          {message}
        </p>
      )}
    </div>
  );
}
export default Input;
