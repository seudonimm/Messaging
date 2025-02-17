import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateAccount from "../screens/CreateAccount";
import Chat from "../screens/Chat";
import Login from "../screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { createStaticNavigation } from "@react-navigation/native";
import ChatLanding from "../screens/ChatLanding";
import ForgotPassword from "../screens/ForgotPassword";
import { BLACK } from "../res/colors";


const LoginStack = createNativeStackNavigator({
    initialRouteName: "Login",
    screenOptions: {
        headerTitle: '',
        headerStyle:{backgroundColor: BLACK},
        headerTintColor:'red',
    },  
    screens:{
        CreateAccount: CreateAccount,
        Login: Login,
        ForgotPassword: ForgotPassword
    }
});
const ChatStack = createNativeStackNavigator({
    screenOptions: {
        headerTitle: '',
        headerStyle:{backgroundColor: BLACK},
        headerTintColor:'red',
    },  
    screens:{
        ChatLanding: ChatLanding,
        Chat: Chat
    }
});;

const LoggedInNavigation = createStaticNavigation(ChatStack);
const LoggedOutNavigation = createStaticNavigation(LoginStack);

export default function AppNavigator(){
    const login = useSelector(state => state.login);
    console.log(login.loggedIn);
    return(
        (login.loggedIn?<LoggedInNavigation/>:<LoggedOutNavigation/>)
    );
}