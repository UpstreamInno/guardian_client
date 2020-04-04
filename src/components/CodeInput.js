import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: "start",
    flexDirection: "row",
    marginTop: "20px",
    marginBottom: "20px",
  },
  text: {
    color: "#FFF",
    textAlign: "left"
  },
  codeDigit: {
    height: '40px',
    width: '40px',
    fontSize: '30px',
    borderColor: '#FFFFFF',
    borderWidth: '2px',
    backgroundColor: "#FFFFFF",
    marginLeft: "10px",
    marginRight: "10px",
    borderRadius: "10px",
    textAlign: "center"
  },
  hiddenInput: {
    opacity: "0.0"
  }

});

export const CodeInput = ({ onChange, codeValue, style }) => {
  let code = ["", "", "", ""];
  if (codeValue) {
    codeValue.split("").map((c, i) => {
      code[i] = c;
    })
  }

  let hiddenTextInput;

  const onFocus = () => {
    hiddenTextInput.focus();
  }

  return (
    <View>
      <TouchableOpacity
        onPress={onFocus}
        activeOpacity={1.0}
      >
        <View style={styles.container}>
          <TextInput
            style={styles.codeDigit}
            onFocus={ () => onFocus() }
            value={code[0] || ""}
          />
          <TextInput
            style={styles.codeDigit}
            onFocus={ () => onFocus() }
            value={code[1] || ""}
          />
          <TextInput
            style={styles.codeDigit}
            onFocus={ () => onFocus() }
            value={code[2] || ""}
          />
          <TextInput
            style={styles.codeDigit}
            onFocus={ () => onFocus() }
            value={code[3] || ""}
          />
        </View>
      </TouchableOpacity>
      <TextInput
        ref={(input) => { hiddenTextInput = input; }}
        style={styles.hiddenInput}
        onChangeText={onChange}
        value={code.join("")}
        keyboardType={"phone-pad"}
      />
    </View>
  );
};
