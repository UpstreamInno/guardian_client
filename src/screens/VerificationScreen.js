import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import Constants from "expo-constants";
import { useDispatch, useSelector } from "react-redux";
import { setUserPhone } from "Store/actions";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { CodeInput } from "Components/CodeInput"

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    color: "#ffffff"
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    margin: 10,
    color: "#ffffff"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  },
  signUpButton: {
    color: "#FFFFFF",
    fontSize: "20px",
    textAlign: "center",
  },
  centerLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendButton: {
    color: "#FFFFFF",
    fontSize: "18px",
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: "50px",
    width: "50px",
    height: "50px",
    paddingTop: "2px",
    marginBottom: "10px",
    textAlign: "center",
  }
});

const VerificationScreen = () => {
  const dispatch = useDispatch();

  const [verificationCode, setVerificationCode] = React.useState("");

  const onChange = (value) => {
    console.log("in");
    setVerificationCode(value);
  }

  const onSubmit = () => {
    /* dispatch({}); */
  };

  const onResend = () => {
    /* dispatch({}); */
  };

  return (
    <LinearGradient colors={["#94e4f9", "#2d93d8"]} style={styles.container}>
      <View styles={styles.centerLogo}>
        <Text style={styles.title}>Verification Code</Text>
        <Text style={styles.subtitle}>Enter the OTP code sent to your phone</Text>
      </View>
      <CodeInput
        style={styles.phoneInput}
        onChange={onChange}
        codeValue={verificationCode}
      />
      <TouchableOpacity onPress={onSubmit}>
        <Entypo
          style={styles.submitButton}
          name="chevron-right"
          size={"40px"}
          color={"blue"}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onResend}>
        <Text style={styles.resendButton}>Resend Code</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default VerificationScreen;
