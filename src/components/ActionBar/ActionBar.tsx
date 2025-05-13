import React from "react";
import styles from "./ActionBar.module.css";
import type { ActionBarProps } from "../../types";

const ActionBar: React.FC<ActionBarProps> = ({
  onSubmit,
  onSaveClick,
  onLoadClick,
}) => {
  return (
    <div className={styles.actionBar}>
      <div className={styles.loadDesignContainer}>
        <button
          className={styles.loadButton}
          onClick={onLoadClick}
          type="button"
        >
          Load Saved Design
        </button>
      </div>
      <div className={styles.primaryActions}>
        <button
          className={styles.saveButton}
          onClick={onSaveClick}
          type="button"
        >
          Save Design
        </button>
        <button
          className={styles.submitButton}
          onClick={onSubmit}
          type="button"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ActionBar;
