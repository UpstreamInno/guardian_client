import { takeLatest, put, call, select } from 'redux-saga/effects'
import { Pages } from "Components/GuardianContainer"
import { Paths } from "Lib/Paths"

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
  setUserPhone,
  setUserSession,
  routeTo,
  setUserSignUpData,
  setUserLastReportedPath,
} from "../store/actions"

function* userSignUp(action) {
  const { userPhone } = action.payload;

  yield put(setUserPhone(userPhone));
  try {
    const { id, code } = yield call(signUp, userPhone);
    yield put(setUserSignUpData({ registrationCode: code, registrationId: id }));
    yield put(routeTo(Pages.SIGNUP_VERIFY));
  } catch (error) {
    console.error("Failed signUp, error: ", error);
    yield put(routeTo(Pages.HOME));
  }
}

function* userVerify(action) {
  const { registrationCode } = action.payload;
  const { registrationId } = yield select(state => state);

  try {
    const { sessionId } = yield call(signIn, {registrationCode, registrationId});
    if (sessionId) {
      yield put(setUserSession({ sessionId }));
      yield put(routeTo(Pages.CONSENT_LOCATION));
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
  console.log("fetch mess");
  try {
    const { messages } = yield call(getMessages);
    messages.forEach((message) => {

      console.log("**** message", message);

      //  check message for intersection against local precise data

      // TODO  get the device path from secure storage, only need X days
      const devicePoints = [
        ["47.609755", "-122.337793", "2020-04-02T00:18:31Z"],
        ["47.609750", "-122.339900", "2020-04-02T00:23:31Z"],
      ]

      let intersections = Paths.intersectionsFromPoints(devicePoints, message.points)
      console.log("*** intersections", intersections)
      // if there are intersections, send a local push nontification

      // ack the message
      // yield call(ackMessage, message.id);

      // TODO: mark message as "read" locally
      
    });
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
