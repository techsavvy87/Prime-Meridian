import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const reviewSlice = createSlice({
  name: "reviewModal",
  initialState,
  reducers: {
    openReviewModal: (state) => {
      state.isOpen = true;
    },
    closeReviewModal: (state) => {
      state.isOpen = false;
    },
    toggleReviewModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openReviewModal, closeReviewModal, toggleReviewModal } =
  reviewSlice.actions;
export default reviewSlice.reducer;
