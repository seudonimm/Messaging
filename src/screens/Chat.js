import React, { useEffect, useState, useRef } from "react";
import { FlatList, SafeAreaView, Text, View, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import FirestoreHelper from "../firebase/firestore/FirestoreHelper";
import FlatlistMessageBox from "../components/FlatlistMessageBox";
import { firebase } from "@react-native-firebase/auth";
import CustomButton from "../components/CustomButton";
import CustomInputField from "../components/CustomInputField";
import { useSelector } from "react-redux";
import store from "../store/Store";

const Chat = () => {
    const chat = useSelector(state => state.chat);

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentMessage, setCurrentMessage] = useState();

    const user = useRef(null);

    const flatlistItemRender = (username, message, timeStamp, item) => {
        console.log("flatlist: "+ username, message, timeStamp)
            return(
                <SafeAreaView>
                    <Text>sdflksjdlfk</Text>
                    <Text>{message}</Text>
                    <Text>{timeStamp}</Text>
                </SafeAreaView>
            );
        // return  timeStamp?(
                // return<FlatlistMessageBox style={{height:20, width:90}}
                //     username={username}
                //     message={message}
                //     timeStamp={timeStamp.toDate().toString()}
               //s />//):(<ActivityIndicator/>
        //);
    };

    const sendMessage = (message) => {
        FirestoreHelper.addToCollection(user.current.email, message);
    };

    useEffect(
        () => {
            // const subscriber = FirestoreHelper.getFirestoreDataRealTime(storeMessages =>{
            //     //console.log("chat messages:" + storeMessages[1].message);
            //     setMessages(storeMessages);
            //     //console.log("checkig messages:" + messages[1].email)
            // })
            //console.log(subscriber);
            if(chat && loading){
                setMessages(chat.data);
                //console.log("chatt: " +JSON.stringify(messages));
                setLoading(false);
                //console.log("message length:" +messages.length)
            }
            console.log('useEffect1')

        }, [chat]
    )
    useEffect(
        () => {
            store.dispatch({type: 'GET_REALTIME_DATA'})

            user.current = firebase.auth().currentUser
            //console.log("user:" + user.current.email)
            console.log('useEffect2')

            return chat.unsubscribe;
        }, []
    )
    return(
        <SafeAreaView style={styles.container}>
            <View style={{flex:9, backgroundColor: 'lightblue' }}>

                <FlatList
                    initialNumToRender={30}
                    data={chat.data}
                    renderItem={({item, index}) => {flatlistItemRender(item.email, item.message, item.timeStamp, item)}}
                    keyExtractor={({item, index})=>index}
                />
                <ScrollView>
                    {/* {chat.data.map(
                        (item, index)=>{
                            console.log(item.email)
                            return <Text>{item.email}</Text>
                        }
                    )} */}
                </ScrollView>
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
        height: 50,
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