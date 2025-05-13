import React from "react";
import type { LivePreviewProps } from "../../types";
import { getProductByName } from "../../utils/productUtils";
import styles from "./LivePreview.module.css";

const LivePreview: React.FC<LivePreviewProps> = ({
  selectedProduct,
  selectedOptions,
  products,
  defaultImage,
}) => {
  // If no product selected, show default image
  if (!selectedProduct) {
    return (
      <div className={styles["live-preview-container"]}>
        <div className={styles["select-prompt"]}>
          <p>No product selected</p>
        </div>
        <div className={styles["image-container"]}>
          <img
            src={defaultImage}
            alt="Select a product"
            className={styles["preview-image"]}
          />
        </div>
      </div>
    );
  }

  const product = getProductByName(selectedProduct, products);

  // Safety check
  if (!product) return null;

  let previewImage = product.image;

  const firstOptionName = product.options?.[0]?.name;
  if (product.images && firstOptionName && selectedOptions[firstOptionName]) {
    previewImage = product.images[selectedOptions[firstOptionName]];
  }

  // Regular display with product selected
  return (
    <div className={styles["live-preview-container"]}>
      <h3>Live Preview</h3>
      <p>You selected: {selectedProduct}</p>
      {Object.entries(selectedOptions).map(([key, value]) =>
        key === "Price" ? null : (
          <p key={key}>
            {key}: {value}
          </p>
        )
      )}

      <p>
        Price:{" "}
        {selectedOptions["Price"]
          ? selectedOptions["Price"]
          : Array.isArray(product.price)
          ? product.price.join("/")
          : product.price.toFixed(2)}
      </p>

      <div className={styles["image-container"]}>
        <img
          src={previewImage}
          alt={`${selectedProduct} preview`}
          className={styles["preview-image"]}
        />
        {selectedOptions["Text"] && (
          <div className={styles["text-overlay"]}>
            {selectedOptions["Text"]}
          </div>
        )}
        {selectedProduct === "Gift Card" && selectedOptions["Price"] && (
          <div className={styles["giftcard-overlay"]}>
            {selectedOptions["Price"]}
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePreview;
