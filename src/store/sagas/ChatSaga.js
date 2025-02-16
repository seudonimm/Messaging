import { takeLatest } from "redux-saga/effects";
import FirestoreHelper from "../../firebase/firestore/FirestoreHelper";
import { getMessagesFailure, getMessagesSuccess } from "../slices/ChatSlice";

function* getRealtimeData(){
    try{
        let data = yield call(FirestoreHelper.getFirestoreDataRealTime, messages);

        yield put(getMessagesSuccess());
    }catch(e){
        console.log(e);
        yield put(getMessagesFailure());
    }
}

function* sendMessageToCollection(){
    //let data = yield call FirestoreHelper.getFirestoreDataRealTime(messages);
}

function* ChatSaga () {
    yield takeLatest('GET_REALTIME_DATA', getRealtimeData);
    yield takeLatest('SEND_MESSAGE', sendMessageToCollection);

}