import React, { useEffect, useState } from "react";
import CustomInputField from "../components/CustomInputField";
import { SafeAreaView, Text, StyleSheet, Pressable } from "react-native";
import CustomButton from "../components/CustomButton";
import store, { RootState } from "../store/Store";
import { useSelector } from "react-redux";
import { useNavigation, ParamListBase, NavigationProp } from "@react-navigation/native";
import Header from "../components/Header";
import { BLACK } from "../res/colors";
import Subtext from "../components/Subtext";
import CustomPressable from "../components/CustomPressable";

const Login:React.FC = () => {
    const navigation:NavigationProp<ParamListBase> = useNavigation();

    const login = useSelector((state:RootState) => state.login);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onSubmitPress = (email:string, password:string):void => {
        console.log("pressed")
 
        store.dispatch({type:'LOG_IN', payload: {email, password}});
        console.log("pressed")

    };

    const toCreateAccountPage = ():void => {
        navigation.navigate("CreateAccount");
    }

    const onForgotPasswordPress = ():void => {
        navigation.navigate("ForgotPassword");
    }
    useEffect(
        () => {
            if (login.loggedIn){
                //navigation.replace('GetDataScreen');
                console.log("logged in");
            }
        },[login]
    );
    return(
        <SafeAreaView style={styles.container}>
            <Header
                text={"Messaging"}
            />
            <Subtext
                text={"Email"}
            />
            <CustomInputField
                text={'Enter Email'}
                onChangeText={(t:string):void => setEmail(t)}
            />
            <Subtext
                text={"Password"}
            />
            <CustomInputField
                text={'Enter Password'}
                onChangeText={(t:string):void => setPassword(t)}
            />
            <CustomPressable
                onPress={():void => onForgotPasswordPress()}
                text={"Forgot Password"}
            />
            <CustomButton
                text={"Login"}
                onPress={():void => onSubmitPress(email, password)}
            />
            <CustomPressable
                onPress={():void => toCreateAccountPage()}
                text={"Create Account"}
            />
            <CustomPressable
                onPress={():void => navigation.navigate('PushNotificationManager')}
                text={"Create Account"}
            />
            {/* <CustomButton
            text={"Forgot Password"}
            onPress={() => onForgotPasswordPress()}
            /> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BLACK
    }
})

export default Login;