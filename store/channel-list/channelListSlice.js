import { createSlice } from "@reduxjs/toolkit";

const channelListSlice = createSlice({
  name: "channelList",
  initialState: {
    isLoading: false,
    channel_list: [],
    currentChannel: "",
  },
  reducers: {
    fetchList: (state, action) => {
      state.channel_list = action.payload;
    },
    setCurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
  },
});

export default channelListSlice;
