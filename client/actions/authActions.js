import axios from 'axios';
import attachAuthToken from '../utils/attachAuthToken';
import {
  SIGN_UP_USER,
  SIGN_IN_USER,
  SIGN_OUT_USER
} from './types';

export const userSignupSuccess = (
  userInfo,
  message,
  status
) => ({
  type: SIGN_UP_USER,
  userInfo,
  message,
  status
});

export const userSigninSuccess = (userInfo, message, status) => ({
  type: SIGN_IN_USER,
  userInfo,
  message,
  status
});

export const userSignoutSuccess = () => ({
  type: SIGN_OUT_USER
});



export const userSignUpRequest = userData =>
  dispatch => axios.post('/api/v1/user/signup', userData)
  .then((res) => {
    localStorage.setItem('token', res.data.token);
    attachAuthToken(res.data.token);
    dispatch(userSignupSuccess(res.data.userInfo, res.data.message, res.data.status));
  })
  .catch((error) => {
    throw error;
  });

export const userSignInRequest = userData =>
  dispatch => axios.post('/api/v1/user/signin', userData)
  .then((res) => {
    localStorage.setItem('token', res.data.token);
    attachAuthToken(res.data.token);
    return dispatch(userSigninSuccess(
      res.data.userInfo, res.data.message, res.data.status));
  })
  .catch((error) => {
    throw error;
  });


export const logout = () =>
  (dispatch) => {
    localStorage.removeItem('token');
    attachAuthToken(false);
    return dispatch(userSignoutSuccess());
  };