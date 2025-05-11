import React, { useState } from "react";
import { products } from "./data/products";
import ProductSelector from "./components/ProductSelector";
import OptionForm from "./components/OptionForm";
import LivePreview from "./components/LivePreview";
import SubmitButton from "./components/SubmitButton";

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>("T-shirt");
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});

  const product = products.find((p) => p.product === selectedProduct);

  const handleProductChange = (product: string) => {
    setSelectedProduct(product);
    setSelectedOptions({});
  };

  const handleOptionChange = (name: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitting config", { product: selectedProduct, options: selectedOptions });
    localStorage.setItem("productConfig", JSON.stringify({ product: selectedProduct, options: selectedOptions }));
  };

  return (
    <div>
      {/* Product Selector Component */}
      <ProductSelector products={products} onProductChange={handleProductChange} />

      {/* OptionForm Component - Passes selectedOptions to reflect current state */}
      {product && (
        <OptionForm
          options={product.options}
          selectedOptions={selectedOptions}
          onOptionChange={handleOptionChange}
        />
      )}

      {/* LivePreview Component - Reflects the selected options */}
      <LivePreview selectedProduct={selectedProduct} selectedOptions={selectedOptions} />

      {/* SubmitButton Component */}
      <SubmitButton onSubmit={handleSubmit} />
    </div>
  );
};

export default App;
