import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    isLoading: false,
    error: null,
    recommendations: [],
    anchorRecommendations: [],
    breakingRecommendations: [],
    anchorHasMoreData: true,
  },
  reducers: {
    fetchListStart: (state, action) => {
      state.isLoading = true;
    },
    fetchRecommendations: (state, action) => {
      state.recommendations = [...action.payload];
      state.isLoading = false;
      state.error = null;
      state.anchorRecommendations = [];
      state.breakingRecommendations = [];
    },
    addToRecommendation: (state, action) => {
      state.recommendations = [action.payload, ...state.recommendations];
    },
    fetchAnchorRecommendations: (state, action) => {
      state.anchorRecommendations = [
        ...state.anchorRecommendations,
        ...action.payload,
      ];
      if (state.anchorRecommendations.length == 0) {
        state.anchorHasMoreData = false;
      }
      state.isLoading = false;
      state.error = null;
      state.recommendations = [];
      state.breakingRecommendations = [];
    },
    fetchBreakingRecommendation: (state, action) => {
      state.breakingRecommendations = [...action.payload];
      state.isLoading = false;
      state.error = null;
      state.recommendations = [];
      state.anchorRecommendations = [];
    },
    fetchError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.anchorHasMoreData = false;
    },
  },
});

export default videoSlice;
