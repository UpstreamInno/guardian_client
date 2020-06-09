import React from "react";
import {Image, StyleSheet, TouchableOpacity, View, Text} from "react-native";

export const NextButtonMedium = props => {
    const {text} = props;
    function elevationShadowStyle(elevation) {
	  return {
	    elevation,
	    borderColor: 'black',
	    shadowColor: 'rgba(0, 0, 0, 0.55)',
	    shadowOffset: { width: 10, height: 10.5 * elevation },
	    shadowOpacity: 30,
	    shadowRadius: 5 * elevation,
	    backgroundColor: "#FAFAFA",
	    };
	}

	const styles = StyleSheet.create({
	    shadow: elevationShadowStyle(5),
	    box: {
		    borderTopLeftRadius: 15,
			borderTopRightRadius: 0,
			borderBottomRightRadius: 0,
			borderBottomLeftRadius: 15,
	        width:207,
	        height:60,
	        backgroundColor: 'white',
	    },
	 	centerContent: {
	        alignItems: 'center', justifyContent: 'center'
	    },
	 	absoluteView: {
	        flex: 1,
	        position: 'absolute',
            flexDirection: 'row',	
            justifyContent: 'space-between'
	    },
	    img: {marginLeft:14, marginRight:8, marginVertical:10},
	    textStyle: {
	    	fontWeight: 'bold',
	    	fontFamily: "noto-sans",
	    	fontSize: 18,
	    	marginLeft: 8,
	    	marginVertical: 6
	    }
	});
    return <TouchableOpacity style={[styles.box,styles.centerContent, styles.shadow]} onPress={props.onPress}>
        <Image source={require('../../images/buttons/next_button_medium.png')}  />
         <View style={styles.absoluteView}>
         <Text style={styles.textStyle}>{text}</Text>
          <Image source={require('../../images/next_button_arrow.png')}  style={styles.img}/>
        </View>
    </TouchableOpacity>;
};
