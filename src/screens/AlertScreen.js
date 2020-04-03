import React from "react";
import {
  View
} from "react-native";

import AlertMessage from "Components/AlertMessage";

const AlertScreen = () => {
  const input = "hello"
  return(

      <AlertMessage message = {input} />

  );
};

AlertScreen.navigationOptions = {
  header: null,
};

export default AlertScreen;
