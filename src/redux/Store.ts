import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './slices/ItemSlice.ts';

const store = configureStore({
  reducer: {
    items: itemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

export default store;
