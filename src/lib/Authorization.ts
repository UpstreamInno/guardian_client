import {AsyncStorage} from 'react-native';

import BackgroundGeolocation, {
  TransistorAuthorizationToken,
  HttpEvent
} from "react-native-background-geolocation";

// import Util from "../lib/Util";s

let onHttp:any = null;

/**
* If the app registers for a TransistorAuthorizationToken while disconnected from network, the app configures an accessToken: "DUMMY_TOKEN".
* When the server receives a DUMMY_TOKEN, it will return an HTTP status "406 Unacceptable".  This is the signal to re-register for a token.
*/
async function register(navigation:any):Promise<TransistorAuthorizationToken> {
  console.log('[TransistorAuth] this device requires reqistration');
  await BackgroundGeolocation.destroyTransistorAuthorizationToken("http://tracker.transistorsoft.com");

  let orgname = await AsyncStorage.getItem("orgname");
  let username = await AsyncStorage.getItem("username");``
  if (orgname == null || username == null) {
    // Util.navigateHome(navigation);
    // return {
    //   accessToken: "DUMMY_TOKEN",
    //   refreshToken: "DUMMY_TOKEN",s
    //   expires: -1,
    //   url: ''
    // };s
  }

  let token:TransistorAuthorizationToken = await BackgroundGeolocation.findOrCreateTransistorAuthorizationToken(orgname, username, "http://tracker.transistorsoft.com");

  await BackgroundGeolocation.setConfig({
    transistorAuthorizationToken: token
  });
  return token;
}

/**
* If a Device is destroyed from tracker.transistorsoft.com, the TransistorAuthorizationsToken is invalid.
* Force the user to the Home Screen, destroy the token from client and force the user to re-register.
* We also destroy their username from AsyncStorage to force the registration popup to appear.
*
* This method sets up a BackgroundGeolocation.onHttp listener.  tracker.transistorsoft.com returns HTTP status "410 Gone"
* when a device is destroyed.
*/
async function goHome(navigation:any) {
  // Our authorization token doesn't seem to be valid anymore.  Re-register this device by removing username
  // and forcing user to the HomeScreen.
  console.log('[TransistorAuth] It seems this device has been destroyed from tracker.transistorsoft.com.  The authentication token is no longer valid.  Redirecting to Home page.');
  await AsyncStorage.removeItem('username');
  // Util.navigateHome(navigation);
}

/**
* Global BackgroundGeolocation onHttp listener for handling edge-cases related to TransistorAuthorizationToken.
*/
export async function registerTransistorAuthorizationListener(navigation:any) {
  console.log('[Authorization registerTransistorAuthorizationHandler]');
  // If we already have a listener, remove it.
  if (typeof(onHttp) === 'function') {
	  await BackgroundGeolocation.removeListener('http', onHttp);
  }

  setTimeout(() => {
    // The BackgroundGeolocation onHttp listener.
    onHttp = async (event:HttpEvent) => {
      console.log("HttpEvent", event);
      switch(event.status) {
        case 403:
          console.log("403");
        case 406:
          console.log("406")
          await BackgroundGeolocation.destroyTransistorAuthorizationToken("http://tracker.transistorsoft.com");
          let token = await register(navigation);
          if (token.accessToken != 'DUMMY_TOKEN') {
            BackgroundGeolocation.sync();
          }
          break;
        case 410:
          console.log('410')
          goHome(navigation);
          break;
      }

    }

	  BackgroundGeolocation.onHttp(onHttp);
  }, 500);
}
