// src/components/Dropdown.jsx
import React from "react";
import Select from "react-select";

const Dropdown = ({ label, options, onChange, value, name, id }) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "1px solid #ccc",
      borderRadius: "4px",
      padding: "2px",
      fontSize: "14px",
      fontFamily: "Arial, sans-serif",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#007bff",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#007bff" : state.isFocused ? "#f0f0f0" : "white",
      color: state.isSelected ? "white" : "#333",
      cursor: "pointer",
      fontFamily: "Arial, sans-serif",
  }),
    indicatorSeparator: () => ({
        display: "none",
  }),
    indicatorContainer: () => ({
        padding: "0 8px",
        marginTop: "5px",
  }),
  };

  return (
    <div className="dropdown">
      {label && <label htmlFor={id}>{label}</label>}
      <Select
        options={options}
        value={value}
        onChange={onChange}
        styles={customStyles}
        className="react-select-container"
        classNamePrefix="react-select"
        name={name}
        inputId={id}
      />
    </div>
  );
};

export default Dropdown;