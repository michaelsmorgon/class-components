'use client';
import { type ReactNode } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
