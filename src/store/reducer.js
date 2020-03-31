
import {
  SET_USER_PHONE,
} from "./actions"

export const initialState = {
  userPhone: "",
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PHONE:
      return {
        ...state,
        userPhone: (action.payload && action.payload.userPhone) || "",
      };
    default: {
      return state;
    }
  }
};
