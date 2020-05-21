import React from "react";
import {Text} from "react-native";

export const TitleText = props => {
    const {style} = props;
    return <Text {...props} style={[{
        fontFamily: "noto-sans-black",
        fontSize: 44,
        fontWeight: '900',
        lineHeight: 48,
        borderBottomWidth: 4,
        borderBottomColor: '#000000',
        paddingBottom: 10,
        width: '60%',
        marginBottom: 15,
    }, style]}/>;
};
