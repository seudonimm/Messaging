import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RED } from "../res/colors";

const FlatlistMessageBox = (props) => {
    const {username, message, timeStamp} = props;

    return(
        <View style={props.style}>
            <Text style={styles.usernameStyle}>
                {username}
            </Text>


                <Text style={styles.messageStyle}>
                    {message}
                </Text>


            <Text style={styles.dateStyle}>
                {timeStamp}
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        margin: '3%'
    },
    messageBox: {
        flex: 1,
        // height: 50,
        // width: '70%',
        borderWidth: 1,
        color: 'black',
        borderColor: RED,
        alignSelf: "flex-start",
        margin: '1%',
        borderRadius: 10,
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: 'white',

    },
    usernameStyle: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: '1%'
    },
    messageStyle: {
        fontSize: 30,
        margin:'2%'
    },
    dateStyle: {
        fontSize: 10,
        margin: '1%'
    }
})
export default FlatlistMessageBox;