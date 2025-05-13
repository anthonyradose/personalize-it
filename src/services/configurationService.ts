// services/configurationService.ts (updated)

import { getItem, setItem } from './storageService';
import type { SavedDesign } from '../types';



// Key for localStorage
const SAVED_CONFIGS_KEY = 'product_customizer_saved_configs';

// Get all saved Designs
export const getSavedDesigns = (): SavedDesign[] => {
  return getItem<SavedDesign[]>(SAVED_CONFIGS_KEY, []);
};

// Save a new design
export const saveDesign = (
  name: string,
  product: string,
  options: { [key: string]: string }
): SavedDesign => {
  const configs = getSavedDesigns();
  
  // Create new design
  const newConfig: SavedDesign = {
    id: generateId(),
    name,
    product,
    options,
    savedAt: Date.now(),
  };
  
  // Add to existing designs
  configs.push(newConfig);
  
  // Save to localStorage
  setItem(SAVED_CONFIGS_KEY, configs);
  
  return newConfig;
};

// Load a specific design
export const loadDesign = (id: string): SavedDesign | null => {
  const configs = getSavedDesigns();
  return configs.find(config => config.id === id) || null;
};

// Delete a saved design
export const deleteDesign = (id: string): boolean => {
  const configs = getSavedDesigns();
  const newConfigs = configs.filter(config => config.id !== id);
  
  if (newConfigs.length === configs.length) {
    return false; // Design not found
  }
  
  setItem(SAVED_CONFIGS_KEY, newConfigs);
  return true;
};

// Helper function to generate a simple ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};