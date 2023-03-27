import { configureStore } from "@reduxjs/toolkit";
import galleryReducer from "../reducers/gallery";

const store = configureStore({
  reducer: {
    gallery: galleryReducer,
  },
});

export default store;
