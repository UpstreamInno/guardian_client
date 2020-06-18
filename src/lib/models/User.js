import Storage from 'Lib/Storage';
import moment from 'moment';
import {
  AsyncStorage
} from "react-native";
export default class User {

  static get NAMESPACE() { return Storage.encryptedModelName("user"); }
  
  // returns messages, an object with keys:
  static async read(options = {}) {
    const limit = options.limit || 0;
    let result = await Storage.load(User.NAMESPACE);
    return result;
  }
  
  // insert a message into the history
  static async insert(user) {
    let userData = await User.read();
    return Storage.write(User.NAMESPACE, userData);
  }

  static async update(key, value){
  	let userData = await User.read();
    userData[key] = value;
    return Storage.write(User.NAMESPACE, userData);
  }

  static async destroy() { 
    return Storage.remove(User.NAMESPACE);
  }
}


