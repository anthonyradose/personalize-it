import React from "react";
import type { ProductSelectorProps } from "../types/index";


const ProductSelector: React.FC<ProductSelectorProps> = ({ products, onProductChange }) => {
  return (
    <div>
      <label htmlFor="product-select">Choose a product:</label>
      <select id="product-select" onChange={(e) => onProductChange(e.target.value)}>
        {products.map((product) => (
          <option key={product.product} value={product.product}>
            {product.product}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductSelector;
