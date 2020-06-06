import Storage from 'Lib/Storage';
import moment from 'moment';
import {
  AsyncStorage
} from "react-native";
export default class Message {

  static get NAMESPACE() { return Storage.encryptedModelName("message"); }

  // returns messages, an object with keys:
  static async read(options = {}) {
    const limit = options.limit || 0;
    let result = await Storage.load(Message.NAMESPACE);
    return result;
  }
  
  // insert a message into the history
  static async insert(newMessage) {
    let messageData = await Message.read();
    messageData = messageData || {};
    let history = messageData.history ? messageData.history : [];
    history.push(newMessage);

    messageData.history = history;

    return Storage.write(Message.NAMESPACE, messageData);
  }

  static async destroy() { 
    return Storage.remove(Message.NAMESPACE);
  }
}