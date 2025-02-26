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
import { FieldValue, Timestamp } from "@react-native-firebase/firestore";
import { StaticScreenProps } from "@react-navigation/native";

type Props = StaticScreenProps<{
    chatRoom:string
    route:object
}>

export interface FlatlistItemRenderParams{
    email:string,
    message:string,
    timeStamp:Timestamp,
    id:string
}
const Chat:React.FC<Props> = (props) => {
    const {chatRoom} = props.route.params;

    const chat = useSelector((state:RootState) => state.chat);

    //const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [currentMessage, setCurrentMessage] = useState<string>('');

    const user = useRef(null);
    const inputBox = useRef(null);

    const chatList = useRef()


    const flatlistItemRender = ({item}:{item:FlatlistItemRenderParams}) => {
        console.log("timestamp type: "+ typeof(item.timeStamp));

        return  (item.timeStamp?
                <FlatlistMessageBox style={{...styles.messageBox, alignSelf:(item.email==user.current.email?'flex-end':'flex-start')}}
                    username={item.email}
                    message={item.message}
                    timeStamp={item.timeStamp.toDate().toString()}
                />:(<ActivityIndicator/>)
        );
    };

    const sendMessage = (message:string) => {
        FirestoreHelper.addToCollection(user.current.email, message, chatRoom);
        //inputBox.current.clear();
        setCurrentMessage("");
    };

    useEffect(
        () => {

            console.log('useEffect1')
            user.current = firebase.auth().currentUser;
            console.log("user:" + user.current.email);
            setLoading(false);
        }, []
    )
    const stopListening = () => {
        store.dispatch({type: 'STOP_LISTENING'});
    }
    useEffect(
        () => {

            
            store.dispatch({type: 'GET_REALTIME_DATA'})
            
            setTimeout(() => {
                //chatList.current.scrollToEnd();

            }, 100);
            console.log('useEffect2')

            //return (stopListening());
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