export const USER_SIGNUP = "USER_SIGNUP";
export const USER_SIGNUP_VERIFY = "USER_SIGNUP_VERIFY";
export const REPORT_PRECISE_PATH = "REPORT_PRECISE_PATH";
export const REPORT_SYMPTOMS = "REPORT_SYMPTOMS";
export const FETCH_MESSAGES = "FETCH_MESSAGES";
export const SESSION_NOT_FOUND = "SESSION_NOT_FOUND";

export const ROUTE_TO = "ROUTE_TO";
export const SAVE_NOTIFICATION = "SAVE_NOTIFICATION";
export const MARK_NOTIFICATION_READ = "MARK_NOTIFICATION_READ";
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
export function userSignUp(userPhone, redirect = true) {
  return {
    type: USER_SIGNUP,
    payload: {
      userPhone,
      redirect,
    },
  };
}

// signup verification request
export function userSignUpVerify(registrationCode, redirect = true) {
  return {
    type: USER_SIGNUP_VERIFY,
    payload: {
      registrationCode,
      redirect,
    },
  };
}

// fetch messages, which in turn triggers intersection checking, and potentially notification
export function fetchMessages() {
  return {
    type: FETCH_MESSAGES,
  };
}

// attempts to load session from storage, otherwise redirect to signup
export function sessionNotFound() {
  return {
    type: SESSION_NOT_FOUND,
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

// report symptom survey results
export function reportSymptoms(symptoms) {
  return {
    type: REPORT_SYMPTOMS,
    payload: {
      symptoms,
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

export function saveNotification(notification) {
  return {
    type: SAVE_NOTIFICATION,
    payload: {
      notification,
    },
  };
}

export function markNotificationRead(notificationId) {
  return {
    type: MARK_NOTIFICATION_READ,
    payload: {
      notificationId,
    },
  };
}

export function setUserSession({ accessToken, refreshToken }) {
  return {
    type: SET_USER_SESSION,
    payload: {
      accessToken,
      refreshToken,
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
