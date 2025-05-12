import { useState, useCallback } from 'react';

type MessageType = 'success' | 'error';
type MessageState = { text: string; type: MessageType } | null;

export function useMessage(duration = 3000) {
  const [message, setMessage] = useState<MessageState>(null);

  const showMessage = useCallback((text: string, type: MessageType = 'success') => {
    setMessage({ text, type });
    
    const timer = setTimeout(() => {
      setMessage(null);
    }, duration);
    
    // Clean up timer if component unmounts or showMessage is called again
    return () => clearTimeout(timer);
  }, [duration]);

  return {
    message,
    showMessage
  };
}