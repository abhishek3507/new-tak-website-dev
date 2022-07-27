import { createSlice } from "@reduxjs/toolkit";

const voteSlice = createSlice({
    name:'vote',
    initialState:{
        vote_list:[]
    },
    reducers:{
        fetchVoteList:(state,action)=>{
            state.vote_list=action.payload;
        }
    }
});

export default voteSlice;