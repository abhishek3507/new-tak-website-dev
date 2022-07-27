import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name:'auth',
    initialState:{
        isLoggedIn:false,
        userDetails:{},
        fullName:'',
    },
    reducers:{
        setUserProfile : (state,action) => {
            state.userDetails=action.payload
        },
        setFullName : (state,action) => {
          
            state.fullName = action.payload;
        },
        userloggedIn : (state,action) => {
            state.isLoggedIn = action.payload
        }
    }
});

export default authSlice;