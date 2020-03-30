const initialState = {
  user: {
    phone: "",
  },
};

export const userReducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {

    case "SET_PHONE_NUMBER": {
      const newState = {
        ...state,
        user: {
          ... state.user,
          phone: payload,
        },
      };
      return newState;
    }

    default: {
      return state;
    }
  }
};
