import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import TabBarIcon from "Components/TabBarIcon";
import {
    HomeScreen,
    LocationScreen,
    ReportScreen,
} from "Screens";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {},
});

// home stack
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config,
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home☀️",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  ),
};

HomeStack.path = "";

// report stack
const ReportStack = createStackNavigator(
  {
    Links: ReportScreen,
  },
  config,
);

ReportStack.navigationOptions = {
  tabBarLabel: "Report",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  ),
};

ReportStack.path = "";

// location stack
const LocationStack = createStackNavigator(
  {
    Links: LocationScreen,
  },
  config,
);

LocationStack.navigationOptions = {
  tabBarLabel: "Location",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  ),
};

LocationStack.path = "";


const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LocationStack,
  ReportStack,
});

tabNavigator.path = "";

export default tabNavigator;
