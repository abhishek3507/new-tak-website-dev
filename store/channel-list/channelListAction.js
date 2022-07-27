import AxiosInstance from "../axios-interceptor";
import channelListSlice from "./channelListSlice";

const {actions} =  channelListSlice;

export const fetchChannelList = () => async (dispatch) => {
    try {
        const response = await AxiosInstance.get('/getMenu');
        if(response && response.data && response.data.length>0){
            let filteredData = response.data.filter(channel => channel?.ranking !=0 && channel?.id !='62a6f9eafdc5caf53558f510' && (channel?.id !='62a6f9eafdc5caf53558f4fc' || channel?.title == 'News Mo'));
            dispatch(actions.fetchList(filteredData))
        }
    } catch (error) {
        console.log(error);
    }
}
