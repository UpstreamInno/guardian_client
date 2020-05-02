import {AsyncStorage} from 'react-native';
import CryptoJS from "react-native-crypto-js";
import * as SecureStore from 'expo-secure-store';

// Provides read/write utilities to the device's persistend storage.
export default class Storage {
  static get ENCRPYTION_PREFIX() { return "encrypted"; }

  static encryptedModelName(name) { return `${Storage.ENCRPYTION_PREFIX}_${name}`; }

  // dump the store, decrypt/parse keys prefixed with encrypted
  static async readAll() {
    let keys = await AsyncStorage.getAllKeys();
    let result = {};
  
    // load each key, only parse/decrypt key with ENCRPYTION_PREFIX
    async function fetchKey(key) {
      const options = key.split("_")[0] == Storage.ENCRPYTION_PREFIX ? {} : {descrpyt: false, parse: false};
      result[key] = await Storage.load(key, options);
    }
  
    const promises = keys.map(fetchKey);
    await Promise.all(promises);
    return result;
  }

  // return value for the given STORAGE_KEY
  // options:
  //   decrypt - boolean, when true decrypts the payload, default true
  //   parse - boolean, when true JSON parse's the payload, default true
  static async load(STORAGE_KEY, options = {}) {
    const decrypt = options.hasOwnProperty('decrypt') ? options.decrypt : true;
    const parse = options.hasOwnProperty('parse') ? options.parse : true;

    try {
      const result = await AsyncStorage.getItem(STORAGE_KEY);

      if (!decrypt) { 
        return parse ? JSON.parse(result) : result; 
      }

      if(result != null ){
        var key = await getKey();
        if(key == null){
          await setKey();
          key = await getKey();
        }
        let bytes  = CryptoJS.AES.decrypt(result, key);
        let originalResult = bytes.toString(CryptoJS.enc.Utf8);
        if (parse) {
          originalResult = JSON.parse(originalResult)
        }
        
        return originalResult;
      } else {
        return result;
      }

    } catch (e) {
      console.error('Failed to load .', e);
      return [];
    }
  }

  // write the given data to STORAGE_KEY in encrypted form
  static async write(STORAGE_KEY, data) {
    try {
      var key = await getKey();
      if(key == null){
        await setKey();
        key = await getKey();
      }

      const payload = JSON.stringify(data)

      await AsyncStorage.setItem(STORAGE_KEY, CryptoJS.AES.encrypt(payload, key).toString())
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  // delete STORAGE_KEY from storage
  static async remove(STORAGE_KEY) {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY)
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
  
  // delete all keys from the storage
  static async wipeAll() {
    let keys = await AsyncStorage.getAllKeys();
  
    async function removeKey(key) {
      await Storage.remove(key);
    }
  
    await Promise.all(keys.map(removeKey));
  }
}

function getKey() {
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

function setKey() {
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