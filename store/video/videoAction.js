import AxiosInstance from "../axios-interceptor";
import videoSlice from "./videoSlice";
import axios from "axios";
import { currentDateTime } from "../../utils/common";

const { actions } = videoSlice;

export const fetchRecommendation =
  (page = 1, limit = 10) =>
  async (dispatch) => {
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_ML_BASE_URL}/recommendations`,
        data: {
          categories: [],
          deviceId: "website",
          limit: limit,
          page: page,
          watched: [],
        },
      });
      //console.log(response);
      if (response && response.data && response.data.news.length > 0) {
        dispatch(actions.fetchRecommendations(response.data.news));
      } else {
        dispatch(actions.fetchError("Failed to load data"));
      }
    } catch (error) {
      console.log(error);
      dispatch(actions.fetchError("Failed to load data"));
    }
  };

export const fetchChannelRecommendation =
  (page = 1, limit = 10, channelId) =>
  async (dispatch) => {
    try {
      //console.log(channelId);
      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_ML_BASE_URL}/channel-videos`,
        data: {
          channel_id: channelId,
          limit: limit,
          page: page,
          watched: [],
        },
      });
      //console.log(response);
      if (response && response.data && response.data.news.length > 0) {
        dispatch(actions.fetchRecommendations(response.data.news));
      } else {
        dispatch(actions.fetchError("Failed to load data"));
      }
    } catch (error) {
      console.log(error);
      dispatch(actions.fetchError("Failed to load data"));
    }
  };

export const fetchAnchorRecommendation =
  (page = 0, limit = 10, channelId) =>
  async (dispatch) => {
    try {
      //console.log(channelId);
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/videosByAnchor/${channelId}/${page}/${limit}`,
      });
      //console.log(response);
      if (response && response.data && response.data.video.length > 0) {
        dispatch(actions.fetchAnchorRecommendations(response.data.video));
      } else {
        dispatch(actions.fetchError("Failed to load data"));
      }
    } catch (error) {
      console.log(error);
      dispatch(actions.fetchError("Failed to load data"));
    }
  };

export const fetchPollRecommendation =
  (page = 0, limit = 10) =>
  async (dispatch) => {
    try {
      //console.log(channelId);
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/poll-listing/${page}/${limit}`,
      });
      //console.log(response);
      if (response && response.data && response.data.news.length > 0) {
        dispatch(actions.fetchRecommendations(response.data.news));
      } else {
        dispatch(actions.fetchError("Failed to load data"));
      }
    } catch (error) {
      console.log(error);
      dispatch(actions.fetchError("Failed to load data"));
    }
  };

export const fetchBreakingRecommendation =
  (page = 0, limit = 10) =>
  async (dispatch) => {
    try {
      //console.log(channelId);
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/getBreakingVideos/${page}/${limit}/0`,
      });
      //console.log(response);
      if (response && response.data && response.data.video.length > 0) {
        dispatch(actions.fetchBreakingRecommendation(response.data.video));
      } else {
        dispatch(actions.fetchError("Failed to load data"));
      }
    } catch (error) {
      console.log(error);
      dispatch(actions.fetchError("Failed to load data"));
    }
  };
