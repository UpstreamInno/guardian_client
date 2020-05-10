import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import {t} from 'Lib/i18n';
import {Platform, PushNotificationIOS} from "react-native";
import PushNotification from 'react-native-push-notification';
import {doPermissionCheck} from "./PermissionsHelper";
import { routeTo } from "Store/actions";
import { Pages } from "Lib/Pages";

const status = {
  RECEIVED: 'received',
  CLICKED: 'selected'
};

const registerForPush = async () => {
  if (Constants.isDevice) {
    if(!doPermissionCheck(Permissions.NOTIFICATIONS, "We need your permission to alert you in case you have been exposed!\nPlease go to settings and grant the permission")) {
      return;
    }
  } else {
    alert('Must use physical device for Push Notifications');
    return;
  }

  PushNotification.configure({
    requestPermissions: Platform.OS === 'ios',
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
      //TODO: dispatch to home, cannot do from here because we're not in a component. move to headless background task when that is finished
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    }});

};

const sendLocalPush = (title, body) => {
  PushNotification.localNotification({
    /* Android Only Properties */
    ticker: "My Notification Ticker", // (optional)
    autoCancel: true, // (optional) default: true
    largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
    smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
    color: "red", // (optional) default: system default
    vibrate: true, // (optional) default: true
    vibration: 500, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    ongoing: false, // (optional) set whether this is an "ongoing" notification
    priority: "high", // (optional) set notification priority, default: high
    visibility: "private", // (optional) set notification visibility, default: private
    importance: "high", // (optional) set notification importance, default: high
    allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
    ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)

    /* iOS only properties */
    alertAction: "view", // (optional) default: view
    category: "", // (optional) default: empty string
    userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)

    /* iOS and Android properties */
    title: title, // (optional)
    message: body, // (required)
    soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    number: 1 // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
  });
};

export {
  sendLocalPush,
  registerForPush
}
