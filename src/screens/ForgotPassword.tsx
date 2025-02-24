import React, { useEffect, useState } from "react";
import CustomInputField from "../components/CustomInputField";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import CustomButton from "../components/CustomButton";
import store from "../store/Store";
import { useSelector } from "react-redux";
import CreateAccount from "./CreateAccount";
import { useNavigation } from "@react-navigation/native";
import FirestoreHelper from "../firebase/firestore/FirestoreHelper";
import Subtext from "../components/Subtext";
import { BLACK } from "../res/colors";

const ForgotPassword:React.FC = () => {

    const [email, setEmail] = useState('');
 

    const onForgotPasswordPress = (email:string):void => {
        console.log("email "+ email);
        store.dispatch({type:'CHANGE_PASSWORD', payload: {email}})
    }

    return(
        <SafeAreaView style={styles.container}>
            <Subtext
                text={"Email"}
            />
            <CustomInputField
                text={'Enter Email'}
                onChangeText={(t:string):void => setEmail(t)}
            />
            <CustomButton
            text={"Send Email Reset Link"}
            onPress={():void => onForgotPasswordPress(email)}
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

export default ForgotPassword;