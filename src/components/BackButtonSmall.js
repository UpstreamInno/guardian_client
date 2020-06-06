import React from "react";
import {Image, StyleSheet, TouchableOpacity, View, Text} from "react-native";

export const BackButtonSmall = props => {
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
	        borderTopLeftRadius: 15,
	        borderBottomLeftRadius: 15,
	        width:70,
	        height:60,
	        backgroundColor: 'white',
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
	    img: {paddingBottom: 10},
	    btn: {justifyContent: 'center', alignItems: 'center'},
	});
    return <TouchableOpacity style={[styles.box, styles.centerContent, styles.shadow]} onPress={props.onPress}>
        <Image source={require('../../images/buttons/back_button.png')}  style={styles.img}/>
         <View style={styles.absoluteView}>
          <Image source={require('../../images/back_button_arrow.png')}  style={styles.img}/>
        </View>
    </TouchableOpacity>;
};
