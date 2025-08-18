'use client';
import store from '@/app/redux/Store';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
