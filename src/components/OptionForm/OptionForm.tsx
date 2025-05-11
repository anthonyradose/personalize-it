import React from "react";
import type { OptionFormProps } from "../../types";
import styles from "./OptionForm.module.css";

const OptionForm: React.FC<OptionFormProps> = ({
  options,
  selectedOptions,
  onOptionChange,
}) => {
  return (
    <div>
      {options.map((option) => (
        <div key={option.name} className={styles.formGroup}>
          <label htmlFor={option.name} className={styles.label}>
            {option.name}:
          </label>
          <select
            id={option.name}
            className={styles.select}
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
