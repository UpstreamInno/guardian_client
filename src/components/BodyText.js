import React from "react";
import {Text} from "react-native";

export const BodyText = props => {
    const {style} = props;
    return <Text {...props} style={[style, {
        fontFamily: "noto-sans",
        fontSize: 18,
        marginVertical: 10
    }]}/>;
};
