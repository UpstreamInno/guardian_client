import { Path } from "./Path";
import Location from 'Lib/models/Location';
import Session from "Lib/models/Session";

import {
  sendRegionPath,
} from "Lib/Api";

export default class Job {

  static async executeTasks() {
    console.log("executeTasks");

    // send region locations every 60 min
    await onSendRegionPath();
    //polling for “messages” updates every 60 min 
    // dispatch(fetchMessages());

    //data cleanup: delete location data older than 20 days locally -  tested(working)
    await Location.locationDataCleanup();
    return;
  }
}

const onSendRegionPath = async () => {

  // attempt to load session from device storage
  const session = await Session.read();
  if (!session || !session.accessToken) {
    throw 'session not found';
  }

  var points = await Location.read();

  if (!points || !points.history.length > 0) {
    console.log("no location data yet, skipping onSendRegionPath");
    return;
  }

  var pathData = Path.regionPathFromPoints(points.history, { imprecise: true });
  sendRegionPath({path: pathData, accessToken: session.accessToken}).then((data) =>{
    console.log("sendRegionPath response, ignoring...", data)
    // updateLocation();
  })
}
