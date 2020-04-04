import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const styles = StyleSheet.create({
  outer:{
    flex:1,
    backgroundColor: '#b20700',
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
    backgroundColor: '#FFFFFF',
    bottom:25,
  },
  buttonText:{
    textAlign:'center',

  },
});

const AlertMessage = props => {
  const {message} = props;

  if (message) {
    return (
      <View style={styles.outer}>
        <View style={styles.titleContainer}>
          <Text style={styles.welcome}> Alert </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.paragraph}>{message}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}> Check your symptoms </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default AlertMessage;
