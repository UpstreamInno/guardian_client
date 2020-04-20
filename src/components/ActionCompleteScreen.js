import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { t } from 'Lib/i18n';
import { Pages } from "Lib/Pages";;
import { useDispatch, useSelector } from "react-redux";
import { routeTo } from "Store/actions";

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
    // height:"3em",
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

const ActionCompleteScreen = () => {
  const { currentPage } = useSelector(state => state);
  const dispatch = useDispatch();
  let header, body, button, nextScreen;
  if (currentPage == Pages.SIGNUP_COMPLETE){
    header = t("Setup successful!");
    body = t("Thank you for signing up. Remember, you are in control of your data, and your health. Stay safe!");
    button = t("Continue");
    nextScreen = () => dispatch(routeTo(Pages.HOME));
  } else if (currentPage == Pages.SURVEY_COMPLETE){
    header = t("Survey Complete!");
    body = t("Thank you for completing the survey. Remember, you are in control of your data, and your health. Stay safe!");
    button = t("Return Home");
    nextScreen = () => dispatch(routeTo(Pages.HOME));
  }

  return (
    <View style={styles.outer}>
      <View style={styles.titleContainer}>
        <Text style={styles.welcome}> {header} </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.paragraph}>{body}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress = {nextScreen}>
          <Text style={styles.buttonText}>{button}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ActionCompleteScreen;
