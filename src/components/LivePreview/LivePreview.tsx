import React from "react";
import type { LivePreviewProps } from "../../types";
import styles from "./LivePreview.module.css";

const LivePreview: React.FC<LivePreviewProps> = ({ selectedProduct, selectedOptions }) => {
  return (
    <div className={styles["live-preview-container"]}>
      <h3>Live Preview</h3>
      <p>You selected: {selectedProduct}</p>
      {Object.entries(selectedOptions).map(([key, value]) => (
        <p key={key}>
          {key}: {value}
        </p>
      ))}
    </div>
  );
};

export default LivePreview;
