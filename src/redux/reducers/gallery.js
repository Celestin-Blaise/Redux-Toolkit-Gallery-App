import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPhotos = createAsyncThunk(
  "photos/getPhotos",
  async (arg, { getState }) => {
    const state = await getState().gallery;
    const response = await fetch(
      `https://picsum.photos/v2/list?page=${state.page}&limit=9`
    );
    const formattedResponse = await response.json();

    return formattedResponse;
  }
);

export const gallerySlice = createSlice({
  name: "gallerySlice",
  initialState: {
    photos: [],
    isLoading: false,
    apiError: false,
    page: 3,
  },
  reducers: {
    increment(state, action) {
      state.page++;
    },
  },
  extraReducers: {
    [getPhotos.pending]: (state) => {
      state.isLoading = true;
    },
    [getPhotos.fulfilled]: (state, action) => {
      state.photos.push(...action.payload);
      //   state.photos = action.payload;
      state.isLoading = false;
    },
    [getPhotos.rejected]: (state, action) => {
      state.isLoading = false;
      state.apiError = true;
    },
  },
});

export default gallerySlice.reducer;
