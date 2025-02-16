import { createAction, createSlice } from "@reduxjs/toolkit";


const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        data: null

    },
    reducers:{
        getMessages: (state, action) => {
            state.user = null;
        },
        getMessagesSuccess: (state, action) => {
            state.data = action.payload;
            console.log(state);
        },
        getMessagesFailure: (state, action) => {
            state.data = null
            console.log("error");
        }
    }

});

export const {
    getMessages,
    getMessagesSuccess,
    getMessagesFailure
} = chatSlice.actions;

export default loginSlice;