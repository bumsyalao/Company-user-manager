import {
  GET_ALL_USERS
} from './types';

export const getAllUsersSuccess = ({
  users,
  metaData
}) => ({
  type: GET_ALL_USERS,
  users,
  metaData
});

export const getAllUsers = (
    offset,
    limit,
    search
  ) => dispatch =>
  axios
  .get(
    `/api/v1/users?limit=${limit}&offset=${offset}&search=${search}`
  )
  .then((res) => {
    dispatch(getAllUsersSuccess(res.data));
  })
  .catch((error) => {
    throw error;
  });