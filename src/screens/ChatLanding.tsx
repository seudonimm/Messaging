import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View, StyleSheet, ActivityIndicator } from "react-native";
import CustomButton from "../components/CustomButton";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import store from "../store/Store";
import { BLACK } from "../res/colors";
import Header from "../components/Header";
import Subtext from "../components/Subtext";
import CustomInputField from "../components/CustomInputField";

const ChatLanding:React.FC = () => {
    const [chatRoomName, setChatRoomName] = useState<string>('');
    const navigation:NavigationProp<ParamListBase> = useNavigation();

    const toChatPage = ():void => {
        console.log(chatRoomName);
        navigation.navigate("Chat", {chatRoom:chatRoomName});

    }

    const logout = ():void => {
        store.dispatch({type: 'STOP_LISTENING'});

        store.dispatch({type: "LOGOUT"});

    }
    useEffect(
        () => {
            console.log("dkdkdkdkdkdkd")
            //store.dispatch({type: 'STOP_LISTENING'});

        },[]
    )
    return(
        <SafeAreaView style={styles.container}>
            <Header
                text={"Menu"}
            />
            {/* <View style={styles.subContainer}> */}
            <CustomInputField
                text={"Enter Chat Room Name"}
                onChangeText={(t:string):void => setChatRoomName(t)}
            />
                <CustomButton
                    text={"To Chat"}
                    onPress={():void => toChatPage()}
                />
                <Subtext
                    text={"Talk to people"}
                /> 
            {/* </View>  
            <View style={styles.subContainer}> */}
            
                <CustomButton
                    text={"Logout"}
                    onPress={():void => logout()}
                />
                <Subtext
                    text={"Leave"}
                />    
            {/* </View>   */}

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BLACK
    },
    subContainer: {
        height: '30%'
    },
    messageBox: {
        flex: 1,
        // height: 50,
        width: '70%',
        borderWidth: 1,
        color: 'black',
        borderColor: 'black',
        //alignSelf: "flex-start",
        margin: '1%',
        borderRadius: 10,
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: 'white',

    }
})

export default ChatLanding;