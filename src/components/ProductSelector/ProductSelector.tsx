import React from "react";
import type { ProductSelectorProps } from "../../types";
import styles from "./ProductSelector.module.css";

const ProductSelector: React.FC<ProductSelectorProps> = ({ 
  products, 
  onProductChange,
  selectedProduct 
}) => {
  return (
    <div className={styles["product-selector-container"]}>
      <label htmlFor="product-select">Choose a product:</label>
      <select
        id="product-select"
        onChange={(e) => onProductChange(e.target.value)}
        value={selectedProduct} 
      >
        <option value="" disabled>
          Select a product
        </option>
        {products.map((product) => (
          <option key={product.product} value={product.product}>
            {product.product} - £{Array.isArray(product.price) ? product.price.join("/") : product.price.toFixed(2)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductSelector;