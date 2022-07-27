import { createSlice } from "@reduxjs/toolkit";

const shortsSlice = createSlice({
  name: "shorts",
  initialState: {
    isLoading: false,
    shortsList: [],
    error: false,
  },
  reducers: {
    fetchListStart: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    setInitialShortsList: (state, action) => {
      state.shortsList = [...action.payload];
      state.isLoading = false;
      state.error = false;
    },
    fetchShortsList: (state, action) => {
      state.shortsList = [...state.shortsList, ...action.payload];
      state.isLoading = false;
      state.error = false;
    },
    clearShortsList: (state, action) => {
      state.shortsList = [];
      state.isLoading = false;
      state.error = false;
    },
    serverError: (state, action) => {
      state.error = true;
    },
  },
});

export default shortsSlice;
