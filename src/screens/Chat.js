import React, { useEffect, useState, useRef } from "react";
import { FlatList, SafeAreaView, Text, View, StyleSheet, ActivityIndicator } from "react-native";
import FirestoreHelper from "../firebase/firestore/FirestoreHelper";
import FlatlistMessageBox from "../components/FlatlistMessageBox";
import { firebase } from "@react-native-firebase/auth";
import CustomButton from "../components/CustomButton";
import CustomInputField from "../components/CustomInputField";
import { BLACK, RED, WHITE } from "../res/colors";
import CustomMessageInputField from "../components/CustomMessageInputField";

const Chat = (props) => {
    const {chatRoom} = props.route.params;

    const [messages, setMessages] = useState();
    const [loading, setLoading] = useState();

    const [currentMessage, setCurrentMessage] = useState();

    const user = useRef(null);
    const inputBox = useRef(null);

    const chatList = useRef()

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
        FirestoreHelper.addToCollection(user.current.email, message, chatRoom);
        //inputBox.current.clear();
        setCurrentMessage("");
    };

    useEffect(
        () => {
            console.log("chat")
            const subscriber = FirestoreHelper.getFirestoreDataRealTime(storeMessages =>{
                //console.log("chat messages:" + storeMessages[1].message);
                setMessages(storeMessages);
                //console.log("checkig messages:" + messages[1].email)
            }, chatRoom)
            user.current = firebase.auth().currentUser
            //console.log(subscriber);
            return () => subscriber();
        }, []
    )
    useEffect(
        () => {
            setTimeout(() => {
                chatList.current.scrollToEnd();

            }, 100);
        }, [messages]
    )
    return(
        <SafeAreaView style={styles.container}>
            <View style={{flex:8}}>
                <FlatList
                    ref={chatList}
                    data={messages}
                    renderItem={({item}) => flatlistItemRender(item.email, item.message, item.timeStamp)}
                />
            </View>
            <View style={styles.inputContainer}>
                <CustomMessageInputField
                    ref={inputBox}
                    text={"Enter Message"}
                    onChangeText={t => setCurrentMessage(t)}
                    
                />
                <CustomButton style={{flex: 1}}
                    text={"Send"}
                    onPress={() => sendMessage(currentMessage)}
                />
            </View>
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BLACK
    },
    inputContainer: {
        flex: 2,
        backgroundColor: RED,
        borderTopRadius: 20
    },
    messageBox: {
        flex: 1,
        // height: 50,
        width: '70%',
        borderWidth: 1,
        color: 'black',
        borderColor: RED,
        //alignSelf: "flex-start",
        margin: '1%',
        borderRadius: 10,
        fontSize: 30,
        textAlign: 'center',
        backgroundColor: WHITE,

    }
})

export default Chat;