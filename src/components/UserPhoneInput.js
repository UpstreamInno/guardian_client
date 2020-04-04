import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: "start"
  },
  text: {
    color: "#FFF",
    textAlign: "left",
    fontSize: '20px',
    marginLeft: "10px"
  },
  phoneInput: {
    height: '40px',
    fontSize: '30px',
    borderColor: 'gray',
    borderWidth: '2px',
    backgroundColor: "#FFFFFF",
    borderRadius: '10px',
    margin: '3px'
  },
});

export const UserPhoneInput = ({ onChange, phoneNumber, style }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Phone Number</Text>
      <TextInput
        style={styles.phoneInput}
        onChangeText={onChange}
        value={phoneNumber}
        />
    </View>
  );
};
