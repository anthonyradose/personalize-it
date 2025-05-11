import React from "react";
import type { SubmitButtonProps } from "../../types";
import styles from "./SubmitButton.module.css";

const SubmitButton: React.FC<SubmitButtonProps> = ({ onSubmit }) => {
  return (
    <button
      type="button"
      onClick={onSubmit}
      className={styles["submit-button"]}
      aria-label="Submit selected options"
    >
      Submit
    </button>
  );
};

export default SubmitButton;
