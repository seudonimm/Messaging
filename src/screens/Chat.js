import React, { useEffect, useState, useRef } from "react";
import { FlatList, SafeAreaView, Text, View, StyleSheet, ActivityIndicator } from "react-native";
import FirestoreHelper from "../firebase/firestore/FirestoreHelper";
import FlatlistMessageBox from "../components/FlatlistMessageBox";
import { firebase } from "@react-native-firebase/auth";
import CustomButton from "../components/CustomButton";
import CustomInputField from "../components/CustomInputField";

const Chat = () => {
    const [messages, setMessages] = useState();
    const [loading, setLoading] = useState();

    const [currentMessage, setCurrentMessage] = useState();

    const user = useRef(null);

    const flatlistItemRender = (username, message, timeStamp) => {
        //console.log(timeStamp.toDate().toString())
        return(
                timeStamp?
                <FlatlistMessageBox style={{...styles.messageBox, alignSelf:(username==user.current.email?'flex-end':'flex-start')}}
                    username={username}
                    message={message}
                    timeStamp={timeStamp.toDate().toString()}
                />:<ActivityIndicator/>
        );
    };

    const sendMessage = (message) => {
        FirestoreHelper.addToCollection(user.current.email, message);
    };

    useEffect(
        () => {
            console.log("chat")
            const subscriber = FirestoreHelper.getFirestoreDataRealTime(storeMessages =>{
                //console.log("chat messages:" + storeMessages[1].message);
                setMessages(storeMessages);
                //console.log("checkig messages:" + messages[1].email)
            })
            //console.log(subscriber);
            return () => subscriber();
        }, []
    )
    useEffect(
        () => {
            user.current = firebase.auth().currentUser
            //console.log("user:" + user.current.email)
        }, []
    )
    return(
        <SafeAreaView style={styles.container}>
            <View style={{flex:9}}>
                <FlatList
                    data={messages}
                    renderItem={({item}) => flatlistItemRender(item.email, item.message, item.timeStamp)}
                />
            </View>
            <View style={styles.container}>
                <CustomInputField
                    text={"Enter Message"}
                    onChangeText={t => setCurrentMessage(t)}
                    
                />
                <CustomButton
                    text={"Send"}
                    onPress={() => sendMessage(currentMessage)}
                />
            </View>
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
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

export default Chat;