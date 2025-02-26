import { takeLatest, put, call, delay, cancelled, take, fork, cancel } from "redux-saga/effects";
import { getMessagesFailure, getMessagesSuccess } from "../slices/ChatSlice";
import { EventChannel, eventChannel } from "redux-saga";
import firestore, { FieldValue, onSnapshot, Timestamp } from '@react-native-firebase/firestore'
import FirestoreHelper from "../../firebase/firestore/FirestoreHelper";

// function* getRealtimeData():Generator{
//     try{
//         let messages = [];

//         // let data = yield call(FirestoreHelper.getFirestoreDataRealTime, messages);
//         const subscriber = yield call(FirestoreHelper.getFirestoreDataRealTime, storeMessages =>{
//             storeMessages.forEach(element => {
//                 messages.push(element);

//             });
//             return messages;
//         })
        
//         yield delay(1000);

//         console.log("Massages: "+ JSON.stringify(messages));
//         yield put(getMessagesSuccess([messages, subscriber]));
//     }catch(e){
//         console.log(e);
//         yield put(getMessagesFailure(e));
//     }
// }
function* sendMessageToCollection():Generator{
    //let data = yield call FirestoreHelper.getFirestoreDataRealTime(messages);
}

function* ChatSaga ():Generator {
    while (yield take('GET_REALTIME_DATA')){
        const getDataTask = yield fork(getDataSaga);

        yield take('STOP_LISTENING');
        yield cancel(getDataTask);

    }
    //yield takeLatest('GET_REALTIME_DATA', getDataSaga);
    yield takeLatest('SEND_MESSAGE', sendMessageToCollection);
    //yield takeLatest('STOP_LISTENING', stopListening)

    //yield cancel(getDataTask);
}
//  function* stopListening():Generator{
//     yield cancel(getDataTask);

//  }
function getData():EventChannel<{}>{
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

function* getDataSaga():Generator{
    const chan = yield call(getData);
    console.log("chan:"+JSON.stringify(getData));
    try {
        console.log("trying");
        while(true){
            let data = yield take(chan);
            console.log("data:" +JSON.stringify(data))
            yield put(getMessagesSuccess([data]));
        }
    } finally {
        let val = yield cancelled();
        console.log("endding before");

        if(val){
            console.log("endding");

            chan.close()
        }
    }
}

export default ChatSaga;