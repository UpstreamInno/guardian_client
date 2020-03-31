import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";

// our recipe: https://reactnavigation.org/docs/en/app-containers.html

const Navigator = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
});

const AppContainer = createAppContainer(Navigator);

export default AppContainer;
