import {
  ROUTE_TO,
  SET_USER_LAST_REGION_PATH_SENT_TIME,
  SET_USER_LAST_REPORTED_PATH,
  SET_USER_PHONE,
  SET_USER_SESSION,
  SET_USER_SIGNUP_DATA,
  RESET_STORE,
} from "./actions"

import { Pages } from "Components/GuardianContainer"

export const initialState = {
  userPhone: null,
  registrationCode: null,
  registrationId: null,
  sessionId: null,
  lastRegionPathSentTime: null,
  lastReportPathSentTime: null,
  lastReportPathId: null,
  currentPage: Pages.DebugMenu,
  previousPage: null,
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PHONE:
      return {
        ...state,
        userPhone: (action.payload && action.payload.userPhone) || null,
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
    case SET_USER_LAST_REGION_PATH_SENT_TIME:
      return {
        ...state,
        lastRegionPathSentTime: (action.payload && action.payload.time) || null,
      };
    case SET_USER_LAST_REPORTED_PATH:
      return {
        ...state,
        lastReportPathSentTime: (action.payload && action.payload.time) || null,
        lastReportPathId: (action.payload && action.payload.pathId) || null,
      };
    case RESET_STORE:
      return initialState;
    default: {
      return state;
    }
  }
};
