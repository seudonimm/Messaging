import React, { useEffect, useState, useRef } from "react";
import { FlatList, SafeAreaView, Text, View, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import FirestoreHelper from "../firebase/firestore/FirestoreHelper";
import FlatlistMessageBox from "../components/FlatlistMessageBox";
import { firebase } from "@react-native-firebase/auth";
import CustomButton from "../components/CustomButton";
import CustomInputField from "../components/CustomInputField";
import { useSelector } from "react-redux";
import store, { RootState } from "../store/Store";
import { BLACK, RED, WHITE } from "../res/colors";
import CustomMessageInputField from "../components/CustomMessageInputField";

const Chat = (props) => {
    const {chatRoom} = props.route.params;

    const chat = useSelector((state:RootState) => state.chat);

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentMessage, setCurrentMessage] = useState('');

    const user = useRef(null);
    const inputBox = useRef(null);

    const chatList = useRef()

    const flatlistItemRender = ({item}) => {
        console.log("flatlist: "+ item.email, item.message)

        return  (item.timeStamp?
                <FlatlistMessageBox style={{...styles.messageBox, alignSelf:(item.email==user.current.email?'flex-end':'flex-start')}}
                    username={item.email}
                    message={item.message}
                    timeStamp={item.timeStamp.toDate().toString()}
                />:(<ActivityIndicator/>)
        );
    };

    const sendMessage = (message) => {
        FirestoreHelper.addToCollection(user.current.email, message, chatRoom);
        //inputBox.current.clear();
        setCurrentMessage("");
    };

    useEffect(
        () => {
            // const subscriber = FirestoreHelper.getFirestoreDataRealTime(storeMessages =>{
            //     //console.log("chat messages:" + storeMessages[1].message);
            //     setMessages(storeMessages);
            //     //console.log("checkig messages:" + messages[1].email)
            // })
            //console.log(subscriber);
            // if(chat && loading){
            //     //setMessages(chat.data);
            //     console.log("chatt: " +JSON.stringify(chat.data));
            //     setLoading(false);
            //     //console.log("message length:" +messages.length)
            // }
            console.log('useEffect1')
            user.current = firebase.auth().currentUser;
            console.log("user:" + user.current.email);
            setLoading(false);
        }, []
    )
    useEffect(
        () => {

            
            store.dispatch({type: 'GET_REALTIME_DATA'})
            
            setTimeout(() => {
                //chatList.current.scrollToEnd();

            }, 100);
            console.log('useEffect2')

            //return store.dispatch({type: 'GET_REALTIME_DATA'});
        }, []
    )
    return(
        <SafeAreaView style={styles.container}>
            <View style={{flex:8}}>
                {(!loading && user.current)?
                <FlatList
                    initialNumToRender={30}
                    ref={chatList}
                    data={chat.data}
                    renderItem={flatlistItemRender}
                    keyExtractor={(item)=>item.id}
                />:<ActivityIndicator/>}
                <ScrollView>
                    {/* {chat.data.map(
                        (item, index)=>{
                            console.log(item.email)
                            return <Text>{item.email}</Text>
                        }
                    )} */}
                </ScrollView>
            </View>
            <View style={styles.inputContainer}>
                <CustomMessageInputField
                    //ref={inputBox}
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
    },
    messageBox: {
        flex: 1,
        //height: 50,
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