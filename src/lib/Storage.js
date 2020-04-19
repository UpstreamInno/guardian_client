import {AsyncStorage} from 'react-native';
import CryptoJS from "react-native-crypto-js";
import * as SecureStore from 'expo-secure-store';
import moment from 'moment';


export const getMostRecentLocations = async(latest) => { //latest X locations
    var locations = await load('locations');
    locations = JSON.parse(locations);
    locations = await sortLocationByTime(locations);
    locations = locations.slice(0, latest);
    return locations;
}

export const getLocationsWithinDays = async(days) => { // last X days of location data
    var locations = await load('locations');
    if(locations == null){
      locations = [];  
    } else {
      locations = JSON.parse(locations);
    }
    locations = await sortLocationByTime(locations);
    var time = Date.now() - days * 24 * 3600 * 1000;
    locations = await filterLocationAfterTime(locations, time);
    return locations;
}

export const addLocationToDatabase = async(location) => { // add location to database location->["47.60", "-122.33", "2020-04-02T00:18:31Z"]
    var locations = await load('locations');
    if(locations == null){
      locations = [];  
    } else {
      locations = JSON.parse(locations);
    }
    locations.push(location);
    locations = await sortLocationByTime(locations);
    var saveStatus = await saveArray('locations', locations)
} 

export const deleteLocationsAfterTime = async(time) => {// delete locations by time(milliseconds)
    var locations = await load('locations');
    if(locations == null){
      locations = [];  
    } else {
      locations = JSON.parse(locations);
    }
    locations = await sortLocationByTime(locations);
    locations = await filterLocationAfterTime(locations, time);
    var saveStatus = await saveArray('locations', locations)
}

export const deleteLocationsAfterDate = async(date) => { //delete locations by date ex: "2020-04-02T00:18:31Z"
    var locations = await load('locations');
    if(locations == null){
      locations = [];  
    } else {
      locations = JSON.parse(locations);
    }
    locations = JSON.parse(locations);
    locations = await sortLocationByTime(locations);
    locations = await filterLocationAfterTime(locations, moment(date).format('x'));
    var saveStatus = await saveArray('locations', locations)
}

export const getKey = async () => {
  const secureStoreOptions = {
      keychainService: "credentials",
      keychainAccessible: SecureStore.ALWAYS // iOS only
  };

  return new Promise((resolve, reject)=>{
    try {
      SecureStore.getItemAsync("keystore", secureStoreOptions)
      .then((itemValue) => {
        resolve(itemValue);
      }).catch((error) => {
          console.log("SecureStore: An error occurred while loading the item...", error);
          resolve(null);
      });
    } catch (e) {
      resolve(null);
    }
  });
};

export const setKey = async () => {
  const secureStoreOptions = {
      keychainService: "credentials",
      keychainAccessible: SecureStore.ALWAYS // iOS only
  };
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
}

//load from database using STORAGE_KEY
export const load = async (STORAGE_KEY) => {
  try {
    const result = await AsyncStorage.getItem(STORAGE_KEY);
    if(result != null ){
      var key = await getKey();
      if(key == null){
        await setKey();
        key = await getKey();
      }
      let bytes  = CryptoJS.AES.decrypt(result, key);
      let originalResult = bytes.toString(CryptoJS.enc.Utf8);
      return originalResult;
    } else {
      return result;
    }

  } catch (e) {
    console.error('Failed to load .', e)
    return [];
  }
}

//save to database using STORAGE_KEY

export const saveArray = async (STORAGE_KEY, array) => {
  try {
    var string = JSON.stringify(array, null, array.length);
    var key = await getKey();
    if(key == null){
      await setKey();
      key = await getKey();
    }
    await AsyncStorage.setItem(STORAGE_KEY, CryptoJS.AES.encrypt(string, key).toString())
    // await AsyncStorage.setItem(STORAGE_KEY, string);
    return 'Object saved';
  } catch (e) {
    console.error(e);
    return 'Failed to save object.';
  }
}

export const remove = async (STORAGE_KEY) => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      return 'Object removed';
    } catch (e) {
      console.error('Failed to remove object.');
      return 'Failed to save object.';
    }
}

export const sortLocationByTime =  async (locations) => {
    // console.log("before sort", locations);
    for(var i = 0; i < locations.length - 1; i++){
      for(var j = i + 1; j < locations.length; j++){
          if(moment(locations[i][2]).format("x") < moment(locations[j][2]).format("x")){
            var aux = locations[i];
            locations[i] = locations[j];
            locations[j] = aux;
          }
      }
    }
    // console.log("sorted", locations);
    return locations;
}

export const filterLocationAfterTime = async(locations, time) => {
    var result = [];
    for(var i = 0; i < locations.length; i++){
      if(moment(locations[i][2]).format("x") > time){
        result.push(locations[i]);
      }
    }
    return result;
}


