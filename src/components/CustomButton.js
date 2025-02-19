import React, { memo } from "react";
import { 
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";

const CustomButton = props => {

    const {text} = props;

    return(
        <TouchableOpacity style={{...styles.buttonStyle, ...props.style}}
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
        //flex:1,
        height: '10%',
        width: '75%',
        backgroundColor: 'black',
        borderRadius: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        margin: '5%'
    },
    textStyle: {
        zIndex:1,
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    }
});

export default memo(CustomButton);