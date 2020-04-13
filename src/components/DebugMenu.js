import React, { useState, useEffect } from "react";
import CryptoJS from "react-native-crypto-js";
import * as SecureStore from 'expo-secure-store';

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
  setUserLastPathSentTime,
  setUserSignUpData,
  setUserSession,
  resetStore,
  routeTo,
} from "Store/actions";
import {
  getPath,
  sendPath,
  signIn,
  signUp, 
} from "Lib/Api";
import {
  getKey,
  getMostRecentLocations,
  addLocationToDatabase,
  saveArray,
  remove
} from "Lib/Storage";

import { useDispatch, useSelector } from "react-redux";

import { Pages } from "Components/GuardianContainer"

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

const DebugMenu = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  // input states, used only for this page to simulate UI input
  const [inputPhone, setInputPhone] = useState('1123456789');
  const [inputPath, setInputPath] = useState(JSON.stringify([
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

  const onSendPath = () => {
    // sendPath expects data in this form:
    //  [
    //    ["47.609755", "-122.337793", "2020-04-02T00:18:31Z"],
    //    ["47.609750", "-122.339900", "2020-04-02T00:23:31Z"],
    //  ];
    //
    // however to enable user input on the debug page, we stringify the json.
    const pathData = JSON.parse(inputPath);

    sendPath(pathData).then((data) =>{
      // dont need to do anything with the response for now
      console.log("Path response, ignoring...", data)

      // store the last sent path time
      if(data.errors.length === 0) {
        dispatch(setUserLastPathSentTime({ time: Date.now() }));
      }
    })
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

  useEffect(() => {

  //   // var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123');
  //   // alert(ciphertext.toString());

  //   // get secret key from secure store
  //   // let ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();
  //   // // Decrypt
  //   // let bytes  = CryptoJS.AES.decrsypt(ciphertext, 'secret key 123');
  //   // let originalText = bytes.toString(CryptoJS.enc.Utf8);
  //   // alert(originalText);

    async function startUp() {
      // var key = await getKey();
      // alert(key);
  //     // You can await here
      // var addLocation = await addLocationToDatabase(["47.60", "-122.33", "2020-04-12T00:18:31Z"])
      var locations = await getMostRecentLocations(9);

      // var sds = remove('locations');

  //     // await this.deleteLocationsAfterTime(1586114180640);
  //     var keyStatus = await this.setKey();
  //     // var key = await this.getKey();
  //     // console.log("load key", key);
  //     var locations = await load('locations');

      // locations = JSON.parse(locations);
  //     // // locations = await sortLocationByTime(locations);
  //     // // for(var i = 0; i < locations.length; i++){
  //     // //   // console.log(locations[i][2]);
  //     // // }
      console.log("locationsss", locations);
    } 
    startUp();

  //   // console.log(load('locations'));
  //   // alert(JSON.stringify(load('locations')));
  //   // alert(moment("2020-04-02T00:18:31Z").format("x"));
  //   // console.log(moment("2020-04-02T00:18:31Z").format("x"));

  //   // alert("useEffect");
  //   // this.remember();
  //   // this.read();
  //   // this.save('locations', JSON.stringify([
  //   //   ["47.609755", "-122.337793", "2020-04-02T00:18:31Z"],
  //   //   ["47.609750", "-122.339900", "2020-04-02T00:23:31Z"],
  //   // ], null, 2))
  //   // this.load('locations');
  })


  return (
    <View style={styles.container}>

      <Button
          title="Start App"
          onPress={() => dispatch(routeTo(Pages.HOME))}
      />

      <Text>{t('debug_menu', {date: new Date()})}</Text>
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
          <Text>(Device) Device Path</Text>
        </View>
        <View style={styles.valueContainer} >
          <TextInput
            multiline={true}
            numberOfLines={6}
            style={styles.textArea}
            onChangeText={setInputPath}
            value={inputPath} 
          />
        </View>
      </View>

      <Text>Actions</Text>
      {actionRow("1. signUp", "POST /sign_up API", onSignUp)}
      {actionRow("2. signIn", "POST /sign_in API", onSignIn)}
      {actionRow("3. path", "POST /path API", onSendPath)}
      {actionRow("[DEBUG] get path", "GET /path API", onGetPath)}
      {routeToRow("[DEBUG] route to", onRouteTo)}

      {actionRow("resetStore", "resets the store to initial values", () => dispatch(resetStore()))}

      <Text>Store</Text>
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
          <Text>{value}</Text>
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

export default DebugMenu;
