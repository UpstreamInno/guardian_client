import { takeLatest, put, call, select } from 'redux-saga/effects'
import { Pages } from "Lib/Pages";
import { Paths } from "Lib/Paths"
import Session from "Lib/models/Session";
import { epochToDisplayString, distanceToDisplay } from "Lib/PathHelpers"
import { t } from 'Lib/i18n';
import {sendLocalPush} from 'Lib/Notifications';

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
  REPORT_SYMPTOMS,
  SESSION_NOT_FOUND,
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
      yield put(routeTo(Pages.NEWSIGNUPVERIFY_SCREEN));
    }
  } catch (error) {
    console.error("Failed signUp, error: ", error);
    if (redirect) {
      yield put(routeTo(Pages.HOME));
    }
  }
}

function* userVerify(action) {
  const {
    registrationCode,
    redirect,
  } = action.payload;

  const { registrationId } = yield select(state => state);

  try {
    const { accessToken, refreshToken } = yield call(signIn, {registrationCode, registrationId});
    if (accessToken) {
      // send session to redux store
      yield put(setUserSession({accessToken, refreshToken}));

      // send session to local storage
      yield call(Session.write, {accessToken, refreshToken});

      if (redirect) {
        yield put(routeTo(Pages.WELCOME_SCREEN));
      }
    } else {
      // unable to validate code, send them back to try again
      console.error("unable to validate code");
      if (redirect) {
        yield put(routeTo(Pages.SIGNUP));
      }
    }
  } catch (error) {
    console.error("Failed signUp, error: ", error);
    if (redirect) {
      yield put(routeTo(Pages.HOME));
    }
  }
}

function* fetchMessages(action) {
  const { accessToken } = yield select(state => state);

  //todo only for tests, remove after testing phase
  // sendLocalPush(t('proximity_alert_title'), "test notification");

  try {
    const message = yield call(getMessages, {accessToken});
    const messageId = message["message_id"];

    console.log("message", message)

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
    yield call(ackMessage, {messageId: message["message_id"], accessToken});

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

      // send a local push notification
      sendLocalPush(t('proximity_alert_title'), notification.displayMessage);
    }
  } catch (error) {
    // throw(error);
    console.error("Failed fetching messages, error: ", error);
    yield put(routeTo(Pages.HOME));
  }
}

function* onReportPrecisePath(action) {
  const { accessToken } = yield select(state => state);

  try {
    const { path } = action.payload;
    const { pathId } = yield call(reportPath, {points: path, accessToken});

    yield put(setUserLastReportedPath({ pathId, time: Date.now() }));
    yield call(reportTestResults, {pathId, accessToken});

  } catch (error) {
    console.error("Failed reporting path, error: ", error);
    yield put(routeTo(Pages.HOME));
  }
}

function* onReportSymptoms(action) {
  const { accessToken } = yield select(state => state);

  try {
    const { symptoms } = action.payload;
    yield call(reportSurvey, {symptoms, accessToken});
    
    // TODO: save symptoms locally?
  } catch (error) {
    console.error("Failed repoting symptoms, error: ", error);
    yield put(routeTo(Pages.HOME));
  }
}

function* onSessionNotFound(action) {
  // attempt to load session from device storage
  const session = yield call(Session.read);

  if (session && (session.accessToken || session.refreshToken)) {
        // send session to redux store
        yield put(setUserSession({
          accessToken: session.accessToken,
          refreshToken: session.refreshToken,
        }));
  } else {
    // still no session, route to signup
    yield put(routeTo(Pages.SIGNUP));
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

export function* watchReportSymptoms() {
  yield takeLatest(REPORT_SYMPTOMS, onReportSymptoms);
}

export function* watchSessionNotFound() {
  yield takeLatest(SESSION_NOT_FOUND, onSessionNotFound);
}
