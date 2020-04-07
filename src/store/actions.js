export const ROUTE_TO = "ROUTE_TO";
export const SET_USER_PHONE = "SET_USER_PHONE";
export const SET_USER_SESSION = "SET_USER_SESSION";
export const SET_USER_SIGNUP_DATA = "SET_USER_SIGNUP_DATA";
export const SET_USER_LAST_PATH_SENT_TIME = "SET_USER_LAST_PATH_SENT_TIME";
export const RESET_STORE = "RESET_STORE";

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

export function setUserLastPathSentTime({ time }) {
  return {
    type: SET_USER_LAST_PATH_SENT_TIME,
    payload: {
      time,
    },
  };
}

export function resetStore() {
  return {
    type: RESET_STORE,
  };
}