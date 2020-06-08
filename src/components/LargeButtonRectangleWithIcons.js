import React from "react";
import {Image, StyleSheet, TouchableOpacity, View, Text, TextInput} from "react-native";

export const LargeButtonRectangleWithIcons = props => {
    const {text, mainSource, secondarySource, focused, hideMainSource,hideSecondarySource, secondaryText} = props;
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

	const onValueChange = (value) => {
	    console.log("number before on change value", text);
		console.log("onValueChange", value);
		props.updateText(value);
	}

	const styles = StyleSheet.create({
	    shadow: elevationShadowStyle(40),
	    box: {
	    	marginVertical: 20,
	        borderRadius: 15,
	        width: 350,
	        height: 60,
	        backgroundColor: 'white',
	        padding: 24,
	    },
	    centerContent: {
	        justifyContent: 'center',
	        alignItems: 'center',
	    },
	 	absoluteView: {
	        flex: 1,
	        width: 350,
	        height: 60,
	        position: 'absolute',
	        justifyContent: 'center',
	        flexDirection: 'row',
	        backgroundColor: 'transparent'
	    },
	    absoluteView2: {
	        flex: 1,
	        width: 350,
	        height: 60,
	        position: 'absolute',
	        justifyContent: 'flex-end',
	        backgroundColor: 'transparent'
	    },
	    img: {},
	    btn: {justifyContent: 'center', alignItems: 'center'},
	    textStyle: {
	    	fontFamily: "noto-sans",
	    	fontSize: 18,
	    	alignSelf: 'center',
	    	padding:10
	    },
	    textStyleSecondary: {
	    	fontFamily: "noto-sans",
	    	fontSize: 18,
			alignSelf: 'flex-end',
	    	padding:10,
	    	marginVertical: 10,
	    	marginRight: 10
	    },
	    mainSource: {
	    	width: 30,
	    	height:30,
	    	marginLeft: 30,
	    	alignSelf: 'center',
	    	marginVertical: 20,
	    },
	    secondarySource: {
	    	alignSelf: 'flex-end',
	    	marginVertical: 20,
	    	marginRight: 25
	    }
	});
    return <TouchableOpacity style={[styles.box, styles.centerContent, styles.shadow]} onPress={props.onPress}>
        <Image source={require('../../images/buttons/large_button_rectangle.png')}  style={styles.img}/>
         <View style={styles.absoluteView}>
           {!hideMainSource && <Image source={mainSource}  style={styles.mainSource}/>}
            <TextInput style={styles.textStyle} 
            autoFocus={focused}
            defaultValue={text}
            onTouchStart={()=>  alert("Hello...")}
            keyboardType = 'numeric'
            maxLength={12}
             // onChangeText={text => onValueChange(text)}
            onSubmitEditing={(e) => onValueChange(e.nativeEvent.text)}/>
       </View>
        <View style={styles.absoluteView2}>
        	{!hideSecondarySource &&  <Image source={secondarySource}  style={styles.secondarySource} />}
         {hideSecondarySource && <Text style={styles.textStyleSecondary}> {secondaryText} </Text>}
        </View>
    </TouchableOpacity>;
};
