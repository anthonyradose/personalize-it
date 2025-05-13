// App.tsx with extracted hooks

import React, { useEffect, useState } from "react";
import { products } from "./data/products";
import ProductSelector from "./components/ProductSelector/ProductSelector";
import OptionForm from "./components/OptionForm/OptionForm";
import LivePreview from "./components/LivePreview/LivePreview";
import ActionBar from "./components/ActionBar/ActionBar";
import SaveDesignModal from "./components/SaveDesignModal/SaveDesignModal";
import LoadDesignModal from "./components/LoadDesignModal/LoadDesignModal";
import usePersistedState from "./hooks/usePersistedState";
import { useMessage } from "./hooks/useMessage";
import { useDesignManager } from "./hooks/useDesignManager";
import { getProductByName } from "./utils/productUtils";
import { validateProductConfiguration } from "./utils/validationUtils";
import styles from "./styles/App.module.css";
import {  logo3, defaultImg } from "./assets/images/index";

const App: React.FC = () => {
  // Product customization state
  const [selectedProduct, setSelectedProduct] = usePersistedState<string>(
    "selectedProduct",
    "",
    false
  );

  const [selectedOptions, setSelectedOptions] = usePersistedState<{
    [key: string]: string;
  }>("selectedOptions", {}, false);

  // Modal visibility state
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);

  // Get the current product
  const product = getProductByName(selectedProduct, products);

  // Use the message hook for notifications
  const { message, showMessage } = useMessage();

  // Use the design manager hook for design operations
  const {
    savedDesigns,
    loadSavedDesigns,
    handleSaveDesign,
    handleLoadDesign,
    handleDeleteDesign,
  } = useDesignManager(
    selectedProduct,
    selectedOptions,
    setSelectedProduct,
    setSelectedOptions,
    showMessage
  );

  // Load saved designs when the load modal opens
  useEffect(() => {
    if (isLoadModalOpen) {
      loadSavedDesigns();
    }
  }, [isLoadModalOpen, loadSavedDesigns]);

  // Event handlers
  const handleProductChange = (product: string) => {
    setSelectedProduct(product);
    setSelectedOptions({});
  };

  const handleOptionChange = (name: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
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

    const { isValid, missingOptions } = validateProductConfiguration(
      product,
      selectedOptions
    );

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

    console.log("Submitting config", {
      product: selectedProduct,
      options: selectedOptions,
    });

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
    setIsLoadModalOpen(true);
  };

  const handleSaveDesignClick = (name: string) => {
    handleSaveDesign(name);
    setIsSaveModalOpen(false);
  };

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <img src={logo3} alt="Logo" className={styles.logo} />
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
        <ActionBar
          onSubmit={handleSubmit}
          onSaveClick={handleSaveClick}
          onLoadClick={handleLoadClick}
        />
      </footer>

      {/* Save Design Modal */}
      <SaveDesignModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSaveDesignClick}
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
