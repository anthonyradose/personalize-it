// services/configurationService.ts (updated)

import { getItem, setItem } from './storageService';
import type { SavedConfiguration } from '../types';



// Key for localStorage
const SAVED_CONFIGS_KEY = 'product_customizer_saved_configs';

// Get all saved configurations
export const getSavedConfigurations = (): SavedConfiguration[] => {
  return getItem<SavedConfiguration[]>(SAVED_CONFIGS_KEY, []);
};

// Save a new configuration
export const saveConfiguration = (
  name: string,
  product: string,
  options: { [key: string]: string }
): SavedConfiguration => {
  const configs = getSavedConfigurations();
  
  // Create new configuration
  const newConfig: SavedConfiguration = {
    id: generateId(),
    name,
    product,
    options,
    savedAt: Date.now(),
  };
  
  // Add to existing configurations
  configs.push(newConfig);
  
  // Save to localStorage
  setItem(SAVED_CONFIGS_KEY, configs);
  
  return newConfig;
};

// Load a specific configuration
export const loadConfiguration = (id: string): SavedConfiguration | null => {
  const configs = getSavedConfigurations();
  return configs.find(config => config.id === id) || null;
};

// Delete a saved configuration
export const deleteConfiguration = (id: string): boolean => {
  const configs = getSavedConfigurations();
  const newConfigs = configs.filter(config => config.id !== id);
  
  if (newConfigs.length === configs.length) {
    return false; // Configuration not found
  }
  
  setItem(SAVED_CONFIGS_KEY, newConfigs);
  return true;
};

// Helper function to generate a simple ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};