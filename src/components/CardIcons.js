import React from "react";
import {Image, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import ToggleSwitch from 'toggle-switch-react-native';
import { Card } from 'galio-framework';

export const CardIcons = props => {
    const {text, source, heightCard} = props;
    const onToggle = (isOn) => {
    	toggleState = isOn;
        props.onToggle({ state:isOn, refs: text})
        if(isOn == true){
        }
    }
    let toggleState = props.toggleState;

    function elevationShadowStyle(elevation) {
	  return {
	    elevation,
	    borderColor: 'black',
	    shadowColor: 'rgba(0, 0, 0, 0.55)',
	    shadowOffset: { width: 10, height: 10.5 * elevation },
	    shadowOpacity: 30,
	    shadowRadius: 10 * elevation,
	    backgroundColor: "#F0F0F0",
	    };
	}

	const styles = StyleSheet.create({
	    shadow: elevationShadowStyle(40),
	    box: {
	        borderRadius: 10,
	        width: 360,
	        height:heightCard,
	        marginVertical:10,
	       	backgroundColor: "#F0F0F0",

		},
	 	absoluteView: {
	        width: 360,
	        height: heightCard,
	        justifyContent: 'space-between',
	        backgroundColor: 'transparent',
	        flexDirection: 'row',
	        paddingLeft:20,
	        paddingRight:20
	    },
	    textStyle: {
	    	fontWeight: 'bold',
	    	fontFamily: "noto-sans",
	    	fontSize: 24,
	    	width: 120,
	    },
	    toggle: {
	    	marginVertical: 5
	    },
	    img: {
	    	marginVertical: 5,
	    }
	});
    return <Card borderless shadow={true} style={[styles.box, styles.shadow]}>
          <View style={styles.absoluteView}>
          	<Image source={source} style={styles.img}/>
            <Text style={styles.textStyle}>{text}</Text>
            <View style={styles.toggle}>
	        	<ToggleSwitch
	              isOn={toggleState}
	              onColor="#E1B047"
	              offColor="#878787"
	              size="large"
	              onToggle={isOn => onToggle(isOn)}
	            />
            </View>
          </View>
        </Card>;
};
