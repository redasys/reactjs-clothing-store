import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  errorMessage: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        errorMessage: null
      };
    case UserActionTypes.SIGN_IN_ERROR:
    case UserActionTypes.LOGOUT_ERROR:
    case UserActionTypes.SIGN_UP_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };
    case UserActionTypes.CHECK_USER_SESSION:
      return {
        ...state,
        currentUser: action.payload
      };
    case UserActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        errorMessage: null
      };
    default:
      return state;
  }
};

export default userReducer;