// src/components/forms/InputField/InputField.js
import React from "react";
// import "./InputField.css";

export const FeatureButton = ({ label, type = "text", value, onChange, placeholder }) => {
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