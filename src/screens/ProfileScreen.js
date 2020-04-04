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

import { LinearGradient } from "expo-linear-gradient";
import { UserPhoneInput } from "Components/UserPhoneInput"

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    fontWeight: "bold",
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
  }
});

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const { userPhone } = useSelector(state => state);

  const onSetUserPhone = phoneNumber => {
    dispatch(setUserPhone(phoneNumber));
  };

  const onSubmit = () => {
    /* dispatch({}); */
  };

  return (
    <LinearGradient colors={["#94e4f9", "#2d93d8"]} style={styles.container}>
      <View styles={styles.centerLogo}>
        <Text style={styles.title}>Guardian</Text>
        <Image
          source={require("../../media/logo.png")}
          style={{ width: 200, height: 200, marginBottom: 50 }}
        />
      </View>
      <UserPhoneInput
        style={styles.phoneInput}
        onChange={onSetUserPhone}
        phoneNumber={userPhone}
      />
      <TouchableOpacity onPress={onSubmit}>
        <Text style={styles.signUpButton}>Sign Up</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default ProfileScreen;
