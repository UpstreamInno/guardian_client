import {
  Button,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
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

const TASK_GUARDIAN_LOCATION = "guardian_location";

TaskManager.defineTask(TASK_GUARDIAN_LOCATION, async({ data, error }) => {
  console.log("enter TASK_GUARDIAN_LOCATION", data);
  if (error) {
    alert(error);
    return;
  }
  if (data) {
    const { locations } = data;
    if(locations.length > 0){
      for(var i = 0; i < locations.length; i++){
        var location = locations[i];
        let date = moment(location.timestamp).format("YYYY-MM-DD[T]HH:mm:ss[Z]")
        var locationObject = [JSON.stringify(location.coords.latitude), JSON.stringify(location.coords.longitude), date];
        await addLocationToDatabase(locationObject); // add location to db
      }
      var locationsInDb = await getMostRecentLocations(100); //get most recent 10 locations
      // console.log("most recent - locations updates", JSON.stringify(locationsInDb));
    }
  }
});

const LocationScreen = () => {
  const dispatch = useDispatch();

  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log("watch", location);
    if(location == null){
         watchLocation(); 
    }
 
  });

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
    // var locations = await getMostRecentLocations(10); //get most recent 10 locations
    // console.log("most recent", JSON.stringify(locations));
  };

  const onPress = async () => {
    const { status, ios } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMessage("Permission to access location was denied");
    }
    if (status === "granted") {
      await Location.startLocationUpdatesAsync(TASK_GUARDIAN_LOCATION, {
        accuracy: 4,
        showsBackgroundLocationIndicator: true,
        //timeInterval: 0,
        distanceInterval: "20", // meters
        deferredUpdatesInterval: "200", //ms
        deferredUpdatesDistance: "20", //meters
        pausesUpdatesAutomatically: true,
      });
    } 
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
