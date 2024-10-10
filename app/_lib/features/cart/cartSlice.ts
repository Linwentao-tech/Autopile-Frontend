import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  warning: string | null;
}

const initialState: CartState = {
  items: [],
  warning: null,
};

const MAX_QUANTITY = 10;

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        const newQuantity = existingItem.quantity + action.payload.quantity;
        if (newQuantity > MAX_QUANTITY) {
          existingItem.quantity = MAX_QUANTITY;
          state.warning = `Maximum quantity (${MAX_QUANTITY}) reached for ${existingItem.name}. Quantity set to ${MAX_QUANTITY}.`;
        } else {
          existingItem.quantity = newQuantity;
          state.warning = null;
        }
      } else {
        if (action.payload.quantity > MAX_QUANTITY) {
          state.items.push({
            ...action.payload,
            quantity: MAX_QUANTITY,
          });
          state.warning = `Maximum quantity (${MAX_QUANTITY}) reached for ${action.payload.name}. Quantity set to ${MAX_QUANTITY}.`;
        } else {
          state.items.push(action.payload);
          state.warning = null;
        }
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.warning = null;
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        if (action.payload.quantity > MAX_QUANTITY) {
          item.quantity = MAX_QUANTITY;
          state.warning = `Maximum quantity (${MAX_QUANTITY}) reached for ${item.name}. Quantity set to ${MAX_QUANTITY}.`;
        } else {
          item.quantity = Math.max(1, action.payload.quantity);
          state.warning = null;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.warning = null;
    },
    clearWarning: (state) => {
      state.warning = null;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, clearWarning } =
  cartSlice.actions;
export default cartSlice.reducer;
