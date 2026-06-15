import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const logoutSlice = createSlice({
  name: "logoutModal",
  initialState,
  reducers: {
    openLogoutModal: (state, action) => {
      state.isOpen = true;
    },
    closeLogoutModal: (state) => {
      state.isOpen = false;
    },
    toggleLogoutModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openLogoutModal, closeLogoutModal, toggleLogoutModal } =
  logoutSlice.actions;
export default logoutSlice.reducer;
