import React from "react";
import { FlatList, SafeAreaView, Text, View, StyleSheet, ActivityIndicator } from "react-native";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import store from "../store/Store";

const ChatLanding = () => {
    const navigation = useNavigation();

    const toChatPage = () => {
        navigation.navigate("Chat");
    }

    const logout = () => {
        store.dispatch({type: "LOGOUT"});
    }
    return(
        <SafeAreaView style={styles.container}>
            
            <CustomButton
                text={"To Chat"}
                onPress={() => toChatPage()}
            />            
            <CustomButton
                text={"Logout"}
                onPress={() => logout()}
            />
            
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

export default ChatLanding;