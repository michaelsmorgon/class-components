import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string, initialValue: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    const value = localStorage.getItem(key);
    return value || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, storedValue.trim());
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
};
