// components/LoadDesignModal/LoadDesignModal.tsx

import React from "react";
import styles from "./LoadDesignModal.module.css";
import type { LoadDesignModalProps } from "../../types";

const LoadDesignModal: React.FC<LoadDesignModalProps> = ({
  isOpen,
  onClose,
  savedDesigns,
  onLoad,
  onDelete,
}) => {
  if (!isOpen) return null;

  // Format date for display
  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Your Saved Designs</h2>

        {savedDesigns.length === 0 ? (
          <p className={styles.emptyMessage}>
            You don't have any saved designs yet.
          </p>
        ) : (
          <div className={styles.designsList}>
            {savedDesigns.map((design) => (
              <div key={design.id} className={styles.designItem}>
                <div className={styles.designInfo}>
                  <h3 className={styles.designName}>{design.name}</h3>
                  <p className={styles.designDetails}>
                    {design.product}
                    <span className={styles.designDate}>
                      {formatDate(design.savedAt)}
                    </span>
                  </p>
                </div>
                <div className={styles.designActions}>
                  <button
                    className={styles.loadButton}
                    onClick={() => {
                      onLoad(design);
                      onClose();
                    }}
                  >
                    Load
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => onDelete(design.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={styles.modalFooter}>
          <button className={styles.closeButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoadDesignModal;
