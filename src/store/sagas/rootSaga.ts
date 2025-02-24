import ChatSaga from "./ChatSaga";
import { fork } from "redux-saga/effects";
import LoginSaga from "./LoginSaga";

export default function* rootSaga():Generator{
    yield fork(LoginSaga);
    yield fork(ChatSaga);
}