import React from "react";

function Textarea({
  value,
  onChange,
  placeholder = "",
  className = "",
  message = "",
}) {
  return (
    <div className="py-2 ">
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border-2 min-h-40 max-h-80 ${message ? "border-red-500" : "border-black"} 
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
export default Textarea;
