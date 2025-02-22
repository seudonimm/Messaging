import auth, { firebase } from '@react-native-firebase/auth';
import { takeLatest, call, put } from 'redux-saga/effects';
import { createAccountFailure, createAccountSuccess, loginFailed, loginSuccess, logoutFailed, logoutSuccess, passwordResetFailure, passwordResetSuccess } from '../slices/LoginSlice';
import { Alert } from 'react-native';

function* logInToAccount(action){
    try{
        const {email, password} = action.payload;
        console.log('alfkdjs')
        let res = yield call(auth().signInWithEmailAndPassword, email, password);
        //console.log('res ' + res);
        yield put(loginSuccess(res.user));
    }catch(e){
        console.log('fffff')
        if(e.code === 'auth/email-already-in-use'){
            console.log('That email address is already in use!');
        }
        if(e.code === 'auth/invalid-email'){
            console.log('That email address is invalid!');
        }
        Alert.alert(e);
        yield put(loginFailed());
    }

}

function* createAccount(action){
    //yield console.log("THIS ONE RIGHT HERE: " + JSON.stringify(call(auth().createUserWithEmailAndPassword, email, password)));
    try{
        const {email, password} = action.payload;
        console.log('alfkdjs')
        let res = yield call(auth().createUserWithEmailAndPassword, email, password);
        //console.log('res ' + res);
        yield put(createAccountSuccess(res.user));
    }catch(e){
        console.log('fffff')
        if(e.code === 'auth/email-already-in-use'){
            console.log('That email address is already in use!');
        }
        if(e.code === 'auth/invalid-email'){
            console.log('That email address is invalid!');
        }
        console.log(e);
        yield put(createAccountFailure());
    }
}

function* changePassword(action){
    try {
        const {email} = action.payload;
        console.log("email "+email)
        yield call(auth().sendPasswordResetEmail, email);
        yield put(passwordResetSuccess());
    } catch (e) {
        console.log(e);
        yield put(passwordResetFailure());
    }

}

function* logout(){
    try{
        //const {email, password} = action.payload;
        console.log('alfkdjs')
        let res = yield call(auth().signOut);
        //console.log('res ' + res);
        yield put(logoutSuccess());
    }catch(e){

        console.log(e);
        yield put(logoutFailed());
    }

}

function* LoginSaga(){
    yield takeLatest('LOG_IN', logInToAccount);
    yield takeLatest('CREATE_ACCOUNT', createAccount);
    yield takeLatest('CHANGE_PASSWORD', changePassword);
    yield takeLatest('LOGOUT', logout);
}

export default LoginSaga;