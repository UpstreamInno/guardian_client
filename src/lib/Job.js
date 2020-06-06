import { Path } from "./Path";
import { Paths } from "Lib/Paths"
import Location from 'Lib/models/Location';
import Session from "Lib/models/Session";
import { t } from 'Lib/i18n';
import {sendLocalPush} from 'Lib/Notifications';
import { epochToDisplayString, distanceToDisplay } from "Lib/PathHelpers"
import Message from "Lib/models/Message";

import {
  sendRegionPath,
  getMessages,
  ackMessage
} from "Lib/Api";

export default class Job {

  static async executeTasks() {
    console.log("executeTasks");

    // send region locations every 60 min
    await onSendRegionPath();
 
   //polling for “messages” updates every 60 min 
    await onFetchMessages();

    //data cleanup: delete location data older than 20 days locally -  tested(working)
    await Location.locationDataCleanup();
    return;
  }
}

const onSendRegionPath = async () => {
  console.log("onSendRegionPath");
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

const onFetchMessages = async () => {
  console.log("onFetchMessages");
  // attempt to load session from device storage
  const session = await Session.read();
  if (!session || !session.accessToken) {
    throw 'session not found';
  }

  try {
    const message = await getMessages({accessToken:session.accessToken});
    const messageId = message["message_id"];

    console.log("message", message)

    if (!messageId) {
      console.log("messageId null", messageId);
      return;
    }

    //  check message for intersection against local precise data
    // TODO get the device path from secure storage, only need X days
    const devicePoints = [
      ["47.609755", "-122.337793", "2020-04-02T00:18:31Z"],
      ["47.609750", "-122.339900", "2020-04-02T00:23:31Z"],
    ]

    let { closestIntersection } = Paths.intersectionsFromPoints(devicePoints, message.points);

    // ack the message
    await ackMessage({messageId: message["message_id"], accessToken:session.accessToken});

    if (closestIntersection) {
      console.log("closestIntersection", closestIntersection);
      // if there are intersections, save it as an alert so it shows up in the notifications section
      // TODO: localization, move to a "view"
      let notification = {
        displayMessage: `On ${epochToDisplayString(closestIntersection.time)} you were within proximity of ${distanceToDisplay(closestIntersection.distance)} of a reported COVID-19 case. We would like to know how you are feeling.`,
        intersection: closestIntersection,
        message,
        id: message["message_id"], // for now just use the message id
        read: false
      };

      await Message.insert(notification);
      // send a local push notification
      sendLocalPush(t('proximity_alert_title'), notification.displayMessage);
    }
  } catch (error) {
    // throw(error);
    console.error("Failed fetching messages, error: ", error);
  }
}
