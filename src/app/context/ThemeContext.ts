import { createContext } from 'react';

type Theme = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

export const ThemeContext = createContext<Theme>({
  theme: 'light',
  setTheme: () => {},
});
