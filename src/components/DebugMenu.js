import React, { useState, useEffect } from "react";

import {
  Button,
  Picker, 
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

import { t } from 'Lib/i18n';
import {
  setUserLastRegionPathSentTime,
  reportPrecisePath,
  fetchMessages,
  userSignUp,
  userSignUpVerify,
  resetStore,
  routeTo,
} from "Store/actions";
import {
  getPath,
  sendRegionPath,
} from "Lib/Api";
import Storage from "Lib/Storage";
import Location from "Lib/models/Location";

import { useDispatch, useSelector } from "react-redux";
import {registerForPush} from 'Lib/Notifications';

import { Pages } from "Lib/Pages";

const DebugMenu = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  //todo move to background task that polls the server for messages
  useEffect(() => {
    registerForPush();
  }, []);

  // input states, used only for this page to simulate UI input
  const [inputPhone, setInputPhone] = useState('1123456789');

  // input states, used only for this page to simulate UI input
  const [deviceStore, setdeviceStore] = useState({});

  // TODO: this should be computed from precise path!
  const [inputRegionPath, setInputRegionPath] = useState(JSON.stringify([
    ["47.60", "-122.33", "2020-04-02T00:18:31Z"],
    ["47.60", "-122.33", "2020-04-02T00:23:31Z"],
  ], null, 2));
  const [inputPrecisePath, setinputPrecisePath] = useState(JSON.stringify([
    ["47.609755", "-122.337793", "2020-04-02T00:18:31Z"],
    ["47.609750", "-122.339900", "2020-04-02T00:23:31Z"],
  ], null, 2));

  const onSignUp = () => {
    dispatch(userSignUp(inputPhone, false));
  }

  const onSignIn = () => {
    dispatch(userSignUpVerify(state.registrationCode, false));
  }

  const onSendRegionPath = () => {
    // sendRegionPath expects data in this form:
    //  [
    //    ["47.609755", "-122.337793", "2020-04-02T00:18:31Z"],
    //    ["47.609750", "-122.339900", "2020-04-02T00:23:31Z"],
    //  ];
    //
    // however to enable user input on the debug page, we stringify the json.
    const pathData = JSON.parse(inputRegionPath);

    sendRegionPath({path: pathData, accessToken: state.accessToken}).then((data) =>{
      // dont need to do anything with the response for now
      console.log("sendRegionPath response, ignoring...", data)

      // store the last sent path time
      if (data.errors.length === 0) {
        dispatch(setUserLastRegionPathSentTime({ time: Date.now() }));
      }
    })
  }

  const onReportPath = () => {
    dispatch(reportPrecisePath(JSON.parse(inputPrecisePath)));
  }

  const onGetPath = () => {
    getPath({accessToken: state.accessToken}).then((data) =>{
      console.log("got path data", data);
    })
  }

  const onRouteTo = (page) => {
    console.log("navigate to ", page);
    dispatch(routeTo(page));
  }

  const onGetMessages = () => {
    dispatch(fetchMessages());
  }

  const printStore = () => {
    Storage.readAll().then((result) => setdeviceStore((result)));
  }

  const wipeStore = () => {
    Storage.wipeAll().then((result) => printStore());
  }

  const addLocationToStore = () => {
    const sampleLocation = ["47.609755", "-122.337793", "2020-05-01T00:18:31Z"]
    Location.insert(sampleLocation).then((result) => printStore());
  }

  const inputs = () => {
    return (
      <>
        <Text style={styles.header}>User/Device Inputs</Text>

        <View style={styles.row}>
          <View style={styles.keyContainer} >
            <Text>(Registration) User Phone </Text>
          </View>
          <View style={styles.valueContainer} >
            <TextInput
              style={styles.input}
              onChangeText={setInputPhone}
              value={inputPhone}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.keyContainer} >
            <Text>Region Path</Text>
          </View>
          <View style={styles.valueContainer} >
            <TextInput
              multiline={true}
              numberOfLines={6}
              style={styles.textArea}
              onChangeText={setInputRegionPath}
              value={inputRegionPath}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.keyContainer} >
            <Text>(Device) Device Path</Text>
          </View>
          <View style={styles.valueContainer} >
            <TextInput
              multiline={true}
              numberOfLines={6}
              style={styles.textArea}
              onChangeText={setinputPrecisePath}
              value={inputPrecisePath}
            />
          </View>
        </View>
      </>
    );
  };

  return (
    <ScrollView style={styles.container}>

      <Button style={styles.button}
          title="Start App"
          onPress={() => dispatch(routeTo(Pages.HOME))}
      />

      <Text>{t('debug_menu')}</Text>

      <Text style={styles.header}>Actions</Text>
      {actionRow("Sign Up", "POST /sign_up", onSignUp)}
      {actionRow("Sign In", "POST /sign_in", onSignIn)}
      {actionRow("Send Region Change", "POST /path", onSendRegionPath)}
      {actionRow("Report Full Path", "POST /report_path", onReportPath)}
      {actionRow("Get/Process Messages", "GET /messages", onGetMessages)}
      {actionRow("[DEBUG] Get path", "GET /path", onGetPath)}
      {routeToRow("[DEBUG] Route to", onRouteTo)}
      {actionRow("resetStore", "resets the in-memory store to initial values", () => dispatch(resetStore()))}
      {actionRow("[Device Storage] Print device storage", "calling this too quickly will cause an exception", printStore)}
      {actionRow("[Device Storage] Erase all keys", "delete everything!", wipeStore)}
      {actionRow("[Device Storage] Add location to history", "add a test location", addLocationToStore)}

      <Text style={styles.header}>Redux Store (in memory)</Text>
      {
        Object.keys(state).map((key) => row({key, value: state[key]}))
      }
      
      <Text style={styles.header}>Device Store (persisted)</Text>
      {
        Object.keys(deviceStore).map((key) => row({key, value: deviceStore[key]}))
      }

      {inputs()}

    </ScrollView>
  );
};

function row({key, value, onPress}) {
  return (
    <TouchableOpacity {...{onPress, key}}>
      <View style={styles.row}>
        <View style={styles.keyContainer} >
          <Text>{key}</Text>
        </View>
        <View style={styles.valueContainer} >
          <Text>{storeValueText(value)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function storeValueText(value) {
  if (typeof value == "object") {
    return JSON.stringify(value, null, 2)
  } else if (typeof value == "boolean") {
    return value.toString();
  }

  return value
}

function actionRow(action, description, onPress) {
  return row({key: action, value: description, onPress})
}

function routeToRow(key, onSelect){
  return (
    <TouchableOpacity {...{key}}>
      <View style={styles.row}>
        <View style={styles.keyContainer} >
          <Text>{key}</Text>
        </View>
        <View style={styles.valueContainer} >
          <Picker
            selectedValue={Pages.DEBUG_MENU}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => onSelect(itemValue)}
          >
            {
              Object.keys(Pages).map((page) => {
                  return <Picker.Item label={page} value={page} key={page} />
                }
              )
            }
          </Picker>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  row: {
    flexDirection: "row",
  },
  header: {
    paddingVertical : 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  keyContainer: {
    flex: 0.5,
    borderWidth: 1,
    borderColor: "#CECECE",
    paddingLeft: 5,
  },
  valueContainer: {
    flex: 0.5,
    borderWidth: 1,
    borderColor: "#CECECE",
    paddingLeft: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  textArea: {
    borderColor: 'gray',
    borderWidth: 1,
  }
});

export default DebugMenu;
