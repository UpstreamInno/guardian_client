import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as TaskManager from "expo-task-manager";
import * as WebBrowser from "expo-web-browser";
import React, { Component } from "react";
import { LinearGradient } from "expo-linear-gradient";
import PhoneOrLocRequest from "../components/PhoneOrLocRequest.js";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
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
    margin: 24,
    fontSize: 18,
    textAlign: "center",
    color: "#000"
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    color: "#ffffff"
  }
});

const TASK_GUARDIAN_LOCATION = "guardian_location";

TaskManager.defineTask(TASK_GUARDIAN_LOCATION, ({ data, error }) => {
  if (error) {
    return;
  }
  if (data) {
    const { locations } = data;
    // TODO: AsyncStorage
    // TODO: SecureStorage
  }
});

// TODO: convert to functional component!
class LocationScreen extends Component {
  state = {
    location: null,
    errorMessage: null,
    inputText: null,
    phoneNumber: null
  };

  constructor(props) {
    super(props);
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this.watchLocation();
    }
  }

  componentDidMount() {
    this.watchLocation();
  }

  watchLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  onPress = async () => {
    const { status, ios } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    if (status === "granted") {
      await Location.startLocationUpdatesAsync(TASK_GUARDIAN_LOCATION, {
        accuracy: Location.HIGH,
        showsBackgroundLocationIndicator: true,
        //timeInterval: 0,
        distanceInterval: "20", // meters
        deferredUpdatesInterval: "200", //ms
        deferredUpdatesDistance: "20", //meters
        pausesUpdatesAutomatically: true
      });
    }
  };

  render() {
    let text = "Waiting..";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }

    return (
      <LinearGradient colors={["#94e4f9", "#2d93d8"]} style={styles.container}>
        <Text style={styles.title}>Guardian</Text>
        <Image
          source={require("../../CovidGuardianClient/images/logo.png")}
          style={{ width: 200, height: 200, marginBottom: 50 }}
        />
        <View>{PhoneOrLocRequest}</View>
      </LinearGradient>
    );
  }
}

LocationScreen.navigationOptions = {
  header: null
};

export default LocationScreen;
