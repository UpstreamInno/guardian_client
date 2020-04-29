import {
 // AppLoading, temporary remove apploading -> not working on expo sdk
 Updates } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View, AsyncStorage, I18nManager as RNI18nManager } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import GuardianContainer from "Components/GuardianContainer"
import { configureStore } from "Store";

import i18n from 'Lib/i18n';
import BackgroundFetch from "react-native-background-fetch";

export const scheduleTask = async (name) => {
  try {
    await BackgroundFetch.scheduleTask({
      taskId: name,
      stopOnTerminate: false,
      startOnBoot: true,
      enableHeadless: true,
      delay: 10 * 60 * 1000,               // milliseconds (5min)
      forceAlarmManager: true,
      forceReload:true,   // more precise timing with AlarmManager vs default JobScheduler
      periodic: true            // Fire once only.
    });
  } catch (e) {
    console.warn('[BackgroundFetch] scheduleTask fail', e);
  }
}

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
  const [enabled, setEnabled] = useState(false);
  const { skipLoadingScreen } = props;
/// Switch handler in top-toolbar.
  ///
  const onToggleEnabled = async (value) => {
    try {
      if (value) {
        await BackgroundFetch.start();
      } else {
        await BackgroundFetch.stop();
      }
      setEnabled(value);
    } catch (e) {
      console.warn(`[BackgroundFetch] ${value ? 'start' : 'stop'} falied`, e);
    }
  };

  /// BackgroundFetch event-handler.
  /// All events from the plugin arrive here, including #scheduleTask events.
  ///
  const onBackgroundFetchEvent = async (taskId) => {
    console.log('[BackgroundFetch] Event received: ', taskId);

    var taskText = await AsyncStorage.getItem("task");
    taskText = taskText + "\n----------" +JSON.stringify(new Date());
    var ss = await AsyncStorage.setItem("task", taskText);

    if (taskId === 'react-native-background-fetch') {
      // Test initiating a #scheduleTask when the periodic fetch event is received.
      try {
        await scheduleTask('com.transistorsoft.customtask');
      } catch (e) {
        console.warn('[BackgroundFetch] scheduleTask falied', e);
      }
    }
    // Required: Signal completion of your task to native code
    // If you fail to do this, the OS can terminate your app
    // or assign battery-blame for consuming too much background-time
    BackgroundFetch.finish(taskId);
  };

  /// Configure BackgroundFetch
  ///
  const init = async () => {
    BackgroundFetch.configure({
      minimumFetchInterval: 15,      // <-- minutes (15 is minimum allowed)
      // Android options
      forceAlarmManager: false,      // <-- Set true to bypass JobScheduler.
      stopOnTerminate: false,
      enableHeadless: true,
      startOnBoot: true,
      forceReload:true,
      requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
      requiresCharging: false,       // Default
      requiresDeviceIdle: false,     // Default
      requiresBatteryNotLow: false,  // Default
      requiresStorageNotLow: false,  // Default
    }, onBackgroundFetchEvent, async (status) => {
      // setDefaultStatus(statusToString(status))
    });
    // Turn on the enabled switch.
    onToggleEnabled(true);
    // Load the list with persisted events.
    // const events = await loadEvents<Event[]>();
    // events && setEvents(events);
  };
  React.useEffect(()=>{
    init();
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

  // if (!isLoadingComplete && !skipLoadingScreen && !isI18nInitialized) {  // AppLoading, temporary remove apploading -> not working on expo sdk

  //   return (
  //     <AppLoading
  //       startAsync={loadResourcesAsync}
  //       onError={handleLoadingError}
  //       onFinish={() => handleFinishLoading(setLoadingComplete)}
  //     />
  //   );
  // }
  return (
    <Provider store={store}>
      <React.Suspense fallback="loading">
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <GuardianContainer />
        </View>
      </React.Suspense>
    </Provider>
  );
};

export default App;
