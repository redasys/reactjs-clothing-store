import UserActionTypes from './user.types';

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const emailSignInStart = login => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: login
});

export const signInSuccess = user => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user
});

export const signInError = errMsg =>({
  type: UserActionTypes.SIGN_IN_ERROR,
  payload: errMsg
});

export const checkUserSession = () =>({
 type: UserActionTypes.CHECK_USER_SESSION
});

export const logoutStart = () => ({
  type: UserActionTypes.LOGOUT_START
})

export const logoutSuccess = () => ({
  type: UserActionTypes.LOGOUT_SUCCESS,
  payload: null
});

export const logoutError = errMsg =>({
  type: UserActionTypes.LOGOUT_ERROR,
  payload: errMsg
});

export const signUpStart = credentials =>({
  type: UserActionTypes.SIGN_UP_START,
  payload: credentials
});

export const signUpSuccess = ({user, additionalData}) =>({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: {user, additionalData}
});

export const signUpError = errMsg =>({
  type: UserActionTypes.SIGN_UP_ERROR,
  payload: errMsg
});




