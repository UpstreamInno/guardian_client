import {
  Button,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import Constants from "expo-constants";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { t } from 'Lib/i18n';
import { routeTo } from "Store/actions";
import { Pages } from "Lib/Pages";
import Location from "Lib/models/Location";
import { configureBackgroundLocation } from "Lib/Location";
import moment from 'moment';

import DialogInput from 'react-native-dialog-input';

const isDebugVersion = false;
const LocationScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
  });

  const onPress = async () => {
    configureBackgroundLocation();
  };

  const onContinue = () => {
    dispatch(routeTo(Pages.SIGNUP_COMPLETE));
  }

  return (
     <LinearGradient colors={["#494949", "#494949"]} style={styles.container}>
        <Text style={styles.title}>Wel'll keep          you safe</Text>
        <Text style={styles.paragraph}>Explainer text 1 </Text>
        <Text style={styles.paragraph}>Explainer text 2 </Text>
       <TouchableOpacity
        style={styles.SubmitButtonStyle}
        activeOpacity = { .5 }
        onPress={onPress}
       >

      <Text style={styles.textButtonStyle}> Enable background location </Text>
            
      </TouchableOpacity>
       
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#494949"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#fff",
    marginBottom: 5
  },
  paragraph: {
    marginTop:14,
    marginBottom:14,
    marginLeft:50,
    marginRight: 100,
    fontSize: 18,
    textAlign: "left",
    color: "#ffffff"
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft:50,
    marginRight: 50,
    marginTop:20,
    marginBottom: 24,
    color: "#ffffff",
    textAlignVertical: 'top'
  },
  textButtonStyle:{
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    paddingLeft:70,
    paddingRight:70,
    fontWeight: "bold" 
   },
   SubmitButtonStyle: {
    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    marginRight:30,
    marginBottom:20,
    backgroundColor:'#45CD4B',
    borderRadius:15,
    borderWidth: 1,
    borderColor: '#45CD4B',
    position: 'absolute',
    color: '#fff',
    bottom:0,
    justifyContent: 'center',
    alignSelf: 'center'
  }
});


export default LocationScreen;
