import React from "react";
import { Text } from "react-native";
import * as Location from "expo-location";
import UserPhoneInput from "./user-phone-input.js";

export default function PhoneOrLocRequest() {
  if (Location) {
    return (
      <TouchableOpacity onPress={this.onPress}>
        <Text>Enable background location</Text>
      </TouchableOpacity>
    );
  } else {
    return <UserPhoneInput />;
  }
}
