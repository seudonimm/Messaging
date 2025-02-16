import React, { memo } from "react";
import {
    Image,
    StyleSheet,
    TextInput,
    View,
    Text
} from "react-native"


const CustomInputField = (props) => {
    const {text, inputErrorMessage} = props;

    return(
        <View>
            <View style={styles.container}>
                <TextInput 
                    style={styles.inputStyle}
                    placeholder={text}
                    placeholderTextColor={"white"}
                    onChangeText={props.onChangeText}
                    cursorColor={'white'}
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
        height: 50,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#1e1d24',
        borderRadius: 30,
        //justifyContent: 'left',
        borderWidth: 1,
        borderColor: 'white',
        //margin: '2%',
        paddingLeft: '10%',
        color: 'white'
    },
    inputStyle: {
        flex: 1,
        height: 50,
        color: 'white'
    },
    textStyle: {
        color: 'red',
        marginLeft: '5%'
    }
});

export default memo(CustomInputField);