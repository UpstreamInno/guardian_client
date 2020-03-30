export const SET_USER_PHONE = "SET_USER_PHONE"

export function setUserPhone(userPhone) {
  return {
    type: SET_USER_PHONE,
    payload: {
      userPhone,
    },
  };
}
