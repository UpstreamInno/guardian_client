import {
  Button,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import Constants from "expo-constants";
import * as ExpoLocation from "expo-location";
import * as TaskManager from "expo-task-manager";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { t } from 'Lib/i18n';
import { routeTo } from "Store/actions";
import { Pages } from "Lib/Pages";
import Location from "Lib/models/Location";

import moment from 'moment';
import BackgroundGeolocation, {
  MotionChangeEvent,
  MotionActivityEvent,
  ProviderChangeEvent,
  TransistorAuthorizationToken
} from "react-native-background-geolocation";

import {registerTransistorAuthorizationListener} from '../lib/Authorization';
import DialogInput from 'react-native-dialog-input';

const locationConsoleUrl = "http://tracker.transistorsoft.com";

const LocationScreen = () => {
  const dispatch = useDispatch();

  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [locationSetUp, setlocationSetUp] = useState(false);
  const [showDialog, setDialogState] = useState(false);
  useEffect(() => {
    if(locationSetUp == false){
      async function setUp() {
        let orgname = await AsyncStorage.getItem("orgname");
        let username = await AsyncStorage.getItem("username");
        if(orgname == null || username== null){
          setDialogState(true)
          if(orgname == null) {
            await AsyncStorage.setItem("orgname", "guardian-test"); 
          }
        } else {
          configureBackgroundLocation();
          setlocationSetUp(true);
        }
      };
      setUp();
    }
  });

  configureBackgroundLocation = async() => {
    //   This handler fires whenever bgGeo receives a location updates.
      await registerTransistorAuthorizationListener(null);

      BackgroundGeolocation.onLocation(this.onLocation, this.onError);

      // This handler fires when movement states changes (stationary->moving; moving->stationary)
      BackgroundGeolocation.onMotionChange(this.onMotionChange);

      // This event fires when a change in motion activity is detected
      BackgroundGeolocation.onActivityChange(this.onActivityChange);

      // This event fires when the user toggles location-services authorization
      BackgroundGeolocation.onProviderChange(this.onProviderChange);

      let isSet = await AsyncStorage.getItem('isSet');
      if(isSet == null){
       await BackgroundGeolocation.destroyTransistorAuthorizationToken(locationConsoleUrl);
       await AsyncStorage.setItem('isSet', 'default');
      }
      
      let orgname = await AsyncStorage.getItem("orgname");
      let username = await AsyncStorage.getItem("username");
      let token:TransistorAuthorizationToken = await BackgroundGeolocation.findOrCreateTransistorAuthorizationToken(orgname, username, locationConsoleUrl);
        BackgroundGeolocation.setConfig({
        transistorAuthorizationToken: token
      });
      console.log("token", JSON.stringify(token));
      BackgroundGeolocation.ready({ 
        // Geolocation Config
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: 30,
        // Activity Recognition
        stopTimeout: 1,
        preventSuspend: true,
        heartbeatInterval: 60,
        // Application config
        debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
        logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
        stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
        startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
        // HTTP / SQLite config
        url: locationConsoleUrl + '/api/locations',
        authorization: {
          strategy: "JWT",
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          refreshUrl: locationConsoleUrl + "/v2/refresh_token",
          refreshPayload: {
            refresh_token: "{refreshToken}"
          },    
          expires: token.expires
        },
        autoSync: true,         // <-- [Default: true] Set true to sync each location to se`rver as it arrives.
        batchSync: true
      }, (state) => {
        console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

      if (!state.enabled) {
          BackgroundGeolocation.start(function() {
            console.log("- Start success");
          });
        }
      });
  }
  onLocation = async (location) => {
    console.log('[location] -', location);
    setLocation(location);
    await Location.insert([location.coords.latitude, location.coords.longitude, location.timestamp]);
    return
  }

  onError  = async (error) => {
    console.warn('[location] ERROR -', error);
  }
  onActivityChange  = async (event) => {
    console.log('[activitychange] -', event);  // eg: 'on_foot', 'still', 'in_vehicle'
  }
  onProviderChange = async (provider) => {
    console.log('[providerchange] -', provider.enabled, provider.status);
  }
  onMotionChange  = async (event) => {
    console.log('[motionchange] -', event.isMoving, event.location);
    await Location.insert([location.coords.latitude, location.coords.longitude, location.timestamp]);
  }

  const saveUsername = async(inputText) => {
    console.log('inputText', inputText);
    await AsyncStorage.setItem('username', inputText);
    setDialogState(false);
    configureBackgroundLocation();
  }

  const onPress = async () => {
    var locationsInDb = (await Location.read({limit: 10})).history; //get most recent 10 locations
    console.log("most recent - locations updates", locationsInDb);
    alert(locationsInDb);
  };

  const onContinue = () => {
    dispatch(routeTo(Pages.SIGNUP_COMPLETE));
  }

  const locationStatus = () => {
    if (errorMessage) {
      return <Text>{errorMessage}</Text>
    }

    if (!location) {
      return <Text>{t("waiting")}</Text>
    }

    if (__DEV__) {
      return (
        <>
          <Text>{JSON.stringify(location, null, 2)}</Text>
          <Button style={styles.button} title="Continue" onPress={onContinue} />
        </>
      );
    } else {
      onContinue();
      return <></>;
    }
  }

  return (
    <LinearGradient colors={["#94e4f9", "#2d93d8"]} style={styles.container}>
      <Text style={styles.title}>Guardian</Text>
      <Image
        source={require("../../images/logo.png")}
        style={{ width: 200, height: 200, marginBottom: 50 }}
      />
      {locationStatus()}
      <DialogInput isDialogVisible={showDialog}
            title={"Type your username"}
            message={"Username require for location testing"}
            hintInput ={"justinbieber"}
            submitInput={ (inputText) => saveUsername(inputText) }
            closeDialog={ () => console.log("close dialog")}>
      </DialogInput>
      <TouchableOpacity onPress={onPress}>
        <Text>{t('enable_background_location')}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
  },
  welcome: {
    fontSize: 20,   
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#fff",
    marginBottom: 5,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center",
    color: "#000",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
  },
});

export default LocationScreen;
