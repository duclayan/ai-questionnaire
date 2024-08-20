// src/components/forms/InputField/InputField.js
import React from "react";
import "./InputField.css";

const InputField = ({ label, type = "text", value, onChange, placeholder }) => {
  return (
    <div className="input-field">
      {label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input"
      />
    </div>
  );
};

export default InputField;
