import {AsyncStorage} from 'react-native';
import { fromPoints } from "Lib/PathHelpers"

import { 
  locationDataCleanup, 
  updateLocation
} from 'Lib/models/Location'; //todo is it right?
import {  
  setUserLastRegionPathSentTime,
  fetchMessages 
} from "Store/actions";
import {
  sendRegionPath,
} from "Lib/Api";
import { useDispatch, useSelector } from "react-redux";

export default class Job {

  static async executeTasks() {
    console.log("executeTasks");
    const dispatch = useDispatch();
    // send region locations every 60 min
    onSendRegionPath();
    //polling for “messages” updates every 60 min 
    dispatch(fetchMessages());

    //data cleanup: delete location data older than 20 days locally -  tested(working)
    locationDataCleanup();
    return;
  }
}

const onSendRegionPath = () => {
  // TODO: this should be computed from precise path!
  var points = Location.read();
  var inputRegionPath = fromPoints(points);
  const state = useSelector(state => state);

  // however to enable user input on the debug page, we stringify the json.
  const pathData = JSON.parse(inputRegionPath);


  sendRegionPath({path: pathData, accessToken: state.accessToken}).then((data) =>{
    // dont need to do anything with the response for now
    console.log("sendRegionPath response, ignoring...", data)
    updateLocation();
    // store the last sent path time
    // if (data.errors.length === 0) {
    //   // dispatch(setUserLastRegionPathSentTime({ time: Date.now() }));
    // }
  })
}
