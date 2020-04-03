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

export default AlertScreen;
