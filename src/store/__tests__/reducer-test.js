import { rootReducer as reducer, initialState } from "../reducer";

import {
  setUserPhone,
} from "../actions"

const fakePhone = "999-000-1234";

describe("rootReducer", () => {
  it(`handles supported action`, () => {
    const state = reducer(initialState, {type: null});
    expect(state).toEqual(initialState);
  });

  it(`handles setUserPhone`, () => {
    const state = reducer(undefined, setUserPhone(fakePhone));
    expect(state.userPhone).toEqual(fakePhone);
  });
});
