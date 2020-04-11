import React, { useState } from "react";
import {
  Button,
  Picker,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { t } from 'Lib/i18n';
import { 
  setUserLastRegionPathSentTime,
  reportPrecisePath,
  fetchMessages,
  setUserSignUpData,
  setUserSession,
  resetStore,
  routeTo,
} from "Store/actions";
import {
  getPath,
  sendRegionPath,
  signIn,
  signUp, 
} from "Lib/Api";
import { useDispatch, useSelector } from "react-redux";

import { Pages } from "Components/GuardianContainer"

const DebugMenu = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  // input states, used only for this page to simulate UI input
  const [inputPhone, setInputPhone] = useState('1123456789');
  
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
    signUp(inputPhone).then((data) =>{
      const { code, id } = data;

      // store registration code and id for the signup request
      dispatch(setUserSignUpData({ registrationCode: code, registrationId: id }))
    })
  }

  const onSignIn = () => {
    signIn({
      registrationId: state.registrationId, 
      registrationCode: state.registrationCode,
    }).then((data) =>{
      const { sessionId } = data;
      // store session information for subsequent requests
      dispatch(setUserSession({ sessionId }))
    })
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

    sendRegionPath(pathData).then((data) =>{
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
    getPath().then((data) =>{
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

  return (
    <View style={styles.container}>

      <Button
          title="Start App"
          onPress={() => dispatch(routeTo(Pages.HOME))}
      />

      <Text>{t('debug_menu')}</Text>
      <Text>User/Device Inputs</Text>

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

      <Text>Actions</Text>
      {actionRow("1. signUp", "POST /sign_up", onSignUp)}
      {actionRow("2. signIn", "POST /sign_in", onSignIn)}
      {actionRow("sendPath (region)", "POST /path", onSendRegionPath)}
      {actionRow("reportPath (precise)", "POST /report_path", onReportPath)}
      {actionRow("getMessages", "GET /messages", onGetMessages)}
      {actionRow("[DEBUG] get path", "GET /path", onGetPath)}
      {routeToRow("[DEBUG] route to", onRouteTo)}

      {actionRow("resetStore", "resets the store to initial values", () => dispatch(resetStore()))}

      <Text>Redux Store (in memory)</Text>
      {
        Object.keys(state).map((key) => row({key, value: state[key]}))
      }
    </View>
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
          <Text>{typeof value == "object" ? JSON.stringify(value, null, 2) : value}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
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
  container: {
    paddingLeft: "40px",
    paddingTop: "20px",
    flex: 1,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
  },
  keyContainer: {
    flex: 0.2,
    borderWidth: 1,
    borderColor: "#CECECE",
    paddingLeft: "10px",
  },
  valueContainer: {
    flex: 0.7,
    borderWidth: 1,
    borderColor: "#CECECE",
    paddingLeft: "10px",
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
