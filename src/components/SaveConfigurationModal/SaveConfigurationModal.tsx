// components/SaveConfigurationModal/SaveConfigurationModal.tsx

import React, { useState } from "react";
import styles from "./SaveConfigurationModal.module.css";

interface SaveConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

const SaveConfigurationModal: React.FC<SaveConfigurationModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [configName, setConfigName] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!configName.trim()) {
      setError("Please enter a name for your configuration");
      return;
    }
    
    onSave(configName);
    setConfigName("");
    setError("");
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Save Your Configuration</h2>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="config-name" className={styles.label}>
              Configuration Name:
            </label>
            <input
              id="config-name"
              type="text"
              className={styles.input}
              value={configName}
              onChange={(e) => setConfigName(e.target.value)}
              placeholder="My Custom Product"
            />
            {error && <p className={styles.errorText}>{error}</p>}
          </div>
          
          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.saveButton}>
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaveConfigurationModal;