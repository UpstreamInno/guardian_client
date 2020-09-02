import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

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
    fontSize: 18,
    textAlign: "center",
    color: "#000",
    textAlign: "center",
    margin: 50,
    marginTop: 0,
  },
  header1: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    margin: 40,
    marginTop: 10,
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
  linkLabel: {
    color: "#000",
    fontSize: 18,
    textAlign: "center",
  },
  icons: {
    alignSelf: "center",
  },
});

function ProtectYourCommunityScreen() {
  return (
    <LinearGradient colors={["#f4c166", "#f5ab78"]} style={styles.container}>
      <Text style={styles.header1}>Protect Your Community</Text>
      <Text style={styles.paragraph}>
        The WHO recommends that at-risk patients be isolated, either in the
        hospital or at home, until they are better and no longer pose a risk of
        infecting others.
      </Text>
      <TouchableOpacity
        onPress={() => {
          alert("I have no function");
        }}
        style={styles.textBlock}
      >
        <FontAwesome5
          name="notes-medical"
          size={35}
          color="black"
          style={styles.icons}
        />
        <Text style={styles.linkLabel}>What to do if You are Sick</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          alert("I have no function");
        }}
        style={styles.textBlock}
      >
        <Ionicons
          name="md-person"
          size={40}
          color="black"
          style={styles.icons}
        />
        <Text style={styles.linkLabel}>Caring for Yourself at Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          alert("I have no function");
        }}
        style={styles.textBlock}
      >
        <Ionicons
          name="ios-home"
          size={40}
          color="black"
          style={styles.icons}
        />
        <Text style={styles.linkLabel}>
          Disinfecting Your Home if Someone is Sick
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

export default ProtectYourCommunityScreen;
