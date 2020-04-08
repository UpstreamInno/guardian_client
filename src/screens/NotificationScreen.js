import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as TaskManager from "expo-task-manager";
import * as WebBrowser from "expo-web-browser";
import React, { Component } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Notifications } from 'expo';

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

onClickNotificationButton = async () => {
  alert("I want to be notified");
}

class NotificationScreen extends Component {
  state = {
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.registerNotifications();
  }

  registerNotifications = async () => {
    let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    // // Stop here if the user did not grant permissions
    // console.log(status);
    // alert(status);

    if (status !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    //TODO save the token for every user
    
  };

  render() {
  
    return (
      <LinearGradient colors={["#494949", "#494949"]} style={styles.container}>
        <Text style={styles.title}>Wel'll keep          you safe</Text>
        <Text style={styles.paragraph}>We will ask you how you are doing once a day through your notifications. </Text>
        <Text style={styles.paragraph}>For these we need permissons to do so. </Text>

         <TouchableOpacity
          style={styles.SubmitButtonStyle}
          activeOpacity = { .5 }
          onPress={() => onClickNotificationButton()}
       >

            <Text style={styles.textButtonStyle}> Ok, notify me </Text>
            
      </TouchableOpacity>
       
      </LinearGradient>
    );
  }
}

NotificationScreen.navigationOptions = {
  header: null
};

export default NotificationScreen;
