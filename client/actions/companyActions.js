import axios from 'axios';
import attachAuthToken from '../utils/attachAuthToken';
import {
  GET_ALL_COMPANY,
  GET_USER_COMPANY,
  GET_ALL_COMPANY_REQUEST,
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

export const getComapnyRequestSuccess = ({
  users,
  metaData
}) => ({
  type: GET_ALL_COMPANY_REQUEST,
  users,
  metaData
})

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
    search = '',
    offset = 0,
    limit = 5,
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

export const getAllRequest = (
    companyId,
    offset = 0,
    limit = 5,
    search = '',
  ) => dispatch =>
  attachAuthToken(localStorage.getItem('token'))
  .get(
    `/api/v1/company/${companyId}/users?limit=${limit}&offset=${offset}&search=${search}`
  )
  .then((response) => {
    // if (!response.data.users.length > 0) {
    //   Materialize.toast('User not found', 5000, 'red');
    // }
    dispatch(getComapnyRequestSuccess(response.data));
  })
  .catch((error) => {
    throw error;
  });

export const requestResponse = (
    userId,
    companyId,
    status
  ) => dispatch => axios.put(`/api/v1/company/${companyId}/user/${userId}`, {
    status
  })
  .then((res) => {
    dispatch(getAllRequest(res.data.foundRequest.companyId))
  }).catch((error) => {
    throw error;
  });

export const joinCompany = (companyId) => () =>
  attachAuthToken(localStorage.getItem('token'))
  .post(`/api/v1/company/${companyId}/user`)