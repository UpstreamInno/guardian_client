import { registerRootComponent } from 'expo';
import {
  AppRegistry,
  AsyncStorage
} from "react-native";
import BackgroundFetch from "react-native-background-fetch";
import Job from "Lib/Job";
import { Client } from 'bugsnag-react-native';
import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
const bugsnag = new Client("41388efa795c65268807bb2940b20f82");

let MyHeadlessTask = async (event) => {
  // Get task id from event {}:
  let taskId = event.taskId;
  console.log('[BackgroundFetch HeadlessTask] start: ', taskId);
  Job.executeTasks();
  // Perform an example HTTP request.
  // Important:  await asychronous tasks when using HeadlessJS.

  // if(taskId == "com.transistorsoft.customtask"){
  // 	var taskText = await AsyncStorage.getItem("task");
	 //  taskText = taskText + "\n----------" +JSON.stringify(new Date());
  // 	var save = await AsyncStorage.setItem("task", taskText);
  // }
 
  // Required:  Signal to native code that your task is complete.
  // If you don't do this, your app could be terminated and/or assigned
  // battery-blame for consuming too much time in background.
  BackgroundFetch.finish(taskId);
}


registerRootComponent(App);
// Register your BackgroundFetch HeadlessTask
BackgroundFetch.registerHeadlessTask(MyHeadlessTask);
