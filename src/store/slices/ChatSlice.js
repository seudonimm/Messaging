import { createAction, createSlice } from "@reduxjs/toolkit";


const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        data: null,
        unsubscriber: null

    },
    reducers:{
        getMessages: (state, action) => {
            state.data = null;
        },
        getMessagesSuccess: (state, action) => {
            state.data = action.payload;
            //state.unsubscriber = action.payload[1];
            
            console.log("payload" +action.payload);

            //console.log(state);
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

export default chatSlice;