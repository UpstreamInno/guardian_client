export const USER_SIGNUP = "USER_SIGNUP";
export const USER_SIGNUP_VERIFY = "USER_SIGNUP_VERIFY";
export const REPORT_PRECISE_PATH = "REPORT_PRECISE_PATH"
export const FETCH_MESSAGES = "FETCH_MESSAGES";

export const ROUTE_TO = "ROUTE_TO";
export const SET_USER_PHONE = "SET_USER_PHONE";
export const SET_USER_SESSION = "SET_USER_SESSION";
export const SET_USER_SIGNUP_DATA = "SET_USER_SIGNUP_DATA";
export const SET_USER_LAST_REGION_PATH_SENT_TIME = "SET_USER_LAST_REGION_PATH_SENT_TIME";
export const SET_USER_LAST_REPORTED_PATH = "SET_USER_LAST_REPORTED_PATH";
export const RESET_STORE = "RESET_STORE";

/*
 * These actions have side effects (sagas), and do not typically write to the redux store directly
 */

// signup request
export function userSignUp(userPhone) {
  return {
    type: USER_SIGNUP,
    payload: {
      userPhone,
    },
  };
}

// signup verification request
export function userSignUpVerify(registrationCode) {
  return {
    type: USER_SIGNUP_VERIFY,
    payload: {
      registrationCode,
    },
  };
}

// fetch messages, which in turn triggers intersection checking, and potentially notification
export function fetchMessages() {
  return {
    type: FETCH_MESSAGES,
  };
}

// report precise path.
// path expected in this form:
//  [
//    ["47.609755", "-122.337793", "2020-04-02T00:18:31Z"],
//    ["47.609750", "-122.339900", "2020-04-02T00:23:31Z"],
//  ];
//
// however to enable user input on the debug page, we stringify the json.
export function reportPrecisePath(path) {
  return {
    type: REPORT_PRECISE_PATH,
    payload: {
      path,
    },
  };
}

/*
 * Actions that write directly to the store.
 */

// route to the given page, and optionally set the previousPage
export function routeTo(page, previousPage) {
  return {
    type: ROUTE_TO,
    payload: {
      page,
      previousPage,
    },
  };
}

export function setUserPhone(userPhone) {
  return {
    type: SET_USER_PHONE,
    payload: {
      userPhone,
    },
  };
}

export function setUserSession({ sessionId, sessionPhone }) {
  return {
    type: SET_USER_SESSION,
    payload: {
      sessionId,
    },
  };
}

export function setUserSignUpData({ registrationCode, registrationId }) {
  return {
    type: SET_USER_SIGNUP_DATA,
    payload: {
      registrationCode,
      registrationId,
    },
  };
}

export function setUserLastRegionPathSentTime({ time }) {
  return {
    type: SET_USER_LAST_REGION_PATH_SENT_TIME,
    payload: {
      time,
    },
  };
}

export function setUserLastReportedPath({ time, pathId }) {
  return {
    type: SET_USER_LAST_REPORTED_PATH,
    payload: {
      time,
      pathId,
    },
  };
}

export function resetStore() {
  return {
    type: RESET_STORE,
  };
}
