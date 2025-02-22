import React from "react";
import { createNativeStackNavigator, NativeStackNavigatorProps } from "@react-navigation/native-stack";
import CreateAccount from "../screens/CreateAccount";
import Chat from "../screens/Chat";
import Login from "../screens/Login";
import { NavigationContainer, ParamListBase } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { createStaticNavigation } from "@react-navigation/native";
import ChatLanding from "../screens/ChatLanding";
import ForgotPassword from "../screens/ForgotPassword";
import { BLACK } from "../res/colors";
import { RootState } from "../store/Store";
import type { StaticParamList } from "@react-navigation/native";

const LoginStack:StaticParamList = createNativeStackNavigator({
    initialRouteName: "Login",
    screenOptions: {
        headerTitle: '',
        headerStyle: { backgroundColor: BLACK },
        headerTintColor: 'red',
    },
    screens: {
        CreateAccount: CreateAccount,
        Login: Login,
        ForgotPassword: ForgotPassword
    },
    id: undefined
});
const ChatStack:StaticParamList = createNativeStackNavigator({
    screenOptions: {
        headerTitle: '',
        headerStyle:{backgroundColor: BLACK},
        headerTintColor:'red',
    },  
    screens:{
        ChatLanding: ChatLanding,
        Chat: Chat
    },
    id:undefined
});;

const LoggedInNavigation = createStaticNavigation(ChatStack);
const LoggedOutNavigation = createStaticNavigation(LoginStack);

export default function AppNavigator(){
    const login = useSelector((state:RootState) => state.login);
    console.log(login.loggedIn);
    return(
        (login.loggedIn?<LoggedInNavigation/>:<LoggedOutNavigation/>)
    );
}