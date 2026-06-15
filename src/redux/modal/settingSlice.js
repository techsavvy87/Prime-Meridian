import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  email: null,
};

const settingSlice = createSlice({
  name: "settingModal",
  initialState,
  reducers: {
    openSettingModal: (state, action) => {
      state.isOpen = true;
      state.email = action.payload;
    },
    closeSettingModal: (state) => {
      state.isOpen = false;
    },
    toggleSettingModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openSettingModal, closeSettingModal, toggleSettingModal } =
  settingSlice.actions;
export default settingSlice.reducer;
