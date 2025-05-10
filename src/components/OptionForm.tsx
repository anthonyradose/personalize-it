import React from "react";
import type { OptionFormProps } from "../types";

const OptionForm: React.FC<OptionFormProps> = ({
  options,
  selectedOptions,
  onOptionChange,
}) => {
  return (
    <div>
      {options.map((option) => (
        <div key={option.name}>
          <label htmlFor={option.name}>{option.name}:</label>
          <select
            id={option.name}
            value={selectedOptions[option.name] || ""}
            onChange={(e) => onOptionChange(option.name, e.target.value)}
          >
            <option value="">Select {option.name}</option>
            {option.values?.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default OptionForm;
