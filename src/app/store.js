import { configureStore } from "@reduxjs/toolkit";
import progressReducer from "../redux/progress/progressSlice";
import reviewReducer from "../redux/modal/reviewSlice";
import signReducer from "../redux/modal/signSlice";
import docPreviewReducer from "../redux/modal/docPreviewSlice";
import deleteReducer from "../redux/modal/deleteSlice";
import settingReducer from "../redux/modal/settingSlice";
import logoutReducer from "../redux/modal/logoutSlice";

export const store = configureStore({
  reducer: {
    progress: progressReducer,
    reviewModal: reviewReducer,
    signModal: signReducer,
    docPreviewModal: docPreviewReducer,
    deleteModal: deleteReducer,
    settingModal: settingReducer,
    logoutModal: logoutReducer,
  },
  devTools: true,
});
