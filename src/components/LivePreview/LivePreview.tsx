import React from "react";
import type { LivePreviewProps } from "../../types";
import { getProductByName } from "../../utils/productUtils";
import styles from "./LivePreview.module.css";

const LivePreview: React.FC<LivePreviewProps> = ({ selectedProduct, selectedOptions, products }) => {
  const product = getProductByName(selectedProduct, products);
  
  if (!product) return null;

  let previewImage = product.image;

  const firstOptionName = product.options?.[0]?.name;
  if (product.images && firstOptionName && selectedOptions[firstOptionName]) {
    previewImage = product.images[selectedOptions[firstOptionName]];
  }
  

  return (
    <div className={styles["live-preview-container"]}>
      <h3>Live Preview</h3>
      <p>You selected: {selectedProduct}</p>
      {Object.entries(selectedOptions).map(([key, value]) => (
        <p key={key}>
          {key}: {value}
        </p>
      ))}
      <div className={styles["image-container"]}>
        <img src={previewImage} alt={`${selectedProduct} preview`} className={styles["preview-image"]} />
        {selectedOptions["Text"] && (
    <div className={styles["text-overlay"]}>
      {selectedOptions["Text"]}
    </div>
  )}
      </div>
    </div>
  );
};


export default LivePreview;
