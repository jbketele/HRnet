import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css"; // Importez votre fichier CSS personnalisé

const DatePicker = ({ onChange }) => {
    const [date, setDate] = useState(null);

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
        if (onChange) onChange(selectedDate);
    };

    const months = Array.from({ length: 12 }, (_, i) => ({
        value: i,
        label: new Date(0, i).toLocaleString("en-US", { month: "long" }),
    }));

    const years = Array.from({ length: 100 }, (_, i) => {
        const year = new Date().getFullYear() - i;
        return { value: year, label: year };
    });

    // Styles personnalisés pour react-select
    const customSelectStyles = {
        control: (provided) => ({
            ...provided,
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "2px",
            fontSize: "14px",
            boxShadow: "none",
            width: "fit-content",
            "&:hover": {
                borderColor: "#007bff",
            },
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 1000,
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#007bff" : state.isFocused ? "#f0f0f0" : "white",
            color: state.isSelected ? "white" : "#333",
            cursor: "pointer",
        }),
        indicatorSeparator: () => ({
            display: "none",
        }),
    };

    return (
        <div className="custom-date-picker-container">
            <ReactDatePicker
                selected={date}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                className="custom-date-picker-input"
                calendarClassName="custom-calendar"
                renderCustomHeader={({ date, changeYear, changeMonth }) => (
                    <div className="custom-header">
                        <Select
                            options={months}
                            defaultValue={months[date.getMonth()]}
                            onChange={(selectedOption) => changeMonth(selectedOption.value)}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            styles={customSelectStyles} // Applique les styles personnalisés
                        />
                        <Select
                            options={years}
                            defaultValue={years.find((y) => y.value === date.getFullYear())}
                            onChange={(selectedOption) => changeYear(selectedOption.value)}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            styles={customSelectStyles} // Applique les styles personnalisés
                        />
                    </div>
                )}
            />
        </div>
    );
};

export default DatePicker;