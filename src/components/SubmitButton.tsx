import React from "react";
import type { SubmitButtonProps } from "../types";

const SubmitButton: React.FC<SubmitButtonProps> = ({ onSubmit }) => {
    return (
      <button type="button" onClick={onSubmit} aria-label="Submit selected options">
        Submit
      </button>
    );
  };
  

export default SubmitButton;