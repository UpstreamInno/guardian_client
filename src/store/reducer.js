
import {
  SET_USER_LAST_PATH_SENT_TIME,
  SET_USER_PHONE,
  SET_USER_SESSION,
  SET_USER_SIGNUP_DATA,
  RESET_STORE,
} from "./actions"

export const initialState = {
  userPhone: "",
  registrationCode: null,
  registrationId: null,
  sessionId: null,
  sessionPhone: null,
  lastPathSentTime: null
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
        sessionPhone: (action.payload && action.payload.sessionPhone) || null,
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
