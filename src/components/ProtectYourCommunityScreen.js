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
    color: "#000",
  },
  header4: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "#4bade3",
  },
  textBlock: {
    width: 350,
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
    // flex: 1,
    flexDirection: "column",
    alignContent: "space-between",
  },
});

function ProtectYourCommunityScreen() {
  return (
    <LinearGradient colors={["#94e4f9", "#2d93d8"]} style={styles.container}>
      {/* <Ionicons name="md-checkmark-circle" size={100} color="white" /> */}
      <Text style={styles.header1}>Protect Your Community</Text>
      <Text style={styles.paragraph}>
        The WHO recommends that at-risk patients be isolated, either in the
        hospital or at home, until they are better and no longer pose a risk of
        infecting others.
      </Text>
      <View style={styles.textBlock}>
        <Text style={styles.linkLabel}>
          <FontAwesome5
            name="notes-medical"
            size={30}
            color="black"
            style={{ marginRight: 10 }}
          />
          {"  "}
          What to do if You are Sick
        </Text>
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.linkLabel}>
          <Ionicons
            name="md-person"
            size={35}
            color="black"
            style={{ marginRight: 10 }}
          />
          {"  "}Caring for Yourself at Home
        </Text>
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.linkLabel}>
          <Ionicons
            name="ios-home"
            size={30}
            color="black"
            style={styles.icons}
          />
          {"  "}Disinfecting Your Home if Someone is Sick
        </Text>
      </View>
      {/* <View
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
      </View> */}
    </LinearGradient>
  );
}

export default ProtectYourCommunityScreen;
