import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FlatlistMessageBox = (props) => {
    const {username, message, timeStamp} = props;

    return(
        <View style={props.style}>
            <Text>
                {username}
            </Text>
            <Text>
                {message}
            </Text>
            <Text>
                {timeStamp}
            </Text>

        </View>
    )

}

const styles = StyleSheet.create({
    messageBox: {
        flex: 1,
        // height: 50,
        // width: '70%',
        borderWidth: 1,
        color: 'black',
        borderColor: 'black',
        alignSelf: "flex-start",
        margin: '1%',
        borderRadius: 10,
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: 'white',

    }
})
export default FlatlistMessageBox;