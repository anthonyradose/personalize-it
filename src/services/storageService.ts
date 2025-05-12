// services/storageService.ts

/**
 * A generic localStorage service to handle data persistence
 */

// Get data from localStorage
export const getItem = <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error retrieving ${key} from localStorage:`, error);
      return defaultValue;
    }
  };
  
  // Save data to localStorage
  export const setItem = <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };
  
  // Remove data from localStorage
  export const removeItem = (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  };
  
  // Check if item exists in localStorage
  export const hasItem = (key: string): boolean => {
    return localStorage.getItem(key) !== null;
  };