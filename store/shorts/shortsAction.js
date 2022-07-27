import axios from "axios";
import shortsSlice from "./shortsSlice";

const {actions} = shortsSlice;

const startHourDiff=6;
const endHourDiff=1;
const currentRecommendationAPI = 1;

export const fetchShortsListAction = 
(page = 1, limit = 10, watched = []) => 
async (dispatch) => {
    let shortsArray=[];
    if(localStorage.shorts){
        shortsArray=JSON.parse(localStorage.shorts);
    }
    try {
        let expiredList = checkUserWatchListExpiration(startHourDiff,endHourDiff,shortsArray);
        let recommendationShortsList=[];
        const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_ML_BASE_URL}/recommendationsShorts`,
        data: {
          deviceId: "website",
          limit: limit,
          page: page,
          watched:expiredList,
        },
        });
        if (response && response.data && response?.data?.news?.length > 0 ){
            await response.data.news.forEach((video,index) => {
                let date = video.n_updated_datetime.split(' ')[0];
                let time = video.n_updated_datetime.split(' ')[1];
                video['time'] = time.split(':')[0] + ':' + time.split(':')[1]
                video['date'] = date;
    
                let foundDuplicate = recommendationShortsList.find(
                  (obj) =>
                    obj.n_id ==
                    video.n_id
                );
                if(foundDuplicate == undefined && video?.n_video[0]?.v_url !==''){
                  recommendationShortsList.push(video);
                }
              });
              dispatch(actions.fetchShortsList(recommendationShortsList));
        }
    } catch (error) {
        console.log(error);
        dispatch(actions.serverError())
    }
}

  //check if the browsed/played shorts of the user has passed a certain time
  const checkUserWatchListExpiration = (startHourDiff,endHourDiff,localStorageArray)=>{
    let currentTime = new Date().getTime();
    let startMilliSec = (startHourDiff * 60)*60*1000; //for x hours before current time
    let endMilliSec = (endHourDiff*60)*60*1000; //for one hour before current time
    let startPoint = new Date(currentTime - startMilliSec).getTime();
    let endPoint = new Date(currentTime -endMilliSec).getTime();
    
    let returnResultArray =[];
    
      let expiredShortsList=[];

      if (localStorageArray?.length>0) {
        let sArray = [...localStorageArray];
        sArray.forEach((shorts, index) => {
          if (shorts.news_watch_time >= startPoint && shorts.news_watch_time <= endPoint) {
            expiredShortsList.push(shorts.news_id);
          }
  
          //for played shorts between current time and one hour before
          if (shorts.news_watch_time >= endPoint && shorts.news_watch_time <= currentTime && shorts.video_status=='played') {
            expiredShortsList.push(shorts.news_id);
          }
  
          if (shorts.news_watch_time < startPoint) {
            let index = this.shortsArray.indexOf(shorts);
            this.shortsArray.splice(index, 1);
            localStorage.setItem('shorts', JSON.stringify(this.shortsArray));
          }
  
          if (index === sArray?.length - 1) {
            returnResultArray = expiredShortsList;
          }
  
        });
      }
  
    return returnResultArray;
}