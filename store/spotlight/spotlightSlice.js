import { createSlice } from "@reduxjs/toolkit";

const spotlightSlice = createSlice({
  name: "spotlight",
  initialState: {
    isLoading: false,
    spotlight_list: [],
    anchor_video_list: []
  },
  reducers: {
    fetchListStart: (state) => {
      state.isLoading=true;
    },
    fetchList: (state,action) => {
      state.spotlight_list = action.payload;
      state.isLoading=false;
    },
    fetchAnchorVideoList: (state,action) => {
        state.anchor_video_list = action.payload;
        state.isLoading=false;
    }
  },
})

export default spotlightSlice;