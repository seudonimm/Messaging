import ChatSaga from "./ChatSaga";
import LoginSaga from "./LoginSaga";
//import ListSaga from "./ListSaga";
import { fork } from "redux-saga/effects";

export default function* rootSaga(){
    yield fork(LoginSaga);
    yield fork(ChatSaga);
}