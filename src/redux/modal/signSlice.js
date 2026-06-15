import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const signSlice = createSlice({
  name: "signModal",
  initialState,
  reducers: {
    openSignModal: (state) => {
      state.isOpen = true;
    },
    closeSignModal: (state) => {
      state.isOpen = false;
    },
    toggleSignModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openSignModal, closeSignModal, toggleSignModal } =
  signSlice.actions;
export default signSlice.reducer;
