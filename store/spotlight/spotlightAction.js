import AxiosInstance from "../axios-interceptor";
import { GET_ALL_ANCHORS } from "./spotlightCRUD";
import spotlightSlice from "./spotlightSlice";


const {actions} = spotlightSlice;

export const fetchSpotlightList = () => async (dispatch) =>{
    try {
        const response = await AxiosInstance.get(GET_ALL_ANCHORS);
        if(response && response.data){
            let filteredData = response.data.filter(spotlight => spotlight.id !== '62a6f9eafdc5caf53558f510');
            dispatch(actions.fetchList(filteredData));
        }
    } catch (error) {
        console.log(error);
    }
}