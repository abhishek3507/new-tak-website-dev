import { auth } from "../../utils/firebase/firebase";
import AxiosInstance from "../axios-interceptor";
import authSlice from "./authSlice";

const {actions}=authSlice;


export const isLoggedInAction = () => (dispatch) => {
    auth.onAuthStateChanged((user)=>{
        if(user){
            dispatch(actions.userloggedIn(true));
        }else{
            dispatch(actions.userloggedIn(false));
        }
    })
}


export const getUserProfileAction = (userId) => async(dispatch) => {
    try {
        const response = await AxiosInstance.post('/user_profile',{'user_id':userId});
        if(response && response.data){
            const userDetails = response.data.User[0];
            const fullName = userDetails?.fname;
            dispatch(actions.setUserProfile(userDetails));
            dispatch(actions.setFullName(fullName));
            localStorage.setItem('loggedInUserName',response?.data?.User[0]?.user_name);
            localStorage.setItem('loggedInUserImage',response?.data?.User[0]?.profileimage);
        }
    } catch (error) {
        console.log(error);
    }
}

export const saveUserProfileAction = (userObj) => async(dispatch) => {
    try {
        const response = await AxiosInstance.post('/edit_user',userObj);
        if(response && response.status){
            return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const takLoginAction = (userObj) => async(dispatch) => {
    try {
        const response = await AxiosInstance.post('/signup',userObj);
        if(response && response.status){
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}

export const signOutAction = () => async (dispatch) => {
    try {
        localStorage.removeItem('user');
        localStorage.removeItem('loggedInUserId');
        localStorage.removeItem('loggedInUserName');
        localStorage.removeItem('loggedInUserImage');
    } catch (error) {
        console.log(error);
    }
}

export const suggestedUserNamesAction = (id, name) => async(dispatch) => {
    try {
        const response = await AxiosInstance.post('/suggest_username',{'uid':id,'name':name});
        if(response && response.status){
            return response.data?.user_name;
        }else{
            return [];
        }
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const validateUserNameAction = (id, name) => async(dispatch) => {
    try {
        const response = await AxiosInstance.post('/edit_username',{'uid':id,'name':name});
        if(response && response.status){
            return true;
        }else{
            return false;
        }
    } catch (error) {
        return true;
        console.log(error);
    }
}

export const submitUserNameAction = (userData) => async(dispatch) => {
    try {
        const response = await AxiosInstance.post('/edit_user',userData);
        if(response && response.status){
            return true;
        }else{
            return false;
        }
    } catch (error) {
        return true;
        console.log(error);
    }
}
