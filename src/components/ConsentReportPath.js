import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { t } from "Lib/i18n";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

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
    margin: 20,
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

function ConsentReportPath() {
  return (
    <LinearGradient colors={["#f4c166", "#f5ab78"]} style={styles.container}>
      <Text style={styles.header1}>{t("Anonymously Report Symptoms?")}</Text>
      <Text style={styles.paragraph}>
        {t(
          "We will warn community members you crossed paths with of possible exposure.\nYour symptoms, location data, and personal information will not be shared with other users."
        )}
      </Text>
      <TouchableOpacity
        onPress={() => {
          alert("I have no function");
        }}
        style={styles.textBlock}
      >
        <Ionicons
          name="ios-people"
          size={35}
          color="black"
          style={styles.icons}
        />
        <Text style={styles.linkLabel}>{t("Protect Your Community")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          alert("I have no function");
        }}
        style={styles.textBlock}
      >
        <MaterialIcons
          name="not-interested"
          size={40}
          color="black"
          style={styles.icons}
        />
        <Text style={styles.linkLabel}>{t("Do not alert others")}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

export default ConsentReportPath;
