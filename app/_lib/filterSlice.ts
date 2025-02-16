import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  minPrice: number;
  maxPrice: number;
}

const initialState: FilterState = {
  minPrice: 0,
  maxPrice: 130,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setPriceRange: (
      state,
      action: PayloadAction<{ minPrice: number; maxPrice: number }>
    ) => {
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
    },
    resetPriceRange: (state) => {
      state.minPrice = initialState.minPrice;
      state.maxPrice = initialState.maxPrice;
    },
  },
});

export const { setPriceRange, resetPriceRange } = filterSlice.actions;
export default filterSlice.reducer;
