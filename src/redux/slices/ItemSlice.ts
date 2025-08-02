import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DataResult } from '../../components/search-result/ApiRequest';
import type { RootState } from '../Store';

interface ItemsState {
  items: DataResult[];
  count: number;
}

const initialState: ItemsState = {
  items: [],
  count: 0,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<DataResult>) => {
      state.items.push(action.payload);
      state.count += 1;
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
      state.count -= 1;
    },
  },
});

export const selectItems = (state: RootState) => state.items.items;
export const selectIsItemSelected = (name: string) => (state: RootState) =>
  state.items.items.some((item) => item.name === name);

export const { addItem, deleteItem } = itemsSlice.actions;
export default itemsSlice.reducer;
