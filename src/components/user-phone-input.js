import React from "react";
import { Text, TextInput } from "react-native";

const UserPhoneInput = ({ onChange, phoneNumber }) => {
  return (
    <>
      <Text>User Phone:</Text>
      <TextInput
        style={{
          width: 200,
          height: 35,
          borderColor: "#696969",
          borderWidth: 1,
          margin: 5
        }}
        onChangeText={onChange}
        value={phoneNumber}
      />
      <Text>User phone from store:</Text>
      <Text>{phoneNumber}</Text>
    </>
  );
};
export default UserPhoneInput;
