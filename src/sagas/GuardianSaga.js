import { takeLatest, put, call, select } from 'redux-saga/effects'
import { Pages } from "Components/GuardianContainer"
import { Paths } from "Lib/Paths"
import { epochToDisplayString, distanceToDisplay } from "Lib/PathHelpers"
import { t } from 'Lib/i18n';

import {
  getMessages,
  ackMessage,
  reportPath,
  reportTestResults,
  reportSurvey,
  signUp,
  signIn,
} from "Lib/Api";

import {
  USER_SIGNUP,
  USER_SIGNUP_VERIFY,
  FETCH_MESSAGES,
  REPORT_PRECISE_PATH,
  saveNotification,
  setUserPhone,
  setUserSession,
  routeTo,
  setUserSignUpData,
  setUserLastReportedPath,
} from "../store/actions"

function* userSignUp(action) {
  const { 
    userPhone,
    redirect,
   } = action.payload;

  yield put(setUserPhone(userPhone));
  try {
    const { id, code } = yield call(signUp, userPhone);
    yield put(setUserSignUpData({ registrationCode: code, registrationId: id }));
    if (redirect) {
      yield put(routeTo(Pages.SIGNUP_VERIFY));
    }
  } catch (error) {
    console.error("Failed signUp, error: ", error);
    yield put(routeTo(Pages.HOME));
  }
}

function* userVerify(action) {
  const {
    registrationCode,
    redirect,
  } = action.payload;
  const { registrationId } = yield select(state => state);

  try {
    const isLoggedIn = yield call(signIn, {registrationCode, registrationId});
    console.log("isLoggedIn", isLoggedIn);
    if (isLoggedIn) {
      yield put(setUserSession({sessionId: "true"}));
      if (redirect) {
        yield put(routeTo(Pages.CONSENT_LOCATION));
      }
    } else {
      // unable to validate code, send them back to try again
      console.error("unable to validate code");
      yield put(routeTo(Pages.SIGNUP));
    }
  } catch (error) {
    console.error("Failed signUp, error: ", error);
    yield put(routeTo(Pages.HOME));
  }
}

function* fetchMessages(action) {
  try {
    const message = yield call(getMessages);
    const messageId = message["message_id"];

    if (!messageId) {
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
    yield call(ackMessage, message["message_id"]);

    if (closestIntersection) {

      // if there are intersections, save it as an alert so it shows up in the notifications section
      // TODO: localization, move to a "view"
      let notification = {
        displayMessage: `On ${epochToDisplayString(closestIntersection.time)} you were within proximity of ${distanceToDisplay(closestIntersection.distance)} of a reported COVID-19 case. We would like to know how you are feeling.`,
        intersection: closestIntersection,
        message,
        id: message["message_id"], // for now just use the message id
      };

      // store the notification for display in-app
      yield put(saveNotification(notification));

      // send a local push nontification
      console.log("*** TODO: send push notification here: ", notification.displayMessage);
    }
  } catch (error) {
    console.error("Failed fetching messages, error: ", error);
    yield put(routeTo(Pages.HOME));
  }
}

function* onReportPrecisePath(action) {
  try {
    const { path } = action.payload;
    const { pathId } = yield call(reportPath, {points: path});
    
    yield put(setUserLastReportedPath({ pathId, time: Date.now() }));
    yield call(reportTestResults, pathId);
    yield call(reportSurvey, pathId);
    
  } catch (error) {
    console.error("Failed reportin path, error: ", error);
    yield put(routeTo(Pages.HOME));
  }
}

export function* watchUserRegister() {
  yield takeLatest(USER_SIGNUP, userSignUp);
}

export function* watchUserVerify() {
  yield takeLatest(USER_SIGNUP_VERIFY, userVerify);
}

export function* watchFetchMessages() {
  yield takeLatest(FETCH_MESSAGES, fetchMessages);
}

export function* watchReportPrecisePath() {
  yield takeLatest(REPORT_PRECISE_PATH, onReportPrecisePath);
}
