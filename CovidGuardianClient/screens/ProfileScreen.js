import React from "react";
import {
  StyleSheet,
  View
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import actions from "Store/actions";

import { UserPhoneInput } from "Components/user-phone-input"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const userPhone = useSelector(state => state.userReducer.user.phone);

  const setUserPhone = phone => dispatch(actions.SET_PHONE_NUMBER(phone));

  return (
    <View style={styles.container}>
      <UserPhoneInput
        onChange={setUserPhone}
        phone={userPhone}
      />
    </View>
  );
};

export default ProfileScreen;
