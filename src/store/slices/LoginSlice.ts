import { createAction, createSlice, Slice } from "@reduxjs/toolkit";

type LoginSliceType = Slice<{
    loggedIn:boolean
}>
interface StateType{
    loggedIn:boolean
}
const loginSlice:LoginSliceType = createSlice({
    name: 'login',
    initialState: {
        //user: null,
        loggedIn: false
    },
    reducers:{
        createAccount: (state, action) => {
            //state.user = null;
        },
        createAccountSuccess: (state:StateType, action) => {
            //state.user = action.payload;
            state.loggedIn = true;
            console.log(state);
        },
        createAccountFailure: () => {
            //state.user = null
            console.log("error");
        },
        login: () => {
            //state.user = null;
        },
        loginSuccess: (state:StateType) => {
            //state.user = action.payload;
            state.loggedIn = true;
        },
        loginFailed: () => {
            //state.user = null;
        },
        logout: () => {

        },
        logoutSuccess: (state:StateType) => {
            //state.user = null;
            state.loggedIn = false;
        },
        logoutFailed: () => {
        },
        passwordReset: (state:StateType) => {
            //state.user = null;
            state.loggedIn = false;
        },
        passwordResetSuccess: (state:StateType) => {
            //state.user = null;
            state.loggedIn = false;
        },
        passwordResetFailure: (state:StateType) => {
            //state.user = null;
            state.loggedIn = false;
        }

    }
});

export const {
    createAccount, 
    createAccountSuccess, 
    createAccountFailure,
    login,
    loginSuccess,
    loginFailed,
    logout,
    logoutSuccess,
    logoutFailed,
    passwordReset,
    passwordResetSuccess,
    passwordResetFailure
} = loginSlice.actions;

export default loginSlice;