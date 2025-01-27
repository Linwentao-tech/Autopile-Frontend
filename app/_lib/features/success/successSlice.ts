import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SuccessState {
  message: string | null;
}

const initialState: SuccessState = {
  message: null,
};

const successSlice = createSlice({
  name: "success",
  initialState,
  reducers: {
    setSuccess: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    clearSuccess: (state) => {
      state.message = null;
    },
  },
});

export const { setSuccess, clearSuccess } = successSlice.actions;
export default successSlice.reducer;
