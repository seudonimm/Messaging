import React, { memo } from "react";
import { 
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";

const CustomButton = props => {

    const {text} = props;

    return(
        <TouchableOpacity style={styles.buttonStyle}
        onPress={props.onPress}
        >
        <Text style={styles.textStyle}>
            {text}
        </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        height: '10%',
        width: '30%',
        backgroundColor: 'black',
        borderRadius: 30,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        zIndex:1,
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    }
});

export default memo(CustomButton);