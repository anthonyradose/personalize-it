// hooks/usePersistedState.ts (updated)

import { useState, useEffect } from "react";
import { getItem, setItem, removeItem } from "../services/storageService";

function usePersistedState<T>(
  key: string, 
  defaultValue: T,
  persistBetweenSessions: boolean = true
): [T, React.Dispatch<React.SetStateAction<T>>] {
  // Initialize state - only load from localStorage if persistence is enabled
  const [state, setState] = useState<T>(() => {
    if (persistBetweenSessions) {
      return getItem<T>(key, defaultValue);
    }
    return defaultValue;
  });

  // Handle persistence
  useEffect(() => {
    if (persistBetweenSessions) {
      setItem(key, state);
    } else {
      removeItem(key);
    }
  }, [key, state, persistBetweenSessions]);

  return [state, setState];
}

export default usePersistedState;