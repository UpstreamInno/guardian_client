import React from "react";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

const TabBarIcon = props => {
  const { name, focused } = props;

  return (
    <Ionicons
      name={name}
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
};

export default TabBarIcon;
