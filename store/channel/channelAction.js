import AxiosInstance from "../axios-interceptor";
import channelSlice from "./channelSlice";
import axios from "axios";
import { currentDateTime } from "../../utils/common";

const { actions } = channelSlice;

const startHourDiff=6;
const endHourDiff=1;
const currentRecommendationAPI = 1;

export const fetchDefaultChannelData =
  (page = 2, limit = 20, watched = []) =>
  async (dispatch) => {
    let recommendationArray=[];
    if(localStorage.recommendation){
      recommendationArray=JSON.parse(localStorage.recommendation);
    }
    try {
      let expiredList = await checkUserWatchListExpiration(startHourDiff,endHourDiff,'recommendation',1,recommendationArray);
      let userChannelPreferenceIds = await getUserChannelPreferenceIds();
      // console.log(expiredList,userChannelPreferenceIds);
      let recommendationList=[];
      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_ML_BASE_URL}/recommendations`,
        data: {
          categories:userChannelPreferenceIds,
          deviceId: "website",
          limit: limit,
          page: page,
          watched:expiredList,
        },
      });
      if (response && response.data && response.data.news.length > 0) {
        await response.data.news.forEach((item) => {
          if(item?.n_video?.length==1){
            let date = item.n_updated_datetime.split(' ')[0];
            let time = item.n_updated_datetime.split(' ')[1];
            item['time'] = time.split(':')[0] + ':' + time.split(':')[1]
            item['date'] = date;

            let obj = {
              'news_category_id':1,
              'news_id': item.n_id,
              'news_updated_time':item.n_updated_datetime,
              'news_watch_time': currentDateTime(),
              'video_status':'browsed'
            }
        
            let foundDuplicate = recommendationArray.length>0 && recommendationArray.find(
              (obj) =>
                obj.news_id ==
                item.n_id
            );
            if(foundDuplicate == undefined || foundDuplicate == false){
              recommendationArray.push(obj);
              localStorage.setItem('recommendation',JSON.stringify(recommendationArray));
            }

            let foundDuplicateInRecomendationList;
            if(recommendationList?.length>0){
              foundDuplicateInRecomendationList= recommendationList.find(
                (obj) =>
                  obj.n_id ==
                  item.n_id
              );
            }
            // let foundDuplicateInEditorialList;
            // if(editorialList?.length>0){
            //   foundDuplicateInEditorialList= editorialList.find(
            //     (obj) =>
            //       obj.video_id ==
            //       item.n_id
            //   );
            // }
            if (foundDuplicateInRecomendationList == undefined && item?.n_pcategory_id!='62a6f9eafdc5caf53558f510') {
              recommendationList.push(item);
            }
            
          }
        });
        dispatch(actions.fetchRecommendationHomeContent(recommendationList));
      } else {
        dispatch(actions.fetchError("Failed to load data"));
      }
    } catch (error) {
      console.log(error);
      dispatch(actions.fetchError("Failed to load data"));
    }
  };

export const fetchChannelData =
  (channel_id, page = 1, limit = 20, watched = []) =>
  async (dispatch) => {
    try {
      let expiredList = await checkUserWatchListExpiration(startHourDiff,endHourDiff,'recommendation',1,recommendationArray);
      let recommendationArray=[];
      let recommendationList=[];
      if(localStorage.recommendation){
        recommendationArray=JSON.parse(localStorage.recommendation);
      }
      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_ML_BASE_URL}/channel-videos`,
        data: {
          channel_id: channel_id,
          deviceId: "website",
          limit: limit,
          page: page,
          watched:expiredList,
        },
      });

      if (response && response.data && response.data.news.length > 0) {
        await response.data.news.forEach((item) => {
          if(item?.n_video?.length==1){
            let date = item.n_updated_datetime.split(' ')[0];
            let time = item.n_updated_datetime.split(' ')[1];
            item['time'] = time.split(':')[0] + ':' + time.split(':')[1]
            item['date'] = date;

            let obj = {
              'news_category_id':channel_id,
              'news_id': item.n_id,
              'news_updated_time':item.n_updated_datetime,
              'news_watch_time': currentDateTime(),
              'video_status':'browsed'
            }
        
            let foundDuplicate = recommendationArray.length>0 && recommendationArray.find(
              (obj) =>
                obj.news_id ==
                item.n_id
            );
            if(foundDuplicate == undefined || foundDuplicate == false){
              recommendationArray.push(obj);
              localStorage.setItem('recommendation',JSON.stringify(recommendationArray));
            }

            let foundDuplicateInRecomendationList;
            if(recommendationList?.length>0){
              foundDuplicateInRecomendationList= recommendationList.find(
                (obj) =>
                  obj.n_id ==
                  item.n_id
              );
            }
            if (foundDuplicateInRecomendationList == undefined) {
              recommendationList.push(item);
            }
            
          }
        });
        dispatch(actions.fetchRecommendationOtherChannelContent(recommendationList));
      } else {
        dispatch(actions.fetchError("Failed to load data"));
      }
    } catch (error) {
      console.log(error);
      dispatch(actions.fetchError("Failed to load data"));
    }
};

export const fetchEditorialData =
  () =>
  async (dispatch) => {
    try {
      const response = await AxiosInstance.get('/getEditorialVideos/0/10');

      if (response && response.data && response.data.video.length > 0) {
        dispatch(actions.fetchEditorialContent(response.data.video));
      } 
      // else {
      //   dispatch(actions.fetchError("Failed to load data"));
      // }
    } catch (error) {
      console.log(error);
      dispatch(actions.fetchError("Failed to load data"));
    }
};


export const fetchChannelBreakingData =
  (channel_id,page=0) =>
  async (dispatch) => {
    try {
      const response = await AxiosInstance.get(`/getBreakingVideos/${page}/10/${channel_id}`);

      if (response && response.data && response.data.video.length > 0) {
        dispatch(actions.fetchBreakingContent(response.data.video));
      } 
      // else {
      //   dispatch(actions.fetchError("Failed to load data"));
      // }
    } catch (error) {
      console.log(error);
      dispatch(actions.fetchError("Failed to load data"));
    }
};

export const fetchLiveStreamsData =
  (channel_id) =>
  async (dispatch) => {
    try {
      const response = await AxiosInstance.post('event_listing',{
        cat_id:channel_id
      });

      if (response && response.data && response.data.Event.length > 0) {
        dispatch(actions.fetchLiveContent(response.data.Event));
      } 
      // else {
      //   dispatch(actions.fetchError("Failed to load data"));
      // }
    } catch (error) {
      console.log(error);
      dispatch(actions.fetchError("Failed to load data"));
    }
};

const getUserChannelPreferenceIds = () => {
  let userPreferIds=[];
  if(localStorage.getItem('userChannelPreference')){
    let ids=localStorage.getItem('userChannelPreference');
    userPreferIds = JSON.parse(ids)?.ids;
  }
  return userPreferIds;
}

  //check if the browsed/played videos of the user has passed a certain time
const checkUserWatchListExpiration = (startHourDiff,endHourDiff,source,channelId,localStorageArray)=>{
    let currentTime = new Date().getTime();
    let startMilliSec = (startHourDiff * 60)*60*1000; //for x hours before current time
    let endMilliSec = (endHourDiff*60)*60*1000; //for one hour before current time
    let startPoint = new Date(currentTime - startMilliSec).getTime();
    let endPoint = new Date(currentTime -endMilliSec).getTime();
    
    let returnResultArray =[];
    
    if(source === 'recommendation'){
      let expiredRecommendList=[];
      if(localStorageArray?.length>0){
        let recommArray = [...localStorageArray];
        recommArray.forEach((recommendation,index) => {
          if(recommendation.news_category_id == channelId && recommendation.news_watch_time>=startPoint && recommendation.news_watch_time<=endPoint){
            expiredRecommendList.push(recommendation.news_id);
          }
  
          //for played videos between current time to one hour before.
          if(recommendation.news_category_id == channelId && recommendation.news_watch_time>=endPoint && recommendation.news_watch_time<=currentTime && recommendation.video_status=='played'){
            expiredRecommendList.push(recommendation.news_id);
          }
  
          if(recommendation.news_watch_time<startPoint){
            let index = localStorageArray.indexOf(recommendation);
            localStorageArray.splice(index,1);
            localStorage.setItem('recommendation',JSON.stringify(localStorageArray));
          }
  
          if(index === recommArray?.length-1){
            returnResultArray=expiredRecommendList;
          }
  
        });
      }
    }
  
    if(source === 'editorial'){
      let expiredEditorialList=[];
      if(localStorageArray?.length>0){
        let editArray = [...localStorageArray];
        editArray.forEach((editorial,index) => {
          if(editorial.news_watch_time>=startPoint && editorial.news_watch_time<=endPoint){
            expiredEditorialList.push(editorial.news_id);
          }
  
          //for played videos between current time to one hour before.
          if(editorial.news_watch_time>=endPoint && editorial.news_watch_time<=currentTime && editorial.video_status=='played'){
            expiredEditorialList.push(editorial.news_id);
          }
  
          if(editorial.news_watch_time<startPoint){
            let index = localStorageArray.indexOf(editorial);
            localStorageArray.splice(index,1);
            localStorage.setItem('editorial',JSON.stringify(localStorageArray));
          }
  
          if(index === editArray?.length-1){
            returnResultArray=expiredEditorialList;
          }
        });
      }
    }
    if(source === 'breaking'){
      let expiredBreakingList=[];
      if(localStorageArray?.length>0){
        let breakArray = [...localStorageArray];
        breakArray.forEach((breaking,index) => {
          if(breaking.news_watch_time>=startPoint && breaking.news_watch_time<=endPoint){
            expiredBreakingList.push(breaking.news_id);
          }
  
          //for played videos between current time to one hour before.
          if(breaking.news_watch_time>=endPoint && breaking.news_watch_time<=currentTime && breaking.video_status=='played'){
            expiredBreakingList.push(breaking.news_id);
          }
  
          if(breaking.news_watch_time<startPoint){
            let index = localStorageArray.indexOf(breaking);
            localStorageArray.splice(index,1);
            localStorage.setItem('breaking',JSON.stringify(localStorageArray));
          }
  
          if(index === breakArray?.length-1){
            returnResultArray=expiredBreakingList;
          }
        });
      }
    }
    return returnResultArray;
}