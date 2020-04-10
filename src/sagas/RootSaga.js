import {
  watchUserRegister,
  watchUserVerify,
  watchFetchMessages,
  watchReportPrecisePath,
} from './GuardianSaga'
import { all } from 'redux-saga/effects'

// register all watchers
export function* rootSaga() {
  yield all([
    watchUserRegister(),
    watchUserVerify(),
    watchFetchMessages(),
    watchReportPrecisePath(),
  ]);
}
