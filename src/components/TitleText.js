import React from "react";
import {Text} from "react-native";

export const TitleText = props => {
    const {style} = props;
    return <Text {...props} style={[{
        fontFamily: "noto-sans-black",
        fontSize: 44,
        fontWeight: 'bold',
        lineHeight: 48,
        color:"#2A79A7",
        borderBottomWidth: 4,
        borderBottomColor: '#2A79A7',
        paddingBottom: 10,
        width: '50%',
        marginBottom: 15,
    }, style]}/>;
};
