import { AppLoading, Updates } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View, I18nManager as RNI18nManager } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
<<<<<<< HEAD
import AppNavigator from "./src/navigation/AppNavigator";
import { store } from "Store";
import { LinearGradient } from "expo-linear-gradient";
import LocationScreen from "./src/screens/LocationScreen.js";
=======
import GuardianContainer from "Components/GuardianContainer"
import { configureStore } from "Store";

import i18n from 'Lib/i18n';
>>>>>>> 2d85f2a69ef397f3678fae08b08ea2b49e7a1d70

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require("./assets/images/robot-dev.png"),
      require("./assets/images/robot-prod.png")
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
    })
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const store = configureStore();

const App = props => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);
  const { skipLoadingScreen } = props;

  React.useEffect(()=>{
    i18n.init()
        .then(() => {
          const RNDir = RNI18nManager.isRTL ? 'RTL' : 'LTR';

          if (i18n.dir !== RNDir) {
            const isLocaleRTL = i18n.dir === 'RTL';

            RNI18nManager.forceRTL(isLocaleRTL);

            Updates.reloadFromCache();
          }

          setIsI18nInitialized(true);
        })
        .catch((error) => console.warn(error));
  });

  if (!isLoadingComplete && !skipLoadingScreen && !isI18nInitialized) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  }
  return (
<<<<<<< HEAD
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={{ padding: 15, alignItems: "center", borderRadius: 5 }}
    >
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      </Provider>
    </LinearGradient>
=======
    <Provider store={store}>
      <React.Suspense fallback="loading">
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <GuardianContainer />
        </View>
      </React.Suspense>
    </Provider>
>>>>>>> 2d85f2a69ef397f3678fae08b08ea2b49e7a1d70
  );
};

export default App;
