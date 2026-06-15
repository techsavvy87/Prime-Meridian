import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const docPreviewSlice = createSlice({
  name: "docPreviewModal",
  initialState,
  reducers: {
    openDocPreviewModal: (state) => {
      state.isOpen = true;
    },
    closeDocPreviewModal: (state) => {
      state.isOpen = false;
    },
    toggleDocPreviewModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {
  openDocPreviewModal,
  closeDocPreviewModal,
  toggleDocPreviewModal,
} = docPreviewSlice.actions;
export default docPreviewSlice.reducer;
