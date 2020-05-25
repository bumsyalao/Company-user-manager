import axios from 'axios';
import attachAuthToken from '../utils/attachAuthToken';
import {
  GET_ALL_COMPANY,
  GET_USER_COMPANY
} from './types';

export const getAllCompanySuccess = ({
  companies,
  metaData
}) => ({
  type: GET_ALL_COMPANY,
  companies,
  metaData
});

export const getUserCompanySuccess = ({
  userCompany
}) => ({
  type: GET_USER_COMPANY,
  userCompany
});

export const getUserCompany = () => dispatch =>
  attachAuthToken(localStorage.getItem('token')).get('/api/v1/user/company').then((res) => {
    dispatch(getUserCompanySuccess(res.data))
  }).catch((error) => {
    throw error;
  });

export const createCompany = companyData =>
  dispatch =>
  attachAuthToken(localStorage.getItem('token')).post('/api/v1/company', companyData)
  .then(() => {
    return dispatch(getUserCompany());
  }).catch((error) => {
    throw error;
  });


export const getAllCompany = (
    offset,
    limit,
    search
  ) => dispatch =>
  axios
  .get(
    `/api/v1/companies?limit=${limit}&offset=${offset}&search=${search}`
  )
  .then((res) => {
    dispatch(getAllCompanySuccess(res.data));
  })
  .catch((error) => {
    throw error;
  });