import {
  Button,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { t } from 'Lib/i18n';
import { routeTo } from "Store/actions";
import { Pages } from "Lib/Pages";

import {
  getMostRecentLocations,
  addLocationToDatabase,
} from "Lib/Storage";
import moment from 'moment';
import BackgroundGeolocation from "react-native-background-geolocation";


const LocationScreen = () => {
  const dispatch = useDispatch();

  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    console.log("watch", location); 
  });

  onLocation = async (location) => {
    console.log('[location] -', location);
    var locationObject = [JSON.stringify(location.coords.latitude), JSON.stringify(location.coords.longitude), location.timestamp];
    await addLocationToDatabase(locationObject);
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
  }

  watchLocation = async () => {
    // alert("watchLocation");
    let location = await Location.getCurrentPositionAsync({});
    // alert(JSON.stringify(location));
    setLocation(location);
    this.setState({ location });
    
    let date = moment(location.timestamp).format("YYYY-MM-DD[T]HH:mm:ss[Z]")
    var locationObject = [JSON.stringify(location.coords.latitude), JSON.stringify(location.coords.longitude), date];
    await addLocationToDatabase(locationObject);
    // console.log(locationObject);
   
  };

  const onPress = async () => {
    var taskText = await AsyncStorage.getItem("task");
    alert("Configure background-fetch" + taskText);
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
