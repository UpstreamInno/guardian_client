import React from "react";
import {Text} from "react-native";

export const SubtitleBoldText = props => {
    const {style} = props;
    return <Text {...props} style={[style, {
        fontFamily: "noto-sans-black",
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 30,
        lineHeight: 35
    }]}/>;
};
