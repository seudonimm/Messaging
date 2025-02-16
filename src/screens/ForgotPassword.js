import React, { useEffect, useState } from "react";
import CustomInputField from "../components/CustomInputField";
import { SafeAreaView, Text } from "react-native";
import CustomButton from "../components/CustomButton";
import store from "../store/Store";
import { useSelector } from "react-redux";
import CreateAccount from "./CreateAccount";
import { useNavigation } from "@react-navigation/native";
import FirestoreHelper from "../firebase/firestore/FirestoreHelper";

const ForgotPassword = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
 

    const onForgotPasswordPress = (email) => {
        console.log("email "+ email);
        store.dispatch({type:'CHANGE_PASSWORD', payload: {email}})
    }

    return(
        <SafeAreaView style={{flex: 1}}>
            <Text>Email</Text>
            <CustomInputField
                text={'Enter Email'}
                onChangeText={t => setEmail(t)}
            />
            <CustomButton
            text={"Send Email Reset Link"}
            onPress={() => onForgotPasswordPress(email)}
            />
        </SafeAreaView>
    );
};

export default ForgotPassword;