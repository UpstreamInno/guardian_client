import {
  watchUserRegister,
  watchUserVerify,
} from './GuardianSaga'
import { all, ForkEffect, GenericEffect } from 'redux-saga/effects'

// register all watchers
export function* rootSaga() {
  yield all([
    watchUserRegister(),
    watchUserVerify(),
  ]);
}
