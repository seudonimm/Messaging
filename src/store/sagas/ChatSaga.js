import { takeLatest, put, call, delay, cancelled, take } from "redux-saga/effects";
import FirestoreHelper from "../../firebase/firestore/FirestoreHelper";
import { getMessagesFailure, getMessagesSuccess } from "../slices/ChatSlice";
import { eventChannel } from "redux-saga";
import firestore, { FieldValue, onSnapshot, Timestamp } from '@react-native-firebase/firestore'

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
    yield takeLatest('GET_REALTIME_DATA', getDataSaga);
    yield takeLatest('SEND_MESSAGE', sendMessageToCollection);

}

function getData(){
    return eventChannel(emitter => {
        const q = firestore().collection('messages').orderBy("timeStamp", "asc");
        const unsubscribe = onSnapshot(q, docSnapshot=>{
            let messages = []
            docSnapshot.docs.forEach(element => {
                messages.push({...element.data(), id:element.id});

            });
            emitter(messages);
        });
        return unsubscribe;
    })
}

function* getDataSaga(){
    const chan = yield call(getData);
    try {
        console.log("trying");
        while(true){
            let data = yield take(chan);
            console.log("data:" +data)
            yield put(getMessagesSuccess(data));
        }
    } catch (e) {
        yield put(getMessagesFailure(e));
    } finally {
        let val = yield cancelled();
        if(val){
            chan.close()
        }
    }
}

export default ChatSaga;