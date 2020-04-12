import React, { useState } from "react";
import CryptoJS from "react-native-crypto-js";
import moment from 'moment'

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

  const secureStoreOptions = {
      keychainService: "credentials",
      keychainAccessible: SecureStore.ALWAYS // iOS only
  };

  getKey = async () => {
    try {
      SecureStore.getItemAsync("keystore", secureStoreOptions)
      .then((itemValue) => {
        if(itemValue == null){
          itemValue = 'test-key'//todo fix bug -> key not fetched from storer
        }
        return itemValue;
      }).catch((error) => {
          console.log("SecureStore: An error occurred while loading the item...", error);
          // return null;
          return null;//todo remove this
      });
    } catch (e) {
       // return null;
       return null;//todo remove this
      // console.log(e);
    }
  };

  setKey = async () => {
    try {
      SecureStore.setItemAsync("keystore", 'test-key', secureStoreOptions) //todo set key
      .then(() => {
          console.log("SecureStore: Successfully stored item!");
          return "SecureStore: Successfully stored item!";
      }).catch((error) => {
          console.log("SecureStore: An error occurred while storing the item...", error);
          return "SecureStore: An error occurred while storing the item...;";
      });
    } catch (e) {
      // console.log(e);
    }
  };

  load = async (STORAGE_KEY) => {
    try {
      const result = await AsyncStorage.getItem(STORAGE_KEY);
      // var key = await this.getKey();
      // console.log("load key", key);
      // let bytes  = CryptoJS.AES.decrypt(result, key);
      // let originalResult = bytes.toString(CryptoJS.enc.Utf8);
      return result;
    } catch (e) {
      console.error('Failed to load .', e)
      return [];
    }
  }

  saveArray = async (STORAGE_KEY, array) => {
    try {
      var string = JSON.stringify(array, null, array.length);
      // const key = await this.getKey()
      // await AsyncStorage.setItem(STORAGE_KEY, CryptoJS.AES.encrypt(string, key).toString())
      await AsyncStorage.setItem(STORAGE_KEY, string);
      // this.setState({name})
      return 'object saved';
    } catch (e) {
      console.error('Failed to save name.');
      return 'failed to save object';
    }
  }

  sortLocationByTime =  async (locations) => {
    console.log("before sort", locations);
    for(var i = 0; i < locations.length - 1; i++){
      for(var j = i + 1; j < locations.length; j++){
          if(moment(locations[i][2]).format("x") < moment(locations[j][2]).format("x")){
            var aux = locations[i];
            locations[i] = locations[j];
            locations[j] = aux;
          }
      }
    }
    console.log("sorted", locations);
    return locations;
  }

  filterLocationAfterTime = async(locations, time) => {
    var result = [];
    for(var i = 0; i < locations.length; i++){
      if(moment(locations[i][2]).format("x") > time){
        result.push(locations[i]);
      }
    }
    return result;
  }

  getMostRecentLocations = async(latest) => { //latest X locations
    var locations = await load('locations');
    locations = JSON.parse(locations);
    locations = await sortLocationByTime(locations);
    locations = locations.slice(0, latest);
    return locations;
  }

  getLocationsWithinDays = async(days) => { // last X days of location data
    var locations = await load('locations');
    locations = JSON.parse(locations);
    locations = await sortLocationByTime(locations);
    var time = Date.now() - days * 24 * 3600 * 1000;
    locations = await filterLocationAfterTime(locations, time);
    return locations;
  }

  addLocationToDatabase = async(location) => { // add location to database location->["47.60", "-122.33", "2020-04-02T00:18:31Z"]
    var locations = await load('locations');
    locations = JSON.parse(locations);
    locations.push(location);
    locations = await sortLocationByTime(locations);
    var saveStatus = await saveArray('locations', locations)
  } 

  deleteLocationsAfterTime = async(time) => {// delete locations by time(milliseconds)
    var locations = await load('locations');
    locations = JSON.parse(locations);
    locations = await sortLocationByTime(locations);
    locations = await filterLocationAfterTime(locations, time);
    var saveStatus = await saveArray('locations', locations)
  }

  deleteLocationsAfterDate = async(date) => { //delete locations by date ex: "2020-04-02T00:18:31Z"
    var locations = await load('locations');
    locations = JSON.parse(locations);
    locations = await sortLocationByTime(locations);
    locations = await filterLocationAfterTime(locations, moment(date).format('x'));
    var saveStatus = await saveArray('locations', locations)
  }

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
