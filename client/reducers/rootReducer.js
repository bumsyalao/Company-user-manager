import {
  combineReducers
} from 'redux';

import auth from './authReducer';
import companies from './companyReducer';

export default combineReducers({
  auth,
  companies
});