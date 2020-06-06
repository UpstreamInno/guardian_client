import React from "react";
import {Image, StyleSheet, TouchableOpacity, View, Text} from "react-native";

export const ChooseLanguageButton = props => {
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
	    	marginVertical: 10,
	        borderRadius: 15,
	        width:350,
	        height:60,
	        backgroundColor: 'white',
	    },
	 	absoluteView: {
	        flex: 1,
	        width:348,
	        height:50,
	        position: 'absolute',
	        justifyContent: 'space-between',
			flexDirection: 'row',
		    backgroundColor: 'transparent'
	    },
	    img: {padding: 10},
	    smallIcon: {
	    	width: 10,
	    	height: 10,
			alignSelf: 'flex-end',
			marginVertical: 14,
			marginRight: 20
	    },
	    textStyle: {
	    	fontFamily: "noto-sans",
	    	fontSize: 18,
			alignSelf: 'flex-start',
			marginLeft: 20,
			marginVertical: 18,
		}
	});
    return <TouchableOpacity style={[styles.box, styles.shadow]} onPress={props.onPress}>
        <Image source={require('../../images/buttons/large_button_rectangle.png')}  style={styles.img}/>
         <View style={styles.absoluteView}>
            <Text style={styles.textStyle}>{text}</Text>
             <Image source={require('../../images/dropdown_arrow.png')}  style={styles.smallIcon}/>
        </View>
    </TouchableOpacity>;
};
