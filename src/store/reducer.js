import {
  ROUTE_TO,
  SET_USER_LAST_PATH_SENT_TIME,
  SET_USER_PHONE,
  SET_USER_SESSION,
  SET_USER_SIGNUP_DATA,
  RESET_STORE,
} from "./actions"

import { Pages } from "Components/GuardianContainer"

export const initialState = {
  userPhone: "",
  registrationCode: null,
  registrationId: null,
  sessionId: null,
  lastPathSentTime: null,
  currentPage: Pages.DebugMenu,
  previousPage: null,
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PHONE:
      return {
        ...state,
        userPhone: (action.payload && action.payload.userPhone) || "",
      };
    case SET_USER_SIGNUP_DATA:
      return {
        ...state,
        registrationCode: (action.payload && action.payload.registrationCode) || null,
        registrationId: (action.payload && action.payload.registrationId) || null,
      };
    case SET_USER_SESSION:
      return {
        ...state,
        sessionId: (action.payload && action.payload.sessionId) || null,
      };
    case ROUTE_TO:
      let previousPage = (action.payload && action.payload.previousPage) || state.page
      return {
        ...state,
        currentPage: (action.payload && action.payload.page) || Pages.HOME,
        previousPage,
      };
    case SET_USER_LAST_PATH_SENT_TIME:
      return {
        ...state,
        lastPathSentTime: (action.payload && action.payload.time) || null,
      };
    case RESET_STORE:
      return initialState;
    default: {
      return state;
    }
  }
};
