import {
  StyleSheet,
  Text,
  Image,
  Button,
} from "react-native";
import Constants from "expo-constants";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  userSignUp,
} from "Store/actions";
import { LinearGradient } from "expo-linear-gradient";
import { t } from 'Lib/i18n';
import UserPhoneInput from "Components/UserPhoneInput"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#fff",
    marginBottom: 5,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center",
    color: "#000",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
  },
});

// TODO: convert to functional component!
export default function SignupScreen() {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");

  const onSignUp = () => dispatch(userSignUp(phone));

  return (
    <LinearGradient colors={["#94e4f9", "#2d93d8"]} style={styles.container}>
      <Text style={styles.title}>{t("guardian")}</Text>
      <Image
        source={require("../../images/logo.png")}
        style={{ width: 200, height: 200, marginBottom: 50 }}
      />
      <UserPhoneInput onChange={setPhone} phoneNumber={phone} />
      <Button
          title={t("register")}
          onPress={onSignUp}
      />
    </LinearGradient>
  );
};
