import {
  AsyncStorage
} from "react-native";
import BackgroundGeolocation, {
  MotionChangeEvent,
  MotionActivityEvent,
  ProviderChangeEvent,
  TransistorAuthorizationToken
} from "react-native-background-geolocation";
import {registerTransistorAuthorizationListener} from '../lib/Authorization';
import Location from "Lib/models/Location";

const locationConsoleUrl = "http://tracker.transistorsoft.com";

const configureBackgroundLocation = async() => {
  // alert("configureBackgroundLocation");
  // This handler fires whenever bgGeo receives a location updates.
  // await registerTransistorAuthorizationListener(null); for debug

  BackgroundGeolocation.onLocation(onLocation, onError);

  // This handler fires when movement states changes (stationary->moving; moving->stationary)
  BackgroundGeolocation.onMotionChange(onMotionChange);

  // This event fires when a change in motion activity is detected
  BackgroundGeolocation.onActivityChange(onActivityChange);

  // event fires when the user toggles location-services authorization
  BackgroundGeolocation.onProviderChange(onProviderChange);

  // let isSet = await AsyncStorage.getItem('isSet'); //for debug
  // if(isSet == null){
  //  await BackgroundGeolocation.destroyTransistorAuthorizationToken(locationConsoleUrl);
  //  await AsyncStorage.setItem('isSet', 'default');
  // }

  //for debug
  // let orgname = await AsyncStorage.getItem("orgname");
  // let username = await AsyncStorage.getItem("username");
  // let token:TransistorAuthorizationToken = await BackgroundGeolocation.findOrCreateTransistorAuthorizationToken(orgname, username, locationConsoleUrl);
  //   BackgroundGeolocation.setConfig({
  //   transistorAuthorizationToken: token
  // });
  // console.log("token", JSON.stringify(token));

  BackgroundGeolocation.ready({ 
    // Geolocation Config
    desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
    distanceFilter: 30,
    // Activity Recognition
    stopTimeout: 1,
    preventSuspend: true,
    heartbeatInterval: 60,
    // Application config
    debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
    logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
    stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
    startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
    // HTTP / SQLite config
    url: locationConsoleUrl + '/api/locations',
    // authorization: {//debug
    //   strategy: "JWT",
    //   accessToken: token.accessToken,
    //   refreshToken: token.refreshToken,
    //   refreshUrl: locationConsoleUrl + "/v2/refresh_token",
    //   refreshPayload: {
    //     refresh_token: "{refreshToken}"
    //   },    
    //   expires: token.expires
    // },
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

const onLocation = async (location) => {
  console.log('[location] -', location);
  await Location.insert([location.coords.latitude, location.coords.longitude, location.timestamp]);
}

const onError  = async (error) => {
  console.warn('[location] ERROR -', error);
}

const onActivityChange  = async (event) => {
  console.log('[activitychange] -', event);  // eg: 'on_foot', 'still', 'in_vehicle'
}

const onProviderChange = async (provider) => {
  console.log('[providerchange] -', provider.enabled, provider.status);
}

const onMotionChange  = async (event) => {
  console.log('[motionchange] -', event.isMoving, event.location);
  await Location.insert([location.coords.latitude, location.coords.longitude, location.timestamp]);
}

export {
  configureBackgroundLocation,
}
