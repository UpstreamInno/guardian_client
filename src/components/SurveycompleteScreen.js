import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Constants from "expo-constants";
import { t } from 'Lib/i18n';
import { Pages } from "Components/GuardianContainer";

const styles = StyleSheet.create({
  outer:{
    flex:1,
    backgroundColor: '#494949',
  },
  titleContainer:{
    flex: 0.5,
    justifyContent: 'center',
  },
  textContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
  },
  welcome: {
    marginLeft: '10%',
    textAlign: 'left',
    fontSize: 50,
    color: '#FFFFFF',
  },
  paragraph: {
    marginVertical: "10%",
    marginHorizontal: "10%",
    fontSize: 18,
    alignItems: 'center',
    textAlign: 'left',
    color: '#FFFFFF',
  },
  button: {
    position: 'absolute',
    width: "80%",
    height:"3em",
    borderRadius:10,
    justifyContent:'center',
    backgroundColor: '#5ccd42',
    bottom:25,
  },
  buttonText:{
    textAlign:'center',
    color:'#FFFFFF'
  },
});

const SurveycompleteScreen = () => {

  return (
    <View style={styles.outer}>
      <View style={styles.titleContainer}>
        <Text style={styles.welcome}> {t("Survey Complete!")} </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.paragraph}>{t("Thank you for completing the survey. Remember, you are in control of your data, and your health. Stay safe!")}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{t("Return Home")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

};
export default SurveycompleteScreen;
