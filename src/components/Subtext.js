import React from "react";
import {
    StyleSheet,
    Text
} from 'react-native';
import { RED, WHITE } from "../res/colors";

const Subtext = (props) => {
    const {text, isLeft} = props;
    return(
        <Text
            style={isLeft ? styles.leftTextStyle:styles.textStyle}
        >
            {text}
        </Text>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 25,
        color: RED,
        marginLeft: '10%'
    },
    leftTextStyle: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 80,
        color: 'white',
        margin: '5%'
    }
});

export default Subtext;