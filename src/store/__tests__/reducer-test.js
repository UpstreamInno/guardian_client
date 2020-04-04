import { rootReducer as reducer, initialState } from "../reducer";

import {
  setUserLastPathSentTime,
  setUserSignUpData,
  setUserPhone,
  setUserSession,
  resetStore,
} from "../actions"

const fakePhone = "999-000-1234";
const registrationCode = "a498l"
const registrationId = "p07"
const sessionId = "lhkwfoeih"
const sessionPhone = fakePhone

describe("rootReducer", () => {
  it(`handles supported action`, () => {
    const state = reducer(initialState, {type: null});
    expect(state).toEqual(initialState);
  });

  it(`handles setUserSignUpData`, () => {
    const state = reducer(undefined, setUserSignUpData({
      registrationCode, 
      registrationId,
    }));
    expect(state.registrationCode).toEqual(registrationCode);
    expect(state.registrationId).toEqual(registrationId);
  });

  it(`handles setUserSession`, () => {
    const state = reducer(undefined, setUserSession({
      sessionId, 
      sessionPhone,
    }));
    expect(state.sessionId).toEqual(sessionId);
    expect(state.sessionPhone).toEqual(sessionPhone);
  });

  it(`handles setUserLastPathSentTime`, () => {
    let date = new Date();
    const state = reducer(undefined, setUserLastPathSentTime({ time: date }));
    expect(state.lastPathSentTime).toEqual(date);
  });

  it(`handles setUserPhone`, () => {
    const state = reducer(undefined, setUserPhone(fakePhone));
    expect(state.userPhone).toEqual(fakePhone);
  });

  it(`handles resetStore`, () => {
    const state = reducer({something: false}, resetStore());
    expect(state).toEqual(initialState);
  });
});
