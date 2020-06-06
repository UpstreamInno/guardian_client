import React from "react";
import {Image, StyleSheet, TouchableOpacity, View, Text} from "react-native";

export const LargeButton = props => {
    const {text} = props;
    function elevationShadowStyle(elevation) {
	  return {
	    elevation,
	    borderColor: 'black',
	    shadowColor: 'rgba(0, 0, 0, 0.55)',
	    shadowOffset: { width: 10, height: 10.5 * elevation },
	    shadowOpacity: 30,
	    shadowRadius: 10 * elevation,
	    backgroundColor: "#FAFAFA",
	    };
	}

	const styles = StyleSheet.create({
	    shadow: elevationShadowStyle(40),
	    box: {
	        borderRadius: 40,
	        width:300,
	        height:60,
	        backgroundColor: 'white',
	        padding: 24,
	    },
	    centerContent: {
	        justifyContent: 'center',
	        alignItems: 'center'
	    },
	 	absoluteView: {
	        flex: 1,
	        position: 'absolute',
	        alignItems: 'center',
	        justifyContent: 'center',
	        backgroundColor: 'transparent'
	    },
	    img: {padding: 10},
	    btn: {justifyContent: 'center', alignItems: 'center'},
	    textStyle: {
	    	fontWeight: 'bold',
	    	fontFamily: "noto-sans",
	    	fontSize: 18
	    }
	});
    return <TouchableOpacity style={[styles.box, styles.centerContent, styles.shadow]} onPress={props.onPress}>
        <Image source={require('../../images/buttons/Button_Styling_Body_Large.png')}  style={styles.img}/>
         <View style={styles.absoluteView}>
            <Text style={styles.textStyle}>{text}</Text>
        </View>
    </TouchableOpacity>;
};
