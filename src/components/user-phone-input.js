import React from "react";
import {
  Text,
  TextInput
} from 'react-native';


export const UserPhoneInput = ({ onChange, phoneNumber }) => {

  return (
    <>
      <Text>User Phone:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={onChange}
        value={phoneNumber}
      />
      <Text>User phone from store:</Text>
      <Text>{phoneNumber}</Text>
    </>
  );
};
