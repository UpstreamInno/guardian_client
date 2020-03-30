import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";

function PhoneOrLocRequest(props) {
  // ***** Sometimes needs to be changed to "not" for testing. Also, this will need to be updated when we move to Redux*****
  if (/*this.state.location*/ false) {
    return (
      <TouchableOpacity /*onPress={this.onPress}*/>
        <Text>Enable background location</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <View>
        <Text style={styles.instructions}>Phone Number</Text>
        <TextInput
          style={{
            width: 250,
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10,
            alignSelf: "center",
            margin: "auto"
          }}
          autoCompleteType="tel"
          type="tel"
          placeholder="+1(555)555-555"
          //Commented for redux refactor
          //onChangeText={text => (this.state.inputText = text)}
        />
        <TouchableOpacity
          //Commented becasue it will break things fornow and will need to be refactored for redux
          // onPress={(this.state.phoneNumber = this.state.inputText)}
          title="Submit"
          accessibilityLabel="Submit phone number"
        >
          <Text /*style={styles.instructions}*/>Sign Up</Text>
        </TouchableOpacity>
        <Text /*style={styles.paragraph}*/>
          {/*text*/} LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM
        </Text>
      </View>
    );
  }
}
export default PhoneOrLocRequest;
