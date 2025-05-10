// src/components/LivePreview.tsx
import React from "react";
import type { LivePreviewProps } from "../types";

const LivePreview: React.FC<LivePreviewProps> = ({ selectedProduct, selectedOptions }) => {
  return (
    <div>
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
