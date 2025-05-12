// utils/validationUtils.ts

import type { Product } from "../types";

/**
 * Checks if all required options have been selected for a product
 * 
 * @param product The product to validate
 * @param selectedOptions The currently selected options
 * @returns An object with isValid flag and any missing options
 */
export const validateProductConfiguration = (
  product: Product,
  selectedOptions: { [key: string]: string }
): { isValid: boolean; missingOptions: string[] } => {
  const missingOptions: string[] = [];
  
  // Check each option to see if it's required and has a value
  product.options.forEach((option) => {
    // Skip non-required options (like text that can be empty)
    // We're assuming options with values array are required
    if (option.values && option.values.length > 0) {
      if (!selectedOptions[option.name] || selectedOptions[option.name] === "") {
        missingOptions.push(option.name);
      }
    }
  });
  
  return {
    isValid: missingOptions.length === 0,
    missingOptions
  };
};