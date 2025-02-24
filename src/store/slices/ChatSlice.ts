import { createAction, createSlice, Slice } from "@reduxjs/toolkit";
import { FlatlistItemRenderParams } from "../../screens/Chat";
import { PayloadAction } from "@reduxjs/toolkit";
import { ActionType } from "../sagas/LoginSaga";

type ChatSliceType = Slice<{
    data:Array<FlatlistItemRenderParams>,
}>

interface StateType{
    data: Array<FlatlistItemRenderParams>
}
const chatSlice:ChatSliceType = createSlice({
    name: 'chat',
    initialState: {
        data: null,
        //unsubscriber: null

    },
    reducers:{
        getMessages: (state:StateType):void => {
            state.data = null;
        },
        getMessagesSuccess: (state:StateType, action:PayloadAction<ActionType>):void => {
            state.data = action.payload[0];
            //state.unsubscriber = action.payload[1];
            
            console.log("payload" +action.payload);

            //console.log(state);
        },
        getMessagesFailure: (state:StateType):void => {
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