import React, { useEffect } from "react";
import { products } from "./data/products";
import ProductSelector from "./components/ProductSelector/ProductSelector";
import OptionForm from "./components/OptionForm/OptionForm";
import LivePreview from "./components/LivePreview/LivePreview";
import SubmitButton from "./components/SubmitButton/SubmitButton";
import usePersistedState from "./hooks/usePersistedState";
import { getProductByName } from "./utils/productUtils";
import styles from "./styles/App.module.css";
import { logo1, defaultImg } from "./assets/images/index";


const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = usePersistedState<string>("selectedProduct", "");
  const [selectedOptions, setSelectedOptions] = usePersistedState<{ [key: string]: string }>("selectedOptions", {});

  // Clear persisted state on initial load
  useEffect(() => {
    localStorage.removeItem("selectedProduct");
    localStorage.removeItem("selectedOptions");
    
    setSelectedProduct("");
    setSelectedOptions({});
  }, []);

  const product = getProductByName(selectedProduct, products);

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
      <header className={styles.header}>
        <img src={logo1} alt="Logo" className={styles.logo} />
        <h1 className={styles.heading}>Product Customizer</h1>
      </header>

      <main className={styles.main}>
        <section className={styles.controls}>
          <ProductSelector
            products={products}
            onProductChange={handleProductChange}
            selectedProduct={selectedProduct}
          />
          
          {/* Render OptionForm only if a product has been selected */}
          {selectedProduct && product && (
            <OptionForm
              options={product.options}
              selectedOptions={selectedOptions}
              onOptionChange={handleOptionChange}
            />
          )}
        </section>

        <section className={styles.preview}>
          <LivePreview
            selectedProduct={selectedProduct}
            selectedOptions={selectedOptions}
            products={products}
            defaultImage={defaultImg}
          />
        </section>
      </main>

      <footer className={styles.footer}>
        {selectedProduct && product && (
          <SubmitButton onSubmit={handleSubmit} />
        )}
      </footer>
    </div>
  );
};

export default App;