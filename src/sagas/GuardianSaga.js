import { takeLatest, put, call, select } from 'redux-saga/effects'
import { Pages } from "Components/GuardianContainer"

import {
  signUp,
  signIn,
} from "Lib/Api";

import {
  USER_SIGNUP,
  USER_SIGNUP_VERIFY,
  setUserPhone,
  setUserSession,
  routeTo,
  setUserSignUpData,
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

export function* watchUserRegister() {
  yield takeLatest(USER_SIGNUP, userSignUp);
}

export function* watchUserVerify() {
  yield takeLatest(USER_SIGNUP_VERIFY, userVerify);
}
