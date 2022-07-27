import { combineReducers } from "redux";
import authSlice from "../auth/authSlice";
import channelListSlice from "../channel-list/channelListSlice";
import spotlightSlice from "../spotlight/spotlightSlice";
import voteSlice from "../vote/voteSlice";
import channelSlice from "../channel/channelSlice";
import videoSlice from "../video/videoSlice";
import shortsSlice from "../shorts/shortsSlice";

export const rootReducer = combineReducers({
  spotlight: spotlightSlice.reducer,
  vote: voteSlice.reducer,
  channelList: channelListSlice.reducer,
  auth: authSlice.reducer,
  channel: channelSlice.reducer,
  video: videoSlice.reducer,
  shorts:shortsSlice.reducer
});
