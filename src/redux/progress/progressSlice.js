import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 1, // 1 to 4
  totalSteps: 4,
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },
    resetStep: (state) => {
      state.currentStep = 1;
    },
  },
});

export const { setStep, resetStep } = progressSlice.actions;
export default progressSlice.reducer;
