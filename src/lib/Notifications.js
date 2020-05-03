import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import {t} from 'Lib/i18n';
import {Platform} from "react-native";

const status = {
  RECEIVED: 'received',
  CLICKED: 'selected'
};

const registerForPush = async () => {
  // if (Constants.isDevice) {
    const {status: existingStatus} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert(t('permission_alert'));
      return;
    }
  // } else {
  //   alert('Must use physical device for Push Notifications');
  // }

  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('GuardianChannelId', {
      name: 'GuardianChannel',
      sound: true,
      priority: 'max',
      vibrate: [0, 250, 250, 250]
    });
  }

  Notifications.addListener(handleNotification);
};

const handleNotification = (notification) => {
  if (notification.origin === status.RECEIVED) {
    console.log("Notification received - server or local")
  } else if (notification.origin === status.CLICKED) {
    console.log("Notification clicked")
  }
};

const sendLocalPush = (title, body) => {
  const localNotification = {
    title: title,
    body: body,
    android: {
      channelId: "GuardianChannelId"
    },
    ios: {
      sound: true,
      _displayInForeground: true
    }
  };
  Notifications.presentLocalNotificationAsync(localNotification)
};

export {
  sendLocalPush,
  registerForPush
}
