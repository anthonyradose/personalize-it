import { useState, useCallback} from 'react';
import { 
  saveDesign, 
  getSavedDesigns, 
  deleteDesign
} from '../services/configurationService';
import type { SavedDesign } from '../types';

export function useDesignManager(
  selectedProduct: string,
  selectedOptions: { [key: string]: string },
  setSelectedProduct: React.Dispatch<React.SetStateAction<string>>,
  setSelectedOptions: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>,
  showMessage: (text: string, type?: 'success' | 'error') => void
) {
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([]);

  const loadSavedDesigns = useCallback(() => {
    setSavedDesigns(getSavedDesigns());
  }, []);

  const handleSaveDesign = useCallback((name: string) => {
    const savedConfig = saveDesign(name, selectedProduct, selectedOptions);
    setSavedDesigns(prevDesigns => [...prevDesigns, savedConfig]);
    showMessage(`Your ${selectedProduct} design "${name}" saved successfully!`);
  }, [selectedProduct, selectedOptions, showMessage]);

  const handleLoadDesign = useCallback((design: SavedDesign) => {
    setSelectedProduct(design.product);
    setSelectedOptions(design.options);
    showMessage(`Design "${design.name}" loaded successfully!`);
  }, [setSelectedProduct, setSelectedOptions, showMessage]);

  const handleDeleteDesign = useCallback((id: string) => {
    deleteDesign(id);
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