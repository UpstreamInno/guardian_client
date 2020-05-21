import React from "react";
import {Text} from "react-native";

export const SubtitleText = props => {
    const {style} = props;
    return <Text {...props} style={[style, {
        fontFamily: "noto-sans",
        fontSize: 32,
        fontWeight: '300',
        marginBottom: 10,
        lineHeight: 35
    }]}/>;
};
