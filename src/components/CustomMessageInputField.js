import React, { memo } from "react";
import {
    Image,
    StyleSheet,
    TextInput,
    View,
    Text
} from "react-native"
import { BLACK, RED, WHITE } from "../res/colors";


const CustomMessageInputField = (props) => {
    const {text, inputErrorMessage} = props;

    return(
        <View>
            <View style={styles.container}>
                <TextInput 
                    style={styles.inputStyle}
                    placeholder={text}
                    placeholderTextColor={BLACK}
                    onChangeText={props.onChangeText}
                    cursorColor={RED}
                />
            </View>
            <Text style={styles.textStyle}>
                {inputErrorMessage}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        //flex: 1,
        height: 50,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: WHITE,
        borderRadius: 30,
        //justifyContent: 'left',
        borderWidth: 1,
        //borderColor: 'white',
        marginTop: '2%',
        paddingLeft: '10%',
        color: 'white'
    },
    inputStyle: {
        flex: 1,
        height: 50,
        color: BLACK
    },
    textStyle: {
        color: 'red',
        marginLeft: '5%'
    }
});

export default memo(CustomMessageInputField);