import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import Constants from "expo-constants";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
  },
  link: {
    textAlign: "center",
    fontSize: 12,
  },
  linkContainer: {
    marginTop: 5,
  },
  paragraph: {
    fontSize: 13,
    textAlign: "center",
    color: "#4bade3",
    textAlign: "center",
  },
  header3: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    marginBottom: 30,
    color: "#ffffff",
  },
  header4: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "#4bade3",
  },
  textBlock: {
    width: 300,
    padding: 10,
    borderRadius: 5,
    margin: 10,
    backgroundColor: "#fff",
  },
  continueButton: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "bold",
  },
});

function ConfirmationScreen() {
  return (
    <LinearGradient colors={["#94e4f9", "#2d93d8"]} style={styles.container}>
      <Ionicons name="md-checkmark-circle" size={100} color="white" />
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
          style={styles.linkContainer}
        >
          <Text style={styles.link}>Learn More</Text>
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
          style={styles.linkContainer}
        >
          <Text style={styles.link}>Learn More</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            alert("I should go somewhere");
          }}
        >
          <Text style={styles.continueButton}>
            {"Continue "}
            <Ionicons
              name="ios-arrow-dropright-circle"
              size={25}
              color="white"
            />
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

export default ConfirmationScreen;
