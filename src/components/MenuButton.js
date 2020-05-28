import React from "react";
import {Image, StyleSheet, TouchableOpacity, View, Text} from "react-native";

export const MenuButton = props => {
    const {text} = props;
    function elevationShadowStyle(elevation) {
	  return {
	    elevation,
	    shadowColor: 'rgba(0, 0, 0, 0.55)',
	    shadowOffset: { width: 10, height: 10.5 * elevation },
	    shadowOpacity: 30,
	    shadowRadius: 10 * elevation,
	    backgroundColor: "white",
	    };
	}

	const styles = StyleSheet.create({
	    shadow: elevationShadowStyle(40),
	    box: {
	        borderRadius: 5,
	        width:88,
	        height:30,
	        backgroundColor: 'white',
	       borderWidth: 2,
		  borderColor: "white",
		  borderTopLeftRadius: 5,
		  borderTopRightRadius: 5,
		  borderBottomRightRadius: 5,
		  borderBottomLeftRadius: 5,
	    },
	    centerContent: {
	        justifyContent: 'center',
	        alignItems: 'center'
	    },
	 	absoluteView: {
	        flex: 1,
    		justifyContent: 'space-between',
            flexDirection: 'row',
	    },
	    img: {marginRight:8, marginVertical:6},
	    btn: {justifyContent: 'flex-start', alignItems: 'center'},
	    textStyle: {
	    	fontWeight: 'bold',
	    	fontFamily: "noto-sans",
	    	justifyContent: "flex-start",
	    	fontSize: 16,
	    	marginLeft: 8,
	    	marginVertical: 3
	    }
	});
    return <TouchableOpacity style={[styles.box,styles.shadow]} onPress={props.onPress}>
        
         <View style={styles.absoluteView}>
            <Text style={styles.textStyle}>{text}</Text>
             <Image source={require('../../images/hamburger.png')}  style={styles.img}/>
        </View>
    </TouchableOpacity>;
};
