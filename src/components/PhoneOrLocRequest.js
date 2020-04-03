import React from "react";
import { Text } from "react-native";
import * as Location from "expo-location";
import UserPhoneInput from "./user-phone-input.js";

function PhoneOrLocRequest() {
  if (Location) {
    return <UserPhoneInput />;
  } else {
    return (
      <TouchableOpacity onPress={this.onPress}>
        <Text>Enable background location</Text>
      </TouchableOpacity>
    );
  }
}
export default PhoneOrLocRequest;
