import React, {useState} from "react";
import {Image, StyleSheet, TextInput, View} from "react-native";

export const InputPhoneButton = props => {
  const [showIcon, setShowIcon] = useState(true)

  function elevationShadowStyle(elevation) {
    return {
      elevation,
      borderColor: 'black',
      shadowColor: 'rgba(0, 0, 0, 0.55)',
      shadowOffset: {width: 10, height: 10.5 * elevation},
      shadowOpacity: 30,
      shadowRadius: 10 * elevation,
      backgroundColor: "#FAFAFA",
    };
  }

  const inputChanged = (number) => {
    setShowIcon(number.length === 0)
  }

  const styles = StyleSheet.create({
    shadow: elevationShadowStyle(40),
    box: {
      marginVertical: 10,
      borderRadius: 15,
      width: 350,
      height: 60,
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    absoluteView: {
      flex: 1,
      width: 348,
      height: 50,
      position: 'absolute',
      backgroundColor: 'transparent'
    },
    smallIcon: {
      width: 30,
      height: 30,
      position: 'absolute',
      alignSelf: 'center',
      marginVertical: 10,
    },
    textStyle: {
      width: '90%',
      fontFamily: "noto-sans",
      fontSize: 22,
      alignSelf: 'flex-start',
      marginLeft: 20,
      marginRight: 20
    }
  });
  return <View style={[styles.box, styles.shadow]}>
    <Image source={require('../../images/buttons/large_button_rectangle.png')} style={styles.img}/>
    <View style={styles.absoluteView}>
      <TextInput style={styles.textStyle}
                 caretHidden={true}
                 keyboardType="numeric"
                 onChangeText={inputChanged}/>
      {showIcon && <Image source={require('../../images/number_input.png')} style={styles.smallIcon}/>}
    </View>
  </View>;
};
