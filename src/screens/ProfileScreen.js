import React from "react";
import { StyleSheet, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { setUserPhone } from "Store/actions";

import UserPhoneInput from "Components/user-phone-input";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const { userPhone } = useSelector((state) => state);

  const onSetUserPhone = (phoneNumber) => {
    dispatch(setUserPhone(phoneNumber));
  };

  return (
    <View style={styles.container}>
      <UserPhoneInput onChange={onSetUserPhone} phoneNumber={userPhone} />
    </View>
  );
};

export default ProfileScreen;
