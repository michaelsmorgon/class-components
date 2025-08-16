'use client';
import { ThemeProvider } from '@/app/components/theme-provider/ThemeProvider';
import store from '@/app/redux/Store';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}
