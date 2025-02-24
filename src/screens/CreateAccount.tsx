import React, { useEffect, useState } from "react";
import CustomInputField from "../components/CustomInputField";
import { SafeAreaView, Text,StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import store, { RootState } from "../store/Store";
import { useSelector } from "react-redux";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import Header from "../components/Header";
import Subtext from "../components/Subtext";
import { BLACK } from "../res/colors";
import CustomPressable from "../components/CustomPressable";

const CreateAccount:React.FC = () => {
    const navigation:NavigationProp<ParamListBase> = useNavigation();

    const login = useSelector((state:RootState) => state.login);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onSubmitPress = (email:string, password:string):void => {
        console.log("pressed")
 
        store.dispatch({type:'CREATE_ACCOUNT', payload: {email, password}});
        console.log("pressed")

    };

    const onToLoginPress = ():void => {
        navigation.navigate("Login");
    }
    useEffect(
        () => {
            console.log("create account")
            if (login.loggedIn){
                //navigation.replace('GetDataScreen');
                console.log("logged in");
            }
        },[login]
    );
    return(
        <SafeAreaView style={styles.container}>
            <Header
                text={"Create Account"}
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
            <CustomButton
                text={"Create Account"}
                onPress={():void => onSubmitPress(email, password)}
            />
            <CustomPressable
                text={"Log In"}
                onPress={():void => onToLoginPress()}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BLACK
    }
})

export default CreateAccount;