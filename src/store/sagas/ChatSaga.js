import { takeLatest, put, call, delay } from "redux-saga/effects";
import FirestoreHelper from "../../firebase/firestore/FirestoreHelper";
import { getMessagesFailure, getMessagesSuccess } from "../slices/ChatSlice";

function* getRealtimeData(){
    try{
        let messages = [];

        // let data = yield call(FirestoreHelper.getFirestoreDataRealTime, messages);
        const subscriber = yield call(FirestoreHelper.getFirestoreDataRealTime, storeMessages =>{
            //messages = [...storeMessages];
            //console.log("Massages inside: "+ JSON.stringify(messages));
            storeMessages.forEach(element => {
                messages.push(element);
                //console.log("elements: "+ JSON.stringify(element.data()))
                //console.log(messages.length)
            });
            return messages;
        })
        
        yield delay(1000);

        console.log("Massages: "+ JSON.stringify(messages));
        yield put(getMessagesSuccess([messages, subscriber]));
    }catch(e){
        console.log(e);
        yield put(getMessagesFailure(e));
    }
}

function* sendMessageToCollection(){
    //let data = yield call FirestoreHelper.getFirestoreDataRealTime(messages);
}

function* ChatSaga () {
    yield takeLatest('GET_REALTIME_DATA', getRealtimeData);
    yield takeLatest('SEND_MESSAGE', sendMessageToCollection);

}

export default ChatSaga;