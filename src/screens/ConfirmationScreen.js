import { Platform, StyleSheet, Text, View, Image } from "react-native";
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

function ConfirmationScreen() {
  return (
    <LinearGradient colors={["#94e4f9", "#2d93d8"]} style={styles.container}>
      <Text style={styles.title}>Guardian</Text>
      <Image
        source={require("../../CovidGuardianClient/images/logo.png")}
        style={{ width: 200, height: 200, marginBottom: 50 }}
      />
      <Text>HELLO WORLD</Text>
    </LinearGradient>
  );
}

export default ConfirmationScreen;
