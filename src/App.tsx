import React, { useState } from "react";
import { products } from "./data/products";
import ProductSelector from "./components/ProductSelector/ProductSelector";
import OptionForm from "./components/OptionForm/OptionForm";
import LivePreview from "./components/LivePreview/LivePreview";
import SubmitButton from "./components/SubmitButton/SubmitButton";
import SaveConfigurationModal from "./components/SaveConfigurationModal/SaveConfigurationModal";
import usePersistedState from "./hooks/usePersistedState";
import { getProductByName } from "./utils/productUtils";
import { validateProductConfiguration } from "./utils/validationUtils";
import { saveConfiguration } from "./services/configurationService";
import styles from "./styles/App.module.css";
import { logo1, defaultImg } from "./assets/images/index";

const App: React.FC = () => {
  // Use persistBetweenSessions=false for a fresh start each time
  const [selectedProduct, setSelectedProduct] = usePersistedState<string>(
    "selectedProduct", 
    "", 
    false
  );
  
  const [selectedOptions, setSelectedOptions] = usePersistedState<{ [key: string]: string }>(
    "selectedOptions", 
    {}, 
    false
  );

  // State for the save modal
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  
  // Message state (can be used for both save and add to cart)
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);

  const product = getProductByName(selectedProduct, products);

  const handleProductChange = (product: string) => {
    setSelectedProduct(product);
    setSelectedOptions({});
  };

  const handleOptionChange = (name: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
  };

  // Show a message for 3 seconds
  const showMessage = (text: string, type: 'success' | 'error' = 'success') => {
    setMessage({ text, type });
    
    // Hide message after 3 seconds
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  // Validate product configuration
  const validateConfiguration = (): boolean => {
    if (!product) {
      showMessage("Please select a product", "error");
      return false;
    }
    
    // Skip validation for products with no options
    if (product.options.length === 0) {
      return true;
    }
    
    const { isValid, missingOptions } = validateProductConfiguration(product, selectedOptions);
    
    if (!isValid) {
      showMessage(
        `Please select the following options: ${missingOptions.join(", ")}`, 
        "error"
      );
      return false;
    }
    
    return true;
  };

  const handleSubmit = () => {
    // Validate before adding to cart
    if (!validateConfiguration()) {
      return;
    }
    
    console.log("Submitting config", { product: selectedProduct, options: selectedOptions });
    
    // Show added to cart message
    showMessage(`${selectedProduct} added to cart successfully!`);
  };

  const handleSaveClick = () => {
    // Validate before showing the save modal
    if (!validateConfiguration()) {
      return;
    }
    
    setIsSaveModalOpen(true);
  };

  const handleSaveConfiguration = (name: string) => {
    // Save the configuration to localStorage
    saveConfiguration(name, selectedProduct, selectedOptions);
    
    // Show success message
    showMessage(`Configuration "${name}" saved successfully!`);
  };

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <img src={logo1} alt="Logo" className={styles.logo} />
        <h1 className={styles.heading}>Product Customizer</h1>
      </header>

      {/* Message display (works for both add to cart and save) */}
      {message && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}

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
          <SubmitButton 
            onSubmit={handleSubmit} 
            onSaveClick={handleSaveClick}
          />
        )}
      </footer>

      {/* Save Configuration Modal */}
      <SaveConfigurationModal 
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSaveConfiguration}
      />
    </div>
  );
};

export default App;