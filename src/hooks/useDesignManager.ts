import { useState, useCallback} from 'react';
import { 
  saveConfiguration, 
  getSavedConfigurations, 
  deleteConfiguration 
} from '../services/configurationService';
import type { SavedConfiguration } from '../types';

export function useDesignManager(
  selectedProduct: string,
  selectedOptions: { [key: string]: string },
  setSelectedProduct: React.Dispatch<React.SetStateAction<string>>,
  setSelectedOptions: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>,
  showMessage: (text: string, type?: 'success' | 'error') => void
) {
  const [savedDesigns, setSavedDesigns] = useState<SavedConfiguration[]>([]);

  const loadSavedDesigns = useCallback(() => {
    setSavedDesigns(getSavedConfigurations());
  }, []);

  const handleSaveDesign = useCallback((name: string) => {
    const savedConfig = saveConfiguration(name, selectedProduct, selectedOptions);
    setSavedDesigns(prevDesigns => [...prevDesigns, savedConfig]);
    showMessage(`Your ${selectedProduct} design "${name}" saved successfully!`);
  }, [selectedProduct, selectedOptions, showMessage]);

  const handleLoadDesign = useCallback((design: SavedConfiguration) => {
    setSelectedProduct(design.product);
    setSelectedOptions(design.options);
    showMessage(`Design "${design.name}" loaded successfully!`);
  }, [setSelectedProduct, setSelectedOptions, showMessage]);

  const handleDeleteDesign = useCallback((id: string) => {
    deleteConfiguration(id);
    setSavedDesigns(prevDesigns => prevDesigns.filter(design => design.id !== id));
    showMessage('Design deleted successfully!');
  }, [showMessage]);

  return {
    savedDesigns,
    loadSavedDesigns,
    handleSaveDesign,
    handleLoadDesign,
    handleDeleteDesign
  };
}