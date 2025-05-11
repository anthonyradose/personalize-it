import React from "react";
import { products } from "./data/products";
import ProductSelector from "./components/ProductSelector/ProductSelector";
import OptionForm from "./components/OptionForm/OptionForm";
import LivePreview from "./components/LivePreview/LivePreview";
import SubmitButton from "./components/SubmitButton/SubmitButton";
import usePersistedState from "./hooks/usePersistedState";
import styles from "./styles/App.module.css";

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = usePersistedState<string>("selectedProduct", "T-shirt");
  const [selectedOptions, setSelectedOptions] = usePersistedState<{ [key: string]: string }>("selectedOptions", {});

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
  };

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.heading}>Product Customizer</h1>
      <div className={styles.formSection}>
        <ProductSelector products={products} onProductChange={handleProductChange} />
        {product && (
          <OptionForm
            options={product.options}
            selectedOptions={selectedOptions}
            onOptionChange={handleOptionChange}
          />
        )}
        <LivePreview selectedProduct={selectedProduct} selectedOptions={selectedOptions} />
        <SubmitButton onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default App;
