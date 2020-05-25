import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import attachAuthToken from '../client/utils/attachAuthToken';
import store from '../client/utils/configureStore';
import { LOGGEDIN_USER } from './actions/types';
import './scss/style.scss';
import Routes from './Routes';

const token = global.localStorage.getItem('token');
if (token) {
  attachAuthToken(token);
  const decoded = jwt.decode(token);
  if (decoded) {
    const userInfo = {
      userId: decoded.userId,
      username: decoded.username,
      email: decoded.email,
    };
    store.dispatch(
      { type: LOGGEDIN_USER, userInfo }
    );
  }
}

render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>,
  </Provider>,
  document.getElementById('app'));
