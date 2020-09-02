import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button
} from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
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
    fontSize: 13,
    textAlign: "center",
    color: "#4bade3",
    textAlign: "center"
  },
  header3: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    marginBottom: 30,
    color: "#ffffff"
  },
  header4: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "#4bade3"
  },
  textBlock: {
    width: 300,
    padding: 10,
    borderRadius: 5,
    margin: 10,
    backgroundColor: "#fff"
  }
});

function ConfirmationScreen() {
  return (
    <LinearGradient colors={["#94e4f9", "#2d93d8"]} style={styles.container}>
      <Image
        source={require("../../CovidGuardianClient/images/simple-check.png")}
        style={{ width: 200, height: 200, marginBottom: 30 }}
      />
      <Text style={styles.header3}>Successful Sign Up!</Text>
      <View style={styles.textBlock}>
        <Text style={styles.header4}>You are in Control</Text>
        <Text style={styles.paragraph}>
          Your security and privacy are our main concerns!
        </Text>
        <TouchableOpacity
          onPress={() => {
            alert("I have no function");
          }}
          style={{ marginTop: 5 }}
        >
          <Text style={{ textAlign: "center", fontSize: 12 }}>Learn More</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.header4}>Keep your Community Safe</Text>
        <Text style={styles.paragraph}>
          Take an active role in keeping those around you informed!
        </Text>
        <TouchableOpacity
          onPress={() => {
            alert("I have no function");
          }}
          style={{ marginTop: 5 }}
        >
          <Text style={{ textAlign: "center", fontSize: 12 }}>Learn More</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 15
        }}
      >
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              color: "#fff",
              fontWeight: "bold",
              textDecorationLine: "underline"
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

export default ConfirmationScreen;
