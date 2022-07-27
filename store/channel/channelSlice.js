import { createSlice } from "@reduxjs/toolkit";

const channelSlice = createSlice({
  name: "channel",
  initialState: {
    isLoading: false,
    editorial:[],
    breaking:[],
    recommendationHome:[],
    recommendationOtherChannel:[],
    live:[],
    error: null,
  },
  reducers: {
    fetchListStart: (state, action) => {
      state.isLoading = true;
    },
    fetchRecommendationHomeContent: (state, action) => {
      state.recommendationHome = [...state.recommendationHome,...action.payload];
      state.isLoading = false;
      state.error = null;
    },
    fetchRecommendationOtherChannelContent: (state, action) => {
      state.recommendationOtherChannel = [...state.recommendationOtherChannel,...action.payload];
      state.isLoading = false;
      state.error = null;
    },
    fetchEditorialContent: (state, action) => {
      state.editorial = [...state.editorial,...action.payload];
      state.isLoading = false;
      state.error = null;
    },
    fetchBreakingContent: (state, action) => {
      state.breaking = [...state.breaking,...action.payload];
      state.isLoading = false;
      state.error = null;
    },
    fetchLiveContent: (state,action) => {
      state.live = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    resetList:(state,action) => {
      state.recommendationHome = [];
      state.recommendationOtherChannel = [];
      state.editorial = [];
      state.breaking = [];
      state.isLoading = false;
      state.error = null;
    },
    fetchError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export default channelSlice;
