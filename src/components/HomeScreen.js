import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { t } from 'Lib/i18n';
import { 
  sessionNotFound, 
  routeTo,
} from "Store/actions";
import { Pages } from "Lib/Pages";

const HomeScreen = () => {
  const { accessToken } = useSelector(state => state);
  const dispatch = useDispatch();

  if (!accessToken) {
    dispatch(sessionNotFound());
    return <></>;
  }

  const onSymptoms = () => {
    dispatch(routeTo(Pages.SYMPTOM_SURVEY));
  }

  return (
    <View style={styles.outer}>
    <View style={styles.titleContainer}>
      <Text style={styles.welcome}> {t("Guardian")} </Text>
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.paragraph}>{t("Contact Alerts - none yet!")}</Text>
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress = {onSymptoms}>
        <Text style={styles.buttonText}>{t("Report Symptoms")}</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

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

export default HomeScreen;
