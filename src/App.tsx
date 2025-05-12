import React, { useState, useEffect } from "react";
import { products } from "./data/products";
import ProductSelector from "./components/ProductSelector/ProductSelector";
import OptionForm from "./components/OptionForm/OptionForm";
import LivePreview from "./components/LivePreview/LivePreview";
import ActionBar from "./components/ActionBar/ActionBar"; // Replace SubmitButton with ActionBar
import SaveConfigurationModal from "./components/SaveConfigurationModal/SaveConfigurationModal";
import LoadDesignModal from "./components/LoadDesignModal/LoadDesignModal"; // New import
import usePersistedState from "./hooks/usePersistedState";
import { getProductByName } from "./utils/productUtils";
import { validateProductConfiguration } from "./utils/validationUtils";
import { 
  saveConfiguration, 
  getSavedConfigurations, 
  deleteConfiguration,
} from "./services/configurationService";
import styles from "./styles/App.module.css";
import { logo1, defaultImg } from "./assets/images/index";
import type { SavedConfiguration } from "./types";

const App: React.FC = () => {
  // State for product customization
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

  // State for modals
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);
  
  // State for saved designs
  const [savedDesigns, setSavedDesigns] = useState<SavedConfiguration[]>([]);
  
  // Message state
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);

  // Load saved designs when needed
  useEffect(() => {
    if (isLoadModalOpen) {
      setSavedDesigns(getSavedConfigurations());
    }
  }, [isLoadModalOpen]);

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

  const handleLoadClick = () => {
    // Refresh saved designs list and open modal
    setSavedDesigns(getSavedConfigurations());
    setIsLoadModalOpen(true);
  };

  const handleSaveConfiguration = (name: string) => {
    // Save the configuration to localStorage
    const savedConfig = saveConfiguration(name, selectedProduct, selectedOptions);
    
    // Update saved designs list
    setSavedDesigns(prevDesigns => [...prevDesigns, savedConfig]);
    
    // Show success message
    showMessage(`Your ${selectedProduct} design "${name}" saved successfully!`);
  };

  const handleLoadDesign = (design: SavedConfiguration) => {
    // Update product and options to match the saved design
    setSelectedProduct(design.product);
    setSelectedOptions(design.options);
    
    // Show success message
    showMessage(`Design "${design.name}" loaded successfully!`);
  };

  const handleDeleteDesign = (id: string) => {
    // Delete from localStorage
    deleteConfiguration(id);
    
    // Update saved designs list
    setSavedDesigns(prevDesigns => prevDesigns.filter(design => design.id !== id));
    
    // Show success message
    showMessage(`Design deleted successfully!`);
  };

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <img src={logo1} alt="Logo" className={styles.logo} />
        <h1 className={styles.heading}>Product Customizer</h1>
      </header>

      {/* Message display */}
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
        {/* Always show ActionBar, but "Save Design" and "Add to Cart" only work with validation */}
        <ActionBar 
          onSubmit={handleSubmit} 
          onSaveClick={handleSaveClick}
          onLoadClick={handleLoadClick}
        />
      </footer>

      {/* Save Configuration Modal */}
      <SaveConfigurationModal 
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSaveConfiguration}
      />

      {/* Load Design Modal */}
      <LoadDesignModal 
        isOpen={isLoadModalOpen}
        onClose={() => setIsLoadModalOpen(false)}
        savedDesigns={savedDesigns}
        onLoad={handleLoadDesign}
        onDelete={handleDeleteDesign}
      />
    </div>
  );
};

export default App;