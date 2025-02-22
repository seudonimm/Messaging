import React from 'react';
import {
    StyleSheet,
    Text
} from 'react-native';
import { WHITE } from "../res/colors";

interface HeaderProps{
    text:String
}

const Header = (props) => {
    const {text} = props;
    return(
        <Text
            style={styles.textStyle}
        >
            {text}
        </Text>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 70,
        color: WHITE,
        marginBottom: '10%'
    },
    leftTextStyle: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 80,
        color: 'white',
        margin: '5%'
    }
});

export default Header;