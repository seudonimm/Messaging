import React, { useState } from "react";
import { FlatList, SafeAreaView, Text, View, StyleSheet, ActivityIndicator } from "react-native";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import store from "../store/Store";
import { BLACK } from "../res/colors";
import Header from "../components/Header";
import Subtext from "../components/Subtext";
import CustomInputField from "../components/CustomInputField";

const ChatLanding = () => {
    const [chatRoomName, setChatRoomName] = useState('');
    const navigation = useNavigation();

    const toChatPage = () => {
        console.log(chatRoomName);
        navigation.navigate("Chat", {chatRoom:chatRoomName});

    }

    const logout = () => {
        store.dispatch({type: "LOGOUT"});
    }
    return(
        <SafeAreaView style={styles.container}>
            <Header
                text={"Menu"}
            />
            {/* <View style={styles.subContainer}> */}
            <CustomInputField
                text={"Enter Chat Room Name"}
                onChangeText={t => setChatRoomName(t)}
            />
                <CustomButton
                    text={"To Chat"}
                    onPress={() => toChatPage()}
                />
                <Subtext
                    text={"Talk to people"}
                /> 
            {/* </View>  
            <View style={styles.subContainer}> */}
            
                <CustomButton
                    text={"Logout"}
                    onPress={() => logout()}
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