import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './slices/ItemSlice.ts';
import { api } from '../services/api.ts';

const store = configureStore({
  reducer: {
    items: itemReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
