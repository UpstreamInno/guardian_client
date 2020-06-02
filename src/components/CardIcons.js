import React, {useState} from "react";
import {Image, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import ToggleSwitch from 'toggle-switch-react-native';
import { Card } from 'galio-framework';
import Slider from "react-native-slider";
import { Shadow } from 'react-native-neomorph-shadows';

export const CardIcons = props => {
    const [value, setValue] = useState(36.5);
    const {text, source, heightCard} = props;
    const onToggle = (isOn) => {
    	toggleState = isOn;
        props.onToggle({ state:isOn, refs: text})
        if(isOn == true){
        }
    }

    const onSliderChange = (val)  => {
    	setValue(val);
    	props.onSliderChange(val);
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
	        backgroundColor: 'transparent',
	        alignItems:'center'
	    },
	    container:{
	    	width: 360,
	        height: 90,
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
	    textStyleToggle: {
	    	fontWeight: 'bold',
	    	fontFamily: "noto-sans",
	    	fontSize: 24,
	    	width: 220,
	    	alignItems: 'center',
	    	marginLeft:60
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
          	<View style={styles.container}>
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
          	{text=="Fever" && heightCard == 250 && 
          	<View style={{ flex: 1, marginLeft: 10, marginRight: 10, alignItems: "stretch", justifyContent: "center"}}>
          		<View style={{ height: 40, width: 250, justifyContent: 'center', alignItems: 'center'}}>
					<Shadow
					  inner 
					  useArt 
					  style={{
					    shadowOffset: {width: 0.01, height: 0.01},
					    shadowOpacity: 0.2,
					    shadowColor: "rgba(0, 0, 0, 0.3)",
					    shadowRadius: 10,
					    borderRadius: 20,
					    backgroundColor: '#FAFAFA',
					    width: 300,
					    height: 40,
					    alignItems: 'center',
					    justifyContent: 'center'
					  }}
					>
					<Text style={styles.textStyleToggle}>{value}°C   {((value*9/5) + 32).toFixed(1)}°F</Text>
					</Shadow>
					</View>
	          	 <Slider
	              minimumTrackTintColor={"#E1B047"}
	          	  maximumTrackTintColor={"#E1B047"}
	          	  minimumValue={35}
	          	  maximumValue={42}
	          	  style={{ width: 250 }}
	          	  thumbTintColor={'#343434'}
		          value={36.5}
		          onValueChange={value => onSliderChange(value.toFixed(1))}
		        />
		        
	        </View>
          }

          </View>
        </Card>;
};
