import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  doc: null,
};

const deleteSlice = createSlice({
  name: "deleteModal",
  initialState,
  reducers: {
    openDeleteModal: (state, action) => {
      state.isOpen = true;
      state.doc = action.payload;
    },
    closeDeleteModal: (state) => {
      state.isOpen = false;
      state.doc = null;
    },
    toggleDeleteModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openDeleteModal, closeDeleteModal, toggleDeleteModal } =
  deleteSlice.actions;
export default deleteSlice.reducer;
