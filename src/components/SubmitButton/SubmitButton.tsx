// components/SubmitButton/SubmitButton.tsx

import React from "react";
import type { SubmitButtonProps } from "../../types";
import styles from "./SubmitButton.module.css";

const SubmitButton: React.FC<SubmitButtonProps> = ({ onSubmit, onSaveClick }) => {
  return (
    <div className={styles.buttonContainer}>
      <button 
        className={styles.saveButton} 
        onClick={onSaveClick}
        type="button"
      >
        Save Configuration
      </button>
      <button 
        className={styles.submitButton} 
        onClick={onSubmit}
        type="button"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default SubmitButton;